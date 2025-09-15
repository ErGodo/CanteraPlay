import { sectionTitle } from '@/lib/styles'
import Image from 'next/image'

type StatItem = {
  _id: string
  athleteName?: string
  position?: string
  goals?: number
  assists?: number
  matches?: number
  photo?: { asset?: { url?: string; metadata?: { lqip?: string } } } | null
}

export default function PlayerStats({ stats }: { stats?: StatItem[] }) {
  const list = stats && stats.length > 0 ? stats : []

  // Render three columns: goals, assists, matches
  return (
    <section id="player-stats" className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 mt-10">
      <h2 className={`${sectionTitle}`}>Estadísticas</h2>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Goles */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-[#0a1a3c]">Goles</h3>
          <div className="mt-3 space-y-3">
            {list.map((p) => (
              <div key={`g-${p._id}`} className="flex items-center gap-3">
                <div className="w-14 h-16 rounded-lg overflow-hidden bg-gray-100">
                  {p.photo?.asset?.url ? (
                    <Image
                      src={p.photo.asset.url}
                      alt={p.athleteName || 'Player'}
                      width={56}
                      height={64}
                      className="object-cover w-full h-full"
                      placeholder={p.photo.asset.metadata?.lqip ? 'blur' : undefined}
                      blurDataURL={p.photo.asset.metadata?.lqip}
                    />
                  ) : null}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-[#0a1a3c]">{p.athleteName}</div>
                  <div className="text-xs text-slate-600">{p.position}</div>
                </div>
                <div className="text-2xl font-extrabold text-[#0a1a3c]">{p.goals ?? 0}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Asistencias */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-[#0a1a3c]">Asistencias</h3>
          <div className="mt-3 space-y-3">
            {list.map((p) => (
              <div key={`a-${p._id}`} className="flex items-center gap-3">
                <div className="w-14 h-16 rounded-lg overflow-hidden bg-gray-100">
                  {p.photo?.asset?.url ? (
                    <Image
                      src={p.photo.asset.url}
                      alt={p.athleteName || 'Player'}
                      width={56}
                      height={64}
                      className="object-cover w-full h-full"
                      placeholder={p.photo.asset.metadata?.lqip ? 'blur' : undefined}
                      blurDataURL={p.photo.asset.metadata?.lqip}
                    />
                  ) : null}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-[#0a1a3c]">{p.athleteName}</div>
                  <div className="text-xs text-slate-600">{p.position}</div>
                </div>
                <div className="text-2xl font-extrabold text-[#0a1a3c]">{p.assists ?? 0}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Partidos */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-[#0a1a3c]">Partidos Jugados</h3>
          <div className="mt-3 space-y-3">
            {list.map((p) => (
              <div key={`m-${p._id}`} className="flex items-center gap-3">
                <div className="w-14 h-16 rounded-lg overflow-hidden bg-gray-100">
                  {p.photo?.asset?.url ? (
                    <Image
                      src={p.photo.asset.url}
                      alt={p.athleteName || 'Player'}
                      width={56}
                      height={64}
                      className="object-cover w-full h-full"
                      placeholder={p.photo.asset.metadata?.lqip ? 'blur' : undefined}
                      blurDataURL={p.photo.asset.metadata?.lqip}
                    />
                  ) : null}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-bold text-[#0a1a3c]">{p.athleteName}</div>
                  <div className="text-xs text-slate-600">{p.position}</div>
                </div>
                <div className="text-2xl font-extrabold text-[#0a1a3c]">{p.matches ?? 0}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
