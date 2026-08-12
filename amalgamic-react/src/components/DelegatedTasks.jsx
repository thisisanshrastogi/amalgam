import React from 'react';

export default function DelegatedTasks() {
  return (
    <section className="py-32 bg-accent/5 border-y border-border px-8">
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-20 items-center">
        <div className="order-2 md:order-1 relative">
          <div className="max-w-md mx-auto space-y-8">
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-bold text-muted uppercase tracking-widest self-end mr-4">You • 9:41 AM</span>
              <div className="bg-brand text-bg chat-bubble-user p-5 self-end max-w-[85%] shadow-md">
                <p className="text-[15px] leading-relaxed">Dispute the $200 baggage fee on my Amex. The flight was delayed six hours.</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-bold text-muted uppercase tracking-widest ml-4">Amalgamic • 11:22 AM</span>
              <div className="bg-surface border border-accent/20 chat-bubble-ai p-5 self-start max-w-[90%] shadow-xl">
                <p className="text-[15px] leading-relaxed text-brand">
                  <strong className="block mb-2">Dispute filed with Amex.</strong>
                  Reference #AMX-992. Supporting claim drafted under DOT delay rules and submitted to the airline. Provisional credit of $200 applied to your account.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <span className="text-accent text-xs font-bold uppercase tracking-widest mb-6 block">Delegated tasks</span>
          <h2 className="font-serif text-5xl leading-tight mb-8 text-brand">
            Say what you want to happen. We do the rest.
          </h2>
          <p className="text-muted text-lg leading-relaxed mb-10">
            Tell Amalgamic what needs sorting, in plain language, the way you'd tell an assistant. A duplicate charge to reverse. A baggage fee to dispute after a delay. A refund that never landed.
          </p>
          <div className="bg-white p-8 rounded-3xl border border-border shadow-sm">
            <strong className="text-brand block mb-2 text-lg">You'll hear from us when something is done.</strong>
            <p className="text-muted leading-relaxed text-[15px]">Amalgamic files it, follows it, and tells you when it's resolved. You don't have to chase bank representatives or sit on hold with airlines.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
