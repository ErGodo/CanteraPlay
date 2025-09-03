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

export default function Gallery({ images, showTitle = true, heightClass = "h-[220px]", titleClass = `${sectionTitle} mb-0 mt-0 text-left w-full`, subtitleClass = sectionSubtitle }: Props) {
  return (
    <div className="w-full flex flex-col items-start mb-8">
      {showTitle && (
        <>
          <h2 className={titleClass}>{/* exact passed class */}Momentos Inolvidables</h2>
          <p className={subtitleClass}>Descubre la pasión y alegría de nuestro club en imágenes</p>
        </>
      )}

      {(!images || images.length === 0) ? (
        <div className="p-6 bg-white rounded-xl border text-center text-slate-600 w-full">No hay imágenes en la galería.</div>
      ) : (
        <div className="w-full">
          <SwiperGallery images={images} heightClass={heightClass} />
        </div>
      )}
    </div>
  );
}
