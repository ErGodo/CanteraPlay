import { buildImageUrl } from '@/lib/sanityClient';
import Image from "next/image";
import ResponsiveVideo from './ResponsiveVideo';
type ImageAsset = { asset?: { url?: string; metadata?: { lqip?: string } } ; hotspot?: { x?: number; y?: number } | null }
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
  return (
    <div className="w-full relative overflow-hidden min-h-[76vh] flex items-start">
      <div className="w-full flex flex-col md:flex-row items-start justify-center min-h-[72vh] px-6 md:px-12 lg:px-16 pt-16 md:pt-20 lg:pt-24 pb-8 gap-8">
        <div className="w-full md:w-1/2 lg:w-1/3 flex justify-center md:justify-start items-start md:-translate-y-4 lg:-translate-y-6">
          <Image
            src="/images/player-hero.png"
            alt="Jugador Avidela"
            width={420}
            height={520}
            className="object-contain drop-shadow-2xl scale-105 md:scale-110"
            priority
          />
        </div>

        <div className="w-full md:w-2/3 flex flex-col justify-start md:-translate-y-3">
          <div className="text-white text-left px-4 mb-6">
            <h1 className={`text-2xl md:text-3xl lg:text-4xl font-extrabold mb-3 drop-shadow-lg`}>Bienvenidos a Avidela Sport</h1>
            <p className="text-xs md:text-sm lg:text-base mb-4 font-medium text-white/90">
              Pasión, formación y comunidad
            </p>
            <a href="#contact" className="bg-[#0a1a3c] text-white px-6 py-2 rounded font-bold shadow hover:bg-[#003366] transition text-sm">Inscríbete</a>
          </div>

          {/* Featured player card */}
          {featuredPlayer && (
            <div className="w-full mb-6 px-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-white/30 relative">
                  {/* use buildImageUrl so hotspot/focal is respected */}
                  {buildImageUrl(featuredPlayer?.avatar, 128, 128) ? (
                    <Image src={buildImageUrl(featuredPlayer?.avatar, 128, 128) as string} alt={featuredPlayer?.name ?? 'Jugador'} fill className="object-cover" />
                  ) : (
                    <Image src="/images/player-hero.png" alt={featuredPlayer?.name ?? 'Jugador'} width={128} height={128} className="object-cover" />
                  )}
                </div>
                <div className="text-white">
                  <div className="font-bold text-lg">{featuredPlayer?.name ?? featuredPlayer?.athleteName ?? 'Jugador'}</div>
                  <div className="text-sm text-white/80">{featuredPlayer?.position ?? ''} {/* category was removed from playerStat; keep blank if not present */}</div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                {/* Render only the stats selected in statsToShow. If none selected, render nothing. */}
                {(() => {
                  const labelMap: Record<string,string> = { goals: 'Goles', assists: 'Asistencias', matches: 'Partidos' }
                  const statKey = Array.isArray(featuredPlayer?.statsToShow)
                    ? featuredPlayer.statsToShow[0]
                    : (featuredPlayer?.statsToShow ?? '')
                  if (!statKey) return null
                  const value = statKey === 'goals' ? featuredPlayer?.goals ?? 0 : statKey === 'assists' ? featuredPlayer?.assists ?? 0 : featuredPlayer?.matches ?? 0
                  return (
                    <div key={statKey} className="bg-white/10 rounded-lg p-3 text-center">
                      <div className="text-xs text-white/70">{labelMap[statKey] ?? statKey}</div>
                      <div className="font-bold text-lg text-white">{value}</div>
                    </div>
                  )
                })()}
              </div>
            </div>
          )}

          <div className="w-full flex justify-center md:justify-start">
            <div className="w-full max-w-md md:max-w-lg lg:max-w-2xl h-56 md:h-72 lg:h-96 rounded overflow-hidden shadow-xl self-end md:translate-y-2 lg:translate-y-3 md:ml-2 lg:ml-4">
              <ResponsiveVideo
                src={videoUrl ?? smartVideo?.file?.asset?.url ?? "/videos/avidela-promo.mp4"}
                poster={smartVideo?.poster?.asset?.url ?? "/images/hero-poster.jpg"}
                autoPlay={true}
                muted={true}
                loop={true}
                playsInline={true}
                // Force contain to avoid cropping
                fit={'contain'}
                // map focusX/focusY (0..100) to object-position
                position={
                  smartVideo?.focusX != null || smartVideo?.focusY != null
                    ? `${smartVideo?.focusX ?? 50}% ${smartVideo?.focusY ?? 50}%`
                    : '50% 50%'
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
