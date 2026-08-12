import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="py-24 bg-bg border-t border-border px-8">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-5 gap-12">
        <div className="md:col-span-2">
          <Logo />
          <p className="text-sm text-muted mt-6 max-w-xs leading-relaxed">
            Stop managing the small stuff. Start ignoring it properly.
          </p>
          <p className="text-xs text-muted mt-12">© 2026 Amalgamic Technologies Inc.</p>
        </div>
        
        <div>
          <h4 className="font-bold text-brand text-[13px] uppercase tracking-widest mb-6">Product</h4>
          <div className="flex flex-col gap-4 text-sm text-muted">
            <Link to="/#features" className="hover:text-brand transition-colors">Features</Link>
            <Link to="#" className="hover:text-brand transition-colors">Pricing</Link>
            <a href="https://cards.amalgamic.io/dashboard" className="hover:text-brand transition-colors">Sign In</a>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-brand text-[13px] uppercase tracking-widest mb-6">Company</h4>
          <div className="flex flex-col gap-4 text-sm text-muted">
            <Link to="/about" className="hover:text-brand transition-colors">About Us</Link>
            <Link to="/contact" className="hover:text-brand transition-colors">Contact</Link>
            <Link to="/privacy-policy" className="hover:text-brand transition-colors">Privacy Policy</Link>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-brand text-[13px] uppercase tracking-widest mb-6">Resources</h4>
          <div className="flex flex-col gap-4 text-sm text-muted">
            <Link to="/faq" className="hover:text-brand transition-colors">FAQ</Link>
            <Link to="/supported-banks" className="hover:text-brand transition-colors">Supported Banks</Link>
            <Link to="#" className="hover:text-brand transition-colors">Reward Calculator</Link>
          </div>
        </div>

      </div>
      <div className="max-w-[1200px] mx-auto mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6 text-[13px] font-bold text-muted">
          <a href="#" className="hover:text-brand transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-brand transition-colors">Twitter</a>
          <a href="mailto:support@amalgamic.io" className="hover:text-brand transition-colors">Email</a>
        </div>
      </div>
    </footer>
  );
}
