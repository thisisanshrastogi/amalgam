import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import DocLayout, { DocSection } from '../components/DocLayout';

/* ─── Data ──────────────────────────────────────────────────────────────── */
const CATEGORIES = [
  {
    id: 'security',
    label: 'Security & Privacy',
    items: [
      {
        q: 'Can Amalgamic move money out of my accounts?',
        a: 'Only to your own card issuer, and only when you tell it to. Access is otherwise read-only. We can cancel subscriptions, file disputes, and claim credits on your behalf. We cannot send funds anywhere else, including to us.',
      },
      {
        q: 'Do you see my bank password?',
        a: "No. Connections go through Plaid and Spinwheel. At most banks you sign in on your bank's own page..",
      },
      {
        q: 'What happens to my data if I leave?',
        a: "Deleting your account revokes connections at Plaid and Spinwheel and purges your records. A real backend process, not a toggle that hides data while keeping it. Details in the privacy policy.",
      },

      {
        q: 'Does connecting affect my credit score?',
        a: 'No. Reading your credit profile through Spinwheel is a soft inquiry.',
      },
    ],
  },
  {
    id: 'features',
    label: 'Features',
    items: [
      {
        q: 'Can I pay my credit card bills through Amalgamic?',
        a: 'Yes. Balances, minimums and due dates for every connected card on one calendar, payable from the app. If a connection needs re-authorising first, we tell you before the due date.',
      },
      {
        q: 'How does cancelling actually work?',
        a: 'For supported merchants we complete the cancellation flow on your behalf and confirm when it\'s done, including the retention steps designed to slow you down. For merchants we don\'t support yet, you get a direct link to the correct page and what you\'ll need ready. Coverage grows most weeks.',
      },
      {
        q: 'What if a dispute fails?',
        a: 'Sometimes they do. Disputes are decided by your issuer, not us. When one is declined we tell you why and, if there\'s a reasonable second route, what it is. We don\'t quietly close them.',
      },
      {
        q: 'Which banks and cards do you support?',
        a: 'More than 12,000 US institutions through Plaid and Spinwheel: national banks, regionals, credit unions and brokerages. Full picture on the supported banks page.',
      },
    ],
  },
  {
    id: 'assistant',
    label: 'Assistant',
    items: [
      {
        q: 'What can the assistant see?',
        a: "Your connected accounts, transactions, statements, and anything you've told it.It answers from that, cites external sources when it looks something up, and says so when it doesn't have the data rather than guessing.",
      },
    ],
  },

];

/* ─── Accordion item ─────────────────────────────────────────────────────── */
function FaqItem({ q, a, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const bodyRef = useRef(null);

  // animate max-height for smooth open/close
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    if (open) {
      el.style.maxHeight = el.scrollHeight + 'px';
    } else {
      el.style.maxHeight = '0';
    }
  }, [open]);

  return (
    <div className={`border-b border-glass-border ${open ? 'is-open' : ''}`}>
      <button
        className="w-full flex justify-between items-center gap-8 py-6 bg-transparent border-none cursor-pointer text-left transition-colors text-brand hover:text-accent group"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span className="font-serif text-[17px] font-medium">{q}</span>
        <ChevronDown
          className={`flex-shrink-0 text-accent transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          size={20}
          strokeWidth={2.2}
        />
      </button>
      <div
        className="overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out opacity-0"
        style={{ opacity: open ? 1 : 0 }}
        ref={bodyRef}
      >
        <p className="pb-7 text-muted text-base leading-relaxed max-w-[68ch]">
          {a}
        </p>
      </div>
    </div>
  );
}

/* ─── Main FAQ page ──────────────────────────────────────────────────────── */
export default function FAQ() {
  const totalQ = CATEGORIES.reduce((acc, c) => acc + c.items.length, 0);

  const GROUPS = [
    { title: 'Privacy', cats: ['security'] },
    { title: 'Product', cats: ['features', 'assistant'] },
  ];

  // Map to DocLayout format
  const docGroups = GROUPS.map(g => ({
    title: g.title,
    links: g.cats.map(catId => {
      const cat = CATEGORIES.find(c => c.id === catId);
      const idx = CATEGORIES.indexOf(cat);
      return {
        id: cat.id,
        num: String(idx + 1).padStart(2, '0'),
        label: cat.label
      };
    })
  }));

  return (
    <DocLayout
      groups={docGroups}
      headerProps={{
        category: "Resources / FAQ",
        title: (
          <>
            Questions people<br />
            <em className="italic opacity-80">actually</em> ask.
          </>
        ),
        lead: `${totalQ} answers covering security, billing, features, and fit. No marketing copy dressed as an answer.`,
      }}
    >
      {CATEGORIES.map((cat, idx) => (
        <DocSection
          key={cat.id}
          id={cat.id}
          num={`§${String(idx + 1).padStart(2, '0')}`}
          title={cat.label}
        >
          {cat.items.map((item, qi) => (
            <FaqItem
              key={qi}
              q={item.q}
              a={item.a}
              defaultOpen={idx === 0 && qi === 0}
            />
          ))}
        </DocSection>
      ))}

      {/* CTA block */}
      <div className="bg-glass-subtle border border-glass-border rounded-3xl p-10 md:p-14 my-16 grid md:grid-cols-[1fr_auto] gap-8 items-center shadow-sm">
        <div>
          <h2 className="font-serif text-3xl mb-2 text-brand">Still have a question?</h2>
          <p className="text-muted text-base">The fastest way to find out if it works for you is to let it scan.</p>
        </div>
        <div className="flex flex-col gap-4  items-start md:items-center">
          <a href="https://cards.amalgamic.io/dashboard" className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold bg-brand text-bg hover:bg-accent hover:-translate-y-0.5 transition-all whitespace-nowrap">
            Start saving in 60 Seconds <ArrowRight size={16} />
          </a>
          <div className="flex  gap-5">
            {/* <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Read-only access</span> */}
            {/* <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Revoke any time</span> */}
          </div>
        </div>
      </div>
    </DocLayout>
  );
}
