import React from 'react';
import { ArrowRight } from 'lucide-react';
import DocLayout, { DocSection } from '../components/DocLayout';

export default function About() {
  const groups = [
    {
      title: "The company",
      links: [
        { id: "what", num: "01", label: "What we do" },
        { id: "who", num: "02", label: "Who it's for" }
      ]
    },
    {
      title: "How we work",
      links: [
        { id: "approach", num: "03", label: "Operating principles" },
        { id: "stack", num: "04", label: "How we connect" }
      ]
    },
    {
      title: "Next",
      links: [
        { id: "reach", num: "05", label: "Get in touch" }
      ]
    }
  ];

  return (
    <DocLayout
      groups={groups}
      headerProps={{
        category: "Company / About",
        title: "About",
        lead: "For high earners who build wealth, not track pennies. We execute the tedious financial admin in the shadows, so you don't have to."
      }}
    >
      <DocSection id="what" num="§01" title="What we do">
        <p>Cardholders leave money behind constantly. A subscription nobody cancelled. A late fee that should have been waived. A statement credit that expired unclaimed. Each one is too small to be worth an afternoon on the phone, and collectively they are worth a great deal.</p>
        <p>Amalgamic connects to your accounts, finds those amounts, and recovers them — cancelling, disputing and claiming on your behalf. You approve the objective; we handle the admin.</p>
      </DocSection>

      <DocSection id="who" num="§02" title="Who it's for">
        <p>People whose time is worth more than the amounts being chased. If an hour of your attention is worth more than the $45 late fee, the rational move is to ignore it — which is exactly why these amounts go unclaimed, and exactly the gap Amalgamic exists to close.</p>

        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="bg-glass-subtle border border-glass-border p-6 rounded-xl shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand block mb-3">Fit</span>
            <h4 className="font-bold text-brand mb-2">You carry premium cards</h4>
            <p className="text-sm">Annual-fee cards come with credits, offers and protections that mostly go unused because tracking them is a job.</p>
          </div>
          <div className="bg-glass-subtle border border-glass-border p-6 rounded-xl shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand block mb-3">Fit</span>
            <h4 className="font-bold text-brand mb-2">You delegate by default</h4>
            <p className="text-sm">You would rather state an objective once than manage a process. Text what you want; we execute it.</p>
          </div>
          <div className="bg-glass-subtle border border-glass-border p-6 rounded-xl shadow-sm md:col-span-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted block mb-3">Not a fit</span>
            <h4 className="font-bold text-brand mb-2">You enjoy the optimising</h4>
            <p className="text-sm">If you already track every credit and file your own disputes, you are doing what we do — and you are probably doing it well.</p>
          </div>
        </div>
      </DocSection>

      <DocSection id="approach" num="§03" title="Operating principles">
        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="bg-glass-subtle border border-glass-border p-6 rounded-xl shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted block mb-3">Principle</span>
            <h4 className="font-bold text-brand mb-2">Read-only by default</h4>
            <p className="text-sm">We never receive your bank login, and we cannot move money between accounts. Access is granted through Plaid or Spinwheel and is revocable at either end.</p>
          </div>
          <div className="bg-glass-subtle border border-glass-border p-6 rounded-xl shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted block mb-3">Principle</span>
            <h4 className="font-bold text-brand mb-2">Quiet by design</h4>
            <p className="text-sm">The work happens in the background. You should hear from us when something has been recovered, not while it is being chased.</p>
          </div>
          <div className="bg-glass-subtle border border-glass-border p-6 rounded-xl shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted block mb-3">Principle</span>
            <h4 className="font-bold text-brand mb-2">Your data stays yours</h4>
            <p className="text-sm">We never sell your financial data, and we never train AI models on it. Full detail in the <a href="/privacy">privacy policy</a>.</p>
          </div>
          <div className="bg-glass-subtle border border-glass-border p-6 rounded-xl shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted block mb-3">Principle</span>
            <h4 className="font-bold text-brand mb-2">Recoveries are yours</h4>
            <p className="text-sm">Money we find belongs to you. It goes back to the account it came from, not to a balance you have to withdraw.</p>
          </div>
        </div>
      </DocSection>

      <DocSection id="stack" num="§04" title="How we connect">
        <p>We do not integrate with banks one at a time. Two regulated data providers do that work, which is why coverage reaches more than 12,000 US institutions rather than a handful of national names.</p>

        <div className="my-6 space-y-3">
          <div className="flex flex-col sm:flex-row gap-4 bg-glass-subtle border border-glass-border p-5 rounded-xl shadow-sm items-baseline">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted sm:w-24 flex-none">Plaid</span>
            <p className="text-sm m-0">Transaction and balance data across national banks, regionals, credit unions and brokerages. Larger institutions use OAuth, so you log in on your bank's own page.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 bg-glass-subtle border border-glass-border p-5 rounded-xl shadow-sm items-baseline">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted sm:w-24 flex-none">Spinwheel</span>
            <p className="text-sm m-0">Liability and debt accounts — loans, lines of credit and balances that transaction feeds alone tend to miss.</p>
          </div>
        </div>
        <p>The full picture is on the <a href="/supported-banks">supported banks</a> page.</p>
      </DocSection>

      <DocSection id="reach" num="§05" title="Get in touch">
        <p>Questions about the product, the company, or anything else — the <a href="/contact">contact page</a> has the right address for each.</p>
      </DocSection>

      {/* CTA block */}
      <div className="bg-glass-subtle border border-glass-border rounded-3xl p-10 md:p-14 my-16 grid md:grid-cols-[1fr_auto] gap-8 items-center shadow-sm">
        <div>
          <h2 className="font-serif text-3xl mb-2 text-brand">Ready to automate your finances?</h2>
          <p className="text-muted text-base">Connect your accounts once. We handle the admin from there.</p>
        </div>
        <div className="flex flex-col gap-4 items-start md:items-end">
          <a href="https://cards.amalgamic.io/dashboard" className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold bg-brand text-bg hover:bg-accent hover:-translate-y-0.5 transition-all whitespace-nowrap">
            Start Saving in 60 Seconds <ArrowRight size={16} />
          </a>
          <div className="flex gap-5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Read-only access</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Revoke any time</span>
          </div>
        </div>
      </div>

    </DocLayout>
  );
}
