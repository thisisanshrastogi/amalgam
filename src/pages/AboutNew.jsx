import React, { useEffect, useRef } from 'react';
import { createScope } from 'animejs';
import { fadeUpOnScroll } from '../utils/animations';

/* ---------------------------------------------------------------------------
   About

   Marketing bands, not DocLayout. Built from the homepage's vocabulary so the
   two pages read as one site.

   ── Composition pass ─────────────────────────────────────────────────────
   Every band used to be the same shape: 1200px container, heading top-left,
   content beneath, repeated six times. Six changes, all structural:

     1. The hook stays full width: measure headline, then one large image
        running the container. The interlocking gesture moved to the principles
        panel instead of appearing twice.

     2. The mission opens in serif at display size and then drops to body,
        instead of running two paragraphs at one weight. Type scale is now
        doing hierarchy work it was not doing before.

     3. The founders' note carries $312 as a marginal figure. The page argues
        about money and did not contain a single numeral set in display type;
        the most persuasive number in the copy was buried mid-paragraph.

     4. A facts strip. Three things that are true, set as large tabular
        numerals. Money and figures in the sans, never the serif.

     5. The principles panel bleeds off the LEFT edge with a 52px corner, the
        same shape as the hero's ink panel. It is the only full-bleed ink on
        the page, which is what makes it the page's centre of gravity.

     6. The team tiles stagger. A flat 3-up grid of portraits is the most
        generic component available; offsetting the middle one turns it into a
        composed group.

   ── Palette rules ────────────────────────────────────────────────────────
   No mint on paper, ever. It appears twice on this page, both on ink: the
   Claims label in the principles panel, and the rule plus eyebrow on the
   closing CTA. Two ink bands, one mark each.

   ── The hook plate ───────────────────────────────────────────────────────
   Dithered background underneath, cutout of the people on top. Two absolutely
   positioned images in one frame, no blend modes, no interaction.

   ── Slots to fill before this ships ──────────────────────────────────────
     HOOK IMAGES  groupphotodither.png is the dithered background and fills the
                  frame. groupphoto.png is the people on a transparent
                  background, sitting on top. Export both from the same canvas
                  at the same dimensions, or the cutout will not line up with
                  where it sat in the original.
     FOUNDER      real name, title, photo.
     TEAM         real names, faces, roles. `prior` is optional per person.
     PRICING      marked in the principles panel.
     /why         linked from the note. Make sure it exists.

     paper #F5F2EA   paper-2 #EDE6D6   ink #171613   mint #64B387 (ink only)
--------------------------------------------------------------------------- */

/* Two plates. The dithered one is the full background; the cutout is the
   people on transparency, sitting on top of it. Repoint if they live
   somewhere other than /about/. */
const HOOK_DITHER = '/about/groupphotodither.png'; // background, fills the frame
const HOOK_CUTOUT = '/about/groupphotogray.png';       // people, transparent bg

const FOUNDER = {
    name: '[Name]',
    title: '[Title]',
    photo: null, // '/about/founder.jpg'
};

/* Only things that are demonstrably true. Do not add a recovered-to-date
   figure here until it is one you would defend in writing. */
const FACTS = [
    { figure: '12,000+', label: 'US institutions covered' },
    { figure: '2', label: 'Regulated data providers' },
    { figure: '100%', label: 'Of recoveries returned to you' },
];

const PRINCIPLES = [
    { label: 'The test', title: 'Fewer things to do, not more things to see', body: 'If a feature shows you more things you should be doing instead of doing them, we do not ship it.' },
    { label: 'Access', title: 'Read-only by default', body: 'No bank logins. Access comes through Plaid or Spinwheel, revocable at either end.' },
    { label: 'Contact', title: 'Quiet by design', body: 'We treat notifications sent as a cost, not a metric to grow.' },
    { label: 'Data', title: 'Your data stays yours', body: 'Never sold, never used to train models.' },
    { label: 'Money', title: 'Recoveries are yours', body: 'All of it, back to the account it came from.' },
    { label: 'Claims', title: 'We say what we cannot do', body: 'Every claim on this site is one we can defend. Where we are early, we say so.', accent: true },
];

const TEAM_COUNT = '[Six] people, based in [location].';
const TEAM = [
    { name: '[Name]', role: '[Role]', owns: '[What they own here, one line.]', photo: null },
    { name: '[Name]', role: '[Role]', owns: '[What they own here, one line.]', photo: null },
    { name: '[Name]', role: '[Role]', owns: '[What they own here, one line.]', photo: null },
];

const aboutStyles = `
  .about-root {
    --paper: #F5F2EA;
    --paper-2: #EDE6D6;
    --ink: #171613;
    --mint: #64B387;
  }
  .about-root .prose a {
    color: inherit;
    text-decoration: underline;
    text-decoration-color: rgba(23,22,19,0.25);
    text-underline-offset: 3px;
    transition: text-decoration-color 0.2s ease;
  }
  .about-root .prose a:hover { text-decoration-color: rgba(23,22,19,0.65); }

  /* ── the hook plate ─────────────────────────────────────────────────────
     Dithered background fills the frame; the cutout of the people sits on top
     of it on transparency. No blend modes: multiply would mix the cutout into
     the background instead of standing it on top, which is the whole point.
     Both use object-fit: cover so they stay in register if the frame's aspect
     differs from the files'. */
  .about-root .hook-plate img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media (prefers-reduced-motion: reduce) {
    .about-root .fade-in { opacity: 1 !important; transform: none !important; }
  }
`;

const Eyebrow = ({ children, tone = 'ink' }) => (
    <span
        className={`block text-[10px] font-medium uppercase tracking-[0.2em] ${tone === 'ink' ? 'text-ink/45' : 'text-white/40'
            }`}
    >
        {children}
    </span>
);

/* Flat slot. Hairline, warm ground, a caption in the corner so an unfilled
   slot is obviously unfilled rather than quietly shipping as decoration. */
const ImageSlot = ({ src, caption, className = '', rounded = 'rounded-2xl' }) => (
    <div className={`relative overflow-hidden ${rounded} bg-[var(--paper-2)] ring-1 ring-ink/10 ${className}`}>
        {src ? (
            <img src={src} alt="" className="h-full w-full object-cover" decoding="async" />
        ) : (
            caption && (
                <span className="absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/30">
                    {caption}
                </span>
            )
        )}
    </div>
);

export default function About() {
    const root = useRef(null);
    const scope = useRef(null);

    useEffect(() => {
        const node = root.current;
        if (!node) return undefined;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            node.querySelectorAll('.fade-in').forEach((el) => { el.style.opacity = '1'; });
            return undefined;
        }

        try {
            scope.current = createScope({ root: node }).add(() => {
                fadeUpOnScroll('.fade-in', node, { staggerMs: 70, translateY: 20 });
            });
        } catch (err) {
            node.querySelectorAll('.fade-in').forEach((el) => { el.style.opacity = '1'; });
            return undefined;
        }

        return () => scope.current?.revert();
    }, []);

    return (
        <div ref={root} className="about-root bg-paper">
            <style>{aboutStyles}</style>

            {/* ══ hook ═══════════════════════════════════════════
          Full-measure headline, then one large image running the full width of
          the container. The interlocking treatment moved to the principles
          panel, which is the better place for it -- there it is the only
          bleeding plane on the page, so it reads as deliberate rather than as
          a device used twice. */}
            <section className="px-6 pb-20 pt-[168px] sm:px-8 md:pt-[200px]">
                <div className="mx-auto max-w-[1200px]">
                    <div className="fade-in opacity-0"><Eyebrow>Company</Eyebrow></div>

                    <h1 className="fade-in mt-6 max-w-[19ch] font-serif text-[44px] leading-[1.06] tracking-[-0.02em] text-ink opacity-0 sm:text-[62px] lg:text-[clamp(58px,5.6vw,80px)]">
                        We do the financial admin you&rsquo;ve <em className="italic">correctly</em> decided to ignore.
                    </h1>

                    <p className="fade-in mt-8 max-w-[50ch] text-[18px] leading-[1.65] text-muted opacity-0">
                        The amounts are individually too small to chase and collectively too large to lose.
                    </p>

                    <div className="fade-in mt-16 opacity-0">
                        <div className="hook-plate relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-[var(--paper-2)] sm:aspect-[21/9]">
                            <img src={HOOK_DITHER} alt="" aria-hidden="true" decoding="async" className="scale-[1.03] opacity-60" />
                            <img src={HOOK_CUTOUT} alt="The Amalgamic team" decoding="async" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ mission ════════════════════════════════════════
          Opens in serif at display size, then drops to body. The old version
          ran both paragraphs at one weight, which read as a wall. */}
            <section className="px-6 py-20 sm:px-8 lg:py-28">
                <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[260px_1fr] lg:gap-20">
                    <div className="lg:sticky lg:top-[140px] lg:self-start">
                        <div className="fade-in opacity-0"><Eyebrow>Mission</Eyebrow></div>
                        <h2 className="fade-in mt-4 max-w-[14ch] text-[15px] font-medium leading-snug text-ink opacity-0">
                            What we&apos;re actually trying to fix
                        </h2>
                    </div>

                    <div className="max-w-[56ch]">
                        <p className="fade-in font-serif text-[28px] leading-[1.24] tracking-[-0.01em] text-ink opacity-0 lg:text-[36px]">
                            This is not a technology problem in the usual sense. It is an execution problem.
                        </p>
                        <p className="prose fade-in mt-7 text-[17px] leading-[1.72] text-muted opacity-0">
                            Someone has to actually sit through the retention flow, actually file the
                            dispute, actually remember that the credit expires on the 31st. Automation has
                            finally got good enough to do that reliably, and that is the entire reason
                            Amalgamic exists.
                        </p>
                    </div>
                </div>
            </section>

            {/* ══ founders' note ═════════════════════════════════
          The one place prose is the point. $312 sits in the margin because it
          is the most persuasive number in the copy and it was buried
          mid-paragraph. Figures in the sans, never the serif. */}
            <section className="border-y border-ink/12 bg-[var(--paper-2)] px-6 py-20 sm:px-8 lg:py-28">
                <div className="mx-auto grid max-w-[940px] gap-8 lg:grid-cols-[150px_1fr] lg:gap-16">
                    <div className="fade-in opacity-0 lg:sticky lg:top-[140px] lg:self-start lg:text-right">
                        <div className="font-medium tabular-nums tracking-[-0.02em] text-ink" style={{ fontSize: 42, lineHeight: 1 }}>
                            $312
                        </div>
                        <div className="mt-3 text-[10px] font-medium uppercase leading-relaxed tracking-[0.2em] text-ink/40">
                            The charge that
                            <br />
                            started this
                        </div>
                    </div>

                    <div>
                        <div className="fade-in opacity-0"><Eyebrow>A note</Eyebrow></div>

                        <h2 className="fade-in mt-4 font-serif text-[30px] leading-[1.12] tracking-[-0.015em] text-ink opacity-0 lg:text-[36px]">
                            A note from {FOUNDER.name}
                        </h2>

                        <div className="prose fade-in mt-7 max-w-[58ch] space-y-5 text-[17.5px] leading-[1.78] text-ink/75 opacity-0">
                            <p>
                                I found a $312 charge on a card I barely use. It was a software subscription I
                                had cancelled, or thought I had, fourteen months earlier. I spent forty minutes
                                on chat support getting it reversed, and then sat there thinking about how many
                                of those I had simply never found.
                            </p>
                            <p>
                                What stayed with me was not the money. It was realising I had made the sensible
                                decision hundreds of times, ignoring amounts that were not worth the effort, and
                                that the sensible decision had cost me a lot. The behaviour is correct and the
                                outcome is bad anyway. It only gets fixed if something else does the work.
                            </p>
                            <p>
                                We are small and we are early. What we do well now is cancellations, card
                                credits and recurring-charge detection. What is still rough, we would rather
                                tell you on the <a href="/why">why Amalgamic</a> page than have you find in week
                                three. If something does not work, my inbox is on the{' '}
                                <a href="/contact">contact page</a> and I read it.
                            </p>
                        </div>

                        <div className="fade-in mt-10 flex items-center gap-4 border-t border-ink/15 pt-7 opacity-0">
                            <ImageSlot src={FOUNDER.photo} rounded="rounded-full" className="h-14 w-14 flex-none" />
                            <div>
                                <div className="font-serif text-[19px] leading-tight text-ink">{FOUNDER.name}</div>
                                <div className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.2em] text-ink/45">
                                    {FOUNDER.title}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ facts ══════════════════════════════════════════
          Large tabular numerals, hairline separated. The page argues about
          arithmetic and had no arithmetic in it. */}
            <section className="px-6 py-16 sm:px-8">
                <div className="mx-auto max-w-[1200px]">
                    <div className="grid grid-cols-1 border-t border-ink/20 sm:grid-cols-3">
                        {FACTS.map((f) => (
                            <div
                                key={f.label}
                                className="fade-in border-b border-ink/12 py-8 opacity-0 sm:border-b-0 sm:border-r sm:border-r-ink/12 sm:pr-8 sm:last:border-r-0 lg:py-10"
                            >
                                <div className="font-medium tabular-nums tracking-[-0.02em] text-ink" style={{ fontSize: 46, lineHeight: 1 }}>
                                    {f.figure}
                                </div>
                                <div className="mt-4 max-w-[22ch] text-[10px] font-medium uppercase leading-relaxed tracking-[0.2em] text-ink/45">
                                    {f.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ principles ═════════════════════════════════════
          Bleeds off the left with a 52px corner, the hero's shape. The only
          full-bleed ink on the page, which makes it the page's centre. */}
            <section className="relative overflow-x-clip py-20 lg:py-28">
                <div
                    aria-hidden="true"
                    className="absolute inset-y-0 -left-[100vw] right-0 bg-ink lg:right-[5vw] lg:rounded-r-[52px]"
                />

                <div className="relative mx-auto max-w-[1160px] px-6 sm:px-8 lg:pr-20">
                    <div className="grid gap-8 lg:grid-cols-[1fr_340px] lg:items-end">
                        <div>
                            <div className="fade-in opacity-0"><Eyebrow tone="ink">Principles</Eyebrow></div>
                            <h2 className="fade-in mt-5 font-serif text-[40px] leading-[1.1] tracking-[-0.015em] text-white opacity-0 lg:text-[52px]">
                                How we work
                            </h2>
                        </div>
                        <p className="fade-in text-[15.5px] leading-[1.7] text-white/55 opacity-0 lg:pb-2">
                            The last one is the reason to believe the other five.
                        </p>
                    </div>

                    <div className="mt-14 border-t border-white/15">
                        {PRINCIPLES.map((p) => (
                            <div
                                key={p.title}
                                className="fade-in grid grid-cols-1 gap-1.5 border-b border-white/10 py-6 opacity-0 transition-colors duration-300 hover:bg-white/[0.025] md:grid-cols-[130px_1fr_minmax(0,40ch)] md:items-baseline md:gap-8"
                            >
                                {/* The page's only mint, on the commitment that makes the
                    others credible, on ink, where mint actually works. */}
                                <span
                                    className={`text-[10px] font-medium uppercase tracking-[0.2em] ${p.accent ? 'text-[var(--mint)]' : 'text-white/35'
                                        }`}
                                >
                                    {p.label}
                                </span>
                                <h3 className="font-serif text-[22px] leading-[1.2] text-white">{p.title}</h3>
                                <p className="text-[15px] leading-[1.6] text-white/55">{p.body}</p>
                            </div>
                        ))}
                    </div>

                    {/* PRICING SLOT — see the notes at the top of this file. */}
                </div>
            </section>

            {/* ══ team ═══════════════════════════════════════════
          Staggered rather than a flat 3-up. The offset is the difference
          between a group portrait and a spreadsheet of faces. */}
            <section className="px-6 py-20 sm:px-8 lg:py-28">
                <div className="mx-auto max-w-[1200px]">
                    <div className="grid gap-8 lg:grid-cols-[1fr_340px] lg:items-end">
                        <div>
                            <div className="fade-in opacity-0"><Eyebrow>Team</Eyebrow></div>
                            <h2 className="fade-in mt-5 font-serif text-[40px] leading-[1.1] tracking-[-0.015em] text-ink opacity-0 lg:text-[48px]">
                                Who&apos;s building it
                            </h2>
                        </div>
                        <p className="fade-in text-[15.5px] leading-[1.7] text-muted opacity-0 lg:pb-2">
                            {TEAM_COUNT}
                        </p>
                    </div>

                    <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                        {TEAM.map((m, i) => (
                            <div key={i} className={`fade-in opacity-0 ${i === 1 ? 'lg:mt-16' : ''}`}>
                                <ImageSlot
                                    src={m.photo}
                                    caption="Photo · 4:5"
                                    rounded="rounded-xl"
                                    className="aspect-[4/5] w-full"
                                />
                                <div className="mt-5 font-serif text-[21px] leading-tight text-ink">{m.name}</div>
                                <div className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-ink/45">
                                    {m.role}
                                </div>
                                <p className="mt-3 text-[15px] leading-[1.6] text-muted">{m.owns}</p>
                                {m.prior && <p className="mt-2 text-[14.5px] leading-[1.6] text-ink/40">{m.prior}</p>}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ try it ═════════════════════════════════════════ */}
            <section className="px-6 pb-28 sm:px-8">
                <div className="mx-auto max-w-[1200px]">
                    <div className="relative overflow-hidden rounded-2xl bg-ink px-8 py-14 sm:px-14 lg:py-16">
                        {/* Mint marks, on ink where mint works. The rule is the same 74px
                anchor bar used on the homepage's feature band, so this reads as
                the same system rather than a one-off. */}
                        <span
                            aria-hidden="true"
                            className="absolute left-8 top-0 block h-[3px] w-[74px] bg-[var(--mint)] sm:left-14"
                        />

                        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
                            <div>
                                <div className="fade-in opacity-0">
                                    <span className="block text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--mint)]">
                                        Try it
                                    </span>
                                </div>
                                <h2 className="fade-in mt-5 max-w-[18ch] font-serif text-[34px] leading-[1.1] tracking-[-0.015em] text-white opacity-0 lg:text-[44px]">
                                    The fastest way to find out is to connect one card.
                                </h2>
                                <p className="fade-in mt-5 max-w-[46ch] text-[16px] leading-[1.65] text-white/60 opacity-0">
                                    Link a single card, let Amalgamic look at the last twelve months, and see
                                    what it finds. If the answer is nothing, that cost you two minutes.
                                </p>
                            </div>

                            <div className="fade-in flex flex-col items-start gap-4 opacity-0 lg:items-end">
                                <a
                                    href="https://cards.amalgamic.io/auth/signin"
                                    className="group inline-flex items-center gap-2.5 whitespace-nowrap rounded-full bg-white px-8 py-4 text-[15px] font-medium text-ink transition-opacity hover:opacity-85"
                                >
                                    Connect one card
                                    <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                                        &rarr;
                                    </span>
                                </a>
                                <div className="flex gap-5">
                                    <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/35">
                                        Read-only access
                                    </span>
                                    <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/35">
                                        Revoke any time
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}