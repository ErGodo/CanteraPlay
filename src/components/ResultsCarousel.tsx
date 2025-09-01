"use client";
import { formatDMY } from '@/lib/formatDate';
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function ResultsCarousel({ results }: { results: any[] }) {
  if (!results || results.length === 0) return null;
  const slides = results;
  const hasMultiple = slides.length > 1;

  const safeText = (v: any) => {
    if (v === null || v === undefined) return "";
    if (typeof v === "string") return v;
    if (typeof v === "object") {
      if (typeof v.name === "string") return v.name;
      if (typeof v.title === "string") return v.title;
      if (typeof v._ref === "string") return v._ref;
      return "";
    }
    return String(v);
  };

  const fmtDMY = (dateStr: any) => formatDMY(dateStr);

  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={hasMultiple ? { delay: 4000, disableOnInteraction: false } : false}
        loop={hasMultiple}
        slidesPerView={1}
        className="rounded-lg"
      >
        {slides.map((r, idx) => {
          const homeName = safeText(r.homeTeam);
          const awayName = safeText(r.awayTeam);
          const homeLogo = r.homeTeam?.logo?.asset?.url;
          const awayLogo = r.awayTeam?.logo?.asset?.url;
          const homeLqip = r.homeTeam?.logo?.asset?.metadata?.lqip;
          const awayLqip = r.awayTeam?.logo?.asset?.metadata?.lqip;
          const key = r._id || `${homeName}-${awayName}-${idx}`;
          const badgeText = safeText(r.categoryGlosa ?? r.category ?? r.competition ?? r.league ?? r.note);

          return (
            <SwiperSlide key={key}>
              <div
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 pt-20 relative overflow-hidden"
                style={{ ['--accent1' as any]: r?.colors?.primary ?? '#0b4cdb', ['--accent2' as any]: r?.colors?.secondary ?? '#ff4fa3' }}
              >
                  {badgeText && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-3 z-20">
                      <span className="px-6 py-2 text-base md:text-lg rounded-full max-w-[100%] inline-block text-center whitespace-normal leading-tight"
                        style={{ color: 'var(--accent1)', background: 'transparent', border: '1px solid rgba(255,255,255,0.6)', backdropFilter: 'blur(4px)' }}>
                        {badgeText}
                      </span>
                    </div>
                  )}

                {/* decorative wave SVG background (subtle, behind content) */}
                <svg
                  className="absolute inset-0 w-full h-full z-0 pointer-events-none"
                  viewBox="0 0 1200 200"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <defs>
                    <linearGradient id={`waveGrad-${key}`} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="var(--accent2)" stopOpacity="0.28" />
                      <stop offset="100%" stopColor="var(--accent2)" stopOpacity="0.14" />
                    </linearGradient>
                  </defs>

                  {/* big soft wave (fuchsia) */}
                  <path
                    d="M0,120 C200,40 400,160 600,120 C800,80 1000,160 1200,100 L1200,200 L0,200 Z"
                    fill={`url(#waveGrad-${key})`}
                  />

                  {/* second, more subtle wave (soft blue) */}
                  <path
                    d="M0,140 C250,60 450,200 700,140 C950,80 1050,180 1200,140 L1200,200 L0,200 Z"
                    fill="var(--accent1)"
                    opacity="0.12"
                  />
                </svg>

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-1 flex flex-col items-center min-w-[140px]">
                    <div className="w-28 h-28 rounded-full bg-white p-2 flex items-center justify-center overflow-hidden border border-gray-100">
                      {homeLogo ? (
                        <Image
                          src={homeLogo}
                          alt={safeText(homeName)}
                          width={88}
                          height={88}
                          className="object-contain"
                          {...(homeLqip ? { placeholder: "blur", blurDataURL: homeLqip } : {})}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-sm text-gray-500 bg-gray-50">{String(homeName ?? "").slice(0, 2)}</div>
                      )}
                    </div>
                    <div className="mt-2 text-2xl font-extrabold text-blue-900">{r.homeScore}</div>
                    <div className="text-sm text-blue-800 mt-1 text-center">{homeName}</div>
                  </div>

                  <div className="flex-none text-center px-4">
                    <div className="text-sm text-slate-500">{fmtDMY(r.date)}</div>
                    <div className="text-3xl font-extrabold my-2 text-[#0b1c3a]">VS</div>
                  </div>

                  <div className="flex-1 flex flex-col items-center min-w-[140px]">
                    <div className="w-28 h-28 rounded-full bg-white 
                                p-2 flex items-center 
                                justify-center 
                                overflow-hidden border border-gray-100">
                      {awayLogo ? (
                        <Image
                          src={awayLogo}
                          alt={safeText(awayName)}
                          width={88}
                          height={88}
                          className="object-contain"
                          {...(awayLqip ? { placeholder: "blur", blurDataURL: awayLqip } : {})}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-sm text-gray-500 bg-gray-50">{String(awayName ?? "").slice(0, 2)}</div>
                      )}
                    </div>
                    <div className="mt-2 text-2xl font-extrabold text-blue-900">{r.awayScore}</div>
                    <div className="text-sm text-blue-800 mt-1 text-center">{awayName}</div>
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
                        