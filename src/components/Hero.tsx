import Image from "next/image";

export default function Hero() {
  return (
    <div className="w-full">
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
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight drop-shadow-lg">
            Bienvenidos a Avidela Sports
          </h1>
          <p className="text-lg md:text-xl mb-6 font-medium text-white/90">
            Pasión, formación y comunidad
          </p>
          <a href="#contact" className="bg-[#e91e63] text-white px-8 py-3 rounded font-bold shadow hover:bg-[#d81b60] transition text-lg">Inscríbete</a>
        </div>
      </div>
    </div>
  );
}
