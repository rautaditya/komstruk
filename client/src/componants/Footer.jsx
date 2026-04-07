import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full bg-black px-8 md:px-16 lg:px-24 py-16">
      <div className="max-w-7xl mx-auto">

        {/* Top section */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-8">

          {/* ── Left: Brand + Contact ── */}
          <div className="lg:w-1/4 flex flex-col gap-6">
            {/* Logo */}
            <a href="/" className="text-white text-3xl font-bold tracking-tight">
              ElektroactivX
            </a>

            {/* Address */}
            <div>
              <p className="text-gray-400 text-sm font-light leading-relaxed">
                ElektroactivX AB ~ Alströmergatan 20
              </p>
              <p className="text-gray-400 text-sm font-light leading-relaxed">
                SE-112 47, Stockholm, Sweden
              </p>
            </div>

            {/* Phone */}
            <a href="tel:+46761309427" className="text-white text-sm underline underline-offset-4 hover:text-emerald-400 transition-colors w-fit">
              +46761309427
            </a>

            {/* Email */}
            <a href="mailto:hi@elektroactivx.com" className="text-white text-sm underline underline-offset-4 hover:text-emerald-400 transition-colors w-fit">
              hi@elektroactivx.com
            </a>

            {/* Social icons */}
            <div className="flex items-center gap-5 mt-2">
              {/* X (Twitter) */}
              <a href="#" className="text-white hover:text-emerald-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* Facebook */}
              <a href="#" className="text-white hover:text-emerald-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="text-white hover:text-emerald-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" className="text-white hover:text-emerald-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              {/* YouTube */}
              <a href="#" className="text-white hover:text-emerald-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
                </svg>
              </a>
            </div>
          </div>

          {/* ── Right: Nav Columns ── */}
          <div className="lg:w-3/4 grid grid-cols-2 md:grid-cols-4 gap-10">

            {/* Products + Sustainability */}
            <div className="flex flex-col gap-10">
              <div>
                <p className="text-white text-sm font-bold mb-4">Products</p>
                <ul className="flex flex-col gap-2">
                  {["Cells", "Lithium-ion", "Sodium-ion", "Lithium-metal", "Systems", "Voltpack Core", "Voltpack Mobile System"].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-gray-400 text-sm font-light hover:text-white transition-colors">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-white text-sm font-bold mb-4">Sustainability</p>
                <ul className="flex flex-col gap-2">
                  {["Sustainability & Annual Report"].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-gray-400 text-sm font-light hover:text-white transition-colors">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Solutions + Recycling */}
            <div className="flex flex-col gap-10">
              <div>
                <p className="text-white text-sm font-bold mb-4">Solutions</p>
                <ul className="flex flex-col gap-2">
                  {["Energy Storage", "Industrial"].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-gray-400 text-sm font-light hover:text-white transition-colors">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-white text-sm font-bold mb-4">Recycling</p>
                <ul className="flex flex-col gap-2">
                  {["Overview", "Partners"].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-gray-400 text-sm font-light hover:text-white transition-colors">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* About us + Press */}
            <div className="flex flex-col gap-10">
              <div>
                <p className="text-white text-sm font-bold mb-4">About us</p>
                <ul className="flex flex-col gap-2">
                  {["Management", "Stories", "Opinion"].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-gray-400 text-sm font-light hover:text-white transition-colors">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-white text-sm font-bold mb-4">Press</p>
                <ul className="flex flex-col gap-2">
                  {["Press releases", "Press resources"].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-gray-400 text-sm font-light hover:text-white transition-colors">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Manufacturing + Career */}
            <div className="flex flex-col gap-10">
              <div>
                <p className="text-white text-sm font-bold mb-4">Manufacturing</p>
                <ul className="flex flex-col gap-2">
                  {["ElektroactivX Ett", "ElektroactivX Labs", "ElektroactivX Six"].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-gray-400 text-sm font-light hover:text-white transition-colors">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-white text-sm font-bold mb-4">Career</p>
                <ul className="flex flex-col gap-2">
                  {["Life at ElektroactivX", "Categories", "Locations", "Joining us", "Students", "All roles"].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-gray-400 text-sm font-light hover:text-white transition-colors">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs font-light">© 2025 ElektroactivX. All rights reserved.</p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Use", "Cookie Settings"].map((link) => (
              <a key={link} href="#" className="text-gray-600 text-xs hover:text-white transition-colors font-light">
                {link}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer