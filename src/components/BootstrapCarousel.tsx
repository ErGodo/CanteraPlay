"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";

export default function BootstrapCarousel({ images }: { images: any[] }) {
  if (!images || images.length === 0) return null;
  return (
    <section className="w-full flex justify-center bg-white py-8">
      <div className="w-full max-w-4xl">
        <Carousel>
          {images.map((img, idx) => (
            <Carousel.Item key={img._id || idx}>
              <img
                className="d-block w-100 rounded"
                src={img.image?.asset?.url}
                alt={img.image?.alt || img.caption || "Club photo"}
                style={{ height: 350, objectFit: "cover" }}
                loading="lazy"
              />
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
