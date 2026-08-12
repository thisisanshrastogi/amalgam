import React from 'react';

export default function FeaturesGrid() {
  return (
    <>
      {/* Features Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-8 py-12 border-y border-border max-w-[1200px] mx-auto px-8">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent/5 flex items-center justify-center text-accent">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="14" x="2" y="5" rx="2"></rect>
              <line x1="2" x2="22" y1="10" y2="10"></line>
            </svg>
          </div>
          <span className="text-sm font-semibold text-brand">All your cards in one place</span>
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent/5 flex items-center justify-center text-accent">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
              <line x1="16" x2="16" y1="2" y2="6"></line>
              <line x1="8" x2="8" y1="2" y2="6"></line>
              <line x1="3" x2="21" y1="10" y2="10"></line>
            </svg>
          </div>
          <span className="text-sm font-semibold text-brand">What's due and when</span>
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent/5 flex items-center justify-center text-accent">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              <path d="M8 9h8"></path>
              <path d="M8 13h6"></path>
            </svg>
          </div>
          <span className="text-sm font-semibold text-brand">Assistant for statements</span>
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent/5 flex items-center justify-center text-accent">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          </div>
          <span className="text-sm font-semibold text-brand">Claims handled for you</span>
        </div>
      </div>

      {/* Trust Bar */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-[11px] font-bold uppercase tracking-widest text-muted opacity-60 px-8 pb-12 max-w-[1200px] mx-auto">
        <span>Plaid &amp; Spinwheel</span>
        <span className="w-1 h-1 rounded-full bg-muted"></span>
        <span>Read-only by default</span>
        <span className="w-1 h-1 rounded-full bg-muted"></span>
        <span>12,000+ US Institutions</span>
        <span className="w-1 h-1 rounded-full bg-muted"></span>
        <span>Zero data selling</span>
      </div>
    </>
  );
}
