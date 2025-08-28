import SwiperGallery from "./SwiperGallery";

export default function Gallery({ images }: { images: any[] }) {
  return (
    <div className="max-w-5xl mx-auto w-full flex flex-col items-center mb-8">
      <h2 className="text-3xl font-extrabold text-blue-900 mb-4 mt-12 tracking-tight text-left w-full">
        Momentos Inolvidables
      </h2>
      <p className="text-gray-600 mb-6 text-lg italic text-left w-full">Descubre la pasión y alegría de nuestro club en imágenes</p>
      <SwiperGallery images={images} />
    </div>
  );
}
