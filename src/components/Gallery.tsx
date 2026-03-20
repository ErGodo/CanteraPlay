/* eslint-disable @typescript-eslint/no-explicit-any */
import SectionHeading from "./SectionHeading";
import SwiperGallery from "./SwiperGallery";

type Props = {
  images: any[];
  showTitle?: boolean;
  heightClass?: string;
  title?: string;
  subtitle?: string;
};

export default function Gallery({ 
  images, 
  showTitle = true, 
  heightClass = "h-[300px] md:h-[450px] lg:h-[600px]",
  title = "Momentos Inolvidables",
  subtitle = "Descubre la pasión y alegría de nuestro club en imágenes"
}: Props) {
  return (
    <div className="w-full flex flex-col items-start mb-12">
      {showTitle && (
        <div className="mb-8 w-full">
          <SectionHeading 
            title={title} 
            subtitle={subtitle} 
          />
        </div>
      )}

      {(!images || images.length === 0) ? (
        <div className="p-16 bg-slate-950/40 rounded-[32px] border border-slate-800/60 text-center w-full">
          <div className="text-4xl opacity-20 mb-4">📸</div>
          <div className="text-slate-500 font-black uppercase tracking-[0.2em] text-xs">
            Galería en preparación
          </div>
        </div>
      ) : (
        <div className="w-full relative">
          <SwiperGallery images={images} heightClass={heightClass} />
          
          {/* Bottom decorative bar */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#e91e63]/40 to-transparent z-20" />
        </div>
      )}
    </div>
  );
}
