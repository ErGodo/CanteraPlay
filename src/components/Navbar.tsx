
import Image from "next/image";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="w-full">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center" style={{ background: 'transparent' }}>
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/avidela-logo.png"
            alt="Avidela Sport Logo"
            width={48}
            height={48}
            className="rounded-full bg-white border border-gray-200"
          />
          <span className="font-extrabold text-2xl text-white tracking-tight">Avidela Sport</span>
        </Link>

        <div className="flex-1" />

        <ul className="hidden md:flex items-center gap-6 text-white font-semibold">
          <li>
            <a href="#plans" className="transition hover:opacity-85">Planes</a>
          </li>
          <li>
            <a href="#info" className="transition hover:opacity-85">Noticias</a>
          </li>
          <li>
            <a href="#results" className="transition hover:opacity-85">Resultados</a>
          </li>
          <li>
            <a href="#contact" className="transition hover:opacity-85">Contacto</a>
          </li>
        </ul>

        <div className="ml-4">
          <a
            href="https://www.instagram.com/avidelasportacademy/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-white font-semibold"
            style={{ backgroundColor: '#e91e63' }}
            aria-label="Instagram"
          >
            <FaInstagram size={18} color="#ffffff" />
            <span className="sr-only">Instagram</span>
          </a>

          {/* Mobile menu placeholder */}
          <div className="md:hidden">
            <a href="#contact" className="inline-flex items-center px-3 py-1 rounded bg-white/10 text-white text-sm">Contacto</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
