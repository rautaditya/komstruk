import Header from "../componants/Header";
import Footer from "../componants/Footer";
import { useEffect, useRef, useState } from "react";

/* ─── useInView hook ─────────────────────────────────── */
function useInView(threshold = 0.12) {
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

/* ─── useCounter hook ────────────────────────────────── */
function useCounter(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useInView();
  useEffect(() => {
    if (!visible) return;
    let raf, start = null;
    const run = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 4)) * target));
      if (p < 1) raf = requestAnimationFrame(run); else setCount(target);
    };
    raf = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf);
  }, [visible, target, duration]);
  return [ref, count];
}

/* ─── Reveal wrapper ─────────────────────────────────── */
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

/* ─── Counter display ────────────────────────────────── */
function Counter({ target, suffix = "" }) {
  const [ref, count] = useCounter(target);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ─── Team Card ──────────────────────────────────────── */
function TeamCard({ member, delay, inView }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ opacity: inView?1:0, transform: inView?"none":"translateY(28px)", transition:`opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms,transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms` }}>
      <div
        style={{
          background:"#fff", border:"1px solid #f3f4f6", overflow:"hidden", cursor:"default",
          boxShadow: hov?"0 20px 50px rgba(0,0,0,0.12)":"0 2px 12px rgba(0,0,0,0.05)",
          transform: hov?"translateY(-5px)":"translateY(0)",
          transition:"box-shadow 0.42s cubic-bezier(0.16,1,0.3,1),transform 0.42s cubic-bezier(0.16,1,0.3,1)",
        }}
        onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      >
        {/* Accent top bar */}
        <div style={{ height:3, background:"linear-gradient(90deg,#16a34a,#c9a84c)", transform:hov?"scaleX(1)":"scaleX(0)", transformOrigin:"left", transition:"transform 0.42s cubic-bezier(0.16,1,0.3,1)" }} />

        {/* Photo */}
        <div style={{ position:"relative", height:200, overflow:"hidden", background:"#f3f4f6" }}>
          <img src={member.photo} alt={member.name}
            style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top",
              filter: hov?"grayscale(0%) brightness(0.9)":"grayscale(8%) brightness(0.85)",
              transform: hov?"scale(1.05)":"scale(1)",
              transition:"filter 0.5s,transform 0.65s cubic-bezier(0.16,1,0.3,1)",
            }}
          />
          {/* LinkedIn */}
          <a href="#" onClick={e=>e.stopPropagation()} style={{
            position:"absolute", bottom:10, right:10, width:30, height:30, borderRadius:4,
            background:"#0a66c2", display:"flex", alignItems:"center", justifyContent:"center",
            color:"#fff", fontSize:"0.7rem", fontWeight:700,
            opacity: hov?1:0, transform: hov?"translateY(0)":"translateY(8px)",
            transition:"opacity 0.3s,transform 0.3s",
          }}>in</a>
        </div>

        {/* Info */}
        <div style={{ padding:"20px 22px 24px" }}>
          <div style={{ height:2, background:"linear-gradient(90deg,#16a34a,#c9a84c)", width:hov?42:20, marginBottom:12, transition:"width 0.42s cubic-bezier(0.16,1,0.3,1)" }} />
          <p style={{ fontFamily:"Georgia,serif", fontWeight:600, color:"#111", fontSize:"0.97rem", marginBottom:3, lineHeight:1.3 }}>{member.name}</p>
          <p style={{ fontSize:"0.6rem", letterSpacing:"0.1em", textTransform:"uppercase", color:"#16a34a", fontWeight:600, marginBottom:8 }}>{member.role}</p>
          <p style={{ fontSize:"0.8rem", color:"#9ca3af", lineHeight:1.65, fontWeight:300 }}>{member.desc}</p>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   ABOUT US PAGE
════════════════════════════════════════════════════════ */
export default function AboutUs() {
  const [activeYear, setActiveYear] = useState(0);
  const [teamRef, teamVisible] = useInView();

  const teamMembers = [
    {
      name: "Narayan Ghodekar",
      role: "Director, Sales & Finances",
      desc: "Mr. Narayan Ghodekar, a businessman based in Mumbai, India. His other ventures span financial management and market development across diverse industry verticals.",
      photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=85&fit=crop&crop=face,top",
    },
    {
      name: "Dr. Arindam Adhikari",
      role: "Director R&D, Laboratory & Production",
      desc: "Dr. Arindam Adhikari (Ph.D., National Chemical Laboratory, Pune) leads all research, laboratory and production operations — from molecular design to commercial scale.",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=85&fit=crop&crop=face,top",
    },
    {
      name: "Dr. Bernhard Wessling",
      role: "Chief Scientist",
      desc: "Dr. Bernhard Wessling is the renowned authority in the field of conductive polymers. He showed the world how to process them by dispersion and uncovered their corrosion-resistant properties.",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=85&fit=crop&crop=face,top",
    },
    {
      name: "Dr. Jayant Khandare",
      role: "Advisor",
      desc: "Dr. Jayant Khandare (Ph.D., National Chemical Laboratory, Pune) provides scientific and strategic advisory, bridging academic excellence with real-world industrial application.",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=85&fit=crop&crop=face,top",
    },
  ];

  const timelineEvents = [
    { year:"2010", title:"Company Founded", desc:"Komstruk Private Limited was established under the guidance of Dr. Bernhard Wessling — the German scientist who pioneered conductive polymer processing and their corrosion-resistant applications to the world." },
    { year:"2014", title:"R&D Laboratory Established", desc:"Launched the Komstruk Advanced Materials Lab in Navi Mumbai, with Dr. Arindam Adhikari (Ph.D., NCL Pune) heading Research, Development and Production." },
    { year:"2018", title:"Product Portfolio Expanded", desc:"Full commercial launch of Polyaniline Emeraldine Salt, Emeraldine Base and DISSIPO-WR. Entered strategic partnerships across the industrial coatings and anticorrosion sector." },
    { year:"2021", title:"Global Presence", desc:"Expanded with the Germany office in Jersbek, OT Klein Hansdorf. Launched Polyaniline Masterbatches and Anticorrosion Primers — completing our five core product lines." },
    { year:"2024", title:"Industry Recognition", desc:"Recognised as a leading supplier of conductive polymer materials globally. Strengthened advisory board and expanded international distribution significantly." },
  ];

  const products = [
    { label:"Polyaniline Emeraldine Salt", tag:"Automotive",    img:"https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=85" },
    { label:"Polyaniline Emeraldine Base", tag:"Construction",  img:"https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=600&q=85" },
    { label:"DISSIPO-WR",                  tag:"Disruptors",    img:"https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=85" },
    { label:"Polyaniline Masterbatches",   tag:"Industrial",    img:"https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=600&q=85" },
    { label:"Anticorrosion Primers",       tag:"Marine",        img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=85" },
    { label:"Custom Formulations",         tag:"Research",      img:"https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&q=85" },
  ];

  const news = [
    { date:"15 January 2024", tag:"Company", title:"Komstruk opens advanced materials laboratory expansion in Navi Mumbai", img:"https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=85" },
    { date:"28 January 2024", tag:"Science",  title:"Dr. Wessling presents landmark findings on polymer corrosion resistance at global symposium", img:"https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=600&q=85" },
    { date:"12 October 2023", tag:"Growth",   title:"Komstruk expands anticorrosion technology portfolio with new product line from Komstruk Labs", img:"https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=85" },
  ];

  return (
    <main className="relative w-full overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
        * { font-family: 'Roboto', sans-serif !important; }

        @keyframes fadeUp  { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes imgZoom { from{transform:scale(1.06)} to{transform:scale(1)} }
        @keyframes lStreak { 0%{opacity:0;transform:translateY(-100%)} 50%{opacity:1} 100%{opacity:0;transform:translateY(100%)} }
        @keyframes shimmer { from{background-position:-200% center} to{background-position:200% center} }
        @keyframes pulseW  { 0%,100%{opacity:.35} 50%{opacity:.8} }

        .fu{animation:fadeUp 0.85s cubic-bezier(0.22,1,0.36,1) both}
        .d2{animation-delay:.2s}.d4{animation-delay:.4s}.d6{animation-delay:.6s}
        .hi{animation:imgZoom 2s cubic-bezier(0.16,1,0.3,1) forwards}

        /* image hover zoom */
        .iz{overflow:hidden}
        .iz img{transition:transform 0.6s cubic-bezier(0.16,1,0.3,1),filter 0.5s}
        .iz:hover img{transform:scale(1.04)}

        /* card lift */
        .cl{transition:transform .38s ease,box-shadow .38s ease}
        .cl:hover{transform:translateY(-4px);box-shadow:0 20px 48px rgba(0,0,0,0.1)}

        /* solutions grid */
        .sg img{transition:transform .6s cubic-bezier(0.16,1,0.3,1),filter .5s}
        .sg:hover img{transform:scale(1.05);filter:grayscale(0%) brightness(0.85)!important}
        .so{transition:opacity .4s}
        .sg:hover .so{opacity:.1!important}

        /* news */
        .ng img{transition:transform .6s cubic-bezier(0.16,1,0.3,1),filter .5s}
        .ng:hover img{transform:scale(1.05);filter:grayscale(0%)!important}

        /* shimmer gradient */
        .gl{background:linear-gradient(90deg,#16a34a,#c9a84c,#16a34a);background-size:200% auto;animation:shimmer 3s linear infinite}
      `}</style>

      <Header />

      {/* ══════════════════════════════════════
          01 — HERO  (compact 52vh, sharp image)
      ══════════════════════════════════════ */}
      <section className="relative w-full" style={{ height:"52vh", minHeight:400, maxHeight:600 }}>
        <div className="absolute inset-0 overflow-hidden">
          {/* NEW: bright, sharp laboratory/science hero image */}
          <img
            
            className="w-full h-full object-cover hi"
            alt="Komstruk laboratory"
            style={{ objectPosition:"center 38%" }}
          />
          {/* Layered overlays — left dark, right lighter for depth */}
          <div className="absolute inset-0" style={{ background:"linear-gradient(100deg,rgba(4,12,6,0.88) 0%,rgba(4,12,6,0.62) 45%,rgba(4,12,6,0.28) 100%)" }} />
          <div className="absolute inset-0" style={{ background:"linear-gradient(to top,rgba(0,0,0,0.5) 0%,transparent 55%)" }} />
          <div className="absolute inset-0" style={{ background:"radial-gradient(ellipse at 8% 60%,rgba(22,163,74,0.18) 0%,transparent 55%)" }} />
        </div>

        {/* Subtle vertical streaks */}
        {[20,45,72].map((l,i)=>(
          <div key={i} className="absolute top-0 bottom-0 z-10 pointer-events-none"
            style={{ left:`${l}%`, width:1, background:"linear-gradient(to bottom,transparent,rgba(34,197,94,0.1),transparent)", animation:`lStreak ${3.5+i*.7}s ease-in-out infinite ${i*1.1}s` }} />
        ))}

        {/* Breadcrumb */}
        <div className="absolute top-24 right-10 z-20 flex items-center gap-2">
          <span className="text-white/40 text-xs tracking-widest uppercase font-light">Home</span>
          <span className="text-white/30 text-xs">/</span>
          <span className="text-green-400 text-xs tracking-widest uppercase font-light">About Us</span>
        </div>

        {/* Content — bottom left anchored */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end px-8 md:px-16 lg:px-24 pb-12">
          <p className="text-white/45 text-xs tracking-widest uppercase font-light mb-3 fu">— About Us</p>
          <h1 className="text-white font-light leading-none tracking-tight mb-4 fu d2"
            style={{ fontSize:"clamp(2.4rem,5.5vw,5rem)" }}>
            Advanced<br/>
            <span style={{ fontFamily:"Georgia,serif", fontStyle:"italic", color:"#4ade80" }}>Materials</span> Science
          </h1>
          <p className="text-white/55 font-light leading-relaxed mb-7 fu d4"
            style={{ fontSize:"0.93rem", maxWidth:460, lineHeight:1.75 }}>
            Komstruk Private Limited — established under the guidance of Dr. Bernhard Wessling, the scientist who showed the world how to process conductive polymers and harness their corrosion-resistant properties.
          </p>
          <div className="flex items-center gap-4 fu d6">
            <a href="#story"
              className="inline-block px-7 py-3 text-white font-medium text-xs tracking-widest uppercase hover:opacity-90 transition-opacity"
              style={{ background:"#15803d" }}>
              Our Story
            </a>
            <a href="#team"
              className="inline-block px-6 py-3 text-white font-light text-xs tracking-widest uppercase border border-white/28 hover:border-white/60 transition-colors">
              Meet the Team
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-5 right-10 z-20 flex flex-col items-center gap-1.5 opacity-32">
          <span className="text-white text-xs tracking-widest uppercase font-light">Scroll</span>
          <span className="block w-px h-8 bg-white/65" style={{ animation:"pulseW 2s ease-in-out infinite" }} />
        </div>
      </section>

      {/* ══════════════════════════════════════
          02 — TRUSTED BY STRIP
      ══════════════════════════════════════ */}
      <div className="w-full border-b border-gray-100 bg-white" style={{ padding:"16px 0" }}>
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 flex items-center gap-10 overflow-hidden">
          <span className="text-xs tracking-widest uppercase text-gray-300 font-medium flex-shrink-0">Trusted by</span>
          <div className="flex items-center gap-10 overflow-hidden" style={{ flex:1 }}>
            {["Industrial Partners","R&D Institutions","OEM Manufacturers","Government Bodies","Export Markets"].map(p=>(
              <span key={p} className="text-sm font-light text-gray-300 whitespace-nowrap">{p}</span>
            ))}
          </div>
        </div>
      </div>

      

     

      {/* ══════════════════════════════════════
          05 — MISSION  (text left, image right 340px)
      ══════════════════════════════════════ */}
      <section className="w-full bg-white py-20 md:py-28 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-14 lg:gap-24 items-center">
          <Reveal from="left" className="lg:w-5/12">
            <p className="text-xs tracking-widest uppercase font-medium text-gray-400 mb-3">Our Mission</p>
            <h2 className="font-light text-gray-900 leading-tight tracking-tight mb-4"
              style={{ fontSize:"clamp(1.8rem,3.5vw,2.8rem)" }}>
              Solving the world's<br/>
              <strong className="font-bold">toughest corrosion problems</strong>
            </h2>
            <div className="w-8 h-0.5 mb-5" style={{ background:"linear-gradient(90deg,#16a34a,#c9a84c)" }} />
            <p className="text-sm text-gray-500 leading-7 font-light mb-7">
              There is no more complex challenge than making industrial infrastructure last. Komstruk is a full-stack conductive polymer company — from synthesis and dispersion to finished anticorrosion coatings and masterbatches — building the materials backbone for a world that needs to endure.
            </p>
            <a href="#team"
              className="inline-block px-7 py-3.5 text-white font-medium text-xs tracking-widest uppercase hover:opacity-90 transition-opacity"
              style={{ background:"#15803d" }}>
              Meet our team
            </a>
          </Reveal>

          {/* Image 340px — scientific / industrial */}
          <Reveal from="right" delay={120} className="lg:w-7/12 iz">
            <img
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=88"
              alt="Komstruk mission"
              className="w-full object-cover"
              style={{ height:340, filter:"brightness(0.86) saturate(0.78)" }}
            />
          </Reveal>
        </div>
      </section>


      

      {/* ══════════════════════════════════════
          08 — TIMELINE
      ══════════════════════════════════════ */}
      <section className="w-full border-t border-gray-100 py-20 md:py-28 px-8 md:px-16 lg:px-24" style={{ background:"#f9fafb" }}>
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-14">
            <div className="flex items-start gap-4">
              <div style={{ width:3, height:60, background:"#16a34a", flexShrink:0, marginTop:4 }} />
              <div>
                <p className="text-xs tracking-widest uppercase text-gray-400 font-medium mb-1">Our Journey</p>
                <h2 className="font-light text-gray-900 leading-tight" style={{ fontSize:"clamp(1.8rem,3.5vw,2.8rem)" }}>
                  14 Years of<br/><strong className="font-bold">Scientific Excellence</strong>
                </h2>
              </div>
            </div>
          </Reveal>

          {/* Progress track */}
          <Reveal>
            <div className="relative h-px bg-gray-200 mx-2">
              <div className="absolute left-0 top-0 h-full bg-green-500 transition-all duration-500"
                style={{ width:`${(activeYear/(timelineEvents.length-1))*100}%` }} />
            </div>
          </Reveal>
          <div className="flex justify-between relative -top-2">
            {timelineEvents.map((ev,i)=>(
              <Reveal key={ev.year} delay={i*65}>
                <button onClick={()=>setActiveYear(i)} className="flex flex-col items-center gap-3 group px-2">
                  <div className="w-4 h-4 rounded-full border-2 transition-all duration-300"
                    style={{ background:i<=activeYear?"#16a34a":"#fff", borderColor:i<=activeYear?"#16a34a":"#d1d5db" }} />
                  <span className="text-xs font-medium transition-colors"
                    style={{ color:i===activeYear?"#16a34a":"#9ca3af" }}>{ev.year}</span>
                </button>
              </Reveal>
            ))}
          </div>

          {/* Active event */}
          <div key={activeYear} className="bg-white border border-gray-100 p-8 md:p-10 mt-4"
            style={{ animation:"fadeUp .35s cubic-bezier(0.22,1,0.36,1) both", boxShadow:"0 2px 14px rgba(0,0,0,0.05)" }}>
            <p className="text-xs tracking-widest uppercase text-green-600 font-medium mb-2">{timelineEvents[activeYear].year}</p>
            <h3 className="text-xl font-medium text-gray-900 mb-3">{timelineEvents[activeYear].title}</h3>
            <p className="text-sm text-gray-500 leading-7 font-light max-w-2xl">{timelineEvents[activeYear].desc}</p>
          </div>

          <div className="flex gap-3 mt-5">
            {[{dir:-1,path:"M9 3L5 7l4 4"},{dir:1,path:"M5 3l4 4-4 4"}].map(({dir,path},i)=>{
              const disabled=(dir===-1&&activeYear===0)||(dir===1&&activeYear===timelineEvents.length-1);
              return (
                <button key={i}
                  onClick={()=>!disabled&&setActiveYear(y=>y+dir)}
                  className="w-10 h-10 flex items-center justify-center border transition-all duration-300"
                  style={{ borderColor:disabled?"#e5e7eb":"#111827", color:disabled?"#d1d5db":"#111827", cursor:disabled?"not-allowed":"pointer" }}
                  onMouseEnter={e=>{if(!disabled){e.currentTarget.style.background="#111";e.currentTarget.style.color="#fff"}}}
                  onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=disabled?"#d1d5db":"#111827"}}
                >
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2"><path d={path}/></svg>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
      09 — OUR TEAM (Premium Contrast Section)
══════════════════════════════════════ */}
<section
  id="team"
  className="relative w-full py-24 md:py-32 px-6 md:px-12 lg:px-20 overflow-hidden"
  style={{ background: "#0b120d" }} // faint background
>
  {/* Ambient radial glows (softened) */}
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      backgroundImage:
        "radial-gradient(ellipse at 15% 55%,rgba(22,163,74,0.05) 0%,transparent 50%),radial-gradient(ellipse at 85% 20%,rgba(201,168,76,0.04) 0%,transparent 45%)",
    }}
  />

  {/* Dot grid texture (lighter) */}
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      backgroundImage:
        "radial-gradient(circle,rgba(255,255,255,0.05) 1px,transparent 1px)",
      backgroundSize: "34px 34px",
      opacity: 0.12,
    }}
  />

  {/* Vertical streaks */}
  {[12, 32, 56, 78].map((l, i) => (
    <div
      key={i}
      className="absolute top-0 bottom-0 pointer-events-none z-0"
      style={{
        left: `${l}%`,
        width: 1,
        background:
          "linear-gradient(to bottom,transparent,rgba(34,197,94,0.07),transparent)",
        animation: `lStreak ${3 + i * 0.5}s ease-in-out infinite ${
          i * 1
        }s`,
      }}
    />
  ))}

  {/* MAIN CONTAINER */}
  <div className="max-w-7xl mx-auto relative z-10">
    {/* GLASS CONTRAST BLOCK */}
    <div
      className="rounded-2xl px-6 py-12 md:px-10 md:py-16"
      style={{
        background: "rgba(255,255,255,0.03)", // contrast
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
      }}
    >
      {/* HEADER */}
      <Reveal>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <p className="flex items-center gap-3 text-green-400 text-xs tracking-widest uppercase font-medium mb-5">
              <span
                style={{
                  width: 28,
                  height: 1,
                  background: "#4ade80",
                  display: "inline-block",
                }}
              />
              Our People
            </p>

            <h2
              className="font-light text-white leading-none tracking-tight"
              style={{ fontSize: "clamp(2rem,4.5vw,3.8rem)" }}
            >
              Our{" "}
              <span
                style={{
                  fontFamily: "Georgia, serif",
                  fontStyle: "italic",
                  color: "#4ade80",
                }}
              >
                Team
              </span>
            </h2>
          </div>

          <p className="text-gray-400 text-sm leading-7 font-light max-w-xs">
            Scientists, directors and advisors united by world-leading science
            and a shared vision of industrial resilience.
          </p>
        </div>
      </Reveal>

      {/* TEAM GRID */}
      <div
        ref={teamRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12"
      >
        {teamMembers.map((m, i) => (
          <TeamCard
            key={m.name}
            member={m}
            delay={i * 95}
            inView={teamVisible}
          />
        ))}
      </div>

      {/* FOOTER CTA */}
      <Reveal>
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-5 pt-8 border-t"
          style={{ borderColor: "rgba(255,255,255,0.07)" }}
        >
          <p className="text-gray-500 text-sm font-light">
            Interested in joining this team?
          </p>

          <a
            href="/career"
            className="inline-flex items-center gap-2 px-8 py-3 text-green-400 font-medium text-xs tracking-widest uppercase transition-all duration-300 hover:text-white hover:bg-green-800"
            style={{
              border: "1px solid rgba(34,197,94,0.35)",
            }}
          >
            View Open Roles
            <svg
              width="12"
              height="12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </Reveal>
    </div>
  </div>
</section>
      

      
      
      
    </main>
  );
}