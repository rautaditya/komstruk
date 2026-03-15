import Header from "../componants/Header";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* ── Google Font (Syne) ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap');

        /* Fade-up animation for hero text */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-600 { animation-delay: 0.6s; }
      `}</style>

      {/* ── Sticky Header ── */}
      <Header />

      {/* ── Video Background ── */}
      <div className="absolute inset-0 z-0">
       {/* <video
  className="w-full h-full object-cover"
  autoPlay
  muted
  loop
  playsInline
  poster="https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1920&q=80"
>
  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
</video> */}
<img src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1920&q=80" className="w-full h-full object-cover" alt="no working"></img>
        {/* Dark overlay so text is readable */}
        <div className="absolute inset-0 bg-black/45" />
      </div>

      {/* ── Hero Content ── */}
      <section className="relative z-10 flex flex-col justify-end min-h-screen pb-24 md:pb-32 px-8 md:px-16 lg:px-24">
        {/* Text block – bottom-left, just like Northvolt */}
        <div className="max-w-xl">
          <p
            className="text-white text-lg md:text-xl leading-relaxed mb-8 animate-fade-up delay-200"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            The world is turning its back on fossil fuels. With the change
            comes new opportunities and new demands for industry.
            Together, let's build a cleaner world.
          </p>

          <a
            href="#why"
            className="
              inline-block px-8 py-4 text-white font-semibold text-base
              bg-emerald-500 hover:bg-emerald-400
              transition-colors duration-300
              animate-fade-up delay-400
            "
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Join us
          </a>
        </div>
      </section>

      {/* ── (Optional) Scroll indicator ── */}
      <div className="absolute bottom-8 right-8 z-10 flex flex-col items-center gap-2 opacity-60">
        <span
          className="text-white text-xs tracking-widest uppercase"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Scroll
        </span>
        <span className="block w-px h-10 bg-white/60 animate-pulse" />
      </div>
    </main>
  );
}