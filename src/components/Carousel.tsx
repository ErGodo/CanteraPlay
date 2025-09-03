"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type SlideImage = { _id?: string; image?: { asset?: { url?: string }; alt?: string }; caption?: string };

export default function Carousel({ images }: { images: SlideImage[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback((idx: number) => {
    if (emblaApi) emblaApi.scrollTo(idx);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="w-full flex justify-center bg-white py-8">
      <div className="w-full max-w-3xl">
        <div ref={emblaRef} className="overflow-hidden rounded-lg shadow">
          <div className="flex touch-pan-x" style={{ scrollSnapType: 'x mandatory' }}>
            {images.map((img, idx) => (
              <div
                className="min-w-0 flex-[0_0_100%] flex flex-col items-center snap-center"
                key={img._id || idx}
                style={{ scrollSnapAlign: 'center' }}
              >
                {img.image?.asset?.url ? (
                  <div className="w-full h-64 rounded-t-lg overflow-hidden relative">
                    <Image src={img.image.asset.url} alt={img.image?.alt || img.caption || "Club photo"} fill className="object-cover" sizes="(min-width:1024px) 100vw, 100vw" />
                  </div>
                ) : null}
                {img.caption && (
                  <div className="text-sm text-gray-700 text-center py-2 bg-white w-full rounded-b-lg">
                    {img.caption}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Dots navigation */}
        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full ${selectedIndex === idx ? 'bg-blue-800' : 'bg-gray-300'}`}
              onClick={() => scrollTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
