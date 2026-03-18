'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { formatLocaleLong } from '@/lib/formatDate';
import SectionHeading from '@/components/SectionHeading';
import Image from 'next/image';
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// ─── Modal ────────────────────────────────────────────────────────────────────
function NewsModal({ article, onClose }: { article: any; onClose: () => void }) {
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const paragraphs = (article.content as string).split('\n').filter(Boolean);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />
      <article
        className="relative z-10 w-full max-w-3xl max-h-[85vh] flex flex-col rounded-[32px] overflow-hidden border border-white/10 bg-slate-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-[#e91e63] border border-white/20 transition-all duration-300 backdrop-blur-md group"
        >
          <svg className="w-5 h-5 transition-transform group-hover:rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        {article.image?.asset?.url && (
          <div className="relative w-full h-72 shrink-0 overflow-hidden">
            <Image
              src={`${article.image.asset.url}?v=${article.updatedAt ? new Date(article.updatedAt).getTime() : '1'}`}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <time className="text-[#e91e63] text-xs font-black uppercase tracking-widest flex items-center gap-2 mb-4" suppressHydrationWarning>
            <span className="w-4 h-px bg-[#e91e63]" />
            {formatLocaleLong(article.date)}
          </time>
          <h2 className="text-2xl md:text-3xl font-black text-white leading-tight mb-6">{article.title}</h2>
          <div className="space-y-4">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-slate-300 text-base leading-relaxed">{p}</p>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function Noticias({ importantInfo }: { importantInfo: any[] }) {
  const [selected, setSelected] = useState<any | null>(null);

  if (!importantInfo || importantInfo.length === 0) return null;

  // Solo las últimas 5 noticias para el carrusel principal
  const recentNews = importantInfo.slice(0, 5);

  return (
    <section id="info" className="mx-auto w-full max-w-[95%] px-4 sm:px-6 lg:px-8 py-20 scroll-mt-24">
      {/* Header exactly matched to the site architecture */}
      <div className="flex flex-col md:flex-row md:items-end justify-between items-start mb-16 gap-8">
        <div>
          <SectionHeading
            title="Sigue el día a día de "
            highlight="Avidela Sport"
            subtitle="Noticias, crónicas y la actualidad de nuestra cantera"
          />
        </div>
      </div>

      <div className="news-swiper-container w-full relative">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true, modifierClass: 'news-pagination-' }}
          autoplay={{ delay: 7000, disableOnInteraction: false }}
          spaceBetween={40}
          slidesPerView={1}
          className="w-full"
        >
          {recentNews.map((article: any) => (
            <SwiperSlide key={article._id}>
              <article
                onClick={() => setSelected(article)}
                className="group relative flex flex-col md:flex-row bg-[#0c1322] rounded-[32px] overflow-hidden cursor-pointer border border-white/5 transition-all duration-500 hover:border-white/10 min-h-[480px]"
              >
                {/* Left: Precise Image Section */}
                <div className="relative w-full md:w-[35%] min-h-[320px] md:min-h-full">
                  {(article.image?.asset?.url || article.image?.url) ? (
                    <Image
                      src={article.image?.asset?.url || article.image?.url || ''}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full bg-[#161e2e] flex items-center justify-center">
                      <NewspaperIcon className="w-20 h-20 text-white/5" />
                    </div>
                  )}
                  {/* Destacado Pill matched to screenshot */}
                  <div className="absolute top-6 left-6 z-10">
                    <span className="bg-[#e91e63] text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                      Destacado
                    </span>
                  </div>
                </div>

                {/* Right: Content Section matched to screenshot */}
                <div className="flex-1 p-10 md:p-14 lg:p-16 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-8 text-[#e91e63] font-bold text-xs uppercase tracking-widest leading-none">
                    <span className="w-8 h-0.5 bg-[#e91e63]" />
                    {formatLocaleLong(article.date)}
                  </div>

                  <h3 className="text-2xl md:text-3xl lg:text-3xl font-bold text-white mb-6 leading-tight">
                    {article.title}
                  </h3>

                  <p className="text-white/40 text-sm md:text-base leading-relaxed line-clamp-5 mb-10 font-medium">
                    {article.content}
                  </p>

                  <div className="mt-auto flex items-center gap-8">
                    <div className="flex items-center gap-3 text-white/20 text-xs font-bold">
                      <svg className="w-5 h-5 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>5 min de lectura</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#e91e63] font-black text-xs uppercase tracking-widest hover:underline transition-all group/link">
                      Leer artículo completo
                      <span className="group-hover/link:translate-x-1 transition-transform inline-block">→</span>
                    </div>
                  </div>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Swiper Custom Styles integrated for this look */}
        <style jsx global>{`
          .news-swiper-container .news-pagination-bullet {
            background: rgba(255, 255, 255, 0.2) !important;
            opacity: 1 !important;
            width: 12px !important;
            height: 12px !important;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
          .news-swiper-container .news-pagination-bullet-active {
            background: #e91e63 !important;
            width: 40px !important;
            border-radius: 6px !important;
            box-shadow: 0 0 20px rgba(233, 30, 99, 0.5);
            border-color: transparent;
          }
          .news-swiper-container .swiper {
            padding-bottom: 60px !important;
            overflow: visible !important;
          }
        `}</style>
      </div>

      {selected && <NewsModal article={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}

function NewspaperIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
    </svg>
  );
}
