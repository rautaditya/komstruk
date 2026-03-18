import Header from "../componants/Header";
import Footer from "../componants/Footer";
import { useEffect, useRef, useState } from "react";

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

/* ─── Reveal wrapper ─────────────────────────────── */
function Reveal({ children, delay = 0, from = "bottom", className = "", style = {} }) {
  const [ref, visible] = useInView();
  const origins = {
    bottom: "translateY(36px)",
    left:   "translateX(-36px)",
    right:  "translateX(36px)",
    scale:  "scale(0.94)",
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

/* ════════════════════════════════════════════════════
   CONTACT US PAGE
════════════════════════════════════════════════════ */
export default function ContactUs() {
  const [formData, setFormData] = useState({ name: "", email: "", number: "", message: "" });
  const [focused, setFocused] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [newsletter, setNewsletter] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => { const t = setTimeout(() => setLoaded(true), 80); return () => clearTimeout(t); }, []);

  const handleChange = e => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  const handleSubscribe = e => {
    e.preventDefault();
    if (newsletter) setSubscribed(true);
  };

  const contactDetails = [
    {
      icon: (
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
          <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
      ),
      label: "ADDRESS",
      name: "Komstruk HQ",
      detail: "Office No. 403-404, Fourth Floor, Godrej Millennium, Besides Taj Blue Diamond, Koregaon Park, PUNE – 411 001. India.",
    },
    {
      icon: (
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
      ),
      label: "EMAIL",
      name: null,
      detail: "invest@komstruk.com",
      link: "mailto:invest@komstruk.com",
    },
    {
      icon: (
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
        </svg>
      ),
      label: "CALL US",
      name: null,
      detail: "+91 86000 10500",
      link: "tel:+918600010500",
    },
    {
      icon: (
        <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
      ),
      label: "GRIEVANCE REDRESSAL",
      name: null,
      detail: "grievance@komstruk.com",
      link: "mailto:grievance@komstruk.com",
    },
  ];

  const inputBase = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid #d1d5db",
    padding: "10px 0",
    fontSize: 13,
    fontFamily: "'Roboto', sans-serif",
    color: "#111",
    outline: "none",
    transition: "border-color 0.3s ease",
  };

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
          from { opacity: 0; transform: scale(1.05); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes lineGrow {
          from { width: 0; }
          to   { width: 100%; }
        }
        @keyframes spinSlow {
          to { transform: rotate(360deg); }
        }
        @keyframes dotBlink {
          0%,100% { opacity: 1; }
          50%      { opacity: 0; }
        }
        @keyframes successPop {
          0%   { opacity: 0; transform: scale(0.85) translateY(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }

        .animate-fade-up   { animation: fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) both; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-600 { animation-delay: 0.6s; }

        .hero-img { animation: heroLoad 1.8s cubic-bezier(0.16,1,0.3,1) forwards; }

        .contact-input-wrap { position: relative; }
        .contact-input-wrap label {
          position: absolute; top: 10px; left: 0;
          font-size: 11px; font-weight: 500; letter-spacing: 0.12em;
          text-transform: uppercase; color: #9ca3af;
          transition: all 0.25s ease; pointer-events: none;
        }
        .contact-input-wrap.focused label,
        .contact-input-wrap.filled label {
          top: -10px; font-size: 9px; color: #059669;
        }
        .contact-input-wrap .underline-anim {
          position: absolute; bottom: 0; left: 0;
          height: 1.5px; width: 0; background: #059669;
          transition: width 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        .contact-input-wrap.focused .underline-anim { width: 100%; }

        .contact-info-card {
          transition: transform 0.3s ease;
        }
        .contact-info-card:hover { transform: translateX(4px); }

        .send-btn {
          position: relative; overflow: hidden;
          background: #111; color: #fff; border: none;
          padding: 14px 36px; font-size: 12px; font-weight: 500;
          letter-spacing: 0.2em; text-transform: uppercase; cursor: pointer;
          transition: background 0.3s;
        }
        .send-btn::after {
          content: ''; position: absolute; inset: 0;
          background: rgba(255,255,255,.12);
          transform: translateX(-110%) skewX(-20deg);
          transition: transform 0.5s cubic-bezier(0.22,1,0.36,1);
        }
        .send-btn:hover::after { transform: translateX(120%) skewX(-20deg); }
        .send-btn:hover { background: #059669; }
        .send-btn:disabled { background: #9ca3af; cursor: not-allowed; }
        .send-btn:disabled::after { display: none; }

        .success-msg { animation: successPop 0.5s cubic-bezier(0.22,1,0.36,1) forwards; }

        .subscribe-btn {
          background: #111; color: #fff; border: none;
          padding: 12px 28px; font-size: 11px; font-weight: 500;
          letter-spacing: 0.18em; text-transform: uppercase; cursor: pointer;
          transition: background 0.3s; flex-shrink: 0;
        }
        .subscribe-btn:hover { background: #059669; }

        .map-container { filter: grayscale(20%) contrast(1.05); transition: filter 0.4s; }
        .map-container:hover { filter: grayscale(0%) contrast(1); }
      `}</style>

      <Header />

      {/* ════════════════════════════════
          01 — HERO BANNER (dark, like Omicron contact header)
      ════════════════════════════════ */}
      <section className="relative w-full" style={{ background: "#0a0a0a", minHeight: 200 }}>
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80"
            className="w-full h-full object-cover hero-img"
            alt="Contact Us"
            style={{ filter: "brightness(0.18) saturate(0.4)" }}
          />
          {/* Decorative spinning ring like Omicron */}
          <div className="absolute right-16 top-1/2 -translate-y-1/2 opacity-10"
            style={{ animation: "spinSlow 20s linear infinite" }}>
            <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
              {[...Array(3)].map((_, i) => (
                <circle key={i} cx="90" cy="90" r={30 + i * 24} stroke="white" strokeWidth="0.5" strokeDasharray={`${4 + i} ${6 + i}`} />
              ))}
              <circle cx="90" cy="90" r="4" fill="white" fillOpacity="0.6" />
            </svg>
          </div>
        </div>

        <div className="relative z-10 px-8 md:px-16 lg:px-24 py-16 md:py-20 flex items-end justify-between">
          <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)", transition: "all 0.9s ease 0.1s" }}>
            <p className="text-white/40 text-xs tracking-widest uppercase font-light mb-3">Get In Touch</p>
            <h1 className="text-white text-4xl md:text-5xl font-light tracking-widest uppercase">
              Contact Us
            </h1>
          </div>
          <div className="hidden md:flex items-center gap-3"
            style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.9s ease 0.4s" }}>
            <span className="text-white/35 text-xs tracking-widest uppercase font-light">Home</span>
            <span className="text-white/35 text-xs">/</span>
            <span className="text-emerald-400 text-xs tracking-widest uppercase font-light">Contact Us</span>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          02 — FORM + CONTACT INFO
          (Omicron layout: form left | info cards right, separated by vertical rule)
      ════════════════════════════════ */}
      <section className="w-full bg-white py-20 md:py-28 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_auto_1fr] gap-0 items-start">

            {/* ── LEFT: Contact Form ── */}
            <Reveal from="left">
              <div className="pr-0 lg:pr-16">
                {submitted ? (
                  <div className="success-msg py-16 text-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-500 flex items-center justify-center mx-auto mb-6">
                      <svg width="28" height="28" fill="none" stroke="#059669" strokeWidth="2.5">
                        <path d="M5 13l5 5L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-light text-gray-900 mb-3">Message Sent!</h3>
                    <p className="text-sm text-gray-400 font-light max-w-xs mx-auto leading-7">
                      Thank you for reaching out. Our team will get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setFormData({ name:"", email:"", number:"", message:"" }); }}
                      className="mt-8 text-sm font-medium text-emerald-600 underline underline-offset-4 hover:text-emerald-700 transition-colors"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                    {/* Name */}
                    <div className={`contact-input-wrap ${focused === "name" ? "focused" : ""} ${formData.name ? "filled" : ""}`}>
                      <label>Name</label>
                      <input
                        type="text" name="name" value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused("")}
                        style={{ ...inputBase, borderBottomColor: focused === "name" ? "#059669" : "#d1d5db" }}
                        required
                      />
                      <div className="underline-anim" />
                    </div>

                    {/* Email */}
                    <div className={`contact-input-wrap ${focused === "email" ? "focused" : ""} ${formData.email ? "filled" : ""}`}>
                      <label>Email</label>
                      <input
                        type="email" name="email" value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused("")}
                        style={{ ...inputBase, borderBottomColor: focused === "email" ? "#059669" : "#d1d5db" }}
                        required
                      />
                      <div className="underline-anim" />
                    </div>

                    {/* Phone */}
                    <div className={`contact-input-wrap ${focused === "number" ? "focused" : ""} ${formData.number ? "filled" : ""}`}>
                      <label>Number</label>
                      <input
                        type="tel" name="number" value={formData.number}
                        onChange={handleChange}
                        onFocus={() => setFocused("number")}
                        onBlur={() => setFocused("")}
                        style={{ ...inputBase, borderBottomColor: focused === "number" ? "#059669" : "#d1d5db" }}
                      />
                      <div className="underline-anim" />
                    </div>

                    {/* Message */}
                    <div className={`contact-input-wrap ${focused === "message" ? "focused" : ""} ${formData.message ? "filled" : ""}`}>
                      <label>Message</label>
                      <textarea
                        name="message" value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setFocused("message")}
                        onBlur={() => setFocused("")}
                        rows={4}
                        style={{
                          ...inputBase,
                          borderBottomColor: focused === "message" ? "#059669" : "#d1d5db",
                          resize: "none",
                          paddingTop: 14,
                        }}
                        required
                      />
                      <div className="underline-anim" />
                    </div>

                    <div>
                      <button type="submit" className="send-btn">
                        Send Message
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </Reveal>

            {/* ── VERTICAL DIVIDER ── */}
            <div className="hidden lg:block w-px bg-gray-150 self-stretch mx-8"
              style={{ background: "rgba(0,0,0,0.07)", minHeight: 380 }} />

            {/* ── RIGHT: Contact Info Cards ── */}
            <Reveal from="right" delay={100}>
              <div className="pl-0 lg:pl-8 flex flex-col gap-10 pt-2 lg:pt-0 mt-12 lg:mt-0">
                {contactDetails.map(({ icon, label, name, detail, link }, i) => (
                  <Reveal key={label} delay={i * 80} from="right">
                    <div className="contact-info-card flex items-start gap-5">
                      {/* Icon */}
                      <div className="flex-shrink-0 text-gray-400 mt-0.5">{icon}</div>
                      {/* Text */}
                      <div>
                        <p className="text-xs font-bold tracking-widest uppercase text-gray-800 mb-1">{label}</p>
                        {name && <p className="text-sm font-medium text-emerald-600 mb-1">{name}</p>}
                        {link ? (
                          <a href={link} className="text-sm text-gray-500 font-light leading-6 hover:text-emerald-600 transition-colors">
                            {detail}
                          </a>
                        ) : (
                          <p className="text-sm text-gray-500 font-light leading-6">{detail}</p>
                        )}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          03 — MAP EMBED
          (Omicron: full-width Google Maps embed)
      ════════════════════════════════ */}
      <Reveal from="scale" style={{ width: "100%" }}>
        <div className="map-container w-full" style={{ height: "420px" }}>
          <iframe
            title="Komstruk Office Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.4887063296!2d73.88893731489545!3d18.53695898737267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c09d4c0b6a6f%3A0x9d0c08f8c6a7b8c9!2sKoregaon%20Park%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
            width="100%"
            height="420"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Reveal>

      {/* ════════════════════════════════
          04 — NEWSLETTER SUBSCRIBE
          (Omicron: subscribe row before footer)
      ════════════════════════════════ */}
      <section className="w-full bg-gray-50 border-t border-gray-100 py-14 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-xl font-light text-gray-900 leading-tight">
                  Subscribe To Our<br /><span className="font-medium">Newsletter</span>
                </h3>
              </div>
              <form
                onSubmit={handleSubscribe}
                className="flex items-stretch gap-0 w-full md:w-auto md:min-w-[480px]"
              >
                {subscribed ? (
                  <div className="flex items-center gap-3 py-3 px-4 bg-emerald-50 border border-emerald-200 w-full">
                    <svg width="16" height="16" fill="none" stroke="#059669" strokeWidth="2.5"><path d="M3 8l4 4 6-7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span className="text-sm text-emerald-700 font-medium">Subscribed! Thank you.</span>
                  </div>
                ) : (
                  <>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={newsletter}
                      onChange={e => setNewsletter(e.target.value)}
                      required
                      className="flex-1 border-b border-gray-300 bg-transparent text-sm text-gray-700 placeholder-gray-400 font-light px-0 py-3 outline-none focus:border-gray-900 transition-colors"
                      style={{ fontFamily: "'Roboto',sans-serif" }}
                    />
                    <button type="submit" className="subscribe-btn ml-4">
                      Subscribe
                    </button>
                  </>
                )}
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════
          05 — QUICK STATS (same as other pages, above footer)
      ════════════════════════════════ */}
      <section className="w-full bg-white border-t border-gray-100 py-14 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 divide-y-2 md:divide-y-0 md:divide-x divide-gray-100">
            {[
              { val: "12,000+", label: "Tonnes Processed" },
              { val: "98%",     label: "Recovery Rate" },
              { val: "9+",      label: "States Served" },
              { val: "50+",     label: "Team Experts" },
            ].map(({ val, label }, i) => (
              <Reveal key={label} delay={i * 80}>
                <div className="px-0 md:px-10 py-2 md:py-0">
                  <div className="text-3xl md:text-4xl font-light text-emerald-600 mb-2">{val}</div>
                  <div className="text-xs tracking-widest uppercase text-gray-400 font-medium">{label}</div>
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