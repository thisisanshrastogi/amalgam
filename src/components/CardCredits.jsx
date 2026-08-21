import React, { useRef, useEffect } from 'react';
import { animate, createScope, stagger } from 'animejs';

/* Card credits, "perforated stubs" direction.
   Text left, panel right. To flip the sides, swap `lg:order-1` / `lg:order-2`
   on the two children of the grid below.

   Mobile drops: the per-credit meta line, the "3 cards on file" tag, and a
   chunk of the padding. The tear stays, since it's the point of the section. */

const MINT = '#64B387';
const INK = '#171613';
const PAPER = '#F5F2EA';

/* perforation drawn as a dot run at the build's 4px pitch */
const PERF = {
  backgroundImage:
    'radial-gradient(circle at 1px 1px, rgba(245,242,234,0.34) 1px, transparent 1.2px)',
  backgroundSize: '4px 8px',
};

const CREDITS = [
  {
    name: 'Airline fee credit',
    meta: 'Platinum · one per calendar year',
    amount: '$200',
    expiry: 'Ends 31 Dec',
    claimed: false,
  },
  {
    name: 'Hotel credit',
    meta: 'Platinum · prepaid bookings only',
    amount: '$200',
    expiry: 'Ends 31 Dec',
    claimed: false,
  },
  {
    name: 'Digital entertainment',
    meta: 'Platinum · monthly, resets 1 Sep',
    amount: '$20',
    expiry: 'Claimed 12 Aug',
    claimed: true,
  },
];

const ROWS = [
  { k: 'Unused', v: "What's still on the table, per card." },
  { k: 'Reminders', v: 'A nudge two weeks before the date.' },
  { k: 'Offers', v: 'Transfer bonuses worth acting on, with sources.' },
];

export default function CardCredits() {
  const rootRef = useRef(null);
  const scopeRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce) {
      root.querySelectorAll('.anime-in, .anime-text, .anime-stub').forEach((el) => {
        el.style.opacity = 1;
      });
      const end = root.querySelector('.tear-end');
      if (end) {
        end.style.opacity = 0.5;
        end.style.transform = 'translateX(9px) rotate(1.4deg)';
      }
      return;
    }

    let textAnim;
    let stubAnim;

    scopeRef.current = createScope({ root }).add(() => {
      textAnim = animate('.anime-text', {
        translateY: [28, 0],
        opacity: [0, 1],
        delay: stagger(90),
        duration: 750,
        ease: 'outQuart',
        autoplay: false,
      });

      stubAnim = animate('.anime-stub', {
        translateY: [26, 0],
        opacity: [0, 1],
        delay: stagger(110, { start: 180 }),
        duration: 800,
        ease: 'outQuart',
        autoplay: false,
      });

      /* the last stub tears once everything has landed */
      stubAnim.then(() => {
        animate('.tear-end', {
          translateX: [0, 9],
          rotate: [0, 1.4],
          opacity: [1, 0.5],
          duration: 620,
          delay: 220,
          ease: 'outQuart',
        });
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (textAnim) textAnim.play();
          if (stubAnim) stubAnim.play();
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(root);

    return () => {
      observer.disconnect();
      if (scopeRef.current) scopeRef.current.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="bg-paper overflow-hidden px-5 py-14 sm:px-8 sm:py-16 md:py-24"
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-9 sm:gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-20">
        {/* ── text, left ─────────────────────────────────── */}
        <div className="lg:order-1">
          <h2 className="anime-text font-serif text-[2rem] leading-[1.06] tracking-[-0.015em] text-ink opacity-0 sm:text-5xl sm:leading-[1.04] lg:text-[3.4rem]">
            Money that runs out if you{' '}
            <em className="italic text-[#2C4E3E] " >
              don&apos;t
            </em>{' '}
            spend it.
          </h2>

          <p className="anime-text mt-4 max-w-[46ch] text-base leading-relaxed text-muted opacity-0 sm:mt-6 sm:text-lg">
            Every card benefit you&apos;re owed, with the date it disappears.
            Claim it from here, or let the assistant do it for you.
          </p>

          <dl className="anime-text mt-8 border-t border-ink/10 opacity-0 sm:mt-10">
            {ROWS.map((r) => (
              <div
                key={r.k}
                className="grid grid-cols-1 items-baseline gap-1 border-b border-ink/10 py-3.5 sm:grid-cols-[150px_1fr] sm:gap-6 sm:py-5"
              >
                <dt className="text-[11px] uppercase tracking-[0.16em] text-ink/45 sm:text-[11.5px]">
                  {r.k}
                </dt>
                <dd className="m-0 text-[15.5px] text-ink sm:text-[17px]">
                  {r.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ── panel, right ───────────────────────────────── */}
        <div className="lg:order-2">
          <div
            className="anime-stub rounded-[16px] p-4 opacity-0 sm:rounded-[22px] sm:px-[30px] sm:pb-[26px] sm:pt-[30px]"
            style={{ backgroundColor: INK }}
          >
            {/* header */}
            <div
              className="flex items-center justify-between border-b pb-3 sm:pb-[18px]"
              style={{ borderColor: 'rgba(245,242,234,0.12)' }}
            >
              <div
                className="flex items-center gap-2.5 text-[14px] sm:gap-3 sm:text-[15px]"
                style={{ color: 'rgba(245,242,234,0.92)' }}
              >
                <span
                  className="relative h-[20px] w-[20px] rounded-[5px] sm:h-[22px] sm:w-[22px] sm:rounded-[6px]"
                  style={{ backgroundColor: PAPER }}
                >
                  <span
                    className="absolute inset-[6px] rounded-[2px] sm:inset-[7px]"
                    style={{ backgroundColor: INK }}
                  />
                </span>
                Credits
              </div>
              <div
                className="hidden text-[10.5px] tracking-[0.18em] sm:block"
                style={{ color: 'rgba(245,242,234,0.42)' }}
              >
                3 CARDS ON FILE
              </div>
            </div>

            {/* stubs */}
            {CREDITS.map((c) => (
              <div
                key={c.name}
                className="anime-stub group mt-2 grid grid-cols-[1fr_92px] overflow-hidden rounded-[10px] opacity-0 transition-colors duration-300 sm:mt-4 sm:grid-cols-[1fr_120px] sm:rounded-[12px]"
                style={{
                  backgroundColor: c.claimed
                    ? 'rgba(245,242,234,0.03)'
                    : 'rgba(245,242,234,0.055)',
                }}
              >
                <div className="flex flex-col justify-center px-3.5 py-3 sm:px-[18px] sm:py-4">
                  <div
                    className="text-[14.5px] sm:text-[16px]"
                    style={{
                      color: c.claimed
                        ? 'rgba(245,242,234,0.34)'
                        : 'rgba(245,242,234,0.94)',
                    }}
                  >
                    {c.name}
                  </div>
                  <div
                    className="mt-[5px] hidden text-[12.5px] tracking-[0.02em] sm:block"
                    style={{ color: 'rgba(245,242,234,0.42)' }}
                  >
                    {c.meta}
                  </div>
                </div>

                <div
                  className={`relative flex flex-col items-end justify-center gap-[2px] px-3.5 py-3 transition-transform duration-300 sm:gap-[3px] sm:px-[18px] sm:py-4 ${c.claimed ? 'tear-end' : 'sm:group-hover:translate-x-[3px]'
                    }`}
                  style={{
                    backgroundColor: c.claimed
                      ? 'transparent'
                      : 'rgba(245,242,234,0.045)',
                  }}
                >
                  {/* perforation */}
                  <span
                    className="absolute bottom-2 left-0 top-2 w-[2px]"
                    style={PERF}
                  />
                  <span
                    className={`text-[16px] font-medium tabular-nums sm:text-[19px] ${c.claimed ? 'line-through' : ''
                      }`}
                    style={{
                      color: c.claimed ? 'rgba(245,242,234,0.34)' : PAPER,
                      textDecorationColor: 'rgba(245,242,234,0.3)',
                    }}
                  >
                    {c.amount}
                  </span>
                  <span
                    className="text-[9.5px] uppercase tracking-[0.09em] sm:text-[11px] sm:tracking-[0.1em]"
                    style={{
                      color: c.claimed ? MINT : 'rgba(245,242,234,0.45)',
                    }}
                  >
                    {c.expiry}
                  </span>
                </div>
              </div>
            ))}

            {/* footer */}
            <div
              className="anime-stub mt-4 flex items-baseline justify-between border-t pt-3 opacity-0 sm:mt-[22px] sm:pt-4"
              style={{ borderColor: 'rgba(245,242,234,0.12)' }}
            >
              <span
                className="text-[11px] uppercase tracking-[0.14em] sm:text-[12px]"
                style={{ color: 'rgba(245,242,234,0.42)' }}
              >
                Open on this card
              </span>
              <span
                className="text-[15px] font-medium tabular-nums sm:text-[17px]"
                style={{ color: PAPER }}
              >
                $400.00
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}