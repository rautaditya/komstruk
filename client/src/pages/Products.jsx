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
  const tr = { bottom:"translateY(26px)", left:"translateX(-26px)", right:"translateX(26px)", scale:"scale(0.96)" };
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : tr[from],
      transition: `opacity 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

/* ─── Product data ───────────────────────────────────── */
const products = [
  {
    id: "emeraldine-salt",
    slug: "Polyaniline Emeraldine Salt",
    tagline: "The foundational conductive polymer",
    img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=900&q=92",
    tags: ["Automotive", "Industrial", "Coatings"],
    description: "Polyaniline Emeraldine Salt is the protonated, electrically conductive form of Polyaniline — one of the most studied and commercially promising conductive polymers. Conducting Polymers, such as Polyaniline, have stimulated the interest of material scientists around the world for their potential game-changing industrial and commercial applications.",
    detail: "Conducting Polymers are completely insoluble in water and organic solvents because of the extremely high charge density link with the polymeric chain. Also, they are extremely hard to disperse due to their extraordinary high surface tension — by far the highest of all known organic materials, also much higher than water. It was therefore important to develop techniques by which they can be processed for various industrial and commercial applications, ensuring adequate dispersion of the conducting polymer for use in various media.",
    specs: [
      { label:"Form",       value:"Fine powder" },
      { label:"Conductivity", value:"1–100 S/cm" },
      { label:"Purity",     value:">98%" },
      { label:"Particle size", value:"<100 nm (dispersed)" },
    ],
    applications: ["Anticorrosion coatings", "Electrostatic dissipation", "Sensors & actuators", "Printed electronics"],
  },
  {
    id: "emeraldine-base",
    slug: "Polyaniline Emeraldine Base",
    tagline: "The deprotonated polymer form",
    img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=900&q=92",
    tags: ["Research", "Electronics", "Specialty"],
    description: "Polyaniline Emeraldine Base is the undoped, semiconducting form of Polyaniline. It serves as the starting material for producing the conductive Emeraldine Salt form and is highly valued in research and specialty coating applications where controlled doping is required.",
    detail: "The Emeraldine Base form allows formulators and researchers to precisely control the degree of protonation, and therefore the conductivity profile of the final material. Its solubility in select solvents makes it more processable than the salt form, enabling thin film deposition, blending with thermoplastics, and integration into composite systems.",
    specs: [
      { label:"Form",         value:"Dark blue powder" },
      { label:"Solubility",   value:"NMP, DMAc, DMSO" },
      { label:"Purity",       value:">97%" },
      { label:"Mn",           value:"~20,000 g/mol" },
    ],
    applications: ["Thin film coatings", "Polymer blends", "Electrochromic devices", "Research applications"],
  },
  {
    id: "dissipo-wr",
    slug: "DISSIPO-WR",
    tagline: "Water-reducible anticorrosion solution",
    img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=900&q=92",
    tags: ["Anticorrosion", "Water-based", "Primers"],
    description: "DISSIPO-WR is Komstruk's flagship water-reducible conductive polymer dispersion — engineered for direct incorporation into waterborne coating systems. It delivers outstanding anticorrosion performance without the environmental burden of solvent-based systems.",
    detail: "DISSIPO-WR leverages Dr. Wessling's pioneering work in conductive polymer dispersion technology, which demonstrated that Polyaniline can be processed at nanoscopic particle sizes of around 100 nm — enabling ultrafine, stable dispersions in aqueous media. The result is a primer additive that actively protects metal substrates by forming a passivating layer at the metal interface, significantly extending the service life of coated structures.",
    specs: [
      { label:"Type",          value:"Aqueous dispersion" },
      { label:"Particle size", value:"~100 nm" },
      { label:"pH",            value:"4.5 – 5.5" },
      { label:"Solid content", value:"~5 wt%" },
    ],
    applications: ["Steel & iron protection", "Marine coatings", "Infrastructure primers", "OEM industrial finishes"],
  },
  {
    id: "masterbatches",
    slug: "Polyaniline Masterbatches",
    tagline: "Thermoplastic-compatible dispersion system",
    img: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=900&q=92",
    tags: ["Plastics", "Masterbatch", "ESD"],
    description: "Komstruk's Polyaniline Masterbatches are a novel Thermoplastic Resin Polyaniline polymer blend system — designed to be easy to handle and directly incorporate into standard thermoplastic processing equipment, including extrusion and injection moulding.",
    detail: "The masterbatch matrix — a thermoplastic resin — is soluble in solvents like aromatics, ketones, esters, glycol ethers, glycol ether acetates, alcohols etc., allowing use of an ultrafine dispersion of the Polyaniline in various solvents and other media. In this masterbatch, Polyaniline is present in the form of nanoscopic particles of around 100 nm size. This allows for easy incorporation of Polyaniline into multiple solvent systems and other polymer compositions. In many applications, along with improved dispersion, the conductivity is also increased.",
    specs: [
      { label:"Matrix",        value:"Thermoplastic resin" },
      { label:"PANI content",  value:"5–20 wt%" },
      { label:"Particle size", value:"~100 nm" },
      { label:"Form",          value:"Pellets / granules" },
    ],
    applications: ["ESD packaging", "Conductive plastics", "Films & sheets", "Automotive components"],
  },
  {
    id: "anticorrosion-primers",
    slug: "Anticorrosion Primers",
    tagline: "Ready-to-use protective coatings",
    img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=900&q=92",
    tags: ["Primers", "Protective", "Ready-to-use"],
    description: "Komstruk's Anticorrosion Primers are formulated, ready-to-apply coating products incorporating our proprietary conductive polymer technology. Designed for direct use on metal substrates, they deliver active corrosion protection that outperforms conventional chromate and zinc-based primer systems.",
    detail: "Our anticorrosion primers rely on the unique electrochemical mechanism of Polyaniline, which actively passivates the metal surface rather than merely providing a barrier. Independent studies, including the foundational work of Dr. Bernhard Wessling, have confirmed that Polyaniline-based primers provide superior long-term protection on steel, aluminium and other substrates — particularly in aggressive marine, industrial and infrastructure environments.",
    specs: [
      { label:"Technology",   value:"Conductive polymer" },
      { label:"Substrates",   value:"Steel, aluminium, alloys" },
      { label:"VOC",          value:"Low / zero VOC options" },
      { label:"DFT",          value:"15–25 µm (recommended)" },
    ],
    applications: ["Bridges & infrastructure", "Marine vessels", "Oil & gas pipelines", "Industrial equipment"],
  },
];

/* ════════════════════════════════════════════════════════
   PRODUCTS PAGE
════════════════════════════════════════════════════════ */
export default function Products() {
  const [active, setActive] = useState("emeraldine-salt");
  const [tab, setTab]       = useState("overview"); // overview | specs | applications
  const activeProduct = products.find(p => p.id === active);

  return (
    <main className="relative w-full overflow-x-hidden bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
        * { font-family:'Roboto',sans-serif !important; }

        @keyframes fadeUp   { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes imgZoom  { from{transform:scale(1.06)} to{transform:scale(1)} }
        @keyframes shimmer  { from{background-position:-200% center} to{background-position:200% center} }
        @keyframes pulseW   { 0%,100%{opacity:.3} 50%{opacity:.7} }
        @keyframes slideIn  { from{opacity:0;transform:translateX(16px)} to{opacity:1;transform:translateX(0)} }

        .fu{animation:fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) both}
        .d2{animation-delay:.2s}.d4{animation-delay:.4s}.d6{animation-delay:.6s}
        .hi{animation:imgZoom 1.9s cubic-bezier(0.16,1,0.3,1) forwards}
        .gl{background:linear-gradient(90deg,#16a34a,#c9a84c,#16a34a);background-size:200% auto;animation:shimmer 3s linear infinite}

        /* Nav pill */
        .pnav-item { transition:all .28s cubic-bezier(0.16,1,0.3,1); cursor:pointer; }
        .pnav-item:hover { border-color:rgba(22,163,74,0.4) !important; }
        .pnav-item.active { border-color:#16a34a !important; background:#f0fdf4; }
        .pnav-item.active .pnav-dot { background:#16a34a !important; }
        .pnav-item.active .pnav-name { color:#15803d !important; }

        /* Product panel */
        .prod-panel { animation: slideIn .38s cubic-bezier(0.22,1,0.36,1) both; }

        /* Image hover */
        .iz { overflow:hidden; }
        .iz img { transition:transform .65s cubic-bezier(0.16,1,0.3,1),filter .5s; }
        .iz:hover img { transform:scale(1.04); }

        /* Tab button */
        .tab-btn { transition:color .22s,border-color .22s; }
        .tab-btn.active { color:#111 !important; border-bottom-color:#16a34a !important; }

        /* Spec row */
        .spec-row { transition:background .2s; }
        .spec-row:hover { background:#f0fdf4; }

        /* App chip */
        .app-chip { transition:background .22s,border-color .22s,color .22s; }
        .app-chip:hover { background:#f0fdf4; border-color:#16a34a; color:#15803d; }

        /* CTA button */
        .cta-btn { transition:opacity .25s,transform .25s; }
        .cta-btn:hover { opacity:.9; transform:translateY(-1px); }

        /* card-lift */
        .cl { transition:transform .35s ease,box-shadow .35s ease; }
        .cl:hover { transform:translateY(-3px); box-shadow:0 16px 40px rgba(0,0,0,0.09); }
      `}</style>

      <Header />

      {/* ══════════════════════════════════════
          01 — HERO  (compact, white bg, typographic — Northvolt Products style)
      ══════════════════════════════════════ */}
      <section className="relative w-full pt-24 pb-14 px-8 md:px-16 lg:px-24"
        style={{ borderBottom:"1px solid #e5e7eb", overflow:"hidden" }}>

        {/* Full-bleed background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1800&q=88"
            alt=""
            className="w-full h-full object-cover"
            style={{ objectPosition:"center 40%", filter:"brightness(0.07) saturate(0.4)" }}
          />
          {/* Green radial glow over dark image */}
          <div className="absolute inset-0" style={{ background:"radial-gradient(ellipse at 12% 60%,rgba(22,163,74,0.22) 0%,transparent 55%)" }} />
          {/* Subtle dot grid */}
          <div className="absolute inset-0" style={{
            backgroundImage:"radial-gradient(circle,rgba(255,255,255,0.06) 1px,transparent 1px)",
            backgroundSize:"30px 30px",
          }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-10">
            <span className="text-xs tracking-widest uppercase font-light" style={{color:"rgba(255,255,255,0.4)"}}>Home</span>
            <span className="text-xs" style={{color:"rgba(255,255,255,0.25)"}}>/ </span>
            <span className="text-green-400 text-xs tracking-widest uppercase font-light">Products</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div style={{ maxWidth:680 }}>
              <p className="text-xs tracking-widest uppercase font-medium fu mb-4" style={{color:"rgba(74,222,128,0.85)"}}>— Our Products</p>
              <h1 className="font-light leading-tight tracking-tight mb-5 fu d2"
                style={{ fontSize:"clamp(2.6rem,5.5vw,5rem)", color:"#fff" }}>
                Conductive polymer<br/>
                <span style={{ fontFamily:"Georgia,serif", fontStyle:"italic", color:"#4ade80" }}>
                  starter kit
                </span>
              </h1>
              <p className="font-light leading-relaxed fu d4"
                style={{ fontSize:"1rem", maxWidth:520, lineHeight:1.75, color:"rgba(255,255,255,0.6)" }}>
                From raw Polyaniline forms to complete anticorrosion coating systems — and everything in between — we offer science-backed polymer solutions to enable cleaner, longer-lasting industrial infrastructure.
              </p>
            </div>

            {/* Quick nav tabs */}
            <div className="flex items-center gap-1 p-1 self-start lg:self-end fu d6"
              style={{ borderRadius:2, border:"1px solid rgba(255,255,255,0.15)", background:"rgba(255,255,255,0.06)" }}>
              {["Overview","Products","Applications"].map(t=>(
                <button key={t}
                  className="px-4 py-2 text-xs font-medium tracking-wide transition-all duration-200"
                  style={{ borderRadius:2, background:t==="Products"?"rgba(22,163,74,0.9)":"transparent", color:t==="Products"?"#fff":"rgba(255,255,255,0.5)" }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          02 — CONDUCTIVE POLYMER DISPERSION  (intro — Ormecon content)
      ══════════════════════════════════════ */}
      <section className="w-full bg-white py-20 md:py-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="text-xs tracking-widest uppercase font-medium text-gray-400 mb-3">The Science</p>
            <h2 className="font-light text-gray-900 leading-tight tracking-tight mb-3"
              style={{ fontSize:"clamp(1.8rem,3.8vw,3rem)" }}>
              Conductive Polymer Dispersion
            </h2>
            <div className="w-8 h-0.5 mb-8" style={{ background:"linear-gradient(90deg,#16a34a,#c9a84c)" }} />
          </Reveal>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
            {/* Chemistry diagram / image left */}
            <Reveal from="left" className="lg:w-5/12 iz flex-shrink-0">
              <div className="border border-gray-100 bg-gray-50 flex items-center justify-center"
                style={{ height:260, position:"relative", overflow:"hidden" }}>
                {/* Stylised molecular structure visual */}
                <svg viewBox="0 0 440 160" width="92%" height="auto" style={{ maxWidth:400 }}>
                  {/* Main chain */}
                  {[0,1,2,3].map(i=>(
                    <g key={i} transform={`translate(${i*110},0)`}>
                      {/* Benzene ring */}
                      <polygon points="30,20 50,10 70,20 70,40 50,50 30,40"
                        fill="none" stroke="#d1d5db" strokeWidth="1.5" />
                      {/* N connectors */}
                      <line x1="70" y1="30" x2="80" y2="30" stroke="#16a34a" strokeWidth="1.5"/>
                      <text x="82" y="34" fontSize="9" fill="#16a34a" fontWeight="600">N</text>
                      {/* H atoms */}
                      {i%2===0 && <>
                        <text x="82" y="22" fontSize="7" fill="#9ca3af">H</text>
                        <line x1="85" y1="29" x2="85" y2="24" stroke="#9ca3af" strokeWidth="1"/>
                        <text x="86" y="47" fontSize="7" fill="#9ca3af">H</text>
                        <line x1="85" y1="35" x2="85" y2="43" stroke="#9ca3af" strokeWidth="1"/>
                        <text x="70" y="8"  fontSize="7" fill="#ef4444">A⁻</text>
                      </>}
                      {/* Next ring connector */}
                      {i<3 && <line x1="94" y1="30" x2="110" y2="30" stroke="#6b7280" strokeWidth="1.2"/>}
                    </g>
                  ))}
                  {/* Bracket open/close */}
                  <text x="4"  y="90" fontSize="52" fill="#d1d5db" fontWeight="300">[</text>
                  <text x="415" y="90" fontSize="52" fill="#d1d5db" fontWeight="300">]</text>
                  <text x="424" y="115" fontSize="10" fill="#9ca3af" fontStyle="italic">n</text>
                  {/* Label */}
                  <text x="50" y="148" fontSize="9" fill="#6b7280" letterSpacing="1">Polyaniline — Emeraldine Salt</text>
                </svg>
                <div className="absolute bottom-3 right-3">
                  <span className="text-xs text-gray-400 font-light tracking-wide">Molecular structure</span>
                </div>
              </div>
            </Reveal>

            {/* Text right */}
            <div className="lg:w-7/12">
              <Reveal delay={80}>
                <p className="text-sm text-gray-600 leading-7 font-light mb-4">
                  Conducting Polymers, such as Polyaniline, have stimulated the interest of material scientists around the world for their potential game-changing industrial and commercial applications.
                </p>
                <p className="text-sm text-gray-500 leading-7 font-light mb-4">
                  For understanding the structure, see the diagram above. Conducting Polymers are completely insoluble in water and organic solvents because of the extremely high charge density link with the polymeric chain. Also, they are extremely hard to disperse due to their extraordinary high surface tension — by far the highest of all known organic materials, also much higher than water.
                </p>
                <p className="text-sm text-gray-500 leading-7 font-light mb-4">
                  Hence, it was important to develop techniques by which they can be processed for various industrial and commercial applications. This involves ensuring adequate dispersion of the conducting polymer for use in various media.
                </p>
                <p className="text-sm text-gray-500 leading-7 font-light">
                  We have developed a novel Thermoplastic Resin Polyaniline polymer blend which is easy to handle: our Polyaniline Masterbatches. The masterbatch matrix is soluble in solvents like aromatics, ketones, esters, glycol ethers and alcohols — allowing an ultrafine dispersion with Polyaniline present as nanoscopic particles of around 100 nm size.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          03 — PRODUCT SELECTOR  (Northvolt alternating product rows)
      ══════════════════════════════════════ */}
      <section className="w-full border-t border-gray-100 py-0" style={{ background:"#fff" }}>

        {/* Left sidebar nav — sticky product list */}
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">

          {/* Section header */}
          <Reveal>
            <div className="py-14 border-b border-gray-100">
              <p className="text-xs tracking-widest uppercase font-medium text-gray-400 mb-2">Product Portfolio</p>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <h2 className="font-light text-gray-900 tracking-tight"
                  style={{ fontSize:"clamp(1.7rem,3.2vw,2.6rem)" }}>
                  Our complete<br/><strong className="font-bold">product range</strong>
                </h2>
                <p className="text-sm text-gray-400 font-light max-w-xs">
                  5 core polymer products — from raw materials to ready-to-apply coating systems.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Products — alternating layout like Northvolt */}
          {products.map((product, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={product.id} className="py-16 md:py-24 border-b border-gray-100 last:border-b-0">
                <Reveal>
                  <div className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} gap-12 lg:gap-20 items-center`}>

                    {/* Image — 360px consistent height */}
                    <div className="lg:w-1/2 iz w-full">
                      <div className="relative overflow-hidden" style={{ height:360 }}>
                        <img
                          src={product.img}
                          alt={product.slug}
                          className="w-full h-full object-cover"
                          style={{ filter:"brightness(0.88) saturate(0.82)",
                            transition:"transform .65s cubic-bezier(0.16,1,0.3,1),filter .5s" }}
                        />
                        {/* Shimmer top bar */}
                        <div className="absolute top-0 left-0 right-0 h-0.5 gl" />
                        {/* Tags */}
                        <div className="absolute top-4 left-4 flex gap-2">
                          {product.tags.map(tag=>(
                            <span key={tag} className="text-xs font-medium text-white px-2.5 py-1 tracking-widest uppercase"
                              style={{ background:"rgba(4,12,6,0.72)", backdropFilter:"blur(6px)", border:"1px solid rgba(34,197,94,0.3)" }}>
                              {tag}
                            </span>
                          ))}
                        </div>
                        {/* Product number */}
                        <div className="absolute bottom-4 right-4"
                          style={{ fontFamily:"Georgia,serif", fontSize:"5rem", fontWeight:900, color:"rgba(255,255,255,0.07)", lineHeight:1, userSelect:"none" }}>
                          {String(idx+1).padStart(2,"0")}
                        </div>
                      </div>
                    </div>

                    {/* Text panel */}
                    <Reveal from={isEven?"right":"left"} delay={120} className="lg:w-1/2">
                      <p className="text-xs tracking-widest uppercase font-medium text-gray-400 mb-3">
                        Product {String(idx+1).padStart(2,"0")}
                      </p>
                      <h3 className="font-light text-gray-900 leading-tight tracking-tight mb-2"
                        style={{ fontSize:"clamp(1.5rem,3vw,2.3rem)" }}>
                        {product.slug}
                      </h3>
                      <p className="font-light mb-5" style={{ fontSize:"0.95rem", color:"#16a34a" }}>
                        {product.tagline}
                      </p>
                      <div className="w-7 h-0.5 mb-5" style={{ background:"linear-gradient(90deg,#16a34a,#c9a84c)" }} />

                      {/* Description */}
                      <p className="text-sm text-gray-500 leading-7 font-light mb-5">
                        {product.description}
                      </p>

                      {/* Applications chips */}
                      <div className="flex flex-wrap gap-2 mb-7">
                        {product.applications.map(a=>(
                          <span key={a} className="app-chip text-xs font-light text-gray-600 px-3 py-1.5 border border-gray-200 cursor-default">
                            {a}
                          </span>
                        ))}
                      </div>

                      {/* Specs mini-table */}
                      <div className="border border-gray-100 mb-7" style={{ background:"#f9fafb" }}>
                        {product.specs.map((s,si)=>(
                          <div key={s.label} className="spec-row flex items-center justify-between px-4 py-2.5 border-b border-gray-100 last:border-b-0">
                            <span className="text-xs text-gray-400 font-medium tracking-wide uppercase">{s.label}</span>
                            <span className="text-xs text-gray-700 font-medium">{s.value}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="flex items-center gap-4">
                        <a href={`#${product.id}`}
                          className="cta-btn inline-flex items-center gap-2 px-7 py-3.5 text-white font-medium text-xs tracking-widest uppercase"
                          style={{ background:"#15803d" }}>
                          Learn more
                          <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                          </svg>
                        </a>
                        <a href="/contact" className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors underline underline-offset-4">
                          Request sample
                        </a>
                      </div>
                    </Reveal>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════
          04b — POWERED BY SCIENCE BANNER (full-bleed image with overlay text)
      ══════════════════════════════════════ */}
      <div className="relative w-full overflow-hidden" style={{height:320}}>
        <img
          src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1800&q=88"
          alt="Science at work"
          className="w-full h-full object-cover"
          style={{objectPosition:"center 45%", filter:"brightness(0.45) saturate(0.6)"}}
        />
        <div className="absolute inset-0" style={{background:"linear-gradient(135deg,rgba(22,163,74,0.25) 0%,transparent 55%)"}} />
        <div className="absolute inset-0" style={{background:"linear-gradient(to right,rgba(0,0,0,0.55) 0%,transparent 60%)"}} />
        <Reveal from="left">
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24" style={{maxWidth:620}}>
            <p className="text-green-400 text-xs tracking-widest uppercase font-medium mb-3">Science at work</p>
            <h3 className="text-white font-light leading-tight tracking-tight mb-4" style={{fontSize:"clamp(1.8rem,3.5vw,2.8rem)"}}>
              Every product is validated<br/><strong className="font-bold">in our laboratory</strong>
            </h3>
            <p className="text-white/60 text-sm font-light leading-relaxed" style={{maxWidth:440}}>
              All Komstruk formulations undergo rigorous quality testing before commercial release — backed by the pioneering research of Dr. Bernhard Wessling and our in-house R&D team.
            </p>
          </div>
        </Reveal>
      </div>

      {/* ══════════════════════════════════════
          04 — PRODUCT QUICK LINKS  (pill chips — Ormecon style)
      ══════════════════════════════════════ */}
      <section className="w-full border-t border-gray-100 py-14 px-8 md:px-16 lg:px-24"
        style={{ background:"#f9fafb" }}>
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="text-xs tracking-widest uppercase font-medium text-gray-400 mb-5 text-center">Quick navigation</p>
            <div className="flex flex-wrap justify-center gap-3">
              {products.map(p=>(
                <a key={p.id} href={`#${p.id}`}
                  className="text-sm font-medium text-gray-700 px-5 py-2.5 border border-gray-200 hover:border-green-500 hover:text-green-700 hover:bg-green-50 transition-all duration-200">
                  {p.slug}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════
          05 — APPLICATIONS GRID
      ══════════════════════════════════════ */}
      <section className="w-full bg-white border-t border-gray-100 py-20 md:py-28 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-12">
            <p className="text-xs tracking-widest uppercase font-medium text-gray-400 mb-2">Where We Apply</p>
            <h2 className="font-light text-gray-900 tracking-tight" style={{ fontSize:"clamp(1.7rem,3.2vw,2.6rem)" }}>
              Industry <strong className="font-bold">applications</strong>
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { label:"Automotive",        icon:"🚗", img:"https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&q=85", desc:"ESD components, underbody coatings and conductive plastic parts." },
              { label:"Marine & Offshore", icon:"⚓", img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=85", desc:"Long-term corrosion protection for vessels, rigs and marine structures." },
              { label:"Infrastructure",    icon:"🌉", img:"https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=85", desc:"Bridge decks, pipelines, rail systems and critical civil assets." },
              { label:"Electronics",       icon:"🔌", img:"https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=85", desc:"Conductive films, EMI shielding and static dissipation layers." },
              { label:"Oil & Gas",         icon:"🛢️", img:"https://images.unsplash.com/photo-1470723710355-95304d8aece4?w=400&q=85", desc:"Pipeline coatings, tank linings and offshore asset protection." },
              { label:"Aerospace",         icon:"✈️", img:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&q=85", desc:"Lightweight, durable anticorrosion solutions for airframes." },
              { label:"Energy Storage",    icon:"⚡", img:"https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&q=85", desc:"Electrode materials and current collector coatings for batteries." },
              { label:"Research & Dev.",   icon:"🔬", img:"https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400&q=85", desc:"Custom formulations for academic and industrial R&D programmes." },
            ].map((app, i)=>(
              <Reveal key={app.label} delay={i*45}>
                <div className="cl border border-gray-100 cursor-default overflow-hidden group" style={{background:"#fff"}}>
                  {/* Image */}
                  <div className="relative overflow-hidden" style={{height:130}}>
                    <img src={app.img} alt={app.label} className="w-full h-full object-cover"
                      style={{filter:"grayscale(30%) brightness(0.75)", transition:"transform .6s cubic-bezier(0.16,1,0.3,1),filter .5s"}}
                    />
                    <div className="absolute inset-0" style={{background:"linear-gradient(to top,rgba(0,0,0,0.5),transparent)"}} />
                    <span className="absolute bottom-2.5 left-3 text-white/60 text-xs tracking-widest uppercase font-light">Komstruk</span>
                    <span className="absolute top-2.5 right-2.5 text-lg">{app.icon}</span>
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-800 mb-1.5">{app.label}</p>
                    <p className="text-xs text-gray-400 font-light leading-relaxed">{app.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          06 — CTA STRIP
      ══════════════════════════════════════ */}
      <section className="w-full relative overflow-hidden px-8 md:px-16 lg:px-24 py-18 md:py-20">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=1800&q=85"
            alt=""
            className="w-full h-full object-cover"
            style={{objectPosition:"center 50%", filter:"brightness(0.18) saturate(0.5)"}}
          />
          <div className="absolute inset-0" style={{background:"rgba(21,128,61,0.82)"}} />
        </div>
        <div className="absolute right-10 top-0 bottom-0 flex items-center pointer-events-none select-none z-10"
          style={{ fontFamily:"Georgia,serif", fontSize:"18rem", fontWeight:900, color:"rgba(255,255,255,0.05)", lineHeight:1 }}>
          K
        </div>
        <div className="max-w-7xl mx-auto relative z-20 flex flex-col md:flex-row items-center justify-between gap-10 py-12">
          <Reveal from="left">
            <p className="text-white/45 text-xs tracking-widest uppercase mb-3">Need a sample or quote?</p>
            <h3 className="font-light text-white leading-tight tracking-tight"
              style={{ fontSize:"clamp(1.8rem,3.5vw,2.8rem)" }}>
              Talk to our<br/>
              <em className="not-italic" style={{ fontFamily:"Georgia,serif", fontStyle:"italic", color:"#fde68a" }}>
                polymer experts
              </em>
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
                className="inline-block px-10 py-4 border border-white/28 text-white font-light text-xs tracking-widest uppercase text-center hover:border-white/60 transition-colors">
                Email Us
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      
    </main>
  );
}