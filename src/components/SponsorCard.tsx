/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";

export default function SponsorCard({ sponsor }: { sponsor: any }) {
  const logoUrl = sponsor?.logo?.url;
  const lqip = sponsor?.logo?.metadata?.lqip;
  const website = sponsor?.website;
  const name = sponsor?.name || "Sponsor";
  const key = sponsor?._id || name;

  return (
    <div key={key} className="rounded-3xl bg-slate-900 shadow-lg border border-slate-800 p-4 sm:p-6 relative overflow-hidden flex items-center justify-center min-h-[130px] sm:min-h-[180px] md:min-h-[220px] h-full w-full group transition-all hover:shadow-blue-900/40 hover:border-blue-700">
      {/* Subtle modern background instead of complex SVG */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 z-0" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-60" />

      {/* Logo Container */}
      <div className="relative z-10 w-28 h-28 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-56 lg:h-56 mx-auto p-2 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
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
