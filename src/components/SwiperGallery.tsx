"use client";
import Image from 'next/image';
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
                  <div className={`w-full ${heightClass} relative rounded-3xl bg-gray-900 overflow-hidden`}>
                    <Image
                      src={img.image?.asset?.url || img.url}
                      alt={img.image?.alt || img.caption || "Club photo"}
                      fill
                      className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Dark gradient overlay at bottom for text readability */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                  </div>
                ) : null}

                {img.caption && (
                  <div className="absolute bottom-6 left-0 right-0 px-6 text-center z-10">
                    <span className="inline-block backdrop-blur-md bg-white/20 border border-white/30 text-white text-sm font-medium px-4 py-1.5 rounded-full shadow-lg">
                      {img.caption}
                    </span>
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
        `}</style>
      </div>
    </section>
  );
}
