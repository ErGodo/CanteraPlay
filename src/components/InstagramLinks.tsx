"use client";
import React, { useState } from "react";
import { FaInstagram } from "react-icons/fa";

interface InstagramLinksProps {
  variant?: "navbar" | "footer";
}

const InstagramLinks: React.FC<InstagramLinksProps> = ({ variant = "navbar" }) => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    {
      name: "Rama Adultos",
      url: "https://www.instagram.com/avidelasport/",
      color: "#e91e63", // Pink
      handle: "@avidelasport"
    },
    {
      name: "Academy Infantil",
      url: "https://www.instagram.com/avidelasportacademy/",
      color: "#00b4e6", // Cyan/Blue
      handle: "@avidelasportacademy"
    }
  ];

  if (variant === "navbar") {
    return (
      <div 
        className="relative group/insta h-full flex items-center"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <button className="flex items-center hover:text-pink-400 transition-colors cursor-pointer outline-none">
          <FaInstagram size={24} className="text-white group-hover/insta:text-pink-400 transition-colors" />
        </button>
        
        {/* Dropdown for Navbar */}
        <div className={`
          absolute top-full right-0 pt-2 min-w-[200px] z-[60]
          transition-all duration-300 ease-out origin-top-right
          ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"}
        `}>
          <div className="bg-slate-950/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div className="px-4 py-2 border-b border-white/5 bg-white/5">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#e91e63]">Nuestros Perfiles</span>
            </div>
            {links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 hover:bg-white/5 transition-all group/item"
              >
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg transition-transform group-hover/item:scale-110"
                  style={{ backgroundColor: link.color }}
                >
                  <FaInstagram size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white leading-tight">{link.name}</span>
                  <span className="text-[10px] text-white/40 font-medium tracking-tight">{link.handle}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Variant for Footer
  return (
    <div className="relative group/insta" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <button className="flex items-center gap-2 rounded-lg px-3 py-1.5 bg-white/12 font-semibold hover:bg-white/20 transition-colors outline-none cursor-pointer">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="2" y="2" width="20" height="20" rx="5" stroke="white" strokeWidth="1.2" />
          <circle cx="12" cy="12" r="3.2" stroke="white" strokeWidth="1.2" />
          <circle cx="17.4" cy="6.6" r="0.9" fill="white" />
        </svg>
        <span>Instagram</span>
        <svg 
          className={`w-3 h-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Upward Dropdown for Footer */}
      <div className={`
        absolute bottom-full right-0 pb-4 min-w-[220px] z-[60]
        transition-all duration-300 ease-out origin-bottom-right
        ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}
      `}>
          <div className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
            <div className="px-4 py-2 border-b border-white/5 bg-white/5">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#e91e63]">Selecciona Cuenta</span>
            </div>
            {links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 hover:bg-white/10 transition-all group/item"
              >
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-lg transition-transform group-hover/item:rotate-12"
                  style={{ backgroundColor: link.color }}
                >
                  <FaInstagram size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white">{link.name}</span>
                  <span className="text-[10px] text-white/50">{link.handle}</span>
                </div>
              </a>
            ))}
          </div>
      </div>
    </div>
  );
};

export default InstagramLinks;
