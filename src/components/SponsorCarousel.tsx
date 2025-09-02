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
    <div className="w-full flex justify-center">
      <div className="w-full max-w-3xl relative sponsor-nav-wrap">
        <style>{`
          /* Make nav buttons sit closer on small screens and breathe on larger */
          .sponsor-nav-wrap { position: relative; }
          .sponsor-nav-wrap .swiper-button-prev { left: 0.5rem !important; }
          .sponsor-nav-wrap .swiper-button-next { right: 0.5rem !important; }
          .sponsor-nav-wrap .swiper-button-prev, .sponsor-nav-wrap .swiper-button-next {
            top: 50% !important;
            transform: translateY(-50%) !important;
            z-index: 30;
          }
          @media (min-width: 768px) {
            .sponsor-nav-wrap .swiper-button-prev { left: 1.5rem !important; }
            .sponsor-nav-wrap .swiper-button-next { right: 1.5rem !important; }
          }
        `}</style>
  {/* use Swiper's default navigation so styling matches ResultsCarousel */}

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
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          centeredSlides={true}
          spaceBetween={20}
          className="rounded-lg"
        >
          {sponsors.map((s) => (
            <SwiperSlide key={s._id} className="px-4 flex justify-center">
              <div className="mx-auto w-full max-w-sm">
                <SponsorCard sponsor={s} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
