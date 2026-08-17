import React, { useEffect, useMemo, useRef, useState } from 'react';

/**
 * WalletScan — a wallet that opens, scans its cards, reports a finding, and
 * closes, on a seamless continuous loop. Pure CSS 3D + DOM. No dependencies,
 * no canvas, no WebGL. Background is transparent; it sits on whatever is behind it.
 *
 * Colours read your CSS variables (--accent, --text-1, --border, …) when they
 * exist on :root, and fall back to the values below when they don't. Override
 * per instance with the `style` prop using the --aw-* names.
 *
 *   <WalletScan />
 *   <WalletScan tone="navy" duration={9} width={420} height={360} />
 * The wallet scales to fit the box automatically; override with `scale`.
 *   <WalletScan findings={[['Refund due', 'Uber · Feb 08', '$24.10']]} />
 */

const CSS = `.aw{
  /* reads the app's tokens when they exist on :root, falls back otherwise */
  --aw-bg:var(--bg, #FAFBFB);
  --aw-surface-2:var(--surface-2, #F1F3F5);
  --aw-surface-3:var(--surface-3, #E9ECEF);
  --aw-border:var(--border, #DEE2E6);
  --aw-border-light:var(--border-light, #CED4DA);
  --aw-text-1:var(--text-1, #0A192F);
  --aw-text-2:var(--text-2, #44536A);
  --aw-text-3:var(--text-3, #63718A);
  --aw-accent:var(--accent-dim, #059669);
  --aw-accent-text:var(--accent-text, #047857);
  --aw-font-sans:var(--font-sans, 'Inter', -apple-system, sans-serif);
  --aw-font-mono:var(--font-mono, 'Space Mono', monospace);

  /* derived shading */
  --aw-shell-1:#10B981; --aw-shell-2:var(--aw-accent);
  --aw-shell-3:var(--aw-accent); --aw-shell-4:#04533C;
  --aw-strap-1:#22334F; --aw-strap-2:var(--aw-text-1); --aw-strap-3:#050D18;
  --aw-cavity:#050D18;
  --aw-scan:var(--aw-accent);
  --aw-logo-body:var(--aw-text-1); --aw-logo-dot:var(--aw-bg);
  --aw-shadow:rgba(10,25,47,.15);

  --aw-dur:11s;
  --aw-w:560px; --aw-h:480px;

  display:inline-block;
  width:var(--aw-w); height:var(--aw-h);
  position:relative;
  isolation:isolate;
  -webkit-tap-highlight-color:transparent;
}

/* navy body, accent kept to the highlights — matches the token system's
   "accent only in logo, icons, buttons and highlights" rule */
.aw[data-tone="navy"]{
  --aw-shell-1:#31435F; --aw-shell-2:#1B2C47; --aw-shell-3:var(--aw-text-1); --aw-shell-4:#040B15;
  --aw-strap-1:#8B96A8; --aw-strap-2:#5E6B80; --aw-strap-3:#3C4759;
  --aw-cavity:#02060C;
  --aw-logo-body:#F1F3F5; --aw-logo-dot:var(--aw-text-1);
}

/* one shared clock: every timed element reads --aw-dur */
.aw .scene *, .aw .scene{ animation-duration: var(--aw-dur); }

.aw .scene{
  position:absolute; inset:0;
  border-radius:inherit; overflow:hidden;
  background:transparent;
  transform:scale(var(--aw-scale, 1));
  transform-origin:50% 50%;
  perspective:1250px;
  perspective-origin:48% 46%;
}
.aw[data-paused] .scene, .aw[data-paused] .scene *{ animation-play-state:paused !important; }

/* ---------- stage ---------- */
.aw .stage{
  position:absolute; left:50%; top:52%;
  width:0; height:0;
  transform-style:preserve-3d;
  animation:aw-bob 7s ease-in-out infinite;
}
@keyframes aw-bob{
  0%,100%{transform:translate3d(-3px,-7px,0)}
  50%    {transform:translate3d(3px, 5px,0)}
}

.aw .rig{
  position:absolute; left:0; top:0;
  transform-style:preserve-3d;
  animation-name:aw-rigTurn;
  animation-timing-function:cubic-bezier(.45,.05,.25,1);
  animation-iteration-count:infinite;
}
/* closed pose at 0% and 100% so the loop joins with no cut */
@keyframes aw-rigTurn{
  0%   {transform:rotateX(4deg) rotateY(-8deg)}
  4%   {transform:rotateX(4deg) rotateY(-8deg)}
  14%  {transform:rotateX(7deg) rotateY(-21deg)}
  72%  {transform:rotateX(7deg) rotateY(-21deg)}
  86%  {transform:rotateX(4deg) rotateY(-8deg)}
  100% {transform:rotateX(4deg) rotateY(-8deg)}
}

/* ---------- contact shadow ---------- */
.aw .floor{
  position:absolute; left:-168px; top:74px;
  width:300px; height:52px;
  background:radial-gradient(50% 50% at 48% 50%, var(--aw-shadow) 0%, transparent 70%);
  transform:rotateX(80deg) translateZ(-26px);
  filter:blur(3px);
  animation:aw-floorPulse 7s ease-in-out infinite;
}
@keyframes aw-floorPulse{
  0%,100%{opacity:.85; transform:rotateX(80deg) translateZ(-26px) scale(1)}
  50%    {opacity:.68; transform:rotateX(80deg) translateZ(-26px) scale(.93)}
}

/* ---------- ambient accent glow, on its own slow clock ---------- */
.aw .glow{
  position:absolute; left:-190px; top:-160px;
  width:380px; height:320px; border-radius:50%;
  background:radial-gradient(50% 50% at 50% 50%,
    color-mix(in srgb, var(--aw-accent-dim) 30%, transparent) 0%, transparent 70%);
  filter:blur(30px);
  transform:translateZ(-44px);
  animation:aw-glowPulse 8s ease-in-out infinite alternate;
}
@keyframes aw-glowPulse{
  0%  {opacity:.4; transform:translateZ(-44px) scale(.94)}
  100%{opacity:.8; transform:translateZ(-44px) scale(1.06)}
}

/* ---------- wallet ---------- */
.aw .wallet{ position:absolute; left:0; top:0; transform-style:preserve-3d; }

.aw .panel{
  position:absolute;
  width:216px; height:158px;
  left:-108px; top:-112px;
  border-radius:13px 13px 10px 10px;
  transform-style:preserve-3d;
}
.aw .face{
  position:absolute; inset:0; border-radius:inherit;
  background:linear-gradient(165deg, var(--aw-shell-1) 0%, var(--aw-shell-2) 55%, var(--aw-shell-3) 100%);
  box-shadow:
    inset 0 -16px 24px -14px rgba(0,0,0,.5),
    inset 3px 3px 12px -8px rgba(255,255,255,.85);
  overflow:hidden;
}
.aw .face:after{
  content:""; position:absolute; left:-8%; top:-28%;
  width:66%; height:88%; border-radius:50%;
  background:radial-gradient(50% 50% at 50% 50%, rgba(255,255,255,.34), transparent 70%);
  pointer-events:none;
}
.aw .grain{
  position:absolute; inset:0; border-radius:inherit;
  opacity:.13; mix-blend-mode:overlay; pointer-events:none;
  background-image:
    radial-gradient(1.5px 1.5px at 20% 30%, #fff 0, transparent 100%),
    radial-gradient(1.5px 1.5px at 70% 60%, #000 0, transparent 100%),
    radial-gradient(2px 2px at 45% 80%, #fff 0, transparent 100%),
    radial-gradient(2px 2px at 85% 20%, #000 0, transparent 100%);
  background-size:23px 19px, 31px 27px, 41px 37px, 29px 23px;
}

/* extruded edges give the panels thickness */
.aw .edge{ position:absolute; background:var(--aw-shell-3) }
.aw .edge.top{
  left:0; right:0; top:0; height:13px;
  transform-origin:top; transform:rotateX(90deg);
  border-radius:3px 3px 0 0;
  background-image:linear-gradient(180deg, rgba(255,255,255,.42), rgba(0,0,0,.22));
}
.aw .edge.side{
  left:0; top:6px; bottom:0; width:13px;
  transform-origin:left; transform:rotateY(-90deg);
  background-image:linear-gradient(90deg, rgba(0,0,0,.32), rgba(255,255,255,.1));
}

.aw .back{ transform:translateZ(-19px) }
.aw .back .face{ filter:brightness(.78) }

.aw .cavity{
  position:absolute; left:-104px; top:-108px;
  width:208px; height:150px; border-radius:10px;
  background:linear-gradient(180deg, var(--aw-cavity), #01040A);
  transform:translateZ(-14px);
  box-shadow:inset 0 14px 22px -12px #000;
}

.aw .spine{
  position:absolute; left:-108px; top:38px;
  width:216px; height:38px;
  border-radius:0 0 11px 11px;
  background:linear-gradient(180deg, var(--aw-shell-3), var(--aw-shell-4));
  transform:rotateX(-90deg) translateZ(9px);
  transform-origin:top center;
}

.aw .front{
  transform-origin:50% 100%;
  animation-name:aw-flap;
  animation-timing-function:cubic-bezier(.45,.05,.25,1);
  animation-iteration-count:infinite;
}
@keyframes aw-flap{
  0%   {transform:translateZ(19px) rotateX(0deg)}
  4%   {transform:translateZ(19px) rotateX(0deg)}
  14%  {transform:translateZ(19px) rotateX(-31deg)}
  72%  {transform:translateZ(19px) rotateX(-31deg)}
  86%  {transform:translateZ(19px) rotateX(0deg)}
  100% {transform:translateZ(19px) rotateX(0deg)}
}

/* strap wrapping the right edge */
.aw .strap{
  position:absolute; right:-6px; top:56px;
  width:64px; height:33px;
  border-radius:5px 4px 4px 5px;
  background:linear-gradient(180deg, var(--aw-strap-1), var(--aw-strap-2));
  box-shadow:0 4px 9px -4px rgba(10,25,47,.5), inset 0 1px 0 rgba(255,255,255,.16);
  transform:translateZ(4px);
  transform-style:preserve-3d;
}
.aw .strap .wrap{
  position:absolute; right:0; top:0; height:100%; width:42px;
  border-radius:0 5px 5px 0;
  background:linear-gradient(90deg, var(--aw-strap-2), var(--aw-strap-3));
  transform-origin:right center; transform:rotateY(78deg);
}
.aw .snap{
  position:absolute; left:9px; top:50%;
  width:20px; height:20px; margin-top:-10px; border-radius:50%;
  background:radial-gradient(60% 60% at 34% 28%, #E9ECEF, var(--aw-border-light) 55%, var(--aw-text-3));
  box-shadow:0 1px 3px rgba(10,25,47,.55), inset 0 -1px 2px rgba(10,25,47,.35);
}

/* embossed logo plaque */
.aw .logo{
  position:absolute; left:32px; top:50px;
  width:58px; height:58px; border-radius:15px;
  background:linear-gradient(158deg,
    color-mix(in srgb, var(--aw-logo-body) 78%, #FFFFFF) 0%,
    var(--aw-logo-body) 46%,
    color-mix(in srgb, var(--aw-logo-body) 78%, #000000) 100%);
  transform:translateZ(4px);
  display:flex; align-items:center; justify-content:center;
  box-shadow:
    0 7px 13px -7px rgba(4,16,31,.72),
    inset 0 1.5px 0 rgba(255,255,255,.3),
    inset 0 -2px 5px rgba(0,0,0,.42);
}
.aw .logo i{
  width:19px; height:19px; border-radius:5px;
  background:var(--aw-logo-dot);
  box-shadow:inset 0 1px 2px rgba(0,0,0,.4), 0 1px 0 rgba(255,255,255,.14);
}

/* card edges peeking from the closed wallet */
.aw .peek{
  position:absolute; left:97px; top:-92px;
  width:19px; height:112px; border-radius:0 4px 4px 0;
  transform:translateZ(13px); overflow:hidden;
  animation-name:aw-peekFade; animation-iteration-count:infinite;
  animation-timing-function:ease;
}
@keyframes aw-peekFade{
  0%,7%{opacity:1} 17%,66%{opacity:0} 80%,100%{opacity:1}
}
.aw .peek b{
  position:absolute; left:0; right:0; height:17%; border-radius:0 3px 3px 0;
  box-shadow:0 1px 2px rgba(10,25,47,.3);
}
.aw .peek b:nth-child(1){ top:12%; background:var(--aw-text-1) }
.aw .peek b:nth-child(2){ top:40%; background:#FFFFFF }
.aw .peek b:nth-child(3){ top:68%; background:var(--aw-text-3) }

/* ---------- card stack ---------- */
.aw .cards{
  position:absolute; left:-92px; top:-104px;
  width:184px; height:118px;
  transform-style:preserve-3d;
}
.aw .card{
  position:absolute; inset:0; border-radius:10px;
  transform-style:preserve-3d;
  box-shadow:0 8px 16px -9px rgba(10,25,47,.45), inset 0 1px 0 rgba(255,255,255,.2);
  animation-timing-function:cubic-bezier(.45,.05,.25,1);
  animation-iteration-count:infinite;
}
.aw .card:after{
  content:""; position:absolute; inset:0; border-radius:inherit;
  background:linear-gradient(122deg, rgba(255,255,255,.2) 0 26%, transparent 46%);
}
.aw .card.c1{ background:linear-gradient(155deg, #1B2C47, var(--aw-text-1)); animation-name:aw-card1 }
.aw .card.c2{
  background:linear-gradient(155deg, #FFFFFF, var(--aw-surface-2));
  box-shadow:0 8px 18px -8px rgba(10,25,47,.45), inset 0 0 0 1px var(--aw-border-light);
  animation-name:aw-card2;
}
.aw .card.c3{ background:linear-gradient(155deg, var(--aw-text-3), var(--aw-text-2)); animation-name:aw-card3 }
@keyframes aw-card1{
  0%,6%{transform:translate3d(0,14px,12px) rotate(0deg)}
  18%  {transform:translate3d(-26px,-86px,12px) rotate(-6deg)}
  64%  {transform:translate3d(-26px,-86px,12px) rotate(-6deg)}
  78%,100%{transform:translate3d(0,14px,12px) rotate(0deg)}
}
@keyframes aw-card2{
  0%,6%{transform:translate3d(0,14px,0) rotate(0deg)}
  18%  {transform:translate3d(8px,-78px,0) rotate(3deg)}
  64%  {transform:translate3d(8px,-78px,0) rotate(3deg)}
  78%,100%{transform:translate3d(0,14px,0) rotate(0deg)}
}
@keyframes aw-card3{
  0%,6%{transform:translate3d(0,14px,-12px) rotate(0deg)}
  18%  {transform:translate3d(36px,-64px,-12px) rotate(8deg)}
  64%  {transform:translate3d(36px,-64px,-12px) rotate(8deg)}
  78%,100%{transform:translate3d(0,14px,-12px) rotate(0deg)}
}
/* ---------- scan, parented to the front card so it shares its plane ---------- */
.aw .scanfx{
  position:absolute; inset:0; border-radius:inherit;
  opacity:0; pointer-events:none;
  animation-name:aw-scanFade; animation-iteration-count:infinite;
  animation-timing-function:ease-in-out;
}
@keyframes aw-scanFade{
  0%,20%{opacity:0} 26%{opacity:1} 38%{opacity:1} 43%,100%{opacity:0}
}
.aw .scanfx .mesh{
  position:absolute; inset:0; border-radius:inherit; overflow:hidden;
  background-image:
    repeating-linear-gradient(90deg,
      color-mix(in srgb, var(--aw-scan) 52%, transparent) 0 1px, transparent 1px 14px),
    repeating-linear-gradient(0deg,
      color-mix(in srgb, var(--aw-scan) 38%, transparent) 0 1px, transparent 1px 14px);
}
.aw .scanfx .beam{
  position:absolute; left:-4%; right:-4%; height:30%;
  background:linear-gradient(180deg, transparent,
    color-mix(in srgb, var(--aw-scan) 78%, transparent) 55%, transparent);
  filter:blur(1.5px);
  animation-name:aw-beam; animation-iteration-count:infinite;
  animation-timing-function:cubic-bezier(.5,0,.5,1);
}
@keyframes aw-beam{
  0%,21%{transform:translateY(-34%); opacity:0}
  26%   {opacity:1}
  40%   {transform:translateY(300%); opacity:1}
  43%,100%{opacity:0}
}
.aw .scanfx .reticle{ position:absolute; inset:-9px; overflow:visible }
.aw .scanfx .reticle svg{
  width:100%; height:100%; overflow:visible;
  filter:drop-shadow(0 0 4px color-mix(in srgb, var(--aw-scan) 75%, transparent));
}
.aw .scanfx .reticle path{ stroke:var(--aw-scan); stroke-width:2; fill:none }
.aw .scanfx .bit{
  position:absolute;
  font:700 9px/1 var(--aw-font-mono); color:var(--aw-scan);
  text-shadow:0 0 5px color-mix(in srgb, var(--aw-scan) 70%, transparent);
}

.aw .chip{
  position:absolute; left:17px; top:38px;
  width:30px; height:23px; border-radius:4px;
  background:linear-gradient(150deg, var(--aw-accent), var(--aw-accent-text));
  box-shadow:inset 0 0 0 1px rgba(255,255,255,.18);
}
.aw .chip:before, .aw .chip:after{ content:""; position:absolute; background:rgba(0,0,0,.22) }
.aw .chip:before{ left:0; right:0; top:10px; height:1px }
.aw .chip:after{ top:0; bottom:0; left:14px; width:1px }
.aw .stripe{
  position:absolute; right:16px; bottom:16px;
  width:56px; height:6px; border-radius:3px;
  background:rgba(255,255,255,.22);
}
.aw .stripe:before{
  content:""; position:absolute; right:0; top:-11px;
  width:34px; height:6px; border-radius:3px;
  background:rgba(255,255,255,.14);
}

/* ---------- readout ---------- */
.aw .hud{
  position:absolute; left:16px; top:-212px;
  width:242px; height:144px;
  transform:translateZ(64px);
  opacity:0; color:var(--aw-text-1);
  animation-name:aw-hudIn; animation-iteration-count:infinite;
  animation-timing-function:cubic-bezier(.2,.7,.3,1);
}
@keyframes aw-hudIn{
  0%,43%{opacity:0; transform:translateZ(64px) translate(16px,12px) scale(.94)}
  48%   {opacity:1; transform:translateZ(64px) translate(0,0) scale(1)}
  64%   {opacity:1; transform:translateZ(64px) translate(0,0) scale(1)}
  69%,100%{opacity:0; transform:translateZ(64px) translate(-8px,-8px) scale(.98)}
}
.aw .hud .frame{
  position:absolute; inset:0; border-radius:12px;
  background:rgba(255,255,255,.9);
  backdrop-filter:blur(4px);
  border:1px solid var(--aw-border);
  box-shadow:0 20px 40px -22px rgba(10,25,47,.35);
}
.aw .hud .corners{ position:absolute; inset:0; overflow:visible }
.aw .hud .corners path{ stroke:var(--aw-text-1); stroke-width:2.2; fill:none }
.aw .hud .corners .dash{ stroke-dasharray:5 5; stroke-width:1.4; stroke:var(--aw-text-3); opacity:.6 }
.aw .hud .inner{ position:absolute; inset:15px 18px }
.aw .hud h4{
  margin:0; font:700 21px/1.1 var(--aw-font-sans);
  letter-spacing:-.04em; color:var(--aw-text-1);
  white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
}
.aw .hud .rule{
  height:1.5px; background:var(--aw-text-1); margin:8px 0 10px;
  transform-origin:left; transform:scaleX(0);
  animation-name:aw-ruleIn; animation-iteration-count:infinite;
  animation-timing-function:cubic-bezier(.2,.7,.3,1);
}
@keyframes aw-ruleIn{ 0%,47%{transform:scaleX(0)} 53%,68%{transform:scaleX(1)} 100%{transform:scaleX(1)} }
.aw .hud .row{
  display:flex; justify-content:space-between; align-items:baseline;
  font:400 11.5px/1 var(--aw-font-mono); letter-spacing:0; color:var(--aw-text-2);
  gap:8px;
}
.aw .hud .row span{ white-space:nowrap; overflow:hidden; text-overflow:ellipsis; min-width:0 }
.aw .hud .row b{ white-space:nowrap; flex:none }
.aw .hud .row b{ font-weight:700; color:var(--aw-accent-text) }
.aw .hud .chart{
  position:absolute; left:0; right:0; bottom:0; height:58px;
  display:flex; align-items:flex-end; gap:2px;
  border-bottom:1.4px solid var(--aw-border-light);
}
.aw .hud .chart i{
  flex:1; background:var(--aw-text-2); border-radius:.5px; height:var(--aw-h2);
  transform-origin:bottom; transform:scaleY(0);
  animation-name:aw-barIn; animation-iteration-count:infinite;
  animation-timing-function:cubic-bezier(.3,1.2,.5,1);
  animation-delay:var(--aw-d);
}
.aw .hud .chart i.hot{ background:var(--aw-accent-dim) }
@keyframes aw-barIn{ 0%,48%{transform:scaleY(0)} 56%,100%{transform:scaleY(1)} }
.aw .hud .axis{
  position:absolute; left:-15px; bottom:0; height:58px; width:13px;
  display:flex; flex-direction:column; justify-content:space-between;
  font:400 7.5px/1 var(--aw-font-mono); text-align:right; color:var(--aw-text-3);
}

/* ---------- accessibility ---------- */
@media (prefers-reduced-motion: reduce){
  .aw .scene, .aw .scene *{ animation:none !important; transition:none !important }
  .aw .rig{ transform:rotateX(4deg) rotateY(-8deg) }
  .aw .front{ transform:translateZ(19px) rotateX(0deg) }
  .aw .card.c1{ transform:translate3d(0,14px,12px) }
  .aw .card.c2{ transform:translate3d(0,14px,0) }
  .aw .card.c3{ transform:translate3d(0,14px,-12px) }
  .aw .peek{ opacity:1 }
  .aw .scanfx, .aw .hud{ opacity:0 }
  .aw .glow{ opacity:.6 }
}`;

const DEFAULT_FINDINGS = [
    ['Duplicate charge', 'Netflix · Apr 14', '$17.99'],
    ['Unused benefit', 'Travel credit · Jun', '$120.00'],
    ['Price protection', 'Best Buy · Mar 02', '$41.30'],
    ['Trial expiring', 'Adobe CC · in 3 days', '$59.99'],
];

// deterministic, so server and client render the same thing
function rng(seed) {
    let s = seed >>> 0;
    return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

let injected = false;
function useStyleSheet() {
    useEffect(() => {
        if (injected || document.getElementById('wallet-scan-css')) return;
        const el = document.createElement('style');
        el.id = 'wallet-scan-css';
        el.textContent = CSS;
        document.head.appendChild(el);
        injected = true;
    }, []);
}

export default function WalletScan({
    width = 900,
    height = 776,
    duration = 10,
    scale,
    tone = 'accent-dim',
    paused = false,
    findings = DEFAULT_FINDINGS,
    className = '',
    style,
    ...rest
}) {
    useStyleSheet();

    const rootRef = useRef(null);
    const [visible, setVisible] = useState(true);
    const [i, setI] = useState(0);

    // pause the animation when it scrolls out of view
    useEffect(() => {
        const node = rootRef.current;
        if (!node || typeof IntersectionObserver === 'undefined') return;
        const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 });
        io.observe(node);
        return () => io.disconnect();
    }, []);

    // rotate the readout, one finding per pass, swapped while it is off screen
    useEffect(() => {
        if (findings.length < 2 || paused || !visible) return;
        const t = setInterval(() => setI(n => (n + 1) % findings.length), duration * 1000);
        return () => clearInterval(t);
    }, [findings.length, duration, paused, visible]);

    const [title, label, value] = findings[i % findings.length] || [];

    const { bits, bars } = useMemo(() => {
        const rand = rng(20260815);
        const bits = Array.from({ length: 11 }, () => ({
            left: 9 + Math.floor(rand() * 13) * 14,
            top: 11 + Math.floor(rand() * 8) * 14,
            opacity: +(0.5 + rand() * 0.5).toFixed(2),
            ch: rand() > 0.5 ? '1' : '0',
        }));
        const bars = Array.from({ length: 28 }, (_, n) => {
            const h = 14 + rand() * 84;
            return { h: +h.toFixed(1), delay: +(0.004 * n).toFixed(4), hot: h > 78 };
        });
        return { bits, bars };
    }, []);

    const frozen = paused || !visible;

    return (
        <div
            ref={rootRef}
            className={`aw ${className}`.trim()}
            data-tone={tone === 'navy' ? 'navy' : undefined}
            data-paused={frozen ? '' : undefined}
            style={{
                '--aw-w': `${width}px`,
                '--aw-h': `${height}px`,
                '--aw-dur': `${duration}s`,
                '--aw-scale': scale ?? Math.min(width / 560, height / 480),
                ...style,
            }}
            role="img"
            aria-label="A wallet opening, scanning its cards, and closing"
            {...rest}
        >
            <div className="scene">
                <div className="stage">
                    <div className="rig">
                        <div className="floor" />
                        <div className="glow" />

                        <div className="wallet">
                            <div className="panel back">
                                <div className="face" />
                                <div className="grain" />
                                <div className="edge top" />
                                <div className="edge side" />
                            </div>

                            <div className="cavity" />

                            <div className="cards">
                                <div className="card c3" />
                                <div className="card c2" />
                                <div className="card c1">
                                    <div className="chip" />
                                    <div className="stripe" />
                                    <div className="scanfx">
                                        <div className="mesh" />
                                        <div className="beam" />
                                        <div className="reticle">
                                            <svg viewBox="0 0 202 136" preserveAspectRatio="none" aria-hidden="true">
                                                <path d="M2 20 V2 H24" />
                                                <path d="M178 2 H200 V20" />
                                                <path d="M200 116 V134 H178" />
                                                <path d="M24 134 H2 V116" />
                                                <path d="M64 46 h16 v-12" />
                                                <path d="M148 96 h-16 v12" />
                                            </svg>
                                        </div>
                                        {bits.map((b, n) => (
                                            <span
                                                key={n}
                                                className="bit"
                                                style={{ left: b.left, top: b.top, opacity: b.opacity }}
                                            >
                                                {b.ch}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="peek">
                                <b /><b /><b />
                            </div>

                            <div className="spine" />

                            <div className="panel front">
                                <div className="face" />
                                <div className="grain" />
                                <div className="edge top" />
                                <div className="edge side" />
                                <div className="logo"><i /></div>
                                <div className="strap">
                                    <div className="wrap" />
                                    <div className="snap" />
                                </div>
                            </div>
                        </div>

                        <div className="hud">
                            <div className="frame" />
                            <svg className="corners" viewBox="0 0 242 144" preserveAspectRatio="none" aria-hidden="true">
                                <path d="M16 2 H4 a2 2 0 0 0 -2 2 V18" />
                                <path d="M226 2 H238 a2 2 0 0 1 2 2 V18" />
                                <path d="M16 142 H4 a2 2 0 0 1 -2 -2 V126" />
                                <path d="M226 142 H238 a2 2 0 0 0 2 -2 V126" />
                                <path className="dash" d="M34 2 H208" />
                                <path className="dash" d="M34 142 H208" />
                            </svg>
                            <div className="inner">
                                <h4>{title}</h4>
                                <div className="rule" />
                                <div className="row">
                                    <span>{label}</span>
                                    <b>{value}</b>
                                </div>
                                <div className="axis"><span>100</span><span>50</span><span>0</span></div>
                                <div className="chart">
                                    {bars.map((b, n) => (
                                        <i
                                            key={n}
                                            className={b.hot ? 'hot' : undefined}
                                            style={{ '--aw-h2': `${b.h}%`, '--aw-d': `calc(var(--aw-dur) * ${b.delay})` }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}