"use client";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SponsorCard from "./SponsorCard";

export default function SponsorCarousel({ sponsors }: { sponsors: any[] }) {
  if (!sponsors || sponsors.length === 0) return null;
  const hasMultiple = sponsors.length > 1;

  return (
    <div className="w-full flex justify-center h-full" id="sponsors">
      <div className="w-full relative h-full" id="sponsors-container">
        {/* Avoid centering slides on desktop so sponsors align naturally */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={hasMultiple ? { delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: false } : false}
          loop={hasMultiple}
          allowTouchMove={true}
          observer={true}
          observeParents={true}
          watchSlidesProgress={true}
          onSwiper={(sw) => { sw.autoplay?.start?.(); }}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            // Desktop: una tarjeta por columna y que ocupe todo el ancho (no centered)
            1024: { slidesPerView: 1, centeredSlides: false, spaceBetween: 0 }
          }}
          centeredSlides={false}
          spaceBetween={0}
      className="rounded-lg h-full"
        >
          {sponsors.map((s) => (
            <SwiperSlide key={s._id} className="w-full px-0">
              <div className="w-full h-full">
                <div className="mx-auto max-w-[calc(100%-32px)] sm:max-w-full">
                  <SponsorCard sponsor={s} />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
