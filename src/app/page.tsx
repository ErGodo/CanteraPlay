/* eslint-disable @typescript-eslint/no-explicit-any */
// app/page.tsx
import ContactForm from "@/components/ContactForm";
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
// getStandings was removed from this page to avoid unused variable; use the `Competencia` component separately if needed.
import { sectionTitle } from "@/lib/styles";
import Image from "next/image";

/* ------------------------------ Footer ------------------------------ */
function Footer({
  clubName = "Avidela Sports",
  logoUrl = "/images/avidela-logo.png",
  instagramUrl = "https://www.instagram.com/avidelasportacademy/",
  address,
  primary = "#0a1a3c",
  accent = "#e91e63",
  gradientB = "#00b4e6",
}: {
  clubName?: string;
  logoUrl?: string;
  instagramUrl?: string;
  address?: string;
  primary?: string;
  accent?: string;
  gradientB?: string;
}) {
  const CanteraPlayLogo = () => (
    <Image
      src="/images/canteraplay.png"
      alt="CanteraPlay"
      width={240}
      height={72}
      className="object-contain max-h-20 w-auto"
    />
  );

  const AdDeployLogo = () => (
    <Image
      src="/images/ADD.png"
      alt="AdDeploy"
      width={240}
      height={96}
      className="object-contain max-h-24 w-auto"
    />
  );

  const InstagramIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="white" strokeWidth="1.2" />
      <circle cx="12" cy="12" r="3.2" stroke="white" strokeWidth="1.2" />
      <circle cx="17.4" cy="6.6" r="0.9" fill="white" />
    </svg>
  );

  return (
    <footer
      className="mt-16"
      style={{
        backgroundImage: `linear-gradient(135deg, ${primary} 0%, ${accent} 50%, ${
          gradientB ?? "#00b4e6"
        } 100%)`,
      }}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8 grid gap-8 md:gap-6 md:grid-cols-3 text-white">
        <div className="flex items-center gap-3 min-w-0">
          <Image
            src={logoUrl}
            alt={`${clubName} Logo`}
            width={44}
            height={44}
            className="rounded-full bg-white/10 border border-white/10 p-1 shrink-0"
          />
          <span className="font-extrabold text-base sm:text-lg truncate">{clubName}</span>
        </div>

  <div className="text-sm text-white/90 flex flex-col items-center text-center gap-1">
          {address ? <p className="leading-snug">{address}</p> : null}
          <p className="mt-1">
            © {new Date().getFullYear()} CanteraPlay — Powered By{" "}
            <span className="font-semibold">ADD</span>
          </p>
          <div className="mt-3 flex items-center gap-4 flex-wrap w-full justify-center md:w-auto md:justify-center">
            <CanteraPlayLogo />
            <AdDeployLogo />
          </div>
        </div>

        <div className="flex md:justify-end items-center">
          <a
            href={instagramUrl}
            target="_blank"
            className="flex items-center gap-2 rounded-lg px-3 py-1.5 bg-white/12 font-semibold"
          >
            <InstagramIcon />
            <span className="hidden sm:inline">Instagram</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------ Chips & mini componentes ------------------------------ */
const Pill = ({ children }: { children: React.ReactNode }) => (
  <div className="px-6 py-4 bg-[#0a1a3c] text-white rounded-xl text-2xl font-extrabold">
    {children}
  </div>
);

const PlanIcon = ({ type }: { type: "matricula" | "partidos" | "combo" }) => {
  if (type === "matricula")
    return (
      // Imagen local para matrícula
      <Image
        src="/images/matricula.png"
        alt="Matrícula"
        width={44}
        height={44}
        className="object-contain w-8 h-8 sm:w-10 sm:h-10"
      />
    );
  if (type === "partidos")
    return (
      // Imagen local para partidos
      <Image
  src="/images/partidotraining.png"
  alt="Partido / Entrenamiento"
        width={44}
        height={44}
        className="object-contain w-8 h-8 sm:w-10 sm:h-10"
      />
    );
  if (type === "combo")
    return (
      // Imagen de entrenamiento personalizada (public/images/entrenamiento.png)
      <Image
        src="/images/entrenamiento.png"
        alt="Entrenamiento"
        width={44}
        height={44}
        className="object-contain w-8 h-8 sm:w-10 sm:h-10"
      />
    );
  // fallback: arco / portería (net)
  return (
    <svg className="w-8 h-8 text-[#0a1a3c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="5" width="20" height="12" rx="1" />
      <path d="M2 9h20" />
      <path d="M2 13h20" />
      <path d="M8 5v12" />
      <path d="M16 5v12" />
    </svg>
  );
};

/* ------------------------------ Page ------------------------------ */
export default async function Home() {
  const [importantInfo, plans, carouselImages, nextMatch, results, sponsors] =
    await Promise.all([
      getImportantInfo(),
      getPlans(),
      getCarouselImages(),
      getNextMatch(),
      getResults(),
      getSponsors(),
    ]);

  // Branding
  const primary = "#0a1a3c";
  const accent = "#e91e63";
  const gradientB = "#00b4e6";
  const instagram = "https://www.instagram.com/avidelasportacademy/";
  const logoUrl = "/images/avidela-logo.png";
  const clubName = "Avidela Sport";

  // Posición de los auspiciadores: 'right' = columna derecha, 'center' = centrado debajo de Resultados
  const sponsorsPosition: "right" | "center" = "right";

  // Helpers para identificar plan
  const normalize = (s: string) =>
    s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const planType = (name: string): "matricula" | "partidos" | "combo" => {
    const n = normalize(name);
    if (n.includes("matricula")) return "matricula";
    if (n.includes("entreno") || n.includes("entren")) return "combo";
    return "partidos";
  };

  return (
  <div className="font-['Montserrat',sans-serif] min-h-screen bg-[#f7f8fa] overflow-x-hidden">
      {/* HERO / HEADER + Mobile Menu */}
      <HeaderSection />

      {/* MOMENTOS + CARDS DE PLANES */}
      <section
        id="moments"
        className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 mt-10 scroll-mt-24"
      >
        {/* Ancla extra para #plans sin duplicar secciones */}
        <span id="plans" className="block -mt-24 pt-24" aria-hidden />
  <div className="grid md:grid-cols-2 gap-6 items-stretch">
          {/* Izquierda: Título + texto + Cards de planes */}
          <div className="min-w-0">
            <h2 className={`${sectionTitle}`}>Nuestros Planes</h2>
            <p className="text-slate-600 mt-2">
              Únete a Avidela Sport con estos planes
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-stretch">
              {(plans ?? []).slice(0, 3).map((p: any, i: number) => {
                const t = planType(p.name || "");
                const iconType = i === 2 ? ("partidos" as const) : t;
                return (
                  <div
                      key={p._id}
                      className="min-w-0 bg-white rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 flex flex-col h-full md:min-h-[200px] lg:min-h-[260px]"
                    >
                    <div className="mb-3 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-white">
                      <PlanIcon type={iconType} />
                    </div>
                    <h3 className="font-bold text-sm sm:text-base leading-tight truncate md:whitespace-normal md:truncate-none">
                      {p.name}
                    </h3>
                    <div className="mt-2 text-slate-700 text-xs sm:text-sm leading-snug whitespace-normal break-words">
                      {p.description ||
                        (t === "matricula"
                          ? "Anual"
                          : t === "combo"
                          ? "Partidos + Entrenos"
                          : "Participación en partidos")}
                    </div>
                    <div className="mt-3 md:mt-auto text-lg sm:text-2xl md:text-sm lg:text-2xl font-extrabold md:font-semibold text-[#0b1c3a] leading-tight">
                      {p.price?.toLocaleString("es-CL", {
                        style: "currency",
                        currency: "CLP",
                        minimumFractionDigits: 0,
                      })}
                      {t !== "matricula" && (
                        <span className="text-xs sm:text-sm md:hidden lg:inline">/mes</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Derecha: Galería como carrusel */}
          <div className="min-w-0">
            <Gallery
              images={carouselImages}
              showTitle={true}
              // Altura responsiva: móvil bajita, desktop cómoda
              heightClass="h-44 sm:h-56 md:h-[220px] lg:h-72"
            />
          </div>
        </div>
      </section>

      {/* PRÓXIMO PARTIDO */}
      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 mt-10">
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(135deg, ${primary} 0%, ${accent} 50%, ${gradientB} 100%)`,
          }}
        >
          <div className="grid md:grid-cols-2 items-center">
            <div className="px-6 md:px-10 py-8 text-white min-w-0">
              <h3 className={`${sectionTitle} text-white`}>Próximo Partido</h3>
              {nextMatch ? (
                <>
                  <div className="mt-3 text-white/90">
                    {new Date(nextMatch.date).toLocaleDateString("es-CL", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}{" "}
                    – {nextMatch.time || "15:00"}
                  </div>
                  <div className="text-sm text-white/80">
                    {nextMatch.location || "Sin Información"}
                  </div>
                </>
              ) : (
                <div className="mt-3 text-white/90">A programar</div>
              )}
            </div>

            <div className="px-6 md:px-10 py-6">
              <div className="flex items-center justify-center gap-6">
                <div className="flex flex-col items-center">
                  <Image
                    src={logoUrl}
                    alt="Avidela"
                    width={90}
                    height={90}
                    className="rounded-full bg-white p-2"
                  />
                </div>
                <span className="text-white text-xl sm:text-2xl font-extrabold">VS</span>
                <div className="flex flex-col items-center">
                  {nextMatch?.awayTeam?.logo?.asset?.url ? (
                      <Image
                        src={nextMatch.awayTeam.logo.asset.url}
                        alt={nextMatch.awayTeam.name}
                        width={90}
                        height={90}
                        className="object-contain bg-white rounded-full p-2"
                      />
                    ) : (
                    <div className="w-[72px] h-[72px] sm:w-[90px] sm:h-[90px] rounded-full grid place-items-center bg-white/30 text-white">
                      Rival
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESULTADOS + SPONSORS */}
      <section
        id="results"
        className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 mt-10 scroll-mt-24 overflow-x-hidden"
      >
        {sponsorsPosition === "right" ? (
          // columnas con la MISMA altura y carouseles estirados correctamente
          <div className="grid md:grid-cols-2 gap-6 items-stretch">
            {/* Resultados */}
            <div className="min-w-0 flex flex-col">
              <h3 className={`${sectionTitle}`}>Últimos Resultados</h3>
              <div className="mt-4 overflow-hidden flex-1 h-[300px] sm:h-[320px] md:h-[360px] lg:h-[420px]">
                <ResultsCarousel results={results} />
              </div>
            </div>

            {/* Sponsors */}
            <div id="sponsors" className="min-w-0 flex flex-col scroll-mt-24">
              <h3 className={`${sectionTitle}`}>Nuestros Auspiciadores</h3>
              <div className="mt-4 overflow-hidden flex-1 h-[300px] sm:h-[320px] md:h-[360px] lg:h-[420px]">
                <SponsorCarousel sponsors={sponsors} />
              </div>
            </div>
          </div>
        ) : (
          <div className="min-w-0">
            <h3 className={`${sectionTitle}`}>Últimos Resultados</h3>
            <div className="mt-4 flex flex-wrap gap-2 sm:gap-4">
              {(results ?? []).slice(0, 4).map((r: any) => (
                <Pill key={r._id}>
                  {r.homeScore} – {r.awayScore}
                </Pill>
              ))}
            </div>

            <div id="sponsors" className="mt-6 scroll-mt-24">
              <h3 className={`${sectionTitle} text-center`}>Nuestros Auspiciadores</h3>
              <div className="mt-4 overflow-hidden">
                <SponsorCarousel sponsors={sponsors} />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* NOTICIAS */}
      <Noticias importantInfo={importantInfo} />

      {/* CONTACTO */}
      <section
        id="contact"
        className="scroll-mt-24 py-12 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8"
      >
        <h2 className={`${sectionTitle} mb-6`}>Contacto</h2>
        <ContactForm primary={primary} />
      </section>

      {/* FOOTER */}
      <Footer clubName={clubName} logoUrl={logoUrl} instagramUrl={instagram} gradientB={gradientB} />

      {/* Nota: estilos del Swiper se mueven a globals.css */}
    </div>
  );
}
