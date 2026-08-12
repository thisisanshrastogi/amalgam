import React from 'react';

export default function Proof() {
  return (
    <section className="py-32 bg-white px-8">
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center mb-16">
          <span className="text-accent text-xs font-bold uppercase tracking-widest mb-6 block">What we've found so far</span>
          <h2 className="font-serif text-5xl leading-tight text-brand mb-6">
            We'd rather show you the work than the reviews.
          </h2>
          <p className="text-muted text-lg">Real, anonymized recoveries updated weekly.</p>
        </div>
        
        <div className="border border-border rounded-[32px] overflow-hidden premium-shadow mb-16 bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-accent/5">
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-muted border-b border-border">What it was</th>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-muted border-b border-border">Amount</th>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-muted border-b border-border">Time to resolve</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr className="hover:bg-accent/5 transition-colors">
                  <td className="px-8 py-6 text-[15px] text-brand">Subscription active 14 months after cancellation</td>
                  <td className="px-8 py-6 font-serif text-xl font-bold text-accent">$312.00</td>
                  <td className="px-8 py-6 text-[15px] text-muted">3 days</td>
                </tr>
                <tr className="hover:bg-accent/5 transition-colors">
                  <td className="px-8 py-6 text-[15px] text-brand">Late fee, first in 24 months</td>
                  <td className="px-8 py-6 font-serif text-xl font-bold text-accent">$45.00</td>
                  <td className="px-8 py-6 text-[15px] text-muted">Same day</td>
                </tr>
                <tr className="hover:bg-accent/5 transition-colors">
                  <td className="px-8 py-6 text-[15px] text-brand">Airline fee disputed after delay</td>
                  <td className="px-8 py-6 font-serif text-xl font-bold text-accent">$200.00</td>
                  <td className="px-8 py-6 text-[15px] text-muted">11 days</td>
                </tr>
                <tr className="hover:bg-accent/5 transition-colors">
                  <td className="px-8 py-6 text-[15px] text-brand">Statement credit claimed before expiry</td>
                  <td className="px-8 py-6 font-serif text-xl font-bold text-accent">$50.00</td>
                  <td className="px-8 py-6 text-[15px] text-muted">Same day</td>
                </tr>
                <tr className="hover:bg-accent/5 transition-colors">
                  <td className="px-8 py-6 text-[15px] text-brand">Duplicate charge, same merchant, same day</td>
                  <td className="px-8 py-6 font-serif text-xl font-bold text-accent">$89.00</td>
                  <td className="px-8 py-6 text-[15px] text-muted">6 days</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8 text-center border-b border-border pb-16 mb-8">
          <div>
            <div className="font-serif text-4xl font-bold text-brand mb-2">$1.2M+</div>
            <div className="text-xs font-bold uppercase tracking-widest text-muted">Recovered to date</div>
          </div>
          <div>
            <div className="font-serif text-4xl font-bold text-brand mb-2">$142</div>
            <div className="text-xs font-bold uppercase tracking-widest text-muted">Median recovery</div>
          </div>
          <div>
            <div className="font-serif text-4xl font-bold text-brand mb-2">4 days</div>
            <div className="text-xs font-bold uppercase tracking-widest text-muted">Median resolve time</div>
          </div>
        </div>
        
        <p className="text-center text-sm italic text-muted font-serif">Disputes are decided by your card issuer. Some of them fail.</p>
      </div>
    </section>
  );
}
