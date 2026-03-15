import { useEffect, useRef, useState, useCallback } from "react";

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { background: #f4f2ee; color: #1a1a18; overflow-x: hidden; }
    a { text-decoration: none; color: inherit; }
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: #f4f2ee; }
    ::-webkit-scrollbar-thumb { background: #1a1a18; border-radius: 2px; }

    @keyframes fadeUp    { from{opacity:0;transform:translateY(44px)}  to{opacity:1;transform:translateY(0)} }
    @keyframes fadeLeft  { from{opacity:0;transform:translateX(-44px)} to{opacity:1;transform:translateX(0)} }
    @keyframes fadeRight { from{opacity:0;transform:translateX(44px)}  to{opacity:1;transform:translateX(0)} }
    @keyframes zoomIn    { from{opacity:0;transform:scale(.94)}         to{opacity:1;transform:scale(1)} }
    @keyframes panelSwap { from{opacity:0;transform:translateY(16px)}  to{opacity:1;transform:translateY(0)} }
    @keyframes ticker    { from{transform:translateX(0)} to{transform:translateX(-50%)} }

    .rv{opacity:0} .rv.in{animation:fadeUp    .85s cubic-bezier(.16,1,.3,1) forwards}
    .rl{opacity:0} .rl.in{animation:fadeLeft  .85s cubic-bezier(.16,1,.3,1) forwards}
    .rr{opacity:0} .rr.in{animation:fadeRight .85s cubic-bezier(.16,1,.3,1) forwards}
    .rz{opacity:0} .rz.in{animation:zoomIn    .85s cubic-bezier(.16,1,.3,1) forwards}

    .imgZ img { transition: transform .75s cubic-bezier(.16,1,.3,1); }
    .imgZ:hover img { transform: scale(1.055); }
    .cardH { transition: transform .4s cubic-bezier(.16,1,.3,1), box-shadow .4s ease; }
    .cardH:hover { transform: translateY(-5px); box-shadow: 0 20px 56px rgba(0,0,0,.1); }
  `}</style>
);

const serif = "'Cormorant Garamond', serif";
const sans  = "'DM Sans', sans-serif";
const bg    = "#f4f2ee";
const bgAlt = "#edebe7";
const dark  = "#1a1a18";
const mid   = "#6a6660";
const muted = "#a09890";
const gold  = "#b89a4e";
const white = "#ffffff";

function useIV(thr = 0.1) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setV(true); o.disconnect(); }
    }, { threshold: thr });
    o.observe(el); return () => o.disconnect();
  }, []);
  return [ref, v];
}

function useCount(target, dur = 2000) {
  const [n, setN] = useState(0);
  const [ref, v] = useIV();
  useEffect(() => {
    if (!v) return;
    let raf, s = null;
    const run = (ts) => {
      if (!s) s = ts;
      const p = Math.min((ts - s) / dur, 1);
      setN(Math.floor((1 - Math.pow(1 - p, 4)) * target));
      if (p < 1) raf = requestAnimationFrame(run); else setN(target);
    };
    raf = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf);
  }, [v, target, dur]);
  return [ref, n];
}

function Reveal({ children, delay = 0, dir = "v", style = {}, className = "" }) {
  const [ref, v] = useIV();
  const cls = { v:"rv", l:"rl", r:"rr", z:"rz" }[dir] || "rv";
  return (
    <div ref={ref} className={`${cls} ${v ? "in" : ""} ${className}`}
      style={{ animationDelay: v ? `${delay}ms` : "0ms", ...style }}>
      {children}
    </div>
  );
}

function Cnt({ val, suf = "" }) {
  const [ref, n] = useCount(val);
  return <span ref={ref}>{n.toLocaleString()}{suf}</span>;
}

function Navbar() {
  const [sc, setSc] = useState(false);
  useEffect(() => {
    const fn = () => setSc(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = ["Process", "Materials", "Impact", "Technology", "About", "Contact"];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(244,242,238,0.97)", backdropFilter: "blur(16px)",
      borderBottom: "1px solid rgba(26,26,24,0.07)",
      boxShadow: sc ? "0 2px 20px rgba(0,0,0,0.05)" : "none",
      transition: "box-shadow .3s",
    }}>
      <div style={{ maxWidth: 1380, margin: "0 auto", padding: "0 40px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: serif, fontSize: 18, fontWeight: 300, color: dark, letterSpacing: ".18em", textTransform: "uppercase" }}>komstruk</span>
        <div style={{ display: "flex", gap: 30, alignItems: "center" }}>
          {links.map(l => (
            <a key={l} href="#" style={{ fontFamily: sans, fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: mid, transition: "color .2s" }}
              onMouseEnter={e => e.target.style.color = dark}
              onMouseLeave={e => e.target.style.color = mid}>{l}</a>
          ))}
        </div>
        <button style={{ background: dark, color: white, border: "none", padding: "9px 22px", fontFamily: sans, fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", cursor: "pointer" }}>
          Get Started
        </button>
      </div>
    </nav>
  );
}

function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [mx, setMx] = useState({ x: 0, y: 0 });
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 80); return () => clearTimeout(t); }, []);
  const onM = useCallback(e => setMx({ x: (e.clientX / window.innerWidth - .5) * 10, y: (e.clientY / window.innerHeight - .5) * 10 }), []);
  const anim = d => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(28px)",
    transition: `opacity .9s ease ${d}s, transform .9s cubic-bezier(.16,1,.3,1) ${d}s`,
  });

  return (
    <section onMouseMove={onM} style={{ background: bg, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ maxWidth: 1380, margin: "0 auto", padding: "0 40px", paddingTop: 80, width: "100%", flex: 1, display: "flex", flexDirection: "column" }}>

        <div style={{ ...anim(.12), display: "flex", alignItems: "center", gap: 10, marginBottom: 30 }}>
          <span style={{ fontFamily: sans, fontSize: 10, letterSpacing: ".28em", textTransform: "uppercase", color: gold }}>Komstruk</span>
          <span style={{ color: muted }}>·</span>
          <span style={{ fontFamily: sans, fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: muted }}>Recycling Division</span>
        </div>

        <div style={{ overflow: "hidden" }}>
          <h1 style={{
            fontFamily: serif, fontSize: "clamp(3.8rem,8.5vw,8rem)", fontWeight: 300, lineHeight: .93, color: dark,
            opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(90px)",
            transition: "opacity 1.15s ease .15s, transform 1.15s cubic-bezier(.16,1,.3,1) .15s",
          }}>
            Recycling<br />
            <em style={{ fontStyle: "italic", color: gold }}>Lithium-ion</em><br />
            batteries
          </h1>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, marginTop: 36, maxWidth: 860 }}>
          <div style={anim(.38)}>
            <p style={{ fontFamily: sans, fontSize: 13, lineHeight: 1.85, color: mid }}>
              Komstruk leads the industry in sustainable battery recycling — recovering critical materials with zero-waste precision, engineered for tomorrow's circular economy.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
              <button style={{ background: dark, color: white, border: "none", padding: "13px 28px", fontFamily: sans, fontSize: 10, letterSpacing: ".24em", textTransform: "uppercase", cursor: "pointer" }}>
                Start Recycling
              </button>
              <button style={{ background: "transparent", color: dark, border: "1px solid rgba(26,26,24,.22)", padding: "13px 28px", fontFamily: sans, fontSize: 10, letterSpacing: ".24em", textTransform: "uppercase", cursor: "pointer" }}>
                Learn More
              </button>
            </div>
          </div>
          <div style={anim(.52)}>
            <p style={{ fontFamily: sans, fontSize: 12, lineHeight: 1.82, color: muted }}>
              Every chemistry class and form factor — handled safely, efficiently and with full regulatory compliance across all jurisdictions. ISO 14001 certified and operating nationwide.
            </p>
            <div style={{ display: "flex", gap: 32, marginTop: 22 }}>
              {[["98%","Recovery Rate"],["ISO 14001","Certified"],["Zero","Landfill"]].map(([v,l]) => (
                <div key={l}>
                  <div style={{ fontFamily: serif, fontSize: 22, fontWeight: 300, color: gold }}>{v}</div>
                  <div style={{ fontFamily: sans, fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase", color: muted, marginTop: 4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Reveal delay={160} dir="z" style={{ marginTop: 48, flex: 1 }}>
          <div className="imgZ" style={{ position: "relative", height: 460, overflow: "hidden" }}>
            <img
              src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1800&q=85"
              alt="Komstruk recycling facility"
              style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.82) saturate(.7)",
                       transition: "transform .15s ease", transform: `translateX(${mx.x * .1}px) scale(1.03)` }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(26,26,24,.3) 0%,transparent 55%)" }} />
            <Reveal dir="r" style={{ position: "absolute", bottom: 28, right: 36 }}>
              <div style={{ background: "rgba(244,242,238,.96)", backdropFilter: "blur(14px)", padding: "22px 26px", maxWidth: 290 }}>
                <div style={{ fontFamily: sans, fontSize: 10, letterSpacing: ".24em", textTransform: "uppercase", color: gold, marginBottom: 8 }}>Facility Overview</div>
                <p style={{ fontFamily: serif, fontSize: 16, fontWeight: 300, color: dark, lineHeight: 1.44 }}>
                  State-of-the-art processing built for the circular economy.
                </p>
              </div>
            </Reveal>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function WhatWeProcess() {
  const items = [
    { title:"EV Batteries",         desc:"Complete electric vehicle battery packs — from consumer EVs to commercial fleet systems, all chemistries accepted.",   img:"https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=500&q=80" },
    { title:"Grid Storage",         desc:"Utility-scale stationary storage cells and modules from energy infrastructure projects, safely decommissioned.",        img:"https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=500&q=80" },
    { title:"Industrial Packs",     desc:"Heavy-duty lithium packs from forklifts, machinery and construction equipment with specialist collection logistics.",   img:"https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500&q=80" },
    { title:"Consumer Electronics", desc:"Laptop, phone and small device batteries via our nationwide certified partner collection and drop-off network.",        img:"https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&q=80" },
    { title:"Marine & Aviation",    desc:"High-density cells from maritime and aerospace applications requiring specialist safe handling protocols.",              img:"https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80" },
    { title:"Research & Prototype", desc:"Lab-grade prototype cells from R&D facilities processed with full documented chain-of-custody at every stage.",        img:"https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=500&q=80" },
  ];
  return (
    <section style={{ background: bg, padding: "100px 40px" }}>
      <div style={{ maxWidth: 1380, margin: "0 auto" }}>
        <Reveal style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ fontFamily: sans, fontSize: 10, letterSpacing: ".28em", textTransform: "uppercase", color: gold, marginBottom: 12 }}>What We Process</div>
          <h2 style={{ fontFamily: serif, fontSize: "clamp(2.2rem,4vw,3.6rem)", fontWeight: 300, color: dark, lineHeight: 1.1 }}>
            Every battery. Every chemistry.
          </h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }}>
          {items.map(({ title, desc, img }, i) => (
            <Reveal key={title} delay={i * 75}>
              <div className="imgZ cardH" style={{ background: white, overflow: "hidden", cursor: "pointer" }}>
                <div style={{ height: 195, overflow: "hidden" }}>
                  <img src={img} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.85) saturate(.7)" }} />
                </div>
                <div style={{ padding: "20px 22px 26px" }}>
                  <h3 style={{ fontFamily: serif, fontSize: 20, fontWeight: 300, color: dark, marginBottom: 7 }}>{title}</h3>
                  <p style={{ fontFamily: sans, fontSize: 12, lineHeight: 1.72, color: muted }}>{desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, marginTop: 2 }}>
          <Reveal dir="l">
            <div style={{ background: dark, padding: "52px 48px", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 250 }}>
              <div>
                <div style={{ fontFamily: sans, fontSize: 10, letterSpacing: ".28em", textTransform: "uppercase", color: gold, marginBottom: 14 }}>Our Commitment</div>
                <p style={{ fontFamily: serif, fontSize: "clamp(1.4rem,2.5vw,2rem)", fontWeight: 300, color: white, lineHeight: 1.42 }}>
                  Full compliance, zero compromise — from collection to certified material output.
                </p>
              </div>
              <button style={{ alignSelf: "flex-start", marginTop: 24, background: gold, color: dark, border: "none", padding: "11px 24px", fontFamily: sans, fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", cursor: "pointer" }}>
                View All Services
              </button>
            </div>
          </Reveal>
          <Reveal dir="r">
            <div className="imgZ" style={{ minHeight: 250, overflow: "hidden" }}>
              <img src="https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&q=80" alt="material"
                style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.8) saturate(.65)" }} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FullImage() {
  return (
    <section style={{ position: "relative", height: "70vh", overflow: "hidden" }}>
      <div className="imgZ" style={{ height: "100%" }}>
        <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800&q=85" alt="facility"
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.72) saturate(.65)" }} />
      </div>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(26,26,24,.45) 0%,transparent 55%)" }} />
      <Reveal dir="r" style={{ position: "absolute", bottom: 32, right: 40 }}>
        <div style={{ background: "rgba(244,242,238,.96)", backdropFilter: "blur(14px)", padding: "26px 30px", maxWidth: 310 }}>
          <div style={{ fontFamily: sans, fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: gold, marginBottom: 9 }}>Komstruk · 2024</div>
          <p style={{ fontFamily: serif, fontSize: 16, fontWeight: 300, color: dark, lineHeight: 1.45, fontStyle: "italic" }}>
            "Infrastructure built to close the loop — every battery a resource, never waste."
          </p>
        </div>
      </Reveal>
    </section>
  );
}

function ProcessSection() {
  const [ac, setAc] = useState(0);
  const steps = [
    { n:"01", t:"Collection",       d:"Nationwide pick-up network with certified hazmat transport and full chain-of-custody documentation from point of origin to facility gate." },
    { n:"02", t:"Pre-Sorting",      d:"Sensor-based and visual triage separates chemistries, form factors and damage states before entering the main processing lines." },
    { n:"03", t:"Discharge",        d:"Proprietary deep-discharge stations safely drain residual energy, reducing fire risk to near-zero before mechanical processing begins." },
    { n:"04", t:"Dismantling",      d:"Semi-automated disassembly lines strip modules, cooling systems and BMS hardware into separate certified material streams." },
    { n:"05", t:"Black Mass",       d:"Shredding, sieving and thermal pre-treatment yield high-purity black mass — the lithium-cobalt-nickel feedstock for downstream refining." },
    { n:"06", t:"Hydrometallurgy",  d:"Leaching, precipitation and solvent extraction recover over 98% of lithium, cobalt, nickel and manganese at battery-grade purity." },
    { n:"07", t:"Closing the Loop", d:"Recovered materials are certified and supplied directly to battery manufacturers — completing the circular economy cycle." },
  ];
  const imgs = [
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80",
    "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=700&q=80",
    "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=700&q=80",
    "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=700&q=80",
    "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=700&q=80",
    "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=700&q=80",
    "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=700&q=80",
  ];
  return (
    <section style={{ background: bgAlt, padding: "100px 40px" }}>
      <div style={{ maxWidth: 1380, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 72, alignItems: "start" }}>
          <Reveal>
            <div style={{ fontFamily: sans, fontSize: 10, letterSpacing: ".28em", textTransform: "uppercase", color: gold, marginBottom: 14 }}>The Process</div>
            <h2 style={{ fontFamily: serif, fontSize: "clamp(2.4rem,5vw,4rem)", fontWeight: 300, color: dark, lineHeight: 1.05 }}>
              The Komstruk<br /><em style={{ fontStyle: "italic", color: gold }}>Method</em>
            </h2>
            <p style={{ fontFamily: sans, fontSize: 13, lineHeight: 1.82, color: mid, marginTop: 18 }}>
              Seven precision steps from collection to certified material output — designed to maximise recovery and eliminate waste at every stage.
            </p>
          </Reveal>
          <div>
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 50}>
                <button onClick={() => setAc(i)} style={{
                  width: "100%", background: "none", border: "none", cursor: "pointer", textAlign: "left",
                  padding: "15px 0", borderBottom: `1px solid rgba(26,26,24,${ac===i ? .12 : .06})`,
                  display: "flex", alignItems: "center", gap: 18, transition: "border-color .25s",
                }}>
                  <span style={{ fontFamily: serif, fontSize: 12, color: ac===i ? gold : muted, transition: "color .3s", minWidth: 22 }}>{s.n}</span>
                  <span style={{ fontFamily: sans, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: ac===i ? dark : mid, transition: "color .3s", flex: 1, fontWeight: ac===i ? 500 : 400 }}>{s.t}</span>
                  <svg width="14" height="14" fill="none" stroke={ac===i ? gold : muted} strokeWidth="1.5" style={{ transition: "stroke .3s", flexShrink: 0 }}><path d="M6 3l5 4-5 4"/></svg>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, marginTop: 44 }}>
          <Reveal dir="l">
            <div className="imgZ" style={{ height: 400, overflow: "hidden" }}>
              <img key={ac} src={imgs[ac]} alt={steps[ac].t}
                style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.8) saturate(.65)", animation: "panelSwap .5s ease forwards" }} />
            </div>
          </Reveal>
          <Reveal dir="r">
            <div key={ac} style={{ background: dark, padding: "48px 44px", height: 400, display: "flex", flexDirection: "column", justifyContent: "center", animation: "panelSwap .5s ease forwards" }}>
              <div style={{ fontFamily: serif, fontSize: "4.5rem", fontWeight: 300, color: "rgba(184,154,78,.14)", lineHeight: 1 }}>{steps[ac].n}</div>
              <h3 style={{ fontFamily: serif, fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 300, color: white, marginTop: 10, lineHeight: 1.2 }}>{steps[ac].t}</h3>
              <p style={{ fontFamily: sans, fontSize: 13, lineHeight: 1.8, color: "#7a7670", marginTop: 14 }}>{steps[ac].d}</p>
              <div style={{ display: "flex", gap: 5, marginTop: 28 }}>
                {steps.map((_, i) => (
                  <button key={i} onClick={() => setAc(i)} style={{ flex: 1, height: 2, background: i <= ac ? gold : "rgba(255,255,255,.1)", border: "none", cursor: "pointer", transition: "background .3s" }} />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <button onClick={() => setAc(a => Math.max(0, a-1))} style={{ width: 42, height: 42, background: ac===0 ? bgAlt : dark, border: "1px solid rgba(26,26,24,.1)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background .3s" }}>
            <svg width="14" height="14" fill="none" stroke={ac===0 ? muted : white} strokeWidth="1.5"><path d="M9 4l-5 4 5 4"/></svg>
          </button>
          <button onClick={() => setAc(a => Math.min(steps.length-1, a+1))} style={{ width: 42, height: 42, background: ac===steps.length-1 ? bgAlt : dark, border: "1px solid rgba(26,26,24,.1)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background .3s" }}>
            <svg width="14" height="14" fill="none" stroke={ac===steps.length-1 ? muted : white} strokeWidth="1.5"><path d="M5 4l5 4-5 4"/></svg>
          </button>
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  const leftCats = [
    { title:"Pre-Sorting",   items:["Chemistry identification","Form factor scanning","Damage assessment","Chain of custody log"] },
    { title:"Pre-recycling", items:["Deep discharge protocol","Safety inspection","Weight and volume logging"] },
    { title:"Waste Mgmt.",   items:["Zero landfill routing","Hazmat certification","Compliance reporting"] },
  ];
  const rightCats = [
    { title:"Batteries",     items:["Li-Ion NMC","Li-Ion LFP","Li-Ion NCA","Li-S prototype"] },
    { title:"Live Tracking", items:["Real-time collection status","Chain-of-custody portal","Client dashboard access"] },
    { title:"Reporting",     items:["Certificate of destruction","Material yield report","CO2 offset document"] },
  ];
  const CatBlock = ({ title, items, delay }) => (
    <Reveal delay={delay}>
      <div style={{ fontFamily: sans, fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: dark, fontWeight: 600, paddingBottom: 9, marginBottom: 12, borderBottom: "1px solid rgba(26,26,24,.09)" }}>{title}</div>
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map(it => (
          <li key={it} style={{ fontFamily: sans, fontSize: 12, color: mid, paddingLeft: 14, position: "relative", lineHeight: 1.6 }}>
            <span style={{ position: "absolute", left: 0, color: gold, fontSize: 11 }}>·</span>{it}
          </li>
        ))}
      </ul>
    </Reveal>
  );
  return (
    <section style={{ background: bg, padding: "100px 40px" }}>
      <div style={{ maxWidth: 1380, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 2fr", gap: 72 }}>
        <div>
          <Reveal>
            <div style={{ fontFamily: sans, fontSize: 10, letterSpacing: ".28em", textTransform: "uppercase", color: gold, marginBottom: 14 }}>Why Komstruk</div>
            <h2 style={{ fontFamily: serif, fontSize: "clamp(2.4rem,5vw,4rem)", fontWeight: 300, color: dark, lineHeight: 1.05 }}>
              The Benefit<br />of trusted<br /><em style={{ fontStyle: "italic", color: gold }}>Infrastructure</em>
            </h2>
            <p style={{ fontFamily: sans, fontSize: 13, lineHeight: 1.82, color: mid, marginTop: 18 }}>
              We handle end-to-end logistics, regulatory compliance and certified material recovery — so you can focus on your core business.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div className="imgZ" style={{ marginTop: 36, height: 230, overflow: "hidden" }}>
              <img src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=700&q=80" alt="benefit"
                style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.8) saturate(.65)" }} />
            </div>
          </Reveal>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
            {leftCats.map(({ title, items }, i) => <CatBlock key={title} title={title} items={items} delay={i * 90} />)}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
            {rightCats.map(({ title, items }, i) => <CatBlock key={title} title={title} items={items} delay={i * 90 + 45} />)}
          </div>
        </div>
      </div>
      <Reveal style={{ maxWidth: 1380, margin: "72px auto 0", textAlign: "center" }}>
        <h2 style={{ fontFamily: serif, fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 300, color: dark }}>
          Worry-free <em style={{ fontStyle: "italic", color: gold }}>battery recycling.</em>
        </h2>
      </Reveal>
    </section>
  );
}

function StatsRow() {
  const stats = [
    { val:98,    suf:"%",    label:"Material Recovery" },
    { val:12000, suf:"+",    label:"Tonnes / Year" },
    { val:37,    suf:" GWh", label:"Capacity Handled" },
    { val:100,   suf:"%",    label:"Zero Landfill" },
  ];
  return (
    <section style={{ background: bgAlt }}>
      <div style={{ maxWidth: 1380, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
        {stats.map(({ val, suf, label }, i) => (
          <Reveal key={label} delay={i * 90}>
            <div style={{ padding: "60px 40px", borderRight: i < 3 ? "1px solid rgba(26,26,24,.07)" : "none" }}>
              <div style={{ fontFamily: serif, fontSize: "clamp(3rem,5vw,5rem)", fontWeight: 300, color: dark, lineHeight: 1 }}>
                <Cnt val={val} suf={suf} />
              </div>
              <div style={{ fontFamily: sans, fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: muted, marginTop: 12 }}>{label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function MaterialsSection() {
  const [ref, visible] = useIV();
  const cols = [
    { head:"Lithium Recovery",   text:"Our process achieves 99.5% purity — battery-grade feedstock ready for direct reuse in new cell manufacturing, cutting demand on primary mining." },
    { head:"Cobalt Extraction",  text:"Cobalt extracted at over 99.8% purity through advanced hydrometallurgical circuits, reducing primary mining reliance by up to 80%." },
    { head:"Nickel & Manganese", text:"Simultaneous NMC recovery streams yield nickel and manganese at battery grade within a single integrated process flow." },
    { head:"Copper & Aluminium", text:"Structural battery materials — copper foil, aluminium casing and busbars — recovered, recertified and returned to the supply chain." },
  ];
  const mats = [
    { name:"Lithium",   p:99.5, c:"#b89a4e" },
    { name:"Cobalt",    p:99.8, c:"#7aaccf" },
    { name:"Nickel",    p:99.6, c:"#8ab89a" },
    { name:"Manganese", p:99.2, c:"#c89a7a" },
    { name:"Copper",    p:99.9, c:"#c88a5a" },
    { name:"Aluminium", p:99.4, c:"#8aaac8" },
  ];
  return (
    <section style={{ background: bg, padding: "100px 40px" }}>
      <div style={{ maxWidth: 1380, margin: "0 auto" }}>
        <Reveal style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: sans, fontSize: 10, letterSpacing: ".28em", textTransform: "uppercase", color: gold, marginBottom: 12 }}>Materials Recovered</div>
          <h2 style={{ fontFamily: serif, fontSize: "clamp(2.2rem,4vw,3.6rem)", fontWeight: 300, color: dark, lineHeight: 1.1 }}>
            What we <em style={{ fontStyle: "italic", color: gold }}>recover</em>
          </h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 36, marginBottom: 68 }}>
          {cols.map(({ head, text }, i) => (
            <Reveal key={head} delay={i * 75}>
              <div>
                <div style={{ fontFamily: sans, fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: dark, fontWeight: 600, paddingBottom: 9, marginBottom: 12, borderBottom: "1px solid rgba(26,26,24,.09)" }}>{head}</div>
                <p style={{ fontFamily: sans, fontSize: 12, lineHeight: 1.75, color: mid }}>{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
          <Reveal dir="l">
            <div className="imgZ" style={{ height: 350, overflow: "hidden" }}>
              <img src="https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&q=80" alt="materials"
                style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.78) saturate(.6)" }} />
            </div>
          </Reveal>
          <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            {mats.map(({ name, p, c }, i) => (
              <Reveal key={name} delay={i * 65}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7, alignItems: "baseline" }}>
                    <span style={{ fontFamily: serif, fontSize: 18, fontWeight: 300, color: dark }}>{name}</span>
                    <span style={{ fontFamily: sans, fontSize: 11, color: c, letterSpacing: ".1em" }}>{p}%</span>
                  </div>
                  <div style={{ height: 2, background: "rgba(26,26,24,.08)", overflow: "hidden" }}>
                    <div style={{ height: "100%", background: c, width: visible ? `${p}%` : "0%", transition: `width 1.3s cubic-bezier(.16,1,.3,1) ${i * 85}ms` }} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function QuoteSection() {
  return (
    <section style={{ position: "relative", overflow: "hidden" }}>
      <img src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=1800&q=80" alt="environment"
        style={{ width: "100%", height: 480, objectFit: "cover", filter: "brightness(.25) saturate(.4)" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(26,26,24,.9) 0%,rgba(26,26,24,.55) 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 40px" }}>
        <div style={{ maxWidth: 800, textAlign: "center" }}>
          <Reveal dir="z">
            <p style={{ fontFamily: serif, fontSize: "clamp(1.6rem,3.5vw,3.2rem)", fontWeight: 300, color: white, lineHeight: 1.4, fontStyle: "italic" }}>
              "To recycle a lithium-ion battery is to close the most important loop in modern energy infrastructure."
            </p>
          </Reveal>
          <Reveal delay={280}>
            <div style={{ marginTop: 32, display: "flex", justifyContent: "center", alignItems: "center", gap: 14 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(184,154,78,.2)", border: "1px solid rgba(184,154,78,.35)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: serif, color: gold, fontSize: 16 }}>K</div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontFamily: sans, fontSize: 13, color: white }}>Dr. A. Verma</div>
                <div style={{ fontFamily: sans, fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: "#6a6660" }}>Head of Circular Materials, Komstruk</div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function GetStarted() {
  const cards = [
    { n:"01", t:"Start Recycling", d:"Schedule a collection or drop-off for your battery inventory. Same-week service available nationwide with certified transport.",                   cta:"Book Now", img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" },
    { n:"02", t:"Partner With Us", d:"Join our national logistics and recycling partner network for certified routing, shared infrastructure and attractive referral fees.",             cta:"Apply",    img:"https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&q=80" },
    { n:"03", t:"Request Data",    d:"Access full material reports, audit trails and certificates of destruction for every batch processed at our certified facilities.",               cta:"Contact",  img:"https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=80" },
  ];
  return (
    <section style={{ background: bgAlt, padding: "100px 40px" }}>
      <div style={{ maxWidth: 1380, margin: "0 auto" }}>
        <Reveal style={{ marginBottom: 56 }}>
          <div style={{ fontFamily: sans, fontSize: 10, letterSpacing: ".28em", textTransform: "uppercase", color: gold, marginBottom: 12 }}>Get Started</div>
          <h2 style={{ fontFamily: serif, fontSize: "clamp(2.2rem,4vw,3.6rem)", fontWeight: 300, color: dark, lineHeight: 1.1 }}>
            How to <em style={{ fontStyle: "italic", color: gold }}>begin</em>
          </h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }}>
          {cards.map(({ n, t, d, cta, img }, i) => (
            <Reveal key={t} delay={i * 100}>
              <div className="imgZ cardH" style={{ background: white, overflow: "hidden", cursor: "pointer" }}>
                <div style={{ height: 215, overflow: "hidden", position: "relative" }}>
                  <img src={img} alt={t} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.72) saturate(.6)" }} />
                  <div style={{ position: "absolute", top: 16, left: 18, fontFamily: serif, fontSize: 48, fontWeight: 300, color: "rgba(255,255,255,.55)", lineHeight: 1 }}>{n}</div>
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(26,26,24,.5) 0%,transparent 55%)" }} />
                </div>
                <div style={{ padding: "24px 24px 30px" }}>
                  <h3 style={{ fontFamily: serif, fontSize: 22, fontWeight: 300, color: dark, marginBottom: 9 }}>{t}</h3>
                  <p style={{ fontFamily: sans, fontSize: 12, lineHeight: 1.72, color: muted, marginBottom: 20 }}>{d}</p>
                  <button style={{ background: "none", border: "1px solid rgba(26,26,24,.18)", color: dark, padding: "9px 20px", fontFamily: sans, fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 7, transition: "all .25s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = dark; e.currentTarget.style.color = white; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = dark; }}>
                    {cta}
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 6h8M7 2l4 4-4 4"/></svg>
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    { h:"Services",  ls:["EV Battery Recycling","Grid Storage","Industrial Packs","Consumer Electronics","Marine & Aviation"] },
    { h:"Company",   ls:["About Komstruk","Technology","Certifications","Careers","Press"] },
    { h:"Resources", ls:["Impact Reports","Data Sheets","Compliance","API Access","FAQs"] },
  ];
  return (
    <footer style={{ background: dark, padding: "68px 40px 26px" }}>
      <div style={{ maxWidth: 1380, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 44, marginBottom: 52 }}>
          <div>
            <div style={{ fontFamily: serif, fontSize: 22, fontWeight: 300, color: white, letterSpacing: ".18em", textTransform: "uppercase", marginBottom: 12 }}>komstruk</div>
            <p style={{ fontFamily: sans, fontSize: 12, lineHeight: 1.8, color: "#4a4840", maxWidth: 250 }}>
              Closing the loop on critical battery materials. ISO 14001 certified. Nationwide coverage.
            </p>
            <div style={{ display: "flex", gap: 7, marginTop: 22 }}>
              {[["Li","#b89a4e"],["Co","#7aaccf"],["Ni","#8ab89a"],["Mn","#c89a7a"]].map(([el,c]) => (
                <div key={el} style={{ width: 36, height: 36, border: `1px solid ${c}30`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: serif, fontSize: 12, color: c, opacity: .65, cursor: "pointer", transition: "opacity .3s" }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "1"}
                  onMouseLeave={e => e.currentTarget.style.opacity = ".65"}>{el}</div>
              ))}
            </div>
          </div>
          {cols.map(({ h, ls }) => (
            <div key={h}>
              <div style={{ fontFamily: sans, fontSize: 10, letterSpacing: ".24em", textTransform: "uppercase", color: "#3a3830", marginBottom: 18 }}>{h}</div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 11 }}>
                {ls.map(l => (
                  <li key={l}><a href="#" style={{ fontFamily: sans, fontSize: 12, color: "#2e2c28", transition: "color .2s" }}
                    onMouseEnter={e => e.target.style.color = "#7a7670"}
                    onMouseLeave={e => e.target.style.color = "#2e2c28"}>{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,.05)", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <span style={{ fontFamily: sans, fontSize: 11, color: "#2a2820" }}>© 2024 Komstruk. All rights reserved.</span>
          <div style={{ display: "flex", gap: 24 }}>
            {["Privacy Policy","Terms","Certifications"].map(l => (
              <a key={l} href="#" style={{ fontFamily: sans, fontSize: 11, color: "#2a2820" }}>{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Recycling() {
  return (
    <div style={{ background: bg, color: dark, minHeight: "100vh" }}>
      <GlobalStyles />
      <Hero />
      <WhatWeProcess />
      <FullImage />
      <ProcessSection />
      <Benefits />
      <StatsRow />
      <MaterialsSection />
      <QuoteSection />
      <GetStarted />
    </div>
  );
}