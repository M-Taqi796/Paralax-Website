import React from 'react';

const APK_URL =
  'https://expo.dev/artifacts/eas/ayQ87c6MH24qJoPCMaZouR.apk';

/**
 * PrimaryButton — shared CTA button used across NavBar and BusAnimation.
 * Props:
 *  - children   : button label
 *  - onClick    : click handler (defaults to APK download)
 *  - className  : extra Tailwind classes for sizing overrides
 *  - ariaLabel  : accessible label
 *  - size       : "sm" | "md" (default)
 */
export default function PrimaryButton({
  children = 'Download App',
  onClick,
  className = '',
  ariaLabel = 'Download UniGo App',
  size = 'md',
}) {
  const sizeClasses =
    size === 'sm'
      ? 'px-5 py-2.5 text-sm'
      : 'px-8 py-4 text-[length:var(--fluid-p)] lg:text-base';

  const handleClick = onClick ?? (() => {
    const a = document.createElement('a');
    a.href = APK_URL;
    a.download = 'UniGo.apk';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });

  return (
    <button
      onClick={handleClick}
      aria-label={ariaLabel}
      className={`
        pointer-events-auto
        ${sizeClasses}
        min-h-[44px] min-w-[44px]
        bg-[#2086BF] text-white font-semibold rounded-full
        hover:bg-[#1a6fa3] active:scale-95
        transition-all duration-300 ease-out
        tracking-tight
        focus-visible:ring-4 focus-visible:ring-[#2086BF]/50 focus-visible:outline-none
        shadow-md hover:shadow-lg
        ${className}
      `}
    >
      {children}
    </button>
  );
}
