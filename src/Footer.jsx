import React from 'react';

const FOOTER_LINKS = [
  { label: 'About', href: '#' },
  { label: 'Contact', href: '#' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms & Conditions', href: '#' },
];

export default function Footer() {
  return (
    <footer className="w-full min-h-screen bg-white overflow-hidden flex flex-col">

      {/* ── Massive brand name — grows to fill available height ── */}
      <div className="flex-1 flex items-center px-2 sm:px-4 pt-10 sm:pt-14 leading-none select-none">
        <p
          className="font-black italic tracking-tighter text-black text-center w-full"
          style={{
            fontSize: 'clamp(5rem, 22vw, 22rem)',
            lineHeight: 0.88,
          }}
        >
          UniGo
        </p>
      </div>

      {/* ── Separator ── */}
      <div className="mx-4 sm:mx-8 mt-6 sm:mt-10 border-t border-gray-300" />

      {/* ── Copyright + Links row ── */}
      <div className="px-4 sm:px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Left: copyright */}
        <p className="text-xs sm:text-sm text-gray-500 tracking-tight whitespace-nowrap">
          © 2026 UniGo. All rights reserved.
        </p>

        {/* Right: links */}
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-2">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs sm:text-sm text-gray-500 hover:text-[#2086BF] transition-colors duration-200 tracking-tight whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      {/* ── Tagline ── */}
      <div className="px-4 sm:px-8 pb-8 sm:pb-10 text-center">
        <p className="text-[11px] sm:text-xs text-gray-400 leading-relaxed max-w-2xl mx-auto">
          UniGo is a smart AI-powered university transport assistant — bringing real-time bus tracking,
          intelligent seat prediction, QR boarding, and easy fee challan generation to every campus commute.
        </p>
      </div>

    </footer>
  );
}
