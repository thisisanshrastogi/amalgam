import React from 'react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="py-24 bg-bg border-t border-border px-8">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <Logo />
          <p className="text-xs text-muted mt-4">© 2026 Amalgamic Technologies Inc.</p>
        </div>
        <div className="flex gap-8 text-[13px] font-bold text-muted">
          <a href="#" className="hover:text-brand transition-colors">Privacy</a>
          <a href="#" className="hover:text-brand transition-colors">Terms</a>
          <a href="#" className="hover:text-brand transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}
