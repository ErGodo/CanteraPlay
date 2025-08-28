"use client";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function SwiperGallery({ images }: { images: any[] }) {
  if (!images || images.length === 0) return null;
  return (
    <section className="w-full flex justify-center bg-white py-8">
      <div className="w-full max-w-4xl">
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
              <img
                src={img.image?.asset?.url}
                alt={img.image?.alt || img.caption || "Club photo"}
                className="w-full h-[500px] object-contain rounded-lg bg-black"
                style={{ maxHeight: 600, maxWidth: '100%' }}
                loading="lazy"
              />
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
