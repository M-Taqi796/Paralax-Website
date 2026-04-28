import React, { useState } from 'react';
import PrimaryButton from './PrimaryButton';

const NAV_LINKS = [
  { label: 'Home', href: '#' },
  { label: 'Student Signup', href: '#' },
  { label: 'Register Institute', href: '#' },
  { label: 'MTO Portal', href: '#' },
];

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

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
            <a
              key={link.label}
              href={link.href}
              className="text-sm lg:text-base font-medium text-gray-700 hover:text-[#2086BF] transition-colors duration-200 tracking-tight whitespace-nowrap"
            >
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
          <span
            className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-300 origin-center ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span
            className={`block w-6 h-0.5 bg-gray-700 transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block w-6 h-0.5 bg-gray-700 transition-transform duration-300 origin-center ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </button>
      </div>

      {/* Curved bottom line — SVG arc that fades at both edges */}
      <div className="pointer-events-none w-full overflow-hidden" aria-hidden="true">
        <svg
          viewBox="0 0 1200 24"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          style={{ height: '16px' }}
        >
          <defs>
            <linearGradient id="bowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6b7280" stopOpacity="0" />
              <stop offset="20%" stopColor="#6b7280" stopOpacity="0.35" />
              <stop offset="50%" stopColor="#6b7280" stopOpacity="0.5" />
              <stop offset="80%" stopColor="#6b7280" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#6b7280" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Bow / arc: starts at left edge, curves down to centre, back up to right */}
          <path
            d="M 0,2 Q 600,22 1200,2"
            fill="none"
            stroke="url(#bowGrad)"
            strokeWidth="1.5"
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
