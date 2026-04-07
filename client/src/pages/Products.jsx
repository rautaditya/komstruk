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

/* ─── MoleculeSection ────────────────────────────────── */
function MoleculeSection() {
  const molRef = useRef(null);

  useEffect(() => {
    const container = molRef.current;
    if (!container) return;

    let stopped = false;
    const timers = [];

    function getSvgCoords(svgEl, svgX, svgY) {
      const rect = svgEl.getBoundingClientRect();
      const parentRect = container.getBoundingClientRect();
      const scaleX = rect.width / 760;
      const scaleY = rect.height / 240;
      return {
        x: svgX * scaleX + (rect.left - parentRect.left),
        y: svgY * scaleY + (rect.top - parentRect.top),
      };
    }

    function spawnElectron(svgEl, x1, y1, x2, y2, color, delay, period) {
      const t1 = setTimeout(function run() {
        if (stopped) return;
        const dot = document.createElement("div");
        dot.style.cssText = `position:absolute;width:6px;height:6px;border-radius:50%;background:${color};box-shadow:0 0 7px 3px ${color}88;pointer-events:none;transform:translate(-50%,-50%);`;
        container.appendChild(dot);

        const duration = 900 + Math.random() * 300;
        const startTime = performance.now();

        function animate(now) {
          if (stopped) { dot.remove(); return; }
          const t = Math.min((now - startTime) / duration, 1);
          const ease = t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2;
          const curr = getSvgCoords(svgEl, x1+(x2-x1)*ease, y1+(y2-y1)*ease);
          dot.style.left = curr.x + "px";
          dot.style.top  = curr.y + "px";
          const alpha = t < 0.15 ? t/0.15 : t > 0.85 ? (1-t)/0.15 : 1;
          dot.style.opacity = alpha;
          if (t < 1) requestAnimationFrame(animate);
          else {
            dot.remove();
            if (!stopped) {
              const t2 = setTimeout(run, period + Math.random()*400);
              timers.push(t2);
            }
          }
        }
        requestAnimationFrame(animate);
      }, delay + Math.random()*500);
      timers.push(t1);
    }

    function spawnAnion(svgEl, tx, ty, color) {
      if (stopped) return;
      const angles = [210,240,270,300];
      const angle  = angles[Math.floor(Math.random()*angles.length)] * Math.PI/180;
      const dist   = 55 + Math.random()*25;
      const x1 = tx + Math.cos(angle)*dist;
      const y1 = ty + Math.sin(angle)*dist;

      const dot = document.createElement("div");
      dot.style.cssText = `position:absolute;width:5px;height:5px;border-radius:50%;background:${color};box-shadow:0 0 5px 2px ${color}99;pointer-events:none;transform:translate(-50%,-50%);`;
      container.appendChild(dot);

      const duration  = 1200 + Math.random()*400;
      const startTime = performance.now();
      const ex = tx + (Math.random()-0.5)*6;
      const ey = ty + (Math.random()-0.5)*6;

      function anim(now) {
        if (stopped) { dot.remove(); return; }
        const t = Math.min((now - startTime)/duration, 1);
        const ease = 1 - Math.pow(1-t, 3);
        const curr = getSvgCoords(svgEl, x1+(ex-x1)*ease, y1+(ey-y1)*ease);
        dot.style.left    = curr.x + "px";
        dot.style.top     = curr.y + "px";
        dot.style.opacity = t < 0.2 ? t/0.2 : t > 0.7 ? (1-t)/0.3 : 1;
        if (t < 1) requestAnimationFrame(anim);
        else dot.remove();
      }
      requestAnimationFrame(anim);
    }

    const initTimer = setTimeout(() => {
      const wrapperEl = container.closest(".mol-wrapper");
      const svgEl = wrapperEl ? wrapperEl.querySelector("svg") : null;
      if (!svgEl) return;

      const bonds = [
        [70,120,128,120, "#facc15", 0,    2200],
        [265,120,348,120,"#facc15", 600,  2200],
        [348,120,265,120,"#a78bfa", 1200, 2200],
        [410,120,495,120,"#facc15", 900,  2200],
        [495,120,410,120,"#a78bfa", 1500, 2200],
        [545,120,628,120,"#facc15", 1200, 2200],
        [240,120,240,60, "#4ade80", 1800, 2800],
        [240,120,240,178,"#4ade80", 2000, 2800],
        [520,120,520,60, "#4ade80", 2000, 2800],
        [520,120,520,178,"#4ade80", 2200, 2800],
      ];
      bonds.forEach(b => spawnElectron(svgEl, b[0],b[1],b[2],b[3],b[4],b[5],b[6]));

      function scheduleAnions() {
        if (stopped) return;
        spawnAnion(svgEl, 240, 120, "#f87171");
        spawnAnion(svgEl, 520, 120, "#f87171");
        const t3 = setTimeout(scheduleAnions, 1800 + Math.random()*600);
        timers.push(t3);
      }
      const t4 = setTimeout(scheduleAnions, 2500);
      timers.push(t4);
    }, 300);
    timers.push(initTimer);

    return () => {
      stopped = true;
      timers.forEach(clearTimeout);
      if (container) container.querySelectorAll("div").forEach(d => d.remove());
    };
  }, []);

  return (
    <div className="mol-wrapper relative w-full rounded-none overflow-hidden"
      style={{ background:"linear-gradient(135deg,#f8fffe 0%,#f0fdf4 50%,#fefefe 100%)", border:"1px solid #e5e7eb", minHeight:340 }}>

      {/* Animated grid background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage:"linear-gradient(rgba(22,163,74,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(22,163,74,0.06) 1px,transparent 1px)",
        backgroundSize:"40px 40px",
      }} />

      {/* Ambient orbs */}
      <div className="absolute orb" style={{ width:220,height:220,borderRadius:"50%",background:"radial-gradient(circle,rgba(22,163,74,0.12) 0%,transparent 70%)",top:-40,left:-40 }} />
      <div className="absolute orb" style={{ width:180,height:180,borderRadius:"50%",background:"radial-gradient(circle,rgba(201,168,76,0.10) 0%,transparent 70%)",bottom:-30,right:60,animationDelay:"-3s" }} />

      {/* Scan line */}
      <div className="scan absolute left-0 right-0 h-0.5" style={{ background:"linear-gradient(90deg,transparent,rgba(22,163,74,0.35),transparent)" }} />

      {/* ──── SVG MOLECULE ──── */}
      <div className="relative z-10 flex items-center justify-center py-12 px-6">
        <svg viewBox="0 0 760 240" xmlns="http://www.w3.org/2000/svg"
          style={{ width:"100%", maxWidth:720, height:"auto" }}>
          <defs>
            <filter id="nGlow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="5" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* ── Brackets ── */}
          <text x="8"   y="162" fontSize="90" fill="#c7d2d0" fontWeight="200" fontFamily="Georgia,serif" style={{animation:"fadeInUp 0.5s 0.1s both"}}>[</text>
          <text x="714" y="162" fontSize="90" fill="#c7d2d0" fontWeight="200" fontFamily="Georgia,serif" style={{animation:"fadeInUp 0.5s 1.8s both"}}>]</text>
          <text x="738" y="178" fontSize="16" fill="#94a3b8" fontStyle="italic" fontFamily="Georgia,serif" style={{animation:"fadeInUp 0.5s 2.0s both"}}>n</text>

          {/* ── Bond: Ph1 → N1 ── */}
          <line className="mol-bond" x1="130" y1="120" x2="215" y2="120" stroke="#94a3b8" strokeWidth="2.2" style={{animationDelay:"0.3s"}}/>
          <line className="mol-bond" x1="130" y1="126" x2="175" y2="126" stroke="#94a3b8" strokeWidth="1.2" opacity="0.5" style={{animationDelay:"0.5s"}}/>

          {/* ── Bond: N1 → Ph2 ── */}
          <line className="mol-bond" x1="265" y1="120" x2="350" y2="120" stroke="#16a34a" strokeWidth="2.5" style={{animationDelay:"0.8s"}}/>
          <line className="mol-bond" x1="295" y1="114" x2="340" y2="114" stroke="#16a34a" strokeWidth="1.3" opacity="0.45" style={{animationDelay:"1.0s"}}/>

          {/* ── Bond: Ph2 → N2 ── */}
          <line className="mol-bond" x1="410" y1="120" x2="495" y2="120" stroke="#94a3b8" strokeWidth="2.2" style={{animationDelay:"1.1s"}}/>
          <line className="mol-bond" x1="410" y1="126" x2="455" y2="126" stroke="#94a3b8" strokeWidth="1.2" opacity="0.5" style={{animationDelay:"1.3s"}}/>

          {/* ── Bond: N2 → Ph3 ── */}
          <line className="mol-bond" x1="545" y1="120" x2="628" y2="120" stroke="#16a34a" strokeWidth="2.5" style={{animationDelay:"1.4s"}}/>
          <line className="mol-bond" x1="545" y1="114" x2="595" y2="114" stroke="#16a34a" strokeWidth="1.3" opacity="0.45" style={{animationDelay:"1.6s"}}/>

          {/* ── N–H vertical bonds ── */}
          <line className="mol-bond" x1="240" y1="104" x2="240" y2="60"  stroke="#16a34a" strokeWidth="1.8" style={{animationDelay:"1.0s"}}/>
          <line className="mol-bond" x1="240" y1="136" x2="240" y2="178" stroke="#16a34a" strokeWidth="1.8" style={{animationDelay:"1.1s"}}/>
          <line className="mol-bond" x1="520" y1="104" x2="520" y2="60"  stroke="#16a34a" strokeWidth="1.8" style={{animationDelay:"1.5s"}}/>
          <line className="mol-bond" x1="520" y1="136" x2="520" y2="178" stroke="#16a34a" strokeWidth="1.8" style={{animationDelay:"1.6s"}}/>

          {/* ── Benzene Ring 1 ── */}
          <g className="mol-node-g" style={{animationDelay:"0.1s", transformOrigin:"90px 110px"}}>
            <polygon points="68,98 88,84 112,98 112,122 88,136 68,122" fill="none" stroke="#64748b" strokeWidth="2" strokeLinejoin="round"/>
            <circle cx="90" cy="110" r="10" fill="none" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="8 4"
              style={{animation:"ringRotate 5s linear infinite", transformOrigin:"90px 110px"}}/>
            <circle cx="90" cy="110" r="5" fill="none" stroke="#c9a84c" strokeWidth="1" strokeDasharray="3 3"
              style={{animation:"counterSpin 3s linear infinite", transformOrigin:"90px 110px"}}/>
            <text x="90" y="114" fontSize="12" fill="#475569" fontWeight="700" textAnchor="middle">Ph</text>
          </g>

          {/* ── Benzene Ring 2 ── */}
          <g className="mol-node-g" style={{animationDelay:"0.45s", transformOrigin:"370px 110px"}}>
            <polygon points="348,98 368,84 392,98 392,122 368,136 348,122" fill="none" stroke="#64748b" strokeWidth="2" strokeLinejoin="round"/>
            <circle cx="370" cy="110" r="10" fill="none" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="8 4"
              style={{animation:"ringRotate 5s 0.8s linear infinite", transformOrigin:"370px 110px"}}/>
            <circle cx="370" cy="110" r="5" fill="none" stroke="#c9a84c" strokeWidth="1" strokeDasharray="3 3"
              style={{animation:"counterSpin 3s 0.4s linear infinite", transformOrigin:"370px 110px"}}/>
            <text x="370" y="114" fontSize="12" fill="#475569" fontWeight="700" textAnchor="middle">Ph</text>
          </g>

          {/* ── Benzene Ring 3 ── */}
          <g className="mol-node-g" style={{animationDelay:"1.5s", transformOrigin:"650px 110px"}}>
            <polygon points="628,98 648,84 672,98 672,122 648,136 628,122" fill="none" stroke="#64748b" strokeWidth="2" strokeLinejoin="round"/>
            <circle cx="650" cy="110" r="10" fill="none" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="8 4"
              style={{animation:"ringRotate 5s 1.2s linear infinite", transformOrigin:"650px 110px"}}/>
            <circle cx="650" cy="110" r="5" fill="none" stroke="#c9a84c" strokeWidth="1" strokeDasharray="3 3"
              style={{animation:"counterSpin 3s 0.8s linear infinite", transformOrigin:"650px 110px"}}/>
            <text x="650" y="114" fontSize="12" fill="#475569" fontWeight="700" textAnchor="middle">Ph</text>
          </g>

          {/* ── N Node 1 ── */}
          <g className="mol-node-g" style={{animationDelay:"1.1s", transformOrigin:"240px 120px"}}>
            <circle cx="240" cy="120" r="26" fill="rgba(22,163,74,0.10)"
              style={{animation:"chargeGlow 2.4s ease-in-out infinite"}}/>
            <circle cx="240" cy="120" r="19" fill="rgba(22,163,74,0.18)"
              style={{animation:"chargeGlow 2.4s 0.3s ease-in-out infinite"}}/>
            <circle cx="240" cy="120" r="14" fill="#16a34a" filter="url(#nGlow)"
              style={{animation:"pulseN 2.4s ease-in-out infinite"}}/>
            <text x="237" y="116" fontSize="13" fill="white" fontWeight="800">N</text>
            <text x="248" y="112" fontSize="9"  fill="white" fontWeight="700">+</text>
            {/* H labels */}
            <text x="250" y="52"  fontSize="11" fill="#16a34a" fontWeight="700" style={{animation:"molHFloat 3s ease-in-out infinite", animationDelay:"0s"}}>H</text>
            <text x="250" y="190" fontSize="11" fill="#16a34a" fontWeight="700" style={{animation:"molHFloat 3s ease-in-out infinite", animationDelay:"1.5s"}}>H</text>
            {/* A⁻ counter-ion */}
            <text x="188" y="68" fontSize="10" fill="#ef4444" fontWeight="800">A⁻</text>
            <line x1="202" y1="72" x2="226" y2="90" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="3 2" opacity="0.8"
              style={{animation:"fadeInUp 0.5s 1.4s both"}}/>
            <circle cx="194" cy="65" r="3" fill="rgba(239,68,68,0.25)"
              style={{animation:"chargeGlow 2s 0.5s ease-in-out infinite"}}/>
          </g>

          {/* ── N Node 2 ── */}
          <g className="mol-node-g" style={{animationDelay:"1.5s", transformOrigin:"520px 120px"}}>
            <circle cx="520" cy="120" r="26" fill="rgba(22,163,74,0.10)"
              style={{animation:"chargeGlow 2.4s 0.4s ease-in-out infinite"}}/>
            <circle cx="520" cy="120" r="19" fill="rgba(22,163,74,0.18)"
              style={{animation:"chargeGlow 2.4s 0.7s ease-in-out infinite"}}/>
            <circle cx="520" cy="120" r="14" fill="#16a34a" filter="url(#nGlow)"
              style={{animation:"pulseN 2.4s 0.4s ease-in-out infinite"}}/>
            <text x="517" y="116" fontSize="13" fill="white" fontWeight="800">N</text>
            <text x="528" y="112" fontSize="9"  fill="white" fontWeight="700">+</text>
            <text x="530" y="52"  fontSize="11" fill="#16a34a" fontWeight="700" style={{animation:"molHFloat 3s ease-in-out infinite", animationDelay:"0.8s"}}>H</text>
            <text x="530" y="190" fontSize="11" fill="#16a34a" fontWeight="700" style={{animation:"molHFloat 3s ease-in-out infinite", animationDelay:"2.3s"}}>H</text>
            <text x="468" y="68" fontSize="10" fill="#ef4444" fontWeight="800">A⁻</text>
            <line x1="482" y1="72" x2="506" y2="90" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="3 2" opacity="0.8"
              style={{animation:"fadeInUp 0.5s 1.8s both"}}/>
            <circle cx="474" cy="65" r="3" fill="rgba(239,68,68,0.25)"
              style={{animation:"chargeGlow 2s 1.0s ease-in-out infinite"}}/>
          </g>

          {/* ── Property tags ── */}
          <g style={{animation:"fadeInUp 0.6s 2.1s both"}}>
            <rect x="554" y="16" width="124" height="26" rx="4" fill="rgba(22,163,74,0.1)" stroke="#16a34a" strokeWidth="0.8"/>
            <text x="616" y="33" fontSize="9.5" fill="#15803d" fontWeight="700" textAnchor="middle" letterSpacing="0.3">Conductive · 1–100 S/cm</text>
          </g>
          <g style={{animation:"fadeInUp 0.6s 2.3s both"}}>
            <rect x="34" y="16" width="110" height="26" rx="4" fill="rgba(201,168,76,0.1)" stroke="#c9a84c" strokeWidth="0.8"/>
            <text x="89" y="33" fontSize="9.5" fill="#92400e" fontWeight="700" textAnchor="middle" letterSpacing="0.3">Particle: ~100 nm</text>
          </g>

          {/* ── Bottom label ── */}
          <text x="375" y="228" fontSize="10" fill="#94a3b8" letterSpacing="2" textAnchor="middle"
            style={{animation:"fadeInUp 0.6s 2.5s both"}}>
            POLYANILINE — EMERALDINE SALT STRUCTURE
          </text>
        </svg>
      </div>

      {/* ──── ELECTRON PARTICLE OVERLAY ──── */}
      <div
        ref={molRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{zIndex:20}}
      />

      {/* Caption */}
      <div className="relative z-10 text-center pb-5">
        <p className="text-xs text-gray-400 font-light tracking-widest uppercase">
          Molecular structure of Polyaniline Emeraldine Salt — the basis of all Komstruk products
        </p>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-3 left-3  w-4 h-4 border-t-2 border-l-2 border-green-500 opacity-50" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-green-500 opacity-50" />
      <div className="absolute bottom-3 left-3  w-4 h-4 border-b-2 border-l-2 border-green-500 opacity-50" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-green-500 opacity-50" />
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   PRODUCTS PAGE — Konductive Polymer Dispersion
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

        /* ── core page anims ── */
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

        /* ── molecule-specific anims (from enhanced version) ── */
        @keyframes drawBond    { from{stroke-dashoffset:300;opacity:0} to{stroke-dashoffset:0;opacity:1} }
        @keyframes nodeAppear  { 0%{transform:scale(0);opacity:0} 70%{transform:scale(1.15)} 100%{transform:scale(1);opacity:1} }
        @keyframes pulseN      { 0%,100%{r:14;opacity:1} 50%{r:16;opacity:0.85} }
        @keyframes chargeGlow  { 0%,100%{opacity:0.2;r:22} 50%{opacity:0.55;r:27} }
        @keyframes molHFloat   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-3px)} }
        @keyframes scanMove    { 0%{transform:translateY(-4px)} 100%{transform:translateY(320px)} }
        @keyframes ringRotate  { from{stroke-dashoffset:0} to{stroke-dashoffset:-62.8} }
        @keyframes counterSpin { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
        @keyframes fadeInUp    { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }

        .mol-bond      { stroke-dasharray:300; animation:drawBond 0.9s cubic-bezier(0.4,0,0.2,1) both; fill:none; }
        .mol-node-g    { animation:nodeAppear 0.8s cubic-bezier(0.34,1.56,0.64,1) both; }

        .fu{animation:fadeUp 0.85s cubic-bezier(0.22,1,0.36,1) both}
        .d2{animation-delay:.2s} .d4{animation-delay:.4s} .d6{animation-delay:.6s} .d8{animation-delay:.8s}
        .hi{animation:imgZoom 2.2s cubic-bezier(0.16,1,0.3,1) forwards}
        .gl{background:linear-gradient(90deg,#16a34a,#c9a84c,#16a34a);background-size:200% auto;animation:shimmer 3s linear infinite}
        .float{animation:floatY 5s ease-in-out infinite}
        .orb{animation:orbFloat 8s ease-in-out infinite}

        .mol-node{animation:pulseGlow 3s ease-in-out infinite}
        .mol-node:nth-child(2n){animation-delay:-.8s}
        .mol-node:nth-child(3n){animation-delay:-1.6s}

        .scan{animation:scanLine 3s linear infinite;pointer-events:none}

        .ppill{transition:all .25s;cursor:pointer}
        .ppill:hover,.ppill.active{background:#15803d!important;color:#fff!important;border-color:#15803d!important;transform:translateY(-2px);box-shadow:0 6px 20px rgba(21,128,61,0.3)}

        .srow{transition:background .2s}
        .srow:hover{background:#f0fdf4}

        .cl{transition:transform .38s ease,box-shadow .38s ease}
        .cl:hover{transform:translateY(-4px);box-shadow:0 20px 48px rgba(0,0,0,0.1)}

        .iz img{transition:transform .7s cubic-bezier(0.16,1,0.3,1),filter .5s}
        .iz:hover img{transform:scale(1.05)}
      `}</style>

      <Header />

      {/* ══════════════════════════════════════════════
          01 — PAGE HERO
      ══════════════════════════════════════════════ */}
      <section className="w-full bg-white pt-28 pb-10 px-8 md:px-16 lg:px-24 border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-6 fu">
            <a href="/" className="text-gray-400 text-xs tracking-widest uppercase font-light hover:text-green-600 transition-colors">Home</a>
            <span className="text-gray-300 text-xs">/</span>
            <span className="text-green-600 text-xs tracking-widest uppercase font-light">Conducting Polymers</span>
          </div>
          <h1 className="font-bold text-gray-900 tracking-tight mb-3 fu d2"
            style={{ fontSize:"clamp(1.8rem,4vw,3rem)" }}>
            Conductive Polymer Dispersion
          </h1>
          <p className="text-sm text-gray-600 leading-7 font-light max-w-2xl fu d4">
            Conducting Polymers, such as Polyaniline, have stimulated the interest of material scientists
            around the world for their potential game-changing industrial and commercial applications.
          </p>
          <div className="w-12 h-0.5 fu d4" style={{ background:"linear-gradient(90deg,#c9a84c,#16a34a)" }} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          02 — ANIMATED MOLECULE FIGURE
      ══════════════════════════════════════════════ */}
      <section className="w-full bg-white py-16 px-8 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">

          <Reveal className="mb-16">
            <MoleculeSection />
          </Reveal>

          {/* ── CONTENT BELOW FIGURE ── */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
            {/* Left — main description */}
<div className="lg:w-3/5">
  <Reveal>

    {/* 🔹 NEW CONTENT (exactly as you wanted) */}
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

    {/* 🔹 BUTTON (keep same) */}
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
                <div className="px-6 py-4 border-b border-gray-200" style={{ background:"#f3f4f6" }}>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Key Properties</p>
                </div>
                {[
                  { label:"Conductivity",    value:"1–100 S/cm",          icon:"⚡" },
                  { label:"Particle Size",   value:"~100 nm (dispersed)",  icon:"🔬" },
                  { label:"Form",            value:"Fine green powder",    icon:"🧪" },
                  { label:"Purity",          value:">98%",                 icon:"✅" },
                  { label:"Surface Tension", value:"Exceptionally high",   icon:"💧" },
                  { label:"Solubility",      value:"Insoluble (neat)",     icon:"🚫" },
                ].map((row) => (
                  <div key={row.label} className="srow flex items-center justify-between px-6 py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center gap-3">
                      <span className="text-base">{row.icon}</span>
                      <span className="text-xs font-medium text-gray-500 tracking-wide uppercase">{row.label}</span>
                    </div>
                    <span className="text-xs font-semibold text-gray-800">{row.value}</span>
                  </div>
                ))}
              </div>

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
          03 — SCIENCE BEHIND IT
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
          04 — APPLICATIONS BANNER
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

    </main>
  );
}