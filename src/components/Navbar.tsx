
"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaInstagram } from "react-icons/fa";
import { CreateAthleteModal } from "./auth/CreateAthleteModal";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  // Prevent scroll when menu is open (mobile UX)
  React.useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <nav className="w-full flex items-center px-8 py-4 bg-transparent">
      <div className="flex items-center gap-3">
        <Image
          src="/images/avidela-logo.png"
          alt="Avidela Sport Logo"
          width={48}
          height={48}
          className="rounded-full bg-white border border-gray-200"
        />
        <span className="font-extrabold text-2xl text-white tracking-tight">
          Avidela Sport
        </span>
      </div>
      <div className="flex-1" />
      {/* Desktop menu */}
      <ul className="hidden md:flex gap-6 font-semibold drop-shadow-md items-center">
        <li>
          <a href="#plans" className="hover:text-[#ffd6e6] text-white transition-colors">Planes</a>
        </li>
        <li>
          <a href="#info" className="hover:text-[#ffd6e6] text-white transition-colors">Noticias</a>
        </li>
        <li>
          <a href="#results" className="hover:text-[#ffd6e6] text-white transition-colors">Resultados</a>
        </li>
        <li>
          <a href="#contact" className="hover:text-[#ffd6e6] text-white transition-colors">Contacto</a>
        </li>
        <li className="flex items-center h-full ml-2">
          <a href="https://www.instagram.com/avidelasportacademy/" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-pink-400 transition-colors" style={{ height: '100%' }}>
            <FaInstagram size={24} color="#0a1a3c" style={{ display: 'block' }} />
          </a>
        </li>
        <li>
          <button
            onClick={() => setIsRegisterOpen(true)}
            className="bg-[#0a1a3c] text-white px-5 py-2 rounded-full hover:bg-[#fc5c9c] transition-colors shadow-lg"
          >
            Registrarse
          </button>
        </li>
      </ul>
      <CreateAthleteModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
      {/* Mobile hamburger menu */}
      <div className="md:hidden relative">
        <button
          aria-label="Abrir menú"
          className="inline-flex items-center justify-center cursor-pointer select-none text-2xl text-white"
          onClick={() => setMenuOpen((v) => !v)}
        >
          ☰
        </button>
        {/* Overlay for menu */}
        <div
          className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`transition-all duration-400 ease-in-out fixed left-1/2 top-20 -translate-x-1/2 w-[min(92vw,320px)] rounded-xl border bg-white shadow-lg overflow-hidden z-50
            ${menuOpen ? "opacity-100 translate-y-0 scale-100 pointer-events-auto" : "opacity-0 -translate-y-4 scale-95 pointer-events-none"}`}
        >
          <ul className="px-4 py-3 space-y-1.5 font-semibold text-[#0a1a3c]">
            <li><a href="#plans" className="block py-2" onClick={() => setMenuOpen(false)}>Planes</a></li>
            <li><a href="#info" className="block py-2" onClick={() => setMenuOpen(false)}>Noticias</a></li>
            <li><a href="#results" className="block py-2" onClick={() => setMenuOpen(false)}>Resultados</a></li>
            <li><a href="#contact" className="block py-2" onClick={() => setMenuOpen(false)}>Contacto</a></li>
            <li className="pt-1.5 flex justify-center">
              <a href="https://www.instagram.com/avidelasportacademy/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center" onClick={() => setMenuOpen(false)}>
                <FaInstagram size={24} color="#e91e63" />
              </a>
            </li>
            <li>
              <button
                onClick={() => { setIsRegisterOpen(true); setMenuOpen(false); }}
                className="w-full text-center bg-[#0a1a3c] text-white py-2 rounded-lg hover:bg-[#fc5c9c] transition-colors mt-2"
              >
                Registrarse
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
