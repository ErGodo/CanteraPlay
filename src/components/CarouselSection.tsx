"use client";
import Carousel from "@/components/Carousel";

type SlideImage = { _id?: string; image?: { asset?: { url?: string }; alt?: string }; caption?: string };

export default function CarouselSection({ images }: { images: SlideImage[] }) {
  if (!images || images.length === 0) return null;
  return <Carousel images={images} />;
}
