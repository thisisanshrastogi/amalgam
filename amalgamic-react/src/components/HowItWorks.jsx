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
    <section ref={root} id="how-it-works" className="py-32 px-8 bg-surface">
      <div className="max-w-[1200px] mx-auto">
        <div className="how-heading opacity-0 text-center mb-24">
          <span className="text-accent text-xs font-bold uppercase tracking-widest mb-6 block">How it works</span>
          <h2 className="font-serif text-5xl leading-tight text-brand">
            Connect once. Decide when it matters.<br/>That's the whole job.
          </h2>
        </div>
        <div className="grid md:grid-cols-4 gap-12">
          <div className="how-step opacity-0 relative">
            <div className="how-step-num text-5xl font-serif text-accent/10 mb-6">01</div>
            <h3 className="font-serif text-2xl text-brand mb-4">Connect cards</h3>
            <p className="text-muted leading-relaxed text-[15px]">
              Link credit cards securely. We find accounts you may have forgotten, checking balances and limits.
            </p>
          </div>
          <div className="how-step opacity-0 relative">
            <div className="how-step-num text-5xl font-serif text-accent/10 mb-6">02</div>
            <h3 className="font-serif text-2xl text-brand mb-4">Read statements</h3>
            <p className="text-muted leading-relaxed text-[15px]">
              We continuously read statements, surfacing only what matters instead of useless dashboards.
            </p>
          </div>
          <div className="how-step opacity-0 relative">
            <div className="how-step-num text-5xl font-serif text-accent/10 mb-6">03</div>
            <h3 className="font-serif text-2xl text-brand mb-4">Ask anything</h3>
            <p className="text-muted leading-relaxed text-[15px]">
              Chat directly with your accounts. Ask why a bill is higher and get exact answers.
            </p>
          </div>
          <div className="how-step opacity-0 relative">
            <div className="how-step-num text-5xl font-serif text-accent/10 mb-6">04</div>
            <h3 className="font-serif text-2xl text-brand mb-4">Hand it over</h3>
            <p className="text-muted leading-relaxed text-[15px]">
              Cancel, dispute, or claim with a tap. We handle the tedious parts while you get paid.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
