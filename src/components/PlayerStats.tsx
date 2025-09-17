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
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Goles */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-[#0a1a3c]">Goles</h3>
          <div className="mt-3 space-y-3">
            {goalsList.map((p) => (
              <div key={`g-${p._id}`} className="flex items-center gap-3">
                <div className="w-14 h-16 rounded-lg overflow-hidden bg-gray-100">
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
            {assistsList.map((p) => (
              <div key={`a-${p._id}`} className="flex items-center gap-3">
                <div className="w-14 h-16 rounded-lg overflow-hidden bg-gray-100">
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
            {matchesList.map((p) => (
              <div key={`m-${p._id}`} className="flex items-center gap-3">
                <div className="w-14 h-16 rounded-lg overflow-hidden bg-gray-100">
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
