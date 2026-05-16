import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SectionHeading from "@/components/SectionHeading";
import TrainingGallery from "@/components/TrainingGallery";
import { getTrainingPhotos } from "@/lib/getTrainingPhotos";
import { IconBallFootball, IconCalendar, IconCheck, IconClock, IconCoin, IconMapPin, IconUsers } from "@tabler/icons-react";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
    title: "Entrenamientos de Fútbol en Santiago | Ñuñoa y San Miguel | Avidela Sport",
    description: "Entrena fútbol en Santiago con Avidela Sport. Clases para niños desde 3 años y adultos en Ñuñoa y San Miguel. Primera clase gratis. Inscríbete hoy.",
    openGraph: {
        title: "Entrenamientos de Fútbol en Santiago | Ñuñoa y San Miguel | Avidela Sport",
        description: "Entrena fútbol en Santiago con Avidela Sport. Clases para niños desde 3 años y adultos en Ñuñoa y San Miguel. Primera clase gratis. Inscríbete hoy.",
        url: "https://avidelasport.com/entrenamientos",
        type: "website",
    }
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    "name": "Entrenamientos Avidela Sport",
    "description": "Entrenamientos de fútbol para todas las edades en Ñuñoa y San Miguel.",
    "url": "https://avidelasport.com/entrenamientos",
    "address": [
        {
            "@type": "PostalAddress",
            "streetAddress": "Guillermo Mann 1420",
            "addressLocality": "Ñuñoa",
            "addressRegion": "Santiago"
        },
        {
            "@type": "PostalAddress",
            "streetAddress": "Gran Avenida José Miguel Carrera 3204",
            "addressLocality": "San Miguel",
            "addressRegion": "Santiago"
        }
    ]
};

// Client Component for Tabs & FAQ
import EntrenamientosClient from "./EntrenamientosClient";

export const dynamic = "force-dynamic";

export default async function EntrenamientosPage() {
    const trainingPhotos = await getTrainingPhotos();

    return (
        <div className="font-sans min-h-screen bg-slate-950 text-slate-200 overflow-x-hidden" suppressHydrationWarning>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Navbar Wrapper */}
            <div className="absolute top-0 left-0 w-full z-50 pointer-events-none" suppressHydrationWarning>
                <div className="pointer-events-auto">
                    <Navbar />
                </div>
            </div>

            {/* HERO */}
            <div className="relative w-full min-h-[80vh] flex items-center justify-center pt-24 pb-12 overflow-hidden bg-slate-950">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/player-hero.png"
                        alt="Background"
                        className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950" />
                </div>

                <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 flex flex-col items-center">
                        <span className="px-4 py-2 bg-[#e91e63]/10 text-[#e91e63] rounded-full border border-[#e91e63]/30 font-black text-xs uppercase tracking-widest mb-8">
                            Primera clase gratis en Ñuñoa
                        </span>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-6 drop-shadow-2xl leading-[1.1]">
                            Entrena con <span className="text-pink-500">Avidela Sport</span>
                            <br />
                            <span className="text-white text-3xl sm:text-4xl md:text-5xl">en Santiago</span>
                        </h1>
                    </div>

                    <p className="text-lg md:text-2xl text-slate-300 font-medium max-w-3xl mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-5 duration-700 delay-150">
                        Fútbol para todas las edades en Ñuñoa y San Miguel
                    </p>

                    <div className="animate-in fade-in zoom-in duration-500 delay-300 flex flex-col sm:flex-row gap-4">
                        <a
                            href="https://wa.me/56938997570?text=Hola,%20quiero%20información%20sobre%20los%20entrenamientos"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-300 bg-pink-600 rounded-full hover:bg-pink-500 hover:scale-105 shadow-[0_0_20px_rgba(233,30,99,0.5)]"
                        >
                            <span>Inscribirme</span>
                            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                        </a>
                        <a href="#horarios" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-300 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20">
                            Ver horarios
                        </a>
                    </div>
                </div>
            </div>

            <div className="mx-auto w-full max-w-[95%] lg:max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 space-y-32 mb-32">
                
                {/* TABS & HORARIOS (Client Component) */}
                <section id="horarios" className="scroll-mt-32">
                    <SectionHeading title="Nuestras" highlight=" Sedes y Horarios" subtitle="Encuentra tu lugar de entrenamiento" />
                    <EntrenamientosClient />
                </section>

                {/* GALERÍA */}
                <section>
                    <SectionHeading title="Así son nuestros" highlight=" entrenamientos" subtitle="Fotos reales de nuestras sesiones en Ñuñoa y San Miguel" />
                    <div className="mt-12">
                        <TrainingGallery photos={trainingPhotos} />
                    </div>
                </section>

                {/* ¿POR QUÉ ENTRENAR CON NOSOTROS? */}
                <section>
                    <SectionHeading title="¿Por qué entrenar" highlight=" con nosotros?" subtitle="Beneficios de ser parte de Avidela Sport" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                        {[
                            { title: "Formación profesional", desc: "Para todas las edades y niveles", icon: <IconBallFootball className="w-8 h-8" /> },
                            { title: "Ambiente familiar", desc: "Una comunidad unida por el fútbol", icon: <IconUsers className="w-8 h-8" /> },
                            { title: "Dos ubicaciones", desc: "Entrena en Ñuñoa o San Miguel", icon: <IconMapPin className="w-8 h-8" /> },
                            { title: "Prueba gratis", desc: "Tu primera clase es gratis (en Ñuñoa)", icon: <IconCheck className="w-8 h-8" /> }
                        ].map((b, i) => (
                            <div key={i} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col items-center text-center group hover:border-pink-500/50 transition-colors">
                                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-pink-500 mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-pink-500/10">
                                    {b.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{b.title}</h3>
                                <p className="text-slate-400 text-sm font-medium">{b.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA FINAL */}
                <section className="relative rounded-[40px] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a1a3c] via-slate-900 to-[#e91e63] opacity-90 z-0" />
                    <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10 mix-blend-overlay z-0" />
                    
                    <div className="relative z-10 px-6 py-20 md:py-24 flex flex-col items-center text-center">
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 drop-shadow-lg tracking-tight">
                            ¿Listo para dar el primer paso?
                        </h2>
                        <p className="text-lg md:text-xl text-slate-200 font-medium max-w-2xl mb-10 drop-shadow-md">
                            Primera clase gratis en Ñuñoa · Dos ubicaciones en Santiago
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <a
                                href="https://wa.me/56938997570?text=Hola,%20quiero%20información%20sobre%20los%20entrenamientos"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex justify-center items-center px-8 py-4 bg-white text-pink-600 rounded-full font-black text-lg hover:scale-105 transition-transform shadow-[0_10px_25px_-5px_rgba(255,255,255,0.3)]"
                            >
                                WhatsApp
                            </a>
                            <a
                                href="https://app.canteraplay.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex justify-center items-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-black text-lg hover:bg-white/10 transition-colors"
                            >
                                CanteraPlay
                            </a>
                        </div>
                    </div>
                </section>

            </div>

            <Footer />
        </div>
    );
}
