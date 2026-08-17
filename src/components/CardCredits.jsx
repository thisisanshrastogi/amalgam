import React, { useRef, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import AmalgamicExpressCard from './AmalgamicExpress';
import AmalgamicExpressDark from './AmalgamicExpressDark';
import { animate, createScope, stagger } from 'animejs';
import { ModernCard } from './ModernCard';

const PALETTE = {
  ink: '#12100F',
  pine: '#14382F',
  espresso: '#3A2A20',
  white: '#FFFFFF',
  bone: '#F7F3E9',
  chipWarm: '#E8DFC9',
  chipTaupe: '#C9BCA0',
};

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


export default function CardCredits() {
  const rootRef = useRef(null);
  const scopeRef = useRef(null);

  useEffect(() => {
    let cardsAnim;
    let textAnim;

    scopeRef.current = createScope({ root: rootRef.current }).add(() => {
      cardsAnim = animate('.anime-card', {
        translateY: [100, 0],
        opacity: [0, 1],
        rotate: [-10, 0],
        delay: stagger(100),
        duration: 800,
        ease: 'outQuart',
        autoplay: false
      });

      textAnim = animate('.anime-text', {
        translateY: [40, 0],
        opacity: [0, 1],
        delay: stagger(100, { start: 200 }),
        duration: 800,
        ease: 'outQuart',
        autoplay: false
      });
    });

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (cardsAnim) cardsAnim.play();
        if (textAnim) textAnim.play();
        observer.disconnect();
      }
    }, { threshold: 0.2 });

    if (rootRef.current) {
      observer.observe(rootRef.current);
    }

    return () => {
      observer.disconnect();
      if (scopeRef.current) scopeRef.current.revert();
    };
  }, []);

  return (
    <section ref={rootRef} className="py-32 px-8 overflow-hidden bg-surface">
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-20 items-center">

        <div className="relative ml-10 min-h-[550px] flex items-center justify-center md:order-1 order-2 w-full mt-5 md:mt-0">
          {/* Top card */}
          <div className="anime-card absolute -top-[15%] right-[0%] z-10 drop-shadow-2xl">
            <div className="transform rotate-[15deg] transition-all duration-500 hover:-translate-y-4 hover:rotate-[10deg] hover:scale-105 cursor-pointer">

              <ModernCard {...LAYERS[0].props} />
              {/* <AmalgamicExpressCard /> */}
            </div>
          </div>
          {/* Middle card */}
          <div className="anime-card absolute top-[15%] -left-[15%] z-20 drop-shadow-2xl">
            <div className=" transform -rotate-[60deg] transition-all duration-500 hover:-translate-y-4 hover:-rotate-[50deg] hover:scale-105 cursor-pointer drop-shadow-lg">
              <ModernCard {...LAYERS[1].props} />
            </div>
          </div>
          {/* Bottom card */}
          <div className="anime-card absolute top-[60%] right-[15%] z-10 drop-shadow-2xl">
            <div className=" transform rotate-[30deg] transition-all duration-500 hover:-translate-y-4 hover:rotate-[20deg] hover:scale-105 cursor-pointer drop-shadow-sm">
              {/* <AmalgamicExpressDark /> */}
              <ModernCard {...LAYERS[2].props} />
            </div>
          </div>
        </div>

        <div className="md:order-2 order-1 lg:pl-10">
          <span className="anime-text text-muted text-xs font-bold uppercase tracking-widest mb-6 block">Card credits and offers</span>
          <h2 className="anime-text font-serif text-5xl leading-tight mb-8 text-brand">
            Optimize your reward earnings better.
          </h2>
          <p className="anime-text text-muted text-lg leading-relaxed mb-6">
            Track available offers and get notified before valuable credits expire. If you want, we can even track ROE = Return on expense every month.
          </p>
        </div>

      </div>
    </section>
  );
}
