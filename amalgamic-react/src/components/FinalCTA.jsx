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
    <section ref={root} className="py-40 bg-gradient-to-b from-bg to-black text-center relative overflow-hidden text-brand">
      <div className="max-w-[800px] mx-auto px-8 relative z-10">
        <h2 className="cta-heading opacity-0 font-serif text-6xl leading-tight mb-10 text-brand">Stop managing the small stuff. Start ignoring it properly.</h2>
        <p className="cta-sub opacity-0 text-muted text-xl mb-12 leading-relaxed max-w-2xl mx-auto">
          Connect your cards once. We handle the admin.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
          <button ref={primaryBtnRef} className="cta-primary opacity-0 bg-brand text-bg px-10 py-5 rounded-full text-lg font-bold shadow-2xl hover:scale-[1.05] transition-transform">
            Connect your accounts
          </button>
          <button className="cta-secondary opacity-0 text-brand font-bold border border-white/20 px-8 py-5 rounded-full hover:bg-white/5 transition-all">
            See how it compares
          </button>
        </div>
        <div className="cta-trust opacity-0 flex flex-wrap items-center justify-center gap-6 text-[10px] font-bold uppercase tracking-widest">
          <span>Read-only access</span>
          <span>•</span>
          <span>Revoke any time</span>
          <span>•</span>
          <span>No card required to start</span>
        </div>
      </div>
    </section>
  );
}
