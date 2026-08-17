import React, { useEffect, useRef } from 'react';
import { createScope } from 'animejs';
import { fadeUpOnScroll, scaleInOnScroll, countUpOnScroll } from '../utils/animations';

export default function Subscriptions() {
  const root = useRef(null);
  const scope = useRef(null);
  const counterRef = useRef(null);

  useEffect(() => {
    scope.current = createScope({ root: root.current }).add(() => {
      // Left-side text + subscription card
      fadeUpOnScroll('.sub-text', root.current, { staggerMs: 120, translateY: 30 });
      fadeUpOnScroll('.sub-card', root.current, { delay: 400, translateY: 20 });

      // Counter: $0 → $412.40
      countUpOnScroll(counterRef, 412.40, {
        prefix: '$',
        decimals: 2,
        root: root.current,
        scrollStart: 'top 75%',
      });

      // Progress bars: scale from 0 → 1 on X axis (uses from tween, not inline style)
      scaleInOnScroll('.sub-progress', root.current, {
        staggerMs: 180,
        fromScale: 0,
        delay: 300,
        ease: 'outExpo',
      });

      // Legend dots: small stagger fade-up
      fadeUpOnScroll('.sub-legend-item', root.current, {
        staggerMs: 80,
        delay: 700,
        translateY: 10,
      });
    });
    return () => scope.current.revert();
  }, []);

  return (
    <section ref={root} className="py-32 px-8 bg-bg">
      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <div>
          <span className="sub-text opacity-0 text-accent text-xs font-bold uppercase tracking-widest mb-6 block">Subscriptions</span>
          <h2 className="sub-text opacity-0 font-serif text-5xl leading-tight mb-8 text-brand">
            The ones you forgot keep adding up.
          </h2>
          <p className="sub-text opacity-0 text-muted text-lg leading-relaxed mb-10">
            We detect every recurring charge and let you cancel within a few clicks. We even handle the retention flow.
          </p>
          <div className="sub-card opacity-0 bg-surface border border-border rounded-xl p-4 flex items-center justify-between shadow-sm mb-6 hover:shadow-md transition-shadow cursor-pointer max-w-sm">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-brand text-bg rounded-lg flex items-center justify-center font-bold text-lg">N</div>
              <div>
                <p className="font-bold text-brand text-[15px]">Netflix Premium</p>
                <p className="text-sm text-muted">$22.99 / mo</p>
              </div>
            </div>
            <button className="text-red-600 border border-red-200 text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-lg hover:bg-red-50 hover:scale-[1.02] active:scale-95 transition-all">Cancel</button>
          </div>
        </div>
        <div className="relative w-full">
          <div className="bg-surface p-8 rounded-[32px] border border-border shadow-2xl w-full max-w-md mx-auto hover:-translate-y-2 transition-transform duration-500 cursor-pointer">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted block mb-3">Monthly Burn</span>
            <div ref={counterRef} className="font-serif text-6xl leading-none text-brand mb-3">$0.00</div>
            <p className="text-sm text-muted mb-8">Detected across 5 connected cards</p>
            
            {/* Progress bar — scaleX animated from 0→1, origin set via CSS class */}
            <div className="h-3 w-full flex rounded-full overflow-hidden mb-8 shadow-inner">
              <div className="sub-progress h-full bg-accent w-[45%] origin-left scale-x-0"></div>
              <div className="sub-progress h-full bg-highlight w-[30%] origin-left scale-x-0"></div>
              <div className="sub-progress h-full bg-brand w-[25%] origin-left scale-x-0"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-4">
              <div className="sub-legend-item opacity-0 flex items-center gap-3">
                <div className="w-3 h-3 shrink-0 rounded-full bg-accent shadow-sm"></div>
                <span className="text-[14px] sm:text-[15px] text-brand font-medium shrink-0 whitespace-nowrap">Entertainment</span>
              </div>
              <div className="sub-legend-item opacity-0 flex items-center gap-3">
                <div className="w-3 h-3 shrink-0 rounded-full bg-highlight shadow-sm"></div>
                <span className="text-[14px] sm:text-[15px] text-brand font-medium shrink-0 whitespace-nowrap">SaaS / Tools</span>
              </div>
              <div className="sub-legend-item opacity-0 flex items-center gap-3">
                <div className="w-3 h-3 shrink-0 rounded-full bg-brand shadow-sm"></div>
                <span className="text-[14px] sm:text-[15px] text-brand font-medium shrink-0 whitespace-nowrap">Health &amp; Wellness</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
