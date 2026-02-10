"use client";
import { buildImageUrl } from '@/lib/sanityClient';
import Image from "next/image";
import { useState } from 'react';
import { CreateAthleteModal } from './auth/CreateAthleteModal';

type ImageAsset = { asset?: { url?: string; metadata?: { lqip?: string } }; hotspot?: { x?: number; y?: number } | null }
type FeaturedPlayer = {
  name?: string
  athleteName?: string
  position?: string
  avatar?: ImageAsset | null
  statsToShow?: string | string[]
  goals?: number
  assists?: number
  matches?: number
}
type SmartVideoShape = { file?: { asset?: { url?: string } } | null, poster?: { asset?: { url?: string } } | null, focusX?: number, focusY?: number }

export default function Hero({ videoUrl, smartVideo, featuredPlayer }: { videoUrl?: string, smartVideo?: SmartVideoShape | undefined, featuredPlayer?: FeaturedPlayer }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Resolve video source
  const finalVideo = videoUrl ?? smartVideo?.file?.asset?.url ?? "/videos/avidela-promo.mp4";
  const poster = smartVideo?.poster?.asset?.url ?? "/images/hero-poster.jpg";
  const hasVideo = !!finalVideo;

  return (
    <div className="relative w-full h-[85vh] md:h-[95vh] min-h-[600px] overflow-hidden bg-slate-900 flex items-center justify-center" suppressHydrationWarning>
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        {hasVideo && (
          <video
            src={finalVideo}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-90"
          />
        )}
        {/* Overlay Gradients for readability and aesthetic */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-900/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/50 to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center mt-20 md:mt-0">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-8 drop-shadow-xl leading-[1.1] md:leading-[1.1]">
            Formando <span className="text-pink-500">Campeones</span>
            <br />
            <span className="text-white">dentro y fuera de la cancha</span>
          </h1>
        </div>

        <p className="text-lg sm:text-xl md:text-2xl text-slate-200 font-medium max-w-3xl mb-10 leading-relaxed drop-shadow-md animate-in fade-in slide-in-from-bottom-5 duration-700 delay-150">
          Descubre la academia donde la pasión, la formación profesional y los valores se unen en cada jugada.
        </p>

        <div className="animate-in fade-in zoom-in duration-500 delay-300 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="group relative inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-bold text-white transition-all duration-300 bg-pink-600 rounded-full focus:outline-none focus:ring-4 focus:ring-pink-500/30 hover:bg-pink-500 hover:scale-105 shadow-[0_0_20px_rgba(233,30,99,0.5)]"
          >
            <span>Inscríbete Ahora</span>
            <svg className="w-4 h-4 md:w-5 md:h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
          </button>
          <a href="#plans" className="inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-bold text-white transition-all duration-300 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 hover:border-white/40">
            Ver Planes
          </a>
        </div>
      </div>

      {/* Featured Player Floating Widget */}
      {featuredPlayer && (featuredPlayer.name || featuredPlayer.athleteName) && (
        <div className="absolute bottom-8 right-8 hidden xl:flex items-center gap-4 bg-black/40 backdrop-blur-xl p-4 pr-6 rounded-2xl border border-white/10 animate-in slide-in-from-right duration-700 delay-500 max-w-sm hover:bg-black/50 transition-colors shadow-2xl">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/20 relative flex-shrink-0 bg-slate-800">
            {buildImageUrl(featuredPlayer?.avatar, 100, 100) ? (
              <Image src={buildImageUrl(featuredPlayer?.avatar, 100, 100) as string} alt="Player" fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs">Foto</div>
            )}
          </div>
          <div className="text-left">
            <div className="text-white font-bold text-lg leading-tight">{featuredPlayer.name ?? featuredPlayer.athleteName}</div>
            <div className="text-blue-400 text-sm font-bold uppercase tracking-wider">{featuredPlayer.position ?? 'Jugador'}</div>
            {featuredPlayer.goals ? (
              <div className="text-slate-300 text-xs mt-1 font-mono">
                {featuredPlayer.goals} Goles • {featuredPlayer.matches ?? 0} Partidos
              </div>
            ) : null}
          </div>
        </div>
      )}

      <CreateAthleteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
