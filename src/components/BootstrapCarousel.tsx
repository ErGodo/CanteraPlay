"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import Carousel from "react-bootstrap/Carousel";

type CarouselImage = { _id?: string; image?: { asset?: { url?: string }; alt?: string }; caption?: string };

export default function BootstrapCarousel({ images }: { images: CarouselImage[] }) {
  if (!images || images.length === 0) return null;
  return (
    <section className="w-full flex justify-center bg-white py-8">
      <div className="w-full max-w-4xl">
        <Carousel>
          {images.map((img, idx) => (
            <Carousel.Item key={img._id || idx}>
              {img.image?.asset?.url ? (
                <div style={{ height: 350, overflow: 'hidden' }} className="rounded">
                  <Image src={img.image.asset.url} alt={img.image?.alt || img.caption || "Club photo"} fill className="object-cover" sizes="(min-width:1024px) 100vw, 100vw" />
                </div>
              ) : null}
              {img.caption && (
                <Carousel.Caption>
                  <p className="bg-black/60 rounded px-2 inline-block text-white text-sm">
                    {img.caption}
                  </p>
                </Carousel.Caption>
              )}
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
