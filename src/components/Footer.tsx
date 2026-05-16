import Image from "next/image";
import { FaInstagram } from "react-icons/fa";
import InstagramLinks from "./InstagramLinks";

export default function Footer({
  clubName = "Avidela Sports",
  logoUrl = "/images/avidela-logo1.png",
  address,
  primary = "#0a1a3c",
  accent = "#e91e63",
  gradientB = "#00b4e6",
}: {
  clubName?: string;
  logoUrl?: string;
  address?: string;
  primary?: string;
  accent?: string;
  gradientB?: string;
}) {
  const CanteraPlayLogo = () => (
    <Image
      src="/images/canteraplay.png"
      alt="CanteraPlay"
      width={240}
      height={72}
      className="object-contain max-h-20 w-auto"
    />
  );

  const AdDeployLogo = () => (
    <a href="https://www.addeploy.cl/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
      <Image
        src="/images/ADD.png"
        alt="AdDeploy"
        width={240}
        height={96}
        className="object-contain max-h-24 w-auto"
      />
    </a>
  );

  return (
    <footer
      className="mt-16"
      style={{
        backgroundImage: `linear-gradient(135deg, ${primary} 0%, ${accent} 50%, ${
          gradientB ?? "#00b4e6"
        } 100%)`,
      }}
    >
      <div className="mx-auto w-full max-w-[95%] px-4 sm:px-6 lg:px-8 py-8 grid gap-8 md:gap-6 md:grid-cols-3 text-white">
        <div className="flex items-center justify-center md:justify-start gap-3 min-w-0">
          <Image
            src={logoUrl}
            alt={`${clubName} Logo`}
            width={56}
            height={56}
            className="rounded-xl bg-white p-0.5 shadow-md shrink-0"
          />
          <span className="font-extrabold text-base sm:text-lg truncate">{clubName}</span>
        </div>
        <div className="text-sm text-white/90 flex flex-col items-center text-center gap-1">
          {address ? <p className="leading-snug">{address}</p> : null}
          <p className="mt-1">
            © {new Date().getUTCFullYear()} CanteraPlay — Powered By{" "}
            <span className="font-semibold">ADD</span>
          </p>
          <div className="mt-3 flex items-center justify-center gap-4 flex-wrap w-full md:w-auto">
            <a href="https://app.canteraplay.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <CanteraPlayLogo />
            </a>
            <AdDeployLogo />

            {/* Mobile Footer Instagram Links */}
            <div className="md:hidden flex gap-3">
              <a
                href="https://www.instagram.com/avidelasport/"
                target="_blank"
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#e91e63] shadow-lg text-white active:scale-95 transition-transform"
                aria-label="Instagram Adultos"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="https://www.instagram.com/avidelasportacademy/"
                target="_blank"
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#00b4e6] shadow-lg text-white active:scale-95 transition-transform"
                aria-label="Instagram Academy"
              >
                <FaInstagram size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="hidden md:flex md:justify-end items-center">
          <InstagramLinks variant="footer" />
        </div>
      </div>
    </footer>
  );
}
