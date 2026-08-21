import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createScope } from 'animejs';
import { fadeUpOnScroll } from '../utils/animations';

/**
 * Subscriptions — two-panel split, interactive and tightened.
 *
 * - Cancel a subscription and the burn figure tweens down, its category segment
 *   shrinks, and the row offers Undo.
 * - Panels are smaller than the last pass: 900px max width, 6/7 padding,
 *   40/44px figure, so neither panel outweighs the heading.
 * - GREEN is a readable mint, used once, on money recovered.
 */

const GREEN = '#64B387';

const BASELINE = {
  Entertainment: 185.58,
  'SaaS and tools': 123.72,
  Health: 103.1,
};

const SUBS = [
  { id: 'netflix', initial: 'N', name: 'Netflix Premium', price: 22.99, note: 'unused 3 mo', category: 'Entertainment', cancellable: true },
  { id: 'spotify', initial: 'S', name: 'Spotify Family', price: 16.99, note: 'in use', category: 'Entertainment', cancellable: false },
  { id: 'adobe', initial: 'A', name: 'Adobe Cloud', price: 54.99, note: 'unused 1 mo', category: 'SaaS and tools', cancellable: true },
];

const SWATCH = {
  Entertainment: 'bg-paper',
  'SaaS and tools': 'bg-[#2C4E3E]',
  Health: 'bg-white/12',
};

const money = (n) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });

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
      const p = Math.min((t - start) / 520, 1);
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

export default function Subscriptions() {
  const root = useRef(null);
  const scope = useRef(null);
  const panelsRef = useRef(null);
  const inView = useInView(panelsRef);

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const [cancelled, setCancelled] = useState([]);

  const categories = useMemo(() => {
    const next = { ...BASELINE };
    cancelled.forEach((id) => {
      const sub = SUBS.find((s) => s.id === id);
      if (sub) next[sub.category] = Math.max(0, next[sub.category] - sub.price);
    });
    return next;
  }, [cancelled]);

  const total = Object.values(categories).reduce((a, b) => a + b, 0);
  const saved = cancelled.reduce((sum, id) => sum + (SUBS.find((s) => s.id === id)?.price || 0), 0);

  const shownTotal = useCountUp(total, reduced);
  const shownSaved = useCountUp(saved, reduced);
  const baseTotal = Object.values(BASELINE).reduce((a, b) => a + b, 0);

  useEffect(() => {
    scope.current = createScope({ root: root.current }).add(() => {
      fadeUpOnScroll('.sub-text', root.current, { staggerMs: 110, translateY: 24 });
    });
    return () => scope.current.revert();
  }, []);

  const toggle = (id) =>
    setCancelled((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <section ref={root} id="subscriptions" className="bg-ink text-white py-16 sm:py-32 lg:py-36">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8">

        <div className="mx-auto max-w-[560px] text-center">
          <h2 className="sub-text opacity-0 font-serif text-[2rem] leading-[1.2] tracking-[-0.015em] sm:text-[48px] lg:text-[3.4rem]">
            The ones you forgot keep adding up.
          </h2>
          <p className="sub-text opacity-0 mx-auto mt-6 max-w-[44ch] text-[17px] leading-[1.7] text-white/55">
            We find every recurring charge and cancel it for you, retention flow included.
          </p>
        </div>

        <div
          ref={panelsRef}
          className={`mx-auto mt-14 grid max-w-[920px] grid-cols-1 items-stretch gap-4 transition-all duration-500 ease-out md:grid-cols-2 md:gap-5 ${inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
        >

          {/* Detected */}
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.05] p-6 sm:p-7">
            <div className="flex items-center justify-between gap-4">
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">Detected</span>
              <span className="text-[10px] uppercase tracking-[0.14em] text-white/25">
                {SUBS.length - cancelled.length} active
              </span>
            </div>

            <div className="mt-3">
              {SUBS.map((s) => {
                const off = cancelled.includes(s.id);
                return (
                  <div
                    key={s.id}
                    className={`flex items-center justify-between gap-3 py-3.5 transition-opacity duration-300 ${s.cancellable ? '' : 'opacity-45'
                      }`}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className={`grid h-8 w-8 shrink-0 place-items-center rounded-[9px] text-[13px] font-medium transition-colors ${off ? 'bg-white/[0.04] text-white/35' : 'bg-white/[0.08]'
                          }`}
                      >
                        {s.initial}
                      </span>
                      <span className="min-w-0">
                        <span
                          className={`block truncate text-[13.5px] font-medium transition-colors ${off ? 'text-white/40 line-through decoration-white/25' : ''
                            }`}
                        >
                          {s.name}
                        </span>
                        <span className="mt-0.5 block truncate text-[11.5px] text-white/40">
                          <span className="font-medium tabular-nums">{money(s.price)}</span> / mo &middot;{' '}
                          {off ? 'cancelled' : s.note}
                        </span>
                      </span>
                    </div>

                    {s.cancellable && (
                      <button
                        type="button"
                        onClick={() => toggle(s.id)}
                        className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[11.5px] font-medium transition-colors active:translate-y-px ${off
                          ? 'border-white/20 text-white/45 hover:border-white/30 hover:text-white/70'
                          : 'border-white/20 text-white/75 hover:border-white/45 hover:text-white'
                          }`}
                      >
                        {off ? 'Undo' : 'Cancel'}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Burn */}
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.05] p-6 sm:p-7">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">Monthly burn</span>

            <p className="mt-2.5 text-[38px] font-medium leading-[1.05] tracking-[-0.02em] tabular-nums sm:text-[44px]">
              {money(shownTotal)}
            </p>

            <p className="mt-2 h-5 text-[13px] text-white/45">
              {saved > 0 ? (
                <span style={{ color: GREEN }} className="font-medium tabular-nums">
                  {money(shownSaved)} / mo recovered
                </span>
              ) : (
                'Across 5 connected cards'
              )}
            </p>

            <div className="mt-5 flex h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
              {Object.entries(categories).map(([label, value]) => (
                <div
                  key={label}
                  className={`h-full transition-[width] duration-500 ease-out ${SWATCH[label]}`}
                  style={{ width: `${(value / baseTotal) * 100}%` }}
                />
              ))}
            </div>

            <div className="mt-3">
              {Object.entries(categories).map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-4 border-b border-white/[0.08] py-3 text-[13.5px] text-white/65 last:border-b-0"
                >
                  <span className="flex min-w-0 items-center gap-2.5">
                    <span className={`h-2 w-2 shrink-0 rounded-[2px] ${SWATCH[label]}`} />
                    <span className="truncate">{label}</span>
                  </span>
                  <span className="shrink-0 font-medium tabular-nums text-white">{money(value)}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}