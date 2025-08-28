



import SwiperGallery from "@/components/SwiperGallery";
import { getCarouselImages } from "@/lib/getCarouselImages";
import { getImportantInfo } from "@/lib/getImportantInfo";
import { getNextMatch } from "@/lib/getNextMatch";
import { getPlans } from "@/lib/getPlans";
import { getResults } from "@/lib/getResults";
import { getStandings } from "@/lib/getStandings";



export default async function Home() {
  // Traer datos de Sanity
  const [importantInfo, plans, carouselImages, nextMatch, standings, results] = await Promise.all([
    getImportantInfo(),
    getPlans(),
    getCarouselImages(),
    getNextMatch(),
    getStandings(),
    getResults(),
  ]);


  return (
  <div className="font-sans min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center px-8 py-4 bg-white shadow">
        <div className="font-bold text-xl text-blue-900">CanteraPlay</div>
        <ul className="flex gap-6 text-gray-700">
          <li><a href="#plans">Plans</a></li>
          <li><a href="#info">Info</a></li>
          <li><a href="#results">Results</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>



      {/* Hero */}
      <section className="flex flex-col items-center justify-center py-16 bg-blue-900 text-white text-center">
        <h1 className="text-4xl font-bold mb-4">Bienvenidos a Avidela Sports</h1>
        <p className="text-lg mb-6">Your club's slogan here</p>
        <a href="#contact" className="bg-white text-blue-900 px-6 py-2 rounded font-semibold shadow hover:bg-blue-100 transition">Inscribete</a>
      </section>


  {/* Carousel */}
  <div className="max-w-5xl mx-auto w-full flex flex-col items-center mb-8">
    <h2 className="text-3xl font-extrabold text-blue-900 mb-4 mt-12 tracking-tight text-left w-full">
      Momentos Inolvidables
    </h2>
    <p className="text-gray-600 mb-6 text-lg italic text-left w-full">Descubre la pasión y alegría de nuestro club en imágenes</p>
    <SwiperGallery images={carouselImages} />
  </div>

  {/* Plans */}
  <section id="plans" className="py-12 px-4 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-blue-900">Nuestros Planes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {plans.length === 0 && (
            <div className="bg-white rounded shadow p-6 text-center col-span-3">No hay planes disponibles aún.</div>
          )}
          {plans.map((plan: any) => (
            <div key={plan._id} className="bg-white rounded shadow p-6 flex flex-col">
              <h3 className="font-bold text-lg mb-2">{plan.name}</h3>
              <p className="mb-2">{plan.description}</p>
              <div className="font-bold text-blue-900 text-xl mb-2">
                {plan.price?.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 })}
                {(() => {
                  const name = plan.name?.toLowerCase() || '';
                  // Normalizar para quitar acentos
                  const normalized = name.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                  return !name.includes('matricula') && !normalized.includes('matricula') ? (
                    <span className="text-sm">/mensual</span>
                  ) : null;
                })()}
              </div>
              {plan.features && plan.features.length > 0 && (
                <ul className="text-sm text-gray-600 list-disc list-inside">
                  {plan.features.map((feature: string, idx: number) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

  {/* Important Info */}
  <section id="info" className="py-8 px-4 max-w-5xl mx-auto">
      {/* Próximo partido, Últimos resultados, Tabla de posiciones */}
  <section className="py-6 px-4 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-blue-900">Competencia y Resultados</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Próximo partido */}
          <div className="bg-white rounded shadow p-6 flex flex-col items-start">
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
                  <div className="text-xs text-gray-500 mb-1">{nextMatch.time}</div>
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
        <h2 className="text-xl font-bold mb-4 text-blue-900">Lo ultimo en Avidela Sports</h2>
        <div className="flex flex-col gap-6">
          {importantInfo.map((info: any) => (
            <div key={info._id} className="bg-white rounded shadow flex flex-col sm:flex-row gap-4 p-4 items-center">
              {info.image?.asset?.url && (
                <img
                  src={info.image.asset.url}
                  alt={info.image.alt || info.title}
                  className="w-32 h-32 object-cover rounded-md border"
                  style={{ minWidth: 128, minHeight: 128 }}
                  loading="lazy"
                />
              )}
              <div className="flex-1">
                <div className="font-semibold text-blue-800 text-lg mb-1">{info.title}</div>
                <div className="text-gray-700 text-sm mb-2">{info.content}</div>
                <div className="text-xs text-gray-400">{new Date(info.date).toLocaleDateString()}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TODO: Resultados, Próximo partido, Tabla de posiciones, Carrusel, Contacto */}
      <footer className="w-full text-center py-6 text-gray-500 mt-12">CanteraPlay © {new Date().getFullYear()}</footer>
    </div>
  );
}
