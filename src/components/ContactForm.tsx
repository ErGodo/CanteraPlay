"use client";
import React, { useState } from "react";

export default function ContactForm({ primary = "#0a1a3c" }: { primary?: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneInput(e.target.value);
    setPhone(formatted);
  };

  const handlePhoneFocus = () => {
    if (!phone) setPhone("+56 9 ");
  };

  return (
    <form action="#" method="post" className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col gap-4">
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-[#0a1a3c] mb-1">
          Nombre
        </label>
        <input
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0a1a3c] focus:ring-opacity-20"
        />
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
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0a1a3c] focus:ring-opacity-20"
        />
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
          className="w-full border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0a1a3c] focus:ring-opacity-20"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-[#0a1a3c] mb-1">
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="w-full border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0a1a3c] focus:ring-opacity-20"
        />
      </div>

      <button
        type="submit"
        className="px-6 py-3 rounded-md font-semibold shadow transition text-white w-full hover:opacity-95"
        style={{ backgroundColor: primary }}
      >
        Enviar
      </button>
    </form>
  );
}
