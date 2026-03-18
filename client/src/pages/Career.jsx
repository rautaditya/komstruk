import Header from "../componants/Header";
import { useEffect, useRef, useState } from "react";
import Footer from "../componants/Footer";
/* ─── Scroll-reveal hook ─────────────────────────── */
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ─── Counter hook ───────────────────────────────── */
function useCounter(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useInView();
  useEffect(() => {
    if (!visible) return;
    let raf, s = null;
    const run = ts => {
      if (!s) s = ts;
      const p = Math.min((ts - s) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 4)) * target));
      if (p < 1) raf = requestAnimationFrame(run); else setCount(target);
    };
    raf = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf);
  }, [visible, target, duration]);
  return [ref, count];
}

/* ─── Reveal wrapper ─────────────────────────────── */
function Reveal({ children, delay = 0, from = "bottom", className = "", style = {} }) {
  const [ref, visible] = useInView();
  const origins = {
    bottom: "translateY(38px)",
    left:   "translateX(-38px)",
    right:  "translateX(38px)",
    scale:  "scale(0.93)",
    fade:   "none",
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : origins[from],
        transition: `opacity 0.85s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.85s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Counter display ─────────────────────────────── */
function Counter({ target, suffix = "" }) {
  const [ref, count] = useCounter(target);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ─── FAQ Item ────────────────────────────────────── */
function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border-b border-gray-200 transition-colors duration-200 ${open ? "bg-gray-50" : "bg-white"}`}>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-0 py-5 text-left gap-6 group"
      >
        <span className={`text-sm font-medium transition-colors duration-200 ${open ? "text-emerald-600" : "text-gray-900 group-hover:text-emerald-600"}`}>
          {question}
        </span>
        <span className={`w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-full border transition-all duration-300 ${open ? "border-emerald-500 bg-emerald-500 rotate-45" : "border-gray-300 group-hover:border-emerald-400"}`}>
          <svg width="10" height="10" fill="none" stroke={open ? "#fff" : "#9ca3af"} strokeWidth="2">
            <path d="M5 1v8M1 5h8" />
          </svg>
        </span>
      </button>
      <div
        style={{
          maxHeight: open ? 200 : 0,
          overflow: "hidden",
          transition: "max-height 0.4s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <p className="text-sm text-gray-500 leading-7 font-light pb-6 pr-10">{answer}</p>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   CAREERS PAGE
════════════════════════════════════════════════════ */
export default function Careers() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      quote: "It has actually been like a second university. I have learnt so much in such a short period of time.",
      name: "Priya Sharma",
      role: "Process Engineer, Pune Facility",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80",
    },
    {
      quote: "Working at Komstruk means your work genuinely matters. Every day we're solving real problems for a cleaner planet.",
      name: "Arjun Mehta",
      role: "Hydrometallurgy Specialist, Mumbai",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    },
    {
      quote: "The pace of learning here is incredible. I've grown more professionally in one year than in my previous three combined.",
      name: "Kavita Nair",
      role: "Logistics & Operations Lead",
      img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
    },
  ];

  const perks = [
    { icon: "🌱", title: "Mission-driven work", desc: "Every role at Komstruk contributes directly to closing the loop on battery materials and reducing environmental harm." },
    { icon: "📈", title: "Fast-track growth", desc: "We invest heavily in our people. Expect mentorship, certification support and rapid advancement in a fast-growing company." },
    { icon: "🏥", title: "Comprehensive health", desc: "Full medical, dental and vision coverage for you and your family, plus mental wellness support programmes." },
    { icon: "🎓", title: "Learning stipend", desc: "Annual learning and development budget for courses, certifications, conferences and technical training." },
    { icon: "🌍", title: "National exposure", desc: "Work across 9 states with the opportunity to lead projects at different facility locations across India." },
    { icon: "⚡", title: "Flexible working", desc: "Hybrid working models available for eligible roles, with generous leave policies and a results-first culture." },
  ];

  const departments = [
    { label: "Process Engineering", img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80", count: "8 open roles" },
    { label: "Production",          img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80", count: "12 open roles" },
    { label: "Manufacturing Ops",   img: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=600&q=80", count: "5 open roles" },
    { label: "Supply Chain",        img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", count: "4 open roles" },
    { label: "R&D Battery Labs",    img: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=80", count: "6 open roles" },
    { label: "Software & IT",       img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80", count: "3 open roles" },
  ];

  const faqs = [
    { q: "Can I apply if I am a fresh graduate?", a: "Absolutely. Komstruk welcomes fresh graduates across all departments. We run structured onboarding and mentorship programmes specifically designed for early-career professionals to hit the ground running." },
    { q: "Does Komstruk help with relocation?", a: "Yes. For roles that require relocation to one of our facility cities (Pune, Mumbai, Bengaluru, Chennai), we provide a relocation assistance package including temporary housing support and travel reimbursement." },
    { q: "Do I need to be able to speak a specific language to work in India?", a: "English is our primary working language across all facilities. Local language skills are an advantage but never a barrier to joining the Komstruk team." },
    { q: "What kind of employment contracts do you offer?", a: "We offer permanent full-time contracts for most roles, as well as fixed-term and contract positions for project-specific work. Contract type is clearly specified in every job listing." },
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
        @keyframes heroLoad {
          from { transform: scale(1.06); opacity: 0; }
          to   { transform: scale(1);    opacity: 1; }
        }
        @keyframes slideLeft {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.33%); }
        }
        @keyframes tickerRun {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marqueePause:hover { animation-play-state: paused; }

        .animate-fade-up   { animation: fadeUp  0.9s cubic-bezier(0.22,1,0.36,1) both; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-600 { animation-delay: 0.6s; }

        .hero-img { animation: heroLoad 1.8s cubic-bezier(0.16,1,0.3,1) forwards; }

        .img-zoom img  { transition: transform 0.7s cubic-bezier(0.16,1,0.3,1); }
        .img-zoom:hover img { transform: scale(1.05); }

        .card-lift { transition: transform 0.35s ease, box-shadow 0.35s ease; }
        .card-lift:hover { transform: translateY(-5px); box-shadow: 0 18px 44px rgba(0,0,0,0.09); }

        .dept-card { transition: all 0.4s ease; }
        .dept-card:hover .dept-overlay { background: rgba(0,0,0,.22) !important; }
        .dept-card:hover img { transform: scale(1.05); }
        .dept-card img { transition: transform 0.6s cubic-bezier(0.16,1,0.3,1); }

        .ticker-wrap { overflow: hidden; white-space: nowrap; }
        .ticker-inner { display: inline-flex; animation: tickerRun 28s linear infinite; }
        .ticker-wrap:hover .ticker-inner { animation-play-state: paused; }

        .perk-card { transition: all 0.35s ease; border: 1px solid #f0f0f0; }
        .perk-card:hover { border-color: #d1fae5; background: #f0fdf4; transform: translateY(-3px); }

        .job-row { transition: background 0.2s ease; }
        .job-row:hover { background: #f9fafb; }

        .tab-btn { transition: all 0.2s ease; }
        .tab-btn.active { color: #059669; border-bottom-color: #059669; }
        .tab-btn:not(.active) { color: #6b7280; border-bottom-color: transparent; }
        .tab-btn:hover:not(.active) { color: #374151; }
      `}</style>

      <Header />

      {/* ════════════════════════════════
          01 — HERO  (same structure as home + about)
      ════════════════════════════════ */}
      <section className="relative min-h-screen w-full">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=85"
            className="w-full h-full object-cover hero-img"
            alt="Careers at Komstruk"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        {/* Breadcrumb */}
        <div className="absolute top-24 right-10 z-10 hidden md:flex items-center gap-3">
          <span className="text-white/40 text-xs tracking-widest uppercase font-light">Home</span>
          <span className="text-white/40 text-xs">/</span>
          <span className="text-emerald-400 text-xs tracking-widest uppercase font-light">Careers</span>
        </div>

        <div className="relative z-10 flex flex-col justify-end min-h-screen pb-28 md:pb-36 px-8 md:px-16 lg:px-24">
          <div className="max-w-3xl">
            <p className="text-emerald-400 text-xs tracking-widest uppercase font-light mb-5 animate-fade-up flex items-center gap-3">
              <span className="w-6 h-px bg-emerald-400 inline-block" />
              Careers
            </p>
            <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-light leading-tight mb-8 animate-fade-up delay-200 tracking-tight">
              Calling all<br />
              <strong className="font-bold">problem solvers</strong>
            </h1>
            <p className="text-white/65 text-base md:text-lg font-light leading-relaxed mb-10 animate-fade-up delay-400 max-w-xl tracking-wide">
              Going to work is much more exciting when you can see how your daily efforts have a direct positive impact on the future. Join us in building India's most trusted battery recycling infrastructure.
            </p>
            <div className="flex items-center gap-4 animate-fade-up delay-600">
              <a href="#roles" className="inline-block px-10 py-4 text-white font-medium text-sm tracking-widest uppercase bg-emerald-600 hover:bg-emerald-500 transition-colors duration-300">
                See All Roles
              </a>
              <a href="#life" className="inline-block px-8 py-4 text-white font-light text-sm tracking-widest uppercase border border-white/30 hover:border-white/70 transition-colors duration-300">
                Life at Komstruk
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
          02 — CALLING ALL PROBLEM SOLVERS
          (Northvolt career: left text + right image)
      ════════════════════════════════ */}
      <section className="w-full bg-white py-24 md:py-32 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-28">
          <div className="flex-1 flex flex-col justify-center">
            <Reveal>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6 tracking-tight">
                Calling all<br />problem solvers
              </h2>
              <p className="text-sm text-gray-500 leading-7 mb-8 max-w-md font-light">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-800 mr-2">Career</span>
                A place where work is much more exciting when you can see how your daily efforts have a direct positive impact on the future. Join us in inventing, building and recycling the world's cleanest batteries.
              </p>
              <a href="#roles" className="text-sm font-medium text-gray-900 underline underline-offset-4 hover:text-emerald-600 transition-colors w-fit">
                Join us!
              </a>
            </Reveal>
          </div>
          <Reveal from="right" className="flex-1 w-full img-zoom overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&q=80"
              alt="Team at Komstruk"
              className="w-full h-80 lg:h-[480px] object-cover"
            />
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════
          03 — KOMSTRUK BY THE NUMBERS
          (Northvolt career stats: 5500+, 100+, 28%)
      ════════════════════════════════ */}
      <section className="w-full bg-gray-50 border-t border-b border-gray-100 py-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-center text-3xl font-light text-gray-900 mb-16 tracking-wide">
              Komstruk by the numbers
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {[
              { target: 150,  suf: "+",  tag: "People",      label: "A diverse, multidisciplinary team of engineers, scientists and operators from over 12 states across India." },
              { target: 9,    suf: "+",  tag: "Locations",   label: "Facility and office locations across India, with more planned as we scale nationally and internationally." },
              { target: 98,   suf: "%",  tag: "Recovery",    label: "Material recovery rate across all processed battery types — one of the highest in the industry globally." },
            ].map(({ target, suf, tag, label }, i) => (
              <Reveal key={tag} delay={i * 100} className="px-8 md:px-12 py-8 md:py-0">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 border border-gray-200 px-2 py-1 inline-block">{tag}</p>
                <div className="text-5xl md:text-6xl font-light text-gray-900 mb-4 leading-none">
                  <Counter target={target} suffix={suf} />
                </div>
                <p className="text-sm text-gray-500 font-light leading-7 max-w-xs">{label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          04 — WORKING IN BATTERY RECYCLING
          (Northvolt: right-aligned text block, white bg)
      ════════════════════════════════ */}
      <div className="relative w-full">
        <div className="relative w-full h-[60vh] min-h-[400px]">
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1920&q=80"
            alt="Working in battery recycling"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "brightness(0.72) saturate(0.75)" }}
          />
        </div>
        <div className="absolute top-1/4 right-0 lg:right-20 w-full max-w-lg bg-white px-10 py-12">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 leading-tight mb-5 tracking-tight">
            Working in battery<br />production
          </h2>
          <p className="text-sm text-gray-500 leading-7 mb-5 font-light">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-800 mr-2">Life at Komstruk</span>
            We manufacture outcomes, not just outputs. At Komstruk, your work directly reduces the demand for freshly mined lithium, cobalt and nickel — and that impact is tangible every single day.
          </p>
          <a href="#departments" className="text-sm font-medium text-gray-900 underline underline-offset-4 hover:text-emerald-600 transition-colors w-fit">
            Explore teams
          </a>
        </div>
        <div className="h-48 md:h-64" />
      </div>

      {/* ════════════════════════════════
          05 — MEET THE TEAM / TESTIMONIALS
          (Northvolt career: large italic quote + carousel)
      ════════════════════════════════ */}
      <section id="life" className="w-full bg-white py-24 md:py-32 px-8 md:px-16 lg:px-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-center text-3xl font-light text-gray-900 mb-16 tracking-wide">
              Meet the team
            </h2>
          </Reveal>

          {/* Testimonial slider */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
            >
              {testimonials.map((t, i) => (
                <div key={i} className="min-w-full flex flex-col md:flex-row gap-12 md:gap-20 items-center">
                  <div className="md:w-2/3">
                    <p className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 leading-tight mb-8 tracking-tight">
                      "{t.quote}"
                    </p>
                    <div className="flex items-center gap-4">
                      <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover grayscale" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{t.name}</p>
                        <p className="text-xs text-gray-400 font-light mt-0.5">{t.role}</p>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/3 img-zoom overflow-hidden hidden md:block">
                    <img src={t.img} alt={t.name} className="w-full h-64 object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Arrows */}
          <div className="flex items-center gap-4 mt-10">
            <button
              onClick={() => setActiveTestimonial(a => Math.max(0, a - 1))}
              className={`w-10 h-10 flex items-center justify-center border transition-all duration-300 ${activeTestimonial === 0 ? "border-gray-200 text-gray-300 cursor-not-allowed" : "border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"}`}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 3L5 7l4 4"/></svg>
            </button>
            <button
              onClick={() => setActiveTestimonial(a => Math.min(testimonials.length - 1, a + 1))}
              className={`w-10 h-10 flex items-center justify-center border transition-all duration-300 ${activeTestimonial === testimonials.length - 1 ? "border-gray-200 text-gray-300 cursor-not-allowed" : "border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"}`}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 3l4 4-4 4"/></svg>
            </button>
            <span className="text-xs text-gray-400 font-light ml-2">
              {activeTestimonial + 1} / {testimonials.length}
            </span>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          06 — PERKS / BENEFITS
          (Northvolt career: "Some perks" 6-card grid)
      ════════════════════════════════ */}
      <section className="w-full bg-gray-50 py-24 md:py-32 px-8 md:px-16 lg:px-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-center text-3xl font-light text-gray-900 mb-4 tracking-wide">
              Some perks when joining Komstruk
            </h2>
            <p className="text-center text-sm text-gray-400 font-light mb-16 max-w-xl mx-auto leading-7">
              We believe that great people deserve great support. Here's what you can expect when you become part of the Komstruk team.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {perks.map(({ icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 70}>
                <div className="perk-card bg-white p-8 h-full">
                  <div className="text-2xl mb-5">{icon}</div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">{title}</h3>
                  <p className="text-sm text-gray-500 leading-7 font-light">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          07 — DEPARTMENTS / CATEGORIES
          (Northvolt career: image grid with labels)
      ════════════════════════════════ */}
      <section id="departments" className="w-full bg-white px-8 md:px-16 lg:px-24 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-center text-3xl font-light text-gray-900 mb-14 tracking-wide">
              Categories
            </h2>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {departments.map(({ label, img, count }, i) => (
              <Reveal key={label} delay={i * 65}>
                <div className="dept-card relative cursor-pointer group overflow-hidden">
                  <span className="absolute top-3 left-3 z-10 text-xs uppercase tracking-widest text-white/60 font-medium">{count}</span>
                  <img src={img} alt={label} className="w-full h-48 md:h-56 object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  <div className="dept-overlay absolute inset-0 bg-black/42 transition-all duration-400" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="text-white text-sm font-medium tracking-wide block">{label}</span>
                    <span className="text-emerald-400 text-xs font-light mt-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View roles
                      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 6h8M7 2l4 4-4 4"/></svg>
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal style={{ textAlign: "center", marginTop: "3rem" }}>
            <a href="#roles" className="inline-block px-10 py-4 text-white font-medium text-sm tracking-widest uppercase bg-emerald-600 hover:bg-emerald-500 transition-colors duration-300">
              See all roles
            </a>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════
          08 — ONE MISSION, SEVERAL LOCATIONS
          (Northvolt career: full-screen image + centered text)
      ════════════════════════════════ */}
      <div className="relative w-full">
        <img
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&q=80"
          alt="Locations"
          className="w-full h-[55vh] object-cover"
          style={{ filter: "brightness(0.38) saturate(0.6)" }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
          <Reveal from="fade">
            <p className="text-white/50 text-xs tracking-widest uppercase font-light mb-4">Our reach</p>
            <h2 className="text-white text-4xl md:text-5xl font-light leading-tight mb-6 tracking-tight">
              One mission.<br />
              <strong className="font-bold text-emerald-400">Several locations.</strong>
            </h2>
            <p className="text-white/60 text-sm font-light leading-7 max-w-lg mx-auto mb-8">
              From our headquarters in Pune to processing facilities across Maharashtra, Gujarat, Karnataka and beyond — Komstruk is building the circular economy from the ground up.
            </p>
            <a href="#locations" className="inline-block px-8 py-3 text-white/80 font-light text-xs tracking-widest uppercase border border-white/30 hover:border-emerald-400 hover:text-emerald-400 transition-colors duration-300">
              See all locations
            </a>
          </Reveal>
        </div>
      </div>

      {/* ════════════════════════════════
          09 — OPEN ROLES
          (Job listing table with tab filter)
      ════════════════════════════════ */}
      <section id="roles" className="w-full bg-white px-8 md:px-16 lg:px-24 py-24 md:py-32 border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="text-3xl font-light text-gray-900 mb-3 tracking-wide">Open roles</h2>
            <p className="text-sm text-gray-400 font-light mb-10">Join a team building the future of battery recycling in India.</p>
          </Reveal>

          {/* Role rows */}
          <div className="divide-y divide-gray-100">
            {[
              { title: "Senior Process Engineer",         dept: "Engineering",   loc: "Pune",      type: "Full-time" },
              { title: "Hydrometallurgy Specialist",      dept: "R&D Labs",      loc: "Mumbai",    type: "Full-time" },
              { title: "Logistics Operations Manager",    dept: "Supply Chain",  loc: "Bengaluru", type: "Full-time" },
              { title: "Battery Discharge Technician",    dept: "Production",    loc: "Chennai",   type: "Full-time" },
              { title: "Environmental Compliance Officer",dept: "Regulatory",    loc: "Pune",      type: "Full-time" },
              { title: "Full-Stack Developer",            dept: "Software & IT", loc: "Remote",    type: "Full-time" },
              { title: "Graduate Engineer Trainee",       dept: "Engineering",   loc: "Pune",      type: "Graduate" },
              { title: "Business Development Executive",  dept: "Sales",         loc: "Mumbai",    type: "Full-time" },
            ].map(({ title, dept, loc, type }, i) => (
              <Reveal key={title} delay={i * 40}>
                <div className="job-row py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer group">
                  <div>
                    <p className="text-sm font-medium text-gray-900 group-hover:text-emerald-600 transition-colors">{title}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-gray-400 font-light">{dept}</span>
                      <span className="text-gray-200">·</span>
                      <span className="text-xs text-gray-400 font-light">{loc}</span>
                      <span className="text-gray-200">·</span>
                      <span className={`text-xs px-2 py-0.5 font-medium ${type === "Graduate" ? "bg-blue-50 text-blue-600" : "bg-emerald-50 text-emerald-600"}`}>{type}</span>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-gray-400 group-hover:text-emerald-600 transition-colors flex items-center gap-1.5 flex-shrink-0">
                    Apply
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 6h8M7 2l4 4-4 4"/></svg>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal style={{ marginTop: "2.5rem" }}>
            <a href="#all-roles" className="inline-block px-10 py-4 text-white font-medium text-sm tracking-widest uppercase bg-gray-900 hover:bg-gray-700 transition-colors duration-300">
              View all open positions
            </a>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════
          10 — LATEST NEWS (same as home page)
      ════════════════════════════════ */}
      <section className="w-full bg-gray-50 px-8 md:px-16 lg:px-24 py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-center text-3xl font-light text-gray-900 mb-14 tracking-wide">
              Latest Komstruk news
            </h2>
          </Reveal>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { date: "14 March 2025",   title: "Komstruk opens its fifth national facility in Chennai, expanding southern India capacity by 40%.",          img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80" },
              { date: "2 February 2025", title: "Komstruk partners with leading EV manufacturer to launch India's first closed-loop battery supply programme.", img: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&q=80" },
              { date: "18 January 2025", title: "Komstruk achieves ISO 14001 certification across all processing and logistics operations nationwide.",          img: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&q=80" },
            ].map(({ date, title, img }, i) => (
              <Reveal key={title} delay={i * 90}>
                <div className="flex flex-col gap-4 cursor-pointer group">
                  <div className="overflow-hidden">
                    <img src={img} alt={title} className="w-full h-44 object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" />
                  </div>
                  <p className="text-xs text-gray-400 font-light tracking-wide">{date}</p>
                  <p className="text-sm text-gray-800 leading-snug font-medium group-hover:text-emerald-600 transition-colors">{title}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          11 — FAQ (Northvolt career: accordion)
      ════════════════════════════════ */}
      <section className="w-full bg-white px-8 md:px-16 lg:px-24 py-24 md:py-32 border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 className="text-center text-3xl font-light text-gray-900 mb-14 tracking-wide">
              Frequently asked questions
            </h2>
          </Reveal>
          <div className="border-t border-gray-200">
            {faqs.map(({ q, a }, i) => (
              <Reveal key={q} delay={i * 60}>
                <FaqItem question={q} answer={a} />
              </Reveal>
            ))}
          </div>
          <Reveal style={{ marginTop: "2.5rem", textAlign: "center" }}>
            <p className="text-sm text-gray-400 font-light">
              Still have questions?{" "}
              <a href="mailto:careers@komstruk.com" className="text-emerald-600 underline underline-offset-4 hover:text-emerald-700 transition-colors">
                careers@komstruk.com
              </a>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════
          12 — CTA BANNER
      ════════════════════════════════ */}
      <section className="w-full bg-gray-900 px-8 md:px-16 lg:px-24 py-24">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <Reveal from="left">
            <h2 className="text-3xl md:text-4xl font-light text-white leading-tight tracking-tight">
              Ready to make an impact?<br />
              <strong className="font-bold text-emerald-400">Join the team.</strong>
            </h2>
          </Reveal>
          <Reveal from="right">
            <a href="#roles" className="inline-block px-12 py-5 text-white font-medium text-sm tracking-widest uppercase bg-emerald-600 hover:bg-emerald-500 transition-colors duration-300 flex-shrink-0">
              See Open Roles →
            </a>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}