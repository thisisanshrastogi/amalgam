import React, { useEffect, useRef } from 'react';
import { createTimeline, createScope, onScroll } from 'animejs';
import { X, Check } from 'lucide-react';
import { floatLoop } from '../utils/animations';

export default function Hero() {
  const root = useRef(null);
  const scope = useRef(null);

  useEffect(() => {
    scope.current = createScope({ root: root.current }).add(() => {
      // Orchestrated entrance timeline — badge → h1 → p → buttons → lock note
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
        }, '-=300')
        .add('.hero-lock', {
          opacity: [0, 1],
          duration: 400,
        }, '-=200')
        .add('.floating-card-1', {
          opacity: [0, 1],
          scale: [0.88, 1],
          duration: 420,
          ease: 'outBack',
        }, '-=500')
        .add('.floating-card-2', {
          opacity: [0, 1],
          scale: [0.88, 1],
          duration: 420,
          ease: 'outBack',
        }, '-=400');

      // Infinite floating loops (alternate:true replaces deprecated direction:'alternate')
      floatLoop('.floating-card-1', { distance: 14, duration: 2600, delay: 0 });
      floatLoop('.floating-card-2', { distance: 12, duration: 3100, delay: 500 });

      // Subtle scroll parallax on phone mockup
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
    <section ref={root} className="pt-40 pb-24 px-8 min-h-screen flex items-center bg-bg overflow-x-hidden">
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-10 md:gap-20 items-center">

        {/* Left Column */}
        <div className="order-2 md:order-1 pt-12 md:pt-0">
          <span className="hero-badge opacity-0 bg-accent/5 text-accent text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-8 inline-block">
            For Premium Cardholders
          </span>
          <h1 className="hero-h1 opacity-0 font-serif text-5xl md:text-[80px] leading-[1.05] tracking-tight mb-8 text-brand">
            The money you<br />never got around to<br />claiming.
          </h1>
          <p className="hero-p opacity-0 text-muted text-lg leading-relaxed mb-10 max-w-md">
            Stop losing money to forgotten subscriptions and expired credits. Amalgamic automatically finds and reclaims your money.
          </p>
          <div className="hero-btns opacity-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
            <button className="bg-accent text-bg px-8 py-4 rounded-xl text-sm font-bold shadow-xl hover:scale-105 transition-transform w-full sm:w-auto">
              Connect your accounts
            </button>
            <button className="bg-white text-brand px-8 py-4 rounded-xl text-sm font-bold shadow-sm border border-border hover:bg-surface/50 transition-colors w-full sm:w-auto">
              See how it works
            </button>
          </div>
          {/* <div className="hero-lock opacity-0 flex items-center gap-2 text-[11px] text-muted font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-highlight"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            Read-only access. Takes two minutes.
          </div> */}
        </div>

        {/* Right Column: Phone Mockup */}
        <div className="order-1 md:order-2 relative h-[180px] md:h-[600px] flex flex-col items-center justify-center w-full max-w-[400px] mx-auto mt-8 md:mt-0 gap-4 md:gap-0">

          {/* Phone Body */}
          <div className="hidden md:flex relative w-[280px] md:w-[300px] h-[550px] md:h-[600px] bg-[#1a1a1a] rounded-[48px] shadow-2xl border-[8px] border-[#2a2a2a] overflow-hidden flex-col p-6 z-10">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 md:w-32 h-6 bg-[#2a2a2a] rounded-b-3xl"></div>

            {/* UI Mockup inside phone */}
            <div className="mt-12 flex-1 space-y-4 opacity-50">
              <div className="h-16 bg-white/5 rounded-2xl w-full"></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-24 bg-white/5 rounded-2xl"></div>
                <div className="h-24 bg-white/5 rounded-2xl"></div>
              </div>
              <div className="h-32 bg-[#2a3630] rounded-2xl border border-highlight/20 p-4 relative overflow-hidden">
                <div className="w-8 h-8 rounded-full bg-highlight text-accent flex items-center justify-center font-bold text-sm mb-2">$</div>
                <div className="absolute bottom-4 left-4 w-20 h-2 bg-white/10 rounded-full"></div>
                <div className="absolute bottom-4 right-4 w-12 h-2 bg-white/10 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Floating Card 1: Late Fee Waived */}
          <div className="floating-card-1 opacity-0 static md:absolute md:top-[20%] md:-left-12 bg-white rounded-2xl p-4 shadow-2xl md:z-20 w-[240px] flex items-center gap-4 cursor-pointer hover:scale-105 transition-transform duration-300 border border-border">
            <div className="w-8 h-8 rounded-full bg-[#EBF4F1] text-highlight flex items-center justify-center flex-shrink-0">
              <Check size={14} strokeWidth={3} />
            </div>
            <div>
              <h4 className="font-bold text-[13px] text-brand">Late Fee Waived</h4>
              <p className="text-[10px] text-muted">Recovery: $40.00 posted</p>
            </div>
          </div>

          {/* Floating Card 2: Subscription Cancelled */}
          <div className="floating-card-2 opacity-0 static md:absolute md:bottom-[20%] md:-right-12 bg-white rounded-2xl p-4 shadow-2xl md:z-30 w-[240px] flex items-center gap-4 cursor-pointer hover:scale-105 transition-transform duration-300 border border-border">
            <div className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center flex-shrink-0">
              <X size={14} strokeWidth={3} />
            </div>
            <div>
              <h4 className="font-bold text-[13px] text-brand">Subscription Cancelled</h4>
              <p className="text-[10px] text-muted">Recurring savings: $15.99/mo</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
