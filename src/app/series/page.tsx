import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SectionHeading from "@/components/SectionHeading";
import { IconBallFootball, IconCalendar, IconSparkles, IconUserCheck, IconAward } from "@tabler/icons-react";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Categorías y Series de Fútbol | Avidela Sport",
    description: "Conoce las series infantiles (Iniciación, Cuarta, Tercera, Segunda, Primera) y de adultos (+18 años Primera, Segunda, Tercera, Senior +35 y Super Senior +45) de Avidela Sport.",
};

export default function SeriesPage() {
    return (
        <div className="font-sans min-h-screen bg-slate-950 text-slate-200 overflow-x-hidden" suppressHydrationWarning>
            {/* Background Decorative Glows */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-[#e91e63]/10 rounded-full blur-[120px]" />
                <div className="absolute top-[60%] left-[-10%] w-[600px] h-[600px] bg-[#00b4e6]/10 rounded-full blur-[120px]" />
            </div>

            {/* Navbar Wrapper */}
            <div className="absolute top-0 left-0 w-full z-50 pointer-events-none" suppressHydrationWarning>
                <div className="pointer-events-auto">
                    <Navbar />
                </div>
            </div>

            {/* HERO HERO */}
            <div className="relative w-full min-h-[45vh] flex items-center justify-center pt-32 pb-12 overflow-hidden bg-slate-950">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/player-hero.png"
                        alt="Background"
                        className="w-full h-full object-cover opacity-15"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent" />
                </div>

                <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
                    <span className="px-4 py-2 bg-[#e91e63]/10 text-[#e91e63] rounded-full border border-[#e91e63]/30 font-black text-xs uppercase tracking-widest mb-6 animate-pulse">
                        Avidela Sport Roster
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-4 drop-shadow-2xl">
                        Nuestras <span className="text-pink-500">Categorías y Series</span>
                    </h1>
                    <p className="text-slate-400 font-medium max-w-2xl text-base sm:text-lg">
                        Encuentra la serie adecuada según tu edad y nivel. Desde iniciación formativa hasta ligas competitivas de adultos.
                    </p>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <main className="relative z-10 mx-auto w-full max-w-[95%] lg:max-w-7xl px-4 sm:px-6 lg:px-8 mb-32 space-y-24">
                
                {/* SECCIÓN INFANTIL */}
                <section className="space-y-10">
                    <div className="text-center sm:text-left">
                        <SectionHeading 
                            title="Rama Infantil y" 
                            highlight=" Juvenil" 
                            subtitle="Competición los días SÁBADOS. Formando el futuro del club." 
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        
                        {/* INICIACIÓN */}
                        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 hover:border-pink-500/30 transition-all duration-300 flex flex-col justify-between group shadow-xl">
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-pink-500/10 text-pink-500 rounded-full border border-pink-500/20">
                                        Formativo
                                    </span>
                                    <IconSparkles className="text-pink-500 w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-pink-500 transition-colors">Iniciación</h3>
                                <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                                    Enfoque 100% recreativo y formativo. Los más pequeños aprenden psicomotricidad, compañerismo y las reglas básicas del fútbol sin presión competitiva.
                                </p>
                            </div>
                            <div className="pt-4 border-t border-slate-800/50 flex flex-col gap-2">
                                <div className="flex justify-between text-xs font-semibold">
                                    <span className="text-slate-500">AÑOS DE NACIMIENTO</span>
                                    <span className="text-white">2022, 2023</span>
                                </div>
                                <div className="flex justify-between text-xs font-semibold">
                                    <span className="text-slate-500">COMPETICIÓN</span>
                                    <span className="text-rose-500">No compiten</span>
                                </div>
                            </div>
                        </div>

                        {/* CUARTA */}
                        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 hover:border-pink-500/30 transition-all duration-300 flex flex-col justify-between group shadow-xl">
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-pink-500/10 text-pink-500 rounded-full border border-pink-500/20">
                                        Serie Competitiva
                                    </span>
                                    <IconBallFootball className="text-pink-400 w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-pink-500 transition-colors">Cuarta Serie</h3>
                                <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                                    Primeras experiencias en partidos oficiales. Trabajo en habilidades técnicas básicas, posicionamiento en cancha reducida y juego en equipo.
                                </p>
                            </div>
                            <div className="pt-4 border-t border-slate-800/50 flex flex-col gap-2">
                                <div className="flex justify-between text-xs font-semibold">
                                    <span className="text-slate-500">AÑOS DE NACIMIENTO</span>
                                    <span className="text-white">2018, 2019, 2020, 2021</span>
                                </div>
                                <div className="flex justify-between text-xs font-semibold">
                                    <span className="text-slate-500">COMPETICIÓN</span>
                                    <span className="text-emerald-500">Partidos Sábado</span>
                                </div>
                            </div>
                        </div>

                        {/* TERCERA */}
                        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 hover:border-pink-500/30 transition-all duration-300 flex flex-col justify-between group shadow-xl">
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-pink-500/10 text-pink-500 rounded-full border border-pink-500/20">
                                        Serie Competitiva
                                    </span>
                                    <IconBallFootball className="text-pink-400 w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-pink-500 transition-colors">Tercera Serie</h3>
                                <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                                    Desarrollo técnico dinámico. Introducción a tácticas de juego más complejas y transiciones rápidas en cancha intermedia.
                                </p>
                            </div>
                            <div className="pt-4 border-t border-slate-800/50 flex flex-col gap-2">
                                <div className="flex justify-between text-xs font-semibold">
                                    <span className="text-slate-500">AÑOS DE NACIMIENTO</span>
                                    <span className="text-white">2015, 2016, 2017</span>
                                </div>
                                <div className="flex justify-between text-xs font-semibold">
                                    <span className="text-slate-500">COMPETICIÓN</span>
                                    <span className="text-emerald-500">Partidos Sábado</span>
                                </div>
                            </div>
                        </div>

                        {/* SEGUNDA */}
                        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 hover:border-pink-500/30 transition-all duration-300 flex flex-col justify-between group shadow-xl">
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-pink-500/10 text-pink-500 rounded-full border border-pink-500/20">
                                        Serie Competitiva
                                    </span>
                                    <IconBallFootball className="text-pink-400 w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-pink-500 transition-colors">Segunda Serie</h3>
                                <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                                    Preparación para cancha completa. Trabajo intensivo en resistencia, roles específicos por posición, definición y juego aéreo.
                                </p>
                            </div>
                            <div className="pt-4 border-t border-slate-800/50 flex flex-col gap-2">
                                <div className="flex justify-between text-xs font-semibold">
                                    <span className="text-slate-500">AÑOS DE NACIMIENTO</span>
                                    <span className="text-white">2012, 2013, 2014</span>
                                </div>
                                <div className="flex justify-between text-xs font-semibold">
                                    <span className="text-slate-500">COMPETICIÓN</span>
                                    <span className="text-emerald-500">Partidos Sábado</span>
                                </div>
                            </div>
                        </div>

                        {/* PRIMERA */}
                        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 hover:border-pink-500/30 transition-all duration-300 flex flex-col justify-between group shadow-xl">
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-pink-500/10 text-pink-500 rounded-full border border-pink-500/20">
                                        Juvenil Competitiva
                                    </span>
                                    <IconAward className="text-pink-500 w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-pink-500 transition-colors">Primera Serie</h3>
                                <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                                    Etapa previa a la rama adulta. Rigor táctico elevado, competencia a nivel de asociación y foco en rendimiento deportivo óptimo.
                                </p>
                            </div>
                            <div className="pt-4 border-t border-slate-800/50 flex flex-col gap-2">
                                <div className="flex justify-between text-xs font-semibold">
                                    <span className="text-slate-500">AÑOS DE NACIMIENTO</span>
                                    <span className="text-white">2009, 2010, 2011</span>
                                </div>
                                <div className="flex justify-between text-xs font-semibold">
                                    <span className="text-slate-500">COMPETICIÓN</span>
                                    <span className="text-emerald-500">Partidos Sábado</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                {/* SECCIÓN ADULTOS */}
                <section className="space-y-10">
                    <div className="text-center sm:text-left">
                        <SectionHeading 
                            title="Rama Adultos" 
                            highlight=" +18 Años" 
                            subtitle="Diferentes categorías según tu nivel y experiencia futbolística." 
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        
                        {/* PRIMERA ADULTO */}
                        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 hover:border-blue-500/30 transition-all duration-300 flex flex-col justify-between group shadow-xl">
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">
                                        Nivel Top
                                    </span>
                                    <IconAward className="text-blue-400 w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">Primera Serie</h3>
                                <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                                    El equipo estelar de la academia. Máximo nivel de exigencia, preparación física intensa y participación en los campeonatos más competitivos.
                                </p>
                            </div>
                            <div className="pt-4 border-t border-slate-800/50 flex flex-col gap-2">
                                <div className="flex justify-between text-xs font-semibold">
                                    <span className="text-slate-500">EDAD REQUERIDA</span>
                                    <span className="text-white">+18 años</span>
                                </div>
                                <div className="flex justify-between text-xs font-semibold">
                                    <span className="text-slate-500">NIVEL</span>
                                    <span className="text-emerald-400">Muy Competitivo / Élite</span>
                                </div>
                            </div>
                        </div>

                        {/* SEGUNDA ADULTO */}
                        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 hover:border-blue-500/30 transition-all duration-300 flex flex-col justify-between group shadow-xl">
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">
                                        Nivel Medio
                                    </span>
                                    <IconUserCheck className="text-blue-400 w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">Segunda Serie</h3>
                                <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                                    Excelente balance entre exigencia física y táctica. Pensado para jugadores experimentados que buscan competencia organizada sin el rigor extremo de Primera.
                                </p>
                            </div>
                            <div className="pt-4 border-t border-slate-800/50 flex flex-col gap-2">
                                <div className="flex justify-between text-xs font-semibold">
                                    <span className="text-slate-500">EDAD REQUERIDA</span>
                                    <span className="text-white">+18 años</span>
                                </div>
                                <div className="flex justify-between text-xs font-semibold">
                                    <span className="text-slate-500">NIVEL</span>
                                    <span className="text-blue-400">Competitivo Intermedio</span>
                                </div>
                            </div>
                        </div>

                        {/* TERCERA ADULTO */}
                        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800/80 rounded-3xl p-6 hover:border-blue-500/30 transition-all duration-300 flex flex-col justify-between group shadow-xl">
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">
                                        Nivel Inicial
                                    </span>
                                    <IconBallFootball className="text-blue-400 w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">Tercera Serie</h3>
                                <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                                    El punto de entrada ideal para adultos que quieren reincorporarse al deporte o que tienen metas formativas y recreativas de acondicionamiento físico.
                                </p>
                            </div>
                            <div className="pt-4 border-t border-slate-800/50 flex flex-col gap-2">
                                <div className="flex justify-between text-xs font-semibold">
                                    <span className="text-slate-500">EDAD REQUERIDA</span>
                                    <span className="text-white">+18 años</span>
                                </div>
                                <div className="flex justify-between text-xs font-semibold">
                                    <span className="text-slate-500">NIVEL</span>
                                    <span className="text-indigo-400">Formativo / Recreativo</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                {/* SECCIÓN SENIORS */}
                <section className="space-y-10">
                    <div className="text-center sm:text-left">
                        <SectionHeading 
                            title="Rama Master y" 
                            highlight=" Senior" 
                            subtitle="Para leyendas del fútbol que mantienen la pasión intacta con los años." 
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        {/* SENIOR */}
                        <div className="group relative h-full bg-slate-900/80 backdrop-blur-md rounded-[32px] border border-slate-800 p-8 flex flex-col transition-all duration-500 hover:border-pink-500/30 overflow-hidden shadow-xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-rose-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
                            <div className="relative z-10 flex flex-col justify-between h-full">
                                <div>
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                                            <IconUserCheck className="w-8 h-8 text-pink-500" stroke={1.5} />
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-pink-500/10 text-pink-500 rounded-full border border-pink-500/20">
                                            Competencia Master
                                        </span>
                                    </div>
                                    <h3 className="text-3xl font-black text-white mb-4 group-hover:text-pink-500 transition-colors">
                                        Senior +35 Años
                                    </h3>
                                    <p className="text-slate-400 text-sm leading-relaxed mb-8">
                                        Liga para mayores de 35 años. La experiencia y la sabiduría táctica se combinan con un ambiente de camaradería sana y alta exigencia futbolística los fines de semana.
                                    </p>
                                </div>
                                <div className="pt-6 border-t border-slate-800/80">
                                    <div className="flex justify-between text-xs font-semibold">
                                        <span className="text-slate-500">EDAD MÍNIMA</span>
                                        <span className="text-white">35 años cumplidos</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SUPER SENIOR */}
                        <div className="group relative h-full bg-slate-900/80 backdrop-blur-md rounded-[32px] border border-slate-800 p-8 flex flex-col transition-all duration-500 hover:border-blue-500/30 overflow-hidden shadow-xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
                            <div className="relative z-10 flex flex-col justify-between h-full">
                                <div>
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                                            <IconAward className="w-8 h-8 text-blue-400" stroke={1.5} />
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">
                                            Competencia Master
                                        </span>
                                    </div>
                                    <h3 className="text-3xl font-black text-white mb-4 group-hover:text-blue-400 transition-colors">
                                        Super Senior +45 Años
                                    </h3>
                                    <p className="text-slate-400 text-sm leading-relaxed mb-8">
                                        La liga de mayor trayectoria para mayores de 45 años. Mantente activo y compite con pares en un torneo organizado, estructurado y con un excelente estándar competitivo y social.
                                    </p>
                                </div>
                                <div className="pt-6 border-t border-slate-800/80">
                                    <div className="flex justify-between text-xs font-semibold">
                                        <span className="text-slate-500">EDAD MÍNIMA</span>
                                        <span className="text-white">45 años cumplidos</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
}
