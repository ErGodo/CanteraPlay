
import Image from "next/image";
import { FaInstagram } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav
      className="w-full flex items-center px-8 py-4"
      style={{
        background: "transparent",
      }}
    >
      <div className="flex items-center gap-3">
        <Image
          src="/images/avidela-logo.png"
          alt="Avidela Sport Logo"
          width={48}
          height={48}
          className="rounded-full bg-white border border-gray-200"
        />
        <span className="font-extrabold text-2xl text-white tracking-tight">
          Avidela Sport
        </span>
      </div>
      <div className="flex-1" />
      <ul className="flex gap-6 font-semibold drop-shadow-md items-center">
        <li>
          <a href="#plans" className="hover:text-[#ffd6e6] text-white transition-colors">Planes</a>
        </li>
        <li>
          <a href="#info" className="hover:text-[#ffd6e6] text-white transition-colors">Noticias</a>
        </li>
        <li>
          <a href="#results" className="hover:text-[#ffd6e6] text-white transition-colors">Resultados</a>
        </li>
        <li>
          <a href="#contact" className="hover:text-[#ffd6e6] text-white transition-colors">Contacto</a>
        </li>
        <li className="flex items-center h-full ml-2">
          <a href="https://www.instagram.com/avidelasportacademy/" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-pink-400 transition-colors" style={{height: '100%'}}>
            <FaInstagram size={24} color="#0a1a3c" style={{display: 'block'}} />
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
