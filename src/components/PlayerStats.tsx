import { buildImageUrl } from '@/lib/sanityClient'
import { sectionTitle } from '@/lib/styles'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import Image from 'next/image'

type StatItem = {
  _id: string
  athleteName?: string
  position?: string
  goals?: number
  assists?: number
  matches?: number
  photo?: SanityImageSource & { focusX?: number; focusY?: number } | null
}

export default function PlayerStats({ stats }: { stats?: StatItem[] }) {
  const list = stats && stats.length > 0 ? stats : []

  // Safely extract LQIP (blur placeholder) from various Sanity image shapes.
  function getLqip(photo?: StatItem['photo']): string | undefined {
    if (!photo) return undefined
    // SanityImageSource can be a string id or an object; guard for object form
    // Narrow to object shape that may contain asset/metadata
    type SanityImageObject = {
      asset?: { metadata?: { lqip?: string } }
      metadata?: { lqip?: string }
      [key: string]: unknown
    }

    function isSanityImageObject(v: unknown): v is SanityImageObject {
      return typeof v === 'object' && v !== null && ('asset' in v || 'metadata' in v)
    }

    if (isSanityImageObject(photo)) {
      const maybeAsset = photo.asset
      if (maybeAsset && maybeAsset.metadata && typeof maybeAsset.metadata.lqip === 'string') {
        return maybeAsset.metadata.lqip
      }
      // some shapes include metadata at the top level
      const maybeMeta = photo.metadata
      if (maybeMeta && typeof maybeMeta.lqip === 'string') return maybeMeta.lqip
    }
    return undefined
  }

  // prepare sorted, filtered lists for each stat: exclude zero values and sort desc
  const goalsList = [...list]
    .filter((p) => (p.goals ?? 0) > 0)
    .sort((a, b) => (b.goals ?? 0) - (a.goals ?? 0))

  const assistsList = [...list]
    .filter((p) => (p.assists ?? 0) > 0)
    .sort((a, b) => (b.assists ?? 0) - (a.assists ?? 0))

  const matchesList = [...list]
    .filter((p) => (p.matches ?? 0) > 0)
    .sort((a, b) => (b.matches ?? 0) - (a.matches ?? 0))

  // Render three columns: goals, assists, matches
  return (
    <section id="player-stats" className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 mt-10">
      <h2 className={`${sectionTitle}`}>Estadísticas</h2>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-6" suppressHydrationWarning>
        {/* Goles */}
        <div className="bg-slate-900 rounded-3xl p-6 shadow-lg border border-slate-800 hover:shadow-blue-900/20 transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-900/20 rounded-xl text-blue-400 border border-blue-900/30">
              {/* Icon placeholder or just text */}
              <span className="font-black text-lg">⚽</span>
            </div>
            <h3 className="text-xl font-extrabold text-white">Goleadores</h3>
          </div>

          <div className="mt-3 space-y-4">
            {goalsList.map((p) => (
              <div key={`g-${p._id}`} className="flex items-center gap-4 group">
                <div className="w-14 h-16 rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 shadow-sm group-hover:scale-105 transition-transform">
                  {p.photo ? (
                    (() => {
                      const src = buildImageUrl(p.photo as SanityImageSource | null | undefined, 56, 64)
                      if (!src) return null
                      const lqip = getLqip(p.photo)
                      return (
                        <Image
                          src={src}
                          alt={p.athleteName || 'Player'}
                          width={56}
                          height={64}
                          className="object-cover object-center w-full h-full"
                          placeholder={lqip ? 'blur' : undefined}
                          blurDataURL={lqip}
                        />
                      )
                    })()
                  ) : null}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-extrabold text-white truncate">{p.athleteName}</div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{p.position}</div>
                </div>
                <div className="text-2xl font-black text-white bg-slate-800 px-3 py-1 rounded-lg tabular-nums border border-slate-700">{p.goals ?? 0}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Asistencias */}
        <div className="bg-slate-900 rounded-3xl p-6 shadow-lg border border-slate-800 hover:shadow-green-900/20 transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-900/20 rounded-xl text-green-400 border border-green-900/30">
              <span className="font-black text-lg">👟</span>
            </div>
            <h3 className="text-xl font-extrabold text-white">Asistencias</h3>
          </div>
          <div className="mt-3 space-y-4">
            {assistsList.map((p) => (
              <div key={`a-${p._id}`} className="flex items-center gap-4 group">
                <div className="w-14 h-16 rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 shadow-sm group-hover:scale-105 transition-transform">
                  {p.photo ? (
                    (() => {
                      const src = buildImageUrl(p.photo as SanityImageSource | null | undefined, 56, 64)
                      if (!src) return null
                      const lqip = getLqip(p.photo)
                      return (
                        <Image
                          src={src}
                          alt={p.athleteName || 'Player'}
                          width={56}
                          height={64}
                          className="object-cover object-center w-full h-full"
                          placeholder={lqip ? 'blur' : undefined}
                          blurDataURL={lqip}
                        />
                      )
                    })()
                  ) : null}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-extrabold text-white truncate">{p.athleteName}</div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{p.position}</div>
                </div>
                <div className="text-2xl font-black text-white bg-slate-800 px-3 py-1 rounded-lg tabular-nums border border-slate-700">{p.assists ?? 0}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Partidos */}
        <div className="bg-slate-900 rounded-3xl p-6 shadow-lg border border-slate-800 hover:shadow-purple-900/20 transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-900/20 rounded-xl text-purple-400 border border-purple-900/30">
              <span className="font-black text-lg">👕</span>
            </div>
            <h3 className="text-xl font-extrabold text-white">Partidos</h3>
          </div>
          <div className="mt-3 space-y-4">
            {matchesList.map((p) => (
              <div key={`m-${p._id}`} className="flex items-center gap-4 group">
                <div className="w-14 h-16 rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 shadow-sm group-hover:scale-105 transition-transform">
                  {p.photo ? (
                    (() => {
                      const src = buildImageUrl(p.photo as SanityImageSource | null | undefined, 56, 64)
                      if (!src) return null
                      const lqip = getLqip(p.photo)
                      return (
                        <Image
                          src={src}
                          alt={p.athleteName || 'Player'}
                          width={56}
                          height={64}
                          className="object-cover object-center w-full h-full"
                          placeholder={lqip ? 'blur' : undefined}
                          blurDataURL={lqip}
                        />
                      )
                    })()
                  ) : null}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-extrabold text-white truncate">{p.athleteName}</div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{p.position}</div>
                </div>
                <div className="text-2xl font-black text-white bg-slate-800 px-3 py-1 rounded-lg tabular-nums border border-slate-700">{p.matches ?? 0}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
