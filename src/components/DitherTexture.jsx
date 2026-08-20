import React from 'react';

/* ---------------------------------------------------------------------------
   DitherTexture

   A full-section background overlay that adds the halftone dot pattern at very
   low opacity (2-4%). It keeps the dithering language alive in sections that
   would otherwise be flat paper/white with no visual connection to the hero
   and features grid.

   Drop this inside any section with `position: relative; overflow: hidden;`
   and it layers behind the z-10+ content.

   Props:
     opacity — CSS opacity value (default 0.03). Keep between 0.02 and 0.06.
     dark    — true for light dots on dark ground, false for dark dots on light.
     className — additional classes.
--------------------------------------------------------------------------- */

export default function DitherTexture({ opacity = 0.03, dark = false, className = '' }) {
  const dotColor = dark ? 'rgba(255,255,255,0.5)' : 'rgba(23,22,19,0.5)';

  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: `conic-gradient(${dotColor} 25%, transparent 0)`,
        backgroundSize: '4px 4px',
        opacity,
        /* Subtle radial fade so the texture is denser at the top-right and
           dissolves toward the bottom-left, matching the hero's light source. */
        maskImage: 'radial-gradient(ellipse at 85% 15%, #000 0%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(ellipse at 85% 15%, #000 0%, transparent 75%)',
      }}
    />
  );
}
