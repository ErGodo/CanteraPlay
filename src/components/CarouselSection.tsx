"use client";
import Carousel from "@/components/Carousel";

export default function CarouselSection({ images }: { images: any[] }) {
  if (!images || images.length === 0) return null;
  return <Carousel images={images} />;
}
