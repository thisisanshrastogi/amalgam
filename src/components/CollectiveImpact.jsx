import React, { useEffect, useRef } from 'react';
import { createScope } from 'animejs';
import { fadeUpOnScroll, scaleInOnScroll } from '../utils/animations';

export default function CollectiveImpact() {
  const root = useRef(null);
  const scope = useRef(null);

  useEffect(() => {
    scope.current = createScope({ root: root.current }).add(() => {
      // Left text column
      fadeUpOnScroll('.ci-text', root.current, { staggerMs: 120, translateY: 28 });

      // Money cards: staggered scale-up from bottom
      scaleInOnScroll('.ci-card', root.current, {
        staggerMs: 100,
        delay: 200,
        fromScale: 0.82,
        ease: 'outBack',
      });
    });
    return () => scope.current.revert();
  }, []);

  // Generate mathematically exact triangular tiling for halftone pattern
  const triangleGrid = () => {
    const W = 48; // Increased from 32 to reduce density (larger triangles, fewer of them)
    const H = W * Math.sqrt(3) / 2; // Triangle height (equilateral)
    const cols = Math.ceil(1440 / W) + 1;
    const rows = Math.ceil(800 / H) + 1;
    const paths = [];

    const maxX = cols * W;
    const maxY = rows * H;
    // Control how far the pattern spreads from the top right
    const maxDist = Math.sqrt(maxX * maxX + maxY * maxY) * 0.85;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // DOWN-pointing triangle centroid
        const dCx = c * W;
        const dCy = r * H + H / 3;

        // UP-pointing triangle centroid
        const uCx = (c + 0.5) * W;
        const uCy = r * H + 2 * H / 3;

        const addTriangle = (cx, cy, isUp) => {
          // Calculate distance from top-right corner (maxX, 0)
          const dx = cx;
          const dy = maxY - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let density = 1 - (dist / maxDist);
          density = Math.max(0, Math.min(1, density));

          // Easing for halftone scale.
          const scale = Math.pow(density, 1.4) * 1.05;
          // Easing for opacity: more saturated in the top right, fading out
          const triOpacity = Math.min(1, density * 1.5).toFixed(2);

          if (scale > 0.02) {
            let pts;
            if (isUp) {
              pts = [
                [0, -2 * H / 3 * scale],
                [-W / 2 * scale, H / 3 * scale],
                [W / 2 * scale, H / 3 * scale]
              ];
            } else {
              pts = [
                [-W / 2 * scale, -H / 3 * scale],
                [W / 2 * scale, -H / 3 * scale],
                [0, 2 * H / 3 * scale]
              ];
            }
            paths.push(
              <polygon
                key={`${isUp ? 'u' : 'd'}-${r}-${c}`}
                points={pts.map(p => `${(cx + p[0]).toFixed(2)},${(cy + p[1]).toFixed(2)}`).join(' ')}
                fill="currentColor"
                opacity={triOpacity}
              />
            );
          }
        };

        addTriangle(dCx, dCy, false); // Add DOWN triangle
        addTriangle(uCx, uCy, true);  // Add UP triangle
      }
    }
    return paths;
  };

  return (
    <section ref={root} className="py-32 bg-ink text-white overflow-hidden relative">
      {/* Exact Isometric Triangle Halftone */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none text-background"
        style={{ opacity: 0.01 }}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMaxYMin slice"
        viewBox="0 0 1440 800"
      >
        <g>
          {triangleGrid()}
        </g>
      </svg>
      <div className="max-w-[1200px] mx-auto px-8 relative z-10 flex flex-col lg:flex-row gap-20">

        <div className="lg:w-5/12 flex relative">
          <div className="absolute -left-12 top-0 bottom-0 flex items-center justify-center opacity-30 transform -rotate-180" style={{ writingMode: 'vertical-rl' }}>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white whitespace-nowrap">Financial Autonomy</span>
          </div>
          <div className="pl-4 lg:pl-12 self-center">
            <h2 className="ci-text opacity-0 font-serif text-5xl md:text-6xl leading-tight mb-8 text-surface">
              Small amounts.<br />Collective impact.
            </h2>
            <p className="ci-text opacity-0 text-white/70 text-lg leading-relaxed mb-10">
              A $15 subscription isn't worth an hour to fix. That's why they sit unclaimed year after year. We fix it in seconds.
            </p>
            <p className="ci-text opacity-0 text-surface font-serif text-2xl italic">
              Collectively, they are not small.
            </p>
          </div>
        </div>

        <div className="lg:w-7/12 grid grid-cols-1 md:grid-cols-2 gap-4 mt-12 lg:mt-0">
          <div className="flex flex-col gap-4 md:pt-12">
            <div className="ci-card opacity-0 bg-surface/5 border border-white/5 rounded-xl p-8 hover:bg-surface/10 hover:-translate-y-1 transition-all duration-300">
              <span className="font-serif text-4xl text-ink">$39.00</span>
            </div>
            <div className="ci-card opacity-0 bg-surface/5 border border-white/5 rounded-xl p-8 hover:bg-surface/10 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[160px]">
              <span className="font-serif text-4xl text-ink">$50.00</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 mt-8">Saks Credit</span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="ci-card opacity-0 bg-surface/5 border border-white/5 rounded-xl p-8 hover:bg-surface/10 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[220px]">
              <span className="font-serif text-4xl text-white">$200.00</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/70 mt-8">Baggage Claim</span>
            </div>
            <div className="ci-card opacity-0 bg-surface/5 border border-white/5 rounded-xl p-8 hover:bg-surface/10 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[200px]">
              <span className="font-serif text-4xl text-ink">$15.99</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 mt-8">Unused Streaming</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
