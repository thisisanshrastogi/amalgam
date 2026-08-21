import React, { useEffect, useRef } from 'react';
import { createScope } from 'animejs';
import { timelineOnScroll, shimmerLoop } from '../utils/animations';

export default function FinalCTA() {
  const root = useRef(null);
  const scope = useRef(null);
  const primaryBtnRef = useRef(null);

  useEffect(() => {
    scope.current = createScope({ root: root.current }).add(() => {
      // Sequential entrance: heading → subtext → buttons → trust bar
      timelineOnScroll(root.current, (tl) => {
        tl
          .add('.cta-heading', {
            opacity: [0, 1],
            translateY: [40, 0],
            duration: 480,
            ease: 'outExpo',
          })
          .add('.cta-sub', {
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 360,
            ease: 'outExpo',
          }, '-=400')
          .add('.cta-primary', {
            opacity: [0, 1],
            scale: [0.9, 1],
            duration: 300,
            ease: 'outBack',
          }, '-=300')
          .add('.cta-secondary', {
            opacity: [0, 1],
            translateY: [10, 0],
            duration: 400,
            ease: 'outExpo',
          }, '-=200')
          .add('.cta-trust', {
            opacity: [0, 0.6],
            duration: 300,
          }, '-=100');
      }, { scrollStart: 'top 85%' });

      // Looping shimmer on primary CTA button
      setTimeout(() => {
        shimmerLoop('.cta-primary', { minOpacity: 0.88, duration: 1100 });
      }, 1500);
    });
    return () => scope.current.revert();
  }, []);

  return (
    <section ref={root} className="py-16 sm:py-32 text-center relative text-white">
      <div className="max-w-[800px] mx-auto px-8 relative z-10">
        <h2 className="cta-heading opacity-0 font-serif text-4xl sm:text-[48px] sm:leading-[1.2] leading-tight mb-6 text-white">The best credit card assistant</h2>
        <p className="cta-sub opacity-0 text-white/80 text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
          You don't need more apps to manage. You need one that actually manages things for you.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 mb-10">
          <a href="https://cards.amalgamic.io/auth/signin" ref={primaryBtnRef} className="cta-primary inline-block text-center opacity-0 bg-white text-ink px-8 py-4 rounded-full text-[15px] font-bold shadow-2xl hover:scale-[1.02] transition-transform">
            Get started
          </a>
          <span className="cta-primary opacity-0 text-[10px] font-bold uppercase tracking-widest text-white/60">$0 cost -- limited period offer</span>
        </div>
        <div className="cta-trust opacity-0 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-white/60">
          <span>Read-only by default</span>
          <span className="opacity-50">•</span>
          <span>Built on Plaid and Spinwheel</span>
          <span className="opacity-50">•</span>
          <span>Zero data selling</span>
        </div>
      </div>
    </section>
  );
}
