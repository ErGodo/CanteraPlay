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

    if (!mounted) return (
        // Skeleton placeholder to prevent layout shift during hydration
        <div className="min-h-[200px] flex items-center justify-center text-white/50">Cargando próximos partidos...</div>
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
        <div className="w-full next-match-swiper">
            <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                    modifierClass: 'swiper-pagination-custom-' // Avoid conflicts
                }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop={matches.length > 1}
                className="w-full"
            >
                {matches.map((match) => (
                    <SwiperSlide key={match.id}>
                        <div className="grid md:grid-cols-2 items-center min-h-[240px]">
                            {/* Left Info */}
                            <div className="px-6 md:px-10 py-8 text-white min-w-0 flex flex-col justify-center h-full">
                                <h3 className="text-2xl sm:text-3xl font-black italic tracking-tighter uppercase text-white mb-2 shadow-black/10 drop-shadow-md">
                                    Próximo Partido
                                </h3>
                                {match.category && (
                                    <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-bold text-white w-fit mb-3 border border-white/30">
                                        {match.category.name}
                                    </div>
                                )}

                                <div className="text-white/95 text-xl sm:text-2xl font-bold leading-tight">
                                    {formatLocaleLong(match.dateTime)}
                                </div>
                                <div className="text-white/80 text-sm mt-1 font-medium bg-black/20 w-fit px-2 py-0.5 rounded">
                                    {match.dateTime ? new Date(match.dateTime).toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' }) : ''} hrs
                                </div>

                                <div className="text-sm text-white/80 mt-4 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span className="uppercase tracking-wide font-semibold">{match.venue || "Sin Información"}</span>
                                </div>
                            </div>

                            {/* Right Teams */}
                            <div className="px-6 md:px-10 py-6 flex items-center justify-center h-full bg-black/5">
                                <div className="flex items-center justify-center gap-4 sm:gap-8 w-full max-w-md">
                                    {/* Home */}
                                    <div className="flex flex-col items-center gap-3 w-1/3 text-center">
                                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full p-3 shadow-xl flex items-center justify-center ring-4 ring-white/20">
                                            {match.homeTeam?.logoUrl ? (
                                                <Image src={match.homeTeam.logoUrl} alt={match.homeTeam.name} width={80} height={80} className="object-contain w-full h-full" />
                                            ) : (
                                                <span className="text-gray-400 font-bold text-xs">{match.homeTeam?.name?.substring(0, 3) || "LOC"}</span>
                                            )}
                                        </div>
                                        <span className="text-white text-sm sm:text-base font-bold leading-tight line-clamp-2 drop-shadow-md">{match.homeTeam?.name || "Local"}</span>
                                    </div>

                                    {/* VS */}
                                    <div className="flex flex-col items-center">
                                        <span className="text-4xl sm:text-5xl font-black text-white/30 italic transform -skew-x-12">VS</span>
                                    </div>

                                    {/* Away */}
                                    <div className="flex flex-col items-center gap-3 w-1/3 text-center">
                                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full p-3 shadow-xl flex items-center justify-center ring-4 ring-white/20">
                                            {match.awayTeam?.logoUrl ? (
                                                <Image src={match.awayTeam.logoUrl} alt={match.awayTeam.name} width={80} height={80} className="object-contain w-full h-full" />
                                            ) : (
                                                <div className="text-center">
                                                    <span className="text-gray-400 font-bold text-[10px] sm:text-xs">RIVAL</span>
                                                </div>
                                            )}
                                        </div>
                                        <span className="text-white text-sm sm:text-base font-bold leading-tight line-clamp-2 drop-shadow-md">{match.awayTeam?.name || "Rival"}</span>
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
            background: rgba(255, 255, 255, 0.5);
            opacity: 1;
        }
        .next-match-swiper .swiper-pagination-bullet-active {
            background: #fff;
            width: 20px;
            border-radius: 4px;
        }
      `}</style>
        </div>
    );
}
