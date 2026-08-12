import React from 'react';

export default function Assistant() {
  return (
    <section id="assistant" className="py-32 px-8">
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-20 items-center">
        <div>
          <span className="text-accent text-xs font-bold uppercase tracking-widest mb-6 block">Ask anything about your money</span>
          <h2 className="font-serif text-5xl leading-tight mb-8 text-brand">
            An assistant that has actually read your statements.
          </h2>
          <p className="text-muted text-lg leading-relaxed mb-10">
            Most AI assistants can explain what an APR is. This one tells you what <span className="text-brand font-medium italic">yours</span> is costing you, because it's working from your accounts rather than from the internet. Ask in plain language, get an answer with your numbers attached.
          </p>
          <ul className="space-y-6 mb-10 text-[15px] text-muted leading-relaxed">
            <li className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-2 h-2 rounded-full bg-accent"></div>
              </div>
              <div>
                <strong className="text-brand">It reads your statements.</strong> Attach a PDF and it parses the contents directly, even for accounts you haven't connected.
              </div>
            </li>
            <li className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-2 h-2 rounded-full bg-accent"></div>
              </div>
              <div>
                <strong className="text-brand">It audits on request.</strong> Deep scans across every connected institution for hidden fees, duplicates or spikes.
              </div>
            </li>
            <li className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-2 h-2 rounded-full bg-accent"></div>
              </div>
              <div>
                <strong className="text-brand">It does the arithmetic.</strong> Payoff timelines, minimum payment impact, and what an extra $200 actually changes.
              </div>
            </li>
          </ul>
          <div className="bg-accent/5 rounded-3xl border border-accent/10 p-6 text-sm">
            <span className="font-bold text-brand block mb-2">Two Boundaries</span>
            <p className="text-muted leading-relaxed">It only works on your money. Ask it anything else and it will politely decline. And it never guesses: when it doesn't have the data, it says so rather than filling the gap.</p>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-10 bg-accent/10 blur-[60px] -z-10 rounded-full"></div>
          <div className="bg-brand rounded-[40px] p-8 shadow-2xl h-[600px] flex flex-col w-full max-w-md mx-auto relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path><path d="M8 9h8"></path><path d="M8 13h6"></path></svg>
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">Amalgamic Assistant</h4>
                <p className="text-[10px] text-highlight uppercase tracking-widest font-bold mt-1 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-highlight animate-pulse"></span>
                  Active • Reading Statements
                </p>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2 space-y-4 text-[15px] mb-20 scrollbar-hide">
              <div className="bg-white/10 text-white chat-bubble-user p-4 self-end max-w-[80%] ml-auto">
                Why is this month's statement higher than last month's?
              </div>
              <div className="bg-accent text-bg chat-bubble-ai p-4 self-start max-w-[85%] shadow-lg">
                Your total spending increased by $420. The main drivers are a $200 airline baggage fee (which I can dispute for you), and a $180 spike in dining compared to your 3-month average.
              </div>
              <div className="bg-white/10 text-white chat-bubble-user p-4 self-end max-w-[80%] ml-auto mt-4">
                If I only pay the minimum on this card, how long until it's clear and what does it cost me?
              </div>
              <div className="bg-accent text-bg chat-bubble-ai p-4 self-start max-w-[85%] shadow-lg">
                At your current APR, paying only the minimum will take 11 years to clear and cost you <strong className="text-surface font-bold underline">$4,120 in interest</strong>. If you add $150/mo, you're clear in 14 months.
              </div>
            </div>

            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/5 border border-white/10 rounded-full px-5 py-3.5 flex items-center justify-between">
                <span className="text-white/40 text-sm italic">Ask anything about your money...</span>
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
