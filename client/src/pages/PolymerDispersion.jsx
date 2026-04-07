import React from "react";
import { useState, useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,300;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --green: #2e7d4f;
    --green-light: #4caf77;
    --green-pale: #e8f5ee;
    --dark: #0f1a14;
    --mid: #2a3d32;
    --text: #1c2b22;
    --muted: #5a7060;
    --border: #d2e3d8;
    --white: #ffffff;
    --cream: #f7faf8;
  }

  html { scroll-behavior: smooth; }

  body, .ek-root {
    font-family: 'Roboto', sans-serif;
    color: var(--text);
    background: var(--white);
    line-height: 1.6;
    overflow-x: hidden;
  }

  /* NAV */
  .ek-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 60px; height: 72px;
    background: rgba(255,255,255,0.95);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
  }
  .ek-nav-logo {
    font-family: 'Roboto', sans-serif; font-weight: 900; font-size: 1.4rem;
    color: var(--dark); text-decoration: none; letter-spacing: -0.5px;
  }
  .ek-nav-logo span { color: var(--green); }
  .ek-nav-links { display: flex; gap: 36px; list-style: none; }
  .ek-nav-links a {
    font-size: 0.85rem; font-weight: 500; letter-spacing: 0.04em;
    text-transform: uppercase; color: var(--muted); text-decoration: none;
    transition: color .2s;
  }
  .ek-nav-links a:hover, .ek-nav-links a.active { color: var(--green); }
  .ek-nav-breadcrumb {
    font-size: 0.8rem; color: var(--muted);
    display: flex; align-items: center; gap: 8px;
  }
  .ek-nav-breadcrumb span { color: var(--green); font-weight: 500; }

  /* HERO */
  .ek-hero {
    padding: 160px 60px 100px;
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 80px; align-items: center;
    max-width: 1280px; margin: 0 auto;
  }
  .ek-hero-tag {
    display: inline-block; font-size: 0.72rem; font-weight: 600;
    letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--green); background: var(--green-pale);
    border: 1px solid #b8dfc8; padding: 6px 14px;
    border-radius: 100px; margin-bottom: 24px;
  }
  .ek-hero h1 {
    font-family: 'Roboto', sans-serif; font-size: clamp(2.8rem, 5vw, 4.2rem);
    font-weight: 900; line-height: 1.05; letter-spacing: -2px;
    color: var(--dark); margin-bottom: 24px;
  }
  .ek-hero h1 em { font-style: normal; color: var(--green); }
  .ek-hero-desc {
    font-size: 1.05rem; color: var(--muted); font-weight: 300;
    line-height: 1.75; margin-bottom: 36px; max-width: 480px;
  }
  .ek-hero-stat-row { display: flex; gap: 40px; margin-bottom: 40px; }
  .ek-hero-stat strong {
    display: block; font-family: 'Roboto', sans-serif;
    font-size: 2rem; font-weight: 900; color: var(--green); letter-spacing: -1px;
  }
  .ek-hero-stat span {
    font-size: 0.8rem; color: var(--muted);
    text-transform: uppercase; letter-spacing: 0.06em;
  }

  /* BUTTONS */
  .ek-btn-primary {
    display: inline-flex; align-items: center; gap: 10px;
    background: var(--green); color: #fff;
    font-family: 'Roboto', sans-serif; font-size: 0.9rem; font-weight: 500;
    padding: 14px 28px; border-radius: 6px; text-decoration: none;
    border: none; cursor: pointer;
    transition: background .2s, transform .2s;
  }
  .ek-btn-primary:hover { background: var(--mid); transform: translateY(-2px); }
  .ek-btn-secondary {
    display: inline-flex; align-items: center; gap: 8px;
    border: 1.5px solid var(--border); color: var(--text);
    font-family: 'Roboto', sans-serif; font-size: 0.9rem; font-weight: 500;
    padding: 14px 28px; border-radius: 6px; text-decoration: none;
    background: none; cursor: pointer;
    transition: border-color .2s, color .2s;
  }
  .ek-btn-secondary:hover { border-color: var(--green); color: var(--green); }

  /* HERO VISUAL */
  .ek-hero-visual {
    position: relative; background: var(--dark);
    border-radius: 20px; overflow: hidden;
    aspect-ratio: 4/3; display: flex; align-items: center; justify-content: center;
  }
  .ek-hero-visual-inner {
    width: 100%; height: 100%;
    background:
      radial-gradient(ellipse at 30% 40%, rgba(46,125,79,0.45) 0%, transparent 60%),
      radial-gradient(ellipse at 75% 70%, rgba(76,175,119,0.25) 0%, transparent 50%),
      var(--dark);
    display: flex; align-items: center; justify-content: center;
  }
  .ek-particle-canvas { width: 80%; max-width: 320px; }
  .ek-particle-canvas svg { width: 100%; }
  .ek-hero-badge {
    position: absolute; bottom: 24px; right: 24px;
    background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15);
    backdrop-filter: blur(8px); padding: 12px 20px;
    border-radius: 10px; text-align: center;
  }
  .ek-hero-badge strong {
    display: block; font-family: 'Roboto', sans-serif;
    font-size: 1.5rem; color: var(--green-light); font-weight: 900;
  }
  .ek-hero-badge span { font-size: 0.72rem; color: rgba(255,255,255,0.6); letter-spacing: 0.05em; }

  /* SECTION LABEL */
  .ek-section-label {
    display: inline-flex; align-items: center; gap: 10px;
    font-size: 0.72rem; font-weight: 600; letter-spacing: 0.12em;
    text-transform: uppercase; color: var(--green); margin-bottom: 20px;
  }
  .ek-section-label::before {
    content: ''; display: block; width: 28px; height: 2px; background: var(--green);
  }
  .ek-section-label.light { color: var(--green-light); }
  .ek-section-label.light::before { background: var(--green-light); }
  .ek-section-label.center { justify-content: center; }
  .ek-section-label.center::before { display: none; }

  /* DISPERSION SECTION */
  .ek-section-dispersion { background: var(--cream); padding: 100px 60px; }
  .ek-section-inner { max-width: 1280px; margin: 0 auto; }
  .ek-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
  .ek-section-dispersion h2 {
    font-family: 'Roboto', sans-serif; font-size: clamp(1.8rem, 3vw, 2.6rem);
    font-weight: 700; letter-spacing: -1px; line-height: 1.15;
    color: var(--dark); margin-bottom: 20px;
  }
  .ek-section-dispersion p {
    font-size: 1rem; color: var(--muted); line-height: 1.8;
    font-weight: 300; margin-bottom: 16px;
  }
  .ek-insight-card {
    background: var(--white); border: 1px solid var(--border);
    border-radius: 16px; padding: 36px;
  }
  .ek-insight-card p {
    font-size: 1.05rem; color: var(--text); font-weight: 400; line-height: 1.7; margin-bottom: 0;
  }
  .ek-insight-card .ek-divider {
    margin-top: 24px; padding-top: 24px; border-top: 1px solid var(--border);
  }
  .ek-insight-card .ek-divider p {
    font-size: 0.8rem; color: var(--muted); font-weight: 400; line-height: 1.6; margin: 0;
  }

  /* STEPS SECTION */
  .ek-section-steps { padding: 100px 60px; background: var(--white); }
  .ek-steps-header { text-align: center; margin-bottom: 72px; }
  .ek-steps-header h2 {
    font-family: 'Roboto', sans-serif; font-size: clamp(1.8rem, 3vw, 2.8rem);
    font-weight: 900; letter-spacing: -1.5px; color: var(--dark); margin-bottom: 14px;
  }
  .ek-steps-header p { font-size: 1rem; color: var(--muted); font-weight: 300; max-width: 560px; margin: 0 auto; line-height: 1.75; }
  .ek-steps-grid {
    display: grid; grid-template-columns: repeat(4, 1fr);
    gap: 2px; background: var(--border);
    border-radius: 16px; overflow: hidden;
    max-width: 1280px; margin: 0 auto;
  }
  .ek-step-card {
    background: var(--white); padding: 44px 32px;
    transition: background .25s; cursor: default;
  }
  .ek-step-card:hover { background: var(--green-pale); }
  .ek-step-num {
    font-family: 'Roboto', sans-serif; font-size: 3.5rem; font-weight: 900;
    color: var(--border); line-height: 1; margin-bottom: 20px;
    letter-spacing: -2px; transition: color .25s;
  }
  .ek-step-card:hover .ek-step-num { color: #b8dfc8; }
  .ek-step-icon {
    width: 48px; height: 48px; background: var(--green-pale);
    border-radius: 10px; display: flex; align-items: center; justify-content: center;
    margin-bottom: 20px; transition: background .25s;
  }
  .ek-step-card:hover .ek-step-icon { background: var(--green); }
  .ek-step-card:hover .ek-step-icon svg path,
  .ek-step-card:hover .ek-step-icon svg circle,
  .ek-step-card:hover .ek-step-icon svg line { stroke: #fff; }
  .ek-step-card h3 {
    font-family: 'Roboto', sans-serif; font-size: 1rem; font-weight: 700;
    color: var(--dark); margin-bottom: 12px; letter-spacing: -0.3px;
  }
  .ek-step-card p { font-size: 0.88rem; color: var(--muted); line-height: 1.7; font-weight: 300; }

  /* SEM SECTION */
  .ek-section-sem {
    background: var(--dark); padding: 100px 60px;
    position: relative; overflow: hidden;
  }
  .ek-section-sem::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(ellipse at 80% 50%, rgba(46,125,79,0.3) 0%, transparent 60%);
    pointer-events: none;
  }
  .ek-sem-inner {
    max-width: 1280px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 80px; align-items: center; position: relative;
  }
  .ek-sem-inner h2 {
    font-family: 'Roboto', sans-serif; font-size: clamp(1.8rem, 3vw, 2.6rem);
    font-weight: 700; letter-spacing: -1px; color: #fff;
    margin-bottom: 20px; line-height: 1.15;
  }
  .ek-sem-inner p { font-size: 1rem; color: rgba(255,255,255,0.55); line-height: 1.8; font-weight: 300; margin-bottom: 16px; }
  .ek-sem-highlight {
    display: inline-block; border: 1px solid rgba(76,175,119,0.4);
    border-radius: 8px; padding: 16px 24px; margin-top: 8px;
  }
  .ek-sem-highlight strong {
    font-family: 'Roboto', sans-serif; font-size: 1.6rem;
    color: var(--green-light); font-weight: 900; display: block; letter-spacing: -1px;
  }
  .ek-sem-highlight span { font-size: 0.8rem; color: rgba(255,255,255,0.45); letter-spacing: 0.06em; text-transform: uppercase; }
  .ek-sem-image-wrap { border-radius: 16px; overflow: hidden; background: #1a2e22; }
  .ek-sem-fake {
    width: 100%; aspect-ratio: 1;
    background:
      repeating-radial-gradient(circle at 30% 30%, rgba(180,200,185,0.08) 0, rgba(180,200,185,0.08) 2px, transparent 2px, transparent 18px),
      repeating-radial-gradient(circle at 65% 60%, rgba(150,180,160,0.07) 0, rgba(150,180,160,0.07) 3px, transparent 3px, transparent 22px),
      radial-gradient(ellipse at 40% 40%, rgba(46,80,55,0.9) 0%, #0f1a14 100%);
    position: relative; display: flex; align-items: flex-end;
  }
  .ek-sem-scale-bar { margin: 0 0 18px 18px; display: flex; align-items: center; gap: 8px; }
  .ek-sem-scale-bar div { width: 80px; height: 4px; background: rgba(255,255,255,0.6); }
  .ek-sem-scale-bar span { font-size: 0.75rem; color: rgba(255,255,255,0.55); font-family: monospace; }
  .ek-sem-footer {
    background: rgba(0,0,0,0.5); padding: 12px 20px;
    display: flex; justify-content: space-between; align-items: center;
  }

  /* THEORY SECTION */
  .ek-section-theory { padding: 100px 60px; background: var(--cream); }
  .ek-theory-grid {
    display: grid; grid-template-columns: 2fr 1fr;
    gap: 80px; max-width: 1280px; margin: 0 auto; align-items: start;
  }
  .ek-theory-grid h2 {
    font-family: 'Roboto', sans-serif; font-size: clamp(1.8rem, 3vw, 2.6rem);
    font-weight: 700; letter-spacing: -1px; color: var(--dark);
    margin-bottom: 24px; line-height: 1.15;
  }
  .ek-theory-grid p { font-size: 1rem; color: var(--muted); line-height: 1.8; font-weight: 300; margin-bottom: 16px; }
  .ek-info-card {
    background: var(--white); border: 1px solid var(--border);
    border-radius: 14px; padding: 32px; margin-bottom: 16px;
  }
  .ek-info-card:last-child { margin-bottom: 0; }
  .ek-info-card h4 { font-family: 'Roboto', sans-serif; font-size: 1rem; font-weight: 700; color: var(--dark); margin-bottom: 8px; }
  .ek-info-card p { font-size: 0.875rem; color: var(--muted); line-height: 1.7; font-weight: 300; margin: 0; }
  .ek-info-card-icon {
    width: 36px; height: 36px; background: var(--green-pale);
    border-radius: 8px; display: flex; align-items: center; justify-content: center;
    margin-bottom: 14px;
  }

  /* CTA SECTION */
  .ek-section-cta { padding: 100px 60px; background: var(--white); text-align: center; }
  .ek-cta-inner { max-width: 640px; margin: 0 auto; }
  .ek-cta-inner h2 {
    font-family: 'Roboto', sans-serif; font-size: clamp(1.8rem, 3vw, 2.8rem);
    font-weight: 900; letter-spacing: -1.5px; color: var(--dark); margin-bottom: 16px;
  }
  .ek-cta-inner p { font-size: 1rem; color: var(--muted); font-weight: 300; line-height: 1.75; margin-bottom: 36px; }
  .ek-cta-buttons { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }

  /* FOOTER */
  .ek-footer {
    background: var(--dark); padding: 60px;
    display: flex; align-items: center; justify-content: space-between;
    flex-wrap: wrap; gap: 20px;
  }
  .ek-footer-logo { font-family: 'Roboto', sans-serif; font-size: 1.2rem; font-weight: 900; color: #fff; text-decoration: none; }
  .ek-footer-logo span { color: var(--green-light); }
  .ek-footer p { font-size: 0.8rem; color: rgba(255,255,255,0.35); }
  .ek-footer-links { display: flex; gap: 28px; }
  .ek-footer-links a { font-size: 0.8rem; color: rgba(255,255,255,0.4); text-decoration: none; transition: color .2s; }
  .ek-footer-links a:hover { color: var(--green-light); }

  /* REVEAL ANIMATION */
  .ek-reveal { opacity: 0; transform: translateY(28px); transition: opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1); }
  .ek-reveal.visible { opacity: 1; transform: none; }
  .ek-reveal-d1 { transition-delay: .1s; }
  .ek-reveal-d2 { transition-delay: .2s; }
  .ek-reveal-d3 { transition-delay: .3s; }
  .ek-reveal-d4 { transition-delay: .4s; }

  /* PARTICLE ANIMATIONS */
  @keyframes float1 { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-8px);} }
  @keyframes float2 { 0%,100%{transform:translateY(0);} 50%{transform:translateY(6px);} }
  @keyframes float3 { 0%,100%{transform:translateY(0) translateX(0);} 50%{transform:translateY(-5px) translateX(4px);} }
  @keyframes fadeInChain { to { opacity: 1; } }
  .anim-float1 { animation: float1 4s ease-in-out infinite; }
  .anim-float2 { animation: float2 5s ease-in-out infinite; }
  .anim-float3 { animation: float3 3.5s ease-in-out infinite; }
  .anim-chain { animation: fadeInChain 2s ease forwards; opacity: 0; }

  /* RESPONSIVE */
  @media (max-width: 900px) {
    .ek-nav { padding: 0 24px; }
    .ek-hero, .ek-two-col, .ek-sem-inner, .ek-theory-grid { grid-template-columns: 1fr; gap: 40px; }
    .ek-hero { padding: 120px 24px 60px; }
    .ek-section-dispersion, .ek-section-steps, .ek-section-sem,
    .ek-section-theory, .ek-section-cta { padding: 72px 24px; }
    .ek-steps-grid { grid-template-columns: 1fr 1fr; }
    .ek-footer { padding: 40px 24px; }
    .ek-nav-breadcrumb { display: none; }
  }
  @media (max-width: 560px) {
    .ek-steps-grid { grid-template-columns: 1fr; }
  }
`;

// ── Reusable Reveal wrapper ──
function Reveal({ children, delay = "", className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.unobserve(el); }
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const delayClass = delay ? `ek-reveal-d${delay}` : "";
  return (
    <div ref={ref} className={`ek-reveal ${delayClass} ${visible ? "visible" : ""} ${className}`}>
      {children}
    </div>
  );
}

// ── Arrow icon ──
const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ── Nav ──
function Nav() {
  return (
    <nav className="ek-nav">
      <a href="#" className="ek-nav-logo">ELEKTRO<span>ACTIVE</span></a>
      <ul className="ek-nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#" className="active">Products</a></li>
        <li><a href="#">Applications</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
      <div className="ek-nav-breadcrumb">
        Products / <span>Polyaniline Dispersion</span>
      </div>
    </nav>
  );
}

// ── Hero ──
function Hero() {
  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => { setTimeout(() => setHeroVisible(true), 200); }, []);
  return (
    <section className="ek-hero">
      <div className={`ek-reveal ${heroVisible ? "visible" : ""}`}>
        <span className="ek-hero-tag">Conducting Polymers</span>
        <h1>Polyaniline <em>Dispersion</em></h1>
        <p className="ek-hero-desc">
          A precise nanoscale process that transforms particle agglomerates into a stable, electrically conductive medium — engineered for performance at the molecular level.
        </p>
        <div className="ek-hero-stat-row">
          <div className="ek-hero-stat"><strong>10 nm</strong><span>Primary particle size</span></div>
          <div className="ek-hero-stat"><strong>70 nm</strong><span>Secondary particle size</span></div>
          <div className="ek-hero-stat"><strong>300 m²</strong><span>Surface at 1% in 100ml</span></div>
        </div>
        <a href="#steps" className="ek-btn-primary">Explore the Process <ArrowIcon /></a>
      </div>
      <div className={`ek-reveal ek-reveal-d2 ${heroVisible ? "visible" : ""}`}>
        <div className="ek-hero-visual">
          <div className="ek-hero-visual-inner">
            <div className="ek-particle-canvas">
              <svg viewBox="0 0 300 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g className="anim-float1">
                  <circle cx="52" cy="90" r="18" fill="#2e7d4f" opacity=".9"/>
                  <circle cx="72" cy="78" r="14" fill="#4caf77" opacity=".8"/>
                  <circle cx="68" cy="104" r="16" fill="#2e7d4f" opacity=".85"/>
                  <circle cx="40" cy="108" r="12" fill="#4caf77" opacity=".7"/>
                </g>
                <path d="M102 95 L148 95" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeDasharray="4 4"/>
                <path d="M144 89 L152 95 L144 101" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <g className="anim-chain">
                  <circle cx="178" cy="65" r="11" fill="#4caf77" opacity=".95"/>
                  <circle cx="206" cy="80" r="11" fill="#2e7d4f" opacity=".9"/>
                  <circle cx="234" cy="70" r="11" fill="#4caf77" opacity=".9"/>
                  <circle cx="258" cy="88" r="11" fill="#2e7d4f" opacity=".85"/>
                  <line x1="189" y1="65" x2="195" y2="80" stroke="#4caf77" strokeWidth="2" opacity=".5"/>
                  <line x1="217" y1="80" x2="223" y2="70" stroke="#4caf77" strokeWidth="2" opacity=".5"/>
                  <line x1="245" y1="70" x2="247" y2="88" stroke="#4caf77" strokeWidth="2" opacity=".5"/>
                </g>
                <text x="52" y="135" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="Roboto, sans-serif">Agglomerate</text>
                <text x="218" y="135" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="Roboto, sans-serif">Pearl-chain structure</text>
                <g className="anim-float2">
                  <circle cx="100" cy="170" r="8" fill="#4caf77" opacity=".7"/>
                  <circle cx="150" cy="165" r="10" fill="#2e7d4f" opacity=".8"/>
                  <circle cx="200" cy="172" r="7" fill="#4caf77" opacity=".65"/>
                </g>
              </svg>
            </div>
          </div>
          <div className="ek-hero-badge">
            <strong>300 m²</strong>
            <span>inner surface / 100ml @ 1%</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Dispersion Section ──
function DispersionSection() {
  return (
    <section className="ek-section-dispersion">
      <div className="ek-section-inner">
        <div className="ek-two-col">
          <Reveal>
            <div className="ek-section-label">Science of Dispersion</div>
            <h2>More than just mixing — a nanoscale engineering feat</h2>
            <p>
              "Dispersion" is widely underestimated, even among scientists. Contrary to popular belief, it is not simply mixing two or more components together. True dispersion requires specialised high-shear machinery and involves several simultaneous complex operations occurring at the nanoscale.
            </p>
            <p>
              For Polyaniline, the primary particle size is just <strong>10 nm</strong>. In a polymer blend, we achieve around <strong>70 nm secondary particle size</strong>. The dispersion process begins by separating these 70 nm particles from large agglomerates.
            </p>
          </Reveal>
          <Reveal delay="2">
            <div className="ek-insight-card">
              <div className="ek-section-label">Key Insight</div>
              <p>
                Once the concentration of dispersed conductive particles exceeds a critical threshold, they self-organise into <strong>pearl-chain-like structures</strong> — where particles are in direct contact, enabling electrical conductivity.
              </p>
              <div className="ek-divider">
                <p>
                  These are called <em>dissipative structures</em>, described by Bernhard Wessling's non-equilibrium thermodynamic theory — grounded in Nobel laureate Prof. Ilya Prigogine's general framework.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ── Steps Section ──
const steps = [
  {
    num: "01", title: "Separation of Particle Contacts",
    desc: "High-shear forces break apart the bonds between agglomerated particles, isolating the 70 nm secondary particles from large clusters.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="6" cy="10" r="4" stroke="#2e7d4f" strokeWidth="1.5"/>
        <circle cx="14" cy="10" r="4" stroke="#2e7d4f" strokeWidth="1.5"/>
        <path d="M10 10 h4" stroke="#2e7d4f" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    num: "02", title: "Generation of Inner Surface",
    desc: "Turbulence creates internal surfaces within the dispersion medium — the interfaces that form only under non-laminar, dynamic flow conditions.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 16 Q10 4 16 16" stroke="#2e7d4f" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="10" y1="16" x2="10" y2="12" stroke="#2e7d4f" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    num: "03", title: "Removal of Adsorbed Materials",
    desc: "The dispersion medium simultaneously strips adsorbed contaminants — including air, water, and various impurities — from particle surfaces.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="6" stroke="#2e7d4f" strokeWidth="1.5"/>
        <path d="M7 10 l2 2 4-4" stroke="#2e7d4f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    num: "04", title: "Monomolecular Layer Adsorption",
    desc: "Freshly cleaned particle surfaces adsorb a monomolecular layer of the dispersion medium — providing stable, lasting surface passivation.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="6" stroke="#2e7d4f" strokeWidth="1.5"/>
        <circle cx="10" cy="10" r="3" stroke="#2e7d4f" strokeWidth="1.5"/>
      </svg>
    )
  }
];

function StepsSection() {
  return (
    <section className="ek-section-steps" id="steps">
      <div className="ek-section-inner">
        <Reveal className="ek-steps-header">
          <div className="ek-section-label" style={{justifyContent:"center"}}>The 4-Step Dispersion Process</div>
          <h2>Four simultaneous nanoscale events</h2>
          <p>These steps occur concurrently under turbulent conditions — laminar flow cannot achieve true dispersion.</p>
        </Reveal>
        <div className="ek-steps-grid">
          {steps.map((s, i) => (
            <Reveal key={s.num} delay={String(i + 1)}>
              <div className="ek-step-card">
                <div className="ek-step-num">{s.num}</div>
                <div className="ek-step-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── SEM Section ──
function SEMSection() {
  return (
    <section className="ek-section-sem">
      <div className="ek-sem-inner">
        <Reveal>
          <div className="ek-section-label light">Electron Microscopy</div>
          <h2>Pearl-chain structures under the electron microscope</h2>
          <p>
            After dispersion is complete, when the conductive particle concentration exceeds a critical level, formerly isolated particles self-organise. Under SEM imaging, the characteristic pearl-chain formations are clearly visible — direct particle-to-particle contacts that enable electrical conduction.
          </p>
          <p>
            These dissipative structures are thermodynamically governed — self-organising systems far from equilibrium, consistent with Prigogine's framework as extended by Bernhard Wessling.
          </p>
          <div className="ek-sem-highlight">
            <strong>at 1% in 100 ml: 300 m²</strong>
            <span>Total inner surface generated</span>
          </div>
        </Reveal>
        <Reveal delay="2">
          <div className="ek-sem-image-wrap">
            <div className="ek-sem-fake">
              <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" style={{position:"absolute",inset:0,width:"100%",height:"100%"}}>
                <defs>
                  <radialGradient id="pg1" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#8ab89a" stopOpacity="0.9"/>
                    <stop offset="100%" stopColor="#2e5040" stopOpacity="0.6"/>
                  </radialGradient>
                  <radialGradient id="pg2" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#a0c8a8" stopOpacity="0.8"/>
                    <stop offset="100%" stopColor="#1a3025" stopOpacity="0.5"/>
                  </radialGradient>
                  <filter id="grain">
                    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/>
                    <feColorMatrix type="saturate" values="0"/>
                    <feBlend in="SourceGraphic" mode="overlay" result="blend"/>
                    <feComposite in="blend" in2="SourceGraphic" operator="in"/>
                  </filter>
                </defs>
                <g opacity="0.85">
                  <circle cx="80" cy="160" r="22" fill="url(#pg1)"/>
                  <circle cx="118" cy="148" r="20" fill="url(#pg2)"/>
                  <circle cx="154" cy="158" r="21" fill="url(#pg1)"/>
                  <circle cx="188" cy="145" r="19" fill="url(#pg2)"/>
                  <circle cx="220" cy="158" r="22" fill="url(#pg1)"/>
                  <circle cx="100" cy="220" r="19" fill="url(#pg2)"/>
                  <circle cx="135" cy="230" r="21" fill="url(#pg1)"/>
                  <circle cx="170" cy="218" r="20" fill="url(#pg2)"/>
                  <circle cx="205" cy="228" r="22" fill="url(#pg1)"/>
                  <circle cx="240" cy="215" r="18" fill="url(#pg2)"/>
                  <circle cx="270" cy="170" r="20" fill="url(#pg1)"/>
                  <circle cx="300" cy="158" r="21" fill="url(#pg2)"/>
                  <circle cx="330" cy="168" r="19" fill="url(#pg1)"/>
                  <circle cx="60" cy="280" r="18" fill="url(#pg2)" opacity="0.7"/>
                  <circle cx="290" cy="260" r="20" fill="url(#pg1)" opacity="0.75"/>
                  <circle cx="350" cy="240" r="16" fill="url(#pg2)" opacity="0.65"/>
                  <circle cx="140" cy="290" r="17" fill="url(#pg1)" opacity="0.7"/>
                </g>
                <rect width="400" height="400" fill="transparent" filter="url(#grain)" opacity="0.15"/>
              </svg>
              <div className="ek-sem-scale-bar">
                <div></div>
                <span>300 nm</span>
              </div>
            </div>
            <div className="ek-sem-footer">
              <span style={{fontSize:"0.72rem",color:"rgba(255,255,255,0.45)",fontFamily:"monospace",letterSpacing:"0.05em"}}>SEM 0062B — Pearl-chain structure</span>
              <span style={{fontSize:"0.72rem",color:"rgba(76,175,119,0.7)",fontFamily:"monospace"}}>×50,000</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── Theory Section ──
const infoCards = [
  {
    title: "Dissipative Structures",
    desc: "Self-organising systems maintained by a continuous flow of energy, far from thermodynamic equilibrium — as described by Prigogine (Nobel, 1977).",
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="5.5" stroke="#2e7d4f" strokeWidth="1.4"/><path d="M8 5.5v3l2 1" stroke="#2e7d4f" strokeWidth="1.4" strokeLinecap="round"/></svg>
  },
  {
    title: "Critical Concentration",
    desc: "Below the threshold, particles remain isolated. Above it, they spontaneously connect into conductive networks — a sharp, tuneable transition.",
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8 Q5 2 8 8 Q11 14 14 8" stroke="#2e7d4f" strokeWidth="1.4" strokeLinecap="round" fill="none"/></svg>
  },
  {
    title: "Pearl-Chain Networks",
    desc: "Directly contacting particle chains form the conductive pathways — confirmed by SEM imaging and electrical measurements across formulations.",
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="6" width="5" height="5" rx="1" stroke="#2e7d4f" strokeWidth="1.4"/><rect x="9" y="5" width="5" height="5" rx="1" stroke="#2e7d4f" strokeWidth="1.4"/><path d="M7 8.5h2" stroke="#2e7d4f" strokeWidth="1.4" strokeLinecap="round"/></svg>
  }
];

function TheorySection() {
  return (
    <section className="ek-section-theory">
      <div className="ek-theory-grid">
        <Reveal>
          <div className="ek-section-label">Thermodynamic Theory</div>
          <h2>Dissipative structures &amp; non-equilibrium thermodynamics</h2>
          <p>
            When isolated conductive particles exceed a critical concentration in the dispersion, a remarkable self-organisation phenomenon occurs. The particles form interconnected pearl-chain networks — not by chance, but through a thermodynamically driven process.
          </p>
          <p>
            Bernhard Wessling developed a specialised non-equilibrium thermodynamical theory to explain these dispersion and emulsion behaviours. His model is grounded in the Nobel Prize-winning general non-equilibrium thermodynamics of Prof. Ilya Prigogine — the science of dissipative, self-organising systems far from equilibrium.
          </p>
          <p>
            These structures enable the conductive particles to form direct electrical pathways through the polymer matrix, producing materials with controllable conductivity tuned at the nanoscale.
          </p>
          <a href="#" className="ek-btn-primary" style={{marginTop:"8px"}}>
            Read the Publications <ArrowIcon />
          </a>
        </Reveal>
        <Reveal delay="2">
          {infoCards.map((card) => (
            <div className="ek-info-card" key={card.title}>
              <div className="ek-info-card-icon">{card.icon}</div>
              <h4>{card.title}</h4>
              <p>{card.desc}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

// ── CTA ──
function CTASection() {
  return (
    <section className="ek-section-cta">
      <div className="ek-cta-inner">
        <Reveal>
          <div className="ek-section-label center">Get in Touch</div>
          <h2>Ready to explore Polyaniline Dispersion?</h2>
          <p>We are happy to guide you through the relevant research publications and answer your technical questions.</p>
          <div className="ek-cta-buttons">
            <a href="mailto:info@elektroactive.co" className="ek-btn-primary">
              Contact Us <ArrowIcon />
            </a>
            <a href="#" className="ek-btn-secondary">View All Products</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── Footer ──
function Footer() {
  return (
    <footer className="ek-footer">
      <a href="#" className="ek-footer-logo">ELEKTRO<span>ACTIVE</span></a>
      <div className="ek-footer-links">
        <a href="#">Privacy Policy</a>
        <a href="#">Products</a>
        <a href="#">Contact</a>
      </div>
      <p>© 2024 Elektroactive Pvt Ltd. All rights reserved.</p>
    </footer>
  );
}

// ── Main Export ──
export default function PolymerDispersion() {
  return (
    <>
      <style>{styles}</style>
      <div className="ek-root">
        <Nav />
        <Hero />
        <DispersionSection />
        <StepsSection />
        <SEMSection />
        <TheorySection />
        <CTASection />
        <Footer />
      </div>
    </>
  );
}