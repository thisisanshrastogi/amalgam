import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function CardCredits() {
  return (
    <section className="py-32 px-8 overflow-hidden bg-surface">
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-20 items-center">
        
        <div className="relative min-h-[400px] flex items-center justify-center md:order-1 order-2 w-full mt-10 md:mt-0">
          {/* Top dark card (Platinum) */}
          <div className="absolute top-[10%] left-[5%] w-[260px] h-[160px] bg-[#1c1c1c] rounded-2xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.4)] transform -rotate-[8deg] transition-all duration-500 hover:-translate-y-4 hover:-rotate-[4deg] hover:scale-105 z-10 p-5 flex flex-col justify-between cursor-pointer">
            <div className="w-8 h-5 rounded bg-white/20"></div>
            <div className="text-[10px] font-bold text-white/50 tracking-widest uppercase">Platinum</div>
          </div>
          {/* Middle light card (Reserve) */}
          <div className="absolute top-[15%] right-[5%] w-[260px] h-[160px] bg-[#f0f0f0] border border-black/5 rounded-2xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.2)] transform rotate-[6deg] transition-all duration-500 hover:-translate-y-4 hover:rotate-[3deg] hover:scale-105 z-20 p-5 flex flex-col justify-between cursor-pointer">
            <div className="w-8 h-5 rounded bg-black/10"></div>
            <div className="text-[10px] font-bold text-black/40 tracking-widest uppercase">Reserve</div>
          </div>
          {/* Bottom gold/dark card (Gold) */}
          <div className="absolute bottom-[10%] left-[20%] w-[260px] h-[160px] bg-[#222] rounded-2xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.4)] transform rotate-[2deg] transition-all duration-500 hover:-translate-y-4 hover:rotate-[0deg] hover:scale-105 z-30 p-5 flex flex-col justify-between border border-white/10 cursor-pointer">
            <div className="w-8 h-5 rounded bg-white/20"></div>
            <div className="text-[10px] font-bold text-white/50 tracking-widest uppercase">Gold</div>
          </div>
          
          {/* Floating Alert */}
          <div className="absolute bottom-[5%] right-[10%] w-[280px] bg-white rounded-2xl p-5 shadow-2xl z-40 border border-border animate-subtle-float hover:scale-105 transition-transform duration-300 cursor-pointer">
            <div className="flex items-center gap-2 text-red-500 text-[10px] font-bold uppercase tracking-widest mb-2">
              <AlertTriangle size={12} />
              Expiring Soon
            </div>
            <h4 className="font-bold text-brand text-[15px] mb-1">$50 Saks Fifth Ave Credit</h4>
            <p className="text-[13px] text-muted">Expires in 11 days on Amex Platinum.</p>
          </div>
        </div>

        <div className="md:order-2 order-1 lg:pl-10">
          <span className="text-muted text-xs font-bold uppercase tracking-widest mb-6 block">Card credits and offers</span>
          <h2 className="font-serif text-5xl leading-tight mb-8 text-brand">
            You already paid for these.
          </h2>
          <p className="text-muted text-lg leading-relaxed mb-6">
            Track available offers and get notified before valuable credits expire.
          </p>
        </div>
        
      </div>
    </section>
  );
}
