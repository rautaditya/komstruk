import { useState, useEffect } from "react";

const navLinks = [
  { label: "Why Komstruk", href: "#why" },
  { label: "Products", href: "/products" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Career", href: "#career" },
  { label: "Recycling", href: "#recycling" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Why Komstruk");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/60 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a
          href="/"
          className="text-white font-bold text-2xl tracking-tight select-none"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          komstruk
        </a>
        <a href="/admin/login">Login</a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setActiveLink(link.label)}
              className={`text-sm font-medium transition-colors duration-200 relative group ${
                activeLink === link.label
                  ? "text-emerald-400"
                  : "text-white/80 hover:text-white"
              }`}
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {link.label}
              {/* underline indicator */}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-emerald-400 transition-all duration-300 ${
                  activeLink === link.label
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              />
            </a>
          ))}
        </nav>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex flex-col gap-1.5 p-2 md:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>

        {/* Desktop menu icon (decorative, like original) */}
        <div className="hidden md:flex flex-col gap-1.5 p-2 cursor-pointer">
          <span className="block h-0.5 w-6 bg-white/70" />
          <span className="block h-0.5 w-4 bg-white/70" />
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } bg-black/80 backdrop-blur-md`}
      >
        <nav className="flex flex-col px-6 py-4 gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => {
                setActiveLink(link.label);
                setMenuOpen(false);
              }}
              className={`text-base font-medium transition-colors duration-200 ${
                activeLink === link.label
                  ? "text-emerald-400"
                  : "text-white/80 hover:text-white"
              }`}
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {link.label}
            </a>
            

          ))}
        </nav>
      </div>
    </header>
  );
}