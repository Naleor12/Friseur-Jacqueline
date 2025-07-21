import { useState } from 'react';

export default function NavbarComponent() {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { label: 'Start', href: '#hero' },
    { label: 'Über uns', href: '#ueber-uns' },
    { label: 'Leistungen', href: '#leistungen' },
    { label: 'Kontakt', href: '#kontakt' },
  ];

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50 font-josefin transition-transform duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="#hero" className="flex items-center">
            <img src="/JD_Logo_light_RGB.jpg" alt="Logo" className="h-10 w-auto" />
          </a>

          <button
            onClick={() => setOpen(!open)}
            className="sm:hidden text-gray-800 focus:outline-none"
            aria-label="Menü öffnen oder schließen"
            aria-expanded={open}
          >
            {open ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Desktop Nav */}
          <ul className="hidden sm:flex space-x-8 text-gray-700 font-medium">
            {menuItems.map(({ label, href }) => (
              <li key={label}>
                <a href={href} className="relative group">
                  {label}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#d3b5b7] transition-all group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Menu */}
        <div
          className={`sm:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <ul className="flex flex-col items-center py-4 space-y-4 text-gray-700 font-medium">
            {menuItems.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  onClick={() => setOpen(false)}
                  className="block hover:text-[#d3b5b7] transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
