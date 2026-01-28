"use client";
import React, { useState } from "react";

// Simple Modal Component
function SuccessModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center transform scale-100 animate-in zoom-in-95 duration-200 border border-gray-100">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-[#0a1a3c] mb-3 font-sans">¡Mensaje Recibido!</h3>
        <p className="text-slate-600 mb-8 leading-relaxed">
          Su mensaje ha sido recibido exitosamente. <br />
          Pronto será contactada por la directiva del club.
        </p>
        <button
          onClick={onClose}
          className="w-full bg-[#0a1a3c] text-white py-3.5 rounded-xl font-bold text-lg hover:bg-[#fc5c9c] transition-colors shadow-lg shadow-blue-900/10 cursor-pointer"
        >
          Entendido
        </button>
      </div>
    </div>
  );
}

export default function ContactForm({ primary = "#0a1a3c" }: { primary?: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  // Format phone as: +56 9 61094001 (keeps country +56 and leading 9, up to 8 digits after)
  function formatPhoneInput(value: string) {
    let digits = value.replace(/\D/g, "");
    // strip leading country code if pasted
    if (digits.startsWith("56")) digits = digits.slice(2);
    if (digits.startsWith("0")) digits = digits.replace(/^0+/, "");

    if (!digits) return "";

    // If the number starts with 9 (mobile), keep it as the leading mobile digit
    if (digits.startsWith("9")) {
      const rest = digits.slice(1, 1 + 8); // up to 8 following digits
      return `+56 9 ${rest}`.trim();
    }

    // Otherwise take up to 8 digits as the subscriber number
    const rest = digits.slice(0, 8);
    return `+56 9 ${rest}`.trim();
  }

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const validate = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};
    if (!name.trim()) newErrors.name = "El nombre es requerido.";
    if (!email.trim()) {
      newErrors.email = "El correo electrónico es requerido.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Ingresa un correo válido.";
    }
    if (!message.trim()) newErrors.message = "El mensaje es requerido.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');

    try {
      const utilsUrl = process.env.NEXT_PUBLIC_UTILS_SERVICE_URL;
      if (!utilsUrl) {
        console.warn("NEXT_PUBLIC_UTILS_SERVICE_URL no está definido. Usando localhost:3004 por defecto.");
      }

      const baseUrl = utilsUrl || 'http://localhost:3004';

      const res = await fetch(`${baseUrl}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, message }),
      });

      if (!res.ok) throw new Error('Error enviando formulario');

      setStatus('success');
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setErrors({});
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneInput(e.target.value);
    setPhone(formatted);
  };

  const handlePhoneFocus = () => {
    if (!phone) setPhone("+56 9 ");
  };

  return (
    <>
      <SuccessModal isOpen={status === 'success'} onClose={() => setStatus('idle')} />
      <form onSubmit={handleSubmit} noValidate className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-[#0a1a3c] mb-1">
            Nombre
          </label>
          <input
            id="name"
            name="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors({ ...errors, name: undefined });
            }}
            disabled={status === 'loading'}
            className={`w-full border rounded-md px-4 py-3 text-[#0a1a3c] focus:outline-none focus:ring-2 focus:ring-[#0a1a3c] focus:ring-opacity-20 disabled:opacity-50 ${errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'}`}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-[#0a1a3c] mb-1">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors({ ...errors, email: undefined });
            }}
            disabled={status === 'loading'}
            className={`w-full border rounded-md px-4 py-3 text-[#0a1a3c] focus:outline-none focus:ring-2 focus:ring-[#0a1a3c] focus:ring-opacity-20 disabled:opacity-50 ${errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'}`}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-[#0a1a3c] mb-1">
            Teléfono
          </label>
          <input
            id="phone"
            name="phone"
            inputMode="tel"
            placeholder="+56 9 12345678"
            value={phone}
            onChange={handlePhoneChange}
            onFocus={handlePhoneFocus}
            disabled={status === 'loading'}
            className="w-full border border-gray-200 rounded-md px-4 py-3 text-[#0a1a3c] focus:outline-none focus:ring-2 focus:ring-[#0a1a3c] focus:ring-opacity-20 disabled:opacity-50"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-[#0a1a3c] mb-1">
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            rows={3}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              if (errors.message) setErrors({ ...errors, message: undefined });
            }}
            disabled={status === 'loading'}
            className={`w-full border rounded-md px-4 py-3 h-28 md:h-28 max-h-36 text-[#0a1a3c] focus:outline-none focus:ring-2 focus:ring-[#0a1a3c] focus:ring-opacity-20 disabled:opacity-50 ${errors.message ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200'}`}
          />
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-6 py-3 rounded-md font-semibold shadow transition text-white w-full hover:opacity-95 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            style={{ backgroundColor: primary }}
          >
            {status === 'loading' ? (
              <>
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Enviando...
              </>
            ) : 'Enviar'}
          </button>

          {status === 'error' && <p className="text-red-500 text-sm text-center">Hubo un error al enviar el mensaje. Inténtalo de nuevo.</p>}
        </div>
      </form>
    </>
  );
}
