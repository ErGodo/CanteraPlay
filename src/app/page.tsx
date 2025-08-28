
import { getImportantInfo } from "@/lib/getImportantInfo";

export default async function Home() {
  // Traer datos de Sanity
  const importantInfo = await getImportantInfo();

  // TODO: Traer los demás datos (planes, resultados, hero, etc.)

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
        <h1 className="text-4xl font-bold mb-4">Welcome to CanteraPlay</h1>
        <p className="text-lg mb-6">Your club's slogan here</p>
        <a href="#contact" className="bg-white text-blue-900 px-6 py-2 rounded font-semibold shadow hover:bg-blue-100 transition">Join the Club</a>
      </section>

      {/* Plans */}
      <section id="plans" className="py-12 px-4 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-blue-900">Our Plans</h2>
        {/* Aquí irán los planes desde Sanity */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Ejemplo de plan */}
          <div className="bg-white rounded shadow p-6">
            <h3 className="font-bold text-lg mb-2">Plan Básico</h3>
            <p className="mb-2">Acceso a entrenamientos y partidos.</p>
            <div className="font-bold text-blue-900 text-xl mb-2">$20/mes</div>
            <ul className="text-sm text-gray-600 list-disc list-inside">
              <li>Entrenamientos semanales</li>
              <li>Partidos oficiales</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Important Info */}
      <section id="info" className="py-8 px-4 max-w-4xl mx-auto">
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
