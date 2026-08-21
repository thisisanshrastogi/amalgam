import React, { useEffect, useRef } from 'react';
import { createTimeline, createScope, animate, onScroll } from 'animejs';
import HeroCards from './HeroCards';
import { shimmerLoop } from '../utils/animations';

/* ---------------------------------------------------------------------------
   Hero

   Three stacked planes, back to front:

     0  the dithered bank facade, clipped to the section and faded out at the
        bottom so it dissolves into the paper instead of butting into the next
        section with a hard edge
     10 the ink panel, which bleeds off the left edge of the viewport and is
        rounded only on its right side
     20 the card mosaic, which crosses back over the panel's right edge by a
        few percent so the two planes interlock rather than sit side by side

   Colours live as CSS custom properties on the section root rather than
   Tailwind tokens, so this renders correctly before you add anything to
   tailwind.config.js. Once you're happy, lift them into the theme and swap
   bg-[var(--paper)] for bg-paper, etc.

     paper #F5F2EA   ink #171613   mint #64B387

   Animation ownership is split: this file reveals the panel's text column,
   HeroCards owns the mosaic. Neither touches the other's elements.

   Reveal targets are hidden by the scoped <style> below rather than an
   opacity-0 utility: it can't collide with another opacity utility, it leaves
   everything visible under prefers-reduced-motion, and the catch block can
   unhide the column if anime fails to initialise, so a broken import degrades
   to a static hero instead of a blank one.
--------------------------------------------------------------------------- */

const BANK_BACKDROP = '/hero/bank-dither.png';

const heroStyles = `
  .hero-root {
    --paper: #F5F2EA;
    --ink: #171613;
    --mint: #64B387;
  }
  @media (prefers-reduced-motion: no-preference) {
    .hero-root[data-armed='true'] [data-hero-reveal],
    .hero-root[data-armed='true'] .hero-backdrop,
    .hero-root[data-armed='true'] .hero-dots { opacity: 0; }
  }
`;

/* Loose dot grid in the paper above the panel. Cheap, and it does real work:
   it ties the flat background to the dithered facade so the halftone reads as
   the brand's language rather than one stray photograph. */
const DotGrid = () => (
  <div
    aria-hidden="true"
    className="hero-dots pointer-events-none absolute left-4 top-[6.5rem] z-10 hidden h-[76px] w-[118px] lg:block"
    style={{
      backgroundImage: 'radial-gradient(var(--ink) 1.1px, transparent 1.2px)',
      backgroundSize: '13px 13px',
      opacity: 0.28,
      maskImage: 'linear-gradient(115deg, #000 8%, transparent 82%)',
      WebkitMaskImage: 'linear-gradient(115deg, #000 8%, transparent 82%)',
    }}
  />
);

export default function Hero() {
  const root = useRef(null);
  const scope = useRef(null);

  useEffect(() => {
    const node = root.current;
    if (!node) return undefined;

    const show = () => {
      node.dataset.armed = 'false';
      node.querySelectorAll('[data-hero-reveal], .hero-backdrop, .hero-dots').forEach((el) => {
        el.style.opacity = '1';
      });
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      show();
      return undefined;
    }

    try {
      scope.current = createScope({ root: node }).add(() => {
        const tl = createTimeline({ defaults: { ease: 'cubicBezier(0.16, 1, 0.3, 1)' } });

        tl.add('.hero-backdrop', { opacity: [0, 1], scale: [0.95, 1], duration: 1000 }, 0)
          .add('.hero-dots', { opacity: [0, 0.28], duration: 800 }, 150)
          .add('.hero-h1', { opacity: [0, 1], translateY: [30, 0], duration: 500 }, 200)
          .add('.hero-p', { opacity: [0, 1], translateY: [15, 0], duration: 400 }, '-=350')
          .add('.hero-btns', { opacity: [0, 1], translateY: [10, 0], duration: 300 }, '-=250')
          .add('.hero-proof', { opacity: [0, 1], translateY: [8, 0], duration: 250 }, '-=200');

        tl.then(() => shimmerLoop('.hero-cta-main'));

        // Parallax for the bank image
        animate('.hero-parallax', {
          translateY: [0, 150],
          ease: 'linear',
          autoplay: onScroll({
            target: node,
            start: 'top top',
            end: 'bottom top',
            sync: true,
          })
        });
      });
    } catch (err) {
      // Animation is decoration. If it can't run, the hero still has to read.
      show();
      return undefined;
    }

    return () => {
      scope.current?.revert();
    };
  }, []);

  return (
    <section
      ref={root}
      data-armed="true"
      /* overflow-x-clip rather than overflow-x-hidden: it contains the panel's
         -100vw bleed without turning this section into a scroll container,
         which would break a sticky nav. */
      className="hero-root relative flex min-h-[100dvh] flex-col overflow-x-clip bg-[var(--paper)] pt-24 lg:pt-36"
    >
      <style>{heroStyles}</style>

      {/* Plane 0 — dithered facade */}
      <div
        aria-hidden="true"
        className="hero-backdrop pointer-events-none absolute inset-0 z-0 overflow-hidden"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0%, #000 7%, #000 84%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, #000 7%, #000 84%, transparent 100%)',
        }}
      >
        <div className="hero-parallax absolute inset-0 w-full h-full">
          <img
            src={BANK_BACKDROP}
            alt=""
            className="absolute left-1/2 top-[35rem] w-[480px] max-w-none -translate-x-1/2 opacity-40 sm:w-[640px] sm:top-72 lg:left-auto lg:right-0 lg:translate-x-0 lg:top-12 lg:w-[65vw] lg:max-w-[1200px] lg:opacity-40"
            decoding="async"
          />
        </div>
      </div>

      <DotGrid />

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col px-6 sm:px-8 lg:flex-row lg:items-stretch lg:px-16">
        {/* Plane 10 — ink panel. The background is a separate absolute child so
            it can run off the left edge of the viewport without dragging the
            text with it or affecting the flex row's measurement. */}
        <div
          aria-hidden="true"
          className="absolute -left-[100vw] -top-32 bottom-0 -right-[100vw] rounded-none bg-[var(--ink)] lg:top-0 lg:right-[calc(50%-2.5rem)] lg:rounded-tr-[52px]"
        />

        <div className="relative flex w-full flex-col justify-center py-10 lg:w-1/2 lg:shrink-0 lg:py-12">

          <div className="relative z-10 max-w-[34rem] pr-2">
            <h1
              data-hero-reveal
              className="hero-h1 mb-8 pb-1 font-serif text-[46px] leading-[1.2] tracking-[-0.015em] text-white sm:text-[60px] lg:text-[clamp(56px,5.2vw,86px)]"
            >
              Finally, a<br className="hidden lg:inline" /> home for{' '}
              <em className='text-mint' style={{ opacity: 0.9 }}>all</em>
              <br className="hidden lg:inline" /> your credit
              <br className="hidden lg:inline" /> cards.
            </h1>

            {/* Opacity comes from the colour token, not an opacity utility, so
                it can't cancel out the reveal. */}
            <p data-hero-reveal className="hero-p mb-8 max-w-[30rem] text-[17px] leading-relaxed text-[rgba(255,255,255,0.75)]">
              See every card in one place. Pay all your bills. Track rewards. And stop the
              charges you shouldn't be paying in the first place.
            </p>

            <div
              data-hero-reveal
              className="hero-btns mb-6 flex flex-col items-stretch sm:block"
            >
              <a
                href="https://cards.amalgamic.io/auth/signin"
                className="hero-cta-main group inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-full bg-white px-9 py-4 text-[15px] font-bold text-[var(--ink)] shadow-[0_8px_30px_rgba(255,255,255,0.12)] transition-all hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(255,255,255,0.2)] active:translate-y-px active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--paper)] sm:w-auto"
              >
                Get started
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              </a>
            </div>

            <p
              data-hero-reveal
              className="hero-proof font-mono text-[11px] tracking-wide text-[rgba(255,255,255,0.45)]"
            >
              Read-only access. Two minutes to set up.
            </p>
          </div>
        </div>

        {/* Plane 20 — card mosaic. The negative left margin pulls it back over
            the panel's rounded edge; without the overlap the two halves read as
            two boxes sitting next to each other. */}
        <div className="relative z-20 mt-8 flex w-full items-center pb-12 lg:mt-0 lg:w-1/2 lg:justify-center lg:pb-0">
          <div className="w-full max-w-[85%] ml-6 sm:ml-10 lg:ml-20 lg:max-w-[75%]">
            <HeroCards />
          </div>
        </div>
      </div>
    </section>
  );
}