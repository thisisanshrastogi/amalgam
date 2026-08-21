import React, { useEffect, useRef } from 'react';
import { animate, createScope } from 'animejs';
import { fadeUpOnScroll, timelineOnScroll } from '../utils/animations';
import DitherTexture from './DitherTexture';

/**
 * Delegated tasks — same ink panel and chat anatomy as Insights.
 *
 * Panel, avatar mark, mirrored bubble corners, data rows inside the bubble, and
 * a three-step status strip where the input bar would be, since this thread is a
 * request the team picks up rather than a live conversation.
 *
 * Copy note: the old version claimed the dispute was filed with Amex and a
 * provisional credit applied. Per the product brief a dispute is a request with
 * a 48-business-hour acknowledgement, so the answer says that instead.
 *
 * GREEN is a readable mint; `accent` (dark pine) disappears on ink.
 */

const GREEN = '#64B387';

const STEPS = ['Requested', 'Drafted', 'With the team'];
const CURRENT = 1;

const REVEAL = '.dt-text, .dt-panel, .dt-head, .dt-user, .dt-ai, .dt-step';

export default function DelegatedTasks() {
  const root = useRef(null);
  const scope = useRef(null);

  useEffect(() => {
    scope.current = createScope({ root: root.current }).add(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) {
        animate(REVEAL, { opacity: 1, duration: 0 });
        animate('.dt-dots', { opacity: 0, duration: 0 });
        return;
      }

      fadeUpOnScroll('.dt-text', root.current, { staggerMs: 100, translateY: 24 });

      timelineOnScroll(root.current, (tl) => {
        tl
          .add('.dt-panel', { opacity: [0, 1], translateY: [24, 0], duration: 480, ease: 'outQuad' }, 0)
          .add('.dt-head', { opacity: [0, 1], duration: 320, ease: 'outQuad' }, '-=260')
          .add('.dt-user', { opacity: [0, 1], translateY: [10, 0], duration: 320, ease: 'outQuad' }, '-=140')
          .add('.dt-dots', { opacity: [0, 1], duration: 220, ease: 'outQuad' }, '+=180')
          .add('.dt-dots', { opacity: [1, 0], duration: 200, ease: 'outQuad' }, '+=900')
          .add('.dt-ai', { opacity: [0, 1], translateY: [10, 0], duration: 360, ease: 'outQuad' }, '-=120')
          .add('.dt-step', {
            opacity: [0, 1],
            duration: 300,
            delay: (_, i) => i * 90,
            ease: 'outQuad',
          }, '-=120');
      });
    });
    return () => scope.current.revert();
  }, []);

  return (
    <section ref={root} id="tasks" className="relative overflow-hidden bg-paper text-ink py-16 sm:py-32 lg:py-36">
      <DitherTexture opacity={0.03} />

      <div className="relative z-10 mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-14 px-6 sm:px-8 lg:grid-cols-2 lg:gap-24">

        {/* Thread */}
        <div className="dt-panel opacity-0 order-2 w-full rounded-2xl bg-ink p-4 text-white sm:p-6 lg:order-1">

          <div className="dt-head opacity-0 flex items-center justify-between gap-4 border-b border-white/10 px-1 pb-4">
            <div className="flex items-center gap-3">
              <span className="grid h-[22px] w-[22px] place-items-center rounded-[6px] bg-paper">
                <span className="block h-2 w-2 rounded-[2px] bg-ink" />
              </span>
              <span className="text-[13.5px] font-medium">Tasks</span>
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">Amex Platinum</span>
          </div>

          <div className="space-y-4 px-1 py-5">

            <div className="dt-user opacity-0 flex">
              <p className="ml-auto max-w-[82%] rounded-[16px] rounded-br-[5px] bg-white/[0.09] px-4 py-2.5 text-[14px] leading-[1.55] text-white/85">
                Dispute the $200 baggage fee on my Amex. The flight was delayed six hours.
              </p>
            </div>

            <div className="relative min-h-[150px] sm:min-h-[140px]">
              <div className="dt-dots absolute left-0 top-0 flex items-start gap-2.5 opacity-0">
                <span className="mt-1 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-[5px] bg-white/10">
                  <span className="block h-[6px] w-[6px] rounded-[1px] bg-white/70" />
                </span>
                <span className="flex items-center gap-2.5 rounded-[16px] rounded-bl-[5px] bg-white/[0.05] px-3.5 py-3">
                  <span className="flex gap-1" aria-hidden="true">
                    {[0, 150, 300].map((d) => (
                      <span
                        key={d}
                        className="block h-[3px] w-[3px] animate-pulse bg-white/45"
                        style={{ animationDelay: `${d}ms` }}
                      />
                    ))}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.12em] text-white/35">Drafting the claim</span>
                </span>
              </div>

              <div className="dt-ai opacity-0 flex items-start gap-2.5">
                <span className="mt-1 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-[5px] bg-white/10">
                  <span className="block h-[6px] w-[6px] rounded-[1px] bg-white/70" />
                </span>
                <div className="min-w-0 max-w-[88%] rounded-[16px] rounded-bl-[5px] bg-white/[0.05] px-4 py-3">
                  <div className="mb-3 border-t border-white/10">
                    <div className="flex items-center justify-between gap-4 border-b border-white/10 py-2 text-[12.5px] text-white/55">
                      <span className="truncate">Charge</span>
                      <span className="shrink-0 font-medium tabular-nums text-white">$200.00</span>
                    </div>
                    <div className="flex items-center justify-between gap-4 py-2 text-[12.5px] text-white/55">
                      <span className="truncate">Reference</span>
                      <span className="shrink-0 font-medium tabular-nums text-white">AMX-992</span>
                    </div>
                  </div>
                  <p className="text-[14px] leading-[1.6] text-[#F5F2EA]/90">
                    Drafted under the DOT delay rules and passed to our team. You'll hear back within 48 business hours.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Status strip, in place of an input bar */}
          <div className="flex items-center justify-between gap-3 border-t border-white/10 px-1 pt-4">
            {STEPS.map((step, i) => (
              <span key={step} className="dt-step opacity-0 flex min-w-0 items-center gap-2">
                <span
                  className="h-[6px] w-[6px] shrink-0 rounded-[1px]"
                  style={{
                    background:
                      i < CURRENT ? 'rgba(255,255,255,0.3)' : i === CURRENT ? GREEN : 'rgba(255,255,255,0.12)',
                  }}
                />
                <span
                  className="truncate text-[11px] uppercase tracking-[0.12em]"
                  style={{ color: i === CURRENT ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.3)' }}
                >
                  {step}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Copy */}
        <div className="order-1 min-w-0 lg:order-2">
          <h2 className="dt-text opacity-0 font-serif text-[2rem] leading-[1.2] tracking-[-0.015em] sm:text-[48px] lg:text-[3.4rem] lg:leading-[1.2]">
            Say what you want to happen. We do the rest.
          </h2>
          <p className="dt-text opacity-0 mt-6 max-w-[38ch] text-[18px] leading-[1.7] text-ink/55">
            Tell us what needs fixing. We handle the paperwork and come back to you.
          </p>

          <div className="mt-12 border-t border-ink/15 sm:mt-14">
            <div className="dt-text opacity-0 grid grid-cols-1 gap-1.5 border-b border-ink/15 py-5 sm:grid-cols-[112px_1fr] sm:gap-8 sm:py-6">
              <span className="text-[10px] uppercase tracking-[0.2em] text-ink/40 sm:pt-[4px]">Disputes</span>
              <p className="text-[15px] leading-[1.7] text-ink/70">Chargebacks and refunds you can hand over.</p>
            </div>
            <div className="dt-text opacity-0 grid grid-cols-1 gap-1.5 border-b border-ink/15 py-5 sm:grid-cols-[112px_1fr] sm:gap-8 sm:py-6">
              <span className="text-[10px] uppercase tracking-[0.2em] text-ink/40 sm:pt-[4px]">Follow-up</span>
              <p className="text-[15px] leading-[1.7] text-ink/70">Acknowledged within 48 business hours.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}