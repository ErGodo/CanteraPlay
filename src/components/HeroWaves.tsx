export default function HeroWaves() {
  return (
    <svg
      viewBox="0 0 1440 520"
      xmlns="http://www.w3.org/2000/svg"
      className="pointer-events-none w-full h-56 md:h-72 lg:h-96 -translate-y-6 md:-translate-y-8 lg:-translate-y-10"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="60%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
        </linearGradient>
      </defs>

      {/* Fondo blanco sólido que cubre completamente el degradado bajo la onda */}
      <rect x="0" y="360" width="1440" height="160" fill="#FFFFFF" />

      {/* Onda principal blanca que crea la división */}
      <path
        d="M0,340
           C180,420 360,300 600,360
           C840,420 1020,300 1260,360
           C1320,380 1380,400 1440,410
           L1440,520 L0,520 Z"
        fill="url(#g)"
      />

      {/* Segunda capa para volumen y suavizado del borde derecho */}
      <path
        d="M0,360
           C220,300 420,380 660,350
           C900,320 1100,380 1360,350
           C1388,344 1416,340 1440,338
           L1440,520 L0,520 Z"
        fill="#FFFFFF"
        opacity="0.98"
      />
    </svg>
  );
}
