import React, { useEffect, useRef } from 'react';
import { animate, createScope, onScroll } from 'animejs';
import { MessageSquare, DollarSign, Activity } from 'lucide-react';
import { fadeUpOnScroll } from '../utils/animations';
import DitherTexture from './DitherTexture';

export default function Insights() {
  const root = useRef(null);
  const scope = useRef(null);

  useEffect(() => {
    scope.current = createScope({ root: root.current }).add(() => {
      // Left column — all at once, tight stagger
      fadeUpOnScroll('.insights-text', root.current, { staggerMs: 65, translateY: 16 });
      fadeUpOnScroll('.insights-feature', root.current, { staggerMs: 55, delay: 180, translateY: 10 });

      // Right column — all 3 cards fire in parallel with a small stagger
      // (serial timeline had ~1.6s total lag; this completes in ~540ms)
      const cards = ['.insights-card-1', '.insights-card-2', '.insights-card-3'];
      let cardsPlayed = false;
      onScroll({
        target: root.current,
        start: 'top 80%',
        onEnter: () => {
          if (cardsPlayed) return;
          cardsPlayed = true;
          cards.forEach((sel, i) => {
            animate(sel, {
              opacity: [0, 1],
              translateY: [20, 0],
              duration: 300,
              delay: i * 60,
              ease: 'cubicBezier(0.16, 1, 0.3, 1)',
            });
          });
        },
      });
    });
    return () => scope.current.revert();
  }, []);

  return (
    <section ref={root} id="insights" className="relative py-16 md:py-32 bg-paper overflow-hidden">
      <DitherTexture opacity={0.04} />

      <div className="max-w-[1200px] mx-auto px-8 flex flex-col lg:flex-row gap-20 items-center relative z-10">
        <div className="lg:w-1/2">

          <h2 className="insights-text opacity-0 font-serif text-5xl leading-[1.2] mb-8 text-ink">
            The two or three things<br />worth knowing this<br />month.
          </h2>
          <p className="insights-text opacity-0 text-muted text-lg leading-relaxed mb-12">
            We read your statements and highlight only what matters. No more deciphering dashboards or digging through transaction feeds to find out where your money went.
          </p>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 mb-10">
            <div className="insights-feature opacity-0">
              <h4 className="font-bold text-ink mb-2">Fees caught</h4>
              <p className="text-[13px] text-muted leading-relaxed">Late fees and annual fees flagged instantly.</p>
            </div>
            <div className="insights-feature opacity-0">
              <h4 className="font-bold text-ink mb-2">Price changes</h4>
              <p className="text-[13px] text-muted leading-relaxed">Subscriptions that renewed higher.</p>
            </div>
            <div className="insights-feature opacity-0">
              <h4 className="font-bold text-ink mb-2">Spend patterns</h4>
              <p className="text-[13px] text-muted leading-relaxed">Identify your largest and most frequent merchants.</p>
            </div>
            <div className="insights-feature opacity-0">
              <h4 className="font-bold text-ink mb-2">Credit health</h4>
              <p className="text-[13px] text-muted leading-relaxed">Utilization spikes caught before scoring.</p>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 relative min-h-[650px] w-full mt-10 lg:mt-0">
          {/* Top Card */}
          <div className="insights-card-1 opacity-0 absolute right-0 top-0 w-full sm:w-[85%] bg-white rounded-2xl ring-1 ring-inset ring-border p-6 hover:-translate-y-2 hover:shadow-lg transition-all duration-300 z-10 cursor-pointer group">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-ink/5 text-ink flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Activity size={16} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1 gap-2">
                  <h4 className="font-bold text-ink text-[15px]">Subscription Price Spike</h4>
                  <span className="text-ink font-bold text-xs bg-ink/5 px-2 py-0.5 rounded shrink-0 whitespace-nowrap">+ $14.99</span>
                </div>
                <p className="text-[13px] text-muted leading-relaxed">Adobe Creative Cloud renewed at a higher rate.</p>
              </div>
            </div>
            <div className="pl-14">
              <a href="#" className="text-[11px] font-bold text-brand underline decoration-highlight/30 hover:decoration-highlight transition-colors">Chat about this</a>
            </div>
          </div>

          {/* Middle Card */}
          <div className="insights-card-2 opacity-0 absolute left-0 top-[200px] w-full sm:w-[85%] bg-white rounded-2xl ring-1 ring-inset ring-border p-6 hover:-translate-y-2 hover:shadow-lg transition-all duration-300 z-20 cursor-pointer group">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-mint/10 text-mint flex items-center justify-center flex-shrink-0 font-serif font-bold text-lg group-hover:scale-110 transition-transform">
                $
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1 gap-2">
                  <h4 className="font-bold text-ink text-[15px]">Recoverable Late Fee</h4>
                  <span className="text-mint font-bold text-xs bg-mint/10 px-2 py-0.5 rounded shrink-0 whitespace-nowrap">$35.00</span>
                </div>
                <p className="text-[13px] text-muted leading-relaxed">Chase Sapphire posted a late fee. This is highly likely to be waived.</p>
              </div>
            </div>
            <div className="pl-14">
              <button className="bg-ink text-white text-[11px] font-bold px-4 py-2 rounded-lg hover:bg-ink/90 transition-colors">Dispute for me</button>
            </div>
          </div>

          {/* Bottom Card */}
          <div className="insights-card-3 opacity-0 absolute right-4 top-[400px] w-full sm:w-[85%] bg-white rounded-2xl ring-1 ring-inset ring-border p-6 hover:-translate-y-2 hover:shadow-lg transition-all duration-300 z-30 cursor-pointer group">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-muted/10 text-muted flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform border border-muted/20">
                <Activity size={16} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1 gap-2">
                  <h4 className="font-bold text-ink text-[15px]">Utilization Alert</h4>
                  <span className="text-muted font-bold text-xs bg-muted/10 px-2 py-0.5 rounded shrink-0 whitespace-nowrap">42%</span>
                </div>
                <p className="text-[13px] text-muted leading-relaxed">Amex Gold balance may impact credit score soon.</p>
              </div>
            </div>
            <div className="pl-14">
              <a href="#" className="text-[11px] font-bold text-brand underline decoration-highlight/30 hover:decoration-highlight transition-colors">Project impact</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
