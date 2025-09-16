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
      // @ts-ignore
      img = img.focalPoint(hotspot.x, hotspot.y);
    } catch (e) {
      // Append fp-x/fp-y as fallback
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
    { _id: "t1", athleteName: "Sofía R.",  position: "Delantera",      quote: "Desde que entreno con Avidela mi confianza y rendimiento han mejorado mucho.", photo: null },
    { _id: "t2", athleteName: "Martín P.", position: "Mediocampista",  quote: "Los entrenamientos son intensos y me ayudaron a destacar en los partidos.",     photo: null },
    { _id: "t3", athleteName: "Camila V.", position: "Defensa",        quote: "Excelente coaching y ambiente. He mejorado mis habilidades tácticas.",        photo: null },
  ];

  return (
    <section
      id="contact-section"
      className="py-12"
      style={{ background: "linear-gradient(180deg, rgba(247,248,250,1) 0%, rgba(247,248,250,1) 100%)" }}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className={`${sectionTitle} mb-6`}>Testimonios y Contacto</h2>

        {/* Wrap both columns in gradient background */}
        <div className="bg-gradient-to-r from-[#e91e63] via-[#0F8DBF] to-[#117DBF] p-6 rounded-xl shadow-md">
          <div className="grid gap-6 md:grid-cols-2 items-stretch">
            {/* LEFT: testimonials */}
            <div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 h-full md:min-h-[420px]">
                <div className="bg-white rounded-lg p-6 border border-gray-100 h-full">
                  <div className="space-y-5">
                    {dummy.map((t) => {
                      const photo = t.photo ?? undefined;
                      const size = 64; // avatar size in px
                      const hotspot = photo?.hotspot ?? null;
                      const avatarUrl = photo ? urlForImage(photo as unknown as SanityImageSource, size * 2, size * 2, hotspot as any) : null;
                      const alt = photo?.alt || t.athleteName || 'Avatar';

                      const initials = (t.athleteName ?? 'A')
                        .split(' ')
                        .filter(Boolean)
                        .map((p) => p[0])
                        .join('')
                        .slice(0, 2)
                        .toUpperCase();

                      return (
                        <div key={t._id} className="flex gap-4 items-start">
                          <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center">
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
                              <span className="text-sm font-semibold text-slate-600">{initials}</span>
                            )}
                          </div>

                          <div className="flex-1">
                            <div className="text-lg font-bold text-[#0a1a3c]">{t.athleteName}</div>
                            {t.position && <div className="text-sm font-semibold text-[#0a1a3c]">{t.position}</div>}
                            <p className="mt-1 text-slate-700 text-sm leading-relaxed">{t.quote}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Contact form */}
            <div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 h-full md:min-h-[420px]">
                <ContactForm primary="#0a1a3c" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
