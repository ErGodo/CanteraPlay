import { getHero } from "@/lib/getHero";
import Hero from "./Hero";
// HeroWaves removed per design: closing hero with rounded bottom instead
import Navbar from "./Navbar";

const HeaderSection: React.FC = async () => {
  const hero = await getHero();
  const videoUrl = hero?.promoVideo?.asset?.url;
  const smartVideo = hero?.smartVideo
  const featuredPlayer = hero?.featuredPlayer

  return (
    <section className="w-full flex justify-center bg-transparent m-0 p-0 relative">
      <div className="w-full flex justify-center">
        <div
          className="w-full max-w-7xl overflow-hidden shadow-none relative rounded-b-3xl"
          style={{
            background:
              "linear-gradient(135deg, #0a1a3c 0%, #e91e63 45%, #00b4e6 100%)",
            // keep the gradient confined to the centered container
          }}
        >
          <div className="relative z-10">
            <Navbar />
            <Hero videoUrl={videoUrl} smartVideo={smartVideo} featuredPlayer={featuredPlayer} />
          </div>
          {/* Rounded bottom closes the hero; waves removed */}
        </div>
      </div>
    </section>
  );
};

export default HeaderSection;
