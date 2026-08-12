import React from 'react';
import { MessageSquare, DollarSign, Activity } from 'lucide-react';

export default function Insights() {
  return (
    <section id="insights" className="py-32 border-y border-border">
      <div className="max-w-[1200px] mx-auto px-8 flex flex-col lg:flex-row gap-20 items-center">
        
        <div className="lg:w-1/2">
          <span className="text-muted text-xs font-bold uppercase tracking-widest mb-6 block">Things to know</span>
          <h2 className="font-serif text-5xl leading-tight mb-8 text-brand">
            The two or three things<br/>worth knowing this<br/>month.
          </h2>
          <p className="text-muted text-lg leading-relaxed mb-12">
            Most finance apps hand you a dashboard and leave the interpretation to you, which is the same as handing you homework. Amalgamic starts from the opposite end. It reads everything and tells you only what changed, in language that doesn't need decoding.
          </p>
          
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 mb-10">
            <div>
              <h4 className="font-bold text-brand mb-2">Fees caught</h4>
              <p className="text-[13px] text-muted leading-relaxed">Late fees, over-limit charges, and annual fees flagged for dispute.</p>
            </div>
            <div>
              <h4 className="font-bold text-brand mb-2">Price changes</h4>
              <p className="text-[13px] text-muted leading-relaxed">Subscriptions that renewed higher or duplicate merchant charges.</p>
            </div>
            <div>
              <h4 className="font-bold text-brand mb-2">Spend patterns</h4>
              <p className="text-[13px] text-muted leading-relaxed">Your most frequent merchants vs. largest ones—rarely the same list.</p>
            </div>
            <div>
              <h4 className="font-bold text-brand mb-2">Credit health</h4>
              <p className="text-[13px] text-muted leading-relaxed">Utilization spikes and bureau profile changes before they hit your score.</p>
            </div>
          </div>
          
          <p className="text-sm text-brand font-bold italic flex items-center gap-2">
            Every insight has a "chat now" next to it.
            <MessageSquare size={16} className="text-muted" />
          </p>
        </div>
        
        <div className="lg:w-1/2 relative min-h-[550px] w-full mt-10 lg:mt-0">
          {/* Top Card */}
          <div className="absolute right-0 top-0 w-full sm:w-[85%] bg-white rounded-2xl p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] border border-border hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 z-10 cursor-pointer group">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Activity size={16} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-brand text-[15px]">Subscription Price Spike</h4>
                  <span className="text-red-500 font-bold text-xs bg-red-50 px-2 py-0.5 rounded">+ $14.99</span>
                </div>
                <p className="text-[13px] text-muted leading-relaxed">Adobe Creative Cloud renewed at a higher rate than last month.</p>
              </div>
            </div>
            <div className="pl-14">
              <a href="#" className="text-[11px] font-bold text-brand underline decoration-brand/30 hover:decoration-brand transition-colors">Chat about this</a>
            </div>
          </div>
          
          {/* Middle Card */}
          <div className="absolute left-0 top-[160px] w-full sm:w-[85%] bg-white rounded-2xl p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] border border-border hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 z-20 cursor-pointer group">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center flex-shrink-0 font-serif font-bold text-lg group-hover:scale-110 transition-transform">
                $
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-brand text-[15px]">Recoverable Late Fee</h4>
                  <span className="text-brand font-bold text-xs">$35.00</span>
                </div>
                <p className="text-[13px] text-muted leading-relaxed">Chase Sapphire posted a late fee. You've had no other fees in 24 months—this is highly likely to be waived.</p>
              </div>
            </div>
            <div className="pl-14">
              <button className="bg-brand text-white text-[11px] font-bold px-4 py-2 rounded-lg hover:bg-brand/90 transition-colors">Dispute for me</button>
            </div>
          </div>
          
          {/* Bottom Card */}
          <div className="absolute right-4 top-[320px] w-full sm:w-[85%] bg-white rounded-2xl p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] border border-border hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 z-30 cursor-pointer group">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-surface/5 text-muted flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Activity size={16} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-brand text-[15px]">Utilization Alert</h4>
                  <span className="text-muted font-bold text-xs">42%</span>
                </div>
                <p className="text-[13px] text-muted leading-relaxed">Amex Gold balance is reaching a level that may impact your credit score next reporting cycle.</p>
              </div>
            </div>
            <div className="pl-14">
              <a href="#" className="text-[11px] font-bold text-brand underline decoration-brand/30 hover:decoration-brand transition-colors">Project impact</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
