"use client";
import { buildImageUrl } from '@/lib/sanityClient';
import { sectionTitle } from '@/lib/styles';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import Image from 'next/image';
import { useState } from 'react';

// Simple utility for class merging (replaces external cn)
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ')
}

// ----------------------------------------------------------------------
// TYPES & DATA HELPERS
// ----------------------------------------------------------------------

type StatItem = {
  _id: string
  athleteName?: string
  position?: string
  goals?: number
  assists?: number
  matches?: number
  photo?: SanityImageSource & { focusX?: number; focusY?: number } | null
}

function getLqip(photo?: StatItem['photo']): string | undefined {
  if (!photo) return undefined
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
    const maybeMeta = photo.metadata
    if (maybeMeta && typeof maybeMeta.lqip === 'string') return maybeMeta.lqip
  }
  return undefined
}

// ----------------------------------------------------------------------
// COMPONENTS
// ----------------------------------------------------------------------

const PlayerRow = ({
  item,
  field,
  rank,
  color,
}: {
  item: StatItem
  field: 'goals' | 'assists' | 'matches'
  rank: number
  color: string
}) => {
  const value = item[field] ?? 0
  const isTopRank = rank === 0

  return (
    <div className="group relative flex items-center gap-3 p-3 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 hover:border-slate-600 transition-all duration-300">
      <div className={cn(
        "absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full transition-all",
        isTopRank ? `bg-${color}-500 shadow-[0_0_10px_rgba(var(--${color}-500),0.5)]` : "bg-transparent group-hover:bg-slate-600"
      )} />

      <div className="relative w-12 h-12 sm:w-16 sm:h-16 shrink-0 rounded-2xl overflow-hidden bg-slate-900 border border-slate-700 shadow-md">
        {item.photo ? (
          <Image
            src={buildImageUrl(item.photo, 64, 64) || ''}
            alt={item.athleteName || 'Player'}
            fill
            className="object-cover"
            placeholder={getLqip(item.photo) ? 'blur' : undefined}
            blurDataURL={getLqip(item.photo)}
            sizes="(max-width: 640px) 48px, 64px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-600">
            <span className="text-xs">No img</span>
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <h4 className="text-white font-bold text-sm sm:text-base leading-tight line-clamp-2">
          {item.athleteName || 'Jugador'}
        </h4>
        <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-0.5 truncate">
          {item.position || 'Posición'}
        </div>
      </div>

      <div className={cn(
        "flex flex-col items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl border tabular-nums shrink-0",
        isTopRank
          ? `bg-${color}-500/10 border-${color}-500/30 text-${color}-400`
          : "bg-slate-900 border-slate-700 text-white"
      )}>
        <span className="text-base sm:text-xl font-black leading-none">{value}</span>
      </div>
    </div>
  )
}

const StatsCard = ({
  title,
  icon,
  data,
  field,
  color,
  mobileMinimal = false,
}: {
  title: string
  icon: string
  data: StatItem[]
  field: 'goals' | 'assists' | 'matches'
  color: 'blue' | 'green' | 'purple' | 'pink'
  mobileMinimal?: boolean
}) => {
  return (
    <div className={cn(
      "h-full flex flex-col bg-slate-950/50 border border-slate-800 shadow-2xl overflow-hidden",
      mobileMinimal ? "rounded-2xl border-t-0 bg-transparent shadow-none" : "rounded-[32px] bg-slate-950/50"
    )}>
      {!mobileMinimal && (
        <div className={`relative p-6 pb-4 flex items-center gap-4 bg-gradient-to-b from-slate-900 to-slate-950 rounded-[28px] border-b border-slate-800/50`}>
          <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-${color}-500/10 text-${color}-400 border border-${color}-500/20 shadow-lg`}>
            <span className="text-xl">{icon}</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
        </div>
      )}

      <div className={cn(
        "flex flex-col gap-3 flex-1 overflow-y-auto custom-scrollbar",
        mobileMinimal ? "p-0 max-h-none" : "p-4 max-h-[400px]"
      )}>
        {data.map((item, idx) => (
          <PlayerRow key={item._id} item={item} field={field} rank={idx} color={color} />
        ))}
        {data.length === 0 && (
          <div className="py-8 text-center text-slate-500 text-sm">
            Sin datos disponibles
          </div>
        )}
      </div>
    </div>
  )
}

// ----------------------------------------------------------------------
// MAIN COMPONENT
// ----------------------------------------------------------------------

export default function PlayerStats({ stats }: { stats?: StatItem[] }) {
  const [activeTab, setActiveTab] = useState<'goals' | 'assists' | 'matches'>('goals')

  const list = stats && stats.length > 0 ? stats : []

  const goalsList = [...list]
    .filter((p) => (p.goals ?? 0) > 0)
    .sort((a, b) => (b.goals ?? 0) - (a.goals ?? 0))

  const assistsList = [...list]
    .filter((p) => (p.assists ?? 0) > 0)
    .sort((a, b) => (b.assists ?? 0) - (a.assists ?? 0))

  const matchesList = [...list]
    .filter((p) => (p.matches ?? 0) > 0)
    .sort((a, b) => (b.matches ?? 0) - (a.matches ?? 0))

  const tabs = [
    { id: 'goals', label: 'Goleadores', icon: '⚽', color: 'blue', data: goalsList, field: 'goals' },
    { id: 'assists', label: 'Asistencias', icon: '👟', color: 'green', data: assistsList, field: 'assists' },
    { id: 'matches', label: 'Partidos', icon: '👕', color: 'purple', data: matchesList, field: 'matches' },
  ] as const

  return (
    <section id="player-stats" className="mx-auto w-full max-w-[95%] px-4 sm:px-6 lg:px-8 mt-16 scroll-mt-24" suppressHydrationWarning>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <h2 className={`${sectionTitle} mb-0`}>Estadísticas</h2>
          <p className="text-slate-400 mt-2 text-sm sm:text-base">Top performers de la temporada</p>
        </div>
      </div>

      {/* --- DESKTOP VIEW (Grid) --- */}
      <div className="hidden lg:grid grid-cols-3 gap-6 items-start">
        {tabs.map((tab) => (
          <StatsCard
            key={tab.id}
            title={tab.label}
            icon={tab.icon}
            data={tab.data}
            field={tab.field as any}
            color={tab.color as any}
          />
        ))}
      </div>

      {/* --- MOBILE & TABLET VIEW (Tabs) --- */}
      <div className="block lg:hidden w-full">
        {/* Tabs Grid: Icons Only for cleaner mobile look */}
        <div
          className="bg-slate-900/80 p-1.5 rounded-2xl flex gap-1 mb-6 border border-slate-800 overflow-x-auto snap-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                title={tab.label}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-xl transition-all duration-300 min-w-[60px] shrink-0 snap-center",
                  isActive
                    ? `bg-gradient-to-br from-slate-800 to-slate-700 text-white shadow-lg ring-1 ring-white/10`
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                )}
              >
                <span className="text-2xl">{tab.icon}</span>
                {/* Text Hidden on Mobile/Tablet to Prevent Cut-off */}
                <span className="hidden sm:block text-sm font-medium">{tab.label}</span>
              </button>
            )
          })}
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 min-h-[300px]">
          {tabs.map((tab) => {
            if (tab.id !== activeTab) return null
            return (
              <StatsCard
                key={tab.id}
                title={tab.label}
                icon={tab.icon}
                data={tab.data}
                field={tab.field as any}
                color={tab.color as any}
                mobileMinimal={true}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
