import Hero from "./Hero";
import Navbar from "./Navbar";

export default function HeaderSection() {
  return (
    <section className="w-full flex justify-center bg-transparent m-0 p-0">
      <div
        className="w-full max-w-7xl overflow-hidden shadow-lg rounded-b-3xl"
        style={{
          background:
            "linear-gradient(135deg, #0a1a3c 0%, #e91e63 45%, #00b4e6 100%)",
        }}
      >
        <Navbar />
        <Hero />
      </div>
    </section>
  );
}
