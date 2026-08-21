import React, { useEffect, useRef } from 'react';
import { animate, stagger, createScope, random, createSpring } from 'animejs';

/* ---------------------------------------------------------------------------
   Amalgamic hero cards — banknote mosaic

   The hand-built CSS cards are gone. The four cards are now the supplied PNG
   crops of engraved currency, laid out as a loose mosaic rather than a fanned
   stack. That was the point of the reference: the cards don't overlap much,
   they tile, and the negative space between them lets the dithered facade
   read through.

   Positioning is entirely percentage based inside a fixed-ratio stage
   (850 x 740, lifted straight off the mockup). One ratio box means the whole
   composition scales cleanly from 380px to 1440px without a single media
   query, and the gaps between cards stay proportional instead of collapsing.

   Each card keeps its own intrinsic aspect ratio via the width/height
   attributes, so nothing reflows once the images decode.

   ── 2026 pass: paint cost ────────────────────────────────────────────────
   Hero now scales this whole mosaic as it travels down into the next section,
   which changes its rendered size continuously. Anything expensive in here
   gets re-run on every raster invalidation, so three things changed:

     1. `will-change: transform, filter` is gone. It promoted four layers AND
        told the browser to keep the filter pipeline hot on each of them. The
        parent's scale then invalidated all four every frame, so a live
        drop-shadow was being recomputed over four large transparent PNGs
        continuously. This was the single most expensive thing on the page.
        The parent is the only promoted layer now, declared in Hero.

     2. Two stacked drop-shadows became one. The contact shadow and the cast
        shadow were separate filter passes over the same alpha; a single pass
        with a small offset reads the same at this size and halves the work.

     3. The hover transform is scoped behind `@media (hover: hover)`. On touch
        it never fires, and it was costing a transition declaration on every
        card regardless.

   If you want the shadow richer than one pass can give, bake it into the PNGs
   rather than adding a second filter. A baked shadow is part of the bitmap and
   costs nothing to re-raster.

   Drop the PNGs into /public/hero/ (or repoint ASSETS at your bundler paths).
--------------------------------------------------------------------------- */

const ASSETS = {
  emeraldWide: '/hero/lincon.png',
  carte: '/hero/washington.png',
  american: '/hero/franklin.png',
  rose: '/hero/andrew.png',
};

/* left/top/width are percentages of the 850x740 stage. Order in this array is
   paint order: later entries sit in front. */
const CARDS = [
  {
    key: 'emerald',
    src: ASSETS.emeraldWide,
    alt: 'Emerald engraved card, chip visible',
    intrinsic: [513, 322],
    left: '56%',
    top: '-8%',
    width: '50%',
  },
  {
    key: 'american',
    src: ASSETS.american,
    alt: 'The American Card, engraved portrait in graphite',
    intrinsic: [513, 725],
    left: '56%',
    top: '31%',
    width: '50%',
  },
  {
    key: 'carte',
    src: ASSETS.carte,
    alt: 'Carte de crédit, engraved portrait in green',
    intrinsic: [341, 463],
    left: '14%',
    top: '0%',
    width: '40%',
  },
  {
    key: 'rose',
    src: ASSETS.rose,
    alt: 'Engraved card in rose, chip visible',
    intrinsic: [695, 420],
    left: '-6%',
    top: '65%',
    width: '60%',
  },
];

/* One shadow, one pass. Tinted to the paper's warm neutral — a pure black
   shadow on #F5F2EA goes grey and dead. */
const CARD_SHADOW = 'drop-shadow(0 14px 22px rgba(23,22,19,0.20))';

const cardStyles = `
  .hero-card {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  /* Hover only where hovering exists. On touch this never fires, and the
     transition declaration alone is worth removing from four elements. */
  @media (hover: hover) and (pointer: fine) {
    .hero-card {
      cursor: pointer;
      transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .hero-card:hover {
      transform: scale(1.04) translateY(-8px) rotate(2deg);
      z-index: 10;
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    .hero-mosaic[data-armed='true'] .hero-card { opacity: 0; }
  }
`;

export default function HeroCards() {
  const root = useRef(null);
  const scope = useRef(null);

  useEffect(() => {
    const node = root.current;
    if (!node) return undefined;

    const show = () => {
      node.dataset.armed = 'false';
      node.querySelectorAll('.hero-card').forEach((el) => {
        el.style.opacity = '1';
      });
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      show();
      return undefined;
    }

    try {
      scope.current = createScope({ root: node }).add(() => {
        animate('.hero-card', {
          opacity: [0, 1],
          translateX: () => [random(-100, 100), 0],
          translateY: () => [random(80, 200), 0],
          rotate: () => [random(-25, 25), 0],
          scale: [0.8, 1],
          duration: 850,
          ease: createSpring({ stiffness: 90, damping: 14, mass: 1, velocity: 0 }),
          delay: stagger(90, { start: 260 }),
          /* The entrance is the only thing that needs a promoted layer per
             card. Promote for its duration, then hand the layers back so the
             travel scale isn't re-rasterising four of them. */
          onBegin: () => {
            node.querySelectorAll('.hero-card').forEach((el) => {
              el.style.willChange = 'transform, opacity';
            });
          },
          onComplete: () => {
            node.querySelectorAll('.hero-card').forEach((el) => {
              el.style.willChange = '';
            });
          },
        });
      });
    } catch (err) {
      // The mosaic is the hero's whole right half. If anime fails to load it
      // still has to be on screen.
      show();
      return undefined;
    }

    return () => {
      scope.current?.revert();
    };
  }, []);

  return (
    <div
      ref={root}
      data-armed="true"
      className="hero-mosaic relative aspect-[850/740] w-full"
    /* No will-change here: Hero's travel wrapper is the promoted layer, and
       stacking a second one inside it just doubles the memory for nothing. */
    >
      <style>{cardStyles}</style>

      {CARDS.map(({ key, src, alt, intrinsic, left, top, width }) => (
        <img
          key={key}
          className="hero-card absolute select-none"
          src={src}
          alt={alt}
          width={intrinsic[0]}
          height={intrinsic[1]}
          draggable={false}
          decoding="async"
          loading="eager"
          style={{ left, top, width, height: 'auto', filter: CARD_SHADOW }}
        />
      ))}
    </div>
  );
}