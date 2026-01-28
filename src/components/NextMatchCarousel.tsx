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
        // Skeleton placeholder to prevent layout shift during hydration
        <div className="min-h-[200px] flex items-center justify-center text-white/50" suppressHydrationWarning>Cargando próximos partidos...</div>
    );

    if (!matches || matches.length === 0) {
        // Fallback if no matches
        return (
            <div className="p-8 text-center text-white/90 flex flex-col items-center justify-center min-h-[200px]">
                <h3 className="text-2xl font-bold mb-2">Próximo Partido</h3>
                <p>A programar</p>
            </div>
        );
    }

    return (
        <div className="w-full next-match-swiper relative">
            <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                    modifierClass: 'swiper-pagination-custom-'
                }}
                autoplay={{ delay: 6000, disableOnInteraction: false }}
                loop={matches.length > 1}
                className="w-full"
            >
                {matches.map((match) => (
                    <SwiperSlide key={match.id}>
                        <div className="grid md:grid-cols-2 items-center min-h-[260px] relative z-10">
                            {/* Left Info */}
                            <div className="px-6 md:px-12 py-8 text-white min-w-0 flex flex-col justify-center h-full relative z-20">
                                <h3 className="text-3xl sm:text-4xl font-extrabold italic tracking-tighter uppercase text-white mb-3 drop-shadow-lg">
                                    Próximo Partido
                                </h3>
                                {match.category && (
                                    <div className="inline-flex items-center justify-center bg-white/20 backdrop-blur-md rounded-full px-4 py-1.5 text-xs font-bold text-white tracking-wide uppercase mb-4 border border-white/30 w-fit">
                                        {match.category.name}
                                    </div>
                                )}

                                <div className="space-y-1 mb-4">
                                    <div className="text-white text-2xl sm:text-3xl font-bold leading-tight" suppressHydrationWarning>
                                        {formatLocaleLong(match.dateTime)}
                                    </div>
                                    <div className="text-white/90 text-xl font-semibold flex items-center gap-2">
                                        <span className="bg-black/30 px-2 py-1 rounded text-sm sm:text-base font-mono" suppressHydrationWarning>
                                            {formatTime(match.dateTime)} hrs
                                        </span>
                                    </div>
                                </div>

                                <div className="text-sm sm:text-base text-white/90 mt-2 flex items-center gap-2 font-medium">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span className="uppercase tracking-wide">{match.venue || "Estadio Nacional"}</span>
                                </div>
                            </div>

                            {/* Right Teams */}
                            <div className="px-6 md:px-12 py-6 flex items-center justify-center h-full relative z-10">
                                {/* Decorative background element for team area */}
                                <div className="absolute inset-0 bg-gradient-to-l from-black/20 to-transparent md:bg-gradient-to-l md:from-black/10 md:via-transparent md:to-transparent pointer-events-none rounded-r-3xl" />

                                <div className="flex items-center justify-center gap-6 sm:gap-10 w-full max-w-lg relative z-20">
                                    {/* Home */}
                                    <div className="flex flex-col items-center gap-3 w-1/3 text-center group">
                                        <div className="relative w-24 h-24 sm:w-28 sm:h-28 transition-transform duration-300 group-hover:scale-110 drop-shadow-2xl filter">
                                            {/* Removed white circle background to prevent cutting off 'pointy bits' */}
                                            {match.homeTeam?.logoUrl ? (
                                                <Image
                                                    src={match.homeTeam.logoUrl}
                                                    alt={match.homeTeam.name}
                                                    width={112}
                                                    height={112}
                                                    className="object-contain w-full h-full drop-shadow-lg rounded-3xl"
                                                    priority
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                                                    <span className="text-white/70 font-bold text-xs">{match.homeTeam?.name?.substring(0, 3) || "LOC"}</span>
                                                </div>
                                            )}
                                        </div>
                                        <span className="text-white text-sm sm:text-base font-bold leading-tight line-clamp-2 drop-shadow-md tracking-tight">
                                            {match.homeTeam?.name || "Local"}
                                        </span>
                                    </div>

                                    {/* VS */}
                                    <div className="flex flex-col items-center justify-center">
                                        <span className="text-5xl sm:text-6xl font-black text-white/20 italic transform -skew-x-12 select-none">
                                            VS
                                        </span>
                                    </div>

                                    {/* Away */}
                                    <div className="flex flex-col items-center gap-3 w-1/3 text-center group">
                                        <div className="relative w-24 h-24 sm:w-28 sm:h-28 transition-transform duration-300 group-hover:scale-110 drop-shadow-2xl filter">
                                            {match.awayTeam?.logoUrl ? (
                                                <Image
                                                    src={match.awayTeam.logoUrl}
                                                    alt={match.awayTeam.name}
                                                    width={112}
                                                    height={112}
                                                    className="object-contain w-full h-full drop-shadow-lg rounded-3xl"
                                                    priority
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                                                    <span className="text-white/70 font-bold text-[10px] sm:text-xs">RIVAL</span>
                                                </div>
                                            )}
                                        </div>
                                        <span className="text-white text-sm sm:text-base font-bold leading-tight line-clamp-2 drop-shadow-md tracking-tight">
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
            background: rgba(255, 255, 255, 0.4);
            opacity: 1;
            width: 8px;
            height: 8px;
            margin: 0 5px !important;
            transition: all 0.3s ease;
        }
        .next-match-swiper .swiper-pagination-bullet-active {
            background: #fff;
            width: 24px;
            border-radius: 4px;
            box-shadow: 0 0 10px rgba(255,255,255,0.5);
        }
      `}</style>
        </div>
    );
}
