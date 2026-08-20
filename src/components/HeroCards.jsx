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

/* One shadow recipe for all four so the mosaic reads as a single plane of
   objects lit from the same place. Tinted to the paper's warm neutral — a
   pure black shadow on #F5F2EA goes grey and dead. */
const CARD_SHADOW =
  'drop-shadow(0 1px 1px rgba(23,22,19,0.10)) drop-shadow(0 18px 26px rgba(23,22,19,0.16))';

const cardStyles = `
  .hero-card {
    will-change: transform, filter;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border: 1px solid transparent;
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    cursor: pointer;
  }
  .hero-card:hover {
    transform: scale(1.04) translateY(-8px) rotate(2deg) !important;
    z-index: 10;
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
          translateX: (el) => [random(-100, 100), 0],
          translateY: (el) => [random(80, 200), 0],
          rotate: (el) => [random(-25, 25), 0],
          scale: [0.8, 1],
          duration: 850,
          ease: createSpring({ stiffness: 90, damping: 14, mass: 1, velocity: 0 }),
          delay: stagger(90, { start: 260 }),
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
      className="hero-mosaic relative w-full aspect-[850/740]"
      style={{ willChange: 'transform' }}
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