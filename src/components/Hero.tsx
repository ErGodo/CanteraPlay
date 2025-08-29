import Image from "next/image";

export default function Hero() {
  return (
    <div className="w-full relative overflow-hidden">
      {/* SVG wave background positioned absolute behind content */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0a1a3c" stopOpacity="1" />
              <stop offset="50%" stopColor="#e91e63" stopOpacity="1" />
              <stop offset="100%" stopColor="#00b4e6" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path fill="url(#g1)" fillOpacity="1" d="M0,96L48,133.3C96,171,192,245,288,261.3C384,277,480,235,576,218.7C672,203,768,213,864,213.3C960,213,1056,203,1152,176C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
        </svg>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-start px-8 py-12 gap-8">
        <div className="flex-1 flex justify-start items-center">
          <Image
            src="/images/player-hero.png"
            alt="Jugador Avidela"
            width={300}
            height={360}
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>
        <div className="flex-1 text-white text-left">
          <h1 className={`text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg`}>Bienvenidos a Avidela Sport</h1>
          <p className="text-lg md:text-xl mb-6 font-medium text-white/90">
            Pasión, formación y comunidad
          </p>
          <a href="#contact" className="bg-[#0a1a3c] text-white px-8 py-3 rounded font-bold shadow hover:bg-[#003366] transition text-lg">Inscríbete</a>
        </div>
      </div>
    </div>
  );
}
