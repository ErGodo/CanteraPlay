import { sectionTitle } from "@/lib/styles";
import { sanityClient } from '@/sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

import Image from "next/image";
import ContactForm from "./ContactForm";

const builder = imageUrlBuilder(sanityClient);

function urlForImage(source: SanityImageSource | undefined, width = 128, height = 128, hotspot?: { x?: number; y?: number } | null) {
  if (!source) return null;
  let img = builder.image(source).width(width).height(height).fit('crop').auto('format');
  if (hotspot && typeof hotspot.x === 'number' && typeof hotspot.y === 'number') {
    // some versions of the builder expose focalPoint/focalCrop; fall back to adding query params
    try {
      img = img.focalPoint(hotspot.x, hotspot.y);
    } catch {
      // Append fp-x/fp-y as fallback for older builders
      return img.url() + `?fp-x=${hotspot.x}&fp-y=${hotspot.y}`;
    }
  }
  return img.url();
}

type Testimonial = {
  _id: string;
  athleteName?: string;
  position?: string;
  quote?: string;
  photo?: {
    asset?: { url?: string; metadata?: { lqip?: string } };
    alt?: string;
    hotspot?: { x?: number; y?: number } | null;
  } | null;
};

export default function ContactSection({ testimonials }: { testimonials?: Testimonial[] }) {
  const dummy = testimonials && testimonials.length > 0 ? testimonials : [
    { _id: "t1", athleteName: "Sofía R.", position: "Delantera", quote: "Desde que entreno con Avidela mi confianza y rendimiento han mejorado mucho.", photo: null },
    { _id: "t2", athleteName: "Martín P.", position: "Mediocampista", quote: "Los entrenamientos son intensos y me ayudaron a destacar en los partidos.", photo: null },
    { _id: "t3", athleteName: "Camila V.", position: "Defensa", quote: "Excelente coaching y ambiente. He mejorado mis habilidades tácticas.", photo: null },
  ];

  return (
    <section
      id="contact-section"
      className="py-12"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className={`${sectionTitle} mb-6`}>Testimonios y Contacto</h2>

        {/* Wrap both columns in gradient background */}
        <div className="bg-gradient-to-r from-[#e91e63] via-[#0F8DBF] to-[#117DBF] p-1 rounded-3xl shadow-xl shadow-blue-900/20">
          <div className="bg-slate-950/90 backdrop-blur-sm rounded-[20px] p-6 lg:p-8">
            <div className="grid gap-8 md:grid-cols-2 items-stretch">
              {/* LEFT: testimonials */}
              <div>
                <div className="bg-slate-900 rounded-3xl shadow-lg border border-slate-800 p-6 h-full md:min-h-[420px] transition-shadow hover:shadow-blue-900/10">
                  {/* We remove the double nesting for cleaner look */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <span className="text-2xl">💬</span> Lo que dicen de nosotros
                    </h3>
                    {dummy.map((t) => {
                      const photo = t.photo ?? undefined;
                      const size = 64; // avatar size in px
                      const hotspot = (photo?.hotspot ?? null) as { x?: number; y?: number } | null;
                      const avatarUrl = photo ? urlForImage(photo as unknown as SanityImageSource, size * 2, size * 2, hotspot) : null;
                      const alt = photo?.alt || t.athleteName || 'Avatar';

                      const initials = (t.athleteName ?? 'A')
                        .split(' ')
                        .filter(Boolean)
                        .map((p) => p[0])
                        .join('')
                        .slice(0, 2)
                        .toUpperCase();

                      return (
                        <div key={t._id} className="flex gap-4 items-start group">
                          <div className="relative w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 bg-slate-800 flex items-center justify-center border border-slate-700 shadow-sm group-hover:scale-105 transition-transform">
                            {avatarUrl ? (
                              <Image
                                src={avatarUrl}
                                alt={alt}
                                fill
                                sizes="64px"
                                className="object-cover"
                                placeholder={photo?.asset?.metadata?.lqip ? 'blur' : 'empty'}
                                blurDataURL={photo?.asset?.metadata?.lqip}
                              />
                            ) : (
                              <span className="text-sm font-black text-blue-400">{initials}</span>
                            )}
                          </div>

                          <div className="flex-1">
                            <div className="text-base font-extrabold text-white">{t.athleteName}</div>
                            {t.position && <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">{t.position}</div>}
                            <p className="text-slate-400 text-sm leading-relaxed italic">"{t.quote}"</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* RIGHT: Contact form */}
              <div>
                <div className="bg-slate-900 rounded-3xl p-6 shadow-inner border border-slate-800 h-full md:min-h-[420px]">
                  <ContactForm primary="#e91e63" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
