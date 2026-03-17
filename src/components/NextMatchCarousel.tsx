"use client";

import { formatLocaleLong } from "@/lib/formatDate";
import Image from "next/image";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Types matching the Backend response
type Team = {
    id: string;
    name: string;
    logoUrl?: string;
};

type Match = {
    id: string;
    dateTime: string;
    venue: string;
    homeTeam: Team;
    awayTeam: Team;
    category?: { name: string; glosa?: string };
    league?: { name: string };
};

export default function NextMatchCarousel({ matches }: { matches: Match[] }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    // Helper to format time cleanly
    const formatTime = (dateIso: string) => {
        if (!dateIso) return '';
        const d = new Date(dateIso);
        // Force 24h format HH:mm
        return d.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit', hour12: false });
    };

    if (!mounted) return (
        <div className="min-h-[200px] flex items-center justify-center text-white/50" suppressHydrationWarning>Cargando próximos partidos...</div>
    );

    if (!matches || matches.length === 0) {
        return (
            <div className="p-8 text-center text-white/90 flex flex-col items-center justify-center min-h-[220px] bg-slate-950/20 backdrop-blur-sm">
                <h3 className="text-xl font-black uppercase tracking-widest mb-2 opacity-50">Próximo Partido</h3>
                <p className="text-sm font-bold text-slate-500">PROGRAMACIÓN PENDIENTE</p>
                <div className="mt-4 w-12 h-1 bg-[#e91e63]/30 rounded-full" />
            </div>
        );
    }

    return (
        <div className="w-full next-match-swiper relative group">
            <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                autoplay={{ delay: 6000, disableOnInteraction: false }}
                loop={matches.length > 1}
                className="w-full"
            >
                {matches.map((match) => (
                    <SwiperSlide key={match.id}>
                        <div className="grid lg:grid-cols-2 items-center min-h-[280px] relative z-10 overflow-hidden">
                            
                            {/* Brand Accent Blur */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#e91e63]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#0F8DBF]/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                            {/* Left Info */}
                            <div className="px-6 md:px-12 py-10 text-white min-w-0 flex flex-col justify-center h-full relative z-20">
                                <h3 className="text-3xl sm:text-4xl font-black italic tracking-tighter uppercase text-white mb-4 drop-shadow-lg">
                                    Próximo <span className="text-[#e91e63]">Partido</span>
                                </h3>
                                
                                <div className="flex flex-wrap items-center gap-3 mb-6">
                                    {match.category && (
                                        <div className="inline-flex items-center justify-center bg-[#e91e63]/10 backdrop-blur-md rounded-lg px-3 py-1 text-[10px] font-black text-[#e91e63] tracking-[0.1em] uppercase border border-[#e91e63]/20">
                                            {match.category.name}
                                        </div>
                                    )}
                                    {match.league && (
                                        <div className="inline-flex items-center justify-center bg-white/5 backdrop-blur-md rounded-lg px-3 py-1 text-[10px] font-black text-white/60 tracking-[0.1em] uppercase border border-white/10">
                                            {match.league.name}
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2 mb-6">
                                    <div className="text-white text-2xl sm:text-3xl font-black tracking-tight" suppressHydrationWarning>
                                        {formatLocaleLong(match.dateTime)}
                                    </div>
                                    <div className="text-white/90 text-xl font-bold flex items-center gap-2">
                                        <span className="bg-white/10 px-3 py-1 rounded-xl text-sm sm:text-lg font-black tracking-widest border border-white/10" suppressHydrationWarning>
                                            {formatTime(match.dateTime)} HRS
                                        </span>
                                    </div>
                                </div>

                                <div className="text-xs sm:text-sm text-slate-400 flex items-center gap-2 font-bold uppercase tracking-wider">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#e91e63]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>{match.venue || "ESTADIO A DEFINIR"}</span>
                                </div>
                            </div>

                            {/* Right Teams */}
                            <div className="px-6 md:px-12 py-8 flex items-center justify-center h-full relative z-10 bg-white/5 backdrop-blur-[2px]">
                                <div className="flex items-center justify-center gap-4 sm:gap-12 w-full max-w-lg relative z-20">
                                    {/* Home */}
                                    <div className="flex flex-col items-center gap-3 w-1/3 text-center group/team">
                                        <div className="relative w-20 h-20 sm:w-32 sm:h-32 bg-white rounded-3xl shadow-2xl p-3 transition-all duration-500 group-hover/team:scale-110 group-hover/team:rotate-3 flex items-center justify-center border-4 border-transparent group-hover/team:border-[#e91e63]/20">
                                            {match.homeTeam?.logoUrl ? (
                                                <Image
                                                    src={match.homeTeam.logoUrl}
                                                    alt={match.homeTeam.name}
                                                    width={128}
                                                    height={128}
                                                    className="object-contain w-full h-full"
                                                    priority
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <span className="text-slate-300 font-black text-sm uppercase">LOC</span>
                                                </div>
                                            )}
                                        </div>
                                        <span className="text-white text-xs sm:text-sm font-black uppercase tracking-tight line-clamp-2 drop-shadow-md">
                                            {match.homeTeam?.name || "Local"}
                                        </span>
                                    </div>

                                    {/* VS */}
                                    <div className="flex flex-col items-center justify-center px-2">
                                        <div className="relative">
                                            <span className="text-4xl sm:text-6xl font-black text-white/10 italic transform -skew-x-12 select-none tracking-tighter">
                                                VS
                                            </span>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-[#e91e63]/50 to-transparent" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Away */}
                                    <div className="flex flex-col items-center gap-3 w-1/3 text-center group/team">
                                        <div className="relative w-20 h-20 sm:w-32 sm:h-32 bg-white rounded-3xl shadow-2xl p-3 transition-all duration-500 group-hover/team:scale-110 group-hover/team:-rotate-3 flex items-center justify-center border-4 border-transparent group-hover/team:border-[#e91e63]/20">
                                            {match.awayTeam?.logoUrl ? (
                                                <Image
                                                    src={match.awayTeam.logoUrl}
                                                    alt={match.awayTeam.name}
                                                    width={128}
                                                    height={128}
                                                    className="object-contain w-full h-full"
                                                    priority
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <span className="text-slate-300 font-black text-sm uppercase">VIS</span>
                                                </div>
                                            )}
                                        </div>
                                        <span className="text-white text-xs sm:text-sm font-black uppercase tracking-tight line-clamp-2 drop-shadow-md">
                                            {match.awayTeam?.name || "Rival"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Styles for Pagination */}
            <style jsx global>{`
        .next-match-swiper .swiper-pagination-bullet {
            background: rgba(255, 255, 255, 0.2);
            opacity: 1;
            width: 8px;
            height: 8px;
            margin: 0 5px !important;
            transition: all 0.3s ease;
        }
        .next-match-swiper .swiper-pagination-bullet-active {
            background: #e91e63 !important;
            width: 32px;
            border-radius: 4px;
            box-shadow: 0 0 15px rgba(233, 30, 99, 0.5);
        }
      `}</style>
        </div>
    );
}
