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

   ── NEW: the mosaic travels into the next section ────────────────────────
   The cards are pinned to the scroll for a fixed distance and then released,
   so they appear to ride down out of the hero and come to rest inside
   FeaturesBlack, which is what the section below is laid out around.

   How it works, and why not sticky. position:sticky is bounded by the nearest
   scrolling ancestor's box, so a sticky card column would unstick the moment
   the hero ends -- exactly where we need the travel to continue.

   Instead the wrapper gets a damped, scroll-derived transform:

     target  = clamp(CARD_PIN_TOP - naturalViewportTop, 0, maxTravel)
     current += (target - current) * CARD_DAMPING   // every frame

   The target is expressed as "hold CARD_PIN_TOP below the top of the
   viewport", not as "move by however far the page scrolled". Two things fall
   out of that. The travel starts by itself, only once the mosaic has risen to
   the pin line, so there is no arbitrary trigger point. And the gap under the
   nav is guaranteed by construction rather than by luck.

   The damping is what makes it feel like an object rather than a scrollbar
   readout: the cards chase the target and arrive a few frames late, so a flick
   of the wheel throws them and they settle. Welding translateY to scrollY 1:1
   is technically a perfect pin and reads as cheap, because nothing in the
   physical world tracks your input with zero lag.

   Across the travel the mosaic also scales down by CARD_SETTLE_SCALE from its
   top edge, so it recedes into the section below while the pin gap stays put.
   Past the clamp the transform stops growing and the cards scroll away.

   The travel distance is measured, never hardcoded: it is the gap between the
   mosaic's resting top and the top of #cards-rest in FeaturesBlack. Re-measured
   on resize, so changing either section's padding can't desync them.

   Two hard requirements this places on the rest of the page:

     1. This section must sit above the next one in the stacking order, or the
        next section's background paints over the travelling cards. Hence z-20
        here and z-10 on FeaturesBlack.
     2. FeaturesBlack must render <div id="cards-rest" /> where the cards
        should land, and reserve the space. Without it, travel is 0 and the
        cards stay in the hero, which is a clean fallback rather than a break.

   Below lg the effect is off entirely: the mosaic sits under the copy in a
   single column there, so there is nothing to travel past.

   Animation ownership is split: this file reveals the panel's text column,
   HeroCards owns the mosaic. Neither touches the other's elements. The travel
   transform lives on a wrapper OUTSIDE HeroCards, so it can never collide with
   the mosaic's own transforms.

     paper #F5F2EA   ink #171613   mint #64B387
--------------------------------------------------------------------------- */

const BANK_BACKDROP = '/hero/bank-dither.png';

/* How far below the top of the viewport the mosaic holds while it travels.
   This is the breathing room: the nav pill occupies roughly the first 76px, so
   anything under ~100 makes the cards look jammed against the chrome.
   Updated to 50 so the animation starts after more scrolling. */
const CARD_PIN_TOP = 50;

/* Follow damping, expressed per 16.7ms and normalised against real elapsed
   time in the loop, so 60Hz, 120Hz and a dropped frame all behave identically.
   The cards chase their scroll-derived target rather than being welded to it,
   which is where the weight comes from. 0.22 is quick with a perceptible
   trail; 0.12 is slow and syrupy; 1 is the glued-to-the-scrollbar feel this
   replaced. */
const CARD_DAMPING = 0.8;

/* How much the mosaic shrinks across the full travel. Scaling from the top
   edge means it recedes into the section below without the pin gap changing.

   Set this to 0 if you ever see judder: scale invalidates the raster of every
   child, and HeroCards renders four large transparent PNGs each carrying a
   drop-shadow filter. Pure translate is compositor-only and costs nothing. */
const CARD_SETTLE_SCALE = 0.1;

/* Scale is rounded to this step before being written. A continuously varying
   scale re-rasterises the subtree on every single frame; stepping it means
   that happens about a dozen times across the whole travel instead. 1% steps
   are invisible while the thing is moving. Set to 0 for a smooth scale. */
const CARD_SCALE_STEP = 0;

/* Marker in the next section that defines where the cards come to rest. */
const CARDS_REST_ID = 'cards-rest';

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
  const cardsRef = useRef(null);
  const trackRef = useRef(null);

  /* ── reveal + backdrop parallax (unchanged) ──────────────────────────── */
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
          }),
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

  /* ── card travel ─────────────────────────────────────────────────────────
     Re-written using Anime.js v4's native onScroll with smooth interpolation.
     This replaces the manual requestAnimationFrame loop and custom damping
     math with Anime.js's built-in GPU-composited, frame-rate independent engine.
     
     The `sync` parameter applies the exact same damping effect but through 
     Anime's highly optimized scroll observer.
     ---------------------------------------------------------------------- */
  useEffect(() => {
    const el = cardsRef.current;
    const track = trackRef.current;
    if (!el || !track) return undefined;

    const desktop = window.matchMedia('(min-width: 1024px)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

    let scrollScope = null;
    let maxTravel = 0;

    const measure = () => {
      const rest = document.getElementById(CARDS_REST_ID);

      if (!rest || !desktop.matches || reduce.matches) {
        if (scrollScope) {
          scrollScope.revert();
          scrollScope = null;
        }
        el.style.transform = '';
        return;
      }

      // Revert any active animations so we can measure natural DOM positions
      if (scrollScope) {
        scrollScope.revert();
        scrollScope = null;
      }

      const prev = el.style.transform;
      el.style.transform = 'none';

      // Measure the gap between the mosaic's natural position and the landing slot
      const naturalTopDoc = track.getBoundingClientRect().top + window.scrollY;
      const restTop = rest.getBoundingClientRect().top + window.scrollY;
      // Subtract 150px so it sits perfectly in the middle of the empty space
      maxTravel = Math.max(0, Math.round(restTop - naturalTopDoc) - 100);

      el.style.transform = prev;

      // How many pixels to wait before the cards start moving down.
      // During this time they scroll up naturally with the page.
      const SCROLL_DEADZONE = window.innerHeight * 0.3; // wait 40% of viewport height

      if (maxTravel <= 0) return;

      scrollScope = createScope({ root: document.documentElement }).add(() => {
        animate(el, {
          translateY: [0, maxTravel],
          scale: CARD_SETTLE_SCALE > 0 ? [1, 1 - CARD_SETTLE_SCALE] : 1,
          ease: 'cubicBezier(0.25, 1, 0.5, 1)', // Add an ease so it starts slow and accelerates
          autoplay: onScroll({
            target: track,
            // Start the travel after the deadzone
            enter: `${CARD_PIN_TOP - SCROLL_DEADZONE}px top`,
            // End the travel at the same point as before
            leave: `${CARD_PIN_TOP - maxTravel}px top`,
            sync: CARD_DAMPING
          })
        });
      });
    };

    let lastWidth = window.innerWidth;
    let resizeRaf = 0;

    const onResize = () => {
      // Width-only changes are the ones that actually move the landing marker
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;

      if (resizeRaf) return;
      resizeRaf = requestAnimationFrame(() => {
        resizeRaf = 0;
        measure();
      });
    };

    // Small delay to ensure layout is fully computed before measuring
    const settle = window.setTimeout(measure, 100);
    window.addEventListener('load', measure);
    window.addEventListener('resize', onResize);
    desktop.addEventListener?.('change', measure);

    return () => {
      window.clearTimeout(settle);
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      if (scrollScope) scrollScope.revert();
      window.removeEventListener('load', measure);
      window.removeEventListener('resize', onResize);
      desktop.removeEventListener?.('change', measure);
      el.style.transform = '';
    };
  }, []);

  return (
    <section
      ref={root}
      data-armed="true"
      /* overflow-x-clip rather than overflow-x-hidden: it contains the panel's
         -100vw bleed without turning this section into a scroll container,
         which would break a sticky nav. It also leaves VERTICAL overflow
         visible, which is what lets the mosaic travel out of this section.

         z-20 puts this section above FeaturesBlack (z-10) so the travelling
         cards paint over it rather than under it. */
      className="hero-root relative z-20 flex min-h-[100dvh] flex-col overflow-x-clip bg-[var(--paper)] pt-24 lg:pt-36"
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
        <div className="hero-parallax absolute inset-0 h-full w-full">
          <img
            src={BANK_BACKDROP}
            alt=""
            className="absolute left-1/2 top-[35rem] w-[480px] max-w-none -translate-x-1/2 opacity-40 sm:top-72 sm:w-[640px] lg:left-auto lg:right-0 lg:top-12 lg:w-[65vw] lg:max-w-[1200px] lg:translate-x-0 lg:opacity-40"
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
          className="absolute -left-[100vw] -right-[100vw] -top-32 bottom-0 rounded-none bg-[var(--ink)] lg:right-[calc(50%-2.5rem)] lg:top-0 lg:rounded-tr-[52px]"
        />

        <div className="relative flex w-full flex-col justify-center py-10 lg:w-1/2 lg:shrink-0 lg:py-12">
          <div className="relative z-10 max-w-[34rem] pr-2">
            <h1
              data-hero-reveal
              className="hero-h1 mb-8 pb-1 font-serif text-[46px] leading-[1.2] tracking-[-0.015em] text-white sm:text-[60px] lg:text-[clamp(56px,5.2vw,86px)]"
            >
              Finally, a<br className="hidden lg:inline" /> home for{' '}
              <em className="text-mint" style={{ opacity: 0.9 }}>all</em>
              <br className="hidden lg:inline" /> your credit
              <br className="hidden lg:inline" /> cards.
            </h1>

            {/* Opacity comes from the colour token, not an opacity utility, so
                it can't cancel out the reveal. */}
            <p
              data-hero-reveal
              className="hero-p mb-8 max-w-[30rem] text-[17px] leading-relaxed text-[rgba(255,255,255,0.75)]"
            >
              See every card in one place. Pay all your bills. Track rewards. And stop the
              charges you shouldn&apos;t be paying in the first place.
            </p>

            <div data-hero-reveal className="hero-btns mb-6 flex flex-col items-stretch sm:block">
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
            two boxes sitting next to each other.

            The travel transform lives on the wrapper below, not on HeroCards,
            so the mosaic's own animations are untouched. */}
        <div ref={trackRef} className="relative z-20 mt-8 flex w-full items-center pb-12 lg:mt-0 lg:w-1/2 lg:justify-center lg:pb-0">
          <div
            ref={cardsRef}
            /* Scaling from the top edge keeps CARD_PIN_TOP honest: the mosaic
               shrinks downward into the section rather than away from the gap.

               will-change is declared here, once, rather than toggled from the
               animation loop. Toggling it builds and tears down a compositor
               layer on every settle, which is a hitch in its own right. */
            style={{
              transformOrigin: '50% 0%',
              willChange: 'transform',
              backfaceVisibility: 'hidden',
            }}
            className="ml-6 w-full max-w-[85%] sm:ml-10 lg:ml-20 lg:max-w-[85%]"
          >
            <HeroCards />
          </div>
        </div>
      </div>
    </section>
  );
}