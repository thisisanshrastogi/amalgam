import React, { useEffect, useRef } from 'react';
import { createScope } from 'animejs';
import { fadeUpOnScroll } from '../utils/animations';

/* ---------------------------------------------------------------------------
   FeaturesGrid

   Reads as a continuation of the hero rather than a new section: same ink
   ground (#171613), same mint accent, no seam between the two. The section has
   no top border and no background change, only the trust bar's hairline to
   mark the transition.

     paper #F5F2EA   ink #171613   mint #64B387
     pine  #2E4236 fill, #35503F on hover (anchor only)
     slate #26241F fill, #2E2C26 on hover (both support tiles)

   ── Rejected, don't reintroduce ──────────────────────────────────────────
   Gradient section ground. Glassmorphic tiles (translucent fills, blurred
   radial spotlight, white inset highlight, scrim behind the copy). A dithered
   halftone spotlight. The card is a flat opaque rectangle with a 1px opaque
   edge; on hover it becomes a slightly lighter flat rectangle with a mint
   edge, and the copy appears. That's the whole interaction.

   Hierarchy, from an earlier pass:
        - Support tiles are both slate; pine belongs to the anchor alone.
          Lighter surfaces advance, darker recede, so the surface itself says
          which card matters instead of leaving that to width alone.
        - The anchor's body copy shows at rest (`open: true`). A section where
          every word of substance is behind a hover gives a scanning reader
          three titles and nothing else, and gives a touch user a layout whose
          emphasis it can't express. The anchor is now the entry point; the two
          support tiles keep the reveal, which is also what makes the anchor
          look like the anchor. Flip `open` in FEATURES to undo.
        - 01/02/03 became Cards / Subscriptions / Refunds. Reasoning at the
          marker itself.
        - Trust bar down a step, eyebrow added above the headline, hover prompt
          demoted, closing link added. Reasoning at each.

   ── Why the tall-anchor layout is gone ───────────────────────────────────
   The anchor tile was 760px tall, which is most of a laptop viewport. Because
   the copy reveals at the BOTTOM of the card, hovering the top of that tile
   put the payoff below the fold: you had to hold the pointer inside the card
   and scroll to read what the hover just revealed. A hover reveal only works
   if the whole card is in view at the moment it opens, so the constraint is
   hard -- no tile taller than roughly half a viewport.

   The fix is to spend the anchor's emphasis on WIDTH instead of height. Three
   tiles now sit in one row at the same 360px height, with the anchor taking
   ~1.35 of the horizontal budget. Same hierarchy (one dominant shape, two
   supporting), read in one glance, and the whole section clears in a single
   viewport: heading band, then one band of cards.

     ┌──────────────────────────────────────────────────────────────┐
     │  One place.                     Most people have four or more │
     │  Every card. Total control.     credit cards and no clear …   │
     ├───────────────────────────┬──────────────┬───────────────────┤
     │  01  anchor (1.35fr)      │  02 (1fr)    │  03 (1fr)         │
     │                       360px tall, all three                   │
     └───────────────────────────┴──────────────┴───────────────────┘

   Heading and intro now share one row above the cards rather than sitting in
   a side column, because a 360px band of tiles doesn't need a 700px column of
   type standing next to it.

   ── One anatomy, not two ─────────────────────────────────────────────────
   With every tile the same height, the big serif numeral no longer fits
   anywhere: at 88px it ate a third of the vertical budget, and the anchor
   can't afford it either now. All three use the tracked 11px marker instead.
   That's the accessory this layout can do without -- the anchor is already
   distinguished by width, a wider measure, and a larger title, which is
   enough. Emphasis carried by three signals rather than five.

   ── Vertical budget (360px, p-9) ─────────────────────────────────────────
   360 - 72 padding = 288 content.
     anchor:  marker 15 + gap 32 + rule 21 + title (2 lines @28px) 68 +
              lead 16 + body (4 lines @16/1.65) 104  = 256, 32px spare
     support: marker 15 + gap 32 + rule 21 + title (2 lines @22px) 55 +
              lead 16 + body (4 lines) 104           = 243, 45px spare
   The spare rows matter: the reveal should read as empty space filling in,
   not as text arriving at the edge of the box. If you lengthen the copy,
   check it against this, or drop the support body to 15px/1.6 first.

   ── Height invariant ─────────────────────────────────────────────────────
   Fixed height, not min-height. The reveal only avoids reflow if the outer box
   genuinely cannot change size. min-height is just a floor: once revealed text
   pushed past it the card grew, which grew the shared stretch-aligned grid
   row, which resized every sibling -- hovering one card nudged the others.
   With a fixed height the reveal has to redistribute space *inside* the box
   (see mt-auto) rather than add to it. Below sm the height is auto: there's no
   hover there, everything shows at rest, and a single column has no siblings
   to disturb. (The three tiles no longer have to sum to anything -- they're
   siblings in one row now, so the old 360*2+40=760 arithmetic is retired.)

   ── Reveal mechanics ─────────────────────────────────────────────────────
   The title+body block sits at the bottom of a flex column via mt-auto, which
   eats all leftover vertical space as a top margin. The body starts at
   grid-template-rows: 0fr (fully collapsed). On hover the row grows to 1fr and
   the mt-auto gap shrinks by exactly that amount, so total height never
   changes -- only how it's divided between empty space above and content
   below. The paragraph's own translate+fade rides on top so the text rises
   into place rather than appearing once the row has room.

   Contrast comes from the fill being opaque: the copy sits on a solid colour.

   Hover scoping: each tile uses a NAMED group (group/tile), not bare `group`.
   Bare `group` matches the nearest ancestor with that class -- including one
   several levels up if this ever renders inside another group-scoped tree.
--------------------------------------------------------------------------- */

const featureStyles = `
  .features-root {
    --paper: #F5F2EA;
    --ink: #171613;
    --mint: #64B387;
  }

  /* No hover to give, so give the copy up front. */
  @media (hover: none) {
    .features-root .tile-reveal { grid-template-rows: 1fr; }
    .features-root .tile-body { opacity: 1; transform: none; }
    .features-root .tile-rule { width: 56px; }
    .features-root .hover-prompt { display: none; }
  }
  @media (prefers-reduced-motion: reduce) {
    .features-root .tile-reveal,
    .features-root .tile-rule,
    .features-root .tile-body { transition-duration: 1ms; }
  }
`;

const SURFACES = {
  pine: {
    fill: '#2E4236',
    fillHover: '#35503F',
    edge: '#3E5648',
    // edgeHover: '#64B387',
  },
  slate: {
    fill: '#171613',
    fillHover: '#1D1C19',
    edge: '#2D2B27',
  },
};

const FEATURES = [
  {
    label: 'Cards',
    surface: SURFACES.pine,
    wide: true,
    open: true,
    title: 'All your credit cards, in one place',
    body: 'Connect every card once. Every balance, every due date, every dollar of available credit, in one view. Pay from one place and stop missing the dates that cost you late fees.',
  },
  {
    label: 'Subscriptions',
    surface: SURFACES.slate,
    wide: false,
    title: 'No more hold music',
    body: "The $12.99 subscription you haven't opened in eight months. We read every statement, flag it, and cancel it in one tap.",
  },
  {
    label: 'Refunds',
    surface: SURFACES.slate,
    wide: false,
    title: 'Real money back, on us',
    body: 'Duplicate charges, billing errors, fees that should have been waived. We find them and file the claim for you.',
  },
];

/* Ease curve shared by the lift, the rule and the reveal so every motion in a
   tile settles at the same rate -- an expo-out feel: fast start, long soft
   landing, reads as more considered than the linear/ease-out default. */
const EASE = 'cubic-bezier(0.19,1,0.22,1)';

const Tile = ({ label, surface, wide, open = false, title, body }) => {
  return (
    <article
      tabIndex={0}
      className={`feature-tile group/tile relative flex w-full flex-col overflow-hidden rounded-2xl p-7 opacity-0 outline-none ring-1 ring-inset transition-[background-color,box-shadow,transform] duration-200 will-change-transform bg-[var(--fill)] ring-[var(--edge)] hover:-translate-y-1 hover:bg-[var(--fill-hover)] hover:ring-[var(--edge-hover)] focus-within:bg-[var(--fill-hover)] focus-within:ring-[var(--edge-hover)] focus-visible:-translate-y-1 focus-visible:ring-2 sm:h-[360px] sm:p-9 ${wide ? 'sm:col-span-2 lg:col-span-1' : ''
        }`}
      style={{
        '--fill': surface.fill,
        '--fill-hover': surface.fillHover,
        '--edge': surface.edge,
        '--edge-hover': surface.edgeHover,
        transitionTimingFunction: EASE,
      }}
    >

      {/* Marker. Was 01 / 02 / 03, now the thing the card is actually about.
        Numbered markers earn their place when the content is a sequence; these
        three are parallel capabilities in no particular order, so the numerals
        were asserting an order that doesn't exist and spending the one
        scannable slot above the fold on nothing. A category word costs the
        same pixels and lets someone reading at speed take the whole section in
        without touching a pointer -- which is the point of the marker row.
        Not aria-hidden any more: it's content now, not decoration. */}
      <span className="relative z-[2] text-[11px] font-bold uppercase leading-none tracking-[0.22em] text-[rgba(255,255,255,0.42)] transition-colors duration-500 group-hover/tile:text-white group-focus-within/tile:text-white">
        {label}
      </span>

      {/* mt-auto pins this block's BOTTOM to the tile's bottom padding, so the
        title sits at the same height in every tile at rest -- and since the
        tile's height is fixed on sm+ (not min-height), that free space is a
        real, bounded budget rather than something the box can grow into. The
        body below is a 0fr grid row that expands to 1fr on hover, spending
        that budget instead of adding to it. */}
      <div className="relative z-[2] mt-auto pt-8">
        {/* One line that draws itself. The only element that gains ink on
          hover, which is why it reads as a signal and not as noise. */}
        <span
          aria-hidden="true"
          className={`tile-rule mb-5 block h-px bg-[var(--paper)] transition-[width] duration-700 ${open ? 'w-14' : 'w-0 group-hover/tile:w-14 group-focus-within/tile:w-14'
            }`}
          style={{ transitionTimingFunction: EASE }}
        />
        <h3
          className={`font-serif tracking-[-0.01em] text-[var(--paper)] ${wide ? 'max-w-[16ch] text-[24px] leading-[1.2] sm:text-[28px]' : 'text-[21px] leading-[1.25] sm:text-[22px]'
            }`}
        >
          {title}
        </h3>
        <div
          className={`tile-reveal grid transition-[grid-template-rows] duration-500 ${open
            ? 'grid-rows-[1fr]'
            : 'grid-rows-[0fr] group-hover/tile:grid-rows-[1fr] group-focus-within/tile:grid-rows-[1fr]'
            }`}
          style={{ transitionTimingFunction: EASE }}
        >
          <div className="overflow-hidden">
            <p
              className={`tile-body pt-4 leading-[1.65] text-[rgba(255,255,255,0.92)] transition-all duration-500 ease-out ${wide ? 'max-w-[45ch] text-[16px]' : 'max-w-[32ch] text-[15px]'
                } ${open
                  ? 'translate-y-0 opacity-100'
                  : '-translate-y-2 opacity-0 delay-100 group-hover/tile:translate-y-0 group-hover/tile:opacity-100 group-focus-within/tile:translate-y-0 group-focus-within/tile:opacity-100'
                }`}
            >
              {body}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default function FeaturesGrid() {
  const root = useRef(null);
  const scope = useRef(null);

  useEffect(() => {
    scope.current = createScope({ root: root.current }).add(() => {
      fadeUpOnScroll('.trust-item', root.current, {
        staggerMs: 60,
        translateY: 12,
      });
      fadeUpOnScroll('.feature-item', root.current, {
        staggerMs: 80,
        delay: 150,
        translateY: 20,
      });
      fadeUpOnScroll('.feature-tile', root.current, {
        staggerMs: 100,
        delay: 200,
        translateY: 28,
      });
    });

    return () => scope.current.revert();
  }, []);

  return (
    <section
      ref={root}
      id="features"
      className="features-root relative bg-[var(--ink)] pb-24 pt-12 lg:pb-32"
    >
      <style>{featureStyles}</style>

      {/* Trust bar. Demoted a step. It's the seam from the hero, not a heading,
          and at 11px/0.45 directly above a 60px headline it was competing for
          the eye's first stop -- two things asking to be read first is the same
          as none. Now it reads as the fine print it is. */}
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-6 border-b border-white/[0.08] px-8 pb-16 text-[10.5px] font-bold uppercase tracking-[0.18em] text-[rgba(255,255,255,0.36)]">
        <span className="trust-item opacity-0">Plaid &amp; Spinwheel</span>
        <span className="trust-item h-1 w-1 rounded-full bg-[rgba(255,255,255,0.3)] opacity-0"></span>
        <span className="trust-item opacity-0">Read-only by default</span>
        <span className="trust-item h-1 w-1 rounded-full bg-[rgba(255,255,255,0.3)] opacity-0"></span>
        <span className="trust-item opacity-0">12,000+ US institutions</span>
        <span className="trust-item h-1 w-1 rounded-full bg-[rgba(255,255,255,0.3)] opacity-0"></span>
        <span className="trust-item opacity-0">Zero data selling</span>
      </div>

      <div className="mx-auto max-w-[1200px] px-6 pt-16 sm:px-8 lg:pt-20">
        {/* Heading band. Baseline-aligned with the intro on the right so the
            two read as one line of thought, and short enough that the tiles
            below start well inside the fold. */}
        <div className="mb-12 grid gap-8 lg:mb-16 lg:grid-cols-[1fr_400px] lg:items-end lg:gap-16">
          <div>
            {/* Eyebrow. The ramp jumped from a 10.5px trust bar straight to a
                60px headline with nothing between, so the headline had to both
                announce the section and be the section's claim. This takes the
                announcing job off it. Left-aligned and mint against the trust
                bar's centred grey, so the two aren't mistaken for each other. */}
            <span className="feature-item mb-5 block text-[11px] font-bold uppercase tracking-[0.2em] text-[rgba(44,64,53,0.85)] opacity-0">
              What you get
            </span>
            {/* Paper, not pure white: white is a step outside the palette, and
                the top of a hierarchy should still look like it belongs to it. */}
            <h2 className="feature-item font-serif text-[40px] leading-[1.12] tracking-[-0.01em] text-[var(--paper)] opacity-0 sm:text-[52px] lg:text-[clamp(46px,4.8vw,62px)]">
              One place.
              <br className="hidden sm:inline" /> Every card. Total control.
            </h2>
          </div>
          <div className="lg:pb-3">
            <p className="feature-item text-[16px] leading-[1.7] text-[rgba(255,255,255,0.72)] opacity-0">
              Most people have four or more credit cards and no clear picture of what's
              happening across them.{' '}
              {/* Demoted from full mint. An instruction about how to operate the
                  UI was the highest-contrast text in the band, out-ranking the
                  sentence it was attached to. Guidance should sit below the
                  content it's guiding you through. */}
              <span className="hover-prompt text-[rgba(255,255,255,0.45)]">
                Hover the smaller cards for the rest.
              </span>
            </p>
            {/* Terminus. The band previously ended on a paragraph, so the eye
                finished the copy column with nowhere to go and fell back to the
                tiles. One action closes the sequence: eyebrow, claim, context,
                do the thing. */}
            <a
              href="https://cards.amalgamic.io"
              className="feature-item group/cta mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-[var(--paper)] opacity-0 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-[rgba(44,64,53,0.6)]"
            >
              Get started
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover/cta:translate-x-1"
                style={{ transitionTimingFunction: EASE }}
              >
                &rarr;
              </span>
            </a>
          </div>
        </div>

        {/* One band of cards, equal height, anchor wider rather than taller.
            At sm the anchor spans both columns and the pair sits beneath it;
            below sm everything stacks and heights go auto. */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-[1.35fr_1fr_1fr] lg:gap-8">
          {FEATURES.map((feature) => (
            <Tile key={feature.label} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}