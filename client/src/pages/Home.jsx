import Header from "../componants/Header";
import Footer from "../componants/Footer";

export default function Home() {
  return (
    <main className="relative w-full overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
        * { font-family: 'Roboto', sans-serif !important; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up { animation: fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
      `}</style>

      <Header />

      {/* ════════════════════════════════
          01 — HERO
      ════════════════════════════════ */}
      <section className="relative min-h-screen w-full">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=1920&q=80"
            className="w-full h-full object-cover"
            alt="Hero background"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 flex flex-col justify-end min-h-screen pb-28 md:pb-36 px-8 md:px-16 lg:px-24">
          <div className="max-w-2xl">
            <p className="text-white text-xl md:text-2xl font-light leading-relaxed mb-10 animate-fade-up delay-200 tracking-wide">
              The world is turning its back on fossil fuels. With the change
              comes new opportunities and new demands for industry.
              Together, let's build a cleaner world.
            </p>
            <a
              href="#why"
              className="inline-block px-10 py-4 text-white font-medium text-sm tracking-widest uppercase bg-emerald-600 hover:bg-emerald-500 transition-colors duration-300 animate-fade-up delay-400"
            >
              Join us
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 right-10 z-10 flex flex-col items-center gap-2 opacity-50">
          <span className="text-white text-xs tracking-widest uppercase font-light">Scroll</span>
          <span className="block w-px h-12 bg-white/60 animate-pulse" />
        </div>
      </section>

      {/* ════════════════════════════════
          02 — GREEN BATTERIES
      ════════════════════════════════ */}
      <section className="w-full bg-white py-24 md:py-32 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-28">

          <div className="flex-1 w-full">
            <img
              src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80"
              alt="Green battery technology"
              className="w-full h-80 lg:h-[500px] object-cover"
            />
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 leading-tight mb-6 tracking-tight">
              Green batteries for<br />a blue planet
            </h2>
            <p className="text-sm text-gray-500 leading-7 mb-8 max-w-md font-light">
              We're in the battery business. Manufacturing with clean energy,
              our mission is to deliver batteries with a 90% lower carbon
              footprint compared to those made using coal energy. And we're
              building them into solutions to make the world a better, cleaner place.
            </p>
            <a href="#cells" className="text-sm font-medium text-gray-900 underline underline-offset-4 hover:text-emerald-600 transition-colors w-fit">
              Our cells
            </a>
          </div>

        </div>
      </section>

  

      {/* ════════════════════════════════
          04 — CALLING ALL PROBLEM SOLVERS
      ════════════════════════════════ */}
      <section className="w-full bg-gray-50 py-24 md:py-32 px-8 md:px-16 lg:px-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-28">

          <div className="flex-1 flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6 tracking-tight">
              Calling all<br />problem solvers
            </h2>
            <p className="text-sm text-gray-500 leading-7 mb-8 max-w-md font-light">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-800 mr-2">Career</span>
              Going to work is much more exciting when you can see how your daily
              efforts have a direct positive impact on the future. Join us in inventing,
              manufacturing and recycling the world's greenest batteries!
            </p>
            <a href="#join" className="text-sm font-medium text-gray-900 underline underline-offset-4 hover:text-emerald-600 transition-colors w-fit">
              Join us!
            </a>
          </div>

          <div className="flex-1 w-full">
            <img
              src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80"
              alt="People working together"
              className="w-full h-80 lg:h-[500px] object-cover"
            />
          </div>

        </div>
      </section>

      {/* ════════════════════════════════
          05 — POWERED BY NATURE
      ════════════════════════════════ */}
      <div className="relative w-full">
        <div className="relative w-full h-[60vh] min-h-[420px]">
          <img
            src="https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1920&q=80"
            alt="Force of nature"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <div className="absolute top-1/3 right-0 lg:right-20 w-full max-w-xl bg-white px-10 py-12">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 leading-tight mb-6 tracking-tight">
            Powered by the<br />force of nature
          </h2>
          <p className="text-sm text-gray-500 leading-7 mb-6 font-light">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-800 mr-2">Sustainability</span>
            A big contribution to Northvolt's low-carbon footprint comes from our
            commitment to power our factories with clean, renewable energy. Combine
            that with minimal resource use alongside battery recycling and you have
            the blueprint for the world's greenest battery.
          </p>
          <a href="#sustainability" className="text-sm font-medium text-gray-900 underline underline-offset-4 hover:text-emerald-600 transition-colors w-fit">
            Read more
          </a>
        </div>

        <div className="h-64 md:h-80" />
      </div>

      {/* ════════════════════════════════
          06 — SOLUTIONS
      ════════════════════════════════ */}
      <section className="w-full bg-white px-8 md:px-16 lg:px-24 py-24">
        <h2 className="text-center text-3xl font-light text-gray-900 mb-14 tracking-wide">
          Solutions
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: "Automotive",   img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80" },
            { label: "Construction", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80" },
            { label: "Disruptors",   img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80" },
            { label: "E-mobility",   img: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&q=80" },
            { label: "Grid",         img: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80" },
            { label: "Industrial",   img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80" },
          ].map((item) => (
            <div key={item.label} className="relative group cursor-pointer overflow-hidden">
              <span className="absolute top-3 left-3 z-10 text-xs uppercase tracking-widest text-white/70 font-medium">
                {item.label}
              </span>
              <img
                src={item.img}
                alt={item.label}
                className="w-full h-44 md:h-52 object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500" />
              <span className="absolute bottom-4 left-4 text-white text-sm font-medium tracking-wide">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════
          07 — LATEST NEWS
      ════════════════════════════════ */}
      <section className="w-full bg-gray-50 px-8 md:px-16 lg:px-24 py-24 border-t border-gray-100">
        <h2 className="text-center text-3xl font-light text-gray-900 mb-14 tracking-wide">
          Latest news
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              date: "30 January 2025",
              title: "Leadership transition at Northvolt North America: Paolo Cerruti steps aside as CEO and remains Chairman of the Board",
              img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80",
            },
            {
              date: "29 January 2025",
              title: "Volvo Cars takes full ownership of NOVO Energy",
              img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&q=80",
            },
            {
              date: "29 August 2024",
              title: "Northvolt to advance lithium-metal battery technology from Northvolt Labs",
              img: "https://images.unsplash.com/photo-1620714223084-8fcacc2dbe4d?w=400&q=80",
            },
          ].map((news) => (
            <div key={news.title} className="flex flex-col gap-4 cursor-pointer group">
              <div className="overflow-hidden">
                <img
                  src={news.img}
                  alt={news.title}
                  className="w-full h-44 object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
              </div>
              <p className="text-xs text-gray-400 font-light tracking-wide">{news.date}</p>
              <p className="text-sm text-gray-800 leading-snug font-medium group-hover:text-emerald-600 transition-colors">
                {news.title}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════
          08 — BATTERIES FROM BATTERIES
      ════════════════════════════════ */}
      <section className="w-full bg-white px-8 md:px-16 lg:px-24 py-24 border-t border-gray-100">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 leading-tight mb-5 tracking-tight">
              Batteries made<br />from batteries
            </h2>
            <p className="text-sm text-gray-400 leading-7 mb-7 font-light">
              A model defined by battery lives forever. But when they contain recyclable
              materials, they're always valuable. By recovering used batteries and recycling
              them into raw materials for new batteries, we're steering the demand for fresh
              material and moving closer to closing the loop on batteries.
            </p>
            <a href="#revolt" className="text-sm font-medium text-gray-900 underline underline-offset-4 hover:text-emerald-600 transition-colors">
              Introducing Revolt
            </a>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
              alt="Battery recycling"
              className="w-full h-72 object-cover"
            />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          09 — THE NORTHVOLT WAY
      ════════════════════════════════ */}
      <section className="w-full bg-gray-50 px-8 md:px-16 lg:px-24 py-24 border-t border-gray-100">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16">

          <div className="md:w-1/4">
            <h2 className="text-2xl md:text-3xl font-light text-gray-900 leading-tight mb-4 tracking-tight">
              The Northvolt way
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed mb-5 font-light">
              A model defined by technical leadership and rooted in a commitment to sustainability.
            </p>
            <a href="#more" className="text-sm font-medium text-gray-900 underline underline-offset-4 hover:text-emerald-600 transition-colors">
              Read more
            </a>
          </div>

          <div className="md:w-3/4 grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Collaboration",
                text: "Our customers help shape the products and applications. We welcome you in to work side by side in developing tailor-made solutions.",
              },
              {
                title: "Sustainable by default",
                text: "Going green isn't an optional extra at Northvolt. It's baseline. Ethical sourcing, smart engineering and a commitment to clean energy behind every cell.",
              },
              {
                title: "Fully connected",
                text: "Battery management software: product traceability, remote access — all delivered through Northvolt's software harnessing machine learning.",
              },
            ].map((col) => (
              <div key={col.title}>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-800 mb-3">{col.title}</p>
                <p className="text-xs text-gray-400 leading-relaxed font-light">{col.text}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      <Footer />

    </main>
  );
}