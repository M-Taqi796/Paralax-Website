import React, { useState, useEffect } from 'react';
import PrimaryButton from './PrimaryButton';

const NAV_LINKS = [
  { label: 'Home', href: '#' },
  { label: 'Student Signup', href: '#' },
  { label: 'Register Institute', href: '#' },
  { label: 'MTO Portal', href: '#' },
];

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  // true when the navbar is sitting over a dark-background section (Features)
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const featuresEl = document.getElementById('features-section');
    const footerEl  = document.querySelector('footer');
    if (!featuresEl) return;

    // Track which sections are currently intersecting the viewport
    let featuresVisible = false;
    let footerVisible   = false;

    const update = () => setIsDark(featuresVisible && !footerVisible);

    // Watch the dark Features section
    const featuresObserver = new IntersectionObserver(
      ([entry]) => { featuresVisible = entry.isIntersecting; update(); },
      { threshold: 0 }
    );
    featuresObserver.observe(featuresEl);

    // Watch the light Footer — when it appears, flip back to dark text
    let footerObserver = null;
    if (footerEl) {
      footerObserver = new IntersectionObserver(
        ([entry]) => { footerVisible = entry.isIntersecting; update(); },
        { threshold: 0 }
      );
      footerObserver.observe(footerEl);
    }

    return () => {
      featuresObserver.disconnect();
      footerObserver?.disconnect();
    };
  }, []);

  // Dynamic colour tokens — transition smoothly over 300 ms
  const linkClass = `text-sm lg:text-base font-medium tracking-tight whitespace-nowrap
    transition-colors duration-300 ease-in-out
    ${isDark
      ? 'text-white/90 hover:text-white'
      : 'text-gray-700 hover:text-[#2086BF]'
    }`;

  const hamburgerBarClass = `block w-6 h-0.5 transition-all duration-300 origin-center
    ${isDark ? 'bg-white/90' : 'bg-gray-700'}`;

  const arcColor = isDark ? '#ffffff' : '#6b7280';

  return (
    <nav
      aria-label="Main navigation"
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
    >
      {/* Main bar */}
      <div className="pointer-events-auto flex items-center justify-between px-6 md:px-10 lg:px-16 py-3">

        {/* Logo */}
        <a href="#" aria-label="UniGo Home" className="shrink-0">
          <img
            src="/UniGoLogo/HorizontalTransparent.png"
            alt="UniGo Logo"
            className="h-10 md:h-12 w-auto object-contain"
          />
        </a>

        {/* Desktop links + CTA */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} className={linkClass}>
              {link.label}
            </a>
          ))}
          <PrimaryButton size="sm">Download App</PrimaryButton>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg focus-visible:ring-2 focus-visible:ring-[#2086BF] focus-visible:outline-none"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span className={`${hamburgerBarClass} ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`${hamburgerBarClass} ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`${hamburgerBarClass} ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Curved bottom line — bow arc that fades at both edges */}
      <div className="pointer-events-none w-full overflow-hidden" aria-hidden="true">
        <svg
          viewBox="0 0 1200 50"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          style={{ height: '30px' }}
        >
          <defs>
            <linearGradient id="bowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor={arcColor} stopOpacity="0" />
              <stop offset="20%"  stopColor={arcColor} stopOpacity="0.35" />
              <stop offset="50%"  stopColor={arcColor} stopOpacity="0.5" />
              <stop offset="80%"  stopColor={arcColor} stopOpacity="0.35" />
              <stop offset="100%" stopColor={arcColor} stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Bow arch: both edges droop to y=46, smooth peak stays at y=5 */}
          <path
            d="M 0,46 C 350,5 850,5 1200,46"
            fill="none"
            stroke="url(#bowGrad)"
            strokeWidth="1.8"
          />
        </svg>
      </div>

      {/* Mobile dropdown menu */}
      <div
        className={`
          pointer-events-auto md:hidden
          overflow-hidden transition-all duration-300 ease-in-out
          ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="bg-white/80 backdrop-blur-xl border-t border-gray-200/60 px-6 py-4 flex flex-col gap-4 shadow-lg">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-base font-medium text-gray-700 hover:text-[#2086BF] transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <PrimaryButton size="sm" className="self-start">Download App</PrimaryButton>
        </div>
      </div>
    </nav>
  );
}
