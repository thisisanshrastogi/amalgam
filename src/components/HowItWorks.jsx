import React, { useEffect, useRef } from 'react';
import { animate, createScope, stagger, onScroll } from 'animejs';
import { timelineOnScroll } from '../utils/animations';

export default function HowItWorks() {
  const root = useRef(null);
  const scope = useRef(null);

  useEffect(() => {
    scope.current = createScope({ root: root.current }).add(() => {
      // Timeline: section heading → steps stagger (left-to-right)
      timelineOnScroll(root.current, (tl) => {
        tl.add('.how-heading', {
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 360,
        })
          .add('.how-step', {
            translateY: [36, 0],
            opacity: [0, 1],
            duration: 420,
            delay: stagger(75, { from: 'first' }),
          }, '-=200');
      });

      // Step-number count-up: animate each number separately
      const steps = root.current?.querySelectorAll('.how-step-num');
      const targets = ['01', '02', '03', '04'];
      let played = false;

      onScroll({
        target: root.current,
        start: 'top 80%',
        onEnter: () => {
          if (played) return;
          played = true;
          steps?.forEach((el, i) => {
            const obj = { val: 0 };
            animate(obj, {
              val: i + 1,
              duration: 360 + i * 150,
              ease: 'outExpo',
              delay: i * 140,
              onUpdate: () => {
                el.textContent = String(Math.round(obj.val)).padStart(2, '0');
              },
            });
          });
        },
      });
    });
    return () => scope.current.revert();
  }, []);

  return (
    <section ref={root} id="how-it-works" className="pt-16 pb-16 md:pt-20 md:pb-32 px-6 sm:px-8 bg-paper">
      <div className="max-w-[1200px] mx-auto">
        <div className="how-heading opacity-0 text-center mb-16 lg:mb-24">
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-ink/50 mb-5 block">How it works</span>
          <h2 className="font-serif text-[2rem] leading-[1.2] tracking-[-0.015em] text-ink sm:text-[48px] lg:text-[3.4rem]">
            Setup once, we'll handle the rest.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          <div className="how-step opacity-0 relative">
            <div className="how-step-num text-[64px] leading-none sm:text-[80px] lg:text-[96px] font-serif text-ink/10 mb-6">01</div>
            <h3 className="font-serif text-2xl text-ink mb-4">Connect your cards</h3>
            <p className="text-muted leading-relaxed text-[15px]">
              Secure, read-only access through our integration partners. Works with 12,000+ US institutions.
            </p>
          </div>
          <div className="how-step opacity-0 relative">
            <div className="how-step-num text-[64px] leading-none sm:text-[80px] lg:text-[96px] font-serif text-ink/10 mb-6">02</div>
            <h3 className="font-serif text-2xl text-ink mb-4">We monitor everything</h3>
            <p className="text-muted leading-relaxed text-[15px]">
              We're checking for recurring charges, fees, credits. Anything that shouldn't be there.
            </p>
          </div>
          <div className="how-step opacity-0 relative">
            <div className="how-step-num text-[64px] leading-none sm:text-[80px] lg:text-[96px] font-serif text-ink/10 mb-6">03</div>
            <h3 className="font-serif text-2xl text-ink mb-4">You act when it matters</h3>
            <p className="text-muted leading-relaxed text-[15px]">
              We surface only what's worth your time – with one-tap options to cancel, dispute, or pay.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
