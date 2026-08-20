import React, { useEffect, useRef } from 'react';
import { animate, createScope, onScroll } from 'animejs';
import { timelineOnScroll, shimmerLoop } from '../utils/animations';

export default function CardsAndBillPay() {
  const root = useRef(null);
  const scope = useRef(null);

  useEffect(() => {
    scope.current = createScope({ root: root.current }).add(() => {
      // Single timeline: hourglass -> calendar days → pay list → text column
      timelineOnScroll(root.current, (tl) => {
        tl
          // Hourglass slides and fades in (matching the speed of text/cards)
          .add('.hourglass-img', {
            opacity: [0, 0.3],
            translateX: ['25%', '25%'], // keep horizontal fixed
            translateY: ['-45%', '-50%'], // slide up slightly like text
            rotate: [12, 12], // keep rotation static for sharper entrance
            scale: [0.95, 1],
            duration: 420,
            ease: 'outExpo',
          })
          // Calendar days scale in
          .add('.calendar-day', {
            opacity: [0, 1],
            scale: [0.75, 1],
            duration: 380,
            delay: (_, i) => i * 16,
            ease: 'outBack',
          }, '-=300')
          // Pay list items slide in from right
          .add('.pay-list-item', {
            translateX: [60, 0],
            opacity: [0, 1],
            duration: 360,
            delay: (_, i) => i * 80,
            ease: 'outExpo',
          }, '-=200')
          // Right text column fades up
          .add('.pay-text', {
            translateY: [28, 0],
            opacity: [0, 1],
            duration: 420,
            delay: (_, i) => i * 55,
            ease: 'outExpo',
          }, '-=400');
      });

      // Pulse on highlighted calendar cells (due-date indicators)
      let pulsePlayed = false;
      onScroll({
        target: root.current,
        start: 'top 80%',
        onEnter: () => {
          if (pulsePlayed) return;
          pulsePlayed = true;
          // Delay to sync with calendar day animation
          setTimeout(() => {
            animate('.calendar-dot', {
              scale: [1, 1.3, 1],
              opacity: [0.9, 0.45, 0.9],
              duration: 1600,
              loop: true,
              ease: 'inOutSine',
            });
          }, 1200);
        },
      });

      // Parallax for hourglass
      animate('.hourglass-parallax', {
        translateY: [-75, 75],
        ease: 'linear',
        autoplay: onScroll({
          target: root.current,
          sync: true,
        })
      });
    });
    return () => scope.current.revert();
  }, []);

  return (
    <section ref={root} className="py-32 bg-paper text-ink overflow-hidden relative">
      {/* Background Hourglass */}
      <div className="hourglass-parallax absolute inset-0 z-0 pointer-events-none">
        <img
          src="/hourglassnew.png"
          alt=""
          className="hourglass-img absolute right-0 top-1/2 opacity-0 w-[500px] lg:w-[600px]"
        />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 sm:px-8 relative z-10 grid md:grid-cols-2 gap-16 lg:gap-20 items-center">

        {/* Text Section (Now on the left) */}
        <div>

          <h2 className="pay-text opacity-0 font-serif text-4xl sm:text-5xl leading-tight mb-8 text-ink">
            Every balance, every due date. Then the payment.
          </h2>
          <p className="pay-text opacity-0 text-ink/70 text-lg leading-relaxed mb-10">
            One unified calendar for every balance and due date. We catch cards that transaction feeds alone tend to miss.
          </p>
          <ul className="pay-text opacity-0 space-y-6 mb-10 text-[15px] text-ink/70 leading-relaxed">
            <li className="flex gap-4 items-start">
              <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <div>
                <strong className="text-ink block mb-1">A calendar you can read in three seconds</strong>
                See exactly when payments are due and which cost you interest.
              </div>
            </li>
            <li className="flex gap-4 items-start">
              <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <div>
                <strong className="text-ink block mb-1">Pay from here</strong>
                Settle card bills in the app. No logging into four issuer portals.
              </div>
            </li>
          </ul>
        </div>

        {/* Calendar Section (Now on the right) */}
        <div className="relative">
          <div className="bg-ink p-1 rounded-3xl border border-white/10 max-w-md mx-auto shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]">
            <div className="p-8">
              <h3 className="font-bold text-white mb-6 flex items-center">Payment Calendar <span className="text-xs font-normal opacity-60 ml-2">October 2024</span></h3>
              <div className="grid grid-cols-7 gap-1 text-center mb-6">
                <span className="text-[10px] font-bold text-white/40 uppercase">M</span>
                <span className="text-[10px] font-bold text-white/40 uppercase">T</span>
                <span className="text-[10px] font-bold text-white/40 uppercase">W</span>
                <span className="text-[10px] font-bold text-white/40 uppercase">T</span>
                <span className="text-[10px] font-bold text-white/40 uppercase">F</span>
                <span className="text-[10px] font-bold text-white/40 uppercase">S</span>
                <span className="text-[10px] font-bold text-white/40 uppercase">S</span>

                <span className="calendar-day opacity-0 text-sm py-2 text-white/20">30</span>
                <span className="calendar-day opacity-0 text-sm py-2 text-white/40">1</span>
                <span className="calendar-day opacity-0 text-sm py-2 text-white/40">2</span>
                <span className="calendar-day opacity-0 text-sm py-2 text-white bg-accent/30 border border-accent/50 rounded-xl relative flex flex-col items-center justify-center gap-1 font-medium">
                  <span>3</span><span className="calendar-dot w-1.5 h-1.5 bg-accent rounded-full block"></span>
                </span>
                <span className="calendar-day opacity-0 text-sm py-2 text-white/40">4</span>
                <span className="calendar-day opacity-0 text-sm py-2 text-white/40">5</span>
                <span className="calendar-day opacity-0 text-sm py-2 text-white/40">6</span>

                <span className="calendar-day opacity-0 text-sm py-2 text-white/40">7</span>
                <span className="calendar-day opacity-0 text-sm py-2 text-white/40">8</span>
                <span className="calendar-day opacity-0 text-sm py-2 text-white bg-red-400/10 border border-red-400/30 rounded-xl relative flex flex-col items-center justify-center gap-1 font-medium">
                  <span>9</span><span className="calendar-dot w-1.5 h-1.5 bg-red-400 rounded-full block"></span>
                </span>
                <span className="calendar-day opacity-0 text-sm py-2 text-white/40">10</span>
                <span className="calendar-day opacity-0 text-sm py-2 text-white/40">11</span>
                <span className="calendar-day opacity-0 text-sm py-2 text-white/40">12</span>
                <span className="calendar-day opacity-0 text-sm py-2 text-white/40">13</span>
              </div>

              <div className="space-y-3">
                <div className="pay-list-item opacity-0 bg-surface/10 rounded-2xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-5 rounded" style={{ background: '#2773aaff' }}></div>
                    <div>
                      <p className="text-sm font-bold text-white">Chase Sapphire</p>
                      <p className="text-xs text-white/50">Due Oct 9th</p>
                    </div>
                  </div>
                  <button className="hidden md:block text-[10px] font-bold text-ink border border-transparent bg-paper hover:bg-accent hover:text-white px-4 py-2 rounded-full uppercase tracking-widest transition-colors cursor-pointer shadow-sm">Pay Balance</button>
                  <button className="md:hidden text-[10px] font-bold text-ink border border-transparent bg-paper hover:bg-accent hover:text-white px-4 py-2 rounded-full uppercase tracking-widest transition-colors cursor-pointer shadow-sm">Pay</button>
                </div>
                <div className="pay-list-item opacity-0 bg-surface/5 border border-transparent rounded-2xl p-4 flex items-center justify-between opacity-60">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-5 border border-white/30 rounded"></div>
                    <div>
                      <p className="text-sm font-bold text-white">Amex Platinum</p>
                      <p className="text-xs text-white/40">Paid Oct 3rd</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-white/50 px-3 py-1 uppercase tracking-widest">Settled</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
