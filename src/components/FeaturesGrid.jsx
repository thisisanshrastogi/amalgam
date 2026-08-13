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
    });
    return () => scope.current.revert();
  }, []);

  return (
    <div ref={root}>
      {/* Trust Bar */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-[11px] font-bold uppercase tracking-widest text-muted opacity-60 px-8 pb-12 max-w-[1200px] mx-auto">
        <span className="trust-item opacity-0">Plaid &amp; Spinwheel</span>
        <span className="trust-item opacity-0 w-1 h-1 rounded-full bg-muted"></span>
        <span className="trust-item opacity-0">Read-only by default</span>
        <span className="trust-item opacity-0 w-1 h-1 rounded-full bg-muted"></span>
        <span className="trust-item opacity-0">12,000+ US Institutions</span>
        <span className="trust-item opacity-0 w-1 h-1 rounded-full bg-muted"></span>
        <span className="trust-item opacity-0">Zero data selling</span>
      </div>
    </div>
  );
}
