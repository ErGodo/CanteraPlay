/* eslint-disable @typescript-eslint/no-explicit-any */

import { sectionSubtitle, sectionTitle } from "@/lib/styles";
import SwiperGallery from "./SwiperGallery";

type Props = {
  images: any[];
  showTitle?: boolean;
  heightClass?: string;
  titleClass?: string;
  subtitleClass?: string;
};

export default function Gallery({ images, showTitle = true, heightClass = "h-[300px] md:h-[450px] lg:h-[600px]", titleClass = `${sectionTitle} mb-0 mt-0 text-left w-full`, subtitleClass = sectionSubtitle }: Props) {
  return (
    <div className="w-full flex flex-col items-start mb-12">
      {showTitle && (
        <div className="mb-6">
          <h2 className={titleClass}>Momentos Inolvidables</h2>
          <p className={subtitleClass}>Descubre la pasión y alegría de nuestro club en imágenes</p>
        </div>
      )}

      {(!images || images.length === 0) ? (
        <div className="p-12 bg-slate-900/50 rounded-3xl border border-slate-800 text-center text-slate-400 w-full">
          No hay imágenes en la galería.
        </div>
      ) : (
        <div className="w-full relative">
          <SwiperGallery images={images} heightClass={heightClass} />
        </div>
      )}
    </div>
  );
}
