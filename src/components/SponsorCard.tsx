import Image from "next/image";

export default function SponsorCard({ sponsor }: { sponsor: any }) {
  const logoUrl = sponsor?.logo?.url;
  const lqip = sponsor?.logo?.metadata?.lqip;
  const website = sponsor?.website;
  const name = sponsor?.name || "Sponsor";
  const key = sponsor?._id || name;

  return (
  <div key={key} className="rounded-xl bg-white shadow-sm border border-gray-200 p-3 sm:p-6 relative overflow-hidden flex items-center justify-center min-h-[130px] sm:min-h-[180px] md:min-h-[220px] h-full w-full" style={{ ['--s-accent1' as any]: sponsor?.colors?.primary ?? '#ff4fa3', ['--s-accent2' as any]: sponsor?.colors?.secondary ?? '#8fc8ff' }}>
      {/* decorative sponsor SVG: corner gradients top-left -> bottom-right (connected flow) */}
      <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none" viewBox="0 0 600 360" preserveAspectRatio="none" aria-hidden>
        <defs>
          {/* Top-left: heavily blue with a faint hint of accent1 at the edge */}
          <linearGradient id={`cornerTL-${key}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--s-accent2)" stopOpacity="1" />
            <stop offset="75%" stopColor="var(--s-accent2)" stopOpacity="0.95" />
            <stop offset="100%" stopColor="var(--s-accent1)" stopOpacity="0.28" />
          </linearGradient>

          {/* Bottom-right: also blue-dominant but inverted flow so they connect */}
          <linearGradient id={`cornerBR-${key}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--s-accent2)" stopOpacity="0.98" />
            <stop offset="60%" stopColor="var(--s-accent2)" stopOpacity="0.85" />
            <stop offset="100%" stopColor="var(--s-accent1)" stopOpacity="0.24" />
          </linearGradient>

          {/* soft mask to fade gradients toward center */}
          <radialGradient id={`fadeMask-${key}`} cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#000" stopOpacity="0.92" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="100%" height="100%" fill="transparent" />

        {/* top-left big soft gradient shape (more visible, more blue) */}
        <g opacity="0.98">
          <ellipse cx="-80" cy="-80" rx="280" ry="240" fill={`url(#cornerTL-${key})`} opacity="0.26" />
        </g>

        {/* bottom-right matching gradient shape (more visible) */}
        <g opacity="0.98">
          <ellipse cx="680" cy="440" rx="300" ry="260" fill={`url(#cornerBR-${key})`} opacity="0.26" />
        </g>

        {/* gentle central fade to blend both corners */}
        <rect width="100%" height="100%" fill={`url(#fadeMask-${key})`} opacity="0.08" />
      </svg>

  <div className="w-28 h-28 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-56 lg:h-56 mx-auto p-1 sm:p-2 flex items-center justify-center overflow-hidden relative">
        {logoUrl ? (
          website ? (
            <a href={website} target="_blank" rel="noopener noreferrer" className="block w-full h-full flex items-center justify-center">
              {lqip ? (
                <Image
                  src={logoUrl}
                  alt={name}
                  fill
                  className="object-contain"
                  placeholder="blur"
                  blurDataURL={lqip}
                  sizes="(min-width:1024px) 224px, (min-width:768px) 176px, 112px"
                  quality={85}
                />
              ) : (
                <Image
                  src={logoUrl}
                  alt={name}
                  fill
                  className="object-contain"
                  sizes="(min-width:1024px) 224px, (min-width:768px) 176px, 112px"
                  quality={85}
                />
              )}
            </a>
          ) : (
            lqip ? (
              <Image
                src={logoUrl}
                alt={name}
                fill
                className="object-contain"
                placeholder="blur"
                blurDataURL={lqip}
                sizes="(min-width:1024px) 224px, (min-width:768px) 176px, 112px"
                quality={85}
              />
            ) : (
              <Image
                src={logoUrl}
                alt={name}
                fill
                className="object-contain"
                sizes="(min-width:1024px) 224px, (min-width:768px) 176px, 112px"
                quality={85}
              />
            )
          )
        ) : (
          <div className="text-sm text-slate-500">{name}</div>
        )}
      </div>
    </div>
  );
}
