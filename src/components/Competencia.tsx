export default function Competencia({ nextMatch, standings, results }: { nextMatch: any, standings: any[], results: any[] }) {
  return (
    <section className="py-6 px-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-blue-900">Competencia y Resultados</h2>
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
                {new Date(nextMatch.date).toLocaleDateString()}
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
        <div className="bg-white rounded shadow p-6 flex flex-col items-start">
          <h3 className="text-lg font-bold text-blue-900 mb-2">Últimos Resultados</h3>
          {results && results.length > 0 ? (
            <ul className="w-full">
              {results.map((r: any) => (
                <li key={r._id} className="mb-2">
                  <span className="font-semibold text-blue-800">{r.homeTeam}</span>
                  <span className="mx-1 text-gray-700">{r.homeScore} - {r.awayScore}</span>
                  <span className="font-semibold text-blue-800">{r.awayTeam}</span>
                  <span className="block text-xs text-gray-400">{new Date(r.date).toLocaleDateString()}</span>
                </li>
              ))}
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
