import React from 'react';

export default function CardsAndBillPay() {
  return (
    <section className="py-32 bg-brand text-bg overflow-hidden relative">
      <div className="max-w-[1200px] mx-auto px-8 relative z-10 grid md:grid-cols-2 gap-20 items-center">
        <div className="order-2 md:order-1 relative">
          <div className="bg-surface/5 p-1 rounded-[40px] border border-white/10 max-w-md mx-auto shadow-2xl">
            <div className="p-8">
              <h3 className="font-bold text-white mb-6 flex items-center">Payment Calendar <span className="text-xs font-normal opacity-60 ml-2">October 2024</span></h3>
              <div className="grid grid-cols-7 gap-1 text-center mb-6">
                <span className="text-[10px] font-bold text-bg/40 uppercase">M</span>
                <span className="text-[10px] font-bold text-bg/40 uppercase">T</span>
                <span className="text-[10px] font-bold text-bg/40 uppercase">W</span>
                <span className="text-[10px] font-bold text-bg/40 uppercase">T</span>
                <span className="text-[10px] font-bold text-bg/40 uppercase">F</span>
                <span className="text-[10px] font-bold text-bg/40 uppercase">S</span>
                <span className="text-[10px] font-bold text-bg/40 uppercase">S</span>
                
                <span className="text-sm py-2 text-bg/20">30</span>
                <span className="text-sm py-2 text-bg/40">1</span>
                <span className="text-sm py-2 text-bg/40">2</span>
                <span className="text-sm py-2 text-white bg-accent/10 border border-accent/30 rounded-xl relative">3<span className="w-1 h-1 bg-accent rounded-full absolute bottom-1 left-1/2 -translate-x-1/2"></span></span>
                <span className="text-sm py-2 text-bg/40">4</span>
                <span className="text-sm py-2 text-bg/40">5</span>
                <span className="text-sm py-2 text-bg/40">6</span>
                
                <span className="text-sm py-2 text-bg/40">7</span>
                <span className="text-sm py-2 text-bg/40">8</span>
                <span className="text-sm py-2 text-white bg-red-400/5 border border-red-400/30 rounded-xl relative">9<span className="w-1 h-1 bg-red-400 rounded-full absolute bottom-1 left-1/2 -translate-x-1/2"></span></span>
                <span className="text-sm py-2 text-bg/40">10</span>
                <span className="text-sm py-2 text-bg/40">11</span>
                <span className="text-sm py-2 text-bg/40">12</span>
                <span className="text-sm py-2 text-bg/40">13</span>
              </div>
              
              <div className="space-y-3">
                <div className="bg-surface/10 rounded-2xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-5 bg-blue-600 rounded"></div>
                    <div>
                      <p className="text-sm font-bold text-white">Chase Sapphire</p>
                      <p className="text-xs text-white/50">Due Oct 9th</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-highlight border border-highlight/30 px-3 py-1 rounded-full uppercase tracking-widest">Pay Balance</span>
                </div>
                <div className="bg-surface/10 rounded-2xl p-4 flex items-center justify-between opacity-40">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-5 border border-white/30 rounded"></div>
                    <div>
                      <p className="text-sm font-bold text-white">Amex Platinum</p>
                      <p className="text-xs text-white/50">Paid Oct 3rd</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-white/80 px-3 py-1 uppercase tracking-widest">Settled</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <span className="text-highlight text-xs font-bold uppercase tracking-widest mb-6 block">Cards and bill pay</span>
          <h2 className="font-serif text-5xl leading-tight mb-8 text-surface">
            Every card, every balance, every due date. Then the payment.
          </h2>
          <p className="text-bg/70 text-lg leading-relaxed mb-10">
            Connect your credit cards once and Amalgamic assembles the full picture: balances, limits, statement dates, and minimums. Because it reads bureau data alongside your bank feeds, it catches cards that transaction feeds alone tend to miss.
          </p>
          <ul className="space-y-6 mb-10 text-[15px] text-bg/70 leading-relaxed">
            <li className="flex gap-4 items-start">
              <div className="w-6 h-6 rounded-full bg-highlight flex items-center justify-center flex-shrink-0 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-brand"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <div>
                <strong className="text-surface block mb-1">A calendar you can read in three seconds</strong>
                See exactly when payments are due and which will cost you interest if you only pay the minimum.
              </div>
            </li>
            <li className="flex gap-4 items-start">
              <div className="w-6 h-6 rounded-full bg-highlight flex items-center justify-center flex-shrink-0 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-brand"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <div>
                <strong className="text-surface block mb-1">Pay from here</strong>
                Settle card bills in the app instead of logging into four issuer portals. If a connection needs re-authorising, you'll know early.
              </div>
            </li>
          </ul>
          <div className="border-t border-white/10 pt-6">
            <p className="text-sm text-bg/50 italic font-serif">Payments go to your own card issuer, from your own account. Amalgamic cannot move money anywhere else.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
