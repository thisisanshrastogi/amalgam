import React from 'react';

export default function FinalCTA() {
  return (
    <section className="py-40 bg-accent text-center relative overflow-hidden text-bg">
      <div className="max-w-[800px] mx-auto px-8 relative z-10">
        <h2 className="font-serif text-6xl leading-tight mb-10 text-bg">Stop managing the small stuff. Start ignoring it properly.</h2>
        <p className="text-bg/80 text-xl mb-12 leading-relaxed max-w-2xl mx-auto">
          Connect your cards once. Amalgamic watches, tells you what matters, answers what you ask, and handles the admin from there.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
          <button className="bg-surface text-accent px-10 py-5 rounded-full text-lg font-bold shadow-2xl hover:scale-[1.05] transition-transform">
            Connect your accounts
          </button>
          <button className="text-surface font-bold border border-surface/20 px-8 py-5 rounded-full hover:bg-white/5 transition-all">
            See how it compares
          </button>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] font-bold uppercase tracking-widest opacity-60">
          <span>Read-only access</span>
          <span>•</span>
          <span>Revoke any time</span>
          <span>•</span>
          <span>No card required to start</span>
        </div>
      </div>
    </section>
  );
}
