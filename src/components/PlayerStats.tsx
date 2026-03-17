"use client";
import { buildImageUrl } from '@/lib/sanityClient';
import SectionHeading from '@/components/SectionHeading';
import type { SanityImageSource } from '@sanity/image-url';
import Image from 'next/image';
import { useState } from 'react';

// Simple utility for class merging 
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
  colorClass,
}: {
  item: StatItem
  field: 'goals' | 'assists' | 'matches'
  rank: number
  colorClass: string
}) => {
  const value = item[field] ?? 0
  const isTopRank = rank === 0

  return (
    <div className="group relative flex items-center gap-3 p-3 rounded-2xl bg-slate-800/40 border border-slate-700/30 hover:bg-slate-800 hover:border-pink-500/30 transition-all duration-300">
      {/* Indicator bar */}
      <div className={cn(
        "absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full transition-all",
        isTopRank ? "bg-[#e91e63] shadow-[0_0_10px_rgba(233,30,99,0.5)]" : "bg-transparent group-hover:bg-pink-500/40"
      )} />

      {/* Avatar */}
      <div className="relative w-12 h-12 sm:w-16 sm:h-16 shrink-0 rounded-2xl overflow-hidden bg-slate-900 border border-slate-700 shadow-md">
        {item.photo ? (
          <Image
            src={buildImageUrl(item.photo, 64, 64) || ''}
            alt={item.athleteName || 'Player'}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            placeholder={getLqip(item.photo) ? 'blur' : undefined}
            blurDataURL={getLqip(item.photo)}
            sizes="(max-width: 640px) 48px, 64px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-600">
            <span className="text-[10px] uppercase font-bold">Avidela</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <h4 className="text-white font-bold text-sm sm:text-base leading-tight line-clamp-2 group-hover:text-pink-100 transition-colors">
          {item.athleteName || 'Jugador'}
        </h4>
        <div className="text-[10px] sm:text-xs text-slate-400 font-semibold uppercase tracking-wider mt-0.5 truncate">
          {item.position || 'Posición'}
        </div>
      </div>

      {/* Value Badge */}
      <div className={cn(
        "flex flex-col items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl border tabular-nums shrink-0 transition-all",
        isTopRank
          ? "bg-pink-500/10 border-pink-500/30 text-pink-400 shadow-[0_0_15px_rgba(233,30,99,0.1)]"
          : "bg-slate-900 border-slate-700 text-white group-hover:border-pink-500/20"
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
  mobileMinimal = false,
}: {
  title: string
  icon: string
  data: StatItem[]
  field: 'goals' | 'assists' | 'matches'
  mobileMinimal?: boolean
}) => {
  return (
    <div className={cn(
      "h-full flex flex-col bg-slate-950/40 border border-slate-800 shadow-2xl overflow-hidden transition-all",
      mobileMinimal ? "rounded-2xl border-t-0 bg-transparent shadow-none" : "rounded-[32px] hover:border-pink-500/20"
    )}>
      {!mobileMinimal && (
        <div className="relative p-6 pb-4 flex items-center gap-4 bg-gradient-to-b from-slate-900/50 to-slate-950/50 rounded-[28px] border-b border-slate-800/40">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20 shadow-lg">
            <span className="text-xl">{icon}</span>
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
        </div>
      )}

      <div className={cn(
        "flex flex-col gap-3 flex-1 overflow-y-auto custom-scrollbar",
        mobileMinimal ? "p-0 max-h-none" : "p-4 max-h-[450px]"
      )}>
        {data.map((item, idx) => (
          <PlayerRow key={item._id} item={item} field={field} rank={idx} colorClass="pink" />
        ))}
        {data.length === 0 && (
          <div className="py-12 text-center">
            <div className="text-3xl opacity-20 mb-2">⚽</div>
            <div className="text-slate-500 text-xs font-semibold uppercase tracking-widest">
              Sin datos aún
            </div>
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
    { id: 'goals', label: 'Goleadores', icon: '⚽', data: goalsList, field: 'goals' },
    { id: 'assists', label: 'Asistencias', icon: '👟', data: assistsList, field: 'assists' },
    { id: 'matches', label: 'Partidos', icon: '👕', data: matchesList, field: 'matches' },
  ] as const

  return (
    <section id="player-stats" className="mx-auto w-full max-w-[95%] px-4 sm:px-6 lg:px-8 mt-16 scroll-mt-24" suppressHydrationWarning>
      <SectionHeading
        title="Nuestras Estadísticas"
        highlight="Estadísticas"
        subtitle="Los jugadores más destacados de la academia"
      />

      {/* --- DESKTOP VIEW (Grid) --- */}
      <div className="hidden lg:grid grid-cols-3 gap-6 items-start">
        {tabs.map((tab) => (
          <StatsCard
            key={tab.id}
            title={tab.label}
            icon={tab.icon}
            data={tab.data}
            field={tab.field as any}
          />
        ))}
      </div>

      {/* --- MOBILE & TABLET VIEW (Tabs) --- */}
      <div className="block lg:hidden w-full">
        <div
          className="bg-slate-900/40 p-1 rounded-2xl flex gap-1 mb-6 border border-slate-800/60 overflow-x-auto snap-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex-1 flex items-center justify-center py-3 px-1 sm:px-3 sm:gap-2 rounded-xl transition-all duration-300 min-w-[50px] sm:min-w-[100px] shrink-0 snap-center",
                  isActive
                    ? "bg-[#e91e63] text-white shadow-[0_0_15px_rgba(233,30,99,0.3)]"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                )}
              >
                <span className="text-xl">{tab.icon}</span>
                <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider">{tab.label}</span>
              </button>
            )
          })}
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-2 duration-400">
          {tabs.map((tab) => {
            if (tab.id !== activeTab) return null
            return (
              <StatsCard
                key={tab.id}
                title={tab.label}
                icon={tab.icon}
                data={tab.data}
                field={tab.field as any}
                mobileMinimal={true}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
