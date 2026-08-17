import React, { useState, useEffect } from 'react';

export function DocSection({ id, num, title, children }) {
  return (
    <section id={id} className="pt-16 first:pt-2">
      <span className="block text-[11px] uppercase tracking-[0.1em] text-muted mb-2 font-bold">{num}</span>
      <h2 className="font-serif text-[clamp(1.4rem,2.6vw,1.85rem)] mb-4 text-brand leading-tight">{title}</h2>
      <div className="text-[15px] leading-relaxed text-muted space-y-4 max-w-[68ch] [&_a]:text-brand [&_a]:underline [&_a]:decoration-border hover:[&_a]:decoration-accent [&_h3]:text-brand [&_h3]:font-bold [&_h3]:text-lg [&_h3]:mt-8 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">
        {children}
      </div>
    </section>
  );
}

export default function DocLayout({ groups = [], children, headerProps }) {
  const [activeId, setActiveId] = useState('');
  const [readPct, setReadPct] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const d = document.documentElement;
      const max = d.scrollHeight - d.clientHeight;
      const p = max > 0 ? Math.min(100, Math.round((d.scrollTop / max) * 100)) : 0;
      setReadPct(p);

      const secs = Array.from(document.querySelectorAll('section[id]'));
      let cur = secs.length ? secs[0].id : '';
      secs.forEach((s) => {
        if (s.getBoundingClientRect().top <= 150) cur = s.id;
      });
      setActiveId(cur);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <main className="pt-32 pb-32 bg-bg min-h-screen">
      <div className="max-w-[1240px] mx-auto px-5 md:px-14">
        
        {/* Document Header */}
        <header className="mb-12 border-b border-border pb-12">
          <span className="text-accent text-[11px] font-bold uppercase tracking-widest mb-6 inline-block bg-accent/5 px-3 py-1.5 rounded-full">
            {headerProps.category}
          </span>
          <h1 className="font-serif text-5xl md:text-6xl text-brand mb-6">{headerProps.title}</h1>
          <p className="text-muted text-xl leading-relaxed max-w-[60ch]">
            {headerProps.lead}
          </p>
          {headerProps.meta && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-10">
              {headerProps.meta.map((m, i) => (
                <div key={i} className="bg-surface border border-border p-4 rounded-xl shadow-sm">
                  <span className="uppercase tracking-widest text-muted block mb-1 text-[10px] font-bold">{m.label}</span>
                  <span className="text-[15px] font-bold text-brand">{m.value}</span>
                </div>
              ))}
            </div>
          )}
        </header>

        {/* Layout */}
        <div className="grid md:grid-cols-[236px_1fr] gap-14 relative">
          
          {/* Rail (Sidebar) */}
          <div className="hidden md:block">
            <nav className="sticky top-[104px] max-h-[calc(100vh-136px)] flex flex-col py-2" aria-label="Sections">
              <div className="flex-1 overflow-y-auto pr-1 scrollbar-hide">
                {groups.map((group, gIdx) => (
                  <div key={gIdx} className="mb-5">
                    <span className="text-[11px] uppercase tracking-widest text-muted block mb-2 font-bold">{group.title}</span>
                    {group.links.map((link) => (
                      <a
                        key={link.id}
                        href={`#${link.id}`}
                        className={`flex gap-2.5 px-3 py-1.5 rounded-md text-[13.5px] font-medium leading-snug transition-all ${
                          activeId === link.id ? 'bg-black/5 text-brand font-bold' : 'text-muted hover:bg-black/5 hover:text-brand'
                        }`}
                      >
                        <span className={`text-[10.5px] pt-[2px] flex-none font-bold ${activeId === link.id ? 'text-accent' : 'text-muted/60'}`}>
                          {link.num}
                        </span>
                        <span>{link.label}</span>
                      </a>
                    ))}
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <span className="text-[11px] uppercase tracking-widest text-muted block font-bold">Read {readPct}%</span>
                <div className="h-[3px] bg-black/5 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-accent transition-all duration-150 ease-linear" style={{ width: `${readPct}%` }}></div>
                </div>
              </div>
            </nav>
          </div>
          
          {/* Main Content */}
          <div className="pb-16">{children}</div>
        </div>
      </div>
    </main>
  );
}
