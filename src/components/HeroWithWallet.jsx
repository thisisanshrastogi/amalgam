import React, { useEffect, useRef } from 'react';
import { createTimeline, createScope } from 'animejs';
import HeroCards from './HeroCards';
import WalletScan from './Wallet';

/* ---------------------------------------------------------------------------
   Hero

   Animation ownership is split cleanly: this file reveals the text column and
   nothing else. HeroCards owns its own card stagger, so the two never fight
   over the same elements.

   Reveal targets are hidden by the scoped <style> below rather than an
   opacity-0 utility class. Three reasons: it can't collide with another
   opacity utility on the same element, it leaves everything visible when the
   visitor prefers reduced motion, and the catch block can unhide the whole
   column if anime fails to initialise, so a broken import degrades to a
   static hero instead of a blank one.
--------------------------------------------------------------------------- */

const revealStyles = `
  @media (prefers-reduced-motion: no-preference) {
    [data-hero-reveal] { opacity: 0; }
  }
`;

export default function Hero() {
    const root = useRef(null);
    const scope = useRef(null);

    useEffect(() => {
        const node = root.current;
        if (!node) return undefined;

        const show = () =>
            node.querySelectorAll('[data-hero-reveal]').forEach((el) => {
                el.style.opacity = '1';
            });

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            show();
            return undefined;
        }

        try {
            scope.current = createScope({ root: node }).add(() => {
                createTimeline({ defaults: { ease: 'outExpo' } })
                    .add('.hero-badge', { opacity: [0, 1], translateY: [16, 0], duration: 360 })
                    .add('.hero-h1', { opacity: [0, 1], translateY: [40, 0], duration: 480 }, '-=300')
                    .add('.hero-p', { opacity: [0, 1], translateY: [20, 0], duration: 360 }, '-=400')
                    .add('.hero-btns', { opacity: [0, 1], translateY: [16, 0], duration: 300 }, '-=300')
                    .add('.hero-proof', { opacity: [0, 1], translateY: [12, 0], duration: 300 }, '-=200');
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
            /* overflow-x-clip instead of overflow-x-hidden: it stops the offset card
               stack from creating a horizontal scrollbar without turning this
               section into a scroll container, which would break a sticky nav. */
            className="relative flex flex-col lg:flex-row items-center lg:min-h-screen px-6 pt-24 pb-12 lg:pb-24 lg:pt-40 sm:px-8 overflow-x-clip text-ink"
        >
            <style>{revealStyles}</style>

            <div className="relative z-10 flex flex-col items-center justify-between w-full gap-12 mx-auto max-w-[1200px] lg:flex-row lg:gap-8">
                {/* Text column */}
                <div className="max-w-xl pt-12 shrink-0 md:pt-0">
                    <span
                        data-hero-reveal
                        className="hero-badge inline-block mb-8 px-3 py-1.5 rounded-full bg-black/5 border border-black/10 text-ink text-[11px] font-bold uppercase tracking-widest"
                    >
                        For cardholders
                    </span>

                    <h1
                        data-hero-reveal
                        className="hero-h1 mb-8 font-serif text-5xl leading-[1.05] tracking-tight md:text-[80px]"
                    >
                        Finally, a
                        <br />
                        home for all
                        <br />
                        your credit cards.
                    </h1>

                    {/* opacity now comes from the colour token, not an opacity utility,
              so it can't cancel out the reveal */}
                    <p data-hero-reveal className="hero-p mb-10 text-lg leading-relaxed text-ink/70">
                        Forgotten subscriptions, expired credits, refunds you never chased. Amalgamic finds
                        them across your cards and gets them back.
                    </p>

                    <div
                        data-hero-reveal
                        className="hero-btns flex flex-col items-start gap-4 mb-6 sm:flex-row sm:items-center"
                    >
                        <a
                            href="https://cards.amalgamic.io/auth/signin"
                            className="inline-block text-center w-full px-8 py-4 text-sm font-bold shadow-xl rounded-xl bg-ink text-white transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:w-auto"
                        >
                            Connect your accounts
                        </a>
                        <button
                            type="button"
                            className="w-full px-8 py-4 text-sm font-bold transition-colors bg-transparent border shadow-sm rounded-xl text-ink border-ink/20 hover:bg-ink/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:w-auto"
                        >
                            See how it works
                        </button>
                    </div>

                    <p data-hero-reveal className="hero-proof font-mono text-[11px] tracking-wide text-ink/50">
                        $1.2M+ recovered · 12,000+ institutions · we never sell your data
                    </p>
                </div>

                {/* Card stack. No opacity utility here: HeroCards runs its own
            entrance, and a wrapper fade on top of it double-animates. */}
                <div
                    className="relative hidden lg:block w-full mt-16 h-[500px] lg:mt-0 lg:h-[600px] lg:w-1/2 translate-x-8 lg:-translate-x-[100px]"
                    style={{ clipPath: 'inset(-100% -100% -34% -100%)' }}
                >
                    {/* <HeroCards /> */}
                    <WalletScan />
                </div>
            </div>
        </section>
    );
}