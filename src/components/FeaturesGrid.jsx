import React, { useEffect, useRef } from 'react';
import { createScope } from 'animejs';
import { fadeUpOnScroll } from '../utils/animations';

/* ---------------------------------------------------------------------------
   FeaturesGrid

   Layout, reveal mechanics and motion spec are unchanged from the version that
   worked. Three things were touched, all listed under "2026 pass" below:
   surface palette, marker/trust-bar type, and the seam with the hero.

     paper #F5F2EA   ink #171613   mint #64B387

   ── 2026 pass ────────────────────────────────────────────────────────────
   1. Surfaces. The anchor is a real green that reads as green on black
      (#2C4E3E, #345A48 on hover) with a #3B6552 edge. Paper text on it runs
      about 8:1, body copy at white/80 about 6:1, so both hold. An earlier pass
      pulled this down to #1E2A24, which is the value at which a green stops
      looking like a colour choice and starts looking like dirty ink.
      Support tiles stay a plain step above ground (#1E1D1A). The documented
      rule is intact: lighter advances, so the surface says which card matters.

   1b. No hover border. The mint edge on hover read as an outline stuck on the
      card. Hover now changes the fill and the 4px lift only; the border is
      static on every tile. Mint survives in this section as the focus ring.

   2. Marker and trust bar type. 11px/700/0.22em and 10.5px/700/0.18em became
      10px/500/0.2em, which is the micro-label used by every panel elsewhere
      (Insights, calendar, tasks, subscriptions). Same slot, same job, same
      spec. Trust separators are 3px squares rather than round dots, matching
      the dither pitch used across the site.

   3. The seam. The hero is a rounded ink PANEL sitting on paper, so a
      full-bleed ink section starting immediately underneath read as the panel
      bleeding out of its own shape. The ink field here now has its own top
      radius on a paper ground, so it reads as the next panel in the stack.
      To go back to flush ink, set SEAM to 'flush'.

   ── Rejected, don't reintroduce ──────────────────────────────────────────
   Gradient section ground. Glassmorphic tiles (translucent fills, blurred
   radial spotlight, white inset highlight, scrim behind the copy). A dithered
   halftone spotlight. The card is a flat opaque rectangle with a 1px opaque
   edge; on hover it becomes a slightly lighter flat rectangle with a mint
   edge, and the copy appears. That's the whole interaction.

   Hierarchy, from an earlier pass:
        - The anchor surface is the lighter one; the support tiles share the
          darker. Lighter surfaces advance, darker recede, so the surface
          itself says which card matters instead of leaving that to width
          alone.
        - The anchor's body copy shows at rest (`open: true`). A section where
          every word of substance is behind a hover gives a scanning reader
          three titles and nothing else, and gives a touch user a layout whose
          emphasis it can't express. The anchor is the entry point; the two
          support tiles keep the reveal, which is also what makes the anchor
          look like the anchor. Flip `open` in FEATURES to undo.
        - 01/02/03 became Cards / Subscriptions / Bills. Reasoning at the
          marker itself.
        - Trust bar down a step, eyebrow added above the headline, hover prompt
          demoted, closing link added.

   ── Why the tall-anchor layout is gone ───────────────────────────────────
   The anchor tile was 760px tall, which is most of a laptop viewport. Because
   the copy reveals at the BOTTOM of the card, hovering the top of that tile
   put the payoff below the fold: you had to hold the pointer inside the card
   and scroll to read what the hover just revealed. A hover reveal only works
   if the whole card is in view at the moment it opens, so the constraint is
   hard -- no tile taller than roughly half a viewport.

   The fix is to spend the anchor's emphasis on WIDTH instead of height. Three
   tiles sit in one row at the same 360px height, with the anchor taking ~1.35
   of the horizontal budget. Same hierarchy (one dominant shape, two
   supporting), read in one glance, and the whole section clears in a single
   viewport: heading band, then one band of cards.

   ── One anatomy, not two ─────────────────────────────────────────────────
   With every tile the same height, the big serif numeral no longer fits
   anywhere. All three use the tracked micro-label instead. The anchor is
   already distinguished by width, a wider measure, and a larger title, which
   is enough.

   ── Vertical budget (360px, p-9) ─────────────────────────────────────────
   360 - 72 padding = 288 content.
     anchor:  marker 15 + gap 32 + rule 21 + title (2 lines @28px) 68 +
              lead 16 + body (4 lines @16/1.65) 104  = 256, 32px spare
     support: marker 15 + gap 32 + rule 21 + title (2 lines @22px) 55 +
              lead 16 + body (4 lines) 104           = 243, 45px spare
   The spare rows matter: the reveal should read as empty space filling in,
   not as text arriving at the edge of the box.

   ── Height invariant ─────────────────────────────────────────────────────
   Fixed height, not min-height. The reveal only avoids reflow if the outer box
   genuinely cannot change size. min-height is just a floor: once revealed text
   pushed past it the card grew, which grew the shared stretch-aligned grid
   row, which resized every sibling. With a fixed height the reveal
   redistributes space *inside* the box (see mt-auto). Below sm the height is
   auto: no hover there, everything shows at rest, and a single column has no
   siblings to disturb.

   ── Reveal mechanics ─────────────────────────────────────────────────────
   The title+body block sits at the bottom of a flex column via mt-auto. The
   body starts at grid-template-rows: 0fr. On hover the row grows to 1fr and
   the mt-auto gap shrinks by exactly that amount, so total height never
   changes. Contrast comes from the fill being opaque: the copy sits on a solid
   colour, which is why these are hex fills and not rgba overlays.

   Hover scoping: each tile uses a NAMED group (group/tile), not bare `group`.

   ── Motion spec, and the flicker that forced it ──────────────────────────
   The flash on hover was an invalid value, not a timing problem: the edge used
   `ring-1 ring-inset` with an undefined --edge-hover, which invalidated the
   whole box-shadow at computed-value time. That whole class of bug is gone
   now: the edge is a real 1px border, it is STATIC (no hover state at all), so
   there is nothing to interpolate and nothing to invalidate. Delays sit only
   on the way IN, so leaving a card unwinds immediately.

   Timing, in order: surface (fill, edge, lift) 260ms at 0; rule 420ms at 60;
   body fade 300ms at 140. Nothing else moves. No body translate, no
   will-change.
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
    .features-root .tile-body { opacity: 1; }
    .features-root .tile-rule { width: 56px; }
    .features-root .hover-prompt { display: none; }
  }
  @media (prefers-reduced-motion: reduce) {
    .features-root .feature-tile,
    .features-root .feature-tile * {
      transition-duration: 1ms !important;
      transition-delay: 0ms !important;
    }
    .features-root .feature-tile:hover { transform: none; }
  }
`;

/* Opaque fills, because the reveal needs solid ground under the copy.
   anchor: pine, light enough to read as green against ink and dark enough to
   carry paper-white type. support: a neutral step above the section ground.
   `edge` is static -- there is deliberately no hover edge. */
const SURFACES = {
  anchor: {
    fill: '#2c4035',
    fillHover: '#2C4E3E',
    edge: '#3B6552',
  },
  support: {
    fill: '#1E1D1A',
    fillHover: '#242320',
    edge: '#2D2B27',
  },
};

const FEATURES = [
  {
    label: 'Cards',
    surface: SURFACES.anchor,
    wide: true,
    open: true,
    title: 'All your credit cards, in one place',
    body: 'Connect every card once. Every balance, every due date, every dollar of available credit, in one view. Pay from one place and stop missing the dates that cost you late fees.',
  },
  {
    label: 'Subscriptions',
    surface: SURFACES.support,
    wide: false,
    title: 'No more hold music',
    body: "The $12.99 subscription you haven't opened in eight months. We read every statement, flag it, and cancel it in one tap.",
  },
  {
    label: 'Bills',
    surface: SURFACES.support,
    wide: false,
    title: 'Never another late fee',
    body: 'One calendar for every card. Schedule the minimum, the statement balance, or the whole thing, and forget it.',
  },
];

/* One curve for every property in the tile, so the fill, the edge, the lift,
   the rule and the copy all settle at the same rate. */
const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

const Tile = ({ label, surface, wide, open = false, title, body }) => {
  return (
    <article
      tabIndex={0}
      className={`feature-tile group/tile relative flex w-full flex-col overflow-hidden rounded-2xl border p-7 opacity-0 outline-none transition-[background-color,transform] duration-[260ms] border-[var(--edge)] bg-[var(--fill)] hover:-translate-y-1 hover:bg-[var(--fill-hover)] focus-within:-translate-y-1 focus-within:bg-[var(--fill-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--mint)] sm:h-[360px] sm:p-9 ${wide ? 'sm:col-span-2 lg:col-span-1' : ''
        }`}
      style={{
        '--fill': surface.fill,
        '--fill-hover': surface.fillHover,
        '--edge': surface.edge,
        transitionTimingFunction: EASE,
      }}
    >
      {/* Marker. Was 01 / 02 / 03, now the thing the card is actually about.
        These three are parallel capabilities in no particular order, so
        numerals asserted an order that doesn't exist. Type spec now matches
        the micro-label used in every other panel: 10px / 500 / 0.2em. */}
      <span
        className="relative z-[2] text-[10px] font-medium uppercase leading-none tracking-[0.2em] text-white/40 transition-colors duration-[260ms] group-hover/tile:text-white group-focus-within/tile:text-white"
        style={{ transitionTimingFunction: EASE }}
      >
        {label}
      </span>

      {/* mt-auto pins this block's BOTTOM to the tile's bottom padding, so the
        title sits at the same height in every tile at rest. The body below is
        a 0fr grid row that expands to 1fr on hover, spending that budget
        instead of adding to it. */}
      <div className="relative z-[2] mt-auto pt-8">
        {/* One line that draws itself. The only element that gains ink on
          hover. The 60ms in-delay lets the fill and edge commit first, so the
          sequence is surface, then rule, then copy. */}
        <span
          aria-hidden="true"
          className={`tile-rule mb-5 block h-px bg-[var(--paper)] transition-[width] duration-[420ms] ${open
            ? 'w-14'
            : 'w-0 group-hover/tile:w-14 group-hover/tile:delay-[60ms] group-focus-within/tile:w-14 group-focus-within/tile:delay-[60ms]'
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
          className={`tile-reveal grid transition-[grid-template-rows] duration-[380ms] ${open
            ? 'grid-rows-[1fr]'
            : 'grid-rows-[0fr] group-hover/tile:grid-rows-[1fr] group-focus-within/tile:grid-rows-[1fr]'
            }`}
          style={{ transitionTimingFunction: EASE }}
        >
          {/* min-h-0 so the row can actually reach 0fr. */}
          <div className="min-h-0 overflow-hidden">
            <p
              className={`tile-body pt-4 leading-[1.65] text-white/80 transition-opacity duration-[300ms] ${wide ? 'max-w-[45ch] text-[16px]' : 'max-w-[32ch] text-[15px]'
                } ${open
                  ? 'opacity-100'
                  : 'opacity-0 group-hover/tile:opacity-100 group-hover/tile:delay-[140ms] group-focus-within/tile:opacity-100 group-focus-within/tile:delay-[140ms]'
                }`}
              style={{ transitionTimingFunction: EASE }}
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

      <div>
        {/* Trust bar. It's the seam from the hero, not a heading, so it reads
            as the fine print it is. Type matches the site's micro-label. */}
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-x-5 gap-y-3 border-b border-white/[0.08] px-6 pb-16 text-[10px] uppercase tracking-[0.2em] text-white/35 sm:px-8">
          <span className="trust-item opacity-0">Plaid &amp; Spinwheel</span>
          <span className="trust-item block h-[3px] w-[3px] bg-white/25 opacity-0" aria-hidden="true"></span>
          <span className="trust-item opacity-0">Read-only by default</span>
          <span className="trust-item block h-[3px] w-[3px] bg-white/25 opacity-0" aria-hidden="true"></span>
          <span className="trust-item opacity-0">12,000+ US institutions</span>
          <span className="trust-item block h-[3px] w-[3px] bg-white/25 opacity-0" aria-hidden="true"></span>
          <span className="trust-item opacity-0">Zero data selling</span>
        </div>

        <div className="mx-auto max-w-[1200px] px-6 pt-16 sm:px-8 lg:pt-20">
          {/* Heading band. Baseline-aligned with the intro on the right so the
              two read as one line of thought. */}
          <div className="mb-12 grid gap-8 lg:mb-16 lg:grid-cols-[1fr_400px] lg:items-end lg:gap-16">
            <div>
              {/* Eyebrow. Takes the announcing job off the headline. */}
              <span className="feature-item mb-5 block text-[10px] font-medium uppercase tracking-[0.2em] text-white/40 opacity-0">
                What you get
              </span>
              {/* Paper, not pure white: white is a step outside the palette. */}
              <h2 className="feature-item font-serif text-[40px] leading-[1.12] tracking-[-0.01em] text-[var(--paper)] opacity-0 sm:text-[52px] lg:text-[clamp(46px,4.8vw,62px)]">
                One place.
                <br className="hidden sm:inline" /> Every card. Total control.
              </h2>
            </div>
            <div className="lg:pb-3">
              <p className="feature-item text-[16px] leading-[1.7] text-white/70 opacity-0">
                Most people have four or more credit cards and no clear picture of what's
                happening across them.
              </p>
              {/* Terminus. One action closes the sequence: eyebrow, claim,
                  context, do the thing. */}
              <a
                href="https://cards.amalgamic.io/auth/signin"
                className="feature-item group/cta mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-[var(--paper)] opacity-0 outline-none transition-colors duration-[260ms] hover:text-white focus-visible:ring-2 focus-visible:ring-[rgba(44,64,53,0.6)]"
                style={{ transitionTimingFunction: EASE }}
              >
                Get started
                <span
                  aria-hidden="true"
                  className="transition-transform duration-[260ms] group-hover/cta:translate-x-1"
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
      </div>
    </section>
  );
}