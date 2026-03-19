import Header from "../componants/Header";
import Footer from "../componants/Footer";
import { useEffect, useRef, useState } from "react";

/* ─── Scroll-reveal hook ─────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ─── Animated counter hook ─────────────────────────── */
function useCounter(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useInView();
  useEffect(() => {
    if (!visible) return;
    let raf, start = null;
    const run = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 4);
      setCount(Math.floor(ease * target));
      if (p < 1) raf = requestAnimationFrame(run);
      else setCount(target);
    };
    raf = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf);
  }, [visible, target, duration]);
  return [ref, count];
}

/* ─── Reveal wrapper ─────────────────────────────────── */
function Reveal({ children, delay = 0, className = "", from = "bottom" }) {
  const [ref, visible] = useInView();
  const transforms = {
    bottom: "translateY(36px)",
    left:   "translateX(-36px)",
    right:  "translateX(36px)",
    scale:  "scale(0.94)",
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : transforms[from],
        transition: `opacity 0.85s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.85s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Counter display ────────────────────────────────── */
function Counter({ target, suffix = "", prefix = "" }) {
  const [ref, count] = useCounter(target);
  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

/* ════════════════════════════════════════════════════════
   ABOUT US PAGE
════════════════════════════════════════════════════════ */
export default function AboutUs() {
  const [activeYear, setActiveYear] = useState(1);

  const timelineEvents = [
    { year: "2010", title: "Founded in Pune", desc: "Komstruk established as India's first dedicated lithium-ion battery recycling infrastructure company, beginning operations with EV battery collection across Maharashtra." },
    { year: "2014", title: "Processing Capacity 1200 MVA", desc: "Expanded hydrometallurgical processing capacity, becoming fully operational across Maharashtra and Gujarat with certified logistics partnerships." },
    { year: "2018", title: "National Footprint", desc: "Expanded operations across 9 states. Opened the Komstruk Advanced Materials Lab in Pune and launched ISO 9001 certified quality management across all sites." },
    { year: "2021", title: "Circular Economy Hub", desc: "Launched India's first closed-loop battery-to-battery material supply programme, partnering directly with EV manufacturers and grid storage operators." },
    { year: "2024", title: "ISO 14001 Certified", desc: "Achieved ISO 14001 environmental management certification. Processing capacity reached 12,000+ tonnes per year with 98% material recovery rate." },
  ];

  return (
    <main className="relative w-full overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
        * { font-family: 'Roboto', sans-serif !important; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes imgZoom {
          from { transform: scale(1.06); }
          to   { transform: scale(1); }
        }
        @keyframes lineDraw {
          from { width: 0; }
          to   { width: 100%; }
        }
        @keyframes dotPulse {
          0%,100% { transform: scale(1); opacity: 1; }
          50%     { transform: scale(1.5); opacity: 0.7; }
        }
        @keyframes arrowBounce {
          0%,100% { transform: translateX(0); }
          50%     { transform: translateX(5px); }
        }
        @keyframes lightStreak {
          0%   { opacity: 0; transform: translateY(-100%); }
          50%  { opacity: 1; }
          100% { opacity: 0; transform: translateY(100%); }
        }

        .animate-fade-up { animation: fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) both; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-600 { animation-delay: 0.6s; }

        .hero-img { animation: imgZoom 1.8s cubic-bezier(0.16,1,0.3,1) forwards; }

        .img-hover img  { transition: transform 0.7s cubic-bezier(0.16,1,0.3,1); }
        .img-hover:hover img { transform: scale(1.04); }

        .card-hover { transition: transform 0.35s ease, box-shadow 0.35s ease; }
        .card-hover:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.08); }

        .tl-dot { transition: all 0.3s ease; }
        .tl-dot-active { background-color: #059669 !important; border-color: #059669 !important; }

        .streak { animation: lightStreak 3s ease-in-out infinite; }
        .streak-2 { animation: lightStreak 3s ease-in-out infinite 0.8s; }
        .streak-3 { animation: lightStreak 3s ease-in-out infinite 1.6s; }

        .arrow-anim { animation: arrowBounce 1.5s ease-in-out infinite; }
        .dot-pulse  { animation: dotPulse 2s ease-in-out infinite; }
      `}</style>

      <Header />

      {/* ════════════════════════════════
          01 — HERO (same as home page hero)
      ════════════════════════════════ */}
      <section className="relative min-h-screen w-full">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1920&q=85"
            className="w-full h-full object-cover hero-img"
            alt="Komstruk facility"
          />
          <div className="absolute inset-0 bg-black/52" />
        </div>

        {/* Breadcrumb top-right */}
        <div className="absolute top-24 right-10 z-10 hidden md:flex items-center gap-3">
          <span className="text-white/40 text-xs tracking-widest uppercase font-light">Home</span>
          <span className="text-white/40 text-xs">/</span>
          <span className="text-emerald-400 text-xs tracking-widest uppercase font-light">About Us</span>
        </div>

        <div className="relative z-10 flex flex-col justify-end min-h-screen pb-28 md:pb-36 px-8 md:px-16 lg:px-24">
          <div className="max-w-2xl">
            <p className="text-white/60 text-xs tracking-widest uppercase font-light mb-5 animate-fade-up">
              About Us
            </p>
            <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-light leading-tight mb-8 animate-fade-up delay-200 tracking-tight">
              Sustainable<br />
              <span className="text-emerald-400 font-normal">Recycling</span><br />
              Since 2010
            </h1>
            <p className="text-white/65 text-base md:text-lg font-light leading-relaxed mb-10 animate-fade-up delay-400 max-w-xl tracking-wide">
              Komstruk is India's trusted battery recycling infrastructure company — recovering critical materials with zero-waste precision, built for the circular economy.
            </p>
            <div className="flex items-center gap-4 animate-fade-up delay-600">
              <a
                href="#story"
                className="inline-block px-10 py-4 text-white font-medium text-sm tracking-widest uppercase bg-emerald-600 hover:bg-emerald-500 transition-colors duration-300"
              >
                Our Story
              </a>
              <a
                href="#solutions"
                className="inline-block px-8 py-4 text-white font-light text-sm tracking-widest uppercase border border-white/30 hover:border-white/70 transition-colors duration-300"
              >
                What We Do
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 right-10 z-10 flex flex-col items-center gap-2 opacity-40">
          <span className="text-white text-xs tracking-widest uppercase font-light">Scroll</span>
          <span className="block w-px h-12 bg-white/60 animate-pulse" />
        </div>
      </section>

      {/* ════════════════════════════════
          02 — WHO WE ARE + HEADLINE
          (Omicron: "Ethical Governance Since 1990" style)
      ════════════════════════════════ */}
      <section className="w-full bg-white py-24 md:py-32 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">

          <Reveal>
            <p className="text-xs tracking-widest uppercase font-medium text-gray-400 mb-6">
              Who We Are
            </p>
          </Reveal>

          <div className="flex flex-col lg:flex-row gap-16 lg:gap-28 items-end mb-20">
            <Reveal delay={100} className="flex-1">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 leading-tight tracking-tight uppercase">
                Sustainable<br />Recycling<br />
                <span className="font-bold text-gray-900 border-b-4 border-emerald-500 pb-1">
                  Since 2010
                </span>
              </h2>
            </Reveal>
            <Reveal delay={200} from="right" className="flex-1">
              <p className="text-sm text-gray-500 leading-7 font-light">
                Komstruk was founded with a singular mission: to build the infrastructure backbone of India's battery circular economy. We specialise in end-to-end lithium-ion battery recycling — from certified collection and safe discharge to hydrometallurgical extraction and certified material reintegration into the supply chain.
              </p>
            </Reveal>
          </div>

          {/* Mission + Vision — exactly like Omicron two-col */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
            {[
              {
                icon: "◎",
                label: "Mission",
                text: "We take immense pride in building future-proof battery recycling infrastructure rooted in trust and technical excellence. Our success comes from our commitment to the highest standards of innovation, while prioritising integrity and transparency at every step. We ensure that each project delivers exceptional quality and measurable environmental impact.",
              },
              {
                icon: "◈",
                label: "Vision",
                text: "At Komstruk, our goal is to be the trusted partner for industries seeking battery recycling solutions that ensure transparency and a shared vision of progress. By anticipating the evolving needs of all stakeholders, we ensure that every tonne processed delivers material value rooted in sustainability. We aim to be the preferred choice for manufacturers looking for more than just service — lasting partnerships.",
              },
            ].map(({ icon, label, text }) => (
              <Reveal key={label} className="card-hover">
                <div className="bg-gray-50 border border-gray-100 p-10 h-full">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-emerald-600 text-xl">{icon}</span>
                    <span className="text-xs font-bold tracking-widest uppercase text-gray-800">{label}</span>
                  </div>
                  <p className="text-sm text-gray-500 leading-7 font-light">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          03 — STATS ROW
          (Omicron: 6 large numbers)
      ════════════════════════════════ */}
      <section className="w-full bg-gray-50 border-t border-b border-gray-100 py-0">
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {[
              { target: 3,     suf: "",     label: "Decades of\nDelivery" },
              { target: 12000, suf: "+",    label: "Tonnes\nProcessed / yr" },
              { target: 98,    suf: "%",    label: "Material\nRecovery Rate" },
              { target: 37,    suf: " GWh", label: "Battery Capacity\nHandled" },
              { target: 9,     suf: "+",    label: "States\nServed" },
              { target: 50,    suf: "+",    label: "Team\nExperts" },
            ].map(({ target, suf, label }, i) => (
              <Reveal key={label} delay={i * 70} className={`border-r border-gray-200 last:border-r-0 ${i >= 3 ? "border-t border-gray-200 md:border-t-0" : ""}`}>
                <div className="py-12 px-6">
                  <div className="text-3xl md:text-4xl font-light text-gray-900 leading-none mb-3">
                    <Counter target={target} suffix={suf} />
                  </div>
                  <div className="text-xs tracking-widest uppercase text-emerald-600 font-medium leading-relaxed whitespace-pre-line">
                    {label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          04 — OUR STORY (same layout as home "Green batteries")
      ════════════════════════════════ */}
      <section id="story" className="w-full bg-white py-24 md:py-32 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-28">

          <Reveal from="left" className="flex-1 w-full img-hover overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85"
              alt="Our story"
              className="w-full h-80 lg:h-[500px] object-cover"
            />
          </Reveal>

          <div className="flex-1 flex flex-col justify-center">
            <Reveal delay={100}>
              <p className="text-xs tracking-widest uppercase font-medium text-gray-400 mb-4">Our Story</p>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 leading-tight mb-6 tracking-tight">
                Sustainable quality, measured with parameters that are greater than success.
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <div className="w-10 h-0.5 bg-emerald-500 mb-6" />
              <p className="text-sm text-gray-500 leading-7 mb-4 font-light">
                Established in 2010, Komstruk quickly became one of the most recognised names in India's Battery Recycling and Circular Infrastructure industry. After the first decade of successful operations, the company diversified into advanced material refining.
              </p>
              <p className="text-sm text-gray-500 leading-7 mb-8 font-light">
                Committed to sustainability and distinction, our vision is to set a new standard in battery recycling excellence, offering Tier-1 commercial-grade recovered materials supported by strong operational functionality and exemplary programme management. Headquartered in Pune, Komstruk addresses the growing demand for intelligent and sustainable material recovery for industry, investors and rising enterprises.
              </p>
              <a href="#more" className="text-sm font-medium text-gray-900 underline underline-offset-4 hover:text-emerald-600 transition-colors w-fit">
                Read more →
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          05 — TIMELINE
          (Omicron: horizontal "3 Decades of Excellence")
      ════════════════════════════════ */}
      <section className="w-full bg-gray-50 py-24 md:py-32 px-8 md:px-16 lg:px-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">

          <Reveal className="mb-16">
            <div className="flex items-start gap-4">
              <div className="w-1 h-16 bg-emerald-500 flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm font-light text-gray-400 tracking-widest uppercase mb-1">Our Journey</p>
                <h2 className="text-3xl md:text-4xl font-light text-gray-900 leading-tight">
                  3 Decades of<br />
                  <strong className="font-bold text-gray-900">Excellence!</strong>
                </h2>
              </div>
            </div>
          </Reveal>

          {/* Timeline track */}
          <div className="relative mb-8">
            {/* Horizontal line */}
            <Reveal>
              <div className="relative h-px bg-gray-200 mx-4">
                <div
                  className="absolute left-0 top-0 h-full bg-emerald-500 transition-all duration-500"
                  style={{ width: `${(activeYear / (timelineEvents.length - 1)) * 100}%` }}
                />
              </div>
            </Reveal>

            {/* Dots row */}
            <div className="flex justify-between mt-0 relative -top-2">
              {timelineEvents.map((ev, i) => (
                <Reveal key={ev.year} delay={i * 80}>
                  <button
                    onClick={() => setActiveYear(i)}
                    className="flex flex-col items-center gap-3 group px-2"
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                        i <= activeYear
                          ? "bg-emerald-500 border-emerald-500"
                          : "bg-white border-gray-300 group-hover:border-emerald-400"
                      }`}
                    />
                    <span className={`text-xs font-medium tracking-wide transition-colors ${i === activeYear ? "text-emerald-600" : "text-gray-400 group-hover:text-gray-600"}`}>
                      {ev.year}
                    </span>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Active event detail */}
          <div
            key={activeYear}
            className="bg-white border border-gray-100 p-8 md:p-10 mt-4"
            style={{ animation: "fadeUp .4s cubic-bezier(0.22,1,0.36,1) both" }}
          >
            <p className="text-xs tracking-widest uppercase text-emerald-600 font-medium mb-3">{timelineEvents[activeYear].year}</p>
            <h3 className="text-xl md:text-2xl font-medium text-gray-900 mb-4">{timelineEvents[activeYear].title}</h3>
            <p className="text-sm text-gray-500 leading-7 font-light max-w-2xl">{timelineEvents[activeYear].desc}</p>
          </div>

          {/* Arrow nav */}
          <div className="flex gap-3 mt-5">
            <button
              onClick={() => setActiveYear(y => Math.max(0, y - 1))}
              className={`w-10 h-10 flex items-center justify-center border transition-all duration-300 ${activeYear === 0 ? "border-gray-200 text-gray-300 cursor-not-allowed" : "border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"}`}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 3L5 7l4 4"/></svg>
            </button>
            <button
              onClick={() => setActiveYear(y => Math.min(timelineEvents.length - 1, y + 1))}
              className={`w-10 h-10 flex items-center justify-center border transition-all duration-300 ${activeYear === timelineEvents.length - 1 ? "border-gray-200 text-gray-300 cursor-not-allowed" : "border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"}`}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 3l4 4-4 4"/></svg>
            </button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          06 — POWERED BY PURPOSE
          (Northvolt "Powered by nature" — image + floating card)
      ════════════════════════════════ */}
      <div className="relative w-full">
        <div className="relative w-full h-[60vh] min-h-[420px]">
          <img
            src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1920&q=80"
            alt="Powered by purpose"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "brightness(0.78) saturate(0.7)" }}
          />
        </div>

        <div className="absolute top-1/3 right-0 lg:right-20 w-full max-w-xl bg-white px-10 py-12">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 leading-tight mb-6 tracking-tight">
            Powered by the<br />force of purpose
          </h2>
          <p className="text-sm text-gray-500 leading-7 mb-6 font-light">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-800 mr-2">Sustainability</span>
            A key contribution to Komstruk's low-impact footprint comes from our commitment to power our facilities with clean, renewable energy. Combined with minimal resource use and closed-loop battery recycling, this is the blueprint for sustainable circular infrastructure.
          </p>
          <a href="#sustainability" className="text-sm font-medium text-gray-900 underline underline-offset-4 hover:text-emerald-600 transition-colors w-fit">
            Read more
          </a>
        </div>

        <div className="h-48 md:h-64" />
      </div>

      {/* ════════════════════════════════
          07 — KOMSTRUK RECYCLING ENGINEERS
          (Omicron dark section with project grid)
      ════════════════════════════════ */}
      <section className="relative w-full bg-gray-900 py-24 md:py-32 px-8 md:px-16 lg:px-24 overflow-hidden">
        {/* Light streak decorations */}
        {[20, 38, 55, 72].map((left, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 pointer-events-none"
            style={{
              left: `${left}%`,
              width: 1.5,
              background: "linear-gradient(to bottom, transparent, rgba(5,150,105,0.25), transparent)",
              animation: `lightStreak ${2.5 + i * 0.4}s ease-in-out infinite ${i * 0.6}s`,
            }}
          />
        ))}

        <div className="max-w-7xl mx-auto relative z-10">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
              <div>
                <p className="text-emerald-400 text-xs tracking-widest uppercase font-medium mb-4 flex items-center gap-3">
                  <span className="w-6 h-px bg-emerald-400 inline-block" />
                  Our Capabilities
                </p>
                <h2 className="text-3xl md:text-5xl font-light text-white leading-tight">
                  Komstruk<br />
                  <strong className="text-emerald-400 font-bold">Recycling Engineers</strong>
                </h2>
              </div>
              <a
                href="#projects"
                className="inline-block px-8 py-4 text-white font-medium text-sm tracking-widest uppercase bg-emerald-600 hover:bg-emerald-500 transition-colors duration-300 self-end flex-shrink-0"
              >
                View Projects
              </a>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <p className="text-gray-400 text-sm leading-7 font-light max-w-3xl mb-6">
              As one of India's leading battery recycling companies with over 14 years of experience, Komstruk is a full-stack Circular Economy Infrastructure provider with a primary focus on lithium-ion battery collection, safe processing and certified material recovery. We are equipped to execute recycling programmes for capacities up to industrial scale. Our operations serve Government, Semi-Government and Private organisations. The company's success is built on a foundation of strong ethics and unwavering dedication to quality.
            </p>
            <div className="border-t border-gray-700 pt-4 mb-10">
              <span className="text-gray-600 text-xs tracking-widest">Some of our notable projects include...</span>
            </div>
          </Reveal>

          {/* 2×2 project image grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
            {[
              "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=700&q=80",
              "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=700&q=80",
              "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=700&q=80",
              "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=700&q=80",
            ].map((src, i) => (
              <Reveal key={i} delay={i * 80} from={i % 2 === 0 ? "left" : "right"}>
                <div className="img-hover overflow-hidden">
                  <img
                    src={src}
                    alt={`project-${i}`}
                    className="w-full h-56 md:h-64 object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    style={{ filter: "brightness(0.65) saturate(0.5)" }}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          08 — SOLUTIONS GRID (same as home page)
      ════════════════════════════════ */}
      <section id="solutions" className="w-full bg-white px-8 md:px-16 lg:px-24 py-24">
        <Reveal>
          <h2 className="text-center text-3xl font-light text-gray-900 mb-14 tracking-wide">
            What We Recycle
          </h2>
        </Reveal>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: "EV Batteries",         img: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&q=80" },
            { label: "Grid Storage",         img: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&q=80" },
            { label: "Industrial Packs",     img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80" },
            { label: "Consumer Electronics", img: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&q=80" },
            { label: "Marine & Aviation",    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80" },
            { label: "Research Cells",       img: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=80" },
          ].map((item, i) => (
            <Reveal key={item.label} delay={i * 60}>
              <div className="relative group cursor-pointer overflow-hidden">
                <span className="absolute top-3 left-3 z-10 text-xs uppercase tracking-widest text-white/60 font-medium">
                  Komstruk
                </span>
                <img
                  src={item.img}
                  alt={item.label}
                  className="w-full h-44 md:h-52 object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500" />
                <span className="absolute bottom-4 left-4 text-white text-sm font-medium tracking-wide">
                  {item.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════
          09 — BATTERIES MADE FROM BATTERIES
          (same as home page section 08)
      ════════════════════════════════ */}
      <section className="w-full bg-gray-50 px-8 md:px-16 lg:px-24 py-24 border-t border-gray-100">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          <Reveal from="left" className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 leading-tight mb-5 tracking-tight">
              Batteries made<br />from batteries
            </h2>
            <p className="text-sm text-gray-400 leading-7 mb-7 font-light">
              A battery lives forever. When they contain recyclable materials, they're always valuable. By recovering used batteries and recycling them into raw materials for new batteries, we're steering demand away from fresh material extraction and moving closer to closing the loop on batteries entirely.
            </p>
            <a href="#komstruk-revolt" className="text-sm font-medium text-gray-900 underline underline-offset-4 hover:text-emerald-600 transition-colors">
              Discover Komstruk Circular
            </a>
          </Reveal>
          <Reveal from="right" className="md:w-1/2 img-hover overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&q=80"
              alt="Battery recycling"
              className="w-full h-72 object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════
          10 — THE KOMSTRUK WAY
          (same layout as home "The Northvolt way")
      ════════════════════════════════ */}
      <section className="w-full bg-white px-8 md:px-16 lg:px-24 py-24 border-t border-gray-100">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16">

          <Reveal from="left" className="md:w-1/4">
            <h2 className="text-2xl md:text-3xl font-light text-gray-900 leading-tight mb-4 tracking-tight">
              The Komstruk way
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed mb-5 font-light">
              A model defined by technical leadership, rooted in a commitment to the circular economy and sustainability.
            </p>
            <a href="#more" className="text-sm font-medium text-gray-900 underline underline-offset-4 hover:text-emerald-600 transition-colors">
              Read more
            </a>
          </Reveal>

          <div className="md:w-3/4 grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Collaboration",
                text: "Our clients and partners have complete visibility into our processes. Whether you are an EV manufacturer, fleet operator or Government body, we tailor solutions to your operational needs and compliance requirements.",
              },
              {
                title: "Sustainable by Default",
                text: "Going green isn't an option at Komstruk — it's constitutive. Ethical sourcing, smart engineering and a commitment to clean energy underpins every step, driving us towards net-zero operational emissions.",
              },
              {
                title: "Fully Committed",
                text: "Battery management is more than logistics. All deliveries, reports and certifications are managed with uncompromising quality, ensuring full traceability from origin to certified material output.",
              },
            ].map((col, i) => (
              <Reveal key={col.title} delay={i * 90}>
                <div className="border-t-2 border-emerald-500 pt-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-800 mb-3">{col.title}</p>
                  <p className="text-xs text-gray-400 leading-relaxed font-light">{col.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}