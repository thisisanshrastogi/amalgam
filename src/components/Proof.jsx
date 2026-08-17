import React, { useEffect, useRef } from 'react';
import { createScope, animate, onScroll } from 'animejs';
import { fadeUpOnScroll } from '../utils/animations';

export default function Proof() {
  const root = useRef(null);
  const scope = useRef(null);
  const stat1Ref = useRef(null);
  const stat2Ref = useRef(null);
  const stat3Ref = useRef(null);

  useEffect(() => {
    scope.current = createScope({ root: root.current }).add(() => {
      // Section heading entrance
      fadeUpOnScroll('.proof-heading', root.current, { translateY: 24, staggerMs: 120 });

      // Table rows stagger in (translateX from left)
      const tableAnim = animate('.proof-row', {
        translateX: [-24, 0],
        opacity: [0, 1],
        duration: 360,
        delay: (_, i) => 200 + i * 100,
        ease: 'outExpo',
        autoplay: false,
      });

      onScroll({
        target: root.current,
        start: 'top 75%',
        onEnter: () => tableAnim.play(),
      });


    });
    return () => scope.current.revert();
  }, []);

  return (
    <section ref={root} className="py-32 bg-white px-8">
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center mb-16">
          <span className="proof-heading opacity-0 text-accent text-xs font-bold uppercase tracking-widest mb-6 block">What we've found so far</span>
          <h2 className="proof-heading opacity-0 font-serif text-5xl leading-tight text-brand mb-6">
            We'd rather show you the work than the reviews.
          </h2>
          <p className="proof-heading opacity-0 text-muted text-lg">Real recoveries updated weekly.</p>
        </div>
        
        <div className="border border-border rounded-[32px] overflow-hidden premium-shadow mb-16 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-accent/5">
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-muted border-b border-border">What it was</th>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-muted border-b border-border">Amount</th>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-muted border-b border-border">Time to resolve</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr className="proof-row opacity-0 hover:bg-accent/5 transition-colors">
                  <td className="px-8 py-6 text-[15px] text-brand">Subscription active 14 months after cancellation</td>
                  <td className="px-8 py-6 font-serif text-xl font-bold text-accent">$312.00</td>
                  <td className="px-8 py-6 text-[15px] text-muted">3 days</td>
                </tr>
                <tr className="proof-row opacity-0 hover:bg-accent/5 transition-colors">
                  <td className="px-8 py-6 text-[15px] text-brand">Late fee, first in 24 months</td>
                  <td className="px-8 py-6 font-serif text-xl font-bold text-accent">$45.00</td>
                  <td className="px-8 py-6 text-[15px] text-muted">Same day</td>
                </tr>
                <tr className="proof-row opacity-0 hover:bg-accent/5 transition-colors">
                  <td className="px-8 py-6 text-[15px] text-brand">Airline fee disputed after delay</td>
                  <td className="px-8 py-6 font-serif text-xl font-bold text-accent">$200.00</td>
                  <td className="px-8 py-6 text-[15px] text-muted">11 days</td>
                </tr>
                <tr className="proof-row opacity-0 hover:bg-accent/5 transition-colors">
                  <td className="px-8 py-6 text-[15px] text-brand">Statement credit claimed before expiry</td>
                  <td className="px-8 py-6 font-serif text-xl font-bold text-accent">$50.00</td>
                  <td className="px-8 py-6 text-[15px] text-muted">Same day</td>
                </tr>
                <tr className="proof-row opacity-0 hover:bg-accent/5 transition-colors">
                  <td className="px-8 py-6 text-[15px] text-brand">Duplicate charge, same merchant, same day</td>
                  <td className="px-8 py-6 font-serif text-xl font-bold text-accent">$89.00</td>
                  <td className="px-8 py-6 text-[15px] text-muted">6 days</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>


      </div>
    </section>
  );
}
