import React, { useEffect, useRef } from 'react';
import { createScope, animate, onScroll } from 'animejs';
import { fadeUpOnScroll } from '../utils/animations';

/* ---------------------------------------------------------------------------
   FeaturesBlack

   The heading treatment from the diagonal version -- eyebrow, headline and
   intro stacked in one left column rather than split across a baseline-aligned
   band -- on the facade version's ground, in the hero's ink with no accent
   colour anywhere.

   ── Where the accent is allowed ──────────────────────────────────────────
   Ink ground, white type, and mint in exactly two places:

     1. One italic word in the headline, which rhymes with the hero's "all" and
        is the reason the two sections read as the same voice.
     2. The anchor bay's rule and label, which is the one place in the section
        where colour is doing a job -- saying which of the three matters most.

   Everything else is monochrome, and the rest of the hierarchy is carried by
   size, measure and opacity: the anchor bay is wider and its title larger. Two
   marks is the whole budget. A third would make it a colour scheme, and green
   at that point stops meaning anything.

   ── The landing slot ─────────────────────────────────────────────────────
   #cards-rest is the marker Hero measures against, and the column it sits in
   reserves the space the mosaic will occupy. Two rules:

     1. It must stay in the layout on desktop. Removing it, or hiding it with
        display:none, sets Hero's travel distance to 0 and the cards never
        leave the hero. That is a safe fallback, not a crash, but it is also
        silent -- so if the travel stops working, look here first.
     2. REST_HEIGHT should be a little taller than the mosaic renders. Too
        short and the bays ride up under the cards.

   Below lg the slot collapses and Hero disables the travel, so the mosaic
   stays where it is and this section is a plain stacked column.

   ── Facade backdrop ──────────────────────────────────────────────────────
   Optional, off by default now that the cards occupy the right side. Turned on
   it continues the hero's building at very low opacity; brightness(0) invert(1)
   forces the dark-on-transparent PNG to white so it reads on ink.

     paper #F5F2EA   ink #171613
--------------------------------------------------------------------------- */

const SHOW_FACADE = false;
const FACADE = '/hero/bank-dither.png';
const REST_HEIGHT = 460; /* px, desktop only -- see note 2 above */

const TRUST = [
  'Plaid & Spinwheel',
  'Read-only by default',
  '12,000+ US institutions',
  'Zero data selling',
];

const FEATURES = [
  {
    label: 'Cards',
    anchor: true,
    title: 'All your cards, one view',
    body: 'Balances, limits, due dates. Pay from one place.',
  },
  {
    label: 'Subscriptions',
    anchor: false,
    title: 'No more hold music',
    body: 'We find what you stopped using, and cancel it.',
  },
  {
    label: 'Bills',
    anchor: false,
    title: 'Never another late fee',
    body: 'One calendar for every card. Set it once.',
  },
];

const blackStyles = `
  .fb-root {
    --paper: #F5F2EA;
    --ink: #171613;
    --mint: #64B387;
  }
  @media (prefers-reduced-motion: reduce) {
    .fb-root .fade-in { opacity: 1 !important; transform: none !important; }
  }
`;

export default function FeaturesBlack() {
  const root = useRef(null);
  const scope = useRef(null);

  useEffect(() => {
    const node = root.current;
    if (!node) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node.querySelectorAll('.fade-in').forEach((el) => { el.style.opacity = '1'; });
      return undefined;
    }

    try {
      scope.current = createScope({ root: node }).add(() => {
        fadeUpOnScroll('.trust-item', node, { staggerMs: 60, translateY: 12 });
        fadeUpOnScroll('.head-item', node, { staggerMs: 80, delay: 120, translateY: 20 });
        fadeUpOnScroll('.bay-item', node, { staggerMs: 110, delay: 200, translateY: 24 });

        if (SHOW_FACADE) {
          animate('.fb-parallax', {
            translateY: [0, 110],
            ease: 'linear',
            autoplay: onScroll({ target: node, start: 'top bottom', end: 'bottom top', sync: true }),
          });
        }
      });
    } catch (err) {
      node.querySelectorAll('.fade-in').forEach((el) => { el.style.opacity = '1'; });
      return undefined;
    }

    return () => scope.current?.revert();
  }, []);

  return (
    <section
      ref={root}
      id="features"
      /* z-10 keeps this below Hero (z-20) so the travelling mosaic paints over
         this section's ground rather than disappearing behind it. */
      className="fb-root relative z-10 overflow-hidden bg-[var(--ink)] pb-24 pt-14 lg:pb-32"
    >
      <style>{blackStyles}</style>

      {SHOW_FACADE && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to bottom, #000 0%, #000 70%, transparent 96%)',
            WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, #000 70%, transparent 96%)',
          }}
        >
          <div className="fb-parallax absolute inset-0">
            <img
              src={FACADE}
              alt=""
              decoding="async"
              className="absolute left-1/2 top-[-320px] w-[1680px] max-w-none -translate-x-1/2"
              style={{ opacity: 0.1, filter: 'brightness(0) invert(1)' }}
            />
          </div>
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 sm:px-8">
        {/* ── trust bar, the seam from the hero ───────────── */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 border-b border-white/[0.08] pb-14 text-[10px] font-medium uppercase tracking-[0.2em] text-white/35">
          {TRUST.map((t, i) => (
            <React.Fragment key={t}>
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className="trust-item fade-in block h-[3px] w-[3px] bg-white/25 opacity-0"
                />
              )}
              <span className="trust-item fade-in opacity-0">{t}</span>
            </React.Fragment>
          ))}
        </div>

        {/* ── heading left, landing slot right ────────────── */}
        <div className="grid grid-cols-1 gap-10 pt-16 lg:grid-cols-[1fr_45%] lg:gap-14 lg:pt-20">
          <div className="max-w-[34rem] lg:pb-16">
            <span className="head-item fade-in mb-5 block text-[10px] font-medium uppercase tracking-[0.2em] text-white/40 opacity-0">
              What you get
            </span>

            <h2 className="head-item fade-in font-serif text-[40px] leading-[1.14] tracking-[-0.01em] text-white opacity-0 sm:text-[52px] lg:text-[clamp(46px,4.6vw,62px)]">
              One place.
              <br className="hidden sm:inline" /> Every card.{' '}
              <em className="italic text-[var(--mint)]" style={{ opacity: 0.9 }}>
                Total
              </em>{' '}
              control.
            </h2>

            <p className="head-item fade-in mt-6 max-w-[30rem] text-[16px] leading-[1.7] text-white/60 opacity-0">
              Four cards, no clear picture. That&apos;s the problem.
            </p>

            <a
              href="https://cards.amalgamic.io/auth/signin"
              className="head-item fade-in group/cta mt-8 inline-flex items-center gap-2 text-[15px] font-medium text-white opacity-0 transition-opacity hover:opacity-80"
            >
              Get started
              <span aria-hidden="true" className="transition-transform duration-300 group-hover/cta:translate-x-1">
                &rarr;
              </span>
            </a>
          </div>

          {/* The mosaic's landing slot. Empty by design: Hero measures against
              it and the cards arrive here. See notes at the top of this file. */}
          <div
            id="cards-rest"
            aria-hidden="true"
            className="hidden lg:block"
            style={{ height: REST_HEIGHT }}
          />
        </div>

        {/* ── the three bays ──────────────────────────────── */}
        <div className="mt-4 grid grid-cols-1 border-t border-white/15 lg:mt-10 lg:grid-cols-[1.3fr_1fr_1fr]">
          {FEATURES.map((f) => (
            <div
              key={f.label}
              className="bay-item fade-in relative border-b border-white/10 py-9 opacity-0 transition-colors duration-300 hover:bg-white/[0.025] lg:border-b-0 lg:px-9 lg:first:pl-0 lg:last:pr-0"
            >
              {/* Accent mark 2 of 2. The rule and the label are one gesture,
                  not two separate uses of the colour. */}
              {f.anchor && (
                <span
                  aria-hidden="true"
                  className="absolute -top-px left-0 block h-[2px] w-[74px] bg-[var(--mint)]"
                />
              )}

              <span
                className={`block text-[10px] font-medium uppercase tracking-[0.2em] ${f.anchor ? 'text-[var(--mint)]' : 'text-white/40'
                  }`}
              >
                {f.label}
              </span>

              <h3
                className={`mt-7 font-serif leading-[1.18] tracking-[-0.01em] text-white ${f.anchor ? 'max-w-[15ch] text-[30px]' : 'text-[24px]'
                  }`}
              >
                {f.title}
              </h3>

              <p className="mt-3.5 max-w-[34ch] text-[15px] leading-[1.65] text-white/60">
                {f.body}
              </p>
            </div>
          ))}
        </div>

        <div aria-hidden="true" className="mt-2 hidden h-px w-full bg-white/15 lg:block" />
      </div>
    </section>
  );
}