"use client";
import React, { useEffect, useState, useCallback } from "react";

const COMPETITION_API = process.env.NEXT_PUBLIC_COMPETITION_SERVICE_URL || "";
const ATHLETE_API = process.env.NEXT_PUBLIC_ATHLETE_SERVICE_URL || "";
const CLUB_ID = "f61c9d6c-63a0-4815-a847-912cf2785702";

/* ─── types ─── */
interface MatchEvent {
  id: string;
  type: "GOAL" | "OWN_GOAL" | "ASSIST" | "YELLOW_CARD" | "RED_CARD";
  minute: number;
  player?: { id: string; athleteId?: string; guestName?: string };
  relatedPlayer?: { id: string; athleteId?: string; guestName?: string };
  team?: { id: string; name?: string };
  metadata?: any;
}

interface AthleteMap {
  [athleteId: string]: { name: string; photoUrl?: string; position?: string };
}

interface Props {
  matchId: string;
  homeTeamName: string;
  awayTeamName: string;
  homeScore: number | string;
  awayScore: number | string;
  homeLogo?: string;
  awayLogo?: string;
  date?: string;
  category?: string;
  onClose: () => void;
}

/* ─── component ─── */
export default function MatchStatsModal({
  matchId,
  homeTeamName,
  awayTeamName,
  homeScore,
  awayScore,
  homeLogo,
  awayLogo,
  date,
  category,
  onClose,
}: Props) {
  const [events, setEvents] = useState<MatchEvent[]>([]);
  const [athleteMap, setAthleteMap] = useState<AthleteMap>({});
  const [loading, setLoading] = useState(true);
  const [highlight, setHighlight] = useState("");

  /* fetch events + hydrate names */
  const load = useCallback(async () => {
    try {
      setLoading(true);

      // 1. Get match events from public endpoint
      const evRes = await fetch(
        `${COMPETITION_API}/api/match-events/public/match/${matchId}`,
        { cache: "no-store" }
      );
      const rawEvents: MatchEvent[] = evRes.ok ? await evRes.json() : [];
      setEvents(rawEvents);

      // 2. Collect unique athlete IDs to hydrate names
      const athleteIds = new Set<string>();
      rawEvents.forEach((e) => {
        if (e.player?.athleteId) athleteIds.add(e.player.athleteId);
        if (e.relatedPlayer?.athleteId)
          athleteIds.add(e.relatedPlayer.athleteId);
      });

      // 3. Fetch athlete data
      if (athleteIds.size > 0) {
        try {
          const athRes = await fetch(
            `${ATHLETE_API}/athletes/club/${CLUB_ID}`,
            { cache: "no-store" }
          );
          if (athRes.ok) {
            const athletes: any[] = await athRes.json();
            const map: AthleteMap = {};
            athletes.forEach((a) => {
              map[a.pkAthlete] = {
                name: `${a.firstName} ${a.lastName}`,
                photoUrl: a.photoUrl,
                position: a.position || a.sportProfile?.primaryPosition,
              };
            });
            setAthleteMap(map);

            // 4. Generate AI highlight
            generateHighlight(rawEvents, map);
          }
        } catch {
          /* athlete fetch failed – continue with callup names */
        }
      } else {
        // No events – no highlight
      }
    } catch (err) {
      console.error("Error loading match events:", err);
    } finally {
      setLoading(false);
    }
  }, [matchId]);

  useEffect(() => {
    load();
  }, [load]);

  /* Close on Escape */
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  /* ──────────────────────────────────────────────────────
     AI ANALYSIS ENGINE
     Analyses match result, MVP, sentiment and generates
     a contextual, motivational commentary.
     ────────────────────────────────────────────────────── */
  function generateHighlight(evts: MatchEvent[], map: AthleteMap) {
    const CLUB_NAME = "Avidela";

    // ── 1. Determine match outcome for Avidela ──
    const hScore = Number(homeScore) || 0;
    const aScore = Number(awayScore) || 0;
    const isHomeAvidela = homeTeamName.toLowerCase().includes("avidela");
    const isAwayAvidela = awayTeamName.toLowerCase().includes("avidela");

    let avidelaScore = 0;
    let rivalScore = 0;
    let rivalName = "";

    if (isHomeAvidela) {
      avidelaScore = hScore;
      rivalScore = aScore;
      rivalName = awayTeamName;
    } else if (isAwayAvidela) {
      avidelaScore = aScore;
      rivalScore = hScore;
      rivalName = homeTeamName;
    } else {
      // fallback: assume home is the user's club
      avidelaScore = hScore;
      rivalScore = aScore;
      rivalName = awayTeamName;
    }

    const diff = avidelaScore - rivalScore;
    type Outcome = "win" | "draw" | "loss";
    const outcome: Outcome = diff > 0 ? "win" : diff === 0 ? "draw" : "loss";
    const margin = Math.abs(diff);
    const totalGoals = avidelaScore + rivalScore;

    // ── 2. Compute per-player stats for MVP ──
    interface PlayerStats { name: string; goals: number; assists: number; total: number }
    const pStats: Record<string, PlayerStats> = {};

    evts.forEach((e) => {
      if ((e.type === "GOAL" || e.type === "ASSIST") && e.player) {
        const id = e.player.athleteId || e.player.id;
        const name = getName(e.player, map);
        if (!pStats[id]) pStats[id] = { name, goals: 0, assists: 0, total: 0 };
        if (e.type === "GOAL") pStats[id].goals++;
        if (e.type === "ASSIST") pStats[id].assists++;
        pStats[id].total = pStats[id].goals * 2 + pStats[id].assists;
      }
    });

    const ranked = Object.values(pStats).sort((a, b) => b.total - a.total);
    const mvp = ranked[0] || null;
    const hasMultipleContributors = ranked.filter(p => p.total > 0).length > 1;
    const totalAssists = evts.filter(e => e.type === "ASSIST").length;
    const totalAvidelaGoals = avidelaScore;

    // ── 3. Build analysis paragraphs ──
    const lines: string[] = [];

    // — Result sentiment —
    if (outcome === "win") {
      if (margin >= 3) {
        lines.push(`🔥 Victoria contundente de ${CLUB_NAME} por ${avidelaScore}-${rivalScore} frente a ${rivalName}. El equipo mostró superioridad en todas las líneas y dejó una declaración de intenciones clara.`);
      } else if (margin === 2) {
        lines.push(`💪 Sólida victoria de ${CLUB_NAME} frente a ${rivalName}. Un triunfo merecido que refleja el trabajo colectivo y la determinación del plantel.`);
      } else {
        lines.push(`✅ ${CLUB_NAME} se llevó los 3 puntos en un partido ajustado contra ${rivalName}. Estas victorias cerradas forjan carácter y muestran la madurez competitiva del equipo.`);
      }
    } else if (outcome === "draw") {
      if (totalGoals === 0) {
        lines.push(`🤝 Empate sin goles frente a ${rivalName}. Aunque el marcador no se movió, la solidez defensiva es un pilar fundamental. El próximo desafío será encontrar la efectividad ofensiva para convertir las oportunidades.`);
      } else {
        lines.push(`🤝 Empate ${avidelaScore}-${rivalScore} frente a ${rivalName}. El equipo mostró carácter para no bajar los brazos. Cada punto suma, y de estos partidos se aprende a gestionar los momentos clave.`);
      }
    } else {
      if (margin >= 3) {
        lines.push(`📉 Derrota difícil ante ${rivalName} por ${rivalScore}-${avidelaScore}. Los momentos complicados son los que más enseñan. Es hora de analizar, corregir y volver más fuertes. El equipo tiene la capacidad y la actitud para revertir esta situación.`);
      } else if (margin === 2) {
        lines.push(`💔 Caída por ${rivalScore}-${avidelaScore} frente a ${rivalName}. El resultado no refleja todo el esfuerzo del equipo. Hay aspectos positivos para rescatar y áreas claras de mejora que nos harán más competitivos.`);
      } else {
        lines.push(`📊 Derrota mínima por ${rivalScore}-${avidelaScore} contra ${rivalName}. Estuvo cerca. El equipo compitió de igual a igual y con pequeños ajustes estos partidos se pueden ganar. A seguir trabajando con la misma intensidad.`);
      }
    }

    // — MVP analysis —
    if (mvp) {
      const mvpParts: string[] = [];
      if (mvp.goals > 0) {
        mvpParts.push(
          mvp.goals === 1 ? "1 gol" :
          mvp.goals === 2 ? "un doblete" :
          mvp.goals === 3 ? "un hat-trick" :
          `${mvp.goals} goles`
        );
      }
      if (mvp.assists > 0) {
        mvpParts.push(mvp.assists === 1 ? "1 asistencia" : `${mvp.assists} asistencias`);
      }

      const mvpVerb = mvp.goals >= 3 ? "fue la gran figura" :
                       mvp.goals >= 2 ? "brilló" :
                       mvp.total >= 3 ? "fue clave" :
                       "se destacó";

      lines.push(`⭐ MVP: ${mvp.name} ${mvpVerb} con ${mvpParts.join(" y ")}. ${
        outcome === "win" && mvp.goals >= 2
          ? "Una actuación estelar que marca diferencia."
          : outcome === "loss" && mvp.goals > 0
          ? "A pesar del resultado, su aporte individual fue valioso."
          : "Un rendimiento destacado que merece reconocimiento."
      }`);
    }

    // — Team work insight —
    if (hasMultipleContributors && totalAssists > 0) {
      lines.push(`🤝 Juego colectivo: ${totalAssists} ${totalAssists === 1 ? "asistencia refleja" : "asistencias reflejan"} la conexión entre líneas. ${
        outcome === "win"
          ? "El fútbol asociado fue protagonista."
          : "La asociación está ahí, ahora hay que pulir la definición."
      }`);
    }

    // — Forward-looking motivation —
    if (outcome === "win") {
      lines.push(`🎯 A seguir con esta mentalidad ganadora. Los objetivos del club se construyen partido a partido, manteniendo esta intensidad y compromiso.`);
    } else if (outcome === "draw") {
      lines.push(`🎯 El camino se construye con constancia. A seguir puliendo los detalles que nos separan de la victoria.`);
    } else {
      lines.push(`🎯 Las derrotas son oportunidades de crecimiento. El carácter del equipo se mide en cómo responde ante la adversidad. ¡Vamos ${CLUB_NAME}, a levantarse!`);
    }

    setHighlight(lines.join("\n\n"));
  }

  /* helper: resolve player name */
  function getName(
    p: { athleteId?: string; guestName?: string; id?: string },
    map: AthleteMap
  ): string {
    if (p.athleteId && map[p.athleteId]) return map[p.athleteId].name;
    if (p.guestName) return p.guestName;
    return "Jugador";
  }

  /* ─── Partition events ─── */
  const goals = events.filter(
    (e) => e.type === "GOAL" || e.type === "OWN_GOAL"
  );
  const assists = events.filter((e) => e.type === "ASSIST");
  const cards = events.filter(
    (e) => e.type === "YELLOW_CARD" || e.type === "RED_CARD"
  );
  const hasEvents = events.length > 0;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg bg-slate-950 border border-slate-800/60 rounded-3xl shadow-2xl overflow-hidden animate-[modalIn_0.25s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top gradient accent */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#e91e63] via-purple-500 to-[#0F8DBF]" />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
        >
          ✕
        </button>

        {/* Header: Mini scoreboard */}
        <div className="px-6 pt-8 pb-4">
          {category && (
            <div className="flex justify-center mb-4">
              <span className="px-3 py-1 text-[10px] font-black tracking-[0.15em] uppercase rounded-full bg-[#e91e63]/10 text-[#e91e63] border border-[#e91e63]/30">
                {category}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between max-w-xs mx-auto">
            {/* Home */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 p-1 flex items-center justify-center overflow-hidden">
                <div className="relative w-full h-full bg-white rounded-lg flex items-center justify-center">
                  {homeLogo ? (
                    <img
                      src={homeLogo}
                      alt={homeTeamName}
                      className="object-contain w-full h-full p-0.5"
                    />
                  ) : (
                    <span className="text-[8px] font-black text-slate-800">
                      LOC
                    </span>
                  )}
                </div>
              </div>
              <span className="text-[10px] font-black text-white uppercase text-center line-clamp-1">
                {homeTeamName}
              </span>
            </div>

            {/* Score */}
            <div className="flex flex-col items-center px-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-black text-white tabular-nums">
                  {homeScore}
                </span>
                <span className="text-[#e91e63] text-xl font-black">-</span>
                <span className="text-3xl font-black text-white tabular-nums">
                  {awayScore}
                </span>
              </div>
              {date && (
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-1">
                  {date}
                </span>
              )}
            </div>

            {/* Away */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 p-1 flex items-center justify-center overflow-hidden">
                <div className="relative w-full h-full bg-white rounded-lg flex items-center justify-center">
                  {awayLogo ? (
                    <img
                      src={awayLogo}
                      alt={awayTeamName}
                      className="object-contain w-full h-full p-0.5"
                    />
                  ) : (
                    <span className="text-[8px] font-black text-slate-800">
                      VIS
                    </span>
                  )}
                </div>
              </div>
              <span className="text-[10px] font-black text-white uppercase text-center line-clamp-1">
                {awayTeamName}
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-6 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

        {/* Content */}
        <div className="px-6 py-5 max-h-[55vh] overflow-y-auto space-y-5 custom-scroll">
          {loading ? (
            <div className="space-y-4 animate-pulse">
              {/* Shimmer: AI analysis block */}
              <div className="rounded-2xl bg-slate-800/50 p-5 space-y-3">
                <div className="h-3 w-32 bg-slate-700/60 rounded-full" />
                <div className="h-3 w-full bg-slate-700/40 rounded-full" />
                <div className="h-3 w-4/5 bg-slate-700/40 rounded-full" />
              </div>
              {/* Shimmer: section title */}
              <div className="h-3 w-20 bg-slate-700/50 rounded-full" />
              {/* Shimmer: event rows */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/30 border border-slate-800/40">
                  <div className="w-6 h-6 rounded-full bg-slate-700/50 shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-28 bg-slate-700/50 rounded-full" />
                    <div className="h-2 w-16 bg-slate-700/30 rounded-full" />
                  </div>
                  <div className="h-4 w-8 bg-slate-700/30 rounded-lg" />
                </div>
              ))}
            </div>
          ) : !hasEvents ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
              <span className="text-4xl">📋</span>
              <p className="text-sm text-slate-400 font-semibold">
                No hay estadísticas registradas para este partido
              </p>
              <p className="text-[10px] text-slate-600">
                Las estadísticas se registran durante o después de cada encuentro
              </p>
            </div>
          ) : (
            <>
              {/* AI Analysis */}
              {highlight && (
                <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-purple-500/10 border border-amber-500/20 rounded-2xl p-5 space-y-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">🤖</span>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500/80">
                      El IA Míster dice...
                    </p>
                  </div>
                  {highlight.split("\n\n").map((paragraph, i) => (
                    <p key={i} className="text-[13px] text-slate-300/90 font-medium leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}

              {/* Goals */}
              {goals.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="text-base">⚽</span> Goles
                  </h4>
                  <div className="space-y-2">
                    {goals.map((e) => (
                      <EventRow
                        key={e.id}
                        icon={e.type === "OWN_GOAL" ? "🔴" : "⚽"}
                        name={getName(e.player || {}, athleteMap)}
                        detail={
                          e.type === "OWN_GOAL" ? "Autogol" : "Gol"
                        }
                        minute={e.minute}
                        accent="emerald"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Assists */}
              {assists.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="text-base">👟</span> Asistencias
                  </h4>
                  <div className="space-y-2">
                    {assists.map((e) => (
                      <EventRow
                        key={e.id}
                        icon="👟"
                        name={getName(e.player || {}, athleteMap)}
                        detail="Asistencia"
                        minute={e.minute}
                        accent="cyan"
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800/40 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-black uppercase tracking-wider bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-xl transition-all"
          >
            Cerrar
          </button>
        </div>
      </div>

      {/* Animation keyframes */}
      <style jsx global>{`
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .custom-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
      `}</style>
    </div>
  );
}

/* ─── Event Row ─── */
function EventRow({
  icon,
  name,
  detail,
  minute,
  accent,
}: {
  icon: string;
  name: string;
  detail: string;
  minute: number;
  accent: string;
}) {
  const accentColors: Record<string, string> = {
    emerald: "bg-emerald-500/10 border-emerald-500/20",
    cyan: "bg-cyan-500/10 border-cyan-500/20",
    yellow: "bg-yellow-500/10 border-yellow-500/20",
    red: "bg-red-500/10 border-red-500/20",
  };

  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-xl border ${
        accentColors[accent] || "bg-white/5 border-white/10"
      } transition-all hover:scale-[1.01]`}
    >
      <span className="text-sm shrink-0">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-white truncate">{name}</p>
        <p className="text-[10px] text-slate-500 font-semibold">{detail}</p>
      </div>
      {minute > 0 && (
        <span className="text-[10px] font-black text-slate-600 bg-slate-800/80 px-2 py-0.5 rounded-lg tabular-nums shrink-0">
          {minute}&apos;
        </span>
      )}
    </div>
  );
}
