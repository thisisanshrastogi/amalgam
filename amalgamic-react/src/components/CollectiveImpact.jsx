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

  return (
    <section ref={root} className="py-32 bg-brand text-bg overflow-hidden relative">
      <div className="max-w-[1200px] mx-auto px-8 relative z-10 flex flex-col lg:flex-row gap-20">
        
        <div className="lg:w-5/12 flex relative">
          <div className="absolute -left-12 top-0 bottom-0 flex items-center justify-center opacity-30 transform -rotate-180" style={{ writingMode: 'vertical-rl' }}>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white whitespace-nowrap">Financial Autonomy</span>
          </div>
          <div className="pl-4 lg:pl-12 self-center">
            <h2 className="ci-text opacity-0 font-serif text-5xl md:text-6xl leading-tight mb-8 text-surface">
              Small amounts.<br/>Collective impact.
            </h2>
            <p className="ci-text opacity-0 text-bg/70 text-lg leading-relaxed mb-10">
              A $15 subscription isn't worth an hour to fix. That's why they sit unclaimed year after year. We fix it in seconds.
            </p>
            <p className="ci-text opacity-0 text-surface font-serif text-2xl italic">
              Collectively, they are not small.
            </p>
          </div>
        </div>

        <div className="lg:w-7/12 grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-4 pt-12">
            <div className="ci-card opacity-0 bg-surface/5 border border-white/5 rounded-xl p-8 hover:bg-surface/10 hover:-translate-y-1 transition-all duration-300">
              <span className="font-serif text-4xl text-highlight">$39.00</span>
            </div>
            <div className="ci-card opacity-0 bg-surface/5 border border-white/5 rounded-xl p-8 hover:bg-surface/10 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[160px]">
              <span className="font-serif text-4xl text-highlight">$50.00</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 mt-8">Saks Credit</span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="ci-card opacity-0 bg-accent rounded-xl p-8 hover:bg-[#34604d] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[220px]">
              <span className="font-serif text-4xl text-white">$200.00</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/70 mt-8">Baggage Claim</span>
            </div>
            <div className="ci-card opacity-0 bg-surface/5 border border-white/5 rounded-xl p-8 hover:bg-surface/10 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[200px]">
              <span className="font-serif text-4xl text-highlight">$15.99</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 mt-8">Unused Streaming</span>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
