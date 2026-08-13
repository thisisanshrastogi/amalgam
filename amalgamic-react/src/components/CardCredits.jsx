import React, { useRef, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import AmalgamicExpressCard from './AmalgamicExpress';
import AmalgamicExpressDark from './AmalgamicExpressDark';
import { animate, createScope, stagger } from 'animejs';

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
          <div className="anime-card absolute -top-[15%] right-[0%] z-10">
            <div className="w-[360px] transform rotate-[15deg] transition-all duration-500 hover:-translate-y-4 hover:rotate-[10deg] hover:scale-105 cursor-pointer drop-shadow-sm">
              <AmalgamicExpressDark />
            </div>
          </div>
          {/* Middle card */}
          <div className="anime-card absolute top-[15%] -left-[15%] z-20">
            <div className="w-[420px] transform -rotate-[60deg] transition-all duration-500 hover:-translate-y-4 hover:-rotate-[50deg] hover:scale-105 cursor-pointer drop-shadow-sm">
              <AmalgamicExpressCard />
            </div>
          </div>
          {/* Bottom card */}
          <div className="anime-card absolute top-[60%] right-[15%] z-10">
            <div className="w-[400px] transform rotate-[30deg] transition-all duration-500 hover:-translate-y-4 hover:rotate-[20deg] hover:scale-105 cursor-pointer drop-shadow-sm">
              <AmalgamicExpressDark />
            </div>
          </div>
        </div>

        <div className="md:order-2 order-1 lg:pl-10">
          <span className="anime-text text-muted text-xs font-bold uppercase tracking-widest mb-6 block">Card credits and offers</span>
          <h2 className="anime-text font-serif text-5xl leading-tight mb-8 text-brand">
            You already paid for these.
          </h2>
          <p className="anime-text text-muted text-lg leading-relaxed mb-6">
            Track available offers and get notified before valuable credits expire.
          </p>
        </div>

      </div>
    </section>
  );
}
