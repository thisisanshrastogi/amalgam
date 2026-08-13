/**
 * animations.js — Shared Anime.js v4 animation utilities for Amalgamic.
 *
 * Eliminates copy-paste boilerplate across components. Every helper follows
 * the same contract: it returns the cleanup function (or the animation
 * instance) so callers can always call `.revert()` in useEffect cleanup.
 */

import { animate, createTimeline, stagger, onScroll } from 'animejs';

// ─── Easing presets ────────────────────────────────────────────────────────
export const EASE = {
  enter: 'outExpo',
  bounce: 'outBack',
  smooth: 'inOutSine',
  spring: 'outElastic(1, 0.6)',
};

// ─── Duration presets ──────────────────────────────────────────────────────
export const DUR = {
  fast: 250,
  base: 420,
  slow: 580,
  counter: 1100,
};

// ─── fadeUpOnScroll ────────────────────────────────────────────────────────
/**
 * Fades elements up when their section scrolls into view.
 * Must be called inside a createScope callback.
 *
 * @param {string|Element|Element[]} targets - CSS selector or DOM element(s)
 * @param {Element} root - The section's root element (used as scroll target)
 * @param {object} opts
 * @param {number} [opts.delay=0] - Base delay before animation starts (ms)
 * @param {number} [opts.staggerMs=0] - Per-item stagger delay (ms). 0 = no stagger
 * @param {number} [opts.translateY=28] - Starting translateY offset (px)
 * @param {number} [opts.duration=DUR.base] - Animation duration (ms)
 * @param {string} [opts.ease=EASE.enter] - Easing function name
 * @param {string} [opts.scrollStart='top 80%'] - onScroll start threshold
 * @returns {object} The animation instance
 */
export function fadeUpOnScroll(targets, root, opts = {}) {
  const {
    delay = 0,
    staggerMs = 0,
    translateY = 28,
    duration = DUR.base,
    ease = EASE.enter,
    scrollStart = 'top 80%',
  } = opts;

  const anim = animate(targets, {
    translateY: [translateY, 0],
    opacity: [0, 1],
    duration,
    delay: staggerMs ? stagger(staggerMs, { start: delay }) : delay,
    ease,
    autoplay: false,
  });

  onScroll({
    target: root,
    start: scrollStart,
    onEnter: () => anim.play(),
  });

  return anim;
}

// ─── fadeInOnScroll ────────────────────────────────────────────────────────
/**
 * Same as fadeUpOnScroll but slides in from the X axis.
 */
export function fadeXOnScroll(targets, root, opts = {}) {
  const {
    delay = 0,
    staggerMs = 0,
    translateX = 40,
    duration = DUR.base,
    ease = EASE.enter,
    scrollStart = 'top 80%',
  } = opts;

  const anim = animate(targets, {
    translateX: [translateX, 0],
    opacity: [0, 1],
    duration,
    delay: staggerMs ? stagger(staggerMs, { start: delay }) : delay,
    ease,
    autoplay: false,
  });

  onScroll({
    target: root,
    start: scrollStart,
    onEnter: () => anim.play(),
  });

  return anim;
}

// ─── scaleInOnScroll ──────────────────────────────────────────────────────
/**
 * Scales elements in (from a smaller size) with optional stagger.
 */
export function scaleInOnScroll(targets, root, opts = {}) {
  const {
    delay = 0,
    staggerMs = 80,
    fromScale = 0.85,
    duration = DUR.base,
    ease = EASE.bounce,
    scrollStart = 'top 82%',
  } = opts;

  const anim = animate(targets, {
    scale: [fromScale, 1],
    opacity: [0, 1],
    duration,
    delay: stagger(staggerMs, { start: delay }),
    ease,
    autoplay: false,
  });

  onScroll({
    target: root,
    start: scrollStart,
    onEnter: () => anim.play(),
  });

  return anim;
}

// ─── countUpOnScroll ──────────────────────────────────────────────────────
/**
 * Animates a numeric counter from 0 to a target value.
 * The ref.current element's textContent is updated on every frame.
 *
 * @param {React.RefObject} ref - ref to the DOM element displaying the number
 * @param {number} target - The end value to count to
 * @param {object} opts
 * @param {string} [opts.prefix=''] - String prepended to the number (e.g. '$')
 * @param {string} [opts.suffix=''] - String appended to the number (e.g. 'M+')
 * @param {number} [opts.decimals=0] - Number of decimal places
 * @param {Element} [opts.root] - Section root for scroll trigger
 * @param {string} [opts.scrollStart='top 75%']
 * @returns {object} The animation instance
 */
export function countUpOnScroll(ref, target, opts = {}) {
  const {
    prefix = '',
    suffix = '',
    decimals = 0,
    root,
    scrollStart = 'top 75%',
    duration = DUR.counter,
    ease = 'outExpo',
  } = opts;

  const obj = { val: 0 };
  const anim = animate(obj, {
    val: target,
    duration,
    ease,
    autoplay: false,
    onUpdate: () => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${obj.val.toFixed(decimals)}${suffix}`;
      }
    },
  });

  if (root) {
    onScroll({
      target: root,
      start: scrollStart,
      onEnter: () => anim.play(),
    });
  }

  return anim;
}

// ─── timelineOnScroll ────────────────────────────────────────────────────
/**
 * Creates a createTimeline and triggers it when the root scrolls into view.
 * Callback receives the timeline instance so callers can chain .add() calls.
 *
 * @param {Element} root - Section root for scroll trigger
 * @param {function} builderFn - (tl) => void  — populates the timeline
 * @param {object} [tlDefaults={}] - defaults passed to createTimeline
 * @returns {object} The timeline instance
 */
export function timelineOnScroll(root, builderFn, tlDefaults = {}) {
  const tl = createTimeline({
    autoplay: false,
    defaults: { ease: EASE.enter, duration: DUR.base },
    ...tlDefaults,
  });
  builderFn(tl);

  onScroll({
    target: root,
    start: 'top 80%',
    onEnter: () => tl.play(),
  });

  return tl;
}

// ─── floatLoop ────────────────────────────────────────────────────────────
/**
 * Infinite gentle floating loop (for hero cards, mockups, etc.).
 *
 * @param {string|Element} target
 * @param {object} opts
 * @param {number} [opts.distance=14] - translateY amplitude (px)
 * @param {number} [opts.duration=2600] - one-way duration (ms)
 * @param {number} [opts.delay=0]
 * @returns {object} Animation instance
 */
export function floatLoop(target, opts = {}) {
  const { distance = 14, duration = 2600, delay = 0 } = opts;
  return animate(target, {
    translateY: [-distance, distance],
    duration,
    delay,
    alternate: true,
    loop: true,
    ease: EASE.smooth,
  });
}

// ─── shimmerLoop ──────────────────────────────────────────────────────────
/**
 * Looping opacity shimmer/pulse (for CTA buttons, active indicators, etc.)
 */
export function shimmerLoop(target, opts = {}) {
  const { minOpacity = 0.7, duration = 1200, delay = 0 } = opts;
  return animate(target, {
    opacity: [1, minOpacity],
    scale: [1, 1.03],
    duration,
    delay,
    alternate: true,
    loop: true,
    ease: EASE.smooth,
  });
}
