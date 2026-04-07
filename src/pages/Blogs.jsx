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

/* ─── Blog data ──────────────────────────────────── */
const ALL_BLOGS = [
  {
    id: 1,
    category: "Industry",
    date: "February 12, 2025",
    author: "Komstruk",
    title: "Why Emerging EV Battery Markets Are Attracting Top Recycling Investors",
    excerpt: "India's EV battery recycling landscape is witnessing a seismic shift, with dynamic new processing hubs emerging as powerhouses of the circular economy and investor attention.",
    img: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=700&q=80",
    readTime: "5 min read",
    tag: "Industry",
  },
  {
    id: 2,
    category: "Technology",
    date: "February 8, 2025",
    author: "Komstruk",
    title: "Smart Battery Processing and Green Certifications: The Future of Recycling Infrastructure",
    excerpt: "The new gold standard in India's battery recycling sector is undergoing a profound transformation. Gone are the days when processing facilities were valued only on throughput.",
    img: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=700&q=80",
    readTime: "7 min read",
    tag: "Technology",
  },
  {
    id: 3,
    category: "Operations",
    date: "January 30, 2025",
    author: "Komstruk",
    title: "Inside the Design Philosophy of Komstruk: Creating Recycling Processes That Work for You",
    excerpt: "In today's fast-paced battery industry, the modern recycling operation faces a critical dilemma: is it merely a physical location for work, or should it be something more?",
    img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=700&q=80",
    readTime: "6 min read",
    tag: "Operations",
  },
  {
    id: 4,
    category: "Sustainability",
    date: "January 22, 2025",
    author: "Komstruk",
    title: "From Collection to Certified Materials: The Complete Circular Ecosystem in Komstruk Projects",
    excerpt: "India's battery recycling landscape is undergoing a profound transformation. Gone are the days when a single-step model could meet the evolving needs of EV manufacturers and grid operators.",
    img: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=700&q=80",
    readTime: "8 min read",
    tag: "Sustainability",
  },
  {
    id: 5,
    category: "Investment",
    date: "January 15, 2025",
    author: "Komstruk",
    title: "5 Reasons Why Investing in Battery Recycling Infrastructure Yields Higher ROI Than Primary Mining",
    excerpt: "As the global shift toward clean energy accelerates, forward-thinking investors are discovering that the real value in the battery supply chain lies not in extraction, but in recovery.",
    img: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=700&q=80",
    readTime: "9 min read",
    tag: "Investment",
  },
  {
    id: 6,
    category: "Sustainability",
    date: "January 10, 2025",
    author: "Komstruk",
    title: "How Energy Efficiency Enhances Circular Performance in Battery Recycling Operations",
    excerpt: "Operational efficiency and sustainability are no longer competing priorities. At Komstruk, we have designed our facilities to prove that the greenest operation is also the most cost-effective.",
    img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=700&q=80",
    readTime: "5 min read",
    tag: "Sustainability",
  },
  {
    id: 7,
    category: "Industry",
    date: "December 28, 2024",
    author: "Komstruk",
    title: "Comparing India's Top 3 Battery Recycling Hubs: Mumbai vs. Pune vs. Bengaluru",
    excerpt: "As India's circular economy matures, three cities are emerging as the dominant centres for battery recycling infrastructure — each with distinct advantages for operators and investors.",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80",
    readTime: "7 min read",
    tag: "Industry",
  },
  {
    id: 8,
    category: "Operations",
    date: "December 20, 2024",
    author: "Komstruk",
    title: "Inside the Modern Recycling Facility: How Komstruk Creates Value Beyond Material Output",
    excerpt: "The most successful recycling facilities are no longer just processing plants — they are knowledge hubs, community anchors and innovation centres rolled into one certified operation.",
    img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=700&q=80",
    readTime: "6 min read",
    tag: "Operations",
  },
];

const CATEGORIES = ["All", "Industry", "Technology", "Sustainability", "Operations", "Investment"];
const POSTS_PER_PAGE = 6;

/* ════════════════════════════════════════════════════
   BLOGS PAGE
════════════════════════════════════════════════════ */
export default function Blogs() {
  const [loaded, setLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [newsletter, setNewsletter] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => { const t = setTimeout(() => setLoaded(true), 80); return () => clearTimeout(t); }, []);

  /* Reset page when filter changes */
  useEffect(() => { setCurrentPage(1); }, [activeCategory, search]);

  const filtered = ALL_BLOGS.filter(b => {
    const matchCat = activeCategory === "All" || b.category === activeCategory;
    const matchSearch = !search || b.title.toLowerCase().includes(search.toLowerCase()) || b.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  const handleSubscribe = e => { e.preventDefault(); if (newsletter) setSubscribed(true); };

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
        @keyframes spinSlow { to { transform: rotate(360deg); } }
        @keyframes shimmerSlide {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-up { animation: fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) both; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }

        .hero-img { animation: heroLoad 1.8s cubic-bezier(0.16,1,0.3,1) forwards; }

        /* Blog card */
        .blog-card { transition: box-shadow 0.35s ease, transform 0.35s ease; }
        .blog-card:hover { box-shadow: 0 20px 50px rgba(0,0,0,0.1); transform: translateY(-4px); }
        .blog-card .card-img img { transition: transform 0.6s cubic-bezier(0.16,1,0.3,1); }
        .blog-card:hover .card-img img { transform: scale(1.05); }
        .blog-card .read-more { transition: color 0.2s, gap 0.3s; }
        .blog-card:hover .read-more { color: #059669; gap: 10px; }
        .blog-card .read-more svg { transition: transform 0.3s ease; }
        .blog-card:hover .read-more svg { transform: translateX(4px); }

        /* Category filter */
        .cat-btn { transition: all 0.25s ease; border-bottom: 2px solid transparent; }
        .cat-btn.active { color: #059669; border-bottom-color: #059669; }
        .cat-btn:not(.active):hover { color: #374151; }

        /* Featured badge */
        .featured-badge {
          background: linear-gradient(90deg, #059669, #10b981);
          background-size: 200% auto;
          animation: shimmerSlide 3s linear infinite;
        }

        /* Pagination */
        .page-btn { transition: all 0.2s ease; }
        .page-btn.active { background: #111; color: #fff; }
        .page-btn:not(.active):hover { background: #f3f4f6; }

        /* Search */
        .search-wrap { position: relative; }
        .search-wrap input:focus { outline: none; border-color: #059669; }

        /* Subscribe btn */
        .subscribe-btn {
          background: #111; color: #fff; border: none;
          padding: 12px 28px; font-size: 11px; font-weight: 500;
          letter-spacing: 0.18em; text-transform: uppercase;
          cursor: pointer; transition: background 0.3s; flex-shrink: 0;
        }
        .subscribe-btn:hover { background: #059669; }
      `}</style>

      <Header />

      {/* ════════════════════════════════
          01 — HERO BANNER (dark, same as Contact/About)
      ════════════════════════════════ */}
      <section className="relative w-full" style={{ background: "#0a0a0a", minHeight: 200 }}>
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=85"
            className="w-full h-full object-cover hero-img"
            alt="Blogs"
            style={{ filter: "brightness(0.2) saturate(0.4)" }}
          />
          {/* Decorative ring */}
          <div className="absolute right-16 top-1/2 -translate-y-1/2 opacity-10"
            style={{ animation: "spinSlow 22s linear infinite" }}>
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
            <p className="text-white/40 text-xs tracking-widest uppercase font-light mb-3">Knowledge Hub</p>
            <h1 className="text-white text-4xl md:text-5xl font-light tracking-widest uppercase">Blogs</h1>
          </div>
          <div className="hidden md:flex items-center gap-3"
            style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.9s ease 0.4s" }}>
            <span className="text-white/35 text-xs tracking-widest uppercase font-light">Home</span>
            <span className="text-white/35 text-xs">/</span>
            <span className="text-emerald-400 text-xs tracking-widest uppercase font-light">Blogs</span>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          02 — PAGE HEADER + SEARCH
          (Omicron: "Building Perspectives" heading + subtitle)
      ════════════════════════════════ */}
      <section className="w-full bg-white pt-16 pb-10 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-2 tracking-tight">
              Battery Perspectives: Insights in Circular Economy & Recycling
            </h2>
            <div className="w-12 h-0.5 bg-emerald-500 mb-5" />
            <p className="text-sm text-gray-400 font-light leading-6 max-w-2xl">
              Stay updated with the latest trends, insights and innovations in battery recycling and circular infrastructure. Explore our blog for expert perspectives and industry updates that drive smarter decisions.
            </p>
          </Reveal>

          {/* Search + Category filter */}
          <Reveal delay={100} style={{ marginTop: "2rem" }}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              {/* Category pills */}
              <div className="flex flex-wrap gap-0 border-b border-gray-100">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`cat-btn px-4 py-2 text-xs font-medium tracking-widest uppercase mr-1 ${activeCategory === cat ? "active" : "text-gray-400"}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              {/* Search */}
              <div className="search-wrap flex-shrink-0">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full md:w-64 border border-gray-200 bg-gray-50 text-sm text-gray-700 placeholder-gray-400 font-light px-4 py-2.5 pl-10 transition-colors"
                    style={{ fontFamily: "'Roboto',sans-serif", outline: "none" }}
                  />
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="6" cy="6" r="4"/><path d="M10 10l3 3"/>
                  </svg>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════
          03 — FEATURED HERO POST (first blog large)
      ════════════════════════════════ */}
      {currentPage === 1 && activeCategory === "All" && !search && (
        <section className="w-full bg-white px-8 md:px-16 lg:px-24 pb-12">
          <div className="max-w-7xl mx-auto">
            <Reveal from="scale">
              <div className="blog-card relative overflow-hidden cursor-pointer group">
                <div className="relative h-72 md:h-96 overflow-hidden card-img">
                  <img
                    src={ALL_BLOGS[0].img}
                    alt={ALL_BLOGS[0].title}
                    className="w-full h-full object-cover"
                    style={{ filter: "brightness(0.72) saturate(0.75)" }}
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  {/* Featured badge */}
                  <div className="absolute top-5 left-5">
                    <span className="featured-badge text-white text-xs font-medium tracking-widest uppercase px-3 py-1.5">
                      Featured
                    </span>
                  </div>
                  {/* Category */}
                  <div className="absolute top-5 right-5">
                    <span className="bg-white/15 backdrop-blur-sm text-white text-xs tracking-widest uppercase px-3 py-1.5 border border-white/20">
                      {ALL_BLOGS[0].category}
                    </span>
                  </div>
                  {/* Bottom text on image */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <p className="text-white/60 text-xs font-light tracking-wide mb-2">{ALL_BLOGS[0].date} · {ALL_BLOGS[0].readTime}</p>
                    <h3 className="text-white text-xl md:text-2xl font-medium leading-snug mb-3 max-w-2xl">
                      {ALL_BLOGS[0].title}
                    </h3>
                    <a href="#" className="read-more flex items-center gap-2 text-emerald-400 text-xs font-medium tracking-widest uppercase">
                      Read More
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 7h10M8 3l4 4-4 4"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ════════════════════════════════
          04 — BLOG GRID (2-col, like Omicron)
      ════════════════════════════════ */}
      <section className="w-full bg-white px-8 md:px-16 lg:px-24 pb-16">
        <div className="max-w-7xl mx-auto">

          {filtered.length === 0 ? (
            <Reveal style={{ textAlign: "center", padding: "5rem 0" }}>
              <div className="text-5xl mb-4">🔍</div>
              <p className="text-gray-400 text-sm font-light">No articles found for your search.</p>
              <button onClick={() => { setSearch(""); setActiveCategory("All"); }}
                className="mt-4 text-sm font-medium text-emerald-600 underline underline-offset-4 hover:text-emerald-700 transition-colors">
                Clear filters
              </button>
            </Reveal>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
              {paginated.map((blog, i) => (
                <Reveal key={blog.id} delay={i * 80} from={i % 2 === 0 ? "left" : "right"}>
                  <article className="blog-card cursor-pointer">
                    {/* Image */}
                    <div className="card-img overflow-hidden mb-5" style={{ height: 220 }}>
                      <img
                        src={blog.img}
                        alt={blog.title}
                        className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs text-gray-400 font-light">{blog.date}</span>
                      <span className="text-gray-200">·</span>
                      <span className="text-xs font-bold text-gray-700 uppercase tracking-wide">{blog.author}</span>
                      <span className="text-gray-200">·</span>
                      <span className="text-xs px-2 py-0.5 bg-emerald-50 text-emerald-600 font-medium uppercase tracking-wide">{blog.tag}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm md:text-base font-bold text-gray-900 uppercase leading-snug mb-3 tracking-wide hover:text-emerald-600 transition-colors">
                      {blog.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs text-gray-500 leading-6 font-light mb-4 line-clamp-3">
                      {blog.excerpt}
                    </p>

                    {/* Read More */}
                    <a href="#" className="read-more flex items-center gap-2 text-gray-700 text-xs font-medium tracking-widest uppercase">
                      Read More
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 7h10M8 3l4 4-4 4"/></svg>
                    </a>
                  </article>
                </Reveal>
              ))}
            </div>
          )}

          {/* ── Pagination (Omicron: numbered pages) ── */}
          {totalPages > 1 && (
            <Reveal style={{ marginTop: "3rem" }}>
              <div className="flex items-center gap-2">
                {/* Prev */}
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className={`page-btn w-9 h-9 flex items-center justify-center border text-sm transition-all ${currentPage === 1 ? "border-gray-100 text-gray-300 cursor-not-allowed" : "border-gray-300 text-gray-600 hover:border-gray-900"}`}
                >
                  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 2L4 6l4 4"/></svg>
                </button>

                {/* Page numbers */}
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`page-btn w-9 h-9 flex items-center justify-center border text-xs font-medium ${currentPage === i + 1 ? "active border-gray-900" : "border-gray-200 text-gray-600"}`}
                  >
                    {i + 1}
                  </button>
                ))}

                {/* Next */}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className={`page-btn w-9 h-9 flex items-center justify-center border text-sm transition-all ${currentPage === totalPages ? "border-gray-100 text-gray-300 cursor-not-allowed" : "border-gray-300 text-gray-600 hover:border-gray-900"}`}
                >
                  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 2l4 4-4 4"/></svg>
                </button>

                <span className="text-xs text-gray-400 font-light ml-2">
                  Page {currentPage} of {totalPages}
                </span>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ════════════════════════════════
          05 — NEWSLETTER SUBSCRIBE
          (same as Contact page)
      ════════════════════════════════ */}
      <section className="w-full bg-gray-50 border-t border-gray-100 py-14 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-xl font-light text-gray-900 leading-tight">
                  Subscribe To Our<br /><span className="font-medium">Newsletter</span>
                </h3>
                <p className="text-xs text-gray-400 font-light mt-2 max-w-xs">
                  Get the latest battery recycling insights, industry news and Komstruk updates directly in your inbox.
                </p>
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
                      className="flex-1 border-b border-gray-300 bg-transparent text-sm text-gray-700 placeholder-gray-400 font-light px-0 py-3 focus:border-gray-900 focus:outline-none transition-colors"
                      style={{ fontFamily: "'Roboto',sans-serif" }}
                    />
                    <button type="submit" className="subscribe-btn ml-4">Subscribe</button>
                  </>
                )}
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════
          06 — TOPICS / POPULAR TAGS
      ════════════════════════════════ */}
      <section className="w-full bg-white border-t border-gray-100 py-14 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h3 className="text-lg font-light text-gray-900 mb-8">Browse by topic</h3>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Lithium Recycling",     count: 12 },
                { label: "Circular Economy",      count: 9  },
                { label: "EV Battery Recovery",   count: 8  },
                { label: "Hydrometallurgy",       count: 6  },
                { label: "Sustainability",         count: 11 },
                { label: "Industry Trends",       count: 7  },
                { label: "Material Recovery",     count: 5  },
                { label: "Green Investment",      count: 4  },
                { label: "Process Engineering",   count: 6  },
                { label: "ISO Certification",     count: 3  },
              ].map(({ label, count }, i) => (
                <Reveal key={label} delay={i * 40}>
                  <button
                    onClick={() => { setSearch(label); setActiveCategory("All"); }}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-xs text-gray-600 font-light hover:border-emerald-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-250"
                  >
                    {label}
                    <span className="text-gray-300 text-xs">({count})</span>
                  </button>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}