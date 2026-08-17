import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { createScope, stagger } from 'animejs';
import { fadeUpOnScroll, timelineOnScroll } from '../utils/animations';

/* Isometric card stack — hero */
function CardStack() {
  return (
    <svg viewBox="0 0 600 480" className="w-full h-full" aria-label="Isometric stack of credit cards">
      <g stroke="rgba(141,196,172,.10)" strokeWidth="1">
        <path d="M60 300 L300 438 M140 254 L380 392 M220 208 L460 346 M300 162 L540 300" />
        <path d="M540 300 L300 438 M460 254 L220 392 M380 208 L140 346 M300 162 L60 300" />
      </g>
      <g className="card-group anim-reveal">
        <ellipse cx="300" cy="392" rx="150" ry="46" fill="#8DC4AC" opacity=".07" />
      </g>
      <g className="card-group anim-reveal">
        <polygon points="321.6,357.5 200.4,287.5 200.4,296.5 321.6,366.5" fill="#131C17" />
        <polygon points="399.6,312.5 321.6,357.5 321.6,366.5 399.6,321.5" fill="#0F1713" />
        <polygon points="278.4,242.5 399.6,312.5 321.6,357.5 200.4,287.5" fill="#22302A" stroke="rgba(141,196,172,.28)" strokeWidth="1.2" />
      </g>
      <g className="card-group anim-reveal">
        <polygon points="321.6,282.5 200.4,212.5 200.4,221.5 321.6,291.5" fill="#16211B" />
        <polygon points="399.6,237.5 321.6,282.5 321.6,291.5 399.6,246.5" fill="#111A15" />
        <polygon points="278.4,167.5 399.6,237.5 321.6,282.5 200.4,212.5" fill="#2C4035" stroke="rgba(141,196,172,.4)" strokeWidth="1.2" />
      </g>
      <g className="card-group anim-reveal">
        <polygon points="321.6,207.5 200.4,137.5 200.4,146.5 321.6,216.5" fill="#1B2721" />
        <polygon points="399.6,162.5 321.6,207.5 321.6,216.5 399.6,171.5" fill="#141E19" />
        <polygon points="278.4,92.5 399.6,162.5 321.6,207.5 200.4,137.5" fill="#35473C" stroke="#8DC4AC" strokeWidth="1.4" />
        <polygon points="252,123 286,142.6 269,152.4 235,132.8" fill="#8DC4AC" opacity=".85" />
        <path d="M300 175 L342 150.7 M312 182 L354 157.7" stroke="rgba(141,196,172,.55)" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/* Isometric hourglass — tasks in, hours back out */
function Hourglass() {
  return (
    <svg viewBox="0 0 600 440" className="w-full h-full" aria-label="Isometric hourglass: admin tasks going in, hours of time coming back out">
      <g stroke="rgba(141,196,172,.08)" strokeWidth="1">
        <path d="M80 320 L300 447 M160 274 L380 401 M240 228 L460 355" />
        <path d="M520 320 L300 447 M440 274 L220 401 M360 228 L140 355" />
      </g>
      <g className="hourglass-group anim-reveal">
        <ellipse cx="300" cy="330" rx="150" ry="44" fill="#8DC4AC" opacity=".07" />
      </g>
      <g className="hourglass-group anim-reveal">
        <polygon points="120,170 152,188.5 132,200 100,181.5" fill="#22302A" stroke="rgba(141,196,172,.22)" strokeWidth="1.1" />
        <polygon points="96,132 128,150.5 108,162 76,143.5" fill="#1D2822" stroke="rgba(141,196,172,.16)" strokeWidth="1.1" />
      </g>
      <g className="hourglass-group anim-reveal">
        <path d="M150 192 Q196 160 244 174" fill="none" stroke="rgba(141,196,172,.3)" strokeWidth="1.5" strokeDasharray="6 7" />
      </g>
      <g className="hourglass-group anim-reveal">
        <path d="M210 320 L210 338 A90 26 0 0 0 390 338 L390 320 Z" fill="#141E19" />
        <ellipse cx="300" cy="320" rx="90" ry="26" fill="#22302A" stroke="rgba(141,196,172,.4)" strokeWidth="1.2" />
        <path d="M210 120 C210 172 292 192 292 220 C292 248 210 268 210 320 L390 320 C390 268 308 248 308 220 C308 192 390 172 390 120 Z" fill="rgba(141,196,172,.06)" />
        <path d="M238 162 A62 18 0 0 0 362 162 C362 192 308 206 308 220 L292 220 C292 206 238 192 238 162 Z" fill="#8DC4AC" opacity=".8" />
        <path d="M300 222 L300 288" stroke="#8DC4AC" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M214 318 Q250 310 300 276 Q350 310 386 318 A90 24 0 0 1 214 318 Z" fill="#8DC4AC" opacity=".85" />
        <path d="M210 120 C210 172 292 192 292 220 C292 248 210 268 210 320" fill="none" stroke="#8DC4AC" strokeWidth="1.8" />
        <path d="M390 120 C390 172 308 192 308 220 C308 248 390 268 390 320" fill="none" stroke="#8DC4AC" strokeWidth="1.8" />
        <path d="M204 108 L204 126 A96 28 0 0 0 396 126 L396 108 Z" fill="#1B2721" />
        <ellipse cx="300" cy="108" rx="96" ry="28" fill="#2C4035" stroke="#8DC4AC" strokeWidth="1.4" />
      </g>
      <g className="hourglass-group anim-reveal">
        <path d="M356 174 Q420 152 466 132" fill="none" stroke="rgba(141,196,172,.3)" strokeWidth="1.5" strokeDasharray="6 7" />
      </g>
      <g className="hourglass-group anim-reveal">
        <polygon points="470,120 497.7,136 478.6,147 450.9,131" fill="#8DC4AC" opacity=".9" />
        <polygon points="500,88 527.7,104 508.6,115 480.9,99" fill="#8DC4AC" opacity=".55" />
        <polygon points="527,58 554.7,74 535.6,85 507.9,69" fill="#8DC4AC" opacity=".28" />
      </g>
    </svg>
  );
}

const KICKER = 'block text-[11px] font-extrabold uppercase tracking-[.2em] text-accent';

const FITS = [
  { tag: 'IDEAL FIT', title: 'You hold premium accounts.', body: 'High-tier cards offer benefits that frequently expire unused. We ensure they are fully capitalised upon.' },
  { tag: 'IDEAL FIT', title: 'You prefer delegation.', body: 'You want to define an objective and have it resolved without managing the intermediate steps.' },
  // { tag: 'NOT A FIT', title: 'You enjoy micromanaging.', body: "If you find satisfaction in tracking every cent and filing your own disputes, our service is redundant for you." }
];

const PRINCIPLES = [
  {
    title: 'Read-only access',
    body: 'We cannot move funds or view your login credentials.',
    icon: (
      <>
        <rect x="4" y="10" width="16" height="10" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>
    )
  },
  {
    title: 'Silent execution',
    body: 'We operate in the background. You only hear from us when capital is recovered.',
    icon: (
      <>
        <path d="M12 3a9 9 0 1 0 9 9" />
        <path d="M12 7v5l3 2" />
      </>
    )
  },
  {
    title: 'Absolute privacy',
    body: 'Your data is strictly yours. It is never sold or used to train third-party AI.',
    icon: <path d="M12 22s8-4.5 8-11V5l-8-3-8 3v6c0 6.5 8 11 8 11Z" />
  },
  {
    title: 'Direct return',
    body: 'Recovered funds flow directly back to the original account.',
    icon: (
      <>
        <path d="M12 2v4" />
        <path d="M12 18v4" />
        <path d="M4.9 4.9l2.8 2.8" />
        <path d="M16.3 16.3l2.8 2.8" />
        <circle cx="12" cy="12" r="5" />
      </>
    )
  }
];

const PROVIDERS = [
  { name: 'Plaid', body: 'Transaction and balance data across national banks, regionals, credit unions and brokerages.' },
  { name: 'Spinwheel', body: 'Liability and debt accounts that transaction feeds alone tend to miss.' }
];

export default function About() {
  const root = useRef(null);
  const scope = useRef(null);

  useEffect(() => {
    const node = root.current;
    if (!node) return undefined;

    const showAll = () => {
      node.querySelectorAll('.anim-reveal').forEach((el) => {
        el.style.opacity = '1';
      });
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      showAll();
      return undefined;
    }

    try {
      scope.current = createScope({ root: node }).add(() => {
        // Hero
        timelineOnScroll(node.querySelector('.hero-section'), (tl) => {
          tl.add('.hero-text', {
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 600,
            delay: stagger(100)
          })
            .add('.card-group', {
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 600,
              delay: stagger(60, { from: 'first' }),
              ease: 'outQuart'
            }, '-=500');
        }, { scrollStart: 'top 95%' });

        // Pull quote
        fadeUpOnScroll('.pull-quote-text', node.querySelector('.pull-quote-section'), { staggerMs: 150 });

        // Who it's for
        timelineOnScroll(node.querySelector('.who-section'), (tl) => {
          tl.add('.who-text', {
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 600,
            delay: stagger(100)
          })
            .add('.hourglass-group', {
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 600,
              delay: stagger(60, { from: 'first' }),
              ease: 'outQuart'
            }, '-=500');
        });

        // Principles
        fadeUpOnScroll('.principle-card', node.querySelector('.principles-section'), { staggerMs: 100 });

        // Connect
        fadeUpOnScroll('.connect-text', node.querySelector('.connect-section'), { staggerMs: 100 });
        fadeUpOnScroll('.provider-card', node.querySelector('.connect-section'), { staggerMs: 150, delay: 200 });

        // CTA
        fadeUpOnScroll('.cta-item', node.querySelector('.cta-section'), { staggerMs: 100 });
      });
    } catch (err) {
      showAll();
    }

    return () => scope.current?.revert();
  }, []);

  return (
    <div ref={root} className="bg-bg text-brand">
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .anim-reveal { opacity: 0; }
        }
      `}</style>
      {/* Hero */}
      <section className="hero-section flex flex-col lg:flex-row min-h-[560px]">
        <div className="flex-1 px-6 py-24 sm:px-8 lg:px-20 lg:py-32 flex flex-col justify-center">
          <div className="hero-text anim-reveal mb-6 self-start">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-[11px] font-extrabold uppercase tracking-[.2em] text-accent">
              About Amalgamic
            </span>
          </div>
          <h1 className="font-serif text-5xl leading-[1.05] tracking-tight md:text-[80px] mb-7 text-pretty hero-text anim-reveal">
            Financial administration, completely delegated.
          </h1>
          <p className="text-lg leading-relaxed text-brand/70 max-w-[30rem] hero-text anim-reveal">
            Stop managing the margins. We handle the tedious financial upkeep so you can focus on what actually moves the needle.
          </p>
        </div>
        <div className="flex-1 relative bg-brand flex items-center justify-center min-h-[360px] lg:min-h-full">
          <CardStack />
        </div>
      </section>

      {/* Pull quote */}
      <section className="pull-quote-section px-6 py-32 sm:px-8 bg-brand text-bg">
        <div className="max-w-[1200px] mx-auto">
          <p className="font-serif italic text-3xl md:text-5xl leading-[1.3] max-w-[900px] mb-8 text-pretty pull-quote-text anim-reveal">
            &ldquo;Each amount is too small to be worth an afternoon on the phone, and collectively they are worth a great deal.&rdquo;
          </p>
          <p className="text-lg leading-relaxed text-bg/70 max-w-[640px] pull-quote-text anim-reveal">
            We securely connect to your accounts, identify leaked capital, and recover it. You define the objective; we execute the necessary admin.
          </p>
        </div>
      </section>

      {/* Who it's for */}
      <section className="who-section flex flex-col lg:flex-row items-stretch">
        <div className="flex-1 relative min-h-[420px] bg-brand">
          <Hourglass />
        </div>
        <div className="flex-1 px-6 py-24 sm:px-8 lg:px-20 lg:py-32 flex flex-col justify-center">
          <span className={`${KICKER} mb-6 who-text anim-reveal`}>Who it&apos;s for</span>
          <h2 className="font-serif text-5xl leading-tight mb-6 text-brand text-pretty who-text anim-reveal">
            Designed for those whose time outweighs the recovery.
          </h2>
          <p className="text-[15px] leading-relaxed text-muted mb-8 who-text anim-reveal">
            When an hour of your time is worth far more than a $45 late fee, ignoring it is a rational decision. We exist to close the gap between what you're owed and what's actually worth your attention.
          </p>
          <div className="flex flex-col gap-3.5">
            {FITS.map((f) => (
              <div key={f.title} className="flex gap-3.5 items-baseline who-text anim-reveal">
                <span
                  className={`text-[11px] font-extrabold w-[80px] flex-none ${f.tag === 'IDEAL FIT' ? 'text-accent' : 'text-muted'
                    }`}
                >
                  {f.tag}
                </span>
                <p className="m-0 text-[14.5px] leading-relaxed text-brand/80">
                  <strong className="text-brand">{f.title}</strong> {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Operating principles */}
      <section className="principles-section py-32 px-6 sm:px-8 max-w-[1200px] mx-auto">
        <span className={`${KICKER} mb-6 text-center principle-card anim-reveal`}>Operating principles</span>
        <h2 className="font-serif text-5xl text-center max-w-[640px] mx-auto mb-20 leading-tight text-brand principle-card anim-reveal">
          Four rules that don&apos;t change as we grow.
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-7 max-w-[1120px] mx-auto">
          {PRINCIPLES.map((p) => (
            <div key={p.title} className="text-center principle-card anim-reveal">
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-5">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2C4035"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  {p.icon}
                </svg>
              </div>
              <h4 className="font-serif text-[17px] mb-2.5">{p.title}</h4>
              <p className="text-[13.5px] text-muted leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How we connect */}
      <section className="connect-section py-32 px-6 sm:px-8 bg-surface">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1">
            <span className={`${KICKER} mb-6 connect-text anim-reveal`}>How we connect</span>
            <h2 className="font-serif text-5xl leading-tight mb-6 text-brand text-pretty connect-text anim-reveal">
              Comprehensive coverage through secure infrastructure.
            </h2>
            <p className="text-[15px] leading-relaxed text-muted connect-text anim-reveal">
              By partnering with strictly regulated data providers, we ensure secure, read-only access to over <span className="font-semibold italic text-accent">12,000 </span>financial institutions globally.
            </p>
          </div>
          <div className="flex-1 flex flex-col gap-4 w-full">
            {PROVIDERS.map((p) => (
              <div key={p.name} className="bg-white rounded-2xl p-6 provider-card anim-reveal">
                <span className="block text-[10px] font-extrabold uppercase tracking-[.14em] text-muted mb-2">
                  {p.name}
                </span>
                <p className="text-sm text-brand/80 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section >

      {/* CTA */}
      < section className="cta-section py-32 px-6 sm:px-8 text-center max-w-[1200px] mx-auto" >
        <h2 className="font-serif text-5xl mb-6 text-brand leading-tight cta-item anim-reveal">Reclaim your time and capital.</h2>
        <p className="text-muted text-[15px] mb-10 cta-item anim-reveal">Connect your accounts securely, and let us handle the tedious financial upkeep.</p>
        <a
          href="https://cards.amalgamic.io/dashboard"
          className="inline-flex items-center gap-2 bg-accent text-bg px-10 py-[18px] rounded-2xl font-extrabold text-[15px] hover:bg-brand transition-colors cta-item anim-reveal"
        >
          Start Saving in 60 Seconds <ArrowRight size={16} />
        </a>
      </section >
    </div >
  );
}
