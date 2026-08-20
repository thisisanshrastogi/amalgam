import React, { useEffect, useRef } from 'react';
import { createScope, animate, onScroll } from 'animejs';
import { fadeUpOnScroll } from '../utils/animations';

/**
 * OPTION C - Ink band, full viewport
 * Full-bleed dark section, one screen tall. Headline anchors the top, claims anchor
 * the bottom, vault sits centred on the right. The space between them is the design.
 *
 * `min-h-[100dvh]` not `h-screen`: dvh survives the iOS Safari address bar, and min-h
 * lets the section grow past one screen when the claims stack on mobile.
 *
 * ASSET: /art/vault.png (dark dither on a white ground)
 *   Knocked out with `invert` + `mix-blend-screen`: the white ground inverts to black,
 *   which screen-blends away against the ink, leaving light dots.
 *   The vault circle sits in the right ~45% of that PNG with dead space to its left,
 *   so the image element is far wider than the visible circle. Hence the large width
 *   plus negative right offset.
 *
 *   CLEANER LONG TERM: export /art/vault-ink.png cropped tight to the circle, with a
 *   TRANSPARENT ground and paper #EDE6D6 dots at 4px Bayer. Then drop
 *   `invert mix-blend-screen` and size it directly.
 *
 * NOTE: must escape any max-width or horizontal padding on your page wrapper.
 *
 * Swap `text-mint` for whatever your accent token is actually called.
 * Assumes `bg-ink` / `text-white` exist alongside your `bg-paper` / `text-ink`.
 */

const CLAIMS = [
  {
    label: 'Selling data',
    statement: 'We never sell it.',
    mechanism: 'Read-only access via Plaid and Spinwheel.',
  },
  {
    label: 'AI',
    statement: "It reads and drafts. It doesn't learn.",
    mechanism: 'Your data never trains a model.',
  },
  {
    label: 'Control',
    statement: 'Cut us off in one click.',
    mechanism: 'Revoke or delete, from settings.',
  },
  // A fourth claim narrows every column. Only add one back when you have a storage
  // or encryption claim you can actually stand behind.
];

export default function PrivacySecurity() {
  const root = useRef(null);
  const scope = useRef(null);

  useEffect(() => {
    scope.current = createScope({ root: root.current }).add(() => {
      fadeUpOnScroll('.ps-text', root.current, { staggerMs: 110, translateY: 26 });
      fadeUpOnScroll('.ps-col', root.current, { delay: 220, staggerMs: 80, translateY: 20 });

      animate('.vault-parallax', {
        translateY: [-100, 100],
        ease: 'linear',
        autoplay: onScroll({
          target: root.current,
          start: 'top bottom',
          end: 'bottom top',
          sync: true,
        }),
      });
    });
    return () => scope.current.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative isolate bg-ink text-white overflow-hidden
                 min-h-[100dvh] flex items-stretch
                 px-6 sm:px-8 py-24 lg:py-28"
    >
      {/* Vault plate. Decorative, so it stays out of the a11y tree. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="vault-parallax absolute inset-0 w-full h-full">
          <img
            src="/vault.png"
            alt=""
            loading="lazy"
            draggable="false"
            className="absolute top-1/2 -translate-y-1/2
                       right-[-22%] sm:right-[-18%] lg:right-[-14%]
                       w-[min(1400px,130%)] max-w-[900px]
                       opacity-[0.10] lg:opacity-[0.56]
                       invert mix-blend-screen select-none"
          />
        </div>

        {/* Legibility scrim: solid ink under the text, fading out before the vault. */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink from-52% via-ink/70 via-76% to-transparent" />
      </div>

      {/* justify-between is what spends the height: top block, bottom block, air between */}
      <div className="relative w-full max-w-[1200px] mx-auto flex flex-col justify-between gap-20">

        <h2 className="ps-text opacity-0 font-serif text-[2.5rem] md:text-[3.5rem] lg:text-[4rem]
                       leading-[1.14] tracking-[-0.02em] text-white max-w-[18ch] pb-1">
          Your data works for you. Never for anyone else.
        </h2>

        <div>
          {/* Single row. Hairlines only, no cards, no icons. */}
          <dl className="grid gap-x-10 gap-y-9 sm:grid-cols-3 max-w-[780px]">
            {CLAIMS.map((claim) => (
              <div key={claim.label} className="ps-col opacity-0 border-t border-paper/20 pt-5">
                <dt className="text-[12px] font-bold uppercase tracking-[0.16em] text-white/50">
                  {claim.label}
                </dt>
                <dd>
                  <p className="mt-3 font-serif text-[22px] leading-[1.25] text-white">
                    {claim.statement}
                  </p>
                  <p className="mt-2 text-white/70 text-[15px] leading-snug">
                    {claim.mechanism}
                  </p>
                </dd>
              </div>
            ))}
          </dl>

          <p className="ps-col opacity-0 mt-10 text-[15px] text-white/70">
            Questions about any of this?{' '}
            <a
              href="/privacy-policy"
              className="text-mint underline underline-offset-4 decoration-mint/40 hover:decoration-mint
                         rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4
                         focus-visible:outline-mint transition-colors"
            >
              Read the full privacy policy
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}