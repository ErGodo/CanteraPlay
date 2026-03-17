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
      <div className="w-full h-full p-1" id="results-empty">
        <div 
          className="w-full h-full relative overflow-hidden bg-slate-950 flex flex-col justify-center items-center border border-slate-800/40 rounded-3xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#e91e63]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#0F8DBF]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10 flex flex-col items-center gap-4 text-center px-6">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 mb-2">
              <span className="text-3xl">⚽</span>
            </div>
            <h3 className="text-lg font-bold text-white">Próximamente más resultados</h3>
            <p className="text-xs text-slate-500 max-w-[200px] uppercase tracking-wider font-semibold">Temporada 2026</p>
          </div>
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
                      <div className="relative group/logo w-16 h-16 sm:w-24 sm:h-24 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-2 flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:border-[#e91e63]/30">
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
                      <div className="relative group/logo w-16 h-16 sm:w-24 sm:h-24 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-2 flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:border-[#e91e63]/30">
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
