import React from 'react';
import Logo from './Logo';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-6 max-w-[1200px] mx-auto absolute top-0 left-0 right-0 z-50">
      <a href="#top" className="hover:opacity-80 transition-opacity">
        <Logo />
      </a>
      <div className="hidden md:flex items-center gap-10 text-[13px] font-bold text-muted tracking-wide">
        <a href="#how-it-works" className="hover:text-brand transition-colors">How it works</a>
        <a href="#insights" className="hover:text-brand transition-colors">Insights</a>
        <a href="#security" className="hover:text-brand transition-colors">Security</a>
        <a href="#" className="hover:text-brand transition-colors">Proof</a>
      </div>
      <div className="flex items-center gap-6">
        <a href="#" className="text-[13px] font-bold text-brand hover:text-accent transition-colors hidden sm:block">Sign in</a>
        <button className="bg-accent text-bg px-6 py-2.5 rounded-full text-[13px] font-bold hover:bg-brand transition-colors">
          Connect your accounts
        </button>
      </div>
    </nav>
  );
}
