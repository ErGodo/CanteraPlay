export default function HeroWaves() {
  return (
    <svg
      viewBox="0 0 1440 480"
      xmlns="http://www.w3.org/2000/svg"
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        {/* ajusta colores si quieres teñir las ondas */}
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="60%" stopColor="#ffffff" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Onda 1 */}
      <path
        d="
          M0,360
          C240,300 420,260 720,300
          C1020,340 1200,320 1440,260
          L1440,480 L0,480 Z
        "
        fill="url(#g)"
      />

      {/* Onda 2 (más arriba y sutil) */}
      <path
        d="
          M0,300
          C260,240 460,220 720,250
          C980,280 1180,260 1440,210
          L1440,480 L0,480 Z
        "
        fill="#FFFFFF"
        opacity="0.06"
      />
    </svg>
  );
}
