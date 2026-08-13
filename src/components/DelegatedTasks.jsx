import React, { useEffect, useRef } from 'react';
import { createScope } from 'animejs';
import { timelineOnScroll, fadeUpOnScroll } from '../utils/animations';

export default function DelegatedTasks() {
  const root = useRef(null);
  const scope = useRef(null);

  useEffect(() => {
    scope.current = createScope({ root: root.current }).add(() => {
      // Right text column enters first
      fadeUpOnScroll('.dt-text', root.current, { staggerMs: 100, translateY: 28 });

      // Left chat panel: timeline with typing-dots before AI reply
      timelineOnScroll(root.current, (tl) => {
        tl
          // User bubble slides in from right
          .add('.chat-bubble-user-container', {
            translateX: [60, 0],
            opacity: [0, 1],
            duration: 420,
            ease: 'outExpo',
          }, '+=200')
          // Typing dots appear
          .add('.typing-dots', {
            opacity: [0, 1],
            scale: [0.8, 1],
            duration: 300,
            ease: 'outBack',
          }, '+=300')
          // Each dot pulses in stagger
          .add('.typing-dot', {
            translateY: [0, -6, 0],
            duration: 300,
            delay: (_, i) => i * 75,
            loop: 2,
            ease: 'inOutSine',
          }, '-=100')
          // Typing dots hide, AI bubble reveals
          .add('.typing-dots', {
            opacity: [1, 0],
            duration: 200,
          }, '+=100')
          .add('.chat-bubble-ai-container', {
            translateX: [-60, 0],
            opacity: [0, 1],
            duration: 420,
            ease: 'outExpo',
          }, '-=100');
      });
    });
    return () => scope.current.revert();
  }, []);

  return (
    <section ref={root} className="py-32 bg-accent/5 border-y border-border px-8">
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-20 items-center">
        <div className="order-2 md:order-1 relative">
          <div className="max-w-md mx-auto space-y-8">
            {/* User bubble */}
            <div className="chat-bubble-user-container opacity-0 flex flex-col gap-2">
              <span className="text-[11px] font-bold text-muted uppercase tracking-widest self-end mr-4">You • 9:41 AM</span>
              <div className="bg-brand text-bg chat-bubble-user p-5 self-end max-w-[85%] shadow-md">
                <p className="text-[15px] leading-relaxed">Dispute the $200 baggage fee on my Amex. The flight was delayed six hours.</p>
              </div>
            </div>

            {/* Typing indicator (shown between user and AI bubble) */}
            <div className="typing-dots opacity-0 flex items-center gap-1 px-5 py-3 bg-surface border border-accent/20 rounded-2xl self-start w-fit shadow-sm">
              <span className="typing-dot w-2 h-2 rounded-full bg-accent/60 inline-block"></span>
              <span className="typing-dot w-2 h-2 rounded-full bg-accent/60 inline-block"></span>
              <span className="typing-dot w-2 h-2 rounded-full bg-accent/60 inline-block"></span>
            </div>

            {/* AI bubble */}
            <div className="chat-bubble-ai-container opacity-0 flex flex-col gap-2">
              <span className="text-[11px] font-bold text-muted uppercase tracking-widest ml-4">Amalgamic • 9:50 AM</span>
              <div className="bg-surface border border-accent/20 chat-bubble-ai p-5 self-start max-w-[90%] shadow-xl">
                <p className="text-[15px] leading-relaxed text-brand">
                  <strong className="block mb-2">Dispute filed with Amex.</strong>
                  Reference #AMX-992. Supporting claim drafted under DOT delay rules and submitted to the airline. Provisional credit of $200 applied to your account.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <span className="dt-text opacity-0 text-accent text-xs font-bold uppercase tracking-widest mb-6 block">Delegated tasks</span>
          <h2 className="dt-text opacity-0 font-serif text-5xl leading-tight mb-8 text-brand">
            Say what you want to happen. We do the rest.
          </h2>
          <p className="dt-text opacity-0 text-muted text-lg leading-relaxed mb-10">
            Just tell us what needs fixing. We'll handle the phone calls and paperwork, and notify you when it's done.
          </p>
        </div>
      </div>
    </section>
  );
}
