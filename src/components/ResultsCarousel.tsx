"use client";
import { formatDMY } from "@/lib/formatDate";
import Image from "next/image";
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
  if (!results || results.length === 0) return null;

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
    <div className="w-full" id="results-carousel">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={
          hasMultiple ? { delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: false } : false
        }
        loop={hasMultiple}
        allowTouchMove
        observer
        observeParents
        watchSlidesProgress
        onSwiper={(sw) => sw.autoplay?.start?.()}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          // tablet y desktop: 1 tarjeta por vista para ocupar la columna completa
          768: { slidesPerView: 1, spaceBetween: 0 },
          1024: { slidesPerView: 1, spaceBetween: 0 }
        }}
  centeredSlides={false}
  spaceBetween={0}
  className="rounded-lg w-full overflow-hidden"
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

          const styleVars = {
            ["--accent1"]: r?.colors?.primary ?? "#0b4cdb",
            ["--accent2"]: r?.colors?.secondary ?? "#ff4fa3",
          } as React.CSSProperties;

          return (
            <SwiperSlide key={key} className="w-full px-0">
              <div className="w-full">
                <div className="mx-auto max-w-full px-3 sm:px-0">
                  <div
                      className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-6 pt-20 relative overflow-hidden h-full"
                    style={styleVars}
                  >
                  {badgeText && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-3 z-20">
                      <span
                        className="px-6 py-2 text-base md:text-lg rounded-full inline-block text-center leading-tight"
                        style={{
                          color: "var(--accent1)",
                          background: "transparent",
                          border: "1px solid rgba(255,255,255,0.6)",
                          backdropFilter: "blur(4px)",
                        }}
                      >
                        {badgeText}
                      </span>
                    </div>
                  )}

                  {/* Fondo decorativo */}
                  <svg
                    className="absolute inset-0 w-full h-full z-0 pointer-events-none"
                    viewBox="0 0 1200 200"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient id={`waveGrad-${key}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--accent2)" stopOpacity="0.28" />
                        <stop offset="100%" stopColor="var(--accent2)" stopOpacity="0.14" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,120 C200,40 400,160 600,120 C800,80 1000,160 1200,100 L1200,200 L0,200 Z"
                      fill={`url(#waveGrad-${key})`}
                    />
                    <path
                      d="M0,140 C250,60 450,200 700,140 C950,80 1050,180 1200,140 L1200,200 L0,200 Z"
                      fill="var(--accent1)"
                      opacity="0.12"
                    />
                  </svg>

                  {/* Contenido */}
                  <div className="relative z-10 flex flex-col items-center gap-4">
                    {/* Mobile: una línea */}
                    <div className="block md:hidden w-full text-center">
                      <span className="font-bold text-blue-900">{homeName}</span>
                      <span className="font-extrabold text-blue-900 mx-1">{homeScore}</span>
                      <span className="font-bold text-[#0b1c3a] mx-1">-</span>
                      <span className="font-extrabold text-blue-900 mx-1">{awayScore}</span>
                      <span className="font-bold text-blue-900">{awayName}</span>
                      {r.date && <div className="text-xs text-slate-500 mt-1">{fmtDMY(r.date)}</div>}
                    </div>

                    {/* Desktop: grid simétrica 1fr/auto/1fr */}
                    <div className="hidden md:grid w-full grid-cols-[1fr_auto_1fr] items-center gap-6">
                      {/* Local */}
                      <div className="flex flex-col items-center min-w-0">
                        <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-white p-2 flex items-center justify-center overflow-hidden border border-gray-100 shrink-0">
                          {homeLogo ? (
                            <Image
                              src={homeLogo}
                              alt={homeName || "Home"}
                              width={112}
                              height={112}
                              className="object-contain"
                              {...(homeLqip ? { placeholder: "blur", blurDataURL: homeLqip } : {})}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-sm text-gray-500 bg-gray-50">
                              {String(homeName ?? "").slice(0, 2)}
                            </div>
                          )}
                        </div>
                        <div className="mt-2 text-2xl font-extrabold text-blue-900 leading-none">
                          {homeScore}
                        </div>
                        <div className="text-sm text-blue-800 mt-1 text-center line-clamp-2">
                          {homeName}
                        </div>
                      </div>

                      {/* Centro */}
                      <div className="flex flex-col items-center justify-center px-2 text-center">
                        <div className="text-sm text-slate-500">{fmtDMY(r.date)}</div>
                        <div className="text-3xl font-extrabold my-2 text-[#0b1c3a]">VS</div>
                      </div>

                      {/* Visita */}
                      <div className="flex flex-col items-center min-w-0">
                        <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-white p-2 flex items-center justify-center overflow-hidden border border-gray-100 shrink-0">
                          {awayLogo ? (
                            <Image
                              src={awayLogo}
                              alt={awayName || "Away"}
                              width={112}
                              height={112}
                              className="object-contain"
                              {...(awayLqip ? { placeholder: "blur", blurDataURL: awayLqip } : {})}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-sm text-gray-500 bg-gray-50">
                              {String(awayName ?? "").slice(0, 2)}
                            </div>
                          )}
                        </div>
                        <div className="mt-2 text-2xl font-extrabold text-blue-900 leading-none">
                          {awayScore}
                        </div>
                        <div className="text-sm text-blue-800 mt-1 text-center line-clamp-2">
                          {awayName}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* /Contenido */}
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
