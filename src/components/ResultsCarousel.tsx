"use client";
import { formatDMY } from "@/lib/formatDate";
import Image from "next/image";
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
  categoryGlosa?: any;
  category?: any;
  competition?: any;
  league?: any;
  note?: any;
  colors?: { primary?: string; secondary?: string };
};

export default function ResultsCarousel({ results }: { results: ResultItem[] }) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!results || results.length === 0) return null;
  if (!mounted) return null; // Avoid hydration mismatch

  const slides = results;
  const hasMultiple = slides.length > 1;

  const safeText = (v: any) => {
    if (v == null) return "";
    if (typeof v === "string") return v;
    if (typeof v === "object") {
      if (typeof v.name === "string") return v.name;
      if (typeof v.title === "string") return v.title;
      if (typeof v._ref === "string") return v._ref;
      return "";
    }
    return String(v);
  };

  const fmtDMY = (d: any) => (d ? formatDMY(d) : "");

  return (
    <div className="w-full h-full" id="results-carousel">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true, dynamicBullets: true }}
        autoplay={
          hasMultiple ? { delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true } : false
        }
        loop={hasMultiple}
        allowTouchMove
        observer
        observeParents
        watchSlidesProgress
        slidesPerView={1}
        className="rounded-3xl w-full h-full shadow-lg"
      >
        {slides.map((r, idx) => {
          const homeName = safeText(r.homeTeam);
          const awayName = safeText(r.awayTeam);

          const homeLogo = r?.homeTeam?.logo?.asset?.url as string | undefined;
          const awayLogo = r?.awayTeam?.logo?.asset?.url as string | undefined;
          const homeLqip = r?.homeTeam?.logo?.asset?.metadata?.lqip as string | undefined;
          const awayLqip = r?.awayTeam?.logo?.asset?.metadata?.lqip as string | undefined;

          const key = r._id || `${homeName}-${awayName}-${idx}`;
          const badgeText = safeText(
            r.categoryGlosa ?? r.category ?? r.competition ?? r.league ?? r.note
          );

          const homeScore = r.homeScore ?? "—";
          const awayScore = r.awayScore ?? "—";

          return (
            <SwiperSlide key={key} className="w-full h-full">
              <div
                className="w-full h-full relative overflow-hidden bg-slate-900 p-6 flex flex-col justify-center items-center border border-slate-800/50 rounded-3xl"
                style={{
                  background: "linear-gradient(145deg, #0f172a 0%, #1e1b4b 100%)"
                }}
              >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                {badgeText && (
                  <div className="absolute top-3 sm:top-6 z-20">
                    <span
                      className="px-2 py-0.5 text-[10px] sm:text-xs sm:px-4 sm:py-1 font-bold tracking-wider uppercase rounded-full bg-blue-500/20 text-blue-200 border border-blue-500/30 backdrop-blur-sm shadow-sm"
                    >
                      {badgeText}
                    </span>
                  </div>
                )}

                <div className="relative z-10 w-full flex flex-col items-center justify-center gap-6 sm:gap-8 h-full">
                  {/* Mobile View */}
                  <div className="md:hidden flex flex-col items-center gap-4 w-full">
                    <div className="flex items-center justify-center gap-8 w-full">
                      <div className="flex flex-col items-center gap-2 w-1/3">
                        <div className="w-20 h-20 bg-white rounded-2xl shadow-lg p-2 flex items-center justify-center overflow-hidden">
                          {homeLogo ? (
                            <Image src={homeLogo} alt={homeName} width={80} height={80} className="object-contain w-full h-full" />
                          ) : (<span className="text-xs font-bold text-slate-500">{homeName?.slice(0, 3)}</span>)}
                        </div>
                        <span className="text-sm font-bold text-center leading-tight line-clamp-2 h-10 flex items-center text-white">{homeName}</span>
                      </div>

                      <div className="flex flex-col items-center gap-1">
                        <span className="text-3xl font-black text-white tracking-tight">{homeScore}-{awayScore}</span>
                        <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">Final</span>
                      </div>

                      <div className="flex flex-col items-center gap-2 w-1/3">
                        <div className="w-20 h-20 bg-white rounded-2xl shadow-lg p-2 flex items-center justify-center overflow-hidden">
                          {awayLogo ? (
                            <Image src={awayLogo} alt={awayName} width={80} height={80} className="object-contain w-full h-full" />
                          ) : (<span className="text-xs font-bold text-slate-500">{awayName?.slice(0, 3)}</span>)}
                        </div>
                        <span className="text-sm font-bold text-center leading-tight line-clamp-2 h-10 flex items-center text-white">{awayName}</span>
                      </div>
                    </div>
                  </div>

                  {/* Desktop View */}
                  <div className="hidden md:flex items-center justify-center w-full max-w-2xl gap-12">
                    {/* Home */}
                    <div className="flex flex-col items-center gap-4 flex-1">
                      <div className="w-28 h-28 bg-white rounded-2xl shadow-xl p-3 flex items-center justify-center transition-transform hover:scale-105 duration-300">
                        {homeLogo ? (
                          <Image src={homeLogo} alt={homeName} width={100} height={100} className="object-contain w-full h-full" />
                        ) : (<span className="font-bold text-slate-500 text-lg">LOC</span>)}
                      </div>
                      <span className="text-lg font-bold text-white text-center">{homeName}</span>
                    </div>

                    {/* Score */}
                    <div className="flex flex-col items-center px-4">
                      <span className="text-6xl font-black text-white drop-shadow-sm tracking-tighter tabular-nums gap-2 flex">
                        <span>{homeScore}</span>
                        <span className="text-slate-600">-</span>
                        <span>{awayScore}</span>
                      </span>
                      <div className="mt-2 text-sm font-semibold text-slate-400 uppercase tracking-[0.2em]" suppressHydrationWarning>{fmtDMY(r.date)}</div>
                    </div>

                    {/* Away */}
                    <div className="flex flex-col items-center gap-4 flex-1">
                      <div className="w-28 h-28 bg-white rounded-2xl shadow-xl p-3 flex items-center justify-center transition-transform hover:scale-105 duration-300">
                        {awayLogo ? (
                          <Image src={awayLogo} alt={awayName} width={100} height={100} className="object-contain w-full h-full" />
                        ) : (<span className="font-bold text-slate-500 text-lg">VIS</span>)}
                      </div>
                      <span className="text-lg font-bold text-white text-center">{awayName}</span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
