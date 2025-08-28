// app/page.tsx
import HeaderSection from "@/components/HeaderSection";
import { getCarouselImages } from "@/lib/getCarouselImages";
import { getImportantInfo } from "@/lib/getImportantInfo";
import { getNextMatch } from "@/lib/getNextMatch";
import { getPlans } from "@/lib/getPlans";
import { getResults } from "@/lib/getResults";
import { getStandings } from "@/lib/getStandings";
import Image from "next/image";
import Link from "next/link";

/* ------------------------------ Navbar ------------------------------ */
function Navbar({
  clubName = "Avidela Sports",
  logoUrl = "/images/avidela-logo.png",
  instagramUrl = "https://www.instagram.com/avidelasportacademy/",
  primary = "#0a1a3c",
  accent = "#e91e63",
}: {
  clubName?: string;
  logoUrl?: string;
  instagramUrl?: string;
  primary?: string;
  accent?: string;
}) {
  const links = [
    { href: "#plans", label: "Planes" },
    { href: "#moments", label: "Momentos" },
    { href: "#results", label: "Resultados" },
    { href: "#sponsors", label: "Auspiciadores" },
    { href: "#contact", label: "Contacto" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b">
      <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={logoUrl}
            alt={`${clubName} Logo`}
            width={44}
            height={44}
            className="rounded-full bg-white border border-gray-200"
            priority
          />
          <span className="font-extrabold text-xl tracking-tight" style={{ color: primary }}>
            {clubName}
          </span>
        </Link>

        <ul className="hidden md:flex gap-6 font-semibold" style={{ color: primary }}>
          {links.map((l) => (
            <li key={l.href}><a href={l.href} className="hover:opacity-80">{l.label}</a></li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-2">
          <a
            href={instagramUrl}
            target="_blank"
            className="rounded-lg px-3 py-1.5 text-white font-semibold"
            style={{ backgroundColor: accent }}
          >
            Instagram
          </a>
        </div>

        <details className="md:hidden">
          <summary className="list-none inline-flex items-center justify-center rounded-md p-2 ring-1 ring-gray-200 cursor-pointer select-none">
            ☰
          </summary>
          <div className="mt-2 border-t bg-white">
            <ul className="px-4 py-2 space-y-2 font-semibold" style={{ color: primary }}>
              {links.map((l) => (
                <li key={l.href}><a href={l.href} className="block py-2">{l.label}</a></li>
              ))}
              <li>
                <a
                  href={instagramUrl}
                  target="_blank"
                  className="block text-center rounded-lg px-3 py-2 text-white font-semibold"
                  style={{ backgroundColor: accent }}
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </details>
      </nav>
    </header>
  );
}

/* ------------------------------ Footer ------------------------------ */
function Footer({
  clubName = "Avidela Sports",
  logoUrl = "/images/avidela-logo.png",
  instagramUrl = "https://www.instagram.com/avidelasportacademy/",
  address,
  primary = "#0a1a3c",
  accent = "#e91e63",
}: {
  clubName?: string;
  logoUrl?: string;
  instagramUrl?: string;
  address?: string;
  primary?: string;
  accent?: string;
}) {
  return (
    <footer className="mt-16 border-t">
      <div className="mx-auto max-w-6xl px-4 py-8 grid gap-6 md:grid-cols-3">
        <div className="flex items-center gap-3">
          <Image src={logoUrl} alt={`${clubName} Logo`} width={36} height={36} className="rounded-full bg-white border border-gray-200" />
          <span className="font-extrabold" style={{ color: primary }}>{clubName}</span>
        </div>
        <div className="text-sm text-slate-600">
          {address ? <p>{address}</p> : <p>Dirección no disponible.</p>}
          <p className="mt-1">© {new Date().getFullYear()} CanteraPlay</p>
        </div>
        <div className="flex md:justify-end items-center gap-3">
          <a href={instagramUrl} target="_blank" className="rounded-lg px-3 py-1.5 text-white font-semibold" style={{ backgroundColor: accent }}>
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------ Chips & mini componentes ------------------------------ */
const Pill = ({ children }: { children: React.ReactNode }) => (
  <div className="px-6 py-4 bg-[#0a1a3c] text-white rounded-xl text-2xl font-extrabold">{children}</div>
);

const PlanIcon = ({ type }: { type: "matricula" | "partidos" | "combo" }) => {
  // Usa SVGs simples para que se parezca a la card del mock
  if (type === "matricula")
    return (
      <svg className="w-8 h-8 text-[#0a1a3c]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 2h12a2 2 0 0 1 2 2v13l-8 5-8-5V4a2 2 0 0 1 2-2zm1 4v2h10V6H7z" />
      </svg>
    );
  if (type === "partidos")
    return (
      <svg className="w-8 h-8 text-[#0a1a3c]" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="3" className="fill-white" />
      </svg>
    );
  return (
    <svg className="w-8 h-8 text-[#0a1a3c]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 2h10a2 2 0 0 1 2 2v6H5V4a2 2 0 0 1 2-2zM5 12h14v6a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-6z" />
    </svg>
  );
};

/* ------------------------------ Page ------------------------------ */
export default async function Home() {
  const [importantInfo, plans, carouselImages, nextMatch, standings, results] = await Promise.all([
    getImportantInfo(),
    getPlans(),
    getCarouselImages(),
    getNextMatch(),
    getStandings(),
    getResults(),
  ]);

  // Branding (puedes reemplazar desde Sanity)
  const primary = "#0a1a3c";
  const accent = "#e91e63";
  const gradientB = "#00b4e6";
  const instagram = "https://www.instagram.com/avidelasportacademy/";
  const logoUrl = "/images/avidela-logo.png";
  const clubName = "Avidela Sports";

  // Helpers para identificar plan
  const normalize = (s: string) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const planType = (name: string): "matricula" | "partidos" | "combo" => {
    const n = normalize(name);
    if (n.includes("matricula")) return "matricula";
    if (n.includes("entreno") || n.includes("entren")) return "combo";
    return "partidos";
  };

  return (
    <div className="font-['Montserrat',sans-serif] min-h-screen bg-[#f7f8fa]">
      <HeaderSection />

      {/* MOMENTOS + CARDS DE PLANES (layout como el mockup) */}
      <section id="moments" className="mx-auto max-w-6xl px-4 mt-10">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Izquierda: Título + texto + Cards de planes */}
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0b1c3a]">Momentos Inolvidables</h2>
            <p className="text-slate-600 mt-2">Descubre la pasión e alegría de nuestro club en imagenes</p>

            <div className="mt-6 grid sm:grid-cols-3 gap-4">
              {(plans ?? []).slice(0, 3).map((p: any) => {
                const t = planType(p.name || "");
                return (
                  <div key={p._id} className="bg-white rounded-2xl shadow border p-5">
                    <div className="mb-3"><PlanIcon type={t} /></div>
                    <h3 className="font-bold">{p.name}</h3>
                    <div className="mt-2 text-slate-700 text-sm leading-tight">
                      {p.description || (t === "matricula" ? "Anual" : t === "combo" ? "Partidos + Entrenos" : "Participación en partidos")}
                    </div>
                    <div className="mt-3 text-2xl font-extrabold text-[#0b1c3a]">
                      {p.price?.toLocaleString("es-CL", { style: "currency", currency: "CLP", minimumFractionDigits: 0 })}
                      {t !== "matricula" && <span className="text-sm">/mensual</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Derecha: Galería 2x2 como el mockup (usa tus imágenes del Swiper) */}
          <div className="grid grid-cols-2 gap-4">
            {(carouselImages ?? []).slice(0, 4).map((img: any, i: number) => (
              <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden">
                <img src={img.url} alt={img.alt || "Galería"} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRÓXIMO PARTIDO: banner degradado con escudos y VS */}
      <section className="mx-auto max-w-6xl px-4 mt-10">
        <div className="rounded-3xl overflow-hidden" style={{ backgroundImage: `linear-gradient(135deg, ${primary} 0%, ${accent} 50%, ${gradientB} 100%)` }}>
          <div className="grid md:grid-cols-2 items-center">
            <div className="px-6 md:px-10 py-8 text-white">
              <h3 className="text-3xl font-extrabold">Próximo Partido</h3>
              {nextMatch ? (
                <>
                  <div className="mt-3 text-white/90">
                    {new Date(nextMatch.date).toLocaleDateString("es-CL", { day: "2-digit", month: "long", year: "numeric" })} – {nextMatch.time || "15:00"}
                  </div>
                  <div className="text-sm text-white/80">{nextMatch.location || "Cancha Municipal"}</div>
                </>
              ) : (
                <div className="mt-3 text-white/90">A programar</div>
              )}
            </div>

            <div className="px-6 md:px-10 py-6 bg-white/5">
              <div className="flex items-center justify-center gap-6">
                <div className="flex flex-col items-center">
                  <Image src={logoUrl} alt="Avidela" width={90} height={90} className="rounded-full bg-white p-2" />
                </div>
                <span className="text-white text-2xl font-extrabold">VS</span>
                <div className="flex flex-col items-center">
                  {nextMatch?.awayTeam?.logo?.asset?.url ? (
                    <img src={nextMatch.awayTeam.logo.asset.url} alt={nextMatch.awayTeam.name} className="w-[90px] h-[90px] object-contain bg-white rounded-full p-2" />
                  ) : (
                    <div className="w-[90px] h-[90px] rounded-full grid place-items-center bg-white/30 text-white">Rival</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESULTADOS + SPONSORS (como en el mock) */}
      <section id="results" className="mx-auto max-w-6xl px-4 mt-10 grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-3xl font-extrabold text-[#0b1c3a]">Últimos Resultados</h3>
          <div className="mt-4 flex flex-wrap gap-4">
            {(results ?? []).slice(0, 4).map((r: any) => (
              <Pill key={r._id}>
                {r.homeScore} – {r.awayScore}
              </Pill>
            ))}
          </div>
        </div>

        <div id="sponsors">
          <h3 className="text-3xl font-extrabold text-[#0b1c3a]">Nuestros Auspiciadores</h3>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {/* Puedes traer sponsors de Sanity si los tienes; aquí placeholders */}
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl bg-white shadow border px-5 py-6 text-center font-bold text-slate-500">
                SPONSOR
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NOTICIAS (opcional, lo mantengo pero debajo del bloque principal) */}
      <section className="py-10 px-4 max-w-6xl mx-auto">
        <h2 className="text-xl font-bold mb-4 text-blue-900">Lo último en Avidela Sports</h2>
        <div className="flex flex-col gap-6">
          {(importantInfo ?? []).map((info: any) => (
            <div key={info._id} className="bg-white rounded shadow flex flex-col sm:flex-row gap-4 p-4 items-center">
              {info.image?.asset?.url && (
                <img src={info.image.asset.url} alt={info.image.alt || info.title} className="w-32 h-32 object-cover rounded-md border" loading="lazy" />
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

      {/* CONTACTO */}
      <section id="contact" className="scroll-mt-24 py-12 px-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-blue-900">Contacto</h2>
        <form className="bg-white rounded-2xl shadow p-6 flex flex-col gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-blue-900 mb-1">Nombre</label>
            <input id="name" name="name" required className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-blue-900 mb-1">Correo electrónico</label>
            <input type="email" id="email" name="email" required className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-blue-900 mb-1">Mensaje</label>
            <textarea id="message" name="message" rows={4} required className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300" />
          </div>
          <button type="submit" className="px-6 py-2 rounded font-semibold shadow transition text-white" style={{ backgroundColor: primary }}>
            Enviar
          </button>
        </form>
      </section>

      <Footer clubName={clubName} logoUrl={logoUrl} instagramUrl={instagram} />
    </div>
  );
}
