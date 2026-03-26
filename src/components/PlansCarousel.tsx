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
    const [selectedPlan, setSelectedPlan] = useState<any>(null);

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
        <div className="plans-swiper-container pb-4 overflow-visible w-full relative group/carousel">
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
                    dynamicBullets: false,
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
                className="w-full !pb-12 px-1"
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
                                            
                                            <button 
                                                onClick={() => setSelectedPlan(p)}
                                                className="w-full mt-6 py-4 rounded-2xl bg-slate-900 group-hover:bg-white group-hover:text-slate-950 font-black text-xs uppercase tracking-[0.2em] border border-slate-800 group-hover:border-transparent transition-all duration-300 transform group-hover:scale-[1.02]">
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

            {/* Navigation Arrows - Optimized for mobile/desktop overlap */}
            <button className="swiper-button-prev-custom absolute left-2 sm:left-4 top-[50%] -translate-y-1/2 z-30 w-10 h-10 bg-black/30 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:bg-[#e91e63] hover:text-white transition-all shadow-2xl active:scale-90 opacity-0 group-hover/carousel:opacity-100 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button className="swiper-button-next-custom absolute right-2 sm:right-4 top-[50%] -translate-y-1/2 z-30 w-10 h-10 bg-black/30 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center text-white/70 hover:bg-[#e91e63] hover:text-white transition-all shadow-2xl active:scale-90 opacity-0 group-hover/carousel:opacity-100 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Pagination custom styles */}
            <style jsx global>{`
                .plans-swiper-container .swiper-pagination {
                    bottom: 0px !important;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 40;
                }
                .plans-swiper-container .swiper-pagination-bullet {
                    background: rgba(255, 255, 255, 0.3);
                    opacity: 1;
                    transition: all 0.3s ease;
                    width: 8px;
                    height: 8px;
                    margin: 0 5px !important;
                }
                .plans-swiper-container .swiper-pagination-bullet-active {
                    background: #e91e63 !important;
                    width: 24px;
                    border-radius: 4px;
                    box-shadow: 0 0 15px rgba(233, 30, 99, 0.4);
                }
                .plans-swiper-container .swiper-button-disabled {
                    opacity: 0.1 !important;
                    pointer-events: none;
                }
            `}</style>

            {/* Redirect Modal */}
            {selectedPlan && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer transition-opacity" 
                        onClick={() => setSelectedPlan(null)} 
                    />
                    
                    {/* Modal Content */}
                    <div className="relative bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 max-w-md w-full shadow-2xl flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-300">
                        {/* Close button */}
                        <button 
                            onClick={() => setSelectedPlan(null)}
                            className="absolute top-4 right-4 p-2 bg-slate-800/50 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-all"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Logo header */}
                        <div className="flex items-center gap-3 mb-6">
                            <img 
                                src="https://app.canteraplay.com/brand/logo_jugador_solo.png" 
                                alt="CanteraPlay Logo" 
                                className="h-10 w-10 object-contain drop-shadow-[0_0_15px_rgba(0,229,255,0.3)]"
                            />
                            <h2 className="text-xl font-black text-white tracking-widest hidden sm:block">
                                CANTERA<span className="text-[#00E5FF]">PLAY</span>
                            </h2>
                        </div>

                        <h3 className="text-2xl font-black text-white mb-3 leading-tight">
                            ¡Ya casi eres parte!
                        </h3>
                        
                        <p className="text-slate-400 mb-8 leading-relaxed text-sm">
                            Para matricularte en <strong className="text-pink-500 font-bold">{selectedPlan.name}</strong>, primero necesitamos que <strong>crees el perfil del jugador</strong> e inicies sesión en la plataforma del club.
                            <br/><br/>
                            Serás redirigido a <strong className="text-white">CanteraPlay</strong> de forma segura para completar tu registro.
                        </p>

                        <a 
                            href="https://app.canteraplay.com/login"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-[#00E5FF] to-blue-500 text-slate-950 font-black text-[13px] uppercase tracking-widest hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(0,229,255,0.4)] transition-all duration-300"
                        >
                            <span>Ir a Crear Perfil</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M12 5l0 14"></path>
                                <path d="M18 13l-6 6"></path>
                                <path d="M6 13l6 6"></path>
                            </svg>
                        </a>
                        
                        <button 
                            onClick={() => setSelectedPlan(null)}
                            className="mt-5 text-slate-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
