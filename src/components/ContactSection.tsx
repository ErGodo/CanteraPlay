import { sectionTitle } from "@/lib/styles";
import Image from "next/image";
import ContactForm from "./ContactForm";

type Testimonial = {
  _id: string;
  athleteName?: string;
  position?: string;
  quote?: string;
  photo?: { asset?: { url?: string } } | null;
};

// Server component: receives testimonials fetched on the server and renders them
export default function ContactSection({ testimonials }: { testimonials?: Testimonial[] }) {
  const dummy = testimonials && testimonials.length > 0 ? testimonials : [
    {
      _id: "t1",
      athleteName: "Sofía R.",
      position: "Delantera",
      quote: "Desde que entreno con Avidela mi confianza y rendimiento han mejorado mucho.",
      photo: null,
    },
    {
      _id: "t2",
      athleteName: "Martín P.",
      position: "Mediocampista",
      quote: "Los entrenamientos son intensos y me ayudaron a destacar en los partidos.",
      photo: null,
    },
    {
      _id: "t3",
      athleteName: "Camila V.",
      position: "Defensa",
      quote: "Excelente coaching y ambiente. He mejorado mis habilidades tácticas.",
      photo: null,
    },
  ];

  return (
    <section
      id="contact-section"
      className="py-12"
      style={{ background: 'linear-gradient(180deg, rgba(247,248,250,1) 0%, rgba(247,248,250,1) 100%)' }}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
  <h2 className={`${sectionTitle} mb-6`}>Testimonios y Contacto</h2>

        {/* Wrap both columns in gradient background */}
        <div className="bg-gradient-to-r from-[#e91e63] via-[#0F8DBF] to-[#117DBF] p-6 rounded-xl shadow-md">
      <div className="grid gap-6 md:grid-cols-2 items-stretch">
            {/* LEFT: Single testimonials card */}
            <div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 h-full md:min-h-[420px]">
                <div className="bg-white rounded-lg p-6 border border-gray-100 h-full">
                  <h3 className="text-xl font-bold text-[#0a1a3c] mb-3"></h3>
                  <div className="space-y-4 mt-4">
                    {dummy.map((t) => (
                      <div key={t._id} className="flex gap-4 items-start">
                        <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                          {t.photo?.asset?.url ? (
                            <Image src={t.photo.asset.url} alt={t.athleteName || "Testimonial"} width={64} height={64} className="object-cover w-full h-full" />
                          ) : (
                            <div className="w-full h-full bg-gray-100" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="text-lg font-bold text-[#0a1a3c]">{t.athleteName}</div>
                          <div className="text-sm font-semibold text-[#0a1a3c]">{t.position}</div>
                          <p className="mt-1 text-slate-700 text-sm leading-relaxed">{t.quote}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Contact form in white card */}
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
