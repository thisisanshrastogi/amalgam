import React from 'react';

export default function Subscriptions() {
  return (
    <section className="py-32 px-8">
      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <div>
          <span className="text-accent text-xs font-bold uppercase tracking-widest mb-6 block">Subscriptions</span>
          <h2 className="font-serif text-5xl leading-tight mb-8 text-brand">
            The ones you forgot are the expensive ones.
          </h2>
          <p className="text-muted text-lg leading-relaxed mb-10">
            Amalgamic finds every recurring charge across every connected card and shows what you're actually paying. For most services, cancelling is one tap and we complete the flow for you, including the retention screens designed to make you give up.
          </p>
          <div className="bg-surface border border-border rounded-2xl p-5 flex items-center justify-between shadow-sm mb-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-brand text-bg rounded-xl flex items-center justify-center font-bold text-xl">N</div>
              <div>
                <p className="font-bold text-brand text-lg">Netflix Premium</p>
                <p className="text-[15px] text-muted">$22.99 / mo</p>
              </div>
            </div>
            <button className="text-red-600 border border-red-200 text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-xl hover:bg-red-50 hover:scale-[1.02] active:scale-95 transition-all">Cancel Service</button>
          </div>
          <p className="text-muted text-[15px] italic">Works across every card, so a subscription billed to one you barely use doesn't hide.</p>
        </div>
        <div className="relative w-full">
          <div className="bg-surface p-12 rounded-[40px] border border-border shadow-2xl w-full max-w-lg mx-auto hover:-translate-y-2 transition-transform duration-500 cursor-pointer">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted block mb-4">Monthly Burn</span>
            <div className="font-serif text-[80px] leading-none text-brand mb-4">$412.40</div>
            <p className="text-[15px] text-muted mb-12">Detected across 5 connected cards</p>
            
            <div className="h-3 w-full flex rounded-full overflow-hidden mb-8 shadow-inner">
              <div className="h-full bg-accent w-[45%]"></div>
              <div className="h-full bg-highlight w-[30%]"></div>
              <div className="h-full bg-brand w-[25%]"></div>
            </div>
            
            <div className="grid grid-cols-2 gap-y-5 gap-x-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-accent shadow-sm"></div>
                <span className="text-[15px] text-brand font-medium">Entertainment</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-highlight shadow-sm"></div>
                <span className="text-[15px] text-brand font-medium">SaaS / Tools</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-brand shadow-sm"></div>
                <span className="text-[15px] text-brand font-medium">Health & Wellness</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
