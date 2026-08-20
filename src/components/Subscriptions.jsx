import React, { useEffect, useRef } from 'react';
import { createScope } from 'animejs';
import { fadeUpOnScroll, scaleInOnScroll, countUpOnScroll } from '../utils/animations';

export default function Subscriptions() {
  const root = useRef(null);
  const scope = useRef(null);
  const counterRef = useRef(null);

  useEffect(() => {
    scope.current = createScope({ root: root.current }).add(() => {
      // Heading text
      fadeUpOnScroll('.sub-text', root.current, { staggerMs: 120, translateY: 30 });

      // Both panels enter together
      fadeUpOnScroll('.sub-panel', root.current, { delay: 300, staggerMs: 140, translateY: 20 });

      // Counter: $0 → $412.40
      countUpOnScroll(counterRef, 412.40, {
        prefix: '$',
        decimals: 2,
        root: root.current,
        scrollStart: 'top 75%',
      });

      // Progress bars: scale from 0 → 1 on X axis
      scaleInOnScroll('.sub-progress', root.current, {
        staggerMs: 180,
        fromScale: 0,
        delay: 300,
        ease: 'outExpo',
      });

      // Legend dots
      fadeUpOnScroll('.sub-legend-item', root.current, {
        staggerMs: 80,
        delay: 700,
        translateY: 10,
      });
    });
    return () => scope.current.revert();
  }, []);

  return (
    <section ref={root} id="subscriptions" className="py-32 px-8 bg-ink">
      <div className="max-w-[1200px] mx-auto">
        {/* Centered heading — no eyebrow */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="sub-text opacity-0 font-serif text-5xl leading-tight mb-6 text-white">
            The ones you forgot keep adding up.
          </h2>
          <p className="sub-text opacity-0 text-white/70 text-lg leading-relaxed">
            We detect every recurring charge and let you cancel within a few clicks. We even handle the retention flow.
          </p>
        </div>

        {/* Two panels side by side — NOT a text+visual split */}
        <div className="grid md:grid-cols-2 gap-8 max-w-[960px] mx-auto">
          {/* Left panel: subscription example card */}
          <div className="sub-panel opacity-0 bg-white/5 rounded-2xl p-8 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-border block mb-6">Detected</span>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/10 text-white rounded-xl flex items-center justify-center font-bold text-lg">N</div>
                    <div>
                      <p className="font-bold text-white text-[15px]">Netflix Premium</p>
                      <p className="text-xs text-border">$22.99 / mo · unused 3 mo</p>
                    </div>
                  </div>
                  <button className="text-white border border-white/20 text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full hover:bg-accent hover:border-accent hover:scale-[1.02] active:scale-95 transition-all">Cancel</button>
                </div>
                <div className="flex items-center justify-between opacity-50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/5 text-white rounded-xl flex items-center justify-center font-bold text-lg">S</div>
                    <div>
                      <p className="font-bold text-white text-[15px]">Spotify Family</p>
                      <p className="text-xs text-border">$16.99 / mo · active</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/10 text-white rounded-xl flex items-center justify-center font-bold text-lg">A</div>
                    <div>
                      <p className="font-bold text-white text-[15px]">Adobe Cloud</p>
                      <p className="text-xs text-border">$54.99 / mo · unused 1 mo</p>
                    </div>
                  </div>
                  <button className="text-white border border-white/20 text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full hover:bg-accent hover:border-accent hover:scale-[1.02] active:scale-95 transition-all">Cancel</button>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel: monthly burn summary */}
          <div className="sub-panel opacity-0 bg-white/5 rounded-2xl p-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-border block mb-3">Monthly Burn</span>
            <div ref={counterRef} className="font-serif text-6xl leading-none text-white mb-3">$0.00</div>
            <p className="text-sm text-border mb-8">Detected across 5 connected cards</p>

            {/* Progress bar */}
            <div className="h-3 w-full flex rounded-full overflow-hidden mb-8 shadow-inner bg-white/5">
              <div className="sub-progress h-full bg-paper w-[45%] origin-left scale-x-0"></div>
              <div className="sub-progress h-full bg-[#3E5C4A] w-[30%] origin-left scale-x-0"></div>
              <div className="sub-progress h-full bg-border w-[25%] origin-left scale-x-0"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-4">
              <div className="sub-legend-item opacity-0 flex items-center gap-3">
                <div className="w-3 h-3 shrink-0 rounded-full bg-paper shadow-sm"></div>
                <span className="text-[14px] sm:text-[15px] text-white font-medium shrink-0 whitespace-nowrap">Entertainment</span>
              </div>
              <div className="sub-legend-item opacity-0 flex items-center gap-3">
                <div className="w-3 h-3 shrink-0 rounded-full bg-[#3E5C4A] shadow-sm"></div>
                <span className="text-[14px] sm:text-[15px] text-white font-medium shrink-0 whitespace-nowrap">SaaS / Tools</span>
              </div>
              <div className="sub-legend-item opacity-0 flex items-center gap-3">
                <div className="w-3 h-3 shrink-0 rounded-full bg-border shadow-sm"></div>
                <span className="text-[14px] sm:text-[15px] text-white font-medium shrink-0 whitespace-nowrap">Health &amp; Wellness</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
