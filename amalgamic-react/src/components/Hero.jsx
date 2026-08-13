import React, { useEffect, useRef } from 'react';
import { createTimeline, createScope, onScroll } from 'animejs';
import { ArtBackground } from './ArtBackground';

export default function Hero() {
  const root = useRef(null);
  const scope = useRef(null);

  useEffect(() => {
    scope.current = createScope({ root: root.current }).add(() => {
      // Orchestrated entrance timeline — badge → h1 → p → buttons
      const tl = createTimeline({
        defaults: { ease: 'outExpo' },
      });

      tl.add('.hero-badge', {
        opacity: [0, 1],
        translateY: [16, 0],
        duration: 360,
      })
        .add('.hero-h1', {
          opacity: [0, 1],
          translateY: [40, 0],
          duration: 480,
        }, '-=300')
        .add('.hero-p', {
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 360,
        }, '-=400')
        .add('.hero-btns', {
          opacity: [0, 1],
          translateY: [16, 0],
          duration: 300,
        }, '-=300');

      // Subtle scroll parallax
      onScroll({
        target: root.current,
        sync: (self) => {
          const progress = self.progress ?? 0;
        },
      });
    });
    return () => scope.current.revert();
  }, []);

  return (
    <section ref={root} className="relative pt-40 pb-24 px-8 min-h-screen flex items-center overflow-x-hidden text-[#F2EEE3]">
      <ArtBackground />
      
      <div className="max-w-[1200px] mx-auto w-full relative z-10">
        {/* Left Column Content */}
        <div className="max-w-xl pt-12 md:pt-0">
          <span className="hero-badge opacity-0 bg-accent/20 text-accent text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-8 inline-block">
            For Cardholders
          </span>
          <h1 className="hero-h1 opacity-0 font-serif text-5xl md:text-[80px] leading-[1.05] tracking-tight mb-8">
            The money you<br />never got around to<br />claiming.
          </h1>
          <p className="hero-p opacity-0 text-lg leading-relaxed mb-10 opacity-80">
            Stop losing money to forgotten subscriptions and expired credits. Amalgamic automatically finds and reclaims your money.
          </p>
          <div className="hero-btns opacity-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
            <button className="bg-brand text-bg px-8 py-4 rounded-xl text-sm font-bold shadow-xl hover:scale-105 transition-transform w-full sm:w-auto">
              Connect your accounts
            </button>
            <button className="bg-transparent text-white px-8 py-4 rounded-xl text-sm font-bold shadow-sm border border-white/20 hover:bg-white/10 transition-colors w-full sm:w-auto">
              See how it works
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

