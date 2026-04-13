
"use client";
import { IconUser } from "@tabler/icons-react";
import Image from "next/image";
import React, { useState } from "react";
import { FaInstagram } from "react-icons/fa";
import InstagramLinks from "./InstagramLinks";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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
    <nav className="w-full flex items-center px-8 py-4 bg-transparent" suppressHydrationWarning>
      <div className="flex items-center gap-3">
        <Image
          src="/images/avidela-logo1.png"
          alt="Avidela Sport Logo"
          width={48}
          height={48}
          className="rounded-xl object-contain"
        />
        <span className="font-extrabold text-xl sm:text-2xl text-white tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
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
        <li className="ml-4">
          <a 
            href="https://app.canteraplay.com/login" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#e91e63] to-rose-600 text-white font-black text-[11px] uppercase tracking-widest hover:scale-105 hover:shadow-[0_0_20px_rgba(233,30,99,0.4)] transition-all duration-300 shadow-xl overflow-hidden"
          >
            <IconUser size={14} className="group-hover:rotate-12 transition-transform duration-300" />
            <span>Iniciar Sesión / Mensualidad</span>
          </a>
        </li>
        <li className="flex items-center h-full ml-4">
          <InstagramLinks variant="navbar" />
        </li>
      </ul>

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
          className={`transition-all duration-400 ease-in-out fixed left-1/2 top-20 -translate-x-1/2 w-[min(92vw,320px)] rounded-xl border border-slate-700 bg-slate-900 shadow-xl shadow-black/50 overflow-hidden z-50
            ${menuOpen ? "opacity-100 translate-y-0 scale-100 pointer-events-auto" : "opacity-0 -translate-y-4 scale-95 pointer-events-none"}`}
        >
          <ul className="px-4 py-3 space-y-1.5 font-semibold text-white">
            <li><a href="#plans" className="block py-2 hover:text-pink-500 transition-colors" onClick={() => setMenuOpen(false)}>Planes</a></li>
            <li><a href="#info" className="block py-2 hover:text-pink-500 transition-colors" onClick={() => setMenuOpen(false)}>Noticias</a></li>
            <li><a href="#results" className="block py-2 hover:text-pink-500 transition-colors" onClick={() => setMenuOpen(false)}>Resultados</a></li>
            <li><a href="#contact" className="block py-2 hover:text-pink-500 transition-colors" onClick={() => setMenuOpen(false)}>Contacto</a></li>
            <li className="pt-2 pb-4">
              <a 
                href="https://app.canteraplay.com/login" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full relative flex items-center justify-center gap-3 py-4 rounded-2xl bg-gradient-to-r from-[#e91e63] to-rose-600 text-white font-black text-[11px] uppercase tracking-widest shadow-[0_10px_20px_-10px_rgba(233,30,99,0.5)] active:scale-95 transition-all overflow-hidden"
                onClick={() => setMenuOpen(false)}
              >
                <IconUser size={16} />
                <span>Iniciar Sesión / Mensualidad</span>
              </a>
            </li>
            <li className="pt-4 flex flex-col items-center gap-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Nuestros Instagrams</span>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/avidelasport/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 group/mobile" onClick={() => setMenuOpen(false)}>
                  <div className="w-12 h-12 rounded-2xl bg-[#e91e63] flex items-center justify-center text-white shadow-lg active:scale-95 transition-transform">
                    <FaInstagram size={24} />
                  </div>
                  <span className="text-[9px] font-bold text-white/60">Adultos</span>
                </a>
                <a href="https://www.instagram.com/avidelasportacademy/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 group/mobile" onClick={() => setMenuOpen(false)}>
                  <div className="w-12 h-12 rounded-2xl bg-[#00b4e6] flex items-center justify-center text-white shadow-lg active:scale-95 transition-transform">
                    <FaInstagram size={24} />
                  </div>
                  <span className="text-[9px] font-bold text-white/60">Academy</span>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
