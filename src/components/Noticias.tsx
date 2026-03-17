'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatLocaleLong } from '@/lib/formatDate';
import SectionHeading from '@/components/SectionHeading';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';

// ─── Modal ────────────────────────────────────────────────────────────────────
function NewsModal({ article, onClose }: { article: any; onClose: () => void }) {
  // Close on Escape
  useEffect(() => {
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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Panel */}
      <article
        className="relative z-10 w-full max-w-2xl max-h-[90vh] flex flex-col rounded-[32px] overflow-hidden border border-white/10 bg-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button - Top Right Floating */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-[#e91e63] border border-white/20 transition-all duration-300 backdrop-blur-md group"
          aria-label="Cerrar"
        >
          <svg className="w-5 h-5 transition-transform group-hover:rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image - Better Aspect Ratio */}
        {article.image?.asset?.url && (
          <div className="relative w-full h-64 md:h-80 shrink-0 overflow-hidden">
            <Image
              src={`${article.image.asset.url}?v=${article.updatedAt ? new Date(article.updatedAt).getTime() : '1'}`}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
            {/* Elegant Gradient Overlays */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
            <div className="absolute inset-0 bg-slate-900/10" />

            {/* Badge */}
            <div className="absolute top-5 left-6">
              <span className="bg-[#e91e63] text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-xl shadow-2xl backdrop-blur-md border border-white/20">
                Noticia Club
              </span>
            </div>
          </div>
        )}

        {/* No image fallback header space */}
        {!article.image?.asset?.url && <div className="h-12 w-full" />}

        {/* Content — scrollable */}
        <div className="flex-1 overflow-y-auto p-7">
          {/* Date */}
          <time
            className="text-[#e91e63] text-xs font-bold uppercase tracking-widest flex items-center gap-2 mb-3"
            suppressHydrationWarning
          >
            <span className="w-4 h-px bg-[#e91e63]" />
            {formatLocaleLong(article.date)}
          </time>

          {/* Title */}
          <h2 className="text-xl md:text-2xl font-bold text-white leading-snug mb-5">
            {article.title}
          </h2>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-[#e91e63]/50 via-[#0F8DBF]/50 to-transparent mb-5" />

          {/* Body paragraphs */}
          <div className="space-y-4">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-slate-300 text-base leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-8 pt-5 border-t border-slate-800 flex items-center gap-3 text-xs text-slate-500">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
            </svg>
            <span>5 min de lectura</span>
            <span className="text-slate-700">•</span>
            <span>Avidela Sport</span>
          </div>
        </div>
      </article>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function Noticias({ importantInfo }: { importantInfo: any[] }) {
  const [selected, setSelected] = useState<any | null>(null);
  const close = useCallback(() => setSelected(null), []);

  if (!importantInfo || importantInfo.length === 0) return null;

  const [featured, ...rest] = importantInfo;

  return (
    <section id="info" className="py-16 px-4 max-w-[95%] mx-auto">
      <SectionHeading
        title="Lo último en "
        highlight="Avidela Sport"
        subtitle="Noticias, crónicas y novedades del club"
      />

      <div className="flex flex-col gap-8">
        {/* Featured Article */}
        <article
          key={featured._id}
          role="button"
          tabIndex={0}
          onClick={() => setSelected(featured)}
          onKeyDown={(e) => e.key === 'Enter' && setSelected(featured)}
          className="group relative rounded-3xl overflow-hidden border border-slate-700/60 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl hover:shadow-[#e91e63]/10 hover:border-[#e91e63]/30 transition-all duration-500 cursor-pointer"
          aria-labelledby={`news-${featured._id}`}
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-[#e91e63]/5 via-transparent to-transparent" />
          </div>

          <div className="flex flex-col md:flex-row gap-0">
            {featured.image?.asset?.url && (
              <div className="relative flex-shrink-0 w-full md:w-96 h-56 md:h-auto overflow-hidden">
                <Image
                  src={`${featured.image.asset.url}?v=${featured.updatedAt ? new Date(featured.updatedAt).getTime() : '1'}`}
                  alt={featured.image.alt || featured.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-slate-900 hidden md:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent md:hidden" />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#e91e63] text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                    Destacado
                  </span>
                </div>
              </div>
            )}

            <div className="flex-1 flex flex-col justify-between p-7 md:p-8">
              <div>
                <time className="text-[#e91e63] text-xs font-bold uppercase tracking-widest flex items-center gap-2 mb-4" suppressHydrationWarning>
                  <span className="w-4 h-px bg-[#e91e63]" />
                  {formatLocaleLong(featured.date)}
                </time>
                <h3 id={`news-${featured._id}`} className="text-xl md:text-2xl font-bold text-white mb-4 leading-snug tracking-normal group-hover:text-pink-100 transition-colors duration-300">
                  {featured.title}
                </h3>
                <p className="text-slate-400 text-base leading-relaxed line-clamp-4">
                  {featured.content}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
                  </svg>
                  <span>5 min de lectura</span>
                </div>
                <span className="text-slate-700">•</span>
                <span className="text-xs text-[#e91e63] font-semibold group-hover:underline">Leer artículo completo →</span>
              </div>
            </div>
          </div>
        </article>

        {/* Rest of articles */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((info: any) => (
              <article
                key={info._id}
                role="button"
                tabIndex={0}
                onClick={() => setSelected(info)}
                onKeyDown={(e) => e.key === 'Enter' && setSelected(info)}
                className="group relative rounded-2xl overflow-hidden border border-slate-700/50 bg-slate-900 hover:border-[#e91e63]/40 hover:shadow-xl hover:shadow-[#e91e63]/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                aria-labelledby={`news-${info._id}`}
              >
                {info.image?.asset?.url ? (
                  <div className="relative w-full h-44 overflow-hidden">
                    <Image
                      src={`${info.image.asset.url}?v=${info.updatedAt ? new Date(info.updatedAt).getTime() : '1'}`}
                      alt={info.image.alt || info.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
                  </div>
                ) : (
                  <div className="w-full h-44 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                    <svg className="w-12 h-12 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <path d="M3 16l5-5 4 4 3-3 6 6" />
                    </svg>
                  </div>
                )}

                <div className="p-5">
                  <time className="text-[#e91e63] text-xs font-bold uppercase tracking-widest flex items-center gap-2 mb-3" suppressHydrationWarning>
                    <span className="w-3 h-px bg-[#e91e63]" />
                    {formatLocaleLong(info.date)}
                  </time>
                  <h3 id={`news-${info._id}`} className="text-base font-bold text-white leading-snug mb-2 line-clamp-2 group-hover:text-pink-200 transition-colors">
                    {info.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                    {info.content}
                  </p>
                  <p className="mt-3 text-xs text-[#e91e63] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Leer artículo completo →
                  </p>
                </div>

                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#e91e63] to-[#0F8DBF] group-hover:w-full transition-all duration-500 rounded-full" />
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selected && <NewsModal article={selected} onClose={close} />}
    </section>
  );
}
