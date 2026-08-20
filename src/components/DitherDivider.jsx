import React from 'react';

/* ---------------------------------------------------------------------------
   DitherDivider

   A horizontal dot-screen band that acts as a visual bridge between sections.
   Uses the same conic-gradient 4px halftone as FeaturesGrid's tile-dither,
   so the dithering language reads as one system rather than an isolated trick.

   The band fades at both horizontal edges and top/bottom via CSS masks so it
   dissolves into the surrounding sections instead of cutting in with a hard
   line.

   Props:
     dark  — true when the divider sits on a dark (#171613) ground.
             false (default) for the paper (#F5F2EA) ground.
     className — additional classes to merge onto the wrapper.
--------------------------------------------------------------------------- */

export default function DitherDivider({ dark = false, className = '' }) {
  const dotColor = dark ? 'rgba(255,255,255,0.18)' : 'rgba(23,22,19,0.10)';

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none w-full h-10 overflow-hidden ${className}`}
      style={{
        backgroundImage: `conic-gradient(${dotColor} 25%, transparent 0)`,
        backgroundSize: '4px 4px',
        maskImage:
          'linear-gradient(to right, transparent 0%, #000 15%, #000 85%, transparent 100%), ' +
          'linear-gradient(to bottom, transparent 0%, #000 30%, #000 70%, transparent 100%)',
        maskComposite: 'intersect',
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0%, #000 15%, #000 85%, transparent 100%)',
        /* WebKit doesn't support mask-composite well — the vertical fade is
           approximated by the container's own overflow:hidden + short height. */
      }}
    />
  );
}
