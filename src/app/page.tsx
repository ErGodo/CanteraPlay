/* eslint-disable @typescript-eslint/no-explicit-any */
// app/page.tsx
import ContactSection from "@/components/ContactSection";
import Gallery from "@/components/Gallery";
import HeaderSection from "@/components/HeaderSection";
import Noticias from "@/components/Noticias";
import PlayerStats from "@/components/PlayerStats";
import ResultsCarousel from "@/components/ResultsCarousel";
import SponsorCarousel from "@/components/SponsorCarousel";
import { getCarouselImages } from "@/lib/getCarouselImages";
import { getImportantInfo } from "@/lib/getImportantInfo";
import { getPlans } from "@/lib/getPlans";
import { getPlayerStats } from "@/lib/getPlayerStats";
import { getResults } from "@/lib/getResults";
import { getSponsors } from "@/lib/getSponsors";
import { getTestimonials } from "@/lib/getTestimonials";
// getStandings was removed from this page to avoid unused variable; use the `Competencia` component separately if needed.
import NextMatchCarousel from "@/components/NextMatchCarousel";
import PlansCarousel from "@/components/PlansCarousel";
import { getUpcomingMatches } from "@/lib/getUpcomingMatches";
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
        backgroundImage: `linear-gradient(135deg, ${primary} 0%, ${accent} 50%, ${gradientB ?? "#00b4e6"
          } 100%)`,
      }}
    >
      <div className="mx-auto w-full max-w-[95%] px-4 sm:px-6 lg:px-8 py-8 grid gap-8 md:gap-6 md:grid-cols-3 text-white">
        <div className="flex items-center justify-center md:justify-start gap-3 min-w-0">
          <Image
            src={logoUrl}
            alt={`${clubName} Logo`}
            width={56}
            height={56}
            className="rounded-full bg-white p-0.5 shadow-md shrink-0"
          />
          <span className="font-extrabold text-base sm:text-lg truncate">{clubName}</span>
        </div>
        <div className="text-sm text-white/90 flex flex-col items-center text-center gap-1">
          {address ? <p className="leading-snug">{address}</p> : null}
          <p className="mt-1">
            © {new Date().getUTCFullYear()} CanteraPlay — Powered By{" "}
            <span className="font-semibold">ADD</span>
          </p>
          <div className="mt-3 flex items-center justify-center gap-4 flex-wrap w-full md:w-auto">
            <a href="https://canteraplay-dash-605024846890.us-central1.run.app" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <CanteraPlayLogo />
            </a>
            <AdDeployLogo />

            {/* Mobile Only Instagram Icon */}
            <a
              href={instagramUrl}
              target="_blank"
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-pink-600 shadow-lg text-white hover:bg-pink-700 transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
          </div>
        </div>

        <div className="hidden md:flex md:justify-end items-center">
          <a
            href={instagramUrl}
            target="_blank"
            className="flex items-center gap-2 rounded-lg px-3 py-1.5 bg-white/12 font-semibold hover:bg-white/20 transition-colors"
          >
            <InstagramIcon />
            <span>Instagram</span>
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
  const [importantInfo, plans, carouselImages, upcomingMatches, results, sponsors] =
    await Promise.all([
      getImportantInfo(),
      getPlans(),
      getCarouselImages(),
      getUpcomingMatches(),
      getResults(),
      getSponsors(),
    ]);

  // Fetch testimonials from Sanity (server-side)
  const testimonials = await getTestimonials();
  // Fetch player stats from Sanity (server-side)
  const playerStats = await getPlayerStats();

  // Branding
  const primary = "#0a1a3c";
  const accent = "#e91e63";
  const gradientB = "#00b4e6";
  const instagram = "https://www.instagram.com/avidelasportacademy/";
  const logoUrl = "/images/avidela-logo.png";
  const clubName = "Avidela Sport";

  // Posición de los auspiciadores: 'right' = columna derecha, 'center' = centrado debajo de Resultados
  const sponsorsPosition: "right" | "center" = "right";

  return (
    <div className="font-sans min-h-screen bg-slate-950 text-slate-200 overflow-x-hidden" suppressHydrationWarning>
      {/* HERO / HEADER + Mobile Menu */}
      <HeaderSection />

      {/* MOMENTOS + CARDS DE PLANES */}
      <section
        id="moments"
        className="mx-auto w-full max-w-[95%] px-4 sm:px-6 lg:px-8 mt-10 scroll-mt-24"
      >
        {/* Ancla extra para #plans sin duplicar secciones */}
        <span id="plans" className="block -mt-24 pt-24" aria-hidden />
        {/* Stack vertically for better spacing on all screens */}
        <div className="flex flex-col gap-12">
          {/* Top: Plans Section */}
          <div className="w-full">
            <h2 className={`${sectionTitle}`}>Nuestros Planes</h2>
            <p className="text-slate-400 mt-2 mb-6">
              Únete a Avidela Sport con estos planes
            </p>

            <PlansCarousel plans={plans} />
          </div>

          {/* Bottom: Moments Gallery */}
          < div className="w-full" >
            <h2 className={`${sectionTitle} mb-6`}>Momentos Inolvidables</h2>
            <Gallery
              images={carouselImages}
              showTitle={false} // Title is handled outside
              heightClass="h-64 sm:h-80 md:h-[400px] lg:h-[500px]" // Taller gallery since it is full width
            />
          </div >
        </div >
      </section >

      {/* PRÓXIMO PARTIDO */}
      < PlayerStats stats={playerStats} key="stats-v2" />
      <section className="mx-auto w-full max-w-[95%] px-4 sm:px-6 lg:px-8 mt-10">
        <div className="rounded-3xl p-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 shadow-2xl relative z-10">
          <div
            className="rounded-[22px] overflow-hidden w-full h-full"
            style={{
              backgroundImage: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
            }}
          >
            <NextMatchCarousel matches={upcomingMatches} />
          </div>
        </div>
      </section>

      {/* RESULTADOS + SPONSORS */}
      <section
        id="results"
        className="mx-auto w-full max-w-[95%] px-4 sm:px-6 lg:px-8 mt-10 scroll-mt-24 overflow-x-hidden"
      >
        {sponsorsPosition === "right" ? (
          // columnas con la MISMA altura y carouseles estirados correctamente
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
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

      <ContactSection testimonials={testimonials} />

      {/* FOOTER */}
      <Footer clubName={clubName} logoUrl={logoUrl} instagramUrl={instagram} gradientB={gradientB} />

      {/* Nota: estilos del Swiper se mueven a globals.css */}
    </div >
  );
}
