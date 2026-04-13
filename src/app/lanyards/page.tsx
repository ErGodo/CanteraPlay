import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function LanyardsPage() {
  const pureQrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://avidelasport.com&color=000000&bgcolor=ffffff";
  const cyanQrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://avidelasport.com&color=00b4e6&bgcolor=ffffff";

  return (
    <div className="min-h-screen bg-slate-200 p-10 font-sans flex flex-col items-center">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">Diseños de Banner Profesionales</h1>
        <p className="mt-2 text-slate-600">Nuevas Tipografías Futuristas.<br/>Toma una captura del diseño que prefieras.</p>
        <Link href="/" className="inline-block mt-4 text-[#e91e63] font-medium hover:underline">Volver a inicio</Link>
      </div>

      <div className="space-y-16 flex flex-col items-center pb-20 overflow-x-auto w-full">

        {/* =========================================
            OPCIÓN 1: EL CORTE DEPORTIVO OSCURO
            ========================================= */}
        <section className="flex flex-col items-center">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Opción 1: Corte Deportivo Oscuro (Recomendado)</h2>
          
          <div style={{ width: '1000px', height: '180px' }} className="relative bg-[#0a1a3c] rounded-2xl shadow-2xl overflow-hidden flex flex-row shrink-0">
            {/* El corte diagonal blanco para el logo */}
            <div className="absolute left-[-50px] top-0 w-[300px] h-full bg-white skew-x-[-20deg] z-10 border-r-[8px] border-[#e91e63] shadow-xl"></div>
            {/* Detalle celeste del corte */}
            <div className="absolute left-[245px] top-0 w-[8px] h-full bg-[#00b4e6] skew-x-[-20deg] z-20"></div>
            
            {/* El Logo */}
            <div className="absolute left-[30px] top-0 h-full w-[180px] z-30 flex items-center justify-center">
              <div className="w-full h-[120px] relative">
                <Image src="/images/avidela-logo1.png" alt="Logo" fill className="object-contain" />
              </div>
            </div>

            {/* El Texto Central */}
            <div className="absolute left-[280px] right-[200px] top-0 h-full flex flex-col justify-center items-center z-10">
              {/* Fuente original de la página (Outfit / font-sans) */}
              <h1 className="text-7xl font-black italic tracking-[-0.05em] text-transparent bg-clip-text bg-gradient-to-r from-[#e91e63] via-[#ff4081] to-[#00b4e6] drop-shadow-lg">
                AVIDELA SPORT
              </h1>
              <p className="text-[#00b4e6] font-bold tracking-[0.4em] text-xs mt-2 uppercase opacity-80">
                Plataforma Digital Oficial
              </p>
            </div>

            {/* El QR encapsulado */}
            <div className="absolute right-[30px] top-1/2 -translate-y-1/2 w-[130px] h-[130px] bg-white rounded-xl p-2 shadow-lg z-30">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={pureQrCodeUrl} alt="QR" className="w-full h-full object-contain mix-blend-multiply" />
            </div>
          </div>
        </section>


        {/* =========================================
            OPCIÓN 2: EL CORTE DEPORTIVO BLANCO
            ========================================= */}
        <section className="flex flex-col items-center">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Opción 2: Corte Deportivo Luminoso</h2>
          
          <div style={{ width: '1000px', height: '180px' }} className="relative bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-row shrink-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-10">
            {/* Corte para el logo sutil */}
            <div className="absolute left-[0px] top-0 w-[260px] h-full bg-slate-50 border-r-2 border-slate-200 z-10 shadow-sm"></div>
            
            {/* Logo */}
            <div className="absolute left-[30px] top-0 h-full w-[180px] z-30 flex items-center justify-center drop-shadow-md">
              <div className="w-full h-[120px] relative">
                <Image src="/images/avidela-logo1.png" alt="Logo" fill className="object-contain pointer-events-none" />
              </div>
            </div>

            {/* Centro */}
            <div className="absolute left-[260px] right-[180px] top-0 h-full flex flex-col justify-center items-center z-10 pl-6">
              {/* Fuente original de la página */}
              <h1 className="text-7xl font-black italic tracking-[-0.05em] text-transparent bg-clip-text bg-gradient-to-r from-[#e91e63] via-[#ff4081] to-[#00b4e6]">
                AVIDELA SPORT
              </h1>
              <p className="text-slate-500 font-extrabold tracking-[0.3em] text-[10px] mt-2 uppercase">
                Bienvenido A La Cantera 
              </p>
            </div>

            {/* Fondo decorativo detrás del QR para resaltar */}
            <div className="absolute right-0 top-0 w-[200px] h-full bg-slate-50 border-l border-slate-100 z-0"></div>

            {/* QR */}
            <div className="absolute right-[30px] top-1/2 -translate-y-1/2 w-[130px] h-[130px] bg-white rounded-xl p-2 shadow-[0_0_20px_rgba(0,180,230,0.15)] border border-slate-100 z-30">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cyanQrCodeUrl} alt="QR" className="w-full h-full object-contain mix-blend-multiply" />
            </div>
          </div>
        </section>


        {/* =========================================
            OPCIÓN 3: ALARGADO SPORT PREMIUM
            ========================================= */}
        <section className="flex flex-col items-center">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Opción 3: Formato Deportivo Premium (Diagonal)</h2>
          
          {/* El contenedor general */}
          <div style={{ width: '1200px', height: '140px' }} className="relative bg-[#0a1835] overflow-hidden flex flex-row shrink-0 shadow-2xl rounded-[16px]">
            
            {/* ================= FONDOS (Capas Absolutas) ================= */}
            
            {/* Fondo azul oscuro con diseño sutil texturizado */}
            <div className="absolute inset-0 bg-[#0a1835]">
              {/* Malla cuadrada muy sutil (Tecnología/Deportivo) */}
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
              {/* Brillo central súper tenue para dar volumen */}
              <div className="absolute top-[-40%] left-[50%] -translate-x-1/2 w-[600px] h-[300px] rounded-[100%] bg-[#00b4e6] opacity-[0.05] blur-[60px] pointer-events-none"></div>
            </div>

            {/* Lado Izquierdo (Logo) - Cajas diagonales (Angostas para liberar el centro) */}
            {/* Cyan */}
            <div className="absolute top-0 bottom-0 left-[-50px] w-[310px] bg-[#00b4e6] -skew-x-[22deg]"></div>
            {/* Pink */}
            <div className="absolute top-0 bottom-0 left-[-50px] w-[298px] bg-[#e91e63] -skew-x-[22deg]"></div>
            {/* White */}
            <div className="absolute top-0 bottom-0 left-[-50px] w-[286px] bg-white -skew-x-[22deg]"></div>

            {/* Lado Derecho (QR) - Cajas diagonales (Angostas para liberar el centro) */}
            {/* Cyan */}
            <div className="absolute top-0 bottom-0 right-[-50px] w-[210px] bg-[#00b4e6] -skew-x-[22deg]"></div>
            {/* Pink */}
            <div className="absolute top-0 bottom-0 right-[-50px] w-[198px] bg-[#e91e63] -skew-x-[22deg]"></div>
            {/* White */}
            <div className="absolute top-0 bottom-0 right-[-50px] w-[186px] bg-white -skew-x-[22deg]"></div>

            {/* ================= CONTENIDO (Por encima de los fondos) ================= */}
            <div className="relative z-10 w-full h-full flex flex-row">
               
               {/* Zona Logo (Izquierda) */}
               <div className="w-[260px] h-full flex items-center justify-center shrink-0 pr-8">
                  <div className="w-[160px] h-[120px] relative">
                    <Image src="/images/avidela-logo1.png" alt="Logo" fill className="object-contain" />
                  </div>
               </div>

               {/* Zona Central (Texto y Redes) - Ahora tiene más respiro a los costados */}
               <div className="flex-1 h-full flex flex-col items-center justify-center px-4 pt-1">
                  {/* Título Principal */}
                  <h1 className="text-[4.5rem] leading-none font-black italic tracking-[-0.01em] text-transparent bg-clip-text bg-gradient-to-r from-[#fc6197] via-[#e91e63] to-[#00d4ff] mb-2 drop-shadow-sm">
                     AVIDELA SPORT
                  </h1>

                  {/* Franja de Redes y Web */}
                  <div className="flex items-center space-x-6 text-slate-300 text-[12px] font-bold tracking-[0.1em] uppercase opacity-90">
                    
                    <span className="flex items-center">
                       <span className="text-[#e91e63] font-black mr-1 opacity-90 drop-shadow-md">@</span>avidelasport
                    </span>
                    
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1b2a4e]"></span>
                    
                    <span className="flex items-center">
                       <span className="text-[#e91e63] font-black mr-1 opacity-90 drop-shadow-md">@</span>avidelasportacademy
                    </span>
                    
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1b2a4e]"></span>
                    
                    {/* Dominio Oficial */}
                    <span className="flex items-center text-[#00b4e6] uppercase" style={{ letterSpacing: '0.08em' }}>
                       {/* Icono de Web */}
                       <svg className="w-[14px] h-[14px] mr-[5px] opacity-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                       </svg>
                       AVIDELASPORT.COM
                    </span>
                  </div>
               </div>

               {/* Zona QR (Derecha) */}
               <div className="w-[150px] h-full flex items-center justify-center shrink-0 pl-2">
                  <div className="w-[90px] h-[90px] relative bg-transparent">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={pureQrCodeUrl} alt="QR" className="w-[90px] h-[90px] absolute inset-0 m-auto mix-blend-multiply" />
                  </div>
               </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
