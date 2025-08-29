"use client";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

export default function ResultsCarousel({ results }: { results: any[] }) {
  if (!results || results.length === 0) return null;
  const slides = results;
  const hasMultiple = slides.length > 1;
  const fmtDMY = (dateStr: any) => {
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return '';
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };

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
        {slides.map((r, idx) => (
          <SwiperSlide key={`${r._id || 'slide'}-${idx}`}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1 flex flex-col items-center">
                <div className="w-28 h-28 rounded-full bg-white p-2 flex items-center justify-center">
                  {r.homeTeam?.logo?.asset?.url ? (
                    <Image src={r.homeTeam.logo.asset.url} alt={r.homeTeam.name} width={88} height={88} className="object-contain" />
                  ) : (
                    <div className="text-sm text-slate-600">{r.homeTeam?.name}</div>
                  )}
                </div>
                <div className="mt-2 text-2xl font-extrabold text-[#0b1c3a]">{r.homeScore}</div>
                <div className="text-sm text-slate-600 mt-1">{r.homeTeam?.name}</div>
              </div>

              <div className="flex-none text-center">
                <div className="text-sm text-slate-500">{fmtDMY(r.date)}</div>
                <div className="text-2xl font-extrabold my-2">VS</div>
              </div>

              <div className="flex-1 flex flex-col items-center">
                <div className="w-28 h-28 rounded-full bg-white p-2 flex items-center justify-center">
                  {r.awayTeam?.logo?.asset?.url ? (
                    <Image src={r.awayTeam.logo.asset.url} alt={r.awayTeam.name} width={88} height={88} className="object-contain" />
                  ) : (
                    <div className="text-sm text-slate-600">{r.awayTeam?.name}</div>
                  )}
                </div>
                <div className="mt-2 text-2xl font-extrabold text-[#0b1c3a]">{r.awayScore}</div>
                <div className="text-sm text-slate-600 mt-1">{r.awayTeam?.name}</div>
              </div>

              {/** category / reseña debajo en todo el ancho */}
              <div className="md:col-span-2 mt-4 w-full text-sm text-slate-700">
                {r.category || r.competition || r.league || r.note || ''}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
