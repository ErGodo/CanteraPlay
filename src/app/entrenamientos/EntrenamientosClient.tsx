"use client";

import { useState } from "react";
import { IconMapPin, IconClock, IconCoin, IconCalendar, IconGift } from "@tabler/icons-react";

export default function EntrenamientosClient() {
    const [activeTab, setActiveTab] = useState<"Ñuñoa" | "San Miguel">("Ñuñoa");
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    const faqs = [
        {
            q: "¿Necesito experiencia previa?",
            a: "No, recibimos jugadores de todos los niveles."
        },
        {
            q: "¿Qué necesito traer?",
            a: "Ropa deportiva, zapatillas y agua. En Ñuñoa puedes usar tacos/toperoles, pero en San Miguel SOLO se permiten zapatillas o microtacos."
        },
        {
            q: "¿Cómo funciona la primera clase gratis?",
            a: "Escríbenos por WhatsApp, coordinamos el día y vienes sin compromiso. Válido en Ñuñoa."
        },
        {
            q: "¿Los niños pueden probar antes de inscribirse?",
            a: "Sí, primera clase completamente gratis en Ñuñoa."
        },
        {
            q: "¿Cómo pago la mensualidad?",
            a: "A través de CanteraPlay en app.canteraplay.com"
        }
    ];

    return (
        <div>
            {/* TABS */}
            <div className="flex justify-center mt-12 mb-12">
                <div className="bg-slate-900 border border-slate-800 p-1.5 rounded-full flex gap-2">
                    <button
                        onClick={() => setActiveTab("Ñuñoa")}
                        className={`px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 ${activeTab === "Ñuñoa"
                            ? "bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg"
                            : "text-slate-400 hover:text-white hover:bg-white/5"
                            }`}
                    >
                        Ñuñoa
                    </button>
                    <button
                        onClick={() => setActiveTab("San Miguel")}
                        className={`px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 ${activeTab === "San Miguel"
                            ? "bg-gradient-to-r from-[#0F8DBF] to-blue-600 text-white shadow-lg"
                            : "text-slate-400 hover:text-white hover:bg-white/5"
                            }`}
                    >
                        San Miguel
                    </button>
                </div>
            </div>

            {/* TAB CONTENT */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {activeTab === "Ñuñoa" ? (
                    <div className="flex flex-col gap-12">
                        {/* Dirección */}
                        <div className="flex flex-col md:flex-row items-center justify-between bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 gap-6 shadow-xl">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-pink-500/10 text-pink-500 rounded-2xl flex items-center justify-center shrink-0 border border-pink-500/20">
                                    <IconMapPin size={28} />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-xl mb-1">Cancha Ñuñoa</h3>
                                    <p className="text-slate-400">Guillermo Mann 1420, Ñuñoa, Santiago</p>
                                </div>
                            </div>
                            <div className="text-sm font-bold text-pink-500 bg-pink-500/10 px-4 py-2 rounded-full border border-pink-500/20">
                                Primera clase gratis disponible
                            </div>
                        </div>

                        {/* Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <ScheduleCard
                                title="NIÑOS (3-9 años)"
                                day="Martes"
                                time="18:30 — 19:30"
                                price="$25.000/mes"
                                highlight="Primera clase GRATIS"
                                gradient="from-pink-500 to-rose-600"
                            />
                            <ScheduleCard
                                title="JUVENIL (10-18 años)"
                                day="Martes"
                                time="19:30 — 20:30"
                                price="$25.000/mes"
                                highlight="Primera clase GRATIS"
                                gradient="from-purple-500 to-indigo-600"
                            />
                        </div>

                        <div className="text-center text-slate-500 text-sm font-bold uppercase tracking-widest bg-slate-900/50 py-4 rounded-xl border border-slate-800">
                            Nota: Los martes son exclusivos para niños y juveniles
                        </div>

                        {/* Mapa */}
                        <div className="w-full aspect-[21/9] min-h-[300px] rounded-3xl overflow-hidden border border-slate-800 shadow-xl">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3328.601138865668!2d-70.6215779!3d-33.473555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cff82af41bd5%3A0x6a1f112fb10d3f8f!2sGuillermo%20Mann%201420%2C%20%C3%91u%C3%B1oa%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses-419!2scl!4v1700000000000!5m2!1ses-419!2scl" 
                                width="100%" 
                                height="100%" 
                                style={{ border: 0 }} 
                                allowFullScreen 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                                className="grayscale-[0.5] invert-[0.9] hue-rotate-[180deg]"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-12">
                        {/* Dirección */}
                        <div className="flex flex-col md:flex-row items-center justify-between bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 gap-6 shadow-xl">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center shrink-0 border border-blue-500/20">
                                    <IconMapPin size={28} />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-xl mb-1">Cancha San Miguel</h3>
                                    <p className="text-slate-400">Gran Avenida José Miguel Carrera 3204, San Miguel (dentro del Hospital Barros Luco)</p>
                                </div>
                            </div>
                        </div>

                        {/* Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <ScheduleCard
                                title="NIÑOS Y JUVENILES (hasta 18 años)"
                                day="Lunes"
                                time="19:00 — 20:00"
                                price="$25.000/mes"
                                highlight="Primera clase GRATIS"
                                gradient="from-[#0F8DBF] to-blue-600"
                            />
                            <div className="group relative h-full bg-slate-950 rounded-[32px] border border-slate-800 p-8 flex flex-col transition-all duration-500 hover:border-white/10 overflow-hidden shadow-xl">
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 skew-y-12 translate-y-[-50%] z-0" />

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="p-4 bg-slate-900 group-hover:bg-white/20 rounded-2xl border border-slate-800 group-hover:border-white/20 transition-all duration-300">
                                            <IconClock className="w-8 h-8 text-amber-500 group-hover:text-white transition-colors" stroke={1.5} />
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-black text-white mb-6 group-hover:text-white transition-colors leading-tight">
                                            ADULTOS (18+ años)
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 text-slate-300 group-hover:text-white">
                                                <IconCalendar size={20} className="text-slate-500 group-hover:text-white/80" />
                                                <span className="font-semibold">Día: Lunes</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-slate-300 group-hover:text-white">
                                                <IconClock size={20} className="text-slate-500 group-hover:text-white/80" />
                                                <span className="font-semibold">Horario: 19:00 — 20:00</span>
                                            </div>
                                            <div className="flex flex-col gap-2 mt-4 text-slate-300 group-hover:text-white">
                                                <div className="flex items-center gap-3">
                                                    <IconCoin size={20} className="text-slate-500 group-hover:text-white/80" />
                                                    <span className="font-bold text-white">$5.000 / sesión</span>
                                                </div>
                                                <div className="flex items-center gap-3 pl-8">
                                                    <span className="font-medium text-amber-500 group-hover:text-amber-200">
                                                        $4.000 / sesión (Inscritos Avidela)
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-8 pt-6 border-t border-slate-900 group-hover:border-white/10">
                                        <div className="text-xs font-bold text-slate-500 group-hover:text-white/80 uppercase tracking-widest text-center">
                                            Sin clase de prueba gratis
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mapa */}
                        <div className="w-full aspect-[21/9] min-h-[300px] rounded-3xl overflow-hidden border border-slate-800 shadow-xl">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3327.3592864696013!2d-70.6509531!3d-33.498877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf8880625ce5%3A0x6b107b3f9b2afb84!2sGran%20Avenida%20Jos%C3%A9%20Miguel%20Carrera%203204%2C%20San%20Miguel%2C%20Regi%C3%B3n%20Metropolitana!5e0!3m2!1ses-419!2scl!4v1700000000000!5m2!1ses-419!2scl" 
                                width="100%" 
                                height="100%" 
                                style={{ border: 0 }} 
                                allowFullScreen 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                                className="grayscale-[0.5] invert-[0.9] hue-rotate-[180deg]"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* FAQ Accordion */}
            <div className="mt-32">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
                        Preguntas <span className="text-pink-500">Frecuentes</span>
                    </h2>
                    <p className="text-slate-400 font-medium max-w-2xl mx-auto">
                        Todo lo que necesitas saber antes de tu primer entrenamiento.
                    </p>
                </div>
                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, i) => (
                        <div 
                            key={i} 
                            className={`bg-slate-900 border ${openFaq === i ? 'border-pink-500/50' : 'border-slate-800'} rounded-2xl overflow-hidden transition-all duration-300`}
                        >
                            <button 
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                            >
                                <span className={`font-bold text-lg ${openFaq === i ? 'text-white' : 'text-slate-300'}`}>
                                    {faq.q}
                                </span>
                                <div className={`ml-4 shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180 text-pink-500' : 'text-slate-500'}`}>
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </button>
                            <div 
                                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === i ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <p className="text-slate-400 font-medium leading-relaxed">
                                    {faq.a}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function ScheduleCard({ title, day, time, price, highlight, gradient }: any) {
    return (
        <div className="group relative h-full bg-slate-950 rounded-[32px] border border-slate-800 p-8 flex flex-col transition-all duration-500 hover:border-white/10 overflow-hidden shadow-xl">
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0`} />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 skew-y-12 translate-y-[-50%] z-0" />

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                    <div className="p-4 bg-slate-900 group-hover:bg-white/20 rounded-2xl border border-slate-800 group-hover:border-white/20 transition-all duration-300">
                        <IconClock className="w-8 h-8 text-white transition-colors" stroke={1.5} />
                    </div>
                </div>
                <div className="flex-1">
                    <h3 className="text-2xl font-black text-white mb-6 group-hover:text-white transition-colors leading-tight">
                        {title}
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-slate-300 group-hover:text-white">
                            <IconCalendar size={20} className="text-slate-500 group-hover:text-white/80" />
                            <span className="font-semibold">Día: {day}</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-300 group-hover:text-white">
                            <IconClock size={20} className="text-slate-500 group-hover:text-white/80" />
                            <span className="font-semibold">Horario: {time}</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-300 group-hover:text-white">
                            <IconCoin size={20} className="text-slate-500 group-hover:text-white/80" />
                            <span className="font-bold text-white">{price}</span>
                        </div>
                    </div>
                </div>
                {highlight && (
                    <div className="mt-8 pt-6 border-t border-slate-900 group-hover:border-white/10">
                        <div className="flex items-center justify-center gap-2 text-pink-500 group-hover:text-white font-bold uppercase tracking-widest text-xs bg-pink-500/10 group-hover:bg-white/20 py-2.5 rounded-xl border border-pink-500/20 group-hover:border-transparent transition-all">
                            <IconGift size={16} />
                            {highlight}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
