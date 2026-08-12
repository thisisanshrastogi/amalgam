import React from 'react';
import { X, Check } from 'lucide-react';

export default function Hero() {
  return (
    <section className="pt-40 pb-24 px-8 min-h-screen flex items-center">
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-20 items-center">
        
        {/* Left Column */}
        <div className="order-2 md:order-1 pt-12">
          <span className="bg-accent/5 text-accent text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-8 inline-block">
            For Premium Cardholders
          </span>
          <h1 className="font-serif text-6xl md:text-[80px] leading-[1.05] tracking-tight mb-8 text-brand">
            The money you<br/>never got around to<br/>claiming.
          </h1>
          <p className="text-muted text-lg leading-relaxed mb-10 max-w-md">
            Every month you lose a little to things not worth your time: a subscription nobody cancelled, a fee that should have been waived, a card credit that expired unused. Amalgamic connects to your cards, tells you what's worth knowing, and does the work of getting it back.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
            <button className="bg-accent text-bg px-8 py-4 rounded-xl text-sm font-bold shadow-xl hover:scale-105 transition-transform">
              Connect your accounts
            </button>
            <button className="bg-white text-brand px-8 py-4 rounded-xl text-sm font-bold shadow-sm border border-border hover:bg-surface/50 transition-colors">
              See how it works
            </button>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-muted font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-highlight"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            Read-only access. Takes about two minutes. Revoke any time.
          </div>
        </div>

        {/* Right Column: Phone Mockup */}
        <div className="order-1 md:order-2 relative h-[600px] flex items-center justify-center">
          
          {/* Phone Body */}
          <div className="relative w-[300px] h-[600px] bg-[#1a1a1a] rounded-[48px] shadow-2xl border-[8px] border-[#2a2a2a] overflow-hidden flex flex-col p-6 z-10">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#2a2a2a] rounded-b-3xl"></div>
            
            {/* UI Mockup inside phone */}
            <div className="mt-12 flex-1 space-y-4 opacity-50">
              <div className="h-16 bg-white/5 rounded-2xl w-full"></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-24 bg-white/5 rounded-2xl"></div>
                <div className="h-24 bg-white/5 rounded-2xl"></div>
              </div>
              <div className="h-32 bg-[#2a3630] rounded-2xl border border-highlight/20 p-4 relative overflow-hidden">
                <div className="w-8 h-8 rounded-full bg-highlight text-accent flex items-center justify-center font-bold text-sm mb-2">$</div>
                <div className="absolute bottom-4 left-4 w-20 h-2 bg-white/10 rounded-full"></div>
                <div className="absolute bottom-4 right-4 w-12 h-2 bg-white/10 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Floating Card 1: Netflix Cancelled */}
          <div className="absolute top-[25%] -left-[10%] bg-white rounded-2xl p-4 shadow-2xl z-20 w-[240px] animate-subtle-float flex items-center gap-4 cursor-pointer hover:scale-105 transition-transform duration-300 border border-border">
            <div className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center flex-shrink-0">
              <X size={16} strokeWidth={3} />
            </div>
            <div>
              <h4 className="font-bold text-[13px] text-brand">Netflix Cancelled</h4>
              <p className="text-[10px] text-muted">Recurring savings: $15.99/mo</p>
            </div>
          </div>

          {/* Floating Card 2: Late Fee Waived */}
          <div className="absolute bottom-[25%] -right-[15%] bg-white rounded-2xl p-4 shadow-2xl z-30 w-[240px] animate-subtle-float flex items-center gap-4 cursor-pointer hover:scale-105 transition-transform duration-300 border border-border" style={{ animationDelay: '1s' }}>
            <div className="w-8 h-8 rounded-full bg-[#EBF4F1] text-highlight flex items-center justify-center flex-shrink-0">
              <Check size={16} strokeWidth={3} />
            </div>
            <div>
              <h4 className="font-bold text-[13px] text-brand">Late Fee Waived</h4>
              <p className="text-[10px] text-muted">Recovery: $40.00 posted to Amex</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
