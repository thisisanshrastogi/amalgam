import React, { useEffect, useRef } from 'react';
import { createScope } from 'animejs';
import { fadeUpOnScroll } from '../utils/animations';

export default function FeaturesGrid() {
  const root = useRef(null);
  const scope = useRef(null);
  
  useEffect(() => {
    scope.current = createScope({ root: root.current }).add(() => {
      fadeUpOnScroll('.trust-item', root.current, {
        staggerMs: 90,
        translateY: 12,
      });
      fadeUpOnScroll('.feature-item', root.current, {
        staggerMs: 120,
        delay: 200,
        translateY: 20,
      });
    });
    return () => scope.current.revert();
  }, []);

  return (
    <section ref={root} id="features" className="py-12 bg-surface">
      {/* Trust Bar */}
      <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] font-bold uppercase tracking-widest text-muted opacity-60 px-8 pb-20 max-w-[1200px] mx-auto border-b border-border">
        <span className="trust-item opacity-0">Plaid &amp; Spinwheel</span>
        <span className="trust-item opacity-0 w-1 h-1 rounded-full bg-muted"></span>
        <span className="trust-item opacity-0">Read-only by default</span>
        <span className="trust-item opacity-0 w-1 h-1 rounded-full bg-muted"></span>
        <span className="trust-item opacity-0">12,000+ US Institutions</span>
        <span className="trust-item opacity-0 w-1 h-1 rounded-full bg-muted"></span>
        <span className="trust-item opacity-0">Zero data selling</span>
      </div>

      <div className="max-w-[1200px] mx-auto px-8 pt-24">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <h2 className="feature-item opacity-0 font-serif text-5xl leading-tight mb-8 text-brand">
            One place. Every card. Total control.
          </h2>
          <p className="feature-item opacity-0 text-muted text-lg leading-relaxed">
            Most people have four or more credit cards and no clear picture of what's happening across them. Amalgamic fixes that.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          <div className="feature-item opacity-0">
            <h3 className="font-bold text-xl text-brand mb-4">All your credit cards, in one place</h3>
            <p className="text-muted leading-relaxed text-[15px]">
              Connect every card once. See every balance, every due date, every available credit – in a single view. Pay from one place, stop juggling apps, and stop missing due dates that cost you late fees.
            </p>
          </div>
          <div className="feature-item opacity-0">
            <h3 className="font-bold text-xl text-brand mb-4">No more "hold" music</h3>
            <p className="text-muted leading-relaxed text-[15px]">
              The $12.99 streaming service you haven't opened in eight months. The annual software renewal that hit last Tuesday. Amalgamic reads every statement and flags every recurring charge. One tap to cancel. No hold music, no cancellation flows, no forgetting to follow up.
            </p>
          </div>
          <div className="feature-item opacity-0">
            <h3 className="font-bold text-xl text-brand mb-4">Get real $ back – on us</h3>
            <p className="text-muted leading-relaxed text-[15px]">
              Duplicate charges, billing errors, and fees that should have been waived happen more than you think. Amalgamic automatically flags them for you. We're here to help.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
