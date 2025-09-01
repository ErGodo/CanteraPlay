// app/page.tsx
import Gallery from "@/components/Gallery";
import HeaderSection from "@/components/HeaderSection";
import Noticias from "@/components/Noticias";
import ResultsCarousel from "@/components/ResultsCarousel";
import SponsorCarousel from "@/components/SponsorCarousel";
import { getCarouselImages } from "@/lib/getCarouselImages";
import { getImportantInfo } from "@/lib/getImportantInfo";
import { getNextMatch } from "@/lib/getNextMatch";
import { getPlans } from "@/lib/getPlans";
import { getResults } from "@/lib/getResults";
import { getSponsors } from "@/lib/getSponsors";
import { getStandings } from "@/lib/getStandings";
import { sectionTitle } from "@/lib/styles";
import Image from "next/image";
import Link from "next/link";

/* ------------------------------ Navbar ------------------------------ */
function Navbar({
  clubName = "Avidela Sport",
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

          <ul className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:opacity-80">{l.label}</a>
              </li>
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
  const [importantInfo, plans, carouselImages, nextMatch, standings, results, sponsors] = await Promise.all([
    getImportantInfo(),
    getPlans(),
    getCarouselImages(),
    getNextMatch(),
    getStandings(),
    getResults(),
    getSponsors(),
  ]);

  // Branding (puedes reemplazar desde Sanity)
  const primary = "#0a1a3c";
  const accent = "#e91e63";
  const gradientB = "#00b4e6";
  const instagram = "https://www.instagram.com/avidelasportacademy/";
  const logoUrl = "/images/avidela-logo.png";
  const clubName = "Avidela Sport";
  // Posición de los auspiciadores: 'right' = columna derecha, 'center' = centrado debajo de Resultados
  const sponsorsPosition: 'right' | 'center' = 'right';

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
            <h2 className={`${sectionTitle}`}>Nuestros Planes</h2>
            <p className="text-slate-600 mt-2">Descubre la pasión e alegría de nuestro club en imagenes</p>

            <div className="mt-6 grid sm:grid-cols-3 gap-4 items-stretch">
              {(plans ?? []).slice(0, 3).map((p: any) => {
                const t = planType(p.name || "");
                return (
                  <div key={p._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col h-full">
                    <div className="mb-3 flex items-center justify-center w-12 h-12 rounded-md bg-white">
                      <PlanIcon type={t} />
                    </div>
                    <h3 className="font-bold">{p.name}</h3>
                    <div className="mt-2 text-slate-700 text-sm leading-tight">
                      {p.description || (t === "matricula" ? "Anual" : t === "combo" ? "Partidos + Entrenos" : "Participación en partidos")}
                    </div>
                    <div className="mt-auto text-2xl font-extrabold text-[#0b1c3a]">
                      {p.price?.toLocaleString("es-CL", { style: "currency", currency: "CLP", minimumFractionDigits: 0 })}
                      {t !== "matricula" && <span className="text-sm">/mes</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Derecha: Galería como carrusel, alineada con las cards de planes */}
          <div>
            <Gallery
              images={carouselImages}
              showTitle={true}
              heightClass="h-[220px]"
            />
          </div>
        </div>
      </section>

      {/* PRÓXIMO PARTIDO: banner degradado con escudos y VS */}
      <section className="mx-auto max-w-6xl px-4 mt-10">
        <div className="rounded-3xl overflow-hidden" style={{ backgroundImage: `linear-gradient(135deg, ${primary} 0%, ${accent} 50%, ${gradientB} 100%)` }}>
          <div className="grid md:grid-cols-2 items-center">
            <div className="px-6 md:px-10 py-8 text-white">
              <h3 className={`${sectionTitle} text-white`}>Próximo Partido</h3>
              {nextMatch ? (
                <>
                  <div className="mt-3 text-white/90">
                    {new Date(nextMatch.date).toLocaleDateString("es-CL", { day: "2-digit", month: "long", year: "numeric" })} – {nextMatch.time || "15:00"}
                  </div>
                  <div className="text-sm text-white/80">{nextMatch.location || "Sin Información"}</div>
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

      {/* RESULTADOS + SPONSORS (posicionables) */}
      <section id="results" className="mx-auto max-w-6xl px-4 mt-10">
        {sponsorsPosition === 'right' ? (
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className={`${sectionTitle}`}>Últimos Resultados</h3>
              <div className="mt-4">
                <ResultsCarousel results={results} />
              </div>
            </div>

            <div id="sponsors">
              <h3 className={`${sectionTitle}`}>Nuestros Auspiciadores</h3>
              <div className="mt-4">
                <SponsorCarousel sponsors={sponsors} />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h3 className={`${sectionTitle}`}>Últimos Resultados</h3>
            <div className="mt-4 flex flex-wrap gap-4">
              {(results ?? []).slice(0, 4).map((r: any) => (
                <Pill key={r._id}>
                  {r.homeScore} – {r.awayScore}
                </Pill>
              ))}
            </div>

            <div id="sponsors" className="mt-6">
              <h3 className={`${sectionTitle} text-center`}>Nuestros Auspiciadores</h3>
              <div className="mt-4">
                <SponsorCarousel sponsors={sponsors} />
              </div>
            </div>
          </div>
        )}
      </section>

  {/* NOTICIAS (componente) */}
  <Noticias importantInfo={importantInfo} />

      {/* CONTACTO */}
      <section id="contact" className="scroll-mt-24 py-12 px-4 max-w-6xl mx-auto">
        <h2 className={`${sectionTitle} mb-6`}>Contacto</h2>
        <form className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-[#0a1a3c] mb-1">Nombre</label>
            <input id="name" name="name" required className="w-full border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0a1a3c] focus:ring-opacity-20" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-[#0a1a3c] mb-1">Correo electrónico</label>
            <input type="email" id="email" name="email" required className="w-full border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0a1a3c] focus:ring-opacity-20" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-[#0a1a3c] mb-1">Mensaje</label>
            <textarea id="message" name="message" rows={4} required className="w-full border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0a1a3c] focus:ring-opacity-20" />
          </div>
          <button type="submit" className="px-6 py-3 rounded-md font-semibold shadow transition text-white w-full hover:opacity-95" style={{ backgroundColor: primary }}>
            Enviar
          </button>
        </form>
      </section>

      <Footer clubName={clubName} logoUrl={logoUrl} instagramUrl={instagram} />
    </div>
  );
}
