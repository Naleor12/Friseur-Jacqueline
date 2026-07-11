import { useState, useEffect, useRef } from 'react';

export default function NavbarComponent() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const menuItems = [
    { label: 'Start', href: '#hero', id: 'hero' },
    { label: 'Über uns', href: '#ueber-uns', id: 'ueber-uns' },
    { label: 'Leistungen', href: '#leistungen', id: 'leistungen' },
    { label: 'Galerie', href: '#galerie', id: 'galerie' },
    { label: 'Kontakt', href: '#kontakt', id: 'kontakt' },
  ];

  // Scroll-based navbar behavior
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Set scrolled state for background change
          setScrolled(currentScrollY > 50);
          
          // Hide/show navbar based on scroll direction
          if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
            setHidden(true);
          } else {
            setHidden(false);
          }
          
          // Calculate scroll progress
          const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = Math.min((currentScrollY / scrollHeight) * 100, 100);
          setScrollProgress(progress);
          
          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section detection
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observerOptions = {
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe all sections
    menuItems.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Smooth scroll to section
  const scrollToSection = (href) => {
    if (typeof window === 'undefined') return;
    
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setOpen(false);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleClickOutside = (event) => {
      if (open && !event.target.closest('nav')) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('click', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      if (document.body) {
        document.body.style.overflow = '';
      }
    };
  }, [open]);

  return (
    <>
      {/* Mobile menu backdrop */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 sm:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      
      <nav 
        className={`
          fixed top-0 left-0 right-0 z-50 font-josefin transition-all duration-300 ease-in-out
          ${hidden ? '-translate-y-full' : 'translate-y-0'}
          ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/90 backdrop-blur-sm shadow-md'}
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <button
              onClick={() => scrollToSection('#hero')}
              className="flex items-center group transition-transform duration-200 hover:scale-105"
            >
              <img 
                src="/JD_Logo_light_RGB.svg" 
                alt="Jacqueline Dickhaus Logo" 
                className="h-12 w-auto transition-all duration-200 group-hover:scale-105 opacity-85 brightness-110 contrast-90" 
                loading="lazy" 
              />
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setOpen(!open)}
              className="sm:hidden text-gray-800 focus:outline-none p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Menü öffnen oder schließen"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <div className="relative w-6 h-6">
                <span 
                  className={`
                    absolute h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out
                    ${open ? 'rotate-45 top-3' : 'top-1'}
                  `}
                />
                <span 
                  className={`
                    absolute h-0.5 w-6 bg-current transition-all duration-300 ease-in-out top-3
                    ${open ? 'opacity-0' : 'opacity-100'}
                  `}
                />
                <span 
                  className={`
                    absolute h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out
                    ${open ? '-rotate-45 top-3' : 'top-5'}
                  `}
                />
              </div>
            </button>

            {/* Desktop menu */}
            <ul className="hidden sm:flex space-x-8 text-gray-700 font-medium">
              {menuItems.map(({ label, href, id }) => (
                <li key={label}>
                  <button
                    onClick={() => scrollToSection(href)}
                    className={`
                      relative group py-2 px-1 transition-colors duration-200
                      ${activeSection === id ? 'text-branding' : 'text-gray-700 hover:text-branding'}
                    `}
                  >
                    {label}
                    <span 
                      className={`
                        absolute left-0 -bottom-1 h-0.5 bg-branding transition-all duration-300
                        ${activeSection === id ? 'w-full' : 'w-0 group-hover:w-full'}
                      `}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile menu */}
          <div
            id="mobile-menu"
            className={`
              sm:hidden overflow-hidden transition-all duration-500 ease-in-out
              ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
            `}
          >
            <ul className="flex flex-col items-center py-6 space-y-6 text-gray-700 font-medium bg-white/95 backdrop-blur-md rounded-b-2xl mx-4 mb-4 shadow-xl">
              {menuItems.map(({ label, href, id }) => (
                <li key={label}>
                  <button
                    onClick={() => scrollToSection(href)}
                    className={`
                      block py-2 px-4 rounded-lg transition-all duration-200
                      ${activeSection === id 
                        ? 'text-branding bg-branding/10' 
                        : 'text-gray-700 hover:text-branding hover:bg-gray-50'
                      }
                    `}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-200">
          <div 
            className="h-full bg-branding transition-all duration-300 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </nav>
    </>
  );
}