"use client";

import React from 'react';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function SwiperGallery({ images, heightClass = 'h-[340px]' }: { images: any[], heightClass?: string }) {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!images || images.length === 0) return null;
  if (!isMounted) return <div className={`w-full ${heightClass} bg-slate-900/50 rounded-3xl animate-pulse`} />;

  return (
    <section className="w-full">
      <div className="w-full relative gallery-swiper-container">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            modifierClass: 'swiper-pagination-custom-'
          }}
          autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          loop
          allowTouchMove={true}
          observer={true}
          observeParents={true}
          watchSlidesProgress={true}
          slidesPerView={1}
          centeredSlides={false}
          spaceBetween={0}
          className="rounded-3xl shadow-xl h-full w-full"
        >
          {images.map((img, idx) => (
            <SwiperSlide key={img._id || idx} className="w-full px-0">
              <div className="w-full h-full flex items-center justify-center relative">
                {(img.image?.asset?.url || img.url) ? (
                    <div className={`w-full ${heightClass} relative rounded-3xl overflow-hidden group bg-black`}>
                      {/* Artistic Blur Background - ONLY VISIBLE ON DESKTOP windows/wide screens to fill space */}
                      <div className="absolute inset-0 hidden md:block w-full h-full overflow-hidden">
                        <img
                          src={img.image?.asset?.url || img.url}
                          alt=""
                          className="w-full h-full object-cover scale-150 blur-[100px] opacity-80 saturate-150"
                        />
                      </div>
                      
                      {/* Sharp Main Image - Responsive logic: Full on mobile, Contain on desktop */}
                      <img
                        src={img.image?.asset?.url || img.url}
                        alt={img.image?.alt || img.caption || "Club photo"}
                        className="relative z-10 w-full h-full object-cover md:object-contain transition-all duration-700 group-hover:scale-[1.03]"
                        loading={idx === 0 ? "eager" : "lazy"}
                      />
                      
                      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-[5]" />
                    </div>
                ) : null}

                {img.caption && (
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[92%] sm:w-fit sm:max-w-[85%] z-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="backdrop-blur-xl bg-black/70 border border-white/10 text-white text-xs sm:text-sm leading-relaxed px-5 py-3 rounded-[20px] shadow-2xl text-center">
                      <div className="max-h-[80px] overflow-y-auto custom-scrollbar font-medium">
                        {img.caption}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Styles for Pagination (Matching NextMatchCarousel) */}
        <style jsx global>{`
            .gallery-swiper-container .swiper-pagination-bullet {
                background: rgba(255, 255, 255, 0.5);
                opacity: 0.7;
                width: 8px;
                height: 8px;
                margin: 0 4px !important;
                transition: all 0.3s ease;
                box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            }
            .gallery-swiper-container .swiper-pagination-bullet-active {
                background: #fff;
                opacity: 1;
                width: 24px;
                border-radius: 4px;
                box-shadow: 0 0 10px rgba(255,255,255,0.7);
            }
            .custom-scrollbar::-webkit-scrollbar {
                width: 4px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
                background: transparent;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.2);
                border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: rgba(255, 255, 255, 0.4);
            }
        `}</style>
      </div>
    </section>
  );
}
