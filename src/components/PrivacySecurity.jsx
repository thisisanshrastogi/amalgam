import React, { useEffect, useRef } from 'react';
import { createScope } from 'animejs';
import { fadeUpOnScroll } from '../utils/animations';

export default function PrivacySecurity() {
  const root = useRef(null);
  const scope = useRef(null);

  useEffect(() => {
    scope.current = createScope({ root: root.current }).add(() => {
      fadeUpOnScroll('.ps-text', root.current, { staggerMs: 120, translateY: 30 });
      fadeUpOnScroll('.ps-item', root.current, { delay: 300, staggerMs: 100, translateY: 20 });
    });
    return () => scope.current.revert();
  }, []);

  return (
    <section ref={root} className="py-32 px-8 bg-surface border-t border-border">
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <span className="ps-text opacity-0 text-accent text-xs font-bold uppercase tracking-widest mb-6 block">Privacy &amp; security</span>
          <h2 className="ps-text opacity-0 font-serif text-5xl leading-tight text-brand">
            Your data works for you. Never for anyone else.
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
          <div className="ps-item opacity-0 flex flex-col gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            </div>
            <h3 className="font-bold text-lg text-brand">We will never sell your financial data</h3>
            <p className="text-muted leading-relaxed text-[15px]">
              Read-only access through Plaid and Spinwheel — we never see your bank login credentials, and no money changes hands for your data.
            </p>
          </div>
          <div className="ps-item opacity-0 flex flex-col gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
            </div>
            <h3 className="font-bold text-lg text-brand">We don't train AI on your data</h3>
            <p className="text-muted leading-relaxed text-[15px]">
              AI is used to carry out the task you asked for — reading statements, drafting disputes — and nothing beyond it.
            </p>
          </div>
          <div className="ps-item opacity-0 flex flex-col gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            </div>
            <h3 className="font-bold text-lg text-brand">You stay in control</h3>
            <p className="text-muted leading-relaxed text-[15px]">
              Revoke access any time, directly with Plaid or Spinwheel, or delete your account and data from settings.
            </p>
          </div>
          <div className="ps-item opacity-0 flex flex-col gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
            </div>
            <h3 className="font-bold text-lg text-brand">Built on trusted infrastructure</h3>
            <p className="text-muted leading-relaxed text-[15px]">
              Physical, technical and administrative safeguards protect your data at every step.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
