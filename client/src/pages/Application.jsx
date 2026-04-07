import React from "react";
import Header from "../componants/Header";
import Footer from "../componants/Footer";
import { useEffect, useRef, useState } from "react";

/* ─── useInView ──────────────────────────────────────── */
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

/* ─── Reveal ─────────────────────────────────────────── */
function Reveal({ children, delay = 0, className = "", from = "bottom" }) {
  const [ref, visible] = useInView();
  const tr = { bottom:"translateY(28px)", left:"translateX(-28px)", right:"translateX(28px)", scale:"scale(0.96)" };
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : tr[from],
      transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

/* ─── Application data (from Ormecon) ───────────────── */
const applications = [
  {
    id: "corrosion-protection",
    title: "Corrosion Protection",
    subtitle: "The world's most powerful anticorrosion polymer",
    img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=90",
    heroImg: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1400&q=90",
    tag: "Flagship Application",
    tagColor: "#16a34a",
    desc: "This is an extremely powerful corrosion protection principle. It was invented by Ormecon (Germany) and has been independently validated in numerous international studies. Polyaniline-based anticorrosion systems outperform conventional chromate and zinc-based primer systems — providing active, electrochemical protection at the metal-coating interface rather than just a passive barrier.",
    detail: "The mechanism relies on the redox activity of Polyaniline, which passivates the metal surface and prevents electrochemical corrosion reactions from propagating. This has been demonstrated on steel, aluminium, copper and their alloys under marine, industrial and atmospheric exposure conditions.",
    uses: ["Bridge structures", "Marine vessels", "Oil & gas pipelines", "Industrial equipment", "Rail infrastructure", "Offshore platforms"],
    products: ["DISSIPO-WR", "Anticorrosion Primers", "Polyaniline Emeraldine Salt"],
  },
  {
    id: "emi-shielding",
    title: "EMI Shielding",
    subtitle: "Electromagnetic compatibility through conductive polymers",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=90",
    heroImg: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=90",
    tag: "Electronics",
    tagColor: "#2563eb",
    desc: "Using our highly conductive masterbatch, products can be developed for medium requirements in EMI shielding. Conductive polymer-based EMC materials offer significant weight and processing advantages over traditional metal-filled composites — enabling lightweight, mouldable shielding components for electronic enclosures, automotive electronics and industrial control systems.",
    detail: "Polyaniline Masterbatches can be compounded with standard thermoplastics to achieve surface resistivities in the antistatic to semiconductive range, providing effective attenuation of electromagnetic interference at frequencies relevant to modern electronic systems. The inherent conductivity is stable over the product lifetime without the migration issues associated with carbon black systems.",
    uses: ["Electronic enclosures", "Automotive ECUs", "Industrial control panels", "Telecommunications equipment", "Medical devices", "Defence electronics"],
    products: ["Polyaniline Masterbatches", "Polyaniline Emeraldine Salt"],
  },
  {
    id: "permanent-antistatic",
    title: "Permanent Antistatic",
    subtitle: "Intrinsic static dissipation — no additives, no migration",
    img: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&q=90",
    heroImg: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1400&q=90",
    tag: "ESD / Packaging",
    tagColor: "#d97706",
    desc: "Using our highly conductive masterbatch, products can be developed for various antistatic applications. Unlike conventional antistatic additives which depend on humidity or surface migration for their effect, Polyaniline-based antistatic systems provide permanent, humidity-independent charge dissipation — critical for sensitive electronics packaging, clean rooms and explosive environments.",
    detail: "The permanent antistatic function derives from the intrinsic semiconducting nature of Polyaniline, which is uniformly distributed throughout the polymer matrix at nanoscopic particle sizes. This ensures consistent, reliable ESD protection across the full service life of the product — independent of environmental conditions.",
    uses: ["ESD packaging trays", "Electronic component bags", "Clean room flooring", "Explosive environment components", "Semiconductor handling", "Film & sheet products"],
    products: ["Polyaniline Masterbatches", "Polyaniline Emeraldine Base"],
  },
  {
    id: "electroluminescence",
    title: "Electroluminescence",
    subtitle: "Flexible, high-performance light-emitting displays",
    img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=90",
    heroImg: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1400&q=90",
    tag: "Display Technology",
    tagColor: "#7c3aed",
    desc: "With our highly conductive masterbatch, products can be developed for this very flexible and easy display technology. Polyaniline serves as a highly transparent, conductive electrode layer in electroluminescent devices — enabling flexible, lightweight display panels for automotive instrument clusters, advertising displays and wearable electronics.",
    detail: "The high optical transparency combined with excellent electrical conductivity of Polyaniline films makes them ideal replacements for conventional ITO (indium tin oxide) electrodes. Unlike ITO, Polyaniline electrodes can be applied to flexible substrates and processed from solution — dramatically reducing manufacturing complexity and enabling roll-to-roll production.",
    uses: ["Automotive instrument clusters", "Flexible display panels", "Wearable electronics", "Advertising displays", "Smart packaging", "Architectural lighting"],
    products: ["Polyaniline Emeraldine Salt", "Polyaniline Emeraldine Base"],
  },
  {
    id: "solid-electrolyte",
    title: "Solid Electrolyte Capacitors",
    subtitle: "Ultra-high performance energy storage components",
    img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=90",
    heroImg: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1400&q=90",
    tag: "Energy Storage",
    tagColor: "#dc2626",
    desc: "Using specially prepared dispersed polyaniline, an extremely high-performing solid state capacitor had been developed. Solid electrolyte capacitors based on Polyaniline offer exceptionally low equivalent series resistance (ESR) and outstanding high-frequency performance compared to conventional liquid electrolyte systems — enabling compact, high-reliability power conditioning in demanding applications.",
    detail: "The electrochemical stability and proton conductivity of Polyaniline in its doped form make it an ideal solid electrolyte for both aluminium and tantalum capacitor systems. The resulting devices exhibit superior temperature stability, longer service life and substantially lower ESR than conventional alternatives — making them particularly valuable in aerospace, automotive and industrial power electronics.",
    uses: ["Power supply units", "Aerospace electronics", "Automotive ECUs", "Industrial drives", "Telecommunications", "High-frequency circuits"],
    products: ["Polyaniline Emeraldine Salt", "Polyaniline Emeraldine Base"],
  },
];

const stats = [
  { num: "2000", suf: "", label: "Nobel Prize", sub: "Interest in conducting polymers surged after the Nobel Prize in Chemistry" },
  { num: "5",    suf: "+", label: "Application areas", sub: "From corrosion protection to electroluminescent displays" },
  { num: "98",   suf: "%", label: "Purity grade", sub: "All Komstruk formulations exceed 97% purity — laboratory-validated" },
  { num: "100",  suf: "nm", label: "Particle size", sub: "Nanoscopic Polyaniline particles enable ultrafine, stable dispersions" },
];

/* ════════════════════════════════════════════════════════
   APPLICATIONS PAGE
════════════════════════════════════════════════════════ */
export default function Applications() {
  const [activeApp, setActiveApp] = useState(null);

  return (
    <main className="relative w-full overflow-x-hidden bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
        * { font-family:'Roboto',sans-serif !important; }

        @keyframes fadeUp  { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes imgZoom { from{transform:scale(1.06)} to{transform:scale(1)} }
        @keyframes shimmer { from{background-position:-200% center} to{background-position:200% center} }
        @keyframes lStreak { 0%{opacity:0;transform:translateY(-100%)} 50%{opacity:1} 100%{opacity:0;transform:translateY(100%)} }
        @keyframes pulseW  { 0%,100%{opacity:.3} 50%{opacity:.75} }
        @keyframes slideUp { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }

        .fu{animation:fadeUp 0.85s cubic-bezier(0.22,1,0.36,1) both}
        .d2{animation-delay:.2s} .d4{animation-delay:.4s} .d6{animation-delay:.6s}
        .hi{animation:imgZoom 2s cubic-bezier(0.16,1,0.3,1) forwards}
        .gl{background:linear-gradient(90deg,#16a34a,#c9a84c,#16a34a);background-size:200% auto;animation:shimmer 3s linear infinite}

        /* Application card */
        .app-card { transition: transform .42s cubic-bezier(0.16,1,0.3,1), box-shadow .42s cubic-bezier(0.16,1,0.3,1); cursor:pointer; }
        .app-card:hover { transform:translateY(-5px); box-shadow:0 24px 56px rgba(0,0,0,0.12); }
        .app-card .card-img img { transition:transform .65s cubic-bezier(0.16,1,0.3,1),filter .5s; }
        .app-card:hover .card-img img { transform:scale(1.06); filter:grayscale(0%) brightness(0.88) !important; }
        .app-card .card-arrow { transition:transform .35s cubic-bezier(0.16,1,0.3,1),color .3s; }
        .app-card:hover .card-arrow { transform:translateX(5px); color:#16a34a; }
        .app-card .card-bar { transition:width .5s cubic-bezier(0.16,1,0.3,1); }
        .app-card:hover .card-bar { width:52px !important; }

        /* Detail panel */
        .detail-panel { animation:slideUp .45s cubic-bezier(0.22,1,0.36,1) both; }

        /* Use chip */
        .use-chip { transition:background .22s,border-color .22s,color .22s; }
        .use-chip:hover { background:#f0fdf4; border-color:#16a34a; color:#15803d; }

        /* Stat box */
        .stat-box::before { content:''; position:absolute; top:0; left:0; right:0; height:3px; background:linear-gradient(90deg,#16a34a,#c9a84c); transform:scaleX(0); transform-origin:left; transition:transform .5s cubic-bezier(0.16,1,0.3,1); }
        .stat-box:hover::before { transform:scaleX(1); }
        .stat-box { position:relative; transition:background .3s; }
        .stat-box:hover { background:#f0fdf4; }

        /* Product pill */
        .prod-pill { transition:background .22s,border-color .22s,color .22s; }
        .prod-pill:hover { background:#15803d; color:#fff; border-color:#15803d; }

        /* Marquee */
        .mq { animation: shimmer 0s; }
        @keyframes mScroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .mq-track { animation:mScroll 28s linear infinite; }
      `}</style>

      <Header />

      {/* ══════════════════════════════════════════
          01 — HERO  (dark full-bleed image — premium)
      ══════════════════════════════════════════ */}
      <section className="relative w-full" style={{ height:"58vh", minHeight:420, maxHeight:650 }}>
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&q=92"
            className="w-full h-full object-cover hi"
            alt="Applications"
            style={{ objectPosition:"center 40%" }}
          />
          <div className="absolute inset-0" style={{ background:"linear-gradient(105deg,rgba(4,12,6,0.9) 0%,rgba(4,12,6,0.65) 50%,rgba(4,12,6,0.3) 100%)" }} />
          <div className="absolute inset-0" style={{ background:"linear-gradient(to top,rgba(0,0,0,0.5) 0%,transparent 55%)" }} />
          <div className="absolute inset-0" style={{ background:"radial-gradient(ellipse at 10% 55%,rgba(22,163,74,0.2) 0%,transparent 50%)" }} />
        </div>

        {/* Streaks */}
        {[18,42,66,85].map((l,i)=>(
          <div key={i} className="absolute top-0 bottom-0 z-10 pointer-events-none"
            style={{ left:`${l}%`, width:1, background:"linear-gradient(to bottom,transparent,rgba(34,197,94,0.11),transparent)", animation:`lStreak ${3.5+i*.6}s ease-in-out infinite ${i*1.0}s` }} />
        ))}

        {/* Breadcrumb */}
        <div className="absolute top-24 right-10 z-20 flex items-center gap-2">
          <span className="text-white/40 text-xs tracking-widest uppercase font-light">Home</span>
          <span className="text-white/25 text-xs">/</span>
          <span className="text-green-400 text-xs tracking-widest uppercase font-light">Applications</span>
        </div>

        {/* Content */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end px-8 md:px-16 lg:px-24 pb-14">
          <p className="text-white/45 text-xs tracking-widest uppercase font-light mb-3 fu">— Applications</p>
          <h1 className="text-white font-light leading-none tracking-tight mb-4 fu d2"
            style={{ fontSize:"clamp(2.6rem,5.5vw,5.2rem)" }}>
            Where our polymers<br/>
            <span style={{ fontFamily:"Georgia,serif", fontStyle:"italic", color:"#4ade80" }}>go to work</span>
          </h1>
          <p className="text-white/55 font-light leading-relaxed fu d4"
            style={{ fontSize:"0.95rem", maxWidth:520, lineHeight:1.75 }}>
            Conducting polymers find application in a large variety of areas due to their conductivity and redox properties — from anticorrosion paint and EMI shielding to RADAR absorbing materials, sensors and supercapacitors.
          </p>
          <div className="flex items-center gap-4 mt-7 fu d6">
            <a href="#applications"
              className="inline-block px-7 py-3 text-white font-medium text-xs tracking-widest uppercase hover:opacity-90 transition-opacity"
              style={{ background:"#15803d" }}>
              Explore All
            </a>
            <a href="/contact"
              className="inline-block px-6 py-3 text-white font-light text-xs tracking-widest uppercase border border-white/28 hover:border-white/60 transition-colors">
              Request Info
            </a>
          </div>
        </div>
        <div className="absolute bottom-5 right-10 z-20 flex flex-col items-center gap-1.5 opacity-32">
          <span className="text-white text-xs tracking-widest uppercase font-light">Scroll</span>
          <span className="block w-px h-8 bg-white/65" style={{ animation:"pulseW 2s ease-in-out infinite" }} />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          02 — MARQUEE STRIP
      ══════════════════════════════════════════ */}
      <div style={{ background:"#15803d", padding:"12px 0", overflow:"hidden" }}>
        <div className="mq-track" style={{ display:"flex", whiteSpace:"nowrap" }}>
          {["Corrosion Protection","EMI Shielding","Permanent Antistatic","Electroluminescence","Solid Electrolyte Capacitors",
            "RADAR Absorbing","Sensors","Supercapacitors","Membrane Technology","Catalysis",
            "Corrosion Protection","EMI Shielding","Permanent Antistatic","Electroluminescence","Solid Electrolyte Capacitors",
            "RADAR Absorbing","Sensors","Supercapacitors","Membrane Technology","Catalysis"].map((t,i)=>(
            <span key={i} style={{ display:"inline-flex", alignItems:"center", gap:24, padding:"0 24px", color:"rgba(255,255,255,0.7)", fontSize:"0.78rem", fontStyle:"italic", letterSpacing:"0.04em" }}>
              {t}
              <span style={{ color:"#bbf7d0", fontSize:"0.45rem" }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          03 — INTRO SECTION  (Ormecon intro text)
      ══════════════════════════════════════════ */}
      <section className="w-full bg-white py-20 md:py-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-14 lg:gap-28 items-center">

            {/* Left — intro text */}
            <div className="lg:w-1/2">
              <Reveal>
                <p className="text-xs tracking-widest uppercase font-medium text-gray-400 mb-3">The Science</p>
                <h2 className="font-light text-gray-900 leading-tight tracking-tight mb-4"
                  style={{ fontSize:"clamp(1.8rem,3.5vw,2.8rem)" }}>
                  The broad reach of<br/>
                  <strong className="font-bold">conducting polymers</strong>
                </h2>
                <div className="w-8 h-0.5 mb-5" style={{ background:"linear-gradient(90deg,#16a34a,#c9a84c)" }} />
                <p className="text-sm text-gray-500 leading-7 font-light mb-4">
                  Conducting polymers find application in a large variety of areas which is due to their conductivity and redox properties. Some of the interesting application areas are anticorrosion paint, Antistatic, EMI Shielding, RADAR absorbing materials, Catalysis, Supercapacitor, Sensors, Membrane etc.
                </p>
                <p className="text-sm text-gray-500 leading-7 font-light">
                  Interest in research on conducting polymers has grown after the 2000 Nobel Prize in Chemistry, and people found the way to make polymer processable — opening the door to practical, scalable commercial applications across virtually every industrial sector.
                </p>
              </Reveal>
            </div>

            {/* Right — image with floating stat */}
            <Reveal from="right" delay={120} className="lg:w-1/2 relative">
              <div className="relative overflow-hidden" style={{ height:360 }}>
                <img
                  src="https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&q=90"
                  alt="Polymer science"
                  className="w-full h-full object-cover"
                  style={{ filter:"brightness(0.85) saturate(0.82)", transition:"transform .65s cubic-bezier(0.16,1,0.3,1)" }}
                />
                <div className="absolute inset-0 h-0.5 top-0 gl" />
              </div>
              {/* Floating stat card */}
              <div className="absolute -bottom-5 -left-5 bg-white border border-gray-100 px-6 py-5 hidden md:block"
                style={{ boxShadow:"0 8px 32px rgba(0,0,0,0.1)", minWidth:200 }}>
                <div className="font-light text-gray-900 leading-none mb-1"
                  style={{ fontFamily:"Georgia,serif", fontSize:"2.8rem", letterSpacing:"-0.02em" }}>
                  2000
                </div>
                <div className="text-xs tracking-widest uppercase text-green-600 font-medium leading-relaxed">
                  Nobel Prize<br/>in Chemistry
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          04 — STATS ROW
      ══════════════════════════════════════════ */}
      <section className="w-full border-t border-b border-gray-100" style={{ background:"#f9fafb" }}>
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-gray-200">
            {stats.map(({ num, suf, label, sub }, i) => (
              <Reveal key={i} delay={i * 70}>
                <div className="stat-box py-10 px-6">
                  <p className="text-xs tracking-widest uppercase text-gray-400 font-medium mb-2">{label}</p>
                  <div className="font-light text-gray-900 leading-none mb-3"
                    style={{ fontSize:"clamp(2.4rem,4.5vw,3.8rem)", letterSpacing:"-0.02em" }}>
                    {num}<span style={{ fontSize:"0.55em", marginLeft:2 }}>{suf}</span>
                  </div>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">{sub}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          05 — APPLICATION CARDS GRID  (Ormecon 5-tile style, premium Northvolt cards)
      ══════════════════════════════════════════ */}
      <section id="applications" className="w-full bg-white py-20 md:py-28 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <p className="text-xs tracking-widest uppercase font-medium text-gray-400 mb-2">Application Areas</p>
                <h2 className="font-light text-gray-900 tracking-tight"
                  style={{ fontSize:"clamp(1.7rem,3.2vw,2.6rem)" }}>
                  5 core <strong className="font-bold">application areas</strong>
                </h2>
              </div>
              <p className="text-sm text-gray-400 font-light max-w-xs">
                Each application leverages the unique electrochemical properties of Polyaniline.
              </p>
            </div>
          </Reveal>

          {/* 5-tile grid: 3 top + 2 bottom */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            {applications.slice(0, 3).map((app, i) => (
              <Reveal key={app.id} delay={i * 80}>
                <AppCard app={app} onClick={() => setActiveApp(activeApp?.id === app.id ? null : app)} />
              </Reveal>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {applications.slice(3).map((app, i) => (
              <Reveal key={app.id} delay={i * 80}>
                <AppCard app={app} onClick={() => setActiveApp(activeApp?.id === app.id ? null : app)} />
              </Reveal>
            ))}
          </div>

          {/* Inline detail panel — expands below clicked card */}
          {activeApp && (
            <div className="mt-8 detail-panel border border-gray-100 bg-white"
              style={{ boxShadow:"0 4px 32px rgba(0,0,0,0.07)" }}>
              <DetailPanel app={activeApp} onClose={() => setActiveApp(null)} />
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          06 — FULL-BLEED FEATURE  (Northvolt "Powered by" style)
      ══════════════════════════════════════════ */}
      <div className="relative w-full">
        <div className="relative overflow-hidden" style={{ height:"48vh", minHeight:320, maxHeight:540 }}>
          <img
            src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1800&q=90"
            alt="Industrial application"
            className="w-full h-full object-cover"
            style={{ filter:"brightness(0.55) saturate(0.6)", objectPosition:"center 45%" }}
          />
          <div className="absolute inset-0" style={{ background:"linear-gradient(to right,rgba(0,0,0,0.55) 0%,transparent 55%)" }} />
          <div className="absolute inset-0" style={{ background:"radial-gradient(ellipse at 10% 60%,rgba(22,163,74,0.2) 0%,transparent 50%)" }} />
        </div>
        {/* Floating white card */}
        <Reveal from="right">
          <div className="absolute bg-white px-10 py-11"
            style={{ top:"50%", transform:"translateY(-50%)", right:0, width:"100%", maxWidth:500, boxShadow:"0 8px 48px rgba(0,0,0,0.12)" }}>
            <p className="text-xs tracking-widest uppercase font-medium text-gray-400 mb-3">Industrial Impact</p>
            <h3 className="font-light text-gray-900 leading-tight tracking-tight mb-4"
              style={{ fontSize:"clamp(1.6rem,2.8vw,2.3rem)" }}>
              Protecting the world's<br/>
              <strong className="font-bold">critical infrastructure</strong>
            </h3>
            <div className="w-7 h-0.5 mb-5" style={{ background:"linear-gradient(90deg,#16a34a,#c9a84c)" }} />
            <p className="text-sm text-gray-500 leading-7 font-light mb-5">
              Komstruk's corrosion protection technology — rooted in Dr. Wessling's pioneering research — is the world's most powerful anticorrosion polymer principle. It actively passivates metal surfaces rather than simply forming a barrier.
            </p>
            <a href="/contact" className="text-sm font-medium text-gray-900 underline underline-offset-4 hover:text-green-600 transition-colors">
              Talk to our experts →
            </a>
          </div>
        </Reveal>
        <div style={{ height:160 }} />
      </div>

      {/* ══════════════════════════════════════════
          07 — ADDITIONAL APPLICATION AREAS  (Ormecon extras)
      ══════════════════════════════════════════ */}
      <section className="w-full border-t border-gray-100 py-20 md:py-28 px-8 md:px-16 lg:px-24"
        style={{ background:"#f9fafb" }}>
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-12">
            <p className="text-xs tracking-widest uppercase font-medium text-gray-400 mb-2">Further Areas</p>
            <h2 className="font-light text-gray-900 tracking-tight"
              style={{ fontSize:"clamp(1.6rem,3vw,2.4rem)" }}>
              More application <strong className="font-bold">frontiers</strong>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background:"#e5e7eb" }}>
            {[
              {
                icon:"📡",
                img:"https://images.unsplash.com/photo-1516849677043-ef67c9557e16?w=500&q=85",
                title:"RADAR Absorbing Materials",
                desc:"Polyaniline-based coatings can be engineered to absorb microwave and radar frequencies — enabling stealth and signal management applications in defence, aerospace and telecommunications infrastructure.",
              },
              {
                icon:"⚡",
                img:"https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=500&q=85",
                title:"Supercapacitors",
                desc:"The high pseudocapacitance of Polyaniline makes it an excellent electrode material for supercapacitors — offering rapid charge/discharge cycling, high power density and long cycle life in energy storage systems.",
              },
              {
                icon:"🧪",
                img:"https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=500&q=85",
                title:"Sensors & Actuators",
                desc:"The sensitivity of Polyaniline's conductivity to chemical environment makes it ideal for gas sensors, pH sensors, humidity sensors and electrochemical biosensors across healthcare, environmental and industrial monitoring.",
              },
              {
                icon:"🔬",
                img:"https://images.unsplash.com/photo-1576086213369-97a306d36557?w=500&q=85",
                title:"Catalysis",
                desc:"Polyaniline can act as both a catalyst support and an active catalyst in various chemical processes — including oxidation reactions, acid-base catalysis and electrocatalysis for fuel cell applications.",
              },
              {
                icon:"💧",
                img:"https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&q=85",
                title:"Membrane Technology",
                desc:"Conducting polymer membranes exhibit unique permeation selectivity and can be electrochemically switched between open and closed states — enabling smart filtration, gas separation and ion exchange systems.",
              },
              {
                icon:"🔋",
                img:"https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500&q=85",
                title:"Battery Electrodes",
                desc:"Polyaniline's high theoretical capacity, fast redox kinetics and chemical stability make it a promising electrode material for rechargeable lithium-ion, zinc-ion and organic batteries.",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 55}>
                <div className="bg-white overflow-hidden group cursor-default"
                  style={{ transition:"box-shadow .35s", boxShadow:"none" }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.08)"}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden" style={{ height:180 }}>
                    <img src={item.img} alt={item.title}
                      className="w-full h-full object-cover"
                      style={{ filter:"grayscale(30%) brightness(0.75)", transition:"transform .6s cubic-bezier(0.16,1,0.3,1),filter .5s" }}
                    />
                    <div className="absolute inset-0" style={{ background:"linear-gradient(to top,rgba(0,0,0,0.55),transparent 55%)" }} />
                    <div className="absolute top-0 left-0 right-0 h-0.5 gl" />
                    <span className="absolute top-3 right-3 text-xl">{item.icon}</span>
                    <span className="absolute bottom-3 left-4 text-white/45 text-xs tracking-widest uppercase font-light">Komstruk</span>
                  </div>
                  <div className="p-5 border-t border-gray-100">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-800 mb-2">{item.title}</p>
                    <p className="text-xs text-gray-400 font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          08 — CTA
      ══════════════════════════════════════════ */}
      <section className="w-full relative overflow-hidden px-8 md:px-16 lg:px-24 py-20 md:py-24">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1800&q=85"
            alt=""
            className="w-full h-full object-cover"
            style={{ objectPosition:"center 50%", filter:"brightness(0.15) saturate(0.4)" }}
          />
          <div className="absolute inset-0" style={{ background:"rgba(21,128,61,0.88)" }} />
        </div>
        {/* Watermark */}
        <div className="absolute right-12 top-0 bottom-0 z-10 flex items-center pointer-events-none select-none"
          style={{ fontFamily:"Georgia,serif", fontSize:"22rem", fontWeight:900, color:"rgba(255,255,255,0.05)", lineHeight:1 }}>K</div>

        <div className="max-w-7xl mx-auto relative z-20 flex flex-col md:flex-row items-center justify-between gap-10">
          <Reveal from="left">
            <p className="text-white/45 text-xs tracking-widest uppercase font-light mb-4">Get In Touch</p>
            <h3 className="font-light text-white leading-tight tracking-tight"
              style={{ fontSize:"clamp(1.8rem,3.5vw,2.9rem)" }}>
              Found your<br/>
              <em className="not-italic" style={{ fontFamily:"Georgia,serif", fontStyle:"italic", color:"#fde68a" }}>application?</em>
            </h3>
          </Reveal>
          <Reveal from="right">
            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
              <a href="/contact"
                className="inline-block px-10 py-4 bg-white font-bold text-xs tracking-widest uppercase text-center hover:bg-gray-50 transition-colors"
                style={{ color:"#15803d" }}>
                Request a Sample
              </a>
              <a href="mailto:info@komstruk.co"
                className="inline-block px-10 py-4 border border-white/30 text-white font-light text-xs tracking-widest uppercase text-center hover:border-white/65 transition-colors">
                Email Our Experts
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      
    </main>
  );
}

/* ─── AppCard component ───────────────────────────────── */
function AppCard({ app, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      className="app-card border border-gray-100 overflow-hidden bg-white"
      style={{
        boxShadow: hov ? "0 24px 56px rgba(0,0,0,0.12)" : "0 2px 12px rgba(0,0,0,0.05)",
        transform: hov ? "translateY(-5px)" : "translateY(0)",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
    >
      {/* Image */}
      <div className="card-img relative overflow-hidden" style={{ height:220 }}>
        <img
          src={app.img}
          alt={app.title}
          className="w-full h-full object-cover"
          style={{ filter:"grayscale(20%) brightness(0.78)" }}
        />
        <div className="absolute inset-0" style={{ background:"linear-gradient(to top,rgba(0,0,0,0.6) 0%,transparent 55%)" }} />
        {/* Shimmer top bar */}
        <div className="absolute top-0 left-0 right-0 h-0.5 gl" />
        {/* Tag badge */}
        <div className="absolute top-3 left-3">
          <span className="text-white text-xs font-medium tracking-widest uppercase px-2.5 py-1"
            style={{ background: hov ? app.tagColor : "rgba(4,12,6,0.72)", backdropFilter:"blur(6px)", border:"1px solid rgba(255,255,255,0.2)", transition:"background .3s" }}>
            {app.tag}
          </span>
        </div>
        {/* Bottom title */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-semibold text-base leading-tight mb-0.5"
            style={{ fontFamily:"Georgia,serif" }}>
            {app.title}
          </h3>
          <p className="text-white/55 text-xs font-light">{app.subtitle}</p>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="card-bar h-0.5 mb-4"
          style={{ width:22, background:"linear-gradient(90deg,#16a34a,#c9a84c)" }} />
        <p className="text-sm text-gray-500 font-light leading-7 mb-4 line-clamp-3"
          style={{ display:"-webkit-box", WebkitLineClamp:3, WebkitBoxOrient:"vertical", overflow:"hidden" }}>
          {app.desc}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {app.uses.slice(0,2).map(u => (
              <span key={u} className="text-xs text-gray-400 font-light px-2 py-1 border border-gray-200">{u}</span>
            ))}
            {app.uses.length > 2 && (
              <span className="text-xs text-green-600 font-medium px-2 py-1">+{app.uses.length-2} more</span>
            )}
          </div>
          <span className="card-arrow text-gray-400 text-lg font-light ml-3 flex-shrink-0">→</span>
        </div>
      </div>
    </div>
  );
}

/* ─── DetailPanel component ───────────────────────────── */
function DetailPanel({ app, onClose }) {
  return (
    <div className="flex flex-col lg:flex-row" style={{ minHeight:420 }}>
      {/* Image left */}
      <div className="lg:w-2/5 relative overflow-hidden flex-shrink-0" style={{ minHeight:280 }}>
        <img
          src={app.heroImg}
          alt={app.title}
          className="w-full h-full object-cover"
          style={{ filter:"brightness(0.82) saturate(0.8)" }}
        />
        <div className="absolute inset-0" style={{ background:"linear-gradient(to right,transparent,rgba(255,255,255,0.08))" }} />
        <div className="absolute top-0 left-0 right-0 h-0.5 gl" />
        {/* Close on mobile */}
        <button onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/90 text-gray-700 text-xs font-bold hover:bg-white transition-colors lg:hidden"
          style={{ borderRadius:2 }}>
          ✕
        </button>
      </div>

      {/* Content right */}
      <div className="lg:w-3/5 p-8 lg:p-12 relative">
        {/* Close button desktop */}
        <button onClick={onClose}
          className="absolute top-6 right-6 w-8 h-8 items-center justify-center border border-gray-200 text-gray-500 text-xs font-bold hover:bg-gray-50 transition-colors hidden lg:flex"
          style={{ borderRadius:2 }}>
          ✕
        </button>

        <p className="text-xs tracking-widest uppercase font-medium text-green-600 mb-2">{app.tag}</p>
        <h3 className="font-light text-gray-900 leading-tight tracking-tight mb-2"
          style={{ fontFamily:"Georgia,serif", fontSize:"clamp(1.5rem,2.8vw,2.2rem)" }}>
          {app.title}
        </h3>
        <p className="text-sm text-green-700 font-light mb-5">{app.subtitle}</p>
        <div className="w-7 h-0.5 mb-5" style={{ background:"linear-gradient(90deg,#16a34a,#c9a84c)" }} />

        <p className="text-sm text-gray-500 leading-7 font-light mb-5">{app.detail}</p>

        {/* Use cases */}
        <div className="mb-5">
          <p className="text-xs tracking-widest uppercase font-medium text-gray-400 mb-3">Use Cases</p>
          <div className="flex flex-wrap gap-2">
            {app.uses.map(u => (
              <span key={u} className="use-chip text-xs font-light text-gray-600 px-3 py-1.5 border border-gray-200 cursor-default">
                {u}
              </span>
            ))}
          </div>
        </div>

        {/* Relevant products */}
        <div>
          <p className="text-xs tracking-widest uppercase font-medium text-gray-400 mb-3">Relevant Products</p>
          <div className="flex flex-wrap gap-2">
            {app.products.map(p => (
              <a key={p} href="/products"
                className="prod-pill text-xs font-medium text-green-700 px-3 py-1.5 border border-green-200 cursor-pointer">
                {p}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}