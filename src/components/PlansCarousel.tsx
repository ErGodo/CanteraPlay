"use client";

import { useEffect, useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { formatCurrencyCLP } from "@/lib/formatDate";
import { IconBallFootball, IconCertificate, IconSchool, IconShirtSport } from "@tabler/icons-react";

/* -------------------------------------------------------------------------- */
/*                                  Internal                                  */
/* -------------------------------------------------------------------------- */

const PlanIcon = ({ type }: { type: "matricula" | "partidos" | "combo" | "default" }) => {
    const iconClass = "w-8 h-8 sm:w-10 sm:h-10";

    if (type === "matricula")
        return <IconCertificate className={`${iconClass} text-pink-500`} stroke={1.5} />;

    if (type === "partidos")
        return <IconBallFootball className={`${iconClass} text-cyan-400`} stroke={1.5} />;

    if (type === "combo")
        return <IconSchool className={`${iconClass} text-purple-400`} stroke={1.5} />;

    return <IconShirtSport className={`${iconClass} text-blue-400`} stroke={1.5} />;
};

const normalize = (s: string) =>
    s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const planType = (name: string): "matricula" | "partidos" | "combo" | "default" => {
    const n = normalize(name);
    if (n.includes("matricula") || n.includes("renovacion")) return "matricula";
    if (n.includes("entreno") || n.includes("entren")) return "combo";
    if (n.includes("partido")) return "partidos";
    return "default";
};

const getGradient = (type: string) => {
    switch (type) {
        case "matricula": return "from-pink-600 to-rose-600";
        case "partidos": return "from-cyan-500 to-blue-600";
        case "combo": return "from-purple-500 to-indigo-600";
        default: return "from-slate-700 to-slate-600";
    }
}

const getBorderGradient = (type: string) => {
    switch (type) {
        case "matricula": return "from-pink-500 via-rose-500 to-orange-500";
        case "partidos": return "from-cyan-400 via-blue-500 to-indigo-500";
        case "combo": return "from-violet-500 via-purple-500 to-fuchsia-500";
        default: return "from-slate-600 via-slate-500 to-slate-400";
    }
}

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */

export default function PlansCarousel({ plans }: { plans: any[] }) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!plans || plans.length === 0) {
        return (
            <div className="bg-slate-900/50 rounded-3xl p-8 text-center border border-slate-800 text-slate-400">
                No hay planes disponibles por el momento.
            </div>
        );
    }

    // If not mounted yet, show a skeleton grid (looks like static cards) to prevent layout shift
    if (!isMounted) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-80 bg-slate-900 rounded-3xl border border-slate-800 animate-pulse" />
                ))}
            </div>
        );
    }

    return (
        <div className="plans-swiper-container w-full relative group/carousel">
            <Swiper
                modules={[Pagination, Navigation, Autoplay]}
                spaceBetween={24}
                slidesPerView={1}
                navigation={{
                    nextEl: '.swiper-button-next-custom',
                    prevEl: '.swiper-button-prev-custom',
                }}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                loop={plans.length > 3}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: true,
                    pauseOnMouseEnter: true
                }}
                breakpoints={{
                    640: { slidesPerView: 1, spaceBetween: 24 },
                    768: { slidesPerView: 2, spaceBetween: 24 },
                    1024: { slidesPerView: 3, spaceBetween: 24 },
                    1280: { slidesPerView: 3, spaceBetween: 24 }
                }}
                className="w-full !pb-14 px-1"
            >
                {plans.map((p: any) => {
                    const t = planType(p.name || "");
                    const borderGradient = getBorderGradient(t);
                    const headerGradient = getGradient(t);

                    return (
                        <SwiperSlide key={p._id} className="h-auto">
                            {/* Gradient Border Content Wrapper - Le da el "ribete" de color */}
                            <div className={`p-[2px] rounded-[26px] bg-gradient-to-r ${borderGradient} shadow-xl hover:shadow-2xl hover:shadow-pink-500/20 transition-all duration-300 h-full`}>
                                <div className="bg-slate-950 rounded-[24px] h-full flex flex-col relative overflow-hidden">

                                    {/* Top colored glow/ribbon effect */}
                                    <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${headerGradient} opacity-80`} />
                                    <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${headerGradient} rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity`} />

                                    <div className="p-6 md:p-8 flex flex-col h-full z-10">
                                        {/* Header with Icon */}
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800 shadow-inner">
                                                <PlanIcon type={t} />
                                            </div>
                                            {/* Tag / Badge if needed (optional) */}
                                            {t === 'matricula' && (
                                                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-pink-500/10 text-pink-400 border border-pink-500/20">
                                                    Anual
                                                </span>
                                            )}
                                        </div>

                                        {/* Title & Desc */}
                                        <div className="flex-1">
                                            <h3 className="font-extrabold text-2xl text-white mb-3 group-hover:text-blue-300 transition-colors line-clamp-2">
                                                {p.name}
                                            </h3>
                                            <p className="text-slate-400 text-sm leading-relaxed font-medium line-clamp-3">
                                                {p.description || "Consulta por los detalles de este plan en nuestra academia."}
                                            </p>
                                        </div>

                                        {/* Price Section */}
                                        <div className="mt-8 pt-6 border-t border-slate-900 relative">
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-3xl lg:text-4xl font-black text-white tracking-tight">
                                                    {formatCurrencyCLP(p.price)}
                                                </span>
                                                {t !== "matricula" && (
                                                    <span className="text-xs font-bold text-slate-500 uppercase">
                                                        /mes
                                                    </span>
                                                )}
                                            </div>
                                            {/* Call to action hint */}
                                            <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                                                <span>Ver detalles</span>
                                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>

            {/* Custom Navigation Arrows */}
            <div className="swiper-button-prev-custom absolute top-1/2 -left-3 md:-left-4 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-slate-900 text-white shadow-xl cursor-pointer hover:scale-110 active:scale-95 transition-all -translate-y-1/2 opacity-0 group-hover/carousel:opacity-100 disabled:opacity-0 disabled:cursor-not-allowed border border-slate-700 cyber-glitch-hover">
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
            </div>
            <div className="swiper-button-next-custom absolute top-1/2 -right-3 md:-right-4 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-slate-900 text-white shadow-xl cursor-pointer hover:scale-110 active:scale-95 transition-all -translate-y-1/2 opacity-0 group-hover/carousel:opacity-100 disabled:opacity-0 disabled:cursor-not-allowed border border-slate-700 cyber-glitch-hover">
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
            </div>

            {/* Styles for bullets */}
            <style jsx global>{`
        .plans-swiper-container .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.2);
          opacity: 1;
          transition: all 0.3s ease;
        }
        .plans-swiper-container .swiper-pagination-bullet-active {
          background: #e91e63 !important;
          width: 24px;
          border-radius: 4px;
          box-shadow: 0 0 10px rgba(233, 30, 99, 0.5);
        }
      `}</style>
        </div>
    );
}
