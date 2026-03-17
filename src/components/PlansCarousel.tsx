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
    const iconClass = "w-8 h-8 sm:w-10 sm:h-10 transition-colors duration-300";

    if (type === "matricula")
        return <IconCertificate className={`${iconClass} text-[#e91e63] group-hover:text-white`} stroke={1.5} />;

    if (type === "partidos")
        return <IconBallFootball className={`${iconClass} text-[#0F8DBF] group-hover:text-white`} stroke={1.5} />;

    if (type === "combo")
        return <IconSchool className={`${iconClass} text-purple-400 group-hover:text-white`} stroke={1.5} />;

    return <IconShirtSport className={`${iconClass} text-pink-400 group-hover:text-white`} stroke={1.5} />;
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
        case "matricula": return "from-[#e91e63] to-rose-700";
        case "partidos": return "from-[#0F8DBF] to-blue-700";
        case "combo": return "from-purple-600 to-indigo-700";
        default: return "from-pink-500 to-rose-600";
    }
}

const getBorderGradient = (type: string) => {
    switch (type) {
        case "matricula": return "from-[#e91e63] via-rose-500 to-transparent";
        case "partidos": return "from-[#0F8DBF] via-blue-500 to-transparent";
        case "combo": return "from-purple-500 via-indigo-500 to-transparent";
        default: return "from-pink-500 via-rose-500 to-transparent";
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
            <div className="bg-slate-950 rounded-3xl p-12 text-center border border-slate-800 text-slate-500 font-bold uppercase tracking-widest">
                Próximamente más planes
            </div>
        );
    }

    if (!isMounted) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-96 bg-slate-900/50 rounded-3xl border border-slate-800 animate-pulse" />
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
                    delay: 6000,
                    disableOnInteraction: true,
                    pauseOnMouseEnter: true
                }}
                breakpoints={{
                    640: { slidesPerView: 1, spaceBetween: 24 },
                    768: { slidesPerView: 2, spaceBetween: 24 },
                    1024: { slidesPerView: 3, spaceBetween: 24 }
                }}
                className="w-full !pb-14 px-1"
            >
                {plans.map((p: any) => {
                    const t = planType(p.name || "");
                    const borderGradient = getBorderGradient(t);
                    const headerGradient = getGradient(t);

                    return (
                        <SwiperSlide key={p._id} className="h-auto">
                            <div className="group h-full p-1">
                                <div className={`relative h-full bg-slate-950 rounded-[32px] border border-slate-800 p-8 flex flex-col transition-all duration-500 hover:border-white/10 overflow-hidden`}>
                                    
                                    {/* Hover background effect */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${headerGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0`} />
                                    
                                    {/* Glass reflection */}
                                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 skew-y-12 translate-y-[-50%] z-0" />

                                    <div className="relative z-10 flex flex-col h-full">
                                        {/* Icon & Category */}
                                        <div className="flex justify-between items-start mb-8">
                                            <div className="p-4 bg-slate-900 group-hover:bg-white/20 rounded-2xl border border-slate-800 group-hover:border-white/20 transition-all duration-300">
                                                <PlanIcon type={t} />
                                            </div>
                                            {t === 'matricula' && (
                                                <div className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-[#e91e63]/10 text-[#e91e63] border border-[#e91e63]/30 group-hover:bg-white group-hover:text-[#e91e63] group-hover:border-transparent transition-all">
                                                    ANUAL
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-black text-white mb-4 group-hover:text-white transition-colors leading-tight">
                                                {p.name}
                                            </h3>
                                            <p className="text-slate-400 group-hover:text-white/80 text-sm leading-relaxed font-medium line-clamp-4">
                                                {p.description || "Inscríbete en este plan y forma parte de la mejor academia de fútbol de la zona."}
                                            </p>
                                        </div>

                                        {/* Price */}
                                        <div className="mt-10 pt-8 border-t border-slate-900 group-hover:border-white/10">
                                            <div className="flex items-baseline gap-2 mb-2">
                                                <span className="text-4xl font-black text-white group-hover:text-white tabular-nums">
                                                    {formatCurrencyCLP(p.price)}
                                                </span>
                                                {t !== "matricula" && (
                                                    <span className="text-xs font-black text-slate-500 group-hover:text-white/60 uppercase tracking-widest">
                                                        /mes
                                                    </span>
                                                )}
                                            </div>
                                            
                                            <button className="w-full mt-6 py-4 rounded-2xl bg-slate-900 group-hover:bg-white group-hover:text-slate-950 font-black text-xs uppercase tracking-[0.2em] border border-slate-800 group-hover:border-transparent transition-all duration-300 transform group-hover:scale-[1.02]">
                                                Seleccionar Plan
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>

            {/* Pagination custom styles */}
            <style jsx global>{`
                .plans-swiper-container .swiper-pagination-bullet {
                    background: rgba(255, 255, 255, 0.1);
                    opacity: 1;
                    transition: all 0.3s ease;
                    width: 8px;
                    height: 8px;
                }
                .plans-swiper-container .swiper-pagination-bullet-active {
                    background: #e91e63 !important;
                    width: 32px;
                    border-radius: 4px;
                    box-shadow: 0 0 15px rgba(233, 30, 99, 0.5);
                }
            `}</style>
        </div>
    );
}
