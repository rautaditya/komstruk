import React from "react";
import Header from "../componants/Header";
import Footer from "../componants/Footer";
import { useEffect, useRef, useState } from "react";

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

function Reveal({ children, delay = 0, className = "", from = "bottom" }) {
  const [ref, visible] = useInView();
  const transforms = { bottom: "translateY(32px)", left: "translateX(-32px)", right: "translateX(32px)", scale: "scale(0.95)" };
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : transforms[from],
      transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

function Counter({ target, suffix = "" }) {
  const [ref, count] = useCounter(target);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between py-5 text-left group">
        <span className="text-sm font-medium text-gray-800 group-hover:text-green-700 transition-colors pr-8">{question}</span>
        <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center transition-all duration-300"
          style={{ borderRadius:"50%", background: open?"#16a34a":"transparent", border:`1px solid ${open?"#16a34a":"#d1d5db"}`, transform: open?"rotate(45deg)":"rotate(0deg)" }}>
          <svg width="10" height="10" fill="none" stroke={open?"#fff":"#6b7280"} strokeWidth="2"><path d="M5 1v8M1 5h8"/></svg>
        </span>
      </button>
      <div style={{ maxHeight: open?300:0, overflow:"hidden", transition:"max-height 0.45s cubic-bezier(0.22,1,0.36,1)" }}>
        <p className="text-sm text-gray-500 font-light leading-7 pb-5">{answer}</p>
      </div>
    </div>
  );
}

export default function Career() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    { quote: "It's rare to work in a place where every single person around you is genuinely driven by both science and purpose. At Komstruk, you feel the weight of the mission every day — and it motivates you to give your very best.", name: "Dr. Arindam Adhikari", title: "Director R&D, Lab & Production", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=85&fit=crop&crop=face" },
    { quote: "You come here knowing you're part of something bigger. The science we do at Komstruk is world-class, and knowing our work protects real infrastructure across industries — that sense of impact keeps me going.", name: "Research Scientist", title: "Advanced Materials Division, Mumbai", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&q=85&fit=crop&crop=face" },
    { quote: "I joined Komstruk because of the science. I stayed because of the people. The collaborative culture here is unlike anything I've experienced — everyone shares knowledge and pushes each other to grow.", name: "Process Engineer", title: "Production & Quality, Navi Mumbai", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=85&fit=crop&crop=face" },
  ];

  const perks = [
    { icon: "⚗️", title: "World-Class R&D",    desc: "Work alongside globally recognised scientists in our advanced polymer laboratory. Access cutting-edge equipment and frontier research every day." },
    { icon: "🌍", title: "Global Exposure",     desc: "Collaborate with our European office in Germany and international partners. Real cross-border impact from day one." },
    { icon: "📈", title: "Career Growth",       desc: "Fast-moving company, real ownership. We invest in your development with structured mentorship from industry pioneers." },
    { icon: "🔬", title: "Pioneering Science",  desc: "Translate breakthrough polymer chemistry into commercial products. Your work directly shapes the future of industrial protection." },
    { icon: "🤝", title: "Open Culture",        desc: "Small, high-impact teams where every voice matters. Transparent, cross-functional and genuinely collaborative." },
    { icon: "🎯", title: "Purposeful Work",     desc: "Every product protects critical infrastructure. Work that matters — grounded in ethics, integrity and a clear mission." },
  ];

  const openRoles = [
    { category: "R&D & Science",   img: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=500&q=85", roles: [{ title:"Polymer Research Scientist", location:"Navi Mumbai", type:"Full-time" }, { title:"Analytical Chemistry Specialist", location:"Navi Mumbai", type:"Full-time" }, { title:"R&D Laboratory Technician", location:"Navi Mumbai", type:"Full-time" }] },
    { category: "Production",      img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500&q=85", roles: [{ title:"Process Engineer – Polymers", location:"Navi Mumbai", type:"Full-time" }, { title:"Quality Control Analyst", location:"Navi Mumbai", type:"Full-time" }] },
    { category: "Sales & Business",img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&q=85", roles: [{ title:"Technical Sales Executive", location:"Mumbai", type:"Full-time" }, { title:"International Business Dev.", location:"Mumbai / Germany", type:"Full-time" }] },
    { category: "Manufacturing",   img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=85", roles: [{ title:"Chemical Process Technician", location:"Navi Mumbai", type:"Full-time" }, { title:"Maintenance & Facilities Engr.", location:"Navi Mumbai", type:"Full-time" }] },
    { category: "Supply Chain",    img: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=500&q=85", roles: [{ title:"Procurement Specialist – Chemicals", location:"Mumbai", type:"Full-time" }, { title:"Export Logistics Coordinator", location:"Mumbai", type:"Full-time" }] },
    { category: "Software & IT",   img: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=500&q=85", roles: [{ title:"ERP & Operations Systems Lead", location:"Mumbai", type:"Full-time" }, { title:"Data Analyst – Production", location:"Mumbai", type:"Full-time" }] },
  ];

  const news = [
    { date:"March 2024",    tag:"Culture", title:"Komstruk opens new advanced materials laboratory in Navi Mumbai",                        img:"https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=500&q=85" },
    { date:"January 2024",  tag:"Science", title:"Dr. Wessling publishes landmark paper on conductive polymer corrosion resistance",        img:"https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500&q=85" },
    { date:"November 2023", tag:"Growth",  title:"Komstruk expands product portfolio with new Polyaniline Masterbatch line",               img:"https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&q=85" },
  ];

  const faqs = [
    { question:"Can't find a role that suits me?",             answer:"We're always looking for exceptional talent. If you don't see a matching role, send your CV to info@komstruk.co — we'll keep it on file and reach out when the right opportunity arises." },
    { question:"Does Komstruk help with relocation?",         answer:"Yes. For senior scientific and technical roles we provide relocation support including housing, travel and settling-in assistance. Please mention your relocation needs during the application process." },
    { question:"Do I need German to work in Germany?",        answer:"English is the primary working language for international roles in Jersbek. German skills are helpful but not required. Our team is multilingual and welcoming." },
    { question:"What kind of employment contracts do you offer?", answer:"We primarily offer full-time permanent contracts. For research collaborations we also arrange fixed-term and consultancy agreements. All roles clearly state their contract type." },
    { question:"Is there an internship or graduate programme?", answer:"Yes — we regularly take on final-year chemistry, chemical engineering and materials science students. We also partner with National Chemical Laboratory, Pune for postgraduate research opportunities." },
  ];

  return (
    <main className="relative w-full overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
        * { font-family: 'Roboto', sans-serif !important; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @keyframes imgZoom { from{transform:scale(1.06)} to{transform:scale(1)} }
        @keyframes lightStreak { 0%{opacity:0;transform:translateY(-100%)} 50%{opacity:1} 100%{opacity:0;transform:translateY(100%)} }
        @keyframes marqueScroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes shimmer { from{background-position:-200% center} to{background-position:200% center} }
        .animate-fade-up{animation:fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) both}
        .delay-200{animation-delay:0.2s} .delay-400{animation-delay:0.4s} .delay-600{animation-delay:0.6s}
        .hero-img{animation:imgZoom 2s cubic-bezier(0.16,1,0.3,1) forwards}
        .img-lift{transition:transform 0.6s cubic-bezier(0.16,1,0.3,1);overflow:hidden}
        .img-lift:hover{transform:translateY(-3px)}
        .img-lift img{transition:transform 0.6s cubic-bezier(0.16,1,0.3,1)}
        .img-lift:hover img{transform:scale(1.04)}
        .card-lift{transition:transform 0.35s ease,box-shadow 0.35s ease}
        .card-lift:hover{transform:translateY(-4px);box-shadow:0 20px 48px rgba(0,0,0,0.1)}
        .role-row{transition:background 0.22s,padding-left 0.28s;cursor:pointer}
        .role-row:hover{background:#f0fdf4;padding-left:20px}
        .role-row:hover .role-arrow{color:#16a34a;transform:translateX(4px)}
        .role-arrow{transition:color 0.22s,transform 0.28s}
        .perk-card{transition:transform 0.35s,box-shadow 0.35s,background 0.3s}
        .perk-card:hover{transform:translateY(-4px);box-shadow:0 16px 40px rgba(0,0,0,0.08);background:#fff}
        .perk-card:hover .perk-icon{background:#16a34a !important;transform:rotate(5deg) scale(1.08)}
        .perk-icon{transition:background 0.3s,transform 0.35s}
        .marquee-track{animation:marqueScroll 26s linear infinite}
        .dept-img{transition:transform 0.6s cubic-bezier(0.16,1,0.3,1),filter 0.5s}
        .dept-card:hover .dept-img{transform:scale(1.05);filter:grayscale(0%) brightness(0.85) !important}
        .dept-overlay{transition:opacity 0.4s}
        .dept-card:hover .dept-overlay{opacity:0.15 !important}
        .news-img{transition:transform 0.6s cubic-bezier(0.16,1,0.3,1),filter 0.5s}
        .news-card:hover .news-img{transform:scale(1.05);filter:grayscale(0%) !important}
        .green-line{background:linear-gradient(90deg,#16a34a,#c9a84c,#16a34a);background-size:200% auto;animation:shimmer 3s linear infinite}
      `}</style>

      <Header />

      {/* 01 — HERO compact 62vh */}
      <section className="relative w-full" style={{height:"62vh",minHeight:440,maxHeight:680}}>
        <div className="absolute inset-0 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1600&q=90" className="w-full h-full object-cover hero-img" alt="careers" style={{objectPosition:"center 35%"}}/>
          <div className="absolute inset-0" style={{background:"linear-gradient(to right,rgba(0,0,0,0.78) 0%,rgba(0,0,0,0.45) 55%,rgba(0,0,0,0.28) 100%)"}}/>
          <div className="absolute inset-0" style={{background:"linear-gradient(to top,rgba(0,0,0,0.6) 0%,transparent 50%)"}}/>
          <div className="absolute inset-0" style={{background:"linear-gradient(135deg,rgba(22,163,74,0.18) 0%,transparent 45%)"}}/>
        </div>
        {[18,42,68,86].map((left,i)=>(
          <div key={i} className="absolute top-0 bottom-0 pointer-events-none z-10"
            style={{left:`${left}%`,width:1,background:"linear-gradient(to bottom,transparent,rgba(34,197,94,0.13),transparent)",animation:`lightStreak ${3.5+i*0.5}s ease-in-out infinite ${i*0.8}s`}}/>
        ))}
        <div className="absolute top-24 right-8 md:right-14 z-20 flex items-center gap-2">
          <span className="text-white/40 text-xs tracking-widest uppercase">Home</span>
          <span className="text-white/30 text-xs">/</span>
          <span className="text-green-400 text-xs tracking-widest uppercase">Careers</span>
        </div>
        <div className="absolute inset-0 z-20 flex flex-col justify-end px-8 md:px-16 lg:px-24 pb-14">
          <p className="text-white/50 text-xs tracking-widest uppercase font-light mb-4 animate-fade-up">— Join Us</p>
          <h1 className="text-white font-light leading-none tracking-tight mb-5 animate-fade-up delay-200" style={{fontSize:"clamp(2.6rem,6vw,5.5rem)"}}>
            Calling all<br/>
            <span style={{fontFamily:"Georgia,serif",fontStyle:"italic",color:"#4ade80"}}>problem solvers</span>
          </h1>
          <p className="text-white/60 font-light leading-relaxed mb-8 animate-fade-up delay-400" style={{fontSize:"0.96rem",maxWidth:480}}>
            There's no greater challenge than advancing the science of materials protection. Join Komstruk — help us build a world that lasts, atom by atom.
          </p>
          <div className="flex items-center gap-4 animate-fade-up delay-600">
            <a href="#roles" className="inline-block px-8 py-3.5 text-white font-medium text-xs tracking-widest uppercase hover:opacity-90 transition-opacity" style={{background:"#15803d"}}>See Open Roles</a>
            <a href="#mission" className="inline-block px-7 py-3.5 text-white font-light text-xs tracking-widest uppercase border border-white/30 hover:border-white/65 transition-colors">Our Mission</a>
          </div>
        </div>
        <div className="absolute bottom-5 right-10 z-20 flex flex-col items-center gap-1.5 opacity-35">
          <span className="text-white text-xs tracking-widest uppercase">Scroll</span>
          <span className="block w-px h-8 bg-white/70 animate-pulse"/>
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{background:"#15803d",padding:"13px 0",overflow:"hidden"}}>
        <div className="marquee-track" style={{display:"flex",whiteSpace:"nowrap"}}>
          {["Polymer Research Scientist","Process Engineer","Technical Sales","Quality Analyst","Business Development","Lab Technician",
            "Polymer Research Scientist","Process Engineer","Technical Sales","Quality Analyst","Business Development","Lab Technician"].map((t,i)=>(
            <span key={i} style={{display:"inline-flex",alignItems:"center",gap:28,padding:"0 28px",color:"rgba(255,255,255,0.75)",fontSize:"0.8rem",fontStyle:"italic",letterSpacing:"0.04em"}}>
              {t}<span style={{color:"#bbf7d0",fontSize:"0.5rem"}}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* 02 — CALLING ALL + SEARCH */}
      <section id="mission" className="w-full bg-white py-20 md:py-28 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-14 lg:gap-24 items-start">
          <Reveal from="left" className="lg:w-5/12">
            <p className="text-xs tracking-widest uppercase font-medium text-gray-400 mb-4">Why Komstruk</p>
            <h2 className="font-light text-gray-900 leading-tight mb-5 tracking-tight" style={{fontSize:"clamp(1.8rem,3.5vw,2.9rem)"}}>
              Calling all<br/><strong className="font-bold">problem solvers</strong>
            </h2>
            <div className="w-8 h-0.5 mb-5" style={{background:"linear-gradient(90deg,#16a34a,#c9a84c)"}}/>
            <p className="text-sm text-gray-500 leading-7 font-light mb-7">
              A career at Komstruk is a career on the frontier of materials science. We are a small, focused team doing world-leading work on conductive polymers — and we need people who want to solve problems that have never been solved before.
            </p>
            <a href="#roles" className="inline-block px-8 py-3.5 text-white font-medium text-xs tracking-widest uppercase hover:opacity-90 transition-opacity" style={{background:"#15803d"}}>Find your role</a>
          </Reveal>
          <Reveal from="right" delay={150} className="lg:w-7/12">
            <div className="bg-gray-50 border border-gray-200 p-6 mb-5">
              <p className="text-xs tracking-widest uppercase font-medium text-gray-400 mb-4">Search Open Positions</p>
              <div className="flex gap-3 flex-col sm:flex-row">
                <input type="text" placeholder="Job title or keyword…" className="flex-1 border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none font-light placeholder-gray-400" style={{transition:"border-color 0.25s"}} onFocus={e=>e.target.style.borderColor="#16a34a"} onBlur={e=>e.target.style.borderColor="#e5e7eb"}/>
                <select className="border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600 outline-none font-light" onFocus={e=>e.target.style.borderColor="#16a34a"} onBlur={e=>e.target.style.borderColor="#e5e7eb"}>
                  <option value="">All Departments</option>
                  <option>R&D & Science</option><option>Production</option><option>Sales & Business</option>
                  <option>Manufacturing</option><option>Supply Chain</option><option>Software & IT</option>
                </select>
                <button className="px-6 py-3 text-white text-xs font-medium tracking-widest uppercase flex-shrink-0 hover:opacity-90 transition-opacity" style={{background:"#15803d"}}>Search</button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {["R&D — 3 roles","Production — 2","Sales — 2","Manufacturing — 2","Supply Chain — 2","Software — 2"].map(tag=>(
                <span key={tag} className="text-xs px-3 py-1.5 border border-gray-200 text-gray-500 font-light cursor-pointer transition-all duration-200 hover:border-green-500 hover:text-green-700 hover:bg-green-50">{tag}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 03 — STATS */}
      <section className="w-full border-t border-b border-gray-100" style={{background:"#f9fafb"}}>
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
          <div className="py-5 border-b border-gray-200">
            <p className="text-xs tracking-widest uppercase font-medium text-gray-400 text-center">Komstruk by the numbers</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-gray-200">
            {[{target:4,suf:"+",label:"Scientists\non our team"},{target:5,suf:"",label:"Polymer\nproduct lines"},{target:14,suf:"+",label:"Years of\nactive R&D"},{target:2,suf:"",label:"Global\noffices"},{target:100,suf:"%",label:"Science-backed\nformulations"},{target:13,suf:"+",label:"Open roles\nnow hiring"}].map(({target,suf,label},i)=>(
              <Reveal key={i} delay={i*60}>
                <div className="py-10 px-5">
                  <div className="text-3xl font-light text-gray-900 leading-none mb-2.5"><Counter target={target} suffix={suf}/></div>
                  <div className="text-xs tracking-widest uppercase text-green-600 font-medium leading-relaxed whitespace-pre-line">{label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — WORKING AT KOMSTRUK */}
      <section className="w-full bg-white py-20 md:py-28 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch border border-gray-100 overflow-hidden" style={{boxShadow:"0 4px 32px rgba(0,0,0,0.06)"}}>
            <Reveal from="left" className="img-lift overflow-hidden" style={{height:420}}>
              <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=88" alt="Working at Komstruk" className="w-full h-full object-cover" style={{filter:"brightness(0.88) saturate(0.85)"}}/>
            </Reveal>
            <Reveal from="right" delay={120} className="bg-gray-50 p-10 lg:p-14 flex flex-col justify-center">
              <p className="text-xs tracking-widest uppercase font-medium text-gray-400 mb-3">Life at Komstruk</p>
              <h2 className="font-light text-gray-900 leading-tight mb-4 tracking-tight" style={{fontSize:"clamp(1.7rem,3vw,2.5rem)"}}>Working in<br/><strong className="font-bold">advanced materials</strong></h2>
              <div className="w-8 h-0.5 mb-5" style={{background:"linear-gradient(90deg,#16a34a,#c9a84c)"}}/>
              <p className="text-sm text-gray-500 leading-7 font-light mb-3">Our laboratory and production facility in Navi Mumbai is where world-class polymer science meets commercial precision. Every team member contributes to formulations that protect real industrial assets.</p>
              <p className="text-sm text-gray-500 leading-7 font-light mb-7">Whether you're a scientist or a sales engineer — you are part of a team that takes science seriously, and people even more so.</p>
              <a href="#roles" className="text-sm font-medium text-gray-900 underline underline-offset-4 hover:text-green-600 transition-colors w-fit">Explore open roles →</a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 05 — TESTIMONIALS */}
      <section className="w-full border-t border-gray-100 py-20 md:py-28 px-8 md:px-16 lg:px-24" style={{background:"#f9fafb"}}>
        <div className="max-w-7xl mx-auto">
          <Reveal><p className="text-xs tracking-widest uppercase font-medium text-gray-400 mb-10 text-center">Meet the team</p></Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Reveal from="left">
              <div key={activeTestimonial} style={{animation:"fadeUp 0.45s cubic-bezier(0.22,1,0.36,1) both"}}>
                <div className="text-4xl font-light leading-none mb-3" style={{color:"#16a34a",fontFamily:"Georgia,serif"}}>"</div>
                <blockquote className="font-light text-gray-800 leading-snug tracking-tight mb-6" style={{fontSize:"clamp(1.2rem,2.2vw,1.65rem)",fontFamily:"Georgia,serif",fontStyle:"italic"}}>
                  {testimonials[activeTestimonial].quote}
                </blockquote>
                <div className="flex items-center gap-4">
                  <img src={testimonials[activeTestimonial].photo} alt={testimonials[activeTestimonial].name} style={{width:46,height:46,borderRadius:"50%",objectFit:"cover",border:"2px solid #16a34a"}}/>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{testimonials[activeTestimonial].name}</p>
                    <p className="text-xs text-gray-400 font-light mt-0.5">{testimonials[activeTestimonial].title}</p>
                  </div>
                </div>
              </div>
            </Reveal>
            <div>
              <div className="hidden lg:block opacity-20 mb-10 select-none">
                <div className="text-3xl font-light leading-none mb-2" style={{color:"#9ca3af",fontFamily:"Georgia,serif"}}>"</div>
                <p className="font-light text-gray-500 leading-snug" style={{fontFamily:"Georgia,serif",fontStyle:"italic",fontSize:"1.1rem"}}>
                  {testimonials[(activeTestimonial+1)%testimonials.length].quote.slice(0,90)}…
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={()=>setActiveTestimonial(t=>(t-1+testimonials.length)%testimonials.length)} className="w-10 h-10 flex items-center justify-center border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300">
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 2L4 6.5l4 4.5"/></svg>
                </button>
                <button onClick={()=>setActiveTestimonial(t=>(t+1)%testimonials.length)} className="w-10 h-10 flex items-center justify-center border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300">
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 2l4 4.5L5 11"/></svg>
                </button>
                <div className="flex gap-2 ml-3">
                  {testimonials.map((_,i)=>(
                    <button key={i} onClick={()=>setActiveTestimonial(i)} style={{width:i===activeTestimonial?22:7,height:7,borderRadius:4,background:i===activeTestimonial?"#16a34a":"#e5e7eb",transition:"width 0.35s,background 0.35s"}}/>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 06 — PERKS */}
      <section className="w-full bg-white border-t border-gray-100 py-20 md:py-28 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-12">
            <p className="text-xs tracking-widest uppercase font-medium text-gray-400 mb-2 text-center">Benefits</p>
            <h2 className="text-center font-light text-gray-900 tracking-tight" style={{fontSize:"clamp(1.6rem,3vw,2.5rem)"}}>Some perks when joining Komstruk</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{background:"#e5e7eb"}}>
            {perks.map((perk,i)=>(
              <Reveal key={perk.title} delay={i*60}>
                <div className="perk-card bg-gray-50 p-8 h-full">
                  <div className="perk-icon w-11 h-11 rounded flex items-center justify-center text-lg mb-5" style={{background:"#f0fdf4",border:"1px solid rgba(22,163,74,0.18)"}}>{perk.icon}</div>
                  <p className="text-xs font-bold tracking-widest uppercase text-gray-800 mb-3">{perk.title}</p>
                  <p className="text-sm text-gray-500 leading-7 font-light">{perk.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 07 — OPEN ROLES */}
      <section id="roles" className="w-full border-t border-gray-100 py-20 md:py-28 px-8 md:px-16 lg:px-24" style={{background:"#f9fafb"}}>
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <p className="text-xs tracking-widest uppercase font-medium text-gray-400 mb-2">Open Positions</p>
                <h2 className="font-light text-gray-900 tracking-tight" style={{fontSize:"clamp(1.6rem,3vw,2.5rem)"}}>
                  Roles at Komstruk<br/><strong className="font-bold">across all departments</strong>
                </h2>
              </div>
              <p className="text-sm text-gray-400 font-light">13 positions · India & Germany</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {openRoles.map((dept,i)=>(
              <Reveal key={dept.category} delay={i*60}>
                <div className="dept-card bg-white border border-gray-100 overflow-hidden card-lift">
                  <div className="relative overflow-hidden" style={{height:190}}>
                    <img src={dept.img} alt={dept.category} className="dept-img w-full h-full object-cover" style={{filter:"grayscale(30%) brightness(0.75)"}}/>
                    <div className="dept-overlay absolute inset-0 bg-black/35"/>
                    <div className="absolute top-0 left-0 right-0 h-0.5 green-line"/>
                    <div className="absolute top-3 left-3 z-10"><span className="text-white/55 text-xs tracking-widest uppercase font-light">Komstruk</span></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-10" style={{background:"linear-gradient(to top,rgba(0,0,0,0.65),transparent)"}}>
                      <p className="text-white font-medium text-sm">{dept.category}</p>
                      <p className="text-white/55 text-xs mt-0.5">{dept.roles.length} open role{dept.roles.length>1?"s":""}</p>
                    </div>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {dept.roles.map((role,j)=>(
                      <div key={j} className="role-row flex items-center justify-between px-4 py-3.5">
                        <div>
                          <p className="text-sm font-medium text-gray-800 leading-tight">{role.title}</p>
                          <p className="text-xs text-gray-400 font-light mt-0.5">{role.location} · {role.type}</p>
                        </div>
                        <svg className="role-arrow w-4 h-4 text-gray-400 flex-shrink-0 ml-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 text-center">
            <a href="#" className="inline-block px-10 py-4 border border-gray-800 text-gray-800 font-medium text-xs tracking-widest uppercase hover:bg-gray-900 hover:text-white transition-all duration-300">View all positions</a>
          </Reveal>
        </div>
      </section>

      {/* 08 — LOCATIONS */}
      <section className="w-full bg-white border-t border-gray-100 py-20 md:py-28 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-12">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div>
                <p className="text-xs tracking-widest uppercase font-medium text-gray-400 mb-2">Where we work</p>
                <h2 className="font-light text-gray-900 tracking-tight" style={{fontSize:"clamp(1.6rem,3vw,2.5rem)"}}>One mission.<br/><strong className="font-bold">Several locations.</strong></h2>
              </div>
              <p className="text-sm text-gray-500 leading-7 font-light max-w-sm lg:text-right">Whether in Navi Mumbai or Jersbek, Germany — you'll be part of the same team, united by scientific excellence and purpose.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {city:"Navi Mumbai",country:"India",role:"Headquarters & R&D",desc:"Our main campus houses the Advanced Materials Lab, production facility, quality control and corporate headquarters. Most roles are based here.",img:"https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=700&q=88",tag:"Primary Location"},
              {city:"Jersbek",country:"Germany",role:"European Office",desc:"Led by Dr. Bernhard Wessling, our German base handles European market development, scientific advisory and partnership coordination.",img:"https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=700&q=88",tag:"European Office"},
            ].map((loc,i)=>(
              <Reveal key={loc.city} delay={i*100}>
                <div className="overflow-hidden border border-gray-100 card-lift">
                  <div className="relative overflow-hidden img-lift" style={{height:230}}>
                    <img src={loc.img} alt={loc.city} className="w-full h-full object-cover" style={{filter:"brightness(0.75) saturate(0.7)"}}/>
                    <div className="absolute inset-0" style={{background:"linear-gradient(to top,rgba(0,0,0,0.55) 0%,transparent 55%)"}}/>
                    <div className="absolute top-4 left-4">
                      <span className="text-xs text-white px-3 py-1 font-medium tracking-widest uppercase" style={{background:"#15803d"}}>{loc.tag}</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="text-white font-medium text-base">{loc.city}, {loc.country}</p>
                      <p className="text-white/55 text-xs tracking-widest uppercase mt-0.5">{loc.role}</p>
                    </div>
                  </div>
                  <div className="bg-white p-6 border-t border-gray-100">
                    <p className="text-sm text-gray-500 leading-7 font-light">{loc.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 09 — LATEST NEWS */}
      <section className="w-full border-t border-gray-100 py-20 md:py-28 px-8 md:px-16 lg:px-24" style={{background:"#f9fafb"}}>
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-10">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs tracking-widest uppercase font-medium text-gray-400 mb-1">Updates</p>
                <h2 className="font-light text-gray-900 tracking-tight" style={{fontSize:"clamp(1.4rem,2.5vw,2rem)"}}>Latest Komstruk news</h2>
              </div>
              <a href="#" className="text-sm font-medium text-gray-500 hover:text-green-600 transition-colors underline underline-offset-4 hidden md:block">All news →</a>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {news.map((item,i)=>(
              <Reveal key={i} delay={i*80}>
                <div className="news-card group cursor-pointer bg-white border border-gray-100 overflow-hidden card-lift">
                  <div className="relative overflow-hidden" style={{height:175}}>
                    <img src={item.img} alt={item.title} className="news-img w-full h-full object-cover" style={{filter:"grayscale(40%) brightness(0.82)"}}/>
                    <div className="absolute inset-0" style={{background:"linear-gradient(to top,rgba(0,0,0,0.3),transparent)"}}/>
                    <div className="absolute top-3 left-3">
                      <span className="text-xs text-white font-medium tracking-widest uppercase px-2.5 py-1" style={{background:"rgba(22,163,74,0.85)",backdropFilter:"blur(4px)"}}>{item.tag}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-gray-400 font-light mb-2">{item.date}</p>
                    <h3 className="text-sm font-medium text-gray-800 leading-6 group-hover:text-green-700 transition-colors mb-4">{item.title}</h3>
                    <span className="inline-flex items-center gap-1 text-xs text-green-600 font-medium">
                      Read more
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 10 — FAQ */}
      <section className="w-full bg-white border-t border-gray-100 py-20 md:py-28 px-8 md:px-16 lg:px-24">
        <div className="max-w-3xl mx-auto">
          <Reveal className="mb-10 text-center">
            <p className="text-xs tracking-widest uppercase font-medium text-gray-400 mb-3">FAQ</p>
            <h2 className="font-light text-gray-900 tracking-tight" style={{fontSize:"clamp(1.6rem,3vw,2.4rem)"}}>Frequently asked questions</h2>
          </Reveal>
          <Reveal>
            <div className="border-t border-gray-200">
              {faqs.map((faq,i)=><FaqItem key={i} question={faq.question} answer={faq.answer}/>)}
            </div>
          </Reveal>
          <Reveal className="mt-10 flex flex-col items-center gap-4">
            <p className="text-sm text-gray-500 font-light">Still have questions? We're happy to help.</p>
            <a href="mailto:info@komstruk.co" className="inline-block px-8 py-3.5 text-white text-xs font-medium tracking-widest uppercase hover:opacity-90 transition-opacity" style={{background:"#15803d"}}>Email Us</a>
          </Reveal>
        </div>
      </section>

      
    </main>
  );
}