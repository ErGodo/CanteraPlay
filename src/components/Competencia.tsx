import { formatDMY, formatLocaleLong } from '@/lib/formatDate';
import { sectionTitle } from '@/lib/styles';
import Image from 'next/image';

export default function Competencia({ nextMatch, standings, results }: { nextMatch: any, standings: any[], results: any[] }) {
  // Use deterministic formatting helpers
  return (
    <section className="py-6 px-4 max-w-5xl mx-auto">
  <h2 className={`${sectionTitle} mb-6 text-blue-900`}>Competencia y Resultados</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Próximo partido */}
        <div className="bg-white rounded shadow p-6 flex flex-col items-center">
          <h3 className="text-lg font-bold text-blue-900 mb-2 w-full text-center">Próximo Partido</h3>
          {nextMatch ? (
            <>
              <div className="flex items-center gap-8 mb-2">
                <div className="flex flex-col items-center">
                  {nextMatch.homeTeam?.logo?.asset?.url && (
                    <img src={nextMatch.homeTeam.logo.asset.url} alt={nextMatch.homeTeam.name + ' logo'} className="w-16 h-16 object-contain" />
                  )}
                  <span className="text-xs text-blue-800 mt-1 text-center">{nextMatch.homeTeam?.name}</span>
                </div>
                <span className="mx-2 text-gray-500 font-bold text-lg">vs</span>
                <div className="flex flex-col items-center">
                  {nextMatch.awayTeam?.logo?.asset?.url && (
                    <img src={nextMatch.awayTeam.logo.asset.url} alt={nextMatch.awayTeam.name + ' logo'} className="w-16 h-16 object-contain" />
                  )}
                  <span className="text-xs text-blue-800 mt-1 text-center">{nextMatch.awayTeam?.name}</span>
                </div>
              </div>
              <div className="text-gray-700 text-sm mb-1">
                {formatLocaleLong(nextMatch.date)}
              </div>
              {nextMatch.time && (
                <div className="text-xs text-gray-500 mb-1">A partir de las {nextMatch.time}</div>
              )}
              <div className="text-xs text-gray-500">{nextMatch.location}</div>
            </>
          ) : (
            <div className="text-gray-400">Sin información</div>
          )}
        </div>
        {/* Últimos resultados */}
        <div className="bg-white rounded shadow p-6 flex flex-col items-start w-full">
          <h3 className="text-lg font-bold text-blue-900 mb-2">Últimos Resultados</h3>
          {results && results.length > 0 ? (
            <ul className="w-full divide-y divide-gray-100">
              {results.map((r: any, idx: number) => {
                const homeLogo = r.homeTeam?.logo?.asset?.url;
                const homeLqip = r.homeTeam?.logo?.asset?.metadata?.lqip;
                const awayLogo = r.awayTeam?.logo?.asset?.url;
                const awayLqip = r.awayTeam?.logo?.asset?.metadata?.lqip;
                const key = r._id || `${r.homeTeam?.name ?? r.homeTeam}-${r.awayTeam?.name ?? r.awayTeam}-${idx}`;
                return (
                  <li key={key} className="py-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {homeLogo ? (
                          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden border border-gray-100">
                            <Image src={homeLogo} alt={(r.homeTeam?.name ?? r.homeTeam) + ' logo'} width={40} height={40} className="object-contain" {...(homeLqip ? { placeholder: 'blur', blurDataURL: homeLqip } : {})} />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-500">{(r.homeTeam?.name ?? r.homeTeam)?.slice(0,2)}</div>
                        )}
                        <div className="text-sm font-semibold text-blue-800">{r.homeTeam?.name ?? r.homeTeam}</div>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="text-2xl font-bold text-gray-800">{r.homeScore} <span className="mx-1 text-lg">-</span> {r.awayScore}</div>
                        <div className="text-xs text-gray-400 mt-1">{formatDMY(r.date)}</div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-sm font-semibold text-blue-800 text-right">{r.awayTeam?.name ?? r.awayTeam}</div>
                        {awayLogo ? (
                          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center overflow-hidden border border-gray-100">
                            <Image src={awayLogo} alt={(r.awayTeam?.name ?? r.awayTeam) + ' logo'} width={40} height={40} className="object-contain" {...(awayLqip ? { placeholder: 'blur', blurDataURL: awayLqip } : {})} />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-500">{(r.awayTeam?.name ?? r.awayTeam)?.slice(0,2)}</div>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="text-gray-400">Sin resultados</div>
          )}
        </div>
        {/* Tabla de posiciones */}
        <div className="bg-white rounded shadow p-6 flex flex-col items-start overflow-x-auto">
          <h3 className="text-lg font-bold text-blue-900 mb-2">Tabla de Posiciones</h3>
          {standings && standings.length > 0 ? (
            <table className="min-w-[220px] w-full text-xs">
              <thead>
                <tr className="text-blue-800">
                  <th className="pr-2 text-left">#</th>
                  <th className="pr-2 text-left">Equipo</th>
                  <th className="pr-2 text-right">Pts</th>
                </tr>
              </thead>
              <tbody>
                {standings.map((team: any) => (
                  <tr key={team._id}>
                    <td className="pr-2">{team.position}</td>
                    <td className="pr-2">{team.team}</td>
                    <td className="pr-2 text-right">{team.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-gray-400">Sin datos</div>
          )}
        </div>
      </div>
    </section>
  );
}
