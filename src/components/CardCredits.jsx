import React, { useRef, useEffect } from 'react';
import { animate, createScope, stagger, onScroll } from 'animejs';

export default function CardCredits() {
  const rootRef = useRef(null);
  const scopeRef = useRef(null);

  useEffect(() => {
    let enterAnim;
    let floatAnim;

    scopeRef.current = createScope({ root: rootRef.current }).add(() => {
      // 1. Enter Text
      animate('.anime-text', {
        translateY: [40, 0],
        opacity: [0, 1],
        delay: stagger(100),
        duration: 800,
        ease: 'outQuart',
      });

      // 2. Animate Cards (Bento Style Grid)
      enterAnim = animate('.anime-card', {
        translateY: [100, 0],
        opacity: [0, 1],
        delay: stagger(150, { start: 200 }),
        duration: 1200,
        ease: 'outElastic(1, .6)',
        autoplay: false
      });



      // 4. Continuous Float for Cards
      enterAnim.then(() => {
        floatAnim = animate('.float-item', {
          translateY: ['-10px', '10px'],
          duration: (el, i) => 2500 + i * 300,
          ease: 'easeInOutSine',
          direction: 'alternate',
          loop: true,
        });
      });
    });

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (enterAnim) enterAnim.play();
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

  const handleMouseEnter = (e) => {
    animate(e.currentTarget, {
      scale: 1.05,
      rotate: '0deg',
      zIndex: 50,
      duration: 400,
      ease: 'outElastic(1, .8)'
    });
  };

  const handleMouseLeave = (e) => {
    const el = e.currentTarget;
    animate(el, {
      scale: 1,
      rotate: el.dataset.r || '0deg',
      zIndex: 10,
      duration: 400,
      ease: 'outElastic(1, .8)'
    });
  };

  return (
    <section ref={rootRef} className="py-24 px-8 overflow-hidden bg-paper relative">
      


      <div className="max-w-[1200px] mx-auto relative z-10">

        {/* Centered heading */}
        <div className="text-center mb-16 max-w-2xl mx-auto relative z-20">
          <h2 className="anime-text opacity-0 font-serif text-4xl sm:text-5xl leading-tight mb-4 text-ink">
            Optimize your reward earnings better.
          </h2>
          <p className="anime-text opacity-0 text-muted text-lg leading-relaxed">
            Track available offers and get notified before valuable credits expire. If you want, we can even track ROE = Return on expense every month.
          </p>
        </div>

        {/* Bento Style Layout for Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 items-center justify-items-center max-w-5xl mx-auto relative z-10">
          
          {/* Card 1 */}
          <div 
            className="anime-card opacity-0 float-item cursor-pointer relative z-10 w-full max-w-[240px]"
            data-r="-8deg"
            style={{ transform: 'rotate(-8deg)' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img src="/hero/franklin.png" alt="Franklin Card" className="w-full h-auto drop-shadow-xl rounded-2xl" />
          </div>

          {/* Card 2 (Spans 2 cols for landscape) */}
          <div 
            className="anime-card opacity-0 float-item cursor-pointer relative z-10 w-full max-w-[400px] lg:col-span-2"
            data-r="2deg"
            style={{ transform: 'rotate(2deg)' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img src="/hero/andrew.png" alt="Andrew Card" className="w-full h-auto drop-shadow-2xl rounded-2xl" />
          </div>

          {/* Card 3 */}
          <div 
            className="anime-card opacity-0 float-item cursor-pointer relative z-10 w-full max-w-[240px]"
            data-r="8deg"
            style={{ transform: 'rotate(8deg)' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img src="/hero/washington.png" alt="Washington Card" className="w-full h-auto drop-shadow-xl rounded-2xl" />
          </div>

        </div>

      </div>
    </section>
  );
}
