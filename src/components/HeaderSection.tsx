import Hero from "./Hero";
import HeroWaves from "./HeroWaves";
import Navbar from "./Navbar";

const HeaderSection: React.FC = () => {
  return (
    <section className="w-full flex justify-center bg-transparent m-0 p-0 relative">
      <div
        className="w-full max-w-7xl overflow-hidden shadow-lg rounded-b-3xl relative"
        style={{
          background:
            "linear-gradient(135deg, #0a1a3c 0%, #e91e63 45%, #00b4e6 100%)",
        }}
      >
        <HeroWaves />
        <div className="relative z-10">
          <Navbar />
          <Hero />
        </div>
      </div>
    </section>
  );
};

export default HeaderSection;
