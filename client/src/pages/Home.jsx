import { useEffect, useRef, useState } from "react";

/* ════════════════════════════════════════
   INTERSECTION OBSERVER HOOK
════════════════════════════════════════ */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}
const applications = [
  {
    title: "Corrosion Protection",
    desc: "This is an extremely powerful corrosion protection principle. It was invented by Ormecon (Germany).",
    img: "https://images.unsplash.com/photo-1509395176047-4a66953fd231",
  },
  {
    title: "EMI Shielding",
    desc: "Using our highly conductive masterbatch, products can be developed for medium requirements in EMI shielding.",
    img: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0",
  },
  {
    title: "Permanent Antistatic",
    desc: "Using our highly conductive masterbatch, products can be developed for various antistatic applications.",
    img: "https://images.unsplash.com/photo-1581090700227-1e8a7c2f63f0",
  },
  {
    title: "Electroluminescence",
    desc: "With our highly conductive masterbatch, products can be developed for flexible and easy display.",
    img: "https://images.unsplash.com/photo-1611175694983-36e1d8c3c8e3",
  },
  {
    title: "Solid Electrolyte",
    desc: "Using specially prepared dispersed polyaniline, high-performing solid state capacitor solutions can be developed.",
    img: "https://images.unsplash.com/photo-1581091215367-59ab6b5e88ad",
  },
];
/* ════════════════════════════════════════
   ANIMATED SECTION WRAPPER
════════════════════════════════════════ */
function Reveal({ children, delay = 0, direction = "up", className = "" }) {
  const [ref, inView] = useInView();
  const transforms = {
    up: "translateY(60px)",
    left: "translateX(-60px)",
    right: "translateX(60px)",
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : transforms[direction],
        transition: `opacity 0.8s cubic-bezier(.16,1,.3,1) ${delay}ms, transform 0.8s cubic-bezier(.16,1,.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ════════════════════════════════════════
   COUNTER ANIMATION
════════════════════════════════════════ */
function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView();
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = parseInt(target);
    const duration = 1800;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ════════════════════════════════════════
   FEATURES DATA
════════════════════════════════════════ */
const features = [
  {
    title: "EMI Shielding",
    desc: "Superior electromagnetic interference shielding for sensitive electronic enclosures.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-7 h-7">
        <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7z" />
      </svg>
    ),
  },
  {
    title: "Anticorrosive Coatings",
    desc: "Long-lasting corrosion protection for metals through polymer-enhanced paint additives.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-7 h-7">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "RADAR Absorption",
    desc: "Advanced microwave absorbing materials for stealth and precision signal management.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-7 h-7">
        <circle cx="12" cy="12" r="3" />
        <path d="M6.3 6.3a8 8 0 0 0 0 11.4M17.7 6.3a8 8 0 0 1 0 11.4" />
      </svg>
    ),
  },
  {
    title: "Antistatic Solutions",
    desc: "Effective charge dissipation across films, coatings, and industrial packaging.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-7 h-7">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    title: "Solid Capacitors",
    desc: "Reliable solid electrolyte capacitors with superior thermal and electrical stability.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-7 h-7">
        <rect x="2" y="7" width="20" height="10" rx="2" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
    ),
  },
  {
    title: "Electroluminescence",
    desc: "Innovative light-emitting coatings enabling next-generation display technologies.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-7 h-7">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
      </svg>
      
    ),
  },
];

/* ════════════════════════════════════════
   MAIN HOME COMPONENT
════════════════════════════════════════ */
export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,300;1,400;1,700&display=swap');
        .font-display { font-family: 'Roboto', sans-serif; }
        .font-body    { font-family: 'Roboto', sans-serif; }

        /* Shimmer line animation */
        @keyframes shimmer {
          0%   { transform: scaleX(0); transform-origin: left; }
          50%  { transform: scaleX(1); transform-origin: left; }
          50.001% { transform-origin: right; }
          100% { transform: scaleX(0); transform-origin: right; }
        }
        .shimmer-line { animation: shimmer 3s ease-in-out infinite; }

        /* Floating badge pulse */
        @keyframes pulse-slow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.4); }
          50%       { box-shadow: 0 0 0 12px rgba(34,197,94,0); }
        }
        .badge-pulse { animation: pulse-slow 2.5s ease-in-out infinite; }

        /* Marquee */
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-inner { animation: marquee 18s linear infinite; }

        /* Gradient text */
        .grad-text {
          background: linear-gradient(135deg, #16a34a 0%, #4ade80 60%, #16a34a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Card hover lift */
        .card-lift {
          transition: transform 0.35s cubic-bezier(.16,1,.3,1), box-shadow 0.35s ease;
        }
        .card-lift:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 48px rgba(0,0,0,0.10);
        }

        /* Number underline grow */
        .stat-bar {
          width: 0;
          transition: width 1.2s cubic-bezier(.16,1,.3,1);
        }
        .stat-bar.active { width: 100%; }

        /* Image parallax wrapper */
        .parallax-img {
          transition: transform 0.1s linear;
        }
      `}</style>

      <div className="font-body bg-white text-stone-900 overflow-x-hidden">

        {/* ═══════════════════════════════════════
            1. HERO — fullscreen video + parallax
        ═══════════════════════════════════════ */}
        <section className="relative w-full h-screen overflow-hidden">
          <video
            autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover scale-105"
            style={{ transform: `scale(1.05) translateY(${scrollY * 0.25}px)` }}
            src="https://www.w3schools.com/html/mov_bbb.mp4"
          />

          {/* Multi-layer overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

          {/* Decorative grid lines */}
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.1) 1px,transparent 1px)", backgroundSize: "80px 80px" }}
          />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-end px-8 md:px-24 pb-16 md:pb-28 max-w-screen-2xl mx-auto">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-green-400" />
              <span className="text-green-400 text-xs tracking-[0.3em] uppercase font-medium">
                ElektroactivX  Private Limited
              </span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-white font-black leading-[0.95] mb-8 max-w-3xl">
              Science That{" "}
              <span className="italic grad-text">Conducts</span>
              <br />the Future.
            </h1>

            <p className="text-white/70 text-base md:text-lg max-w-md leading-relaxed mb-10 font-light">
              Innovation-driven manufacturing of electrically conductive
              polymers for industrial applications worldwide.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <a
                href="/about"
                className="group relative inline-flex items-center gap-3 bg-green-500 hover:bg-green-400 text-white font-medium text-sm px-8 py-4 tracking-wide transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10">Discover More</span>
                <svg className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
              </a>
              <a href="/products" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium transition-colors border-b border-white/30 hover:border-white pb-0.5">
                View Products
              </a>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 right-8 md:right-24 flex flex-col items-center gap-2 opacity-60">
              <span className="text-white text-[10px] tracking-[0.3em] uppercase rotate-90 mb-4">Scroll</span>
              <div className="w-[1px] h-12 bg-white/40 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-white shimmer-line" />
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            MARQUEE TICKER
        ═══════════════════════════════════════ */}
        <div className="bg-green-500 py-3.5 overflow-hidden">
          <div className="marquee-inner flex gap-0 whitespace-nowrap">
            {Array(2).fill(null).map((_, i) => (
              <div key={i} className="flex gap-0">
                {["EMI Shielding", "Anticorrosive Coatings", "RADAR Absorption", "Solid Electrolyte Capacitors", "Antistatic Films", "Electroluminescence", "Conductive Polymers"].map((t) => (
                  <span key={t} className="text-white text-xs tracking-[0.2em] uppercase font-medium px-8 border-r border-white/20 last:border-r-0">
                    {t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════
            2. WHO WE ARE — asymmetric layout
        ═══════════════════════════════════════ */}
        <section className="px-8 md:px-24 py-24 md:py-36 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center max-w-screen-2xl mx-auto">
          {/* Text — 5 cols */}
          <div className="lg:col-span-5">
            <Reveal delay={0}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-[1px] bg-green-500" />
                <span className="text-green-600 text-xs tracking-[0.25em] uppercase font-medium">Who We Are</span>
              </div>
              <h2 className="font-display text-5xl md:text-6xl font-black leading-tight mb-8">
                ElektroactivX <br />
                <span className="grad-text italic">Private</span><br />
                Limited
              </h2>
              <p className="text-stone-500 leading-relaxed text-base mb-6 font-light">
               Elektroactivx Pvt Ltd is an innovation driven enterprise. It is devoted to manufacturing and marketing of a truely suitable electrically conductive polymer for industrial applications such as anticorrosive additives for paints, EMI shielding, Antistatic, RADAR absorbing material,  solid electrolyte capacitors etc.
              </p>
              <a
                href="/about"
                className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium text-sm border-b border-green-400 hover:border-green-600 pb-0.5 transition-colors"
              >
                Read More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </Reveal>
          </div>

          {/* Stats — 2 cols */}
          <div className="lg:col-span-2 flex lg:flex-col gap-6 justify-center">
            {[
              { num: 20, suffix: "+", label: "Years of Innovation" },
              { num: 6,  suffix: "+", label: "Application Areas"  },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 150}>
                <div className="bg-stone-50 border border-stone-100 p-6 text-center card-lift">
                  <p className="font-display text-4xl font-black text-green-600 mb-1">
                    <Counter target={s.num} suffix={s.suffix} />
                  </p>
                  <p className="text-stone-400 text-xs tracking-wider uppercase">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Image — 5 cols */}
          <div className="lg:col-span-5 relative">
            <Reveal delay={200} direction="right">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80"
                  alt="Innovation Laboratory"
                  className="w-full h-[500px] object-cover"
                />
                {/* Green accent border */}
                <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-green-400 -z-10" />
                {/* Badge */}
                <div className="absolute -bottom-5 left-6 bg-green-500 badge-pulse text-white px-6 py-3">
                  <p className="text-xs font-bold tracking-widest uppercase">Innovation Lab</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            3. ABOUT — split with large image
        ═══════════════════════════════════════ */}
        <section className="bg-stone-950 text-white overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
            {/* Image */}
            <Reveal direction="left">
              <div className="relative h-80 lg:h-full min-h-[500px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=700&q=80"
                  alt="Dr. Bernhard Wessling"
                  className="w-full h-full object-cover object-top grayscale brightness-75"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-stone-950/60 lg:to-stone-950" />
                {/* Name tag */}
                <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-sm border border-white/20 px-5 py-3">
                  <p className="text-white text-xs font-bold tracking-widest uppercase">Dr. Bernhard Wessling</p>
                  <p className="text-white/50 text-xs mt-0.5">German Scientist & Mentor</p>
                </div>
              </div>
            </Reveal>

            {/* Text */}
            <div className="px-10 md:px-16 py-16 md:py-24 flex flex-col justify-center">
              <Reveal delay={100}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-6 h-[1px] bg-green-500" />
                  <span className="text-green-400 text-xs tracking-[0.25em] uppercase font-medium">About ElektroactivX </span>
                </div>
                <h2 className="font-display text-4xl md:text-5xl font-black leading-tight mb-8">
                  Guided by <span className="italic grad-text">Science</span>,<br />
                  Driven by Purpose
                </h2>
                <p className="text-white/60 leading-relaxed mb-5 font-light">
                  ElektroactivX  Private Limited is established under the guidance and
                  mentorship of{" "}
                  <strong className="text-white font-medium">Dr. Bernhard Wessling</strong>,
                  the German scientist who showed the world how to process conductive
                  polymers by dispersion — and about the corrosion resistant property of
                  conductive polymers.
                </p>
                <p className="text-white/60 leading-relaxed mb-10 font-light">
                  He successfully took this breakthrough to market, enabling a new
                  generation of industrial applications built on the remarkable
                  properties of conducting polymers.
                </p>
                <a
                  href="/about"
                  className="group inline-flex items-center gap-3 border border-green-500 text-green-400 hover:bg-green-500 hover:text-white font-medium text-sm px-8 py-4 transition-all duration-300 w-fit"
                >
                  More Information
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            4. CONDUCTIVE POLYMER
        ═══════════════════════════════════════ */}
        <section className="px-8 md:px-24 py-24 md:py-36 max-w-screen-2xl mx-auto">
          {/* Header */}
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-20">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-6 h-[1px] bg-green-500" />
                  <span className="text-green-600 text-xs tracking-[0.25em] uppercase font-medium">Core Technology</span>
                </div>
                <h2 className="font-display text-5xl md:text-6xl font-black leading-tight">
                  Conductive<br />
                  <span className="italic grad-text">Polymer</span><br />
                  Dispersion
                </h2>
              </div>
              <div>
                <p className="text-stone-500 leading-relaxed font-light text-base">
                  Conducting Polymers such as Polyaniline have stimulated material
                  scientists worldwide for their game-changing industrial potential.
                  Completely insoluble in water and organic solvents, they require
                  innovative dispersion techniques for real-world processing.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Formula card */}
          <Reveal delay={100}>
            <div className="bg-stone-50 border border-stone-100 p-10 mb-8 flex flex-col md:flex-row items-center gap-10">
              <div className="flex-shrink-0">
                <svg viewBox="0 0 340 110" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xs">
                  <polygon points="30,55 44,30 72,30 86,55 72,80 44,80" fill="none" stroke="#16a34a" strokeWidth="2"/>
                  <text x="48" y="60" fontSize="12" fontFamily="sans-serif" fill="#1c1917">NH</text>
                  <line x1="86" y1="55" x2="110" y2="55" stroke="#1c1917" strokeWidth="1.5"/>
                  <polygon points="110,55 124,30 152,30 166,55 152,80 124,80" fill="none" stroke="#16a34a" strokeWidth="2"/>
                  <line x1="166" y1="55" x2="190" y2="55" stroke="#1c1917" strokeWidth="1.5"/>
                  <text x="170" y="50" fontSize="12" fontFamily="sans-serif" fill="#1c1917">N</text>
                  <text x="168" y="68" fontSize="10" fontFamily="sans-serif" fill="#16a34a">A⁻</text>
                  <polygon points="190,55 204,30 232,30 246,55 232,80 204,80" fill="none" stroke="#4ade80" strokeWidth="2"/>
                  <line x1="246" y1="55" x2="270" y2="55" stroke="#1c1917" strokeWidth="1.5"/>
                  <polygon points="270,55 284,30 312,30 326,55 312,80 284,80" fill="none" stroke="#4ade80" strokeWidth="2"/>
                  <text x="330" y="59" fontSize="13" fontFamily="sans-serif" fill="#1c1917">n</text>
                  <text x="20" y="28" fontSize="10" fontFamily="sans-serif" fill="#78716c">H</text>
                  <text x="102" y="28" fontSize="10" fontFamily="sans-serif" fill="#78716c">H</text>
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-xs text-stone-400 tracking-widest uppercase mb-3">Polyaniline Structure</p>
                <p className="text-stone-600 text-sm leading-relaxed">
                  The extraordinary high surface tension of conducting polymers — by far
                  the highest of all known organic materials — makes adequate dispersion
                  the central challenge and our core innovation for industrial
                  processability.
                </p>
              </div>
            </div>
          </Reveal>

          {/* CTA */}
          <Reveal delay={150}>
            <div className="flex justify-center mb-24">
              <a
                href="/products"
                className="group inline-flex items-center gap-3 bg-stone-900 hover:bg-green-600 text-white font-medium text-sm px-10 py-4 tracking-wide transition-all duration-300"
              >
                Conductive Polymer Dispersion
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </Reveal>

          {/* Feature grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 80}>
                <div className="group border border-stone-100 p-8 card-lift cursor-default bg-white hover:border-green-200">
                  {/* Icon */}
                  <div className="w-14 h-14 bg-stone-50 group-hover:bg-green-500 text-green-600 group-hover:text-white flex items-center justify-center mb-6 transition-all duration-300">
                    {f.icon}
                  </div>
                  <h4 className="font-display text-lg font-bold mb-3 group-hover:text-green-700 transition-colors">
                    {f.title}
                  </h4>
                  <p className="text-stone-400 text-sm leading-relaxed">{f.desc}</p>
                  {/* Bottom accent line */}
                  <div className="mt-6 h-[2px] bg-stone-100 relative overflow-hidden">
                    <div className="absolute inset-0 bg-green-500 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════
            5. CTA BANNER
        ═══════════════════════════════════════ */}
    <section className="bg-gray-100 py-16 px-6">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-semibold text-gray-800">
          Applications
        </h2>
        <div className="w-16 h-1 bg-green-500 mx-auto mt-3 rounded"></div>
      </div>

      {/* Cards */}
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {applications.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-40 object-cover"
            />

            <div className="p-5 text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>

              <div className="w-10 h-0.5 bg-green-500 mx-auto mb-3"></div>

              <p className="text-sm text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
      </div>
    </>
  );
}