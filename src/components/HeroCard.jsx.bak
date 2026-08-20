import React, { useEffect } from 'react';
import { animate, stagger } from 'animejs';
import AmalgamicExpressCard from './AmalgamicExpress';

/* ---------------------------------------------------------------------------
   Amalgamic hero cards

   Card faces are driven from the PALETTE object below rather than Tailwind
   tokens, so the hero renders even if a token name is missing from your
   config. Once you're happy with the colours, lift them into
   tailwind.config.js and swap the inline styles back to classes:

     ink: '#12100F', pine: '#14382F', oxblood: '#5C2328',
     bone: '#F7F3E9', chip: '#E8DFC9', chipDark: '#C9BCA0'

   Everything else (halftone, sheen, edge lighting) is currentColor or a
   neutral wash, so the art follows whatever face colour you set.

   Light source: upper-left. Specular on the top and left edges, shadows fall
   down and right, halftone densest where the light lands.
--------------------------------------------------------------------------- */

const PALETTE = {
  ink: '#12100F',
  pine: '#14382F',
  espresso: '#3A2A20',
  white: '#FFFFFF',
  bone: '#F7F3E9',
  chipWarm: '#E8DFC9',
  chipTaupe: '#C9BCA0',
};

/* Printed halftone. Two dot grids at different pitches, each radially masked
   so the tone grades across the face the way ink does. */
const Halftone = () => (
  <>
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.20]"
      style={{
        backgroundImage: 'radial-gradient(currentColor 0.85px, transparent 0.95px)',
        backgroundSize: '5px 5px',
        maskImage: 'radial-gradient(115% 95% at 12% -10%, #000 0%, transparent 62%)',
        WebkitMaskImage: 'radial-gradient(115% 95% at 12% -10%, #000 0%, transparent 62%)',
      }}
    />
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.11]"
      style={{
        backgroundImage: 'radial-gradient(currentColor 1.4px, transparent 1.5px)',
        backgroundSize: '9px 9px',
        maskImage: 'radial-gradient(90% 80% at 8% 0%, #000 0%, transparent 48%)',
        WebkitMaskImage: 'radial-gradient(90% 80% at 8% 0%, #000 0%, transparent 48%)',
      }}
    />
  </>
);

/* EMV chip. Contact pads get real geometry, since that's the part the eye
   recognises as a chip. */
const Chip = ({ color }) => (
  <div className="relative w-[42px] h-[31px] rounded-[5px] overflow-hidden" style={{ color }}>
    <div className="absolute inset-0 bg-current" />
    <div
      className="absolute inset-0"
      style={{
        background:
          'linear-gradient(140deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 38%, rgba(0,0,0,0.18) 100%)',
      }}
    />
    <div className="absolute left-0 right-0 top-[9.5px] h-px bg-black/25" />
    <div className="absolute left-0 right-0 bottom-[9.5px] h-px bg-black/25" />
    <div className="absolute top-0 bottom-0 left-[12px] w-px bg-black/25" />
    <div className="absolute top-0 bottom-0 right-[12px] w-px bg-black/25" />
    <div className="absolute left-[12px] right-[12px] top-[9.5px] bottom-[9.5px] border border-black/25" />
    <div className="absolute inset-0 rounded-[5px] border border-black/15" />
  </div>
);

const Contactless = () => (
  <svg viewBox="0 0 20 20" className="w-[18px] h-[18px] opacity-50" fill="none" aria-hidden="true">
    <path d="M5 5.5a7 7 0 0 1 0 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M9 3.5a10.5 10.5 0 0 1 0 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M13 1.5a14 14 0 0 1 0 17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

/* Matches .logo-mark in the site stylesheet: filled square, inset cut-out. */
const Mark = ({ withWordmark = true, face }) => {
  const isWhite = face === PALETTE.white;
  return (
    <div className="flex items-center gap-1.5">
      <div
        className="w-[18px] h-[18px] rounded-[3px] relative overflow-hidden"
        style={{ backgroundColor: isWhite ? '#000000' : 'currentColor' }}
      >
        <div
          className="absolute left-1/2 top-1/2 w-[7px] h-[7px] -translate-x-1/2 -translate-y-1/2 rounded-[1px]"
          style={{ backgroundColor: isWhite ? '#FFFFFF' : 'rgba(0,0,0)' }}
        />
      </div>
      {withWordmark && <span className="font-semibold text-[13px] tracking-tight">Amalgamic</span>}
    </div>
  );
};

const CreditCard = ({
  face,
  ink,
  chip,
  recovered,
  last4,
  cardholderName,
  expiry,
  logoPosition = 'top',
}) => (
  <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
    {/* Extruded edge so the card reads as a solid object at 32deg of tilt */}
    <div
      aria-hidden="true"
      className="absolute inset-0 rounded-[14px]"
      style={{ background: face, filter: 'brightness(0.72)', transform: 'translateZ(-5px)' }}
    />

    <div
      className="relative w-[280px] h-[176px] sm:w-[320px] sm:h-[202px] rounded-[14px]
                 p-5 sm:p-6 flex flex-col overflow-hidden"
      style={{ background: face, color: ink }}
    >
      <Halftone />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(128deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.04) 26%, rgba(255,255,255,0) 46%, rgba(0,0,0,0.10) 82%, rgba(0,0,0,0.22) 100%)',
        }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-white/30 pointer-events-none" />
      <div className="absolute inset-y-0 left-0 w-px bg-white/15 pointer-events-none" />
      <div className="absolute inset-0 rounded-[14px] border border-black/10 pointer-events-none" />

      {/* Top row: what this card got back, and the mark */}
      <div className="relative z-10 flex justify-between items-start">
        <span className="font-mono text-[13px] font-medium tabular-nums opacity-90">{recovered}</span>
        {logoPosition === 'top' && (
          <div className="opacity-90">
            <Mark face={face} />
          </div>
        )}
      </div>

      <div className="relative z-10 mt-4 sm:mt-5 flex items-center gap-3">
        <Chip color={chip} />
        <Contactless />
      </div>

      <div className="relative z-10 mt-auto">
        <div className="font-mono text-[13px] tracking-[0.14em] opacity-60 mb-2">
          <span aria-hidden="true">•••• •••• ••••</span> {last4}
        </div>
        <div className="flex justify-between items-end">
          <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.16em] uppercase opacity-80">
            {cardholderName}
          </span>
          {logoPosition === 'bottom' ? (
            <div className="opacity-70">
              <Mark face={face} />
            </div>
          ) : (
            <span className="font-mono text-[10px] tracking-[0.12em] opacity-55 tabular-nums">
              {expiry}
            </span>
          )}
        </div>
      </div>
    </div>
  </div>
);

/* Shadows share one light direction: down and to the right, softening with
   distance from the viewer. */
const LAYERS = [
  {
    key: 'ink',
    z: 'z-40',
    transform: 'translate3d(50px, -180px, 120px) rotateX(32deg) rotateY(-5deg) rotateZ(16deg)',
    shadow: '22px 38px 60px -18px rgba(18,16,15,0.45)',
    props: {
      face: PALETTE.ink,
      ink: PALETTE.bone,
      chip: PALETTE.chipWarm,
      recovered: '+$247.88',
      last4: '4429',
      cardholderName: 'J. OKONKWO',
      expiry: '09/28',
      logoPosition: 'top',
    },
  },
  {
    key: 'pine',
    z: 'z-30',
    transform: 'translate3d(-110px, -10px, 180px) rotateX(32deg) rotateY(20deg) rotateZ(-24deg)',
    shadow: '18px 32px 52px -16px rgba(20,56,47,0.40)',
    props: {
      face: PALETTE.pine,
      ink: PALETTE.bone,
      chip: PALETTE.chipWarm,
      recovered: '+$1,120.00',
      last4: '8102',
      cardholderName: 'M. VARGAS',
      expiry: '03/29',
      logoPosition: 'top',
    },
  },
  {
    key: 'espresso',
    z: 'z-20',
    transform: 'translate3d(100px, 110px, 40px) rotateX(32deg) rotateY(-30deg) rotateZ(2deg)',
    shadow: '14px 26px 46px -14px rgba(92,35,40,0.34)',
    props: {
      face: PALETTE.espresso,
      ink: PALETTE.bone,
      chip: PALETTE.chipWarm,
      recovered: '+$96.40',
      last4: '6317',
      cardholderName: 'S. REDDY',
      expiry: '11/27',
      logoPosition: 'top',
    },
  },
  {
    key: 'white',
    z: 'z-10',
    transform: 'translate3d(-60px, 280px, -20px) rotateX(32deg) rotateY(15deg) rotateZ(12deg)',
    shadow: '10px 20px 40px -12px rgba(18,16,15,0.20)',
    props: {
      face: PALETTE.white,
      ink: PALETTE.pine,
      chip: PALETTE.chipTaupe,
      recovered: '+$412.15',
      last4: '5580',
      cardholderName: 'A. LINDQVIST',
      expiry: '06/29',
      logoPosition: 'bottom',
    },
  },
];

export default function HeroCards() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    animate('.hero-credit-card-floating', {
      translateY: [800, 0],
      translateZ: [200, 0],
      rotateZ: [-15, 0],
      opacity: [1, 1],
      duration: 2200,
      ease: 'outExpo',
      delay: stagger(150, { start: 400 }),
      onComplete: () => {
        animate('.hero-credit-card-floating', {
          translateY: 12,
          translateZ: 20,
          rotateZ: '1deg',
          duration: 2500,
          alternate: true,
          loop: true,
          ease: 'inOutSine',
          delay: stagger(400),
        });
      },
    });
  }, []);

  return (
    <div
      className="absolute inset-0 flex items-center justify-center scale-75 md:scale-90 lg:scale-100 origin-center pointer-events-none"
      style={{ perspective: '1600px', transformStyle: 'preserve-3d' }}
    >
      {LAYERS.map(({ key, z, transform, shadow, props }) => (
        <div key={key} className={`absolute ${z}`} style={{ transform, transformStyle: 'preserve-3d' }}>
          <div
            className="hero-credit-card-floating rounded-[14px]"
            /* preserve-3d is load-bearing: anime writes transforms to this
               element, and without it the subtree flattens and the card's
               extruded edge collapses to zero depth. */
            style={{ boxShadow: shadow, transformStyle: 'preserve-3d' }}
          >
            <CreditCard {...props} />
            {/* <AmalgamicExpressCard /> */}
          </div>
        </div>
      ))}
    </div>
  );
}