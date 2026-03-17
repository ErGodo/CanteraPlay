"use client";
import { formatDMY } from "@/lib/formatDate";
import React from "react";
/* eslint-disable @typescript-eslint/no-explicit-any */
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type ResultItem = {
  _id?: string;
  homeTeam?: any;
  awayTeam?: any;
  homeScore?: number | string;
  awayScore?: number | string;
  date?: string | Date | null;
  categoryGlosa?: string;
  competition?: string;
  league?: string;
  note?: string;
};

export default function ResultsCarousel({ results }: { results: ResultItem[] }) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  
  if (!results || results.length === 0) {
    return (
      <div className="w-full h-full py-1" id="results-empty">
        <div 
          className="w-full h-full relative overflow-hidden bg-[#020617] flex flex-col justify-center items-center border border-white/5 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] group/empty"
        >
          {/* Animated Background Mesh */}
          <div className="absolute inset-0 opacity-20 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#e91e63] rounded-full blur-[80px] animate-pulse" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#0F8DBF] rounded-full blur-[80px] animate-pulse [animation-delay:1s]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
          </div>
          
          <div className="relative z-10 flex flex-col items-center gap-3 sm:gap-6 px-4">
            {/* Levitating Icon Container */}
            <div className="relative scale-75 sm:scale-100">
              <div className="absolute inset-0 bg-white/10 rounded-full blur-2xl transition-all duration-500" />
              <div className="relative w-20 h-20 sm:w-28 sm:h-28 flex items-center justify-center rounded-[1.8rem] bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border border-white/10 shadow-2xl animate-bounce [animation-duration:3s]">
                <span className="text-4xl sm:text-6xl drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">⚽</span>
                
                {/* Orbital dots */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#e91e63] rounded-full border-2 border-[#020617] shadow-[0_0_10px_rgba(233,30,99,0.5)]" />
                <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-[#0F8DBF] rounded-full border-2 border-[#020617] shadow-[0_0_10px_rgba(15,141,191,0.5)]" />
              </div>
            </div>

            <div className="flex flex-col items-center gap-1 sm:gap-2">
              <h3 className="text-lg sm:text-2xl font-bold text-white tracking-tight text-center leading-tight">
                PRÓXIMAMENTE <br />
                <span className="text-[#e91e63]">MÁS RESULTADOS</span>
              </h3>
              
              <div className="flex items-center gap-3 mt-1 opacity-60">
                <div className="h-px w-6 bg-gradient-to-r from-transparent to-white/30" />
                <p className="text-[9px] sm:text-xs text-slate-400 uppercase tracking-[0.3em] font-semibold">
                  TEMPORADA 2026
                </p>
                <div className="h-px w-6 bg-gradient-to-l from-transparent to-white/30" />
              </div>
            </div>
          </div>

          {/* Bottom highlight bar */}
          <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#e91e63]/40 to-transparent" />
        </div>
      </div>
    );
  }

  const fmtDMY = (d: any) => (d ? formatDMY(d) : "");

  return (
    <div className="w-full h-full group/swiper" id="results-carousel">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true, dynamicBullets: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        loop={results.length > 1}
        allowTouchMove
        slidesPerView={1}
        className="rounded-3xl w-full h-full shadow-2xl border border-slate-800/40"
      >
        {results.map((r, idx) => {
          const homeName = r.homeTeam?.name || (typeof r.homeTeam === 'string' ? r.homeTeam : "Local");
          const awayName = r.awayTeam?.name || (typeof r.awayTeam === 'string' ? r.awayTeam : "Visitante");
          
          const homeLogo = r.homeTeam?.logo;
          const awayLogo = r.awayTeam?.logo;

          const key = r._id || `${idx}`;
          const badgeText = r.categoryGlosa || r.competition || r.league || r.note || "";

          const homeScore = r.homeScore ?? "—";
          const awayScore = r.awayScore ?? "—";

          return (
            <SwiperSlide key={key} className="w-full h-full">
              <div
                className="w-full h-full relative overflow-hidden bg-slate-950 p-6 flex flex-col justify-center items-center"
              >
                {/* Brand Gradients */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#e91e63]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#0F8DBF]/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

                {badgeText && (
                  <div className="absolute top-4 sm:top-6 z-20">
                    <span className="px-3 py-1 text-[10px] sm:text-xs font-black tracking-[0.15em] uppercase rounded-full bg-[#e91e63]/10 text-[#e91e63] border border-[#e91e63]/30 backdrop-blur-md shadow-[0_0_15px_rgba(233,30,99,0.1)]">
                      {badgeText}
                    </span>
                  </div>
                )}

                <div className="relative z-10 w-full flex flex-col items-center justify-center gap-6 sm:gap-8 h-full">
                  {/* Score View Optimized */}
                  <div className="flex items-center justify-between w-full max-w-lg gap-4 sm:gap-8">
                    {/* Home Team */}
                    <div className="flex flex-col items-center gap-3 flex-1">
                      <div className="relative group/logo w-16 h-16 sm:w-24 sm:h-24 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-1 sm:p-2 flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:border-[#e91e63]/30">
                        <div className="absolute inset-0 bg-white rounded-2xl opacity-90" />
                        {homeLogo ? (
                          <img src={homeLogo} alt={homeName} className="relative z-10 object-contain w-full h-full p-1" />
                        ) : (
                          <span className="relative z-10 text-xs font-black text-slate-800">LOC</span>
                        )}
                      </div>
                      <span className="text-xs sm:text-sm font-black text-white text-center uppercase tracking-tight line-clamp-1">{homeName}</span>
                    </div>

                    {/* Result Center */}
                    <div className="flex flex-col items-center gap-1 sm:gap-2">
                       <div className="flex items-center gap-2 sm:gap-4">
                          <span className="text-3xl sm:text-5xl font-black text-white tracking-tighter tabular-nums drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                            {homeScore}
                          </span>
                          <span className="text-[#e91e63] text-xl sm:text-3xl font-black animate-pulse">-</span>
                          <span className="text-3xl sm:text-5xl font-black text-white tracking-tighter tabular-nums drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                            {awayScore}
                          </span>
                       </div>
                       <div className="text-[9px] sm:text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]" suppressHydrationWarning>
                         {fmtDMY(r.date)}
                       </div>
                    </div>

                    {/* Away Team */}
                    <div className="flex flex-col items-center gap-3 flex-1">
                      <div className="relative group/logo w-16 h-16 sm:w-24 sm:h-24 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-1 sm:p-2 flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:border-[#e91e63]/30">
                        <div className="absolute inset-0 bg-white rounded-2xl opacity-90" />
                        {awayLogo ? (
                          <img src={awayLogo} alt={awayName} className="relative z-10 object-contain w-full h-full p-1" />
                        ) : (
                          <span className="relative z-10 text-xs font-black text-slate-800">VIS</span>
                        )}
                      </div>
                      <span className="text-xs sm:text-sm font-black text-white text-center uppercase tracking-tight line-clamp-1">{awayName}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom line hint */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#e91e63]/20 to-transparent" />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      
      {/* Custom styles for swiper bullets if needed */}
      <style jsx global>{`
        .swiper-pagination-bullet { background: #64748b !important; opacity: 0.5 !important; }
        .swiper-pagination-bullet-active { background: #e91e63 !important; opacity: 1 !important; }
        .swiper-button-next, .swiper-button-prev { color: #e91e63 !important; transform: scale(0.6); opacity: 0; transition: opacity 0.3s; }
        .group\/swiper:hover .swiper-button-next, .group\/swiper:hover .swiper-button-prev { opacity: 1; }
      `}</style>
    </div>
  );
}
