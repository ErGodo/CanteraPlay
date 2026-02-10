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
    <section className="w-full relative bg-slate-950" suppressHydrationWarning>
      <div className="absolute top-0 left-0 w-full z-50 pointer-events-none" suppressHydrationWarning>
        {/* Navbar needs pointer-events-auto on its interactive children, 
            but the wrapper is none to let clicks pass through to video if needed (though navbar usually takes full width top bar).
            Actually Navbar takes full width, so pointer-events-auto on wrapper is fine if Navbar handles it.
            Navbar has 'bg-transparent' so clicks on empty space might need to pass? 
            Navbar component is a <nav> flex. Let's just wrap it normally.
         */}
        <div className="pointer-events-auto">
          <Navbar />
        </div>
      </div>
      <Hero videoUrl={videoUrl} smartVideo={smartVideo} featuredPlayer={featuredPlayer} />
    </section>
  );
};

export default HeaderSection;
