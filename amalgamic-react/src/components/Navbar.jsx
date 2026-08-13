import React, { useEffect, useRef } from 'react';
import { animate, createTimeline, createScope } from 'animejs';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import Logo from './Logo';

export default function Navbar() {
  const root = useRef(null);
  const scope = useRef(null);
  const dropdownRef = useRef(null);
  const dropdownAnim = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    scope.current = createScope({ root: root.current }).add(() => {
      // Orchestrated entrance: logo → links → CTA (timeline)
      const tl = createTimeline({ defaults: { ease: 'outExpo' } });

      tl.add('.nav-wrapper', {
        top: ['-80px', '24px'],
        opacity: [0, 1],
        duration: 420,
      })
        .add('.nav-logo', {
          opacity: [0, 1],
          translateX: [-10, 0],
          duration: 300,
        }, '-=400')
        .add('.nav-link', {
          opacity: [0, 1],
          translateY: [-8, 0],
          duration: 400,
          delay: (_, i) => i * 35,
        }, '-=350')
        .add('.nav-cta', {
          opacity: [0, 1],
          scale: [0.9, 1],
          duration: 400,
        }, '-=200');

      // Scroll-shrink: compact the nav on scroll
      const navEl = root.current?.querySelector('.nav-wrapper nav');
      let scrolled = false;
      const handleScroll = () => {
        const shouldShrink = window.scrollY > 40;
        if (shouldShrink !== scrolled) {
          scrolled = shouldShrink;
          if (navEl) {
            animate(navEl, {
              paddingTop: shouldShrink ? 10 : (window.innerWidth < 768 ? 12 : 16),
              paddingBottom: shouldShrink ? 10 : (window.innerWidth < 768 ? 12 : 16),
              duration: 300,
              ease: 'outQuad',
            });
          }
        }
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    });
    return () => scope.current.revert();
  }, []);

  // Smooth scroll handler using Anime.js
  const handleNavClick = (e, targetId) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const el = document.getElementById(targetId);
      if (el) {
        animate(document.scrollingElement || document.documentElement, {
          scrollTop: el.offsetTop - 100,
          duration: 800,
          ease: 'outExpo'
        });
      }
    }
  };

  // Dropdown hover animations using Anime.js
  const handleMouseEnter = () => {
    if (!dropdownRef.current) return;
    if (dropdownAnim.current) dropdownAnim.current.cancel();

    dropdownRef.current.style.visibility = 'visible';
    dropdownRef.current.style.display = 'flex';

    dropdownAnim.current = animate(dropdownRef.current, {
      opacity: [0, 1],
      scale: [0.95, 1],
      translateY: [10, 0],
      duration: 300,
      ease: 'outExpo'
    });
  };

  const handleMouseLeave = () => {
    if (!dropdownRef.current) return;
    if (dropdownAnim.current) dropdownAnim.current.cancel();

    dropdownAnim.current = animate(dropdownRef.current, {
      opacity: 0,
      scale: 0.95,
      translateY: 10,
      duration: 200,
      ease: 'outExpo',
      onComplete: () => {
        if (dropdownRef.current) {
          dropdownRef.current.style.visibility = 'hidden';
          dropdownRef.current.style.display = 'none';
        }
      }
    });
  };

  return (
    <div ref={root}>
      <div className="nav-wrapper opacity-0 fixed left-1/2 -translate-x-1/2 w-[90%] max-w-[1300px] z-50" style={{ top: '-80px' }}>
        <nav className="bg-white/80 backdrop-blur-md px-5 py-3 md:px-8 md:py-4 rounded-full shadow-lg border border-white/20 flex items-center justify-between transition-shadow">
          <Link to="/" className="nav-logo opacity-0 hover:opacity-80 transition-opacity">
            <Logo />
          </Link>

          <div className="hidden md:flex items-center gap-10 text-[15px] font-bold text-muted tracking-wide">

            {/* Features Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className="nav-link opacity-0 flex items-center gap-1 px-2 py-2 hover:text-brand transition-all duration-300 relative group">
                Features <ChevronDown size={13} className="opacity-60 transition-transform duration-300 group-hover:rotate-180" />
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent transition-all duration-300 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100" />
              </button>

              <div
                ref={dropdownRef}
                // Use left-1/2 and -ml-[104px] (half of w-52 which is 208px) instead of -translate-x-1/2 
                // to avoid AnimeJS overwriting the transform property during animation.
                className="absolute top-full left-1/2 -ml-[104px] mt-3 w-52 bg-white rounded-2xl shadow-xl border border-border/60 opacity-0 flex-col py-2 px-1"
                style={{ visibility: 'hidden', display: 'none', transformOrigin: 'top center' }}
              >
                <a
                  href="/#how-it-works"
                  onClick={(e) => handleNavClick(e, 'how-it-works')}
                  className="flex flex-col px-4 py-3 rounded-xl hover:bg-surface transition-colors"
                >
                  <span className="text-[13px] font-bold text-brand">How it works</span>
                  <span className="text-[11px] text-muted mt-0.5 font-normal">Connect cards, automate claims</span>
                </a>
                <a
                  href="/#insights"
                  onClick={(e) => handleNavClick(e, 'insights')}
                  className="flex flex-col px-4 py-3 rounded-xl hover:bg-surface transition-colors"
                >
                  <span className="text-[13px] font-bold text-brand">Insights</span>
                  <span className="text-[11px] text-muted mt-0.5 font-normal">Understand your hidden spending</span>
                </a>
                <a
                  href="/#assistant"
                  onClick={(e) => handleNavClick(e, 'assistant')}
                  className="flex flex-col px-4 py-3 rounded-xl hover:bg-surface transition-colors"
                >
                  <span className="text-[13px] font-bold text-brand">Assistant</span>
                  <span className="text-[11px] text-muted mt-0.5 font-normal">Chat with your statements</span>
                </a>
              </div>
            </div>

            <Link
              to="/about"
              className={`nav-link opacity-0 relative px-2 py-2 transition-all duration-300 flex flex-col items-center group ${location.pathname === '/about' ? 'text-brand font-bold' : 'hover:text-brand'}`}
            >
              About
              <span className={`absolute -bottom-1 w-1 h-1 rounded-full bg-accent transition-all duration-300 ${location.pathname === '/about' ? 'scale-100 opacity-100' : 'scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100'}`} />
            </Link>
            <Link
              to="/faq"
              className={`nav-link opacity-0 relative px-2 py-2 transition-all duration-300 flex flex-col items-center group ${location.pathname === '/faq' ? 'text-brand font-bold' : 'hover:text-brand'}`}
            >
              FAQ
              <span className={`absolute -bottom-1 w-1 h-1 rounded-full bg-accent transition-all duration-300 ${location.pathname === '/faq' ? 'scale-100 opacity-100' : 'scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100'}`} />
            </Link>
          </div>

          <div className="nav-cta opacity-0 flex items-center gap-4 md:gap-6">
            <Link to="/contact" className="text-[15px] font-bold text-brand hover:text-accent transition-colors hidden sm:block">Contact</Link>
            <button className="bg-brand text-bg px-5 py-2 md:px-6 md:py-2.5 rounded-full text-[15px] font-bold hover:bg-accent hover:text-bg transition-colors shadow-sm">
              Get Started
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}
