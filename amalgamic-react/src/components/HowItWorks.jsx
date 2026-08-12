import React from 'react';

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 px-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-24">
          <span className="text-accent text-xs font-bold uppercase tracking-widest mb-6 block">How it works</span>
          <h2 className="font-serif text-5xl leading-tight text-brand">
            Connect once. Decide when it matters.<br/>That's the whole job.
          </h2>
        </div>
        <div className="grid md:grid-cols-4 gap-12">
          <div className="relative">
            <div className="text-5xl font-serif text-accent/10 mb-6">01</div>
            <h3 className="font-serif text-2xl text-brand mb-4">Connect your cards</h3>
            <p className="text-muted leading-relaxed text-[15px]">
              You link your credit cards through Plaid and Spinwheel. Amalgamic finds cards you may have forgotten you hold, along with their balances, limits and due dates.
            </p>
          </div>
          <div className="relative">
            <div className="text-5xl font-serif text-accent/10 mb-6">02</div>
            <h3 className="font-serif text-2xl text-brand mb-4">We tell you what changed</h3>
            <p className="text-muted leading-relaxed text-[15px]">
              Amalgamic reads statements continuously, and surfaces the few things that actually matter this month. Not a dashboard—a short list of what's different.
            </p>
          </div>
          <div className="relative">
            <div className="text-5xl font-serif text-accent/10 mb-6">03</div>
            <h3 className="font-serif text-2xl text-brand mb-4">Ask about any of it</h3>
            <p className="text-muted leading-relaxed text-[15px]">
              Every insight opens into a conversation. Ask why the statement is higher or what happens if you pay the minimum. It answers from your own accounts.
            </p>
          </div>
          <div className="relative">
            <div className="text-5xl font-serif text-accent/10 mb-6">04</div>
            <h3 className="font-serif text-2xl text-brand mb-4">Hand it over</h3>
            <p className="text-muted leading-relaxed text-[15px]">
              Cancel this, dispute that, claim this credit. One tap, and the tedious part after it is ours. Money goes back to your original account.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
