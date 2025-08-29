"use client";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function SwiperGallery({ images, heightClass = 'h-[340px]' }: { images: any[], heightClass?: string }) {
  if (!images || images.length === 0) return null;
  return (
    <section className="w-full">
      <div className="w-full">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          loop
          className="rounded-lg shadow"
        >
          {images.map((img, idx) => (
            <SwiperSlide key={img._id || idx}>
              <div className="w-full flex items-center justify-center">
                <img
                  src={img.image?.asset?.url || img.url}
                  alt={img.image?.alt || img.caption || "Club photo"}
                  className={`w-full ${heightClass} object-contain object-center rounded-lg bg-gray-100`}
                  style={{ maxWidth: '100%' }}
                  loading="lazy"
                />
              </div>
              {img.caption && (
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <span className="bg-black/60 text-white text-sm px-3 py-1 rounded">
                    {img.caption}
                  </span>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
