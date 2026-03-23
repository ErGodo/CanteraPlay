import React from 'react';

export default function WhatsAppButton() {
  // ¡Cambia este número por el WhatsApp oficial del club!
  // Se ha actualizado el número de contacto proporcionado por el club
  const phoneNumber = "56938997570"; 
  const message = "Hola,%20quisiera%20más%20información%20sobre%20Avidela%20Sport";
  const href = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-slate-950 border border-[#e91e63]/30 shadow-lg shadow-[#00b4e6]/20 transition-transform duration-300 hover:scale-110 hover:shadow-[#e91e63]/40 active:scale-95 group"
      aria-label="Contáctanos por WhatsApp"
    >
      {/* Círculo que parpadea alrededor del botón para dar efecto neón sutil */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#e91e63] to-[#00b4e6] animate-ping opacity-20 group-hover:animate-none"></div>
      
      {/* Icono de WhatsApp con Gradiente en SVG */}
      <svg
        viewBox="0 0 24 24"
        className="relative z-10 w-8 h-8 group-hover:drop-shadow-[0_0_8px_rgba(0,180,230,0.5)] transition-all duration-300"
      >
        <defs>
          <linearGradient id="waGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e91e63" />
            <stop offset="100%" stopColor="#00b4e6" />
          </linearGradient>
        </defs>
        <path 
           fill="url(#waGradient)"
           d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.88-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
      </svg>
    </a>
  );
}
