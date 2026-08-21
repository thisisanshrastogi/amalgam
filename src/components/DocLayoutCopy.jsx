import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

/* ---------------------------------------------------------------------------
   DocLayout

   The layout for reference pages: FAQ, Privacy, Terms, Supported Banks. Pages
   people arrive at with a question already formed and scan for one clause.
   About no longer uses this -- it is a marketing page and is built from bands.

   Two variants remain:

     reference  the default now. Rail, read indicator, stacked sections.
     essay      sticky label in the left margin, no rail. Currently unused
                since About moved off it. Kept because FAQ may want it if the
                answers grow long enough to read straight through, but if that
                does not happen within a release or two, delete it rather than
                carrying a second code path nobody exercises.

   ── Palette rule ─────────────────────────────────────────────────────────
   No mint anywhere in this file. These pages are paper-grounded, and mint on
   paper goes weak and slightly sickly at anything above hairline scale. It was
   previously carrying the active rail state and the link hover, both of which
   now use ink. The accent lives on ink grounds only: the homepage's dark
   bands, and one mark on About's principles.

   Active state without colour: the numeral goes to full ink and a rule appears
   in the left margin. Position and weight, not hue.

     paper #F5F2EA   ink #171613
--------------------------------------------------------------------------- */

const DocContext = createContext('reference');

/* One number, used in three places that must agree: the section scroll offset,
   the rail's sticky top, and the observer's top rootMargin. If you ship a nav
   variant with a different height, this is the only line to change. */
const NAV_CLEARANCE = 120;

const docStyles = `
  .doc-root {
    --paper: #F5F2EA;
    --ink: #171613;
  }

  /* Anchor links and deep links used to drop the heading underneath the fixed
     nav. scroll-margin fixes both, and costs nothing. */
  .doc-root [data-doc-section] { scroll-margin-top: ${NAV_CLEARANCE}px; }

  .doc-prose a {
    color: var(--ink);
    text-decoration: underline;
    text-decoration-color: rgba(23,22,19,0.25);
    text-underline-offset: 3px;
    transition: text-decoration-color 0.2s ease;
  }
  .doc-prose a:hover { text-decoration-color: rgba(23,22,19,0.65); }

  .doc-prose strong { font-weight: 500; color: var(--ink); }

  /* Legal pages use subheadings heavily; they were unstyled before. */
  .doc-prose h3 {
    font-weight: 500;
    color: var(--ink);
    font-size: 16px;
    letter-spacing: 0.01em;
    margin-top: 2rem;
    margin-bottom: 0.5rem;
  }

  .doc-prose ul { list-style: disc; padding-left: 1.15rem; }
  .doc-prose ol { list-style: decimal; padding-left: 1.3rem; }
  .doc-prose li + li { margin-top: 0.3rem; }

  @media (prefers-reduced-motion: no-preference) {
    .doc-root { scroll-behavior: smooth; }
  }
`;

/* ── section ─────────────────────────────────────────────────────────────── */
export function DocSection({ id, num, title, claim, children }) {
  const variant = useContext(DocContext);

  if (variant === 'essay') {
    return (
      <section
        id={id}
        data-doc-section
        className="grid grid-cols-1 gap-4 border-b border-ink/10 py-10 md:grid-cols-[176px_1fr] md:gap-9 md:py-12"
      >
        <div className="self-start md:sticky" style={{ top: NAV_CLEARANCE }}>
          <span className="block font-mono text-[10px] tracking-[0.18em] text-ink/35">{num}</span>
          <h2 className="mt-2 text-[15px] font-medium leading-snug text-ink">{title}</h2>
        </div>

        <div className="max-w-[62ch]">
          {claim && (
            <p className="mb-4 font-serif text-[clamp(1.35rem,2.2vw,1.7rem)] leading-[1.25] tracking-[-0.01em] text-ink">
              {claim}
            </p>
          )}
          <div className="doc-prose space-y-3.5 text-[16.5px] leading-[1.72] text-muted">
            {children}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id={id} data-doc-section className="border-b border-ink/10 py-12 first:pt-6">
      <span className="block text-[10px] font-medium uppercase tracking-[0.2em] text-ink/45">
        {num}
      </span>
      <h2 className="mt-3 font-serif text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.14] tracking-[-0.01em] text-ink">
        {title}
      </h2>
      <div className="doc-prose mt-5 max-w-[62ch] space-y-3.5 text-[16.5px] leading-[1.72] text-muted">
        {children}
      </div>
    </section>
  );
}

/* ── hairline list ────────────────────────────────────────────────────────
   Replaces bordered card grids. `muted` dims an item without moving it or
   changing its shape, so an exception reads as an exception rather than as a
   different component. */
export function DocList({ items = [], marker = false }) {
  return (
    <div className="mt-6 border-t border-ink/15">
      {items.map((it) => (
        <div key={it.title} className="border-b border-ink/10 py-4">
          <div className={`text-[16px] ${it.muted ? 'text-ink/45' : 'text-ink'}`}>
            {marker && (
              <span aria-hidden="true" className="mr-2.5 text-ink/30">
                {it.muted ? '\u00D7' : '\u2014'}
              </span>
            )}
            {it.title}
          </div>
          {it.body && (
            <div className="mt-1 text-[14.5px] leading-[1.65] text-muted">{it.body}</div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ── closing block ───────────────────────────────────────────────────────── */
export function DocCTA({
  title = 'Ready to automate your finances?',
  body = 'Connect your accounts once. We handle the admin from there.',
  href = 'https://cards.amalgamic.io/auth/signin',
  label = 'Get started',
  notes = ['Read-only access', 'Revoke any time'],
}) {
  return (
    <div className="mt-16 grid items-center gap-8 rounded-2xl bg-ink px-8 py-10 md:grid-cols-[1fr_auto] md:px-12 md:py-12">
      <div>
        <h2 className="font-serif text-[28px] leading-[1.15] tracking-[-0.01em] text-white md:text-[32px]">
          {title}
        </h2>
        <p className="mt-2.5 max-w-[42ch] text-[15.5px] leading-[1.65] text-white/60">{body}</p>
      </div>
      <div className="flex flex-col items-start gap-4 md:items-end">
        <a
          href={href}
          className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white px-7 py-3.5 text-[15px] font-medium text-ink transition-opacity hover:opacity-85"
        >
          {label}
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
            &rarr;
          </span>
        </a>
        <div className="flex gap-5">
          {notes.map((n) => (
            <span key={n} className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/35">
              {n}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── one rail link, shared by the desktop rail and the mobile disclosure ─── */
const RailLink = ({ link, active, onClick }) => (
  <a
    href={`#${link.id}`}
    aria-current={active ? 'location' : undefined}
    onClick={onClick}
    className={`flex gap-2.5 border-l py-1.5 pl-3 text-[14px] leading-snug transition-colors ${active ? 'border-ink text-ink' : 'border-transparent text-muted hover:text-ink'
      }`}
  >
    <span
      className={`flex-none pt-[3px] font-mono text-[10px] tracking-[0.14em] ${active ? 'text-ink' : 'text-ink/30'
        }`}
    >
      {link.num}
    </span>
    <span>{link.label}</span>
  </a>
);

export default function DocLayout({ variant = 'reference', groups = [], children, headerProps = {} }) {
  const root = useRef(null);
  const [activeId, setActiveId] = useState('');
  const [readPct, setReadPct] = useState(0);

  const hasRail = variant === 'reference' && groups.length > 0;

  /* Section tracking. One observer, no per-event DOM queries, no layout reads
     on scroll. The rootMargin collapses the root to a band just under the nav,
     so "active" means "the section currently crossing that line". */
  useEffect(() => {
    if (!hasRail || !root.current) return undefined;

    const sections = Array.from(root.current.querySelectorAll('[data-doc-section][id]'));
    if (!sections.length) return undefined;

    const seen = new Map();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => seen.set(e.target.id, e.isIntersecting));
        const first = sections.find((s) => seen.get(s.id));
        if (first) setActiveId(first.id);
      },
      { rootMargin: `-${NAV_CLEARANCE}px 0px -72% 0px`, threshold: 0 }
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [hasRail]);

  /* Read indicator, rAF-throttled. */
  useEffect(() => {
    if (!hasRail) return undefined;

    let raf = 0;
    const update = () => {
      raf = 0;
      const d = document.documentElement;
      const max = d.scrollHeight - d.clientHeight;
      setReadPct(max > 0 ? Math.min(100, Math.round((d.scrollTop / max) * 100)) : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [hasRail]);

  const allLinks = groups.flatMap((g) => g.links);

  return (
    <DocContext.Provider value={variant}>
      {/* The nav is fixed at top:24 and runs about 72px tall, so anything less
          than ~160px of top padding puts the eyebrow under the pill. */}
      <main ref={root} className="doc-root min-h-screen bg-paper pb-24 pt-[168px] md:pb-32 md:pt-[200px]">
        <style>{docStyles}</style>

        <div className={`mx-auto px-5 md:px-14 ${variant === 'essay' ? 'max-w-[1000px]' : 'max-w-[1240px]'}`}>
          {/* ── header ─────────────────────────────────────
              Eyebrow is the micro-label, not a pill. The pill was the last
              rounded-full chip on the site and read as a tag component
              borrowed from somewhere else. */}
          <header className="border-b border-ink/20 pb-12">
            {headerProps.category && (
              <span className="block text-[10px] font-medium uppercase tracking-[0.2em] text-ink/45">
                {headerProps.category}
              </span>
            )}

            <h1 className="mt-5 max-w-[16ch] font-serif text-[clamp(2.6rem,6vw,4rem)] leading-[1.02] tracking-[-0.02em] text-ink">
              {headerProps.title}
            </h1>

            {headerProps.lead && (
              <p className="mt-6 max-w-[46ch] text-[17.5px] leading-[1.65] text-muted">
                {headerProps.lead}
              </p>
            )}

            {/* No border-t: the header already closes with one, and two rules a
                few rems apart read as an empty box. */}
            {headerProps.meta && (
              <div className="mt-9 flex flex-wrap gap-x-9 gap-y-3">
                {headerProps.meta.map((m) => (
                  <span key={m.label} className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/45">
                    {m.label}
                    <span className="ml-2 text-ink/70">{m.value}</span>
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* ── mobile contents ────────────────────────────
              The rail was desktop-only, which left a long privacy policy with
              no navigation at all on a phone. Native <details>, no JS, closes
              itself on selection. */}
          {hasRail && (
            <details className="group border-b border-ink/12 py-4 md:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between text-[10px] font-medium uppercase tracking-[0.2em] text-ink/45">
                Contents
                <span aria-hidden="true" className="text-ink/35 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="mt-4">
                {allLinks.map((link) => (
                  <RailLink
                    key={link.id}
                    link={link}
                    active={activeId === link.id}
                    onClick={(e) => e.currentTarget.closest('details')?.removeAttribute('open')}
                  />
                ))}
              </div>
            </details>
          )}

          {hasRail ? (
            <div className="relative grid gap-14 md:grid-cols-[220px_1fr]">
              <div className="hidden md:block">
                <nav
                  className="sticky flex max-h-[calc(100vh-152px)] flex-col py-8"
                  style={{ top: NAV_CLEARANCE }}
                  aria-label="Sections"
                >
                  <div className="flex-1 overflow-y-auto pr-1">
                    {groups.map((group) => (
                      <div key={group.title} className="mb-6">
                        <span className="mb-2.5 block pl-3 text-[10px] font-medium uppercase tracking-[0.2em] text-ink/40">
                          {group.title}
                        </span>
                        {group.links.map((link) => (
                          <RailLink key={link.id} link={link} active={activeId === link.id} />
                        ))}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 border-t border-ink/12 pt-4">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-ink/45">
                      Read {readPct}%
                    </span>
                    <div className="mt-2 h-px w-full bg-ink/12">
                      <div
                        className="h-full bg-ink transition-[width] duration-150 ease-linear"
                        style={{ width: `${readPct}%` }}
                      />
                    </div>
                  </div>
                </nav>
              </div>

              <div className="pb-8">{children}</div>
            </div>
          ) : (
            <div className="pb-8">{children}</div>
          )}
        </div>
      </main>
    </DocContext.Provider>
  );
}