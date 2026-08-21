import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createScope, animate, onScroll } from 'animejs';
import { fadeUpOnScroll } from '../utils/animations';

/**
 * Payment calendar — interactive, fixed structure.
 *
 * The panel never collapses. Header, featured block, week rail and card list are
 * always rendered; only their state changes:
 *   due → paying → paid → (advance) → next card, and finally "all settled",
 * which still shows the rail and the list rather than swapping the panel out.
 *
 * Mock month: October 2024, the 1st is a Tuesday, TODAY is the 5th.
 */

const GREEN = '#64B387';
const TODAY = 5;
const WEEK_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const INITIAL = [
  { id: 'amex', name: 'Amex Platinum', amount: 862.0, due: 3, paid: true },
  { id: 'chase', name: 'Chase Sapphire', amount: 1204.6, due: 9, paid: false },
  { id: 'citi', name: 'Citi Double Cash', amount: 310.4, due: 22, paid: false },
];

const money = (n) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });

/** Mon..Sun of the week containing `day`. Values <= 0 belong to September. */
const weekOf = (day) => {
  const monday = day - (day % 7);
  return Array.from({ length: 7 }, (_, i) => monday + i);
};

function useCountUp(value, reduced) {
  const [shown, setShown] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    if (reduced) {
      setShown(value);
      from.current = value;
      return;
    }
    const start = performance.now();
    const a = from.current;
    const b = value;
    let raf;
    const tick = (t) => {
      const p = Math.min((t - start) / 420, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setShown(a + (b - a) * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else from.current = b;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, reduced]);
  return shown;
}

function useInView(ref) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, seen]);
  return seen;
}

export default function CardsAndBillPay() {
  const root = useRef(null);
  const scope = useRef(null);
  const panelRef = useRef(null);
  const timer = useRef(null);
  const inView = useInView(panelRef);

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [cards, setCards] = useState(INITIAL);
  const [selected, setSelected] = useState('chase');
  const [phase, setPhase] = useState('idle'); // idle | paying | settled

  const active = cards.find((c) => c.id === selected);
  const outstanding = cards.filter((c) => !c.paid);
  const allSettled = outstanding.length === 0;
  const nextDue = outstanding.slice().sort((a, b) => a.due - b.due)[0];

  const amount = useCountUp(active ? active.amount : 0, reduced);
  const rail = useMemo(() => weekOf(active ? active.due : TODAY + 4), [active]);

  useEffect(() => {
    scope.current = createScope({ root: root.current }).add(() => {
      fadeUpOnScroll('.pay-text', root.current, { staggerMs: 90, translateY: 22 });
      fadeUpOnScroll('.pay-row', root.current, { staggerMs: 90, delay: 240, translateY: 14 });

      animate('.hourglass-parallax', {
        translateY: [-150, 150],
        ease: 'linear',
        autoplay: onScroll({
          target: root.current,
          start: 'top bottom',
          end: 'bottom top',
          sync: true,
        })
      });
    });
    return () => scope.current.revert();
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  const pay = () => {
    if (!active || active.paid || phase === 'paying') return;
    setPhase('paying');
    timer.current = setTimeout(
      () => {
        setCards((prev) => prev.map((c) => (c.id === active.id ? { ...c, paid: true } : c)));
        setPhase('settled');
      },
      reduced ? 0 : 700
    );
  };

  const advance = () => {
    const next = cards.filter((c) => !c.paid).sort((a, b) => a.due - b.due)[0];
    if (next) setSelected(next.id);
    setPhase('idle');
  };

  const select = (id) => {
    setSelected(id);
    setPhase('idle');
  };

  const reset = () => {
    setCards(INITIAL);
    setSelected('chase');
    setPhase('idle');
  };

  const daysAway = active ? active.due - TODAY : 0;
  const label =
    phase === 'paying'
      ? 'Paying'
      : active?.paid
        ? phase === 'settled'
          ? 'Paid just now'
          : 'Settled'
        : 'Next payment';
  const chip =
    phase === 'paying'
      ? 'Sending'
      : active?.paid
        ? `Oct ${active.due}`
        : daysAway <= 0
          ? 'Due today'
          : `Due in ${daysAway} days`;

  return (
    <section ref={root} id="bills" className="relative overflow-hidden bg-paper text-ink py-24 sm:py-32 lg:py-36">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-1/4 md:block md:w-[520px] lg:w-[720px]">
          <img
            src="/hourglassless.png"
            alt=""
            aria-hidden="true"
            className="hourglass-parallax w-full h-auto opacity-[0.1]"
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-14 px-6 sm:px-8 lg:grid-cols-2 lg:gap-24">

        {/* Copy */}
        <div className="min-w-0">
          <h2 className="pay-text opacity-0 font-serif text-[34px] leading-[1.08] tracking-[-0.015em] sm:text-[42px] lg:text-5xl">
            Every balance, every due date. Then the payment.
          </h2>
          <p className="pay-text opacity-0 mt-6 max-w-[40ch] text-[18px] leading-[1.7] text-ink/55">
            One calendar for every card on your credit file, including the ones a transaction feed alone would miss.
          </p>

          <div className="mt-12 border-t border-ink/15 sm:mt-14">
            <div className="pay-row opacity-0 grid grid-cols-1 gap-2 border-b border-ink/15 py-6 sm:grid-cols-[112px_1fr] sm:gap-8 sm:py-7">
              <span className="text-[10px] uppercase tracking-[0.2em] text-ink/40 sm:pt-[5px]">Calendar</span>
              <p className="text-[15px] leading-[1.75] text-ink/70">What's due, when, and what waiting costs you.</p>
            </div>
            <div className="pay-row opacity-0 grid grid-cols-1 gap-2 border-b border-ink/15 py-6 sm:grid-cols-[112px_1fr] sm:gap-8 sm:py-7">
              <span className="text-[10px] uppercase tracking-[0.2em] text-ink/40 sm:pt-[5px]">Payment</span>
              <p className="text-[15px] leading-[1.75] text-ink/70">Settle from here. No issuer portals.</p>
            </div>
          </div>
        </div>

        {/* Panel: structure is fixed, only states change */}
        <div
          ref={panelRef}
          className={`w-full rounded-2xl bg-ink p-5 text-white transition-all duration-500 ease-out sm:p-7 ${inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-4">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">
              {allSettled && phase !== 'settled' ? 'October, settled' : label}
            </span>
            <span
              className="rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] transition-colors"
              style={{
                background: 'rgba(255,255,255,0.06)',
                color: active?.paid ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.6)',
              }}
            >
              {allSettled && phase !== 'settled' ? 'Nothing due' : chip}
            </span>
          </div>

          {/* Featured */}
          <div className="mt-5 flex min-h-[104px] flex-wrap items-end justify-between gap-x-6 gap-y-5">
            <div className="min-w-0">
              <p
                className="text-[40px] font-medium leading-none tracking-[-0.02em] tabular-nums transition-colors duration-300 sm:text-[46px]"
                style={{ color: active?.paid ? 'rgba(255,255,255,0.4)' : '#fff' }}
              >
                {money(amount)}
              </p>
              <p className="mt-3 truncate text-[13.5px] text-white/45">
                {active ? `${active.name} · Oct ${active.due}` : 'No card selected'}
                {active?.paid && phase === 'settled' && (
                  <span className="ml-2" style={{ color: GREEN }}>
                    Paid
                  </span>
                )}
              </p>
            </div>

            <div className="w-full sm:w-auto">
              {!active?.paid && (
                <button
                  type="button"
                  onClick={pay}
                  disabled={phase === 'paying'}
                  className="w-full rounded-full bg-paper px-5 py-3 text-[12px] font-medium text-ink transition-colors hover:bg-white active:translate-y-px disabled:opacity-60 sm:w-auto"
                >
                  {phase === 'paying' ? 'Paying' : 'Pay balance'}
                </button>
              )}

              {active?.paid && !allSettled && (
                <button
                  type="button"
                  onClick={advance}
                  className="w-full rounded-full border border-white/20 px-5 py-3 text-[12px] font-medium text-white/75 transition-colors hover:border-white/45 hover:text-white active:translate-y-px sm:w-auto"
                >
                  Next payment
                </button>
              )}

              {active?.paid && allSettled && (
                <button
                  type="button"
                  onClick={reset}
                  className="w-full rounded-full border border-white/20 px-5 py-3 text-[12px] font-medium text-white/75 transition-colors hover:border-white/45 hover:text-white active:translate-y-px sm:w-auto"
                >
                  Replay
                </button>
              )}
            </div>
          </div>

          {/* Week rail */}
          <div className="mt-7 border-t border-white/10 pt-6">
            <div className="grid grid-cols-7 gap-1 text-center sm:gap-2">
              {rail.map((value, i) => {
                const day = value <= 0 ? 30 + value : value;
                const outside = value <= 0 || value > 31;
                const card = outside ? null : cards.find((c) => c.due === value);
                const isSelected = card && card.id === selected;
                return (
                  <div key={`${value}-${i}`} className="min-w-0">
                    <div className="mb-2 text-[10px] uppercase tracking-[0.12em] text-white/25">
                      {WEEK_LABELS[i]}
                    </div>
                    <button
                      type="button"
                      disabled={!card}
                      onClick={() => card && select(card.id)}
                      aria-label={card ? `${card.name}, October ${day}` : `October ${day}`}
                      className={`relative flex h-10 w-full items-center justify-center rounded-[10px] text-[13px] tabular-nums transition-colors sm:h-11 ${isSelected
                          ? 'bg-white/[0.10] text-white'
                          : outside
                            ? 'text-white/15'
                            : card
                              ? 'text-white/70 hover:bg-white/[0.06]'
                              : 'cursor-default text-white/40'
                        }`}
                    >
                      {day}
                      {card && (
                        <span
                          className="absolute bottom-[6px] block h-[2px] w-3 transition-colors"
                          style={{
                            background: card.paid
                              ? 'rgba(255,255,255,0.28)'
                              : isSelected
                                ? GREEN
                                : 'rgba(255,255,255,0.45)',
                          }}
                        />
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Card list, always all three */}
          <div className="mt-7 border-t border-white/10 pt-2">
            {cards.map((c) => {
              const isSelected = c.id === selected;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => select(c.id)}
                  className={`-mx-2 flex w-[calc(100%+1rem)] items-center justify-between gap-4 rounded-[10px] px-2 py-3 text-left text-[13.5px] transition-colors ${isSelected ? 'bg-white/[0.05]' : 'hover:bg-white/[0.03]'
                    }`}
                >
                  <span className="flex min-w-0 items-center gap-2.5">
                    <span
                      className="h-[6px] w-[6px] shrink-0 rounded-[1px]"
                      style={{
                        background: c.paid ? 'rgba(255,255,255,0.25)' : isSelected ? GREEN : 'rgba(255,255,255,0.45)',
                      }}
                    />
                    <span className={`truncate ${c.paid ? 'text-white/45' : 'text-white'}`}>{c.name}</span>
                  </span>
                  <span className="shrink-0 text-white/45">
                    {c.paid ? `Paid Oct ${c.due}` : `Due Oct ${c.due}`} &middot;{' '}
                    <span className={`font-medium tabular-nums ${c.paid ? '' : 'text-white/75'}`}>
                      {money(c.amount)}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Footer line, stable height */}
          <div className="mt-3 flex items-center justify-between gap-4 border-t border-white/10 pt-4 text-[12px] text-white/35">
            <span>{outstanding.length} outstanding</span>
            <span className="tabular-nums">
              {nextDue ? `Next: ${nextDue.name}, Oct ${nextDue.due}` : 'All settled for October'}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}