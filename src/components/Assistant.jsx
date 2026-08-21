import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createScope } from 'animejs';
import { fadeUpOnScroll } from '../utils/animations';

/**
 * Assistant (Insights) — chat, not prose.
 *
 * Both sides are bubbles. Assistant turns carry an avatar, a compact data block
 * where there is data, and one short line of takeaway. Everything the answers
 * claim is in the product brief: it reads the credit file and transactions,
 * remembers facts the user tells it, researches public card facts with sources,
 * and starts actions. It does not book, transfer, or invent numbers.
 *
 * GREEN is a readable mint; `accent` (dark pine) disappears on ink.
 */

const GREEN = '#64B387';

const NODES = {
  credit: {
    q: "How's my credit health?",
    status: ['Reading your credit file'],
    stat: { value: '742', label: 'Good standing' },
    rows: [
      ['Utilization', '31%'],
      ['On-time streak', '24 months'],
    ],
    text: 'Utilization is the only real drag.',
    chips: ['minimum', 'paydown'],
  },

  minimum: {
    q: 'What if I only pay the minimum?',
    status: ['Running the payoff projection'],
    rows: [
      ['Payoff time', '11 yr 4 mo'],
      ['Interest paid', '$4,120.00'],
    ],
    accent: '$4,120.00',
    text: 'That turns $1,204.60 into $5,324.60.',
    action: 'Pay now',
    chips: ['skip', 'subs'],
  },

  paydown: {
    q: 'Which card should I pay down first?',
    status: ['Comparing your cards'],
    rows: [
      ['Chase Sapphire · 31% used', '$1,204.60'],
      ['Citi Double Cash · 12% used', '$310.40'],
    ],
    text: 'Sapphire first. Higher APR on file, and it is the one moving your utilization.',
    chips: ['minimum', 'subs'],
  },

  skip: {
    q: "What if I don't pay for 3 months?",
    status: ['Running the projection'],
    rows: [
      ['Interest accrued', '$133.60'],
      ['Late fees', '2 likely'],
    ],
    text: 'The late mark on a 24-month clean streak costs more than the interest.',
    chips: ['minimum', 'points'],
  },

  subs: {
    q: 'Review my subscriptions',
    status: ['Checking recurring charges'],
    rows: [
      ['Netflix · unused 3 mo', '$22.99'],
      ['Adobe Cloud · unused 1 mo', '$54.99'],
      ['Spotify · in use', '$16.99'],
    ],
    text: 'Two of the three have not been touched since June.',
    action: 'Cancel Netflix',
    chips: ['points', 'fees'],
  },

  points: {
    q: 'Plan a week in Japan with my Sapphire points',
    status: ['Checking saved card facts', 'Searching the web'],
    memory: 'Saved: 42,500 Sapphire points at 1.5¢',
    rows: [
      ['Transfer to ANA', '~$680 of flights'],
      ['Transfer to Hyatt', '5 nights, off-peak'],
      ['Portal booking', '$531'],
    ],
    text: 'Transferring beats the portal at your own valuation. Hyatt goes furthest.',
    source: 'chase.com +2',
    chips: ['tokyo', 'fees'],
  },

  tokyo: {
    q: 'Which card should I use in Tokyo?',
    status: ['Searching the web'],
    text: 'Sapphire. No foreign transaction fee, and 3x on dining abroad.',
    source: 'chase.com',
    chips: ['points', 'credit'],
  },

  fees: {
    q: 'Show me fees this month',
    status: ['Scanning six months of charges'],
    rows: [
      ['Airline incidental fee', '$200.00'],
      ['Interest charged', '$31.40'],
    ],
    text: 'The airline fee looks avoidable.',
    action: 'Raise a dispute',
    chips: ['subs', 'credit'],
  },
};

const OFF_TOPIC = /weather|news|sport|poem|joke|recipe|code|homework|movie|football|cricket/i;

const CONNECT = {
  text: 'I can answer that against your real cards once they are connected. About two minutes.',
  cta: { label: 'Get started', href: 'https://cards.amalgamic.io/auth/signin' },
  chips: ['credit', 'subs'],
};

const REFUSAL = {
  text: 'I can only help with your financial data. Try subscriptions, spending, bills, or credit health.',
  chips: ['subs', 'fees'],
};

/* ---------- helpers ---------- */

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

function Reveal({ children, className = '' }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setOn(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return (
    <div
      className={`${className} transition-all duration-300 ease-out ${on ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
        }`}
    >
      {children}
    </div>
  );
}

const Mark = () => (
  <span className="mt-1 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-[5px] bg-white/10">
    <span className="block h-[6px] w-[6px] rounded-[1px] bg-white/70" />
  </span>
);

function Working({ label }) {
  return (
    <Reveal className="flex items-start gap-2.5">
      <Mark />
      <span className="flex items-center gap-2.5 rounded-[14px] rounded-bl-[4px] bg-white/[0.05] px-3.5 py-3">
        <span className="flex gap-1" aria-hidden="true">
          {[0, 150, 300].map((d) => (
            <span
              key={d}
              className="block h-[3px] w-[3px] animate-pulse bg-white/45"
              style={{ animationDelay: `${d}ms` }}
            />
          ))}
        </span>
        <span className="text-[11px] uppercase tracking-[0.12em] text-white/35">{label}</span>
      </span>
    </Reveal>
  );
}

/* ---------- section ---------- */

export default function Assistant() {
  const root = useRef(null);
  const scope = useRef(null);
  const panelRef = useRef(null);
  const streamRef = useRef(null);
  const timers = useRef([]);
  const seq = useRef(0);

  const inView = useInView(panelRef);
  const [items, setItems] = useState([]);
  const [working, setWorking] = useState(null);
  const [busy, setBusy] = useState(false);
  const [draft, setDraft] = useState('');

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const push = useCallback((msg) => {
    seq.current += 1;
    setItems((prev) => [...prev, { ...msg, id: seq.current }]);
  }, []);

  useEffect(() => {
    scope.current = createScope({ root: root.current }).add(() => {
      fadeUpOnScroll('.asst-text', root.current, { staggerMs: 90, translateY: 22 });
      fadeUpOnScroll('.asst-row', root.current, { staggerMs: 80, delay: 240, translateY: 14 });
      fadeUpOnScroll('.asst-foot', root.current, { delay: 500, translateY: 10 });
    });
    return () => scope.current.revert();
  }, []);

  const answer = useCallback(
    (node) => {
      if (reduced) {
        push({ role: 'assistant', ...node });
        setBusy(false);
        return;
      }
      const statuses = node.status && node.status.length ? node.status : ['Checking your data'];
      let at = 200;
      statuses.forEach((label) => {
        timers.current.push(setTimeout(() => setWorking(label), at));
        at += 750;
      });
      timers.current.push(
        setTimeout(() => {
          setWorking(null);
          push({ role: 'assistant', ...node });
          setBusy(false);
        }, at)
      );
    },
    [push, reduced]
  );

  const askNode = useCallback(
    (key) => {
      if (busy) return;
      const node = NODES[key];
      if (!node) return;
      setBusy(true);
      push({ role: 'user', text: node.q });
      answer(node);
    },
    [answer, busy, push]
  );

  useEffect(() => {
    if (!inView) return;
    const node = NODES.credit;
    if (reduced) {
      setItems([
        { id: 1, role: 'user', text: node.q },
        { id: 2, role: 'assistant', ...node },
      ]);
      seq.current = 2;
      return;
    }
    setBusy(true);
    timers.current.push(
      setTimeout(() => {
        push({ role: 'user', text: node.q });
        answer(node);
      }, 400)
    );
    const list = timers.current;
    return () => list.forEach(clearTimeout);
  }, [inView, reduced, push, answer]);

  useEffect(() => {
    const el = streamRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [items, working]);

  const runAction = (label) => {
    if (busy) return;
    setBusy(true);
    push({ role: 'user', text: label });
    answer({ ...CONNECT, status: ['Opening the flow'] });
  };

  const submit = (e) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text || busy) return;
    setDraft('');
    setBusy(true);
    push({ role: 'user', text });
    answer(OFF_TOPIC.test(text) ? { ...REFUSAL, status: ['Checking scope'] } : CONNECT);
  };

  const lastAssistant = [...items].reverse().find((m) => m.role === 'assistant');

  return (
    <section ref={root} id="assistant" className="bg-paper text-ink py-16 sm:py-32 lg:py-36">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-14 px-6 sm:px-8 lg:grid-cols-2 lg:gap-24">

        {/* Chat */}
        <div
          ref={panelRef}
          className={`flex h-[520px] w-full flex-col rounded-2xl bg-ink p-4 text-white transition-all duration-500 ease-out sm:h-[580px] sm:p-6 ${inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
        >
          <div className="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 px-1 pb-4">
            <div className="flex items-center gap-3">
              <span className="grid h-[22px] w-[22px] place-items-center rounded-[6px] bg-paper">
                <span className="block h-2 w-2 rounded-[2px] bg-ink" />
              </span>
              <span className="text-[13.5px] font-medium">Assistant</span>
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">3 cards on file</span>
          </div>

          <div
            ref={streamRef}
            className="flex-1 space-y-4 overflow-y-auto px-1 py-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {items.map((m) =>
              m.role === 'user' ? (
                <Reveal key={m.id} className="flex">
                  <p className="ml-auto max-w-[82%] rounded-[16px] rounded-br-[5px] bg-white/[0.09] px-4 py-2.5 text-[14px] leading-[1.55] text-white/85">
                    {m.text}
                  </p>
                </Reveal>
              ) : (
                <Reveal key={m.id} className="flex items-start gap-2.5">
                  <Mark />
                  <div className="min-w-0 max-w-[88%]">
                    <div className="rounded-[16px] rounded-bl-[5px] bg-white/[0.05] px-4 py-3">
                      {m.memory && (
                        <p className="mb-2.5 text-[11px] uppercase tracking-[0.12em] text-white/35">{m.memory}</p>
                      )}

                      {m.stat && (
                        <div className="mb-2.5 flex items-baseline gap-2.5">
                          <span className="text-[28px] font-medium leading-none tracking-[-0.02em] tabular-nums">
                            {m.stat.value}
                          </span>
                          <span className="text-[12.5px] text-white/45">{m.stat.label}</span>
                        </div>
                      )}

                      {m.rows && (
                        <div className="mb-3 border-t border-white/10">
                          {m.rows.map(([label, value]) => (
                            <div
                              key={label}
                              className="flex items-center justify-between gap-4 border-b border-white/10 py-2 text-[12.5px] text-white/55 last:border-b-0"
                            >
                              <span className="truncate">{label}</span>
                              <span
                                className="shrink-0 font-medium tabular-nums"
                                style={{ color: m.accent === value ? GREEN : '#fff' }}
                              >
                                {value}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      <p className="text-[14px] leading-[1.6] text-[#F5F2EA]/90">{m.text}</p>

                      {m.source && (
                        <span className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-white/12 px-2 py-[3px] text-[10.5px] text-white/45">
                          <span className="block h-2 w-2 rounded-[2px] bg-white/30" />
                          {m.source}
                        </span>
                      )}

                      {m.action && (
                        <button
                          type="button"
                          onClick={() => runAction(m.action)}
                          disabled={busy}
                          className="mt-3 block rounded-full bg-paper px-4 py-2 text-[12px] font-medium text-ink transition-colors hover:bg-white active:translate-y-px disabled:opacity-40"
                        >
                          {m.action}
                        </button>
                      )}

                      {m.cta && (
                        <a
                          href={m.cta.href}
                          className="mt-3 inline-block rounded-full bg-paper px-4 py-2 text-[12px] font-medium text-ink transition-colors hover:bg-white active:translate-y-px"
                        >
                          {m.cta.label}
                        </a>
                      )}
                    </div>

                    {m.chips && lastAssistant && m.id === lastAssistant.id && !working && (
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        {m.chips.map((key) => (
                          <button
                            key={key}
                            type="button"
                            onClick={() => askNode(key)}
                            disabled={busy}
                            className="rounded-full border border-white/15 px-3 py-1.5 text-left text-[12px] text-white/55 transition-colors hover:border-white/35 hover:text-white active:translate-y-px disabled:opacity-40"
                          >
                            {NODES[key].q}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </Reveal>
              )
            )}

            {working && <Working label={working} />}
          </div>

          <form
            onSubmit={submit}
            className="flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-5 pr-1.5 transition-colors focus-within:border-white/25"
          >
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Ask anything about your cards"
              aria-label="Ask Insights"
              className="min-w-0 flex-1 bg-transparent text-[13.5px] text-white outline-none placeholder:text-white/30"
            />
            <button
              type="submit"
              disabled={busy || !draft.trim()}
              className="shrink-0 rounded-full bg-paper px-4 py-2 text-[12px] font-medium text-ink transition-all hover:bg-white active:translate-y-px disabled:opacity-30"
            >
              Ask
            </button>
          </form>
        </div>

        {/* Copy */}
        <div className="min-w-0">
          <h2 className="asst-text opacity-0 font-serif text-[2rem] leading-[1.2] tracking-[-0.015em] sm:text-[48px] lg:text-[3.4rem] lg:leading-[1.2]">
            An Assistant that already knows your cards.
          </h2>
          <p className="asst-text opacity-0 mt-6 max-w-[38ch] text-[18px] leading-[1.7] text-ink/55">
            Ask about spending, bills, and credit. Tell it your points once.
          </p>

          <div className="mt-12 border-t border-ink/15 sm:mt-14">
            {[
              ['Knows', 'Your cards, transactions, and credit file.'],
              ['Researches', 'Transfer partners and promos, with sources.'],
              ['Acts', 'Pay, cancel, or dispute from the chat.'],
            ].map(([label, copy]) => (
              <div
                key={label}
                className="asst-row opacity-0 grid grid-cols-1 gap-1.5 border-b border-ink/15 py-5 sm:grid-cols-[112px_1fr] sm:gap-8 sm:py-6"
              >
                <span className="text-[10px] uppercase tracking-[0.2em] text-ink/40 sm:pt-[4px]">{label}</span>
                <p className="text-[15px] leading-[1.7] text-ink/70">{copy}</p>
              </div>
            ))}
          </div>

          <p className="asst-foot opacity-0 mt-8 text-[14px] leading-relaxed text-ink/45">
            It never guesses a number. If it doesn't have the data, it asks.
          </p>
        </div>


      </div>
    </section>
  );
}