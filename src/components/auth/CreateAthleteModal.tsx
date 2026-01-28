"use client";

import { auth, db } from "@/lib/firebase";
import { athleteService, type CreateAthleteDto } from "@/lib/services/athlete.service";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { useEffect, useState } from "react";

interface CreateAthleteModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface CreateAthleteForm {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    birthDate: string;
    gender: "male" | "female" | "unspecified";
    clubId: string;
}

const initialForm: CreateAthleteForm = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
    gender: "unspecified",
    clubId: "",
};

export const CreateAthleteModal = ({ isOpen, onClose }: CreateAthleteModalProps) => {

    const [form, setForm] = useState<CreateAthleteForm>(initialForm);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [clubs, setClubs] = useState<{ id: string; name: string }[]>([]);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        const fetchClubs = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_CLUB_SERVICE_URL;
                if (!apiUrl) {
                    console.warn("CLUB_SERVICE_URL not configured, using default or skipping");
                    return;
                }

                const response = await fetch(`${apiUrl}/clubs`);
                if (response.ok) {
                    const data = await response.json();
                    const mappedClubs = data.map((c: { pkClub?: string; id?: string; clubName?: string; name?: string }) => ({
                        id: (c.pkClub ?? c.id) as string,
                        name: (c.clubName ?? c.name ?? "Sin nombre") as string
                    }));
                    // Filter for Avidela club specifically
                    const avidelaClub = mappedClubs.find((c: { id: string; name: string }) => c.name.toLowerCase().includes('avidela'));

                    if (avidelaClub) {
                        setClubs([avidelaClub]);
                        setForm(prev => ({ ...prev, clubId: avidelaClub.id }));
                    } else {
                        setClubs(mappedClubs);
                        if (mappedClubs.length === 1) {
                            setForm(prev => ({ ...prev, clubId: mappedClubs[0].id }));
                        }
                    }
                }
            } catch (error) {
                console.error("Failed to fetch clubs", error);
                setError("Error al cargar la lista de clubes. Revisa tu conexión.");
            }
        };

        if (isOpen) {
            fetchClubs();
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            const timer = setTimeout(() => {
                setIsVisible(false);
                setIsSuccess(false);
                setForm(initialForm);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isVisible && !isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        // Validation
        if (!form.firstName.trim() || !form.lastName.trim()) {
            setError("Nombre y Apellido son requeridos");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!form.email.trim() || !emailRegex.test(form.email)) {
            setError("Ingresa un correo electrónico válido");
            return;
        }

        if (!form.password || form.password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres");
            return;
        }
        if (form.password !== form.confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        if (!form.clubId) {
            setError("Debes seleccionar un club");
            return;
        }

        if (!form.birthDate) {
            setError("La fecha de nacimiento es requerida");
            return;
        }

        const birthDate = new Date(form.birthDate);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if (age < 3) {
            setError("El atleta debe tener al menos 3 años.");
            return;
        }
        if (birthDate > today) {
            setError("La fecha no puede ser futura.");
            return;
        }

        setIsLoading(true);

        try {
            // 1. Create user in Firebase Auth
            let userCredential;
            try {
                userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
            } catch (error: unknown) {
                const authErr = error as { code?: string; message?: string };
                if (authErr.code === 'auth/email-already-in-use') {
                    throw new Error("Este correo ya está registrado");
                } else if (authErr.code === 'auth/weak-password') {
                    throw new Error("La contraseña es muy débil");
                } else {
                    throw new Error("Error al crear cuenta: " + (authErr.message || "Error desconocido"));
                }
            }

            const firebaseUid = userCredential.user.uid;

            // 2. Create Athlete in Backend
            let createdAthlete;
            try {
                const athletePayload: CreateAthleteDto = {
                    fkClub: form.clubId,
                    fkUser: firebaseUid,
                    firstName: form.firstName,
                    lastName: form.lastName,
                    birthDate: form.birthDate || undefined,
                    gender: form.gender,
                    athleteStatus: "pending_matricula",
                };

                createdAthlete = await athleteService.create(athletePayload);
            } catch (backendError) {
                console.error("Backend creation failed", backendError);
                await userCredential.user.delete().catch(console.error);
                throw new Error("Error al conectar con el servidor. Intenta nuevamente.");
            }

            // 3. Save to Firestore (Optional backup)
            try {
                await setDoc(doc(db, "users", firebaseUid), {
                    ...createdAthlete,
                    email: form.email,
                    role: "athlete"
                });
            } catch (firestoreError) {
                console.warn("Firestore save warning:", firestoreError);
            }

            setIsSuccess(true);

        } catch (err: unknown) {
            console.error("Registration failed:", err);
            const message = err instanceof Error ? err.message : "Error inesperado.";
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    // Shared Classes
    // Use solid hex #061024 (approx matches black/40 on #0a1a3c) to allow autofill color matching
    const inputClass = "w-full bg-[#061024] border border-white/10 text-white rounded-lg px-4 py-2.5 outline-none focus:bg-black/60 focus:border-[#fc5c9c] transition-all placeholder-gray-500 dark-autofill";
    const labelClass = "block text-xs font-medium text-gray-400 ml-1 mb-1.5";
    const buttonBase = "w-full py-2.5 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

    return (
        <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

            {/* Modal */}
            <div className={`relative w-full max-w-md bg-[#0a1a3c] border border-white/10 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 ${isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}`}>

                {/* Decorative Top Line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#fc5c9c] to-[#0a1a3c]" />

                <div className="p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
                    {isSuccess ? (
                        <div className="flex flex-col items-center text-center space-y-6 animate-in fade-in slide-in-from-bottom-4">
                            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center ring-1 ring-green-500/30">
                                <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white mb-2">¡Cuenta Creada!</h2>
                                <p className="text-sm text-gray-400">Tu registro ha sido exitoso. Espera la confirmación de tu club.</p>
                            </div>
                            <button onClick={onClose} className={`${buttonBase} bg-[#fc5c9c] hover:bg-[#e04080] text-white shadow-lg shadow-[#fc5c9c]/20`}>
                                Entendido
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-white">Crear Cuenta</h2>
                                <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {error && (
                                <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClass}>Nombre <span className="text-red-400">*</span></label>
                                        <input
                                            value={form.firstName}
                                            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                                            placeholder="Juan"
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Apellido <span className="text-red-400">*</span></label>
                                        <input
                                            value={form.lastName}
                                            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                                            placeholder="Pérez"
                                            className={inputClass}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClass}>Email <span className="text-red-400">*</span></label>
                                    <input
                                        type="email"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        placeholder="correo@ejemplo.com"
                                        className={inputClass}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClass}>Contraseña <span className="text-red-400">*</span></label>
                                        <input
                                            type="password"
                                            value={form.password}
                                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                                            placeholder="******"
                                            className={inputClass}
                                        />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Confirmar <span className="text-red-400">*</span></label>
                                        <input
                                            type="password"
                                            value={form.confirmPassword}
                                            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                                            placeholder="******"
                                            className={inputClass}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClass}>Club <span className="text-red-400">*</span></label>
                                    <select
                                        value={form.clubId}
                                        onChange={(e) => setForm({ ...form, clubId: e.target.value })}
                                        className={`${inputClass} appearance-none cursor-pointer`}
                                    >
                                        <option value="" disabled className="bg-[#0a1a3c]">Selecciona tu club</option>
                                        {clubs.map((c) => (
                                            <option key={c.id} value={c.id} className="bg-[#0a1a3c]">{c.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className={labelClass}>Fecha de Nacimiento</label>
                                    <input
                                        type="date"
                                        lang="es-ES"
                                        value={form.birthDate}
                                        onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
                                        className={`${inputClass} w-full`}
                                        style={{ colorScheme: "dark" }}
                                    />
                                </div>

                                <div>
                                    <label className={labelClass}>Género</label>
                                    <select
                                        value={form.gender}
                                        onChange={(e) => setForm({ ...form, gender: e.target.value as CreateAthleteForm["gender"] })}
                                        className={`${inputClass} appearance-none`}
                                    >
                                        <option value="unspecified" className="bg-[#0a1a3c]">No especificado</option>
                                        <option value="male" className="bg-[#0a1a3c]">Masculino</option>
                                        <option value="female" className="bg-[#0a1a3c]">Femenino</option>
                                    </select>
                                </div>

                                <div className="pt-4 flex gap-3">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className={`${buttonBase} bg-white/5 hover:bg-white/10 text-white`}
                                        disabled={isLoading}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className={`${buttonBase} bg-[#fc5c9c] hover:bg-[#e04080] text-white shadow-lg shadow-[#fc5c9c]/20`}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "Creando..." : "Crear Cuenta"}
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
