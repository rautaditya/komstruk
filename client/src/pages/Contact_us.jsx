import React from "react";
import Header from "../componants/Header";
import Footer from "../componants/Footer";
import { useEffect, useRef, useState } from "react";

/* ─── Scroll-reveal hook ─────────────────────────────── */
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

/* ─── Reveal wrapper ─────────────────────────────────── */
function Reveal({ children, delay = 0, className = "", from = "bottom" }) {
  const [ref, visible] = useInView();
  const transforms = {
    bottom: "translateY(36px)",
    left:   "translateX(-36px)",
    right:  "translateX(36px)",
    scale:  "scale(0.94)",
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : transforms[from],
        transition: `opacity 0.85s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.85s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ════════════════════════════════════════════════════════
   CONTACT US PAGE — KOMSTRUK
════════════════════════════════════════════════════════ */
export default function ContactUs() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1400);
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
        @keyframes imgZoom {
          from { transform: scale(1.06); }
          to   { transform: scale(1); }
        }
        @keyframes spinRing {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        .animate-fade-up { animation: fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) both; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }

        .hero-img { animation: imgZoom 1.8s cubic-bezier(0.16,1,0.3,1) forwards; }

        .form-input {
          width: 100%;
          border: 1px solid #e5e7eb;
          background: #fff;
          padding: 14px 16px;
          font-size: 0.875rem;
          color: #111827;
          outline: none;
          transition: border-color 0.3s, box-shadow 0.3s;
          border-radius: 0;
          font-family: 'Roboto', sans-serif;
        }
        .form-input::placeholder { color: #9ca3af; font-weight: 300; }
        .form-input:focus {
          border-color: #16a34a;
          box-shadow: 0 0 0 3px rgba(22,163,74,0.08);
        }

        .contact-info-item:hover .ci-icon { background: #16a34a; color: #fff; }

        .send-btn {
          position: relative; overflow: hidden;
          transition: background 0.3s, transform 0.2s, box-shadow 0.3s;
        }
        .send-btn::after {
          content: '';
          position: absolute; inset: 0;
          background: rgba(255,255,255,0.12);
          transform: translateX(-100%);
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .send-btn:hover::after { transform: translateX(0); }
        .send-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(22,163,74,0.35); }

        .map-overlay { transition: opacity 0.4s; }
        .map-wrap:hover .map-overlay { opacity: 0; }

        .card-hover { transition: transform 0.35s ease, box-shadow 0.35s ease; }
        .card-hover:hover { transform: translateY(-3px); box-shadow: 0 12px 36px rgba(0,0,0,0.07); }

        @keyframes checkBounce {
          0%   { transform: scale(0); opacity: 0; }
          60%  { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .check-anim { animation: checkBounce 0.5s cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>

      <Header />

      {/* ════════════════════════════════
          01 — HERO
      ════════════════════════════════ */}
      <section className="relative h-64 md:h-80 w-full">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=85"
            className="w-full h-full object-cover hero-img"
            alt="Contact Komstruk"
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(26,71,42,0.3) 0%, transparent 60%)" }} />
        </div>

        {/* Breadcrumb */}
        <div className="absolute top-6 left-8 md:left-16 z-10 flex items-center gap-2 mt-16">
          <span className="text-white/50 text-xs tracking-widest uppercase font-light">Home</span>
          <span className="text-white/40 text-xs">/</span>
          <span className="text-green-400 text-xs tracking-widest uppercase font-light">Contact Us</span>
        </div>

        <div className="relative z-10 flex flex-col justify-center items-start h-full px-8 md:px-16 lg:px-24 pt-16">
          <p className="text-white/60 text-xs tracking-widest uppercase font-light mb-3 animate-fade-up">
            Get In Touch
          </p>
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-light leading-tight animate-fade-up delay-200 tracking-tight">
            Contact <span className="text-green-400 font-normal">Us</span>
          </h1>
        </div>
      </section>

      {/* ════════════════════════════════
          02 — CONTACT INFO + FORM
      ════════════════════════════════ */}
      <section className="w-full bg-white py-20 md:py-28 px-8 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* LEFT — Contact Info */}
          <Reveal from="left">
            <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-3 tracking-tight">
              Contact Info
            </h2>
            <div className="w-10 h-0.5 bg-green-500 mb-10" />

            {/* India */}
            <div className="mb-8">
              <div className="contact-info-item flex items-start gap-4 mb-4 group">
                <div className="ci-icon w-9 h-9 rounded-full bg-green-50 border border-green-100 flex items-center justify-center flex-shrink-0 transition-all duration-300 mt-0.5">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <div>
                  <span className="text-xs font-bold tracking-widest uppercase text-gray-900 block mb-1">
                    India
                  </span>
                  <p className="text-sm text-gray-500 leading-6 font-light">
                    A-309, Nand Dham, Plot No. 59, Sector 11,<br />
                    CBD Belapur, Navi Mumbai – 400614,<br />
                    Maharashtra, India
                  </p>
                </div>
              </div>

              <div className="contact-info-item flex items-center gap-4 mb-3 group">
                <div className="ci-icon w-9 h-9 rounded-full bg-green-50 border border-green-100 flex items-center justify-center flex-shrink-0 transition-all duration-300">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                </div>
                <a href="tel:9820251549" className="text-sm text-gray-600 font-light hover:text-green-600 transition-colors">
                  9820251549
                </a>
              </div>

              <div className="contact-info-item flex items-center gap-4 group">
                <div className="ci-icon w-9 h-9 rounded-full bg-green-50 border border-green-100 flex items-center justify-center flex-shrink-0 transition-all duration-300">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <a href="mailto:info@komstruk.co" className="text-sm text-gray-600 font-light hover:text-green-600 transition-colors">
                  info@komstruk.co
                </a>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 my-8" />

            {/* Germany */}
            <div>
              <div className="contact-info-item flex items-start gap-4 mb-4 group">
                <div className="ci-icon w-9 h-9 rounded-full bg-green-50 border border-green-100 flex items-center justify-center flex-shrink-0 transition-all duration-300 mt-0.5">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <div>
                  <span className="text-xs font-bold tracking-widest uppercase text-gray-900 block mb-1">
                    Germany
                  </span>
                  <p className="text-sm text-gray-500 leading-6 font-light">
                    Am Wischhof 38a,<br />
                    D-22941 Jersbek OT Klein Hansdorf,<br />
                    Germany
                  </p>
                </div>
              </div>

              <div className="contact-info-item flex items-center gap-4 group">
                <div className="ci-icon w-9 h-9 rounded-full bg-green-50 border border-green-100 flex items-center justify-center flex-shrink-0 transition-all duration-300">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <a href="mailto:bernhard.wessling@komstruk.eu" className="text-sm text-gray-600 font-light hover:text-green-600 transition-colors">
                  bernhard.wessling@komstruk.eu
                </a>
              </div>
            </div>

            {/* Social links */}
            <div className="mt-10 pt-8 border-t border-gray-100">
              <p className="text-xs tracking-widest uppercase font-medium text-gray-400 mb-4">Follow Us</p>
              <div className="flex gap-3">
                {[
                  { label: "in", href: "#" },
                  { label: "tw", href: "#" },
                  { label: "fb", href: "#" },
                ].map(s => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-500 hover:border-green-500 hover:text-green-600 hover:bg-green-50 transition-all duration-300 uppercase"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          {/* RIGHT — Form */}
          <Reveal from="right" delay={100}>
            <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-3 tracking-tight">
              Get In Touch With Us
            </h2>
            <div className="w-10 h-0.5 bg-green-500 mb-10" />

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-20 gap-5">
                <div className="check-anim w-16 h-16 rounded-full bg-green-100 border-2 border-green-500 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <h3 className="text-xl font-light text-gray-900">Message Sent!</h3>
                <p className="text-sm text-gray-500 font-light text-center max-w-xs">
                  Thank you for reaching out. Our team will get back to you shortly.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ name:"", email:"", phone:"", message:"" }); }}
                  className="text-sm text-green-600 underline underline-offset-4 hover:text-green-700 transition-colors font-medium mt-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name*"
                    required
                    className="form-input"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email*"
                    required
                    className="form-input"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your Phone"
                    className="form-input"
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message"
                    rows={5}
                    className="form-input resize-none"
                    style={{ resize: "none" }}
                  />
                </div>
                <div className="mt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="send-btn inline-flex items-center gap-3 px-10 py-4 bg-green-600 text-white font-medium text-sm tracking-widest uppercase hover:bg-green-500 transition-colors duration-300 disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <svg className="w-4 h-4" viewBox="0 0 24 24" style={{ animation: "spinRing 1s linear infinite" }}>
                          <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" fill="none"/>
                          <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send message
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════
          03 — MAP SECTION
      ════════════════════════════════ */}
      <section className="w-full bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-8 md:px-16 lg:px-24 py-16">
          <Reveal>
            <p className="text-xs tracking-widest uppercase font-medium text-gray-400 mb-2">Find Us</p>
            <h3 className="text-2xl font-light text-gray-900 mb-8 tracking-tight">Our Locations</h3>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* India Map */}
            <Reveal delay={0} className="card-hover">
              <div className="map-wrap relative overflow-hidden border border-gray-200 bg-white">
                <div className="map-overlay absolute inset-0 bg-black/10 z-10 flex items-center justify-center pointer-events-none">
                  <div className="bg-white px-4 py-2 text-xs tracking-widest uppercase font-medium text-gray-600 shadow">
                    Click to open map
                  </div>
                </div>
                <iframe
                  title="Komstruk India"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.197!2d73.0297!3d19.0176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c3b3b3b3b3b3%3A0x3b3b3b3b3b3b3b3b!2sCBD+Belapur%2C+Navi+Mumbai!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="220"
                  style={{ border: 0, filter: "grayscale(0.4)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="px-5 py-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                    <span className="text-xs font-bold tracking-widest uppercase text-gray-800">India — Navi Mumbai</span>
                  </div>
                  <p className="text-xs text-gray-400 font-light mt-1 ml-4">A-309, Nand Dham, CBD Belapur, Navi Mumbai – 400614</p>
                </div>
              </div>
            </Reveal>

            {/* Germany Map */}
            <Reveal delay={100} className="card-hover">
              <div className="map-wrap relative overflow-hidden border border-gray-200 bg-white">
                <div className="map-overlay absolute inset-0 bg-black/10 z-10 flex items-center justify-center pointer-events-none">
                  <div className="bg-white px-4 py-2 text-xs tracking-widest uppercase font-medium text-gray-600 shadow">
                    Click to open map
                  </div>
                </div>
                <iframe
                  title="Komstruk Germany"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2370!2d10.2897!3d53.8503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b1f1f1f1f1f1f1%3A0xf1f1f1f1f1f1f1f1!2sJersbek%2C+Germany!5e0!3m2!1sen!2sde!4v1234567890"
                  width="100%"
                  height="220"
                  style={{ border: 0, filter: "grayscale(0.4)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="px-5 py-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                    <span className="text-xs font-bold tracking-widest uppercase text-gray-800">Germany — Jersbek</span>
                  </div>
                  <p className="text-xs text-gray-400 font-light mt-1 ml-4">Am Wischhof 38a, D-22941 Jersbek OT Klein Hansdorf</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          04 — WHY CONTACT US (3 cols)
      ════════════════════════════════ */}
      <section className="w-full bg-white px-8 md:px-16 lg:px-24 py-20 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-12">
            <p className="text-xs tracking-widest uppercase font-medium text-gray-400 mb-2">How We Can Help</p>
            <h3 className="text-2xl font-light text-gray-900 tracking-tight">Reach out for anything</h3>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
            {[
              {
                icon: (
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
                  </svg>
                ),
                title: "Product Enquiries",
                text: "Ask about our Polyaniline Emeraldine Salt, Base, DISSIPO-WR, Masterbatches or Anticorrosion Primers — we'll match the right formulation to your needs.",
              },
              {
                icon: (
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                ),
                title: "Technical Support",
                text: "Our team of scientists and engineers are ready to assist with technical documentation, material specifications and application guidance for your projects.",
              },
              {
                icon: (
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                ),
                title: "Partnerships",
                text: "Interested in becoming a distributor, research partner or OEM collaborator? We welcome long-term partnerships grounded in scientific excellence and mutual growth.",
              },
            ].map(({ icon, title, text }) => (
              <Reveal key={title}>
                <div className="bg-gray-50 border border-gray-100 p-8 h-full card-hover">
                  <div className="w-10 h-10 rounded-full bg-green-50 border border-green-100 flex items-center justify-center mb-5">
                    {icon}
                  </div>
                  <p className="text-xs font-bold tracking-widest uppercase text-gray-800 mb-3">{title}</p>
                  <p className="text-sm text-gray-500 leading-7 font-light">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      
    </main>
  );
}