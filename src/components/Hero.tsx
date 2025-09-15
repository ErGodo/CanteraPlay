import Image from "next/image";

export default function Hero({ videoUrl }: { videoUrl?: string }) {
  return (
    <div className="w-full relative overflow-hidden min-h-[76vh] flex items-start">
      <div className="w-full flex flex-col md:flex-row items-start justify-center min-h-[72vh] px-6 md:px-12 lg:px-16 pt-16 md:pt-20 lg:pt-24 pb-8 gap-8">
  <div className="w-full md:w-1/3 flex justify-center md:justify-start items-start md:-translate-y-6 lg:-translate-y-8">
          <Image
            src="/images/player-hero.png"
            alt="Jugador Avidela"
            width={340}
            height={420}
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>

        <div className="w-full md:w-2/3 flex flex-col justify-start md:-translate-y-6">
          <div className="text-white text-left px-4 mb-6">
            <h1 className={`text-2xl md:text-3xl lg:text-4xl font-extrabold mb-3 drop-shadow-lg`}>Bienvenidos a Avidela Sport</h1>
              <p className="text-xs md:text-sm lg:text-base mb-4 font-medium text-white/90">
              Pasión, formación y comunidad
            </p>
              <a href="#contact" className="bg-[#0a1a3c] text-white px-6 py-2 rounded font-bold shadow hover:bg-[#003366] transition text-sm">Inscríbete</a>
          </div>

          <div className="w-full flex justify-center md:justify-end">
            <div className="w-full max-w-md md:max-w-2xl lg:max-w-[900px] h-56 md:h-80 lg:h-96 rounded overflow-hidden shadow-xl self-end md:-translate-y-6 lg:-translate-y-8">
              <video
                src={videoUrl ?? "/videos/avidela-promo.mp4"}
                poster="/images/hero-poster.jpg"
                controls
                muted
                loop
                className="w-full h-full object-cover"
              >
                Tu navegador no soporta video.
              </video>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
