"use client";

import React from 'react';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function SwiperGallery({ images, heightClass = 'h-[340px]' }: { images: any[], heightClass?: string }) {
  const [isMounted, setIsMounted] = React.useState(false);
  const swiperId = React.useId().replace(/:/g, ''); // Generate unique ID for this instance

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!images || images.length === 0) return null;
  if (!isMounted) return <div className={`w-full ${heightClass} bg-slate-900/50 rounded-3xl animate-pulse`} />;

  return (
    <section className="w-full">
      <div className={`w-full relative gallery-swiper-container group/carousel ${heightClass}`}>
        <Swiper
          modules={[Pagination, Autoplay, Navigation]}
          navigation={true}
          pagination={{
            clickable: true,
            dynamicBullets: false
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
          className={`rounded-3xl shadow-xl ${heightClass} w-full`}
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

        {/* Navigation is now handled by Swiper default buttons styled below */}

      {/* Custom Styles for Pagination (Matching NextMatchCarousel) */}
        <style jsx global>{`
            .gallery-swiper-container .swiper-button-prev,
            .gallery-swiper-container .swiper-button-next {
                width: 32px !important;
                height: 32px !important;
                border-radius: 50% !important;
                background: rgba(0, 0, 0, 0.45) !important;
                backdrop-filter: blur(8px) !important;
                border: 1px solid rgba(255, 255, 255, 0.1) !important;
                top: 50% !important;
                transform: translateY(-50%) !important;
                transition: all 0.3s ease !important;
            }
            .gallery-swiper-container .swiper-button-prev:after,
            .gallery-swiper-container .swiper-button-next:after {
                font-size: 12px !important;
                font-weight: 900 !important;
                color: #fff !important;
            }
            .gallery-swiper-container .swiper-button-prev:hover,
            .gallery-swiper-container .swiper-button-next:hover {
                background: #e91e63 !important;
                border-color: #e91e63 !important;
                transform: translateY(-50%) scale(1.1) !important;
            }
            .gallery-swiper-container .swiper-button-prev { left: 16px !important; }
            .gallery-swiper-container .swiper-button-next { right: 16px !important; }

            .gallery-swiper-container .swiper-pagination {
                bottom: 12px !important;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 40;
            }
            .gallery-swiper-container .swiper-pagination-bullet {
                background: rgba(255, 255, 255, 0.4);
                opacity: 1;
                width: 8px;
                height: 8px;
                margin: 0 5px !important;
                transition: all 0.3s ease;
            }
            .gallery-swiper-container .swiper-pagination-bullet-active {
                background: #00b4e6;
                width: 24px;
                border-radius: 4px;
            }
            .swiper-button-disabled {
                opacity: 0 !important;
                pointer-events: none;
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
