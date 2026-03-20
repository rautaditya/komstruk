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

/* ════════════════════════════════════════════════════════
   PRODUCTS PAGE — Konductive Polymer Dispersion
   Layout: Figure on top → info below (Ormecon content)
════════════════════════════════════════════════════════ */
export default function Products() {
  const [activeProduct, setActiveProduct] = useState(0);

  const productLinks = [
    "Polyaniline Emeraldine Salt",
    "Polyaniline Emeraldine Base",
    "DISSIPO-WR",
    "Polyaniline Masterbatches",
    "Anticorrosion Primers",
  ];

  return (
    <main className="relative w-full overflow-x-hidden bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
        * { font-family: 'Roboto', sans-serif !important; }

        /* ── core anims ── */
        @keyframes fadeUp    { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes imgZoom   { from{transform:scale(1.08)} to{transform:scale(1)} }
        @keyframes shimmer   { from{background-position:-200% center} to{background-position:200% center} }
        @keyframes floatY    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes rotateHex { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes pulseGlow { 0%,100%{opacity:.3;transform:scale(1)} 50%{opacity:.7;transform:scale(1.08)} }
        @keyframes scanLine  { 0%{transform:translateY(-100%)} 100%{transform:translateY(400%)} }
        @keyframes orbFloat  { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(20px,-14px) scale(1.04)} 66%{transform:translate(-14px,10px) scale(0.97)} }
        @keyframes drawLine  { from{stroke-dashoffset:500} to{stroke-dashoffset:0} }
        @keyframes blinkDot  { 0%,100%{opacity:1} 50%{opacity:0.2} }
        @keyframes slideInL  { from{opacity:0;transform:translateX(-32px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slideInR  { from{opacity:0;transform:translateX(32px)} to{opacity:1;transform:translateX(0)} }
        @keyframes countUp   { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes lStreak   { 0%{opacity:0;transform:translateY(-100%)} 50%{opacity:1} 100%{opacity:0;transform:translateY(100%)} }

        .fu{animation:fadeUp 0.85s cubic-bezier(0.22,1,0.36,1) both}
        .d2{animation-delay:.2s} .d4{animation-delay:.4s} .d6{animation-delay:.6s} .d8{animation-delay:.8s}
        .hi{animation:imgZoom 2.2s cubic-bezier(0.16,1,0.3,1) forwards}
        .gl{background:linear-gradient(90deg,#16a34a,#c9a84c,#16a34a);background-size:200% auto;animation:shimmer 3s linear infinite}
        .float{animation:floatY 5s ease-in-out infinite}
        .orb{animation:orbFloat 8s ease-in-out infinite}

        /* molecule node pulse */
        .mol-node{animation:pulseGlow 3s ease-in-out infinite}
        .mol-node:nth-child(2n){animation-delay:-.8s}
        .mol-node:nth-child(3n){animation-delay:-1.6s}

        /* scan line on figure */
        .scan{animation:scanLine 3s linear infinite;pointer-events:none}

        /* product link pills */
        .ppill{transition:all .25s;cursor:pointer}
        .ppill:hover,.ppill.active{background:#15803d!important;color:#fff!important;border-color:#15803d!important;transform:translateY(-2px);box-shadow:0 6px 20px rgba(21,128,61,0.3)}

        /* spec row */
        .srow{transition:background .2s}
        .srow:hover{background:#f0fdf4}

        /* card lift */
        .cl{transition:transform .38s ease,box-shadow .38s ease}
        .cl:hover{transform:translateY(-4px);box-shadow:0 20px 48px rgba(0,0,0,0.1)}

        /* image hover zoom */
        .iz img{transition:transform .7s cubic-bezier(0.16,1,0.3,1),filter .5s}
        .iz:hover img{transform:scale(1.05)}
      `}</style>

      <Header />

      {/* ══════════════════════════════════════════════
          01 — PAGE HERO  (breadcrumb + title only)
      ══════════════════════════════════════════════ */}
      <section className="w-full bg-white pt-28 pb-10 px-8 md:px-16 lg:px-24 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 fu">
            <a href="/" className="text-gray-400 text-xs tracking-widest uppercase font-light hover:text-green-600 transition-colors">Home</a>
            <span className="text-gray-300 text-xs">/</span>
            <span className="text-green-600 text-xs tracking-widest uppercase font-light">Conducting Polymers</span>
          </div>
          <h1 className="font-bold text-gray-900 tracking-tight mb-3 fu d2"
            style={{ fontSize:"clamp(1.8rem,4vw,3rem)" }}>
            Conductive Polymer Dispersion
          </h1>
          <div className="w-12 h-0.5 fu d4" style={{ background:"linear-gradient(90deg,#c9a84c,#16a34a)" }} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          02 — ANIMATED FIGURE ON TOP  (molecular structure visual)
      ══════════════════════════════════════════════ */}
      <section className="w-full bg-white py-16 px-8 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">

          {/* ── FIGURE AREA ── */}
          <Reveal className="mb-16">
            <div className="relative w-full rounded-none overflow-hidden"
              style={{ background:"linear-gradient(135deg,#f8fffe 0%,#f0fdf4 50%,#fefefe 100%)", border:"1px solid #e5e7eb", minHeight:340 }}>

              {/* Animated background grid */}
              <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage:"linear-gradient(rgba(22,163,74,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(22,163,74,0.06) 1px,transparent 1px)",
                backgroundSize:"40px 40px",
              }} />

              {/* Ambient orbs */}
              <div className="absolute orb" style={{ width:220, height:220, borderRadius:"50%", background:"radial-gradient(circle,rgba(22,163,74,0.12) 0%,transparent 70%)", top:-40, left:-40 }} />
              <div className="absolute orb" style={{ width:180, height:180, borderRadius:"50%", background:"radial-gradient(circle,rgba(201,168,76,0.1) 0%,transparent 70%)", bottom:-30, right:60, animationDelay:"-3s" }} />

              {/* Scan line */}
              <div className="scan absolute left-0 right-0 h-0.5" style={{ background:"linear-gradient(90deg,transparent,rgba(22,163,74,0.35),transparent)" }} />

              {/* ═══ MAIN MOLECULAR FIGURE (SVG) ═══ */}
              <div className="relative z-10 flex items-center justify-center py-12 px-6">
                <svg viewBox="0 0 760 200" xmlns="http://www.w3.org/2000/svg"
                  style={{ width:"100%", maxWidth:720, height:"auto" }}>

                  {/* ── ANIMATED BOND LINES ── */}
                  <line x1="70" y1="100" x2="130" y2="100" stroke="#94a3b8" strokeWidth="1.8"
                    strokeDasharray="500" style={{ animation:"drawLine 1.2s .2s cubic-bezier(0.22,1,0.36,1) forwards", strokeDashoffset:500 }} />
                  <line x1="210" y1="100" x2="270" y2="100" stroke="#16a34a" strokeWidth="2"
                    strokeDasharray="500" style={{ animation:"drawLine 1.2s .5s cubic-bezier(0.22,1,0.36,1) forwards", strokeDashoffset:500 }} />
                  <line x1="350" y1="100" x2="410" y2="100" stroke="#94a3b8" strokeWidth="1.8"
                    strokeDasharray="500" style={{ animation:"drawLine 1.2s .8s cubic-bezier(0.22,1,0.36,1) forwards", strokeDashoffset:500 }} />
                  <line x1="490" y1="100" x2="550" y2="100" stroke="#16a34a" strokeWidth="2"
                    strokeDasharray="500" style={{ animation:"drawLine 1.2s 1.1s cubic-bezier(0.22,1,0.36,1) forwards", strokeDashoffset:500 }} />
                  <line x1="630" y1="100" x2="680" y2="100" stroke="#94a3b8" strokeWidth="1.5"
                    strokeDasharray="500" style={{ animation:"drawLine 1.2s 1.4s cubic-bezier(0.22,1,0.36,1) forwards", strokeDashoffset:500 }} />

                  {/* ── N–H VERTICAL BONDS ── */}
                  {/* N1 */}
                  <line x1="240" y1="100" x2="240" y2="60" stroke="#16a34a" strokeWidth="1.5"
                    strokeDasharray="500" style={{ animation:"drawLine .8s .9s forwards", strokeDashoffset:500 }} />
                  <line x1="240" y1="100" x2="240" y2="140" stroke="#16a34a" strokeWidth="1.5"
                    strokeDasharray="500" style={{ animation:"drawLine .8s 1.0s forwards", strokeDashoffset:500 }} />
                  {/* N2 */}
                  <line x1="520" y1="100" x2="520" y2="60" stroke="#16a34a" strokeWidth="1.5"
                    strokeDasharray="500" style={{ animation:"drawLine .8s 1.3s forwards", strokeDashoffset:500 }} />
                  <line x1="520" y1="100" x2="520" y2="140" stroke="#16a34a" strokeWidth="1.5"
                    strokeDasharray="500" style={{ animation:"drawLine .8s 1.4s forwards", strokeDashoffset:500 }} />

                  {/* ── BENZENE RINGS ── */}
                  {/* Ring 1 (left) */}
                  <g style={{ animation:"slideInL .7s .1s cubic-bezier(0.22,1,0.36,1) both" }}>
                    <polygon points="70,80 90,68 110,80 110,104 90,116 70,104"
                      fill="none" stroke="#64748b" strokeWidth="1.8" strokeLinejoin="round" />
                    {/* Inner ring indicator */}
                    <circle cx="90" cy="92" r="10" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
                    <text x="84" y="97" fontSize="11" fill="#475569" fontWeight="600">Ph</text>
                  </g>
                  {/* Ring 2 */}
                  <g style={{ animation:"slideInR .7s .4s cubic-bezier(0.22,1,0.36,1) both" }}>
                    <polygon points="270,80 290,68 310,80 310,104 290,116 270,104"
                      fill="none" stroke="#64748b" strokeWidth="1.8" strokeLinejoin="round" />
                    <circle cx="290" cy="92" r="10" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
                    <text x="284" y="97" fontSize="11" fill="#475569" fontWeight="600">Ph</text>
                  </g>
                  {/* Ring 3 */}
                  <g style={{ animation:"slideInL .7s .7s cubic-bezier(0.22,1,0.36,1) both" }}>
                    <polygon points="410,80 430,68 450,80 450,104 430,116 410,104"
                      fill="none" stroke="#64748b" strokeWidth="1.8" strokeLinejoin="round" />
                    <circle cx="430" cy="92" r="10" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
                    <text x="424" y="97" fontSize="11" fill="#475569" fontWeight="600">Ph</text>
                  </g>
                  {/* Ring 4 */}
                  <g style={{ animation:"slideInR .7s 1.0s cubic-bezier(0.22,1,0.36,1) both" }}>
                    <polygon points="550,80 570,68 590,80 590,104 570,116 550,104"
                      fill="none" stroke="#64748b" strokeWidth="1.8" strokeLinejoin="round" />
                    <circle cx="570" cy="92" r="10" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
                    <text x="564" y="97" fontSize="11" fill="#475569" fontWeight="600">Ph</text>
                  </g>

                  {/* ── N NODES ── */}
                  {/* N1 */}
                  <g className="mol-node" style={{ animation:"countUp .5s .95s both, pulseGlow 3s 1.5s ease-in-out infinite" }}>
                    <circle cx="240" cy="100" r="16" fill="#16a34a" />
                    <text x="233" y="105" fontSize="13" fill="#fff" fontWeight="700">N⁺</text>
                    {/* H labels */}
                    <text x="246" y="52" fontSize="10" fill="#16a34a" fontWeight="600">H</text>
                    <text x="246" y="152" fontSize="10" fill="#16a34a" fontWeight="600">H</text>
                    {/* A⁻ label */}
                    <text x="195" y="58" fontSize="9" fill="#ef4444" fontWeight="700">A⁻</text>
                    <line x1="210" y1="62" x2="224" y2="75" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 2" />
                  </g>
                  {/* N2 */}
                  <g className="mol-node" style={{ animation:"countUp .5s 1.25s both, pulseGlow 3s 1.8s ease-in-out infinite", animationDelay:"1.25s,1.8s" }}>
                    <circle cx="520" cy="100" r="16" fill="#16a34a" />
                    <text x="513" y="105" fontSize="13" fill="#fff" fontWeight="700">N⁺</text>
                    <text x="526" y="52" fontSize="10" fill="#16a34a" fontWeight="600">H</text>
                    <text x="526" y="152" fontSize="10" fill="#16a34a" fontWeight="600">H</text>
                    <text x="474" y="58" fontSize="9" fill="#ef4444" fontWeight="700">A⁻</text>
                    <line x1="489" y1="62" x2="504" y2="75" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 2" />
                  </g>

                  {/* ── BRACKET [ ] ── */}
                  <text x="14" y="130" fontSize="80" fill="#cbd5e1" fontWeight="200"
                    style={{ animation:"countUp .5s .0s both", fontFamily:"Georgia,serif" }}>[</text>
                  <text x="695" y="130" fontSize="80" fill="#cbd5e1" fontWeight="200"
                    style={{ animation:"countUp .5s 1.5s both", fontFamily:"Georgia,serif" }}>]</text>
                  <text x="720" y="148" fontSize="14" fill="#94a3b8" fontStyle="italic"
                    style={{ animation:"countUp .5s 1.7s both" }}>n</text>

                  {/* ── BOTTOM LABEL ── */}
                  <text x="300" y="188" fontSize="10" fill="#94a3b8" letterSpacing="2" textAnchor="middle"
                    style={{ animation:"countUp .6s 1.9s both", textTransform:"uppercase" }}>
                    Polyaniline — Emeraldine Salt Structure
                  </text>

                  {/* ── FLOATING PROPERTY TAGS ── */}
                  <g style={{ animation:"countUp .6s 2.1s both" }}>
                    <rect x="580" y="20" width="110" height="26" rx="2" fill="rgba(22,163,74,0.1)" stroke="#16a34a" strokeWidth="1"/>
                    <text x="635" y="37" fontSize="9" fill="#15803d" fontWeight="600" textAnchor="middle" letterSpacing="0.5">Conductive · 1–100 S/cm</text>
                  </g>
                  <g style={{ animation:"countUp .6s 2.3s both" }}>
                    <rect x="60" y="20" width="100" height="26" rx="2" fill="rgba(201,168,76,0.1)" stroke="#c9a84c" strokeWidth="1"/>
                    <text x="110" y="37" fontSize="9" fill="#92400e" fontWeight="600" textAnchor="middle" letterSpacing="0.5">Particle Size: ~100 nm</text>
                  </g>
                </svg>
              </div>

              {/* Caption below SVG */}
              <div className="relative z-10 text-center pb-5">
                <p className="text-xs text-gray-400 font-light tracking-widest uppercase">
                  Molecular structure of Polyaniline Emeraldine Salt — the basis of all Komstruk products
                </p>
              </div>

              {/* Corner decorations */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-green-500 opacity-50" />
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-green-500 opacity-50" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-green-500 opacity-50" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-green-500 opacity-50" />
            </div>
          </Reveal>

          {/* ── CONTENT BELOW FIGURE ── */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">

            {/* Left — main description text */}
            <div className="lg:w-3/5">
              <Reveal>
                <p className="text-sm text-gray-700 leading-7 font-light mb-5">
                  Conducting Polymers, such as Polyaniline, have stimulated the interest of material scientists around the world for their potential game-changing industrial and commercial applications.
                </p>
                <p className="text-sm text-gray-500 leading-7 font-light mb-5">
                  For understanding the structure, see above graph and this link. Conducting Polymers are completely insoluble in water and organic solvents because of the extremely high charge density link with the polymeric chain. Also, they are extremely hard to disperse due to their extraordinary high surface tension, by far the highest of all known organic materials, also much higher than water.
                </p>
                <p className="text-sm text-gray-500 leading-7 font-light mb-5">
                  Hence, it was important to develop techniques by which they can be processed for various industrial and commercial applications. This involves ensuring adequate dispersion of the conducting polymer for the use in various media.
                </p>
                <p className="text-sm text-gray-500 leading-7 font-light mb-5">
                  We have developed a novel Thermoplastic Resin Polyaniline polymer blend which is easy to handle: a Polyaniline Masterbatches.
                </p>
                <p className="text-sm text-gray-500 leading-7 font-light mb-5">
                  The masterbatch matrix (a thermoplastic resin) is soluble in solvents like aromatics, ketones, esters, glycol ethers, glycol ether acetates, alcohols etc. allowing to use an ultrafine dispersion of the Polyaniline in various solvents and other media. In this masterbatch, Polyaniline is present in form of nanoscopic particles of around 100 nm size.
                </p>
                <p className="text-sm text-gray-500 leading-7 font-light mb-8">
                  This allows for easy incorporation of polyaniline into multiple solvent systems and other polymer compositions. Also, in many applications, along with improved dispersion, the conductivity is also increased.
                </p>
                <a href="/polymerdispersion"
                  className="inline-flex items-center gap-2 px-8 py-4 text-white font-medium text-sm tracking-wide"
                  style={{ background:"linear-gradient(90deg,#16a34a,#15803d)", borderRadius:30, boxShadow:"0 4px 20px rgba(22,163,74,0.35)", transition:"transform .25s,box-shadow .25s" }}
                  onMouseOver={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 28px rgba(22,163,74,0.45)"}}
                  onMouseOut={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 4px 20px rgba(22,163,74,0.35)"}}
                >
                  Read More: Dispersion
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </a>
              </Reveal>
            </div>

            {/* Right — key property stats */}
            <Reveal from="right" delay={120} className="lg:w-2/5">
              <div className="border border-gray-100" style={{ background:"#f9fafb", boxShadow:"0 2px 16px rgba(0,0,0,0.05)" }}>
                {/* Card header */}
                <div className="px-6 py-4 border-b border-gray-200" style={{ background:"#f3f4f6" }}>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Key Properties</p>
                </div>
                {/* Spec rows */}
                {[
                  { label:"Conductivity",    value:"1–100 S/cm",       icon:"⚡" },
                  { label:"Particle Size",   value:"~100 nm (dispersed)", icon:"🔬" },
                  { label:"Form",            value:"Fine green powder", icon:"🧪" },
                  { label:"Purity",          value:">98%",             icon:"✅" },
                  { label:"Surface Tension", value:"Exceptionally high",icon:"💧" },
                  { label:"Solubility",      value:"Insoluble (neat)",  icon:"🚫" },
                ].map((row, i) => (
                  <div key={row.label} className="srow flex items-center justify-between px-6 py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center gap-3">
                      <span className="text-base">{row.icon}</span>
                      <span className="text-xs font-medium text-gray-500 tracking-wide uppercase">{row.label}</span>
                    </div>
                    <span className="text-xs font-semibold text-gray-800">{row.value}</span>
                  </div>
                ))}
              </div>

              {/* Nobel prize note */}
              <div className="mt-5 p-5 border-l-4 border-green-500" style={{ background:"#f0fdf4" }}>
                <p className="text-xs font-bold uppercase tracking-widest text-green-700 mb-1">Nobel Prize 2000</p>
                <p className="text-xs text-gray-500 font-light leading-relaxed">
                  Interest in research on conducting polymers surged after the 2000 Nobel Prize in Chemistry — recognising the discovery that polymers can be made electrically conductive.
                </p>
              </div>
            </Reveal>
          </div>

          {/* ── PRODUCT LINK CHIPS ── */}
          <Reveal className="mt-14 pt-10 border-t border-gray-100">
            <p className="text-xs tracking-widest uppercase font-medium text-gray-400 mb-5 text-center">Our Products</p>
            <div className="flex flex-wrap justify-center gap-3">
              {productLinks.map((p, i) => (
                <button
                  key={p}
                  className={`ppill text-sm font-medium px-5 py-2.5 border border-gray-300 text-gray-700 ${activeProduct === i ? "active" : ""}`}
                  style={{ borderRadius:30 }}
                  onClick={() => setActiveProduct(i)}
                >
                  {p}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          03 — SCIENCE BEHIND IT  (image + 3-col facts)
      ══════════════════════════════════════════════ */}
      <section className="w-full border-t border-gray-100 py-20 md:py-28 px-8 md:px-16 lg:px-24"
        style={{ background:"#f9fafb" }}>
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-12">
            <p className="text-xs tracking-widest uppercase font-medium text-gray-400 mb-2">How It Works</p>
            <h2 className="font-light text-gray-900 tracking-tight"
              style={{ fontSize:"clamp(1.7rem,3vw,2.5rem)" }}>
              The science of<br/><strong className="font-bold">conductive dispersion</strong>
            </h2>
          </Reveal>

          {/* Full image banner */}
          <Reveal className="iz mb-12 overflow-hidden" style={{ boxShadow:"0 4px 32px rgba(0,0,0,0.08)" }}>
            <div className="relative overflow-hidden" style={{ height:320 }}>
              <img
                src="https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=1400&q=92"
                alt="Polymer science laboratory"
                className="w-full h-full object-cover"
                style={{ filter:"brightness(0.82) saturate(0.78)", objectPosition:"center 40%" }}
              />
              <div className="absolute inset-0 h-0.5 top-0 gl" />
              <div className="absolute inset-0" style={{ background:"linear-gradient(to right,rgba(22,163,74,0.15) 0%,transparent 50%),linear-gradient(to top,rgba(0,0,0,0.4) 0%,transparent 60%)" }} />
              {/* Floating labels on image */}
              <div className="absolute bottom-5 left-6 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-green-400" style={{ animation:"blinkDot 2s ease-in-out infinite" }} />
                <span className="text-white text-sm font-medium" style={{ fontFamily:"Georgia,serif", fontStyle:"italic" }}>
                  Polyaniline processing in progress
                </span>
              </div>
              <div className="absolute top-5 right-6">
                <span className="text-white/60 text-xs tracking-widest uppercase font-light">Komstruk R&D Lab — Navi Mumbai</span>
              </div>
            </div>
          </Reveal>

          {/* 3 fact cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                num:"01",
                title:"Dispersion Challenge",
                img:"https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=500&q=88",
                text:"Polyaniline has the highest surface tension of all known organic materials — making it extraordinarily difficult to disperse in any solvent. Standard mixing approaches fail entirely.",
              },
              {
                num:"02",
                title:"The Breakthrough",
                img:"https://images.unsplash.com/photo-1576086213369-97a306d36557?w=500&q=88",
                text:"Dr. Bernhard Wessling pioneered techniques to process Polyaniline at nanoscopic particle sizes of ~100 nm — enabling stable, ultrafine dispersions across a wide range of industrial media.",
              },
              {
                num:"03",
                title:"The Masterbatch Solution",
                img:"https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=500&q=88",
                text:"Our Thermoplastic Resin Polyaniline Masterbatches solve the handling problem entirely. Soluble matrices allow easy incorporation into any solvent system or polymer composition.",
              },
            ].map((card, i) => (
              <Reveal key={card.num} delay={i * 80}>
                <div className="cl bg-white border border-gray-100 overflow-hidden" style={{ boxShadow:"0 2px 12px rgba(0,0,0,0.05)" }}>
                  {/* Image */}
                  <div className="iz relative overflow-hidden" style={{ height:170 }}>
                    <img src={card.img} alt={card.title}
                      className="w-full h-full object-cover"
                      style={{ filter:"grayscale(20%) brightness(0.8)" }}
                    />
                    <div className="absolute inset-0" style={{ background:"linear-gradient(to top,rgba(0,0,0,0.5),transparent 55%)" }} />
                    <div className="absolute top-0 left-0 right-0 h-0.5 gl" />
                    <span className="absolute bottom-3 left-4 text-white/40 text-xs tracking-widest uppercase font-light">Step</span>
                    <span className="absolute bottom-3 right-4"
                      style={{ fontFamily:"Georgia,serif", fontSize:"2.5rem", fontWeight:900, color:"rgba(255,255,255,0.12)", lineHeight:1 }}>
                      {card.num}
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-800 mb-2">{card.title}</p>
                    <p className="text-xs text-gray-400 font-light leading-relaxed">{card.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          04 — APPLICATIONS BANNER  (full-bleed)
      ══════════════════════════════════════════════ */}
      <div className="relative w-full overflow-hidden" style={{ height:280 }}>
        <img
          src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1600&q=90"
          alt="Industrial application"
          className="w-full h-full object-cover"
          style={{ filter:"brightness(0.45) saturate(0.55)", objectPosition:"center 60%" }}
        />
        <div className="absolute inset-0" style={{ background:"linear-gradient(to right,rgba(0,0,0,0.55) 0%,transparent 55%),radial-gradient(ellipse at 10% 55%,rgba(22,163,74,0.2) 0%,transparent 50%)" }} />
        <Reveal from="left">
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24" style={{ maxWidth:620 }}>
            <p className="text-green-400 text-xs tracking-widest uppercase font-medium mb-3">Industrial Impact</p>
            <h3 className="text-white font-light leading-tight tracking-tight mb-4" style={{ fontSize:"clamp(1.6rem,3vw,2.4rem)" }}>
              Protecting the world's<br/><strong className="font-bold">critical infrastructure</strong>
            </h3>
            <a href="/applications" className="inline-flex items-center gap-2 text-white/75 text-sm font-medium hover:text-white transition-colors">
              Explore all applications
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </a>
          </div>
        </Reveal>
      </div>

      {/* ══════════════════════════════════════════════
          05 — CTA
      ══════════════════════════════════════════════ */}
      <section className="w-full relative overflow-hidden px-8 md:px-16 lg:px-24 py-20"
        style={{ background:"#15803d" }}>
        <div className="absolute right-10 top-0 bottom-0 flex items-center pointer-events-none select-none"
          style={{ fontFamily:"Georgia,serif", fontSize:"20rem", fontWeight:900, color:"rgba(255,255,255,0.05)", lineHeight:1 }}>K</div>
        <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <Reveal from="left">
            <p className="text-white/45 text-xs tracking-widest uppercase font-light mb-4">Get In Touch</p>
            <h3 className="font-light text-white leading-tight tracking-tight"
              style={{ fontSize:"clamp(1.8rem,3.5vw,2.8rem)" }}>
              Ready to work<br/>
              <em className="not-italic" style={{ fontFamily:"Georgia,serif", fontStyle:"italic", color:"#fde68a" }}>with Komstruk?</em>
            </h3>
          </Reveal>
          <Reveal from="right">
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/contact"
                className="inline-block px-10 py-4 bg-white font-bold text-xs tracking-widest uppercase text-center hover:bg-gray-50 transition-colors"
                style={{ color:"#15803d" }}>
                Request a Sample
              </a>
              <a href="mailto:info@komstruk.co"
                className="inline-block px-10 py-4 border border-white/30 text-white font-light text-xs tracking-widest uppercase text-center hover:border-white/65 transition-colors">
                Email Us
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      
    </main>
  );
}