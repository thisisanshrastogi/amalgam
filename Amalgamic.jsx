import { useState, useRef, useEffect, useMemo } from "react";
import {
  CreditCard,
  Calendar,
  MessageSquare,
  ShieldCheck,
  Lock,
  AlertTriangle,
  TrendingUp,
  Gauge,
  Check,
  Clock,
  CheckCircle2,
  ArrowUp,
  ArrowRight,
  Menu,
  X,
  MoreVertical,
  ChevronDown,
} from "lucide-react";

/* ==================================================================== */
/*  TOKENS + STYLES                                                     */
/* ==================================================================== */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

.amg {
  --bg: #F5F2EA;
  --surface: #FFFFFF;
  --text-1: #171613;
  --text-2: #6B6658;
  --accent: #2C4035;
  --highlight: #8DC4AC;
  --border: #E2DFD5;
  --panel: #14170F;
  --danger: #DC2626;
  --danger-soft: #FECACA;
  --danger-bg: #FEF2F2;

  --font-sans: 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif;
  --font-serif: 'Lora', Georgia, 'Times New Roman', serif;

  --shadow-soft: 0 20px 40px -15px rgba(23, 22, 19, 0.08);
  --shadow-lg: 0 20px 25px -5px rgba(0,0,0,.1), 0 8px 10px -6px rgba(0,0,0,.1);
  --shadow-xl: 0 25px 50px -12px rgba(0,0,0,.25);
  --shadow-float: 0 28px 56px -18px rgba(23,22,19,.38);

  background: var(--bg);
  color: var(--text-1);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  scroll-behavior: smooth;
}
.amg *, .amg *::before, .amg *::after { box-sizing: border-box; }
.amg p, .amg h1, .amg h2, .amg h3, .amg h4, .amg h5, .amg ul, .amg li { margin: 0; padding: 0; }
.amg ul { list-style: none; }
.amg a { color: inherit; text-decoration: none; }
.amg button { font: inherit; cursor: pointer; border: 0; background: none; color: inherit; }
.amg input { font: inherit; border: 0; background: none; color: inherit; outline: none; }
.amg :focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; border-radius: 6px; }
.amg .section--dark :focus-visible,
.amg .section--accent :focus-visible,
.amg .panel :focus-visible { outline-color: var(--highlight); }

/* ---------------- logo ---------------- */
.logo {
  font-size: 1.25rem; font-weight: 800; letter-spacing: -0.05em;
  display: flex; align-items: center; gap: 0.5rem; color: var(--text-1);
}
.logo-mark {
  width: 20px; height: 20px; background: var(--text-1);
  border-radius: 2px; position: relative; overflow: hidden; flex-shrink: 0;
}
.logo-mark::after {
  content: ''; position: absolute; top: 50%; left: 50%;
  width: 8px; height: 8px; background: var(--bg);
  transform: translate(-50%, -50%); border-radius: 1px;
}
.logo--invert { color: var(--bg); }
.logo--invert .logo-mark { background: var(--bg); }
.logo--invert .logo-mark::after { background: var(--text-1); }
.logo--mark-only { gap: 0; }

/* ---------------- layout ---------------- */
.container { max-width: 1200px; margin: 0 auto; }
.container--wide { max-width: 1320px; }
.container--narrow { max-width: 1000px; }
.container--tight { max-width: 800px; }
.section { padding: 8rem 2rem; }
.section--dark { background: var(--text-1); color: var(--bg); }
.section--tint { background: rgba(44, 64, 53, 0.05); }
.section--white { background: #fff; }
.section--accent { background: var(--accent); color: var(--bg); }
.section--bordered { border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }

.split { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; }
.split--wide-gap { gap: 6rem; }
.split--top { align-items: start; }
.cols-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 3rem; }
.cols-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
.cols-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; }

/* ---------------- type ---------------- */
.eyebrow {
  display: block; font-size: 0.75rem; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.1em; color: var(--accent); margin-bottom: 1.5rem;
}
.section--dark .eyebrow, .section--accent .eyebrow { color: var(--highlight); }
.h1 {
  font-family: var(--font-serif); font-weight: 500;
  font-size: clamp(2.75rem, 5.2vw, 76px); line-height: 1.04; letter-spacing: -0.025em;
}
.h2 {
  font-family: var(--font-serif); font-weight: 500;
  font-size: clamp(2.25rem, 4vw, 3rem); line-height: 1.2; letter-spacing: -0.015em;
}
.h2--xl { font-size: clamp(2.5rem, 5vw, 3.75rem); }
.h3 { font-family: var(--font-serif); font-size: 1.5rem; font-weight: 500; line-height: 1.3; }
.lead { font-size: clamp(1.0625rem, 1.3vw, 1.25rem); line-height: 1.65; color: var(--text-2); }
.body { font-size: 1.125rem; line-height: 1.65; color: var(--text-2); }
.body--sm { font-size: 0.9375rem; line-height: 1.65; color: var(--text-2); }
.micro {
  font-size: 0.625rem; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.12em; color: var(--text-2);
}
.serif { font-family: var(--font-serif); }
.section--dark .body, .section--dark .lead { color: rgba(245, 242, 234, 0.75); }
.section--accent .lead { color: rgba(245, 242, 234, 0.85); }
.section--dark .h2, .section--dark .h3 { color: #fff; }

/* ---------------- buttons ---------------- */
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
  border-radius: 14px; font-weight: 700;
  transition: transform .18s ease, background-color .18s ease, border-color .18s ease, color .18s ease, box-shadow .18s ease;
}
.btn--sm { padding: 0.75rem 1.35rem; font-size: 0.875rem; font-weight: 600; border-radius: 11px; }
.btn--lg { padding: 1.35rem 2.4rem; font-size: 1.0625rem; border-radius: 18px; }
.btn--primary { background: var(--accent); color: var(--bg); box-shadow: 0 16px 28px -12px rgba(44,64,53,.55); }
.btn--primary:hover { background: var(--text-1); transform: translateY(-1px); }
.btn--primary:active { transform: translateY(0); }
.btn--light { background: #fff; color: var(--accent); box-shadow: var(--shadow-xl); }
.btn--light:hover { transform: translateY(-2px); }
.btn--ghost { border: 1px solid rgba(255,255,255,.25); color: #fff; padding: 1.35rem 2rem; border-radius: 18px; }
.btn--ghost:hover { background: rgba(255,255,255,.08); border-color: rgba(255,255,255,.5); }
.btn--danger { color: var(--danger); border: 1px solid var(--danger-soft); background: transparent; padding: .5rem 1rem; border-radius: 10px; font-size: .625rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; }
.btn--danger:hover { background: var(--danger-bg); }
.btn--done { color: var(--text-2); border: 1px solid var(--border); background: transparent; padding: .5rem 1rem; border-radius: 10px; font-size: .625rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; cursor: default; }
.tag {
  font-size: .625rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
  color: var(--highlight); border: 1px solid rgba(141,196,172,.4);
  padding: .35rem .8rem; border-radius: 999px; white-space: nowrap; transition: background-color .18s ease;
}
.tag:hover { background: rgba(141,196,172,.14); }
.tag--settled { color: var(--highlight); border-color: transparent; cursor: default; }
.tag--settled:hover { background: none; }

/* ---------------- nav ---------------- */
.nav {
  position: sticky; top: 0; z-index: 60;
  background: rgba(245, 242, 234, 0.84);
  backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--border); padding: 1.1rem 2rem;
}
.nav__inner { display: flex; align-items: center; justify-content: space-between; gap: 2rem; }
.nav__links { display: flex; align-items: center; gap: 2.5rem; font-size: 0.9375rem; font-weight: 500; color: var(--text-2); }
.nav__links a { position: relative; padding: .25rem 0; transition: color .18s ease; }
.nav__links a:hover { color: var(--accent); }
.nav__links a.is-active { color: var(--text-1); }
.nav__links a.is-active::after {
  content: ''; position: absolute; left: 0; right: 0; bottom: -2px;
  height: 2px; border-radius: 2px; background: var(--accent);
}
.nav__toggle { display: none; padding: 0.5rem; color: var(--text-1); }
.nav__mobile { display: none; }

/* ---------------- hero ---------------- */
.hero { padding: 5rem 2rem 6rem; }
.hero__grid { display: grid; grid-template-columns: 1.02fr 1fr; gap: 5rem; align-items: center; }
.pill {
  display: inline-block; padding: 0.55rem 1.1rem; border-radius: 999px;
  background: rgba(44, 64, 53, 0.07); color: var(--accent);
  font-size: 0.6875rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.14em;
}
.hero__title { margin: 2rem 0 2rem; max-width: 15ch; }
.hero__sub { max-width: 38ch; margin-bottom: 2.75rem; }
.hero__note { display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; color: var(--text-2); margin-top: 1.25rem; }
.herostats { display: flex; margin-top: 4rem; padding-top: 2rem; border-top: 1px solid var(--border); }
.herostat { padding: 0 2.25rem; border-right: 1px solid var(--border); }
.herostat:first-child { padding-left: 0; }
.herostat:last-child { border-right: 0; }
.herostat__val { font-family: var(--font-serif); font-size: 1.75rem; line-height: 1; margin-bottom: .5rem; }

/* ---------------- assistant panel ---------------- */
.hero__visual { position: relative; }
.panel {
  background: var(--panel); border-radius: 34px; padding: 1.5rem;
  height: 580px; display: flex; flex-direction: column;
  box-shadow: 0 40px 80px -30px rgba(23,22,19,.6);
  border: 1px solid rgba(255,255,255,.07);
}
.panel--short { height: 520px; }
.panel__head {
  display: flex; align-items: center; gap: .75rem;
  padding: .25rem .5rem 1.25rem; border-bottom: 1px solid rgba(255,255,255,.09);
}
.panel__avatar {
  width: 34px; height: 34px; border-radius: 10px; background: var(--accent);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.panel__title { color: #fff; font-weight: 700; font-size: .9375rem; line-height: 1.25; }
.panel__status { display: flex; align-items: center; gap: .4rem; font-size: .5625rem; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--highlight); margin-top: .15rem; }
.panel__pulse { width: 6px; height: 6px; border-radius: 999px; background: var(--highlight); animation: pulse 2.2s ease-in-out infinite; }
.panel__more { margin-left: auto; color: rgba(245,242,234,.45); padding: .35rem; border-radius: 8px; transition: color .18s ease, background-color .18s ease; }
.panel__more:hover { color: #fff; background: rgba(255,255,255,.08); }

.thread {
  flex: 1; overflow-y: auto; overscroll-behavior: contain;
  display: flex; flex-direction: column; gap: .85rem;
  padding: 1.25rem .5rem; margin: 0 -.25rem;
  scrollbar-width: thin; scrollbar-color: rgba(245,242,234,.22) transparent;
}
.thread::-webkit-scrollbar { width: 6px; }
.thread::-webkit-scrollbar-thumb { background: rgba(245,242,234,.22); border-radius: 999px; }
.thread::-webkit-scrollbar-track { background: transparent; }

.msg { display: flex; animation: rise .28s ease both; }
.msg--user { justify-content: flex-end; }
.bubble { padding: .8rem 1.1rem; font-size: .875rem; line-height: 1.55; max-width: 86%; }
.bubble--user { border-radius: 18px 18px 5px 18px; background: rgba(245,242,234,.94); color: var(--text-1); font-weight: 500; }
.bubble--ai { border-radius: 18px 18px 18px 5px; background: var(--accent); color: var(--bg); box-shadow: 0 10px 20px -10px rgba(0,0,0,.5); }
.bubble--ai strong { color: #fff; font-weight: 700; }

.typing { display: flex; gap: 4px; padding: 1rem 1.15rem; }
.typing span { width: 6px; height: 6px; border-radius: 999px; background: rgba(245,242,234,.75); animation: blink 1.3s infinite; }
.typing span:nth-child(2) { animation-delay: .18s; }
.typing span:nth-child(3) { animation-delay: .36s; }

.chips { display: flex; gap: .5rem; overflow-x: auto; padding: 0 .25rem .85rem; scrollbar-width: none; }
.chips::-webkit-scrollbar { display: none; }
.chip {
  flex-shrink: 0; font-size: .75rem; font-weight: 600; white-space: nowrap;
  padding: .5rem .9rem; border-radius: 999px;
  background: rgba(245,242,234,.09); color: rgba(245,242,234,.9);
  border: 1px solid rgba(245,242,234,.14); transition: background-color .18s ease, border-color .18s ease;
}
.chip:hover { background: rgba(141,196,172,.18); border-color: rgba(141,196,172,.5); color: #fff; }

.composer {
  display: flex; align-items: center; gap: .75rem;
  background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.09);
  border-radius: 999px; padding: .5rem .5rem .5rem 1.25rem;
  transition: border-color .18s ease;
}
.composer:focus-within { border-color: rgba(141,196,172,.5); }
.composer input { flex: 1; font-size: .875rem; color: #fff; min-width: 0; }
.composer input::placeholder { color: rgba(245,242,234,.45); font-style: italic; }
.composer__send {
  width: 2.25rem; height: 2.25rem; border-radius: 999px; background: var(--accent); color: var(--bg);
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  transition: background-color .18s ease, transform .18s ease;
}
.composer__send:hover { background: var(--highlight); color: var(--text-1); transform: scale(1.06); }
.composer__send:disabled { opacity: .45; cursor: not-allowed; transform: none; background: var(--accent); color: var(--bg); }

/* ---------------- floating cards ---------------- */
.floatcard {
  position: absolute; z-index: 5;
  background: rgba(255,255,255,.97);
  backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(226,223,213,.8);
  border-radius: 18px; padding: 1rem;
  box-shadow: var(--shadow-float);
  transition: opacity .3s ease, transform .3s ease;
}
.floatcard--hike { top: 14%; right: -3rem; width: 232px; animation: float 6s ease-in-out infinite; }
.floatcard--credit { bottom: 12%; left: -3.5rem; width: 256px; animation: float 6s ease-in-out .8s infinite; }
.floatcard.is-out { opacity: 0; transform: scale(.94) translateY(6px); pointer-events: none; }
.floatcard__row { display: flex; align-items: center; gap: .65rem; }
.floatcard__icon { width: 30px; height: 30px; border-radius: 9px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.floatcard__label { font-size: .5625rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: var(--text-1); }
.floatcard__meta { font-size: .6875rem; color: var(--text-2); margin-top: .15rem; }
.floatcard__amt { font-size: .875rem; font-weight: 700; color: var(--text-1); }
.floatcard__action {
  display: block; width: 100%; margin-top: .85rem; padding: .6rem;
  background: var(--accent); color: var(--bg); border-radius: 10px;
  font-size: .75rem; font-weight: 700; transition: background-color .18s ease;
}
.floatcard__action:hover { background: var(--text-1); }
.floatcard__head { display: flex; align-items: center; justify-content: space-between; margin-bottom: .75rem; }
.badge-danger {
  font-size: .5rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
  color: var(--danger); background: var(--danger-bg); padding: .2rem .45rem; border-radius: 5px;
}

/* ---------------- capability strip ---------------- */
.capstrip { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; }
.capstrip__item { display: flex; align-items: center; gap: .85rem; }
.iconwell {
  display: flex; align-items: center; justify-content: center;
  width: 2.5rem; height: 2.5rem; border-radius: 999px;
  background: rgba(44,64,53,.07); color: var(--accent); flex-shrink: 0;
}
.iconwell--square { border-radius: 1rem; width: 3rem; height: 3rem; }
.trustrow { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 1.5rem; margin-top: 3rem; padding-top: 2rem; border-top: 1px solid var(--border); }
.trustrow .dot { width: 4px; height: 4px; border-radius: 999px; background: var(--text-2); opacity: .5; }

/* ---------------- loss cards ---------------- */
.floatgrid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; animation: float 5s ease-in-out infinite; }
.floatgrid > *:nth-child(even) { margin-top: 2.5rem; }
.valuecard { padding: 1.5rem; text-align: center; background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.12); border-radius: 1rem; }
.valuecard__amt { display: block; font-family: var(--font-serif); font-size: 1.875rem; color: var(--highlight); margin-bottom: .5rem; }
.valuecard__label { font-size: .75rem; text-transform: uppercase; letter-spacing: .12em; opacity: .7; }
.glow { position: absolute; inset: -5rem; z-index: -1; background: rgba(44,64,53,.35); filter: blur(100px); }

/* ---------------- steps ---------------- */
.step__num { font-family: var(--font-serif); font-size: 3rem; color: rgba(44,64,53,.16); margin-bottom: 1.5rem; }

/* ---------------- insights ---------------- */
.glasscard {
  background: rgba(255,255,255,.6); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(226,223,213,.6); border-radius: 1.5rem; padding: 1.25rem;
  box-shadow: var(--shadow-soft); display: flex; flex-direction: column; gap: .75rem;
}
.insightwrap { background: #fff; border: 1px solid transparent; border-radius: 1rem; transition: border-color .18s ease, box-shadow .18s ease; overflow: hidden; }
.insightwrap.is-open { border-color: var(--accent); box-shadow: var(--shadow-soft); }
.insightwrap.is-resolved { opacity: .55; }
.insight { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 1rem; width: 100%; text-align: left; }
.insightwrap:hover { border-color: rgba(44,64,53,.35); }
.insight__left { display: flex; align-items: center; gap: 1rem; min-width: 0; }
.insight__icon { display: flex; align-items: center; justify-content: center; width: 2.5rem; height: 2.5rem; border-radius: .75rem; flex-shrink: 0; }
.insight__title { font-size: .875rem; font-weight: 700; display: block; }
.insight__meta { font-size: .75rem; color: var(--text-2); }
.insight__cta { display: flex; align-items: center; gap: .3rem; font-size: .75rem; font-weight: 700; color: var(--accent); white-space: nowrap; }
.insight__cta svg { transition: transform .25s ease; }
.insightwrap.is-open .insight__cta svg { transform: rotate(180deg); }
.insight--offset { transform: translateX(1rem); }
.insight__panel { padding: 0 1rem 1rem 4.5rem; animation: rise .25s ease both; }
.insight__answer { font-size: .8125rem; line-height: 1.6; color: var(--text-2); margin-bottom: .85rem; }
.quotebox { padding: 1rem; border-radius: 1rem; font-style: italic; font-size: .875rem; background: rgba(44,64,53,.06); color: var(--accent); border: 1px solid rgba(44,64,53,.14); }

/* ---------------- tabs ---------------- */
.tabs { display: flex; gap: .5rem; flex-wrap: wrap; margin-bottom: 1.25rem; }
.tab {
  font-size: .8125rem; font-weight: 600; padding: .55rem 1rem; border-radius: 999px;
  border: 1px solid var(--border); color: var(--text-2); background: #fff;
  transition: all .18s ease;
}
.tab:hover { border-color: var(--accent); color: var(--accent); }
.tab.is-active { background: var(--accent); border-color: var(--accent); color: var(--bg); }

/* ---------------- bullets ---------------- */
.bullet { display: flex; gap: 1rem; }
.bullet__dot { flex-shrink: 0; width: 1.5rem; height: 1.5rem; margin-top: .25rem; border-radius: 999px; background: rgba(44,64,53,.12); display: flex; align-items: center; justify-content: center; }
.bullet__dot i { width: .5rem; height: .5rem; border-radius: 999px; background: var(--accent); display: block; }
.check { flex-shrink: 0; width: 1.5rem; height: 1.5rem; border-radius: 999px; background: var(--highlight); color: var(--text-1); display: flex; align-items: center; justify-content: center; }

/* ---------------- calendar ---------------- */
.panel-outline { background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.12); border-radius: 40px; padding: .25rem; }
.panel-outline__inner { padding: 2rem; display: flex; flex-direction: column; gap: 2rem; }
.cal { display: grid; grid-template-columns: repeat(7, 1fr); gap: .25rem; text-align: center; }
.cal__dow { font-size: .625rem; font-weight: 700; text-transform: uppercase; color: rgba(245,242,234,.65); }
.cal__day { height: 2.5rem; width: 100%; display: flex; align-items: center; justify-content: center; position: relative; font-size: .875rem; color: rgba(245,242,234,.7); border-radius: .75rem; border: 1px solid transparent; transition: background-color .18s ease, border-color .18s ease; }
.cal__day:hover { background: rgba(255,255,255,.07); }
.cal__day--out { color: rgba(245,242,234,.35); }
.cal__day--due { border-color: rgba(141,196,172,.45); background: rgba(141,196,172,.1); color: #fff; }
.cal__day--late { border-color: rgba(248,113,113,.45); background: rgba(248,113,113,.1); color: #fff; }
.cal__day.is-selected { border-color: var(--highlight); background: rgba(141,196,172,.22); color: #fff; }
.cal__dot { position: absolute; bottom: .3rem; width: 4px; height: 4px; border-radius: 999px; }
.cal__hint { font-size: .75rem; color: rgba(245,242,234,.6); min-height: 1.2em; }
.acctrow { display: flex; align-items: center; justify-content: space-between; gap: 1rem; background: rgba(255,255,255,.1); border-radius: 1rem; padding: 1rem; transition: opacity .3s ease; }
.acctrow--done { opacity: .55; }
.chip-card { width: 2.5rem; height: 1.5rem; border-radius: .25rem; flex-shrink: 0; }

/* ---------------- subscriptions ---------------- */
.sublist { display: flex; flex-direction: column; gap: .6rem; }
.subrow {
  display: flex; align-items: center; justify-content: space-between; gap: 1rem;
  padding: .85rem 1rem; background: #fff; border: 1px solid var(--border); border-radius: 14px;
  transition: opacity .25s ease, border-color .18s ease;
}
.subrow.is-cancelled { opacity: .5; }
.subrow.is-cancelled .subrow__name { text-decoration: line-through; }
.subrow__mark { width: 2.25rem; height: 2.25rem; border-radius: .5rem; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: .8125rem; color: #fff; flex-shrink: 0; }
.subrow__name { font-size: .875rem; font-weight: 700; display: block; }
.subrow__price { font-size: .75rem; color: var(--text-2); }
.burncard { background: #fff; border: 1px solid var(--border); border-radius: 40px; padding: 3rem; box-shadow: var(--shadow-xl); display: flex; flex-direction: column; gap: 2.5rem; }
.burncard__amt { font-family: var(--font-serif); font-size: 3.5rem; line-height: 1; display: block; transition: color .3s ease; }
.bar { display: flex; height: .5rem; border-radius: 999px; overflow: hidden; background: rgba(44,64,53,.1); }
.bar > span { transition: width .45s cubic-bezier(.4,0,.2,1); }
.legend { display: grid; grid-template-columns: repeat(3, 1fr); gap: .5rem; }
.legend__item { display: flex; align-items: center; gap: .5rem; }
.legend__swatch { width: .5rem; height: .5rem; border-radius: 999px; flex-shrink: 0; }
.saved { font-size: .8125rem; font-weight: 700; color: var(--accent); }

/* ---------------- generic ---------------- */
.card { background: #fff; border: 1px solid var(--border); border-radius: 32px; padding: 2rem; transition: border-color .18s ease, transform .18s ease; display: flex; flex-direction: column; }
.card:hover { border-color: var(--accent); transform: translateY(-3px); }
.softbox { padding: 1.5rem; border-radius: 1.5rem; background: rgba(44,64,53,.06); border: 1px solid rgba(44,64,53,.14); }
.plainbox { padding: 2rem; border-radius: 1.5rem; background: #fff; border: 1px solid var(--border); }

/* ---------------- table ---------------- */
.tablewrap { border: 1px solid var(--border); border-radius: 1.5rem; overflow: hidden; background: #fff; box-shadow: var(--shadow-soft); }
.amg table { width: 100%; border-collapse: collapse; text-align: left; }
.amg thead tr { background: rgba(44,64,53,.05); border-bottom: 1px solid var(--border); }
.amg th { padding: 0; }
.th-btn {
  width: 100%; display: flex; align-items: center; gap: .4rem; padding: 1.25rem 2rem;
  font-size: .75rem; font-weight: 700; text-transform: uppercase; letter-spacing: .1em;
  color: var(--text-2); transition: color .18s ease;
}
.th-btn:hover { color: var(--accent); }
.th-btn--right { justify-content: flex-end; }
.th-btn svg { opacity: .35; transition: transform .2s ease, opacity .2s ease; }
.th-btn.is-sorted svg { opacity: 1; color: var(--accent); }
.th-btn.is-asc svg { transform: rotate(180deg); }
.amg td { padding: 1.5rem 2rem; font-size: .9375rem; }
.amg tbody tr { border-top: 1px solid var(--border); transition: background-color .15s ease; }
.amg tbody tr:hover { background: rgba(44,64,53,.04); }
.cell--amt { font-family: var(--font-serif); font-size: 1.25rem; font-weight: 700; color: var(--accent); }
.cell--right { text-align: right; color: var(--text-2); }
.statgrid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-top: 4rem; text-align: center; }
.statgrid__val { font-family: var(--font-serif); font-size: 1.875rem; font-weight: 700; color: var(--accent); }

/* ---------------- footer ---------------- */
.footer { padding: 5rem 2rem; background: var(--bg); border-top: 1px solid var(--border); }
.footer__grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 3rem; }
.footer__bottom { margin-top: 5rem; padding-top: 2.5rem; border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap; }
.footer a:hover { color: var(--accent); }

/* ---------------- utilities ---------------- */
.stack-sm > * + * { margin-top: .5rem; }
.stack > * + * { margin-top: 1.5rem; }
.stack-lg > * + * { margin-top: 2rem; }
.center { text-align: center; }
.relative { position: relative; }
.flexcol { display: flex; flex-direction: column; }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }

/* ---------------- keyframes ---------------- */
@keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-9px); } }
@keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: .35; } }
@keyframes blink { 0%,60%,100% { opacity: .3; } 30% { opacity: 1; } }
@keyframes rise { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }

/* ---------------- responsive ---------------- */
@media (max-width: 1180px) {
  .floatcard--hike { right: -1rem; }
  .floatcard--credit { left: -1rem; }
}
@media (max-width: 1023px) {
  .split, .split--wide-gap, .hero__grid { grid-template-columns: 1fr; gap: 3.5rem; }
  .cols-4, .capstrip { grid-template-columns: repeat(2, 1fr); }
  .split .order-first-mobile { order: -1; }
  .hero__title, .hero__sub { max-width: none; }
  .floatcard--hike { top: 8%; right: 0; }
  .floatcard--credit { bottom: 8%; left: 0; }
}
@media (max-width: 767px) {
  .section { padding: 5rem 1.25rem; }
  .hero { padding: 3rem 1.25rem 4rem; }
  .nav { padding: 1rem 1.25rem; }
  .nav__links, .nav__cta { display: none; }
  .nav__toggle { display: block; }
  .nav__mobile { display: flex; flex-direction: column; gap: 1.25rem; padding: 1.5rem .25rem .25rem; font-size: 1rem; font-weight: 500; color: var(--text-2); }
  .cols-4, .cols-3, .cols-2, .capstrip, .legend, .statgrid, .footer__grid { grid-template-columns: 1fr; }
  .statgrid, .legend { grid-template-columns: repeat(3, 1fr); }
  .herostats { flex-wrap: wrap; gap: 1.5rem 0; }
  .herostat { padding: 0 1.25rem; }
  .insight--offset { transform: none; }
  .panel { height: 520px; padding: 1.15rem; border-radius: 26px; }
  .floatcard { position: static; width: 100% !important; animation: none; margin-top: .75rem; }
  .burncard { padding: 2rem; border-radius: 28px; }
  .panel-outline { border-radius: 28px; }
  .amg td, .th-btn { padding: 1rem; }
  .amg th:last-child, .amg td:last-child { display: none; }
  .insight__panel { padding-left: 1rem; }
  .footer__bottom { flex-direction: column; align-items: flex-start; }
}
@media (prefers-reduced-motion: reduce) {
  .amg *, .amg *::before, .amg *::after { animation: none !important; transition-duration: .01ms !important; }
  .amg { scroll-behavior: auto; }
}
`;

/* ==================================================================== */
/*  SHARED                                                              */
/* ==================================================================== */

function Logo({ invert = false, markOnly = false }) {
  return (
    <span className={`logo ${invert ? "logo--invert" : ""} ${markOnly ? "logo--mark-only" : ""}`}>
      <span className="logo-mark" aria-hidden="true" />
      {!markOnly && "Amalgamic"}
    </span>
  );
}

const money = (n) => `$${n.toFixed(2)}`;

/* ==================================================================== */
/*  ASSISTANT BRAIN                                                     */
/* ==================================================================== */

const REPLIES = [
  {
    keys: ["yes", "please", "file", "go ahead", "do it", "sure", "waive"],
    text: "Filed with Amex. Reference #AX-9921. Expect a $35.00 credit in 3–5 business days — I'll chase them if it slips.",
  },
  {
    keys: ["higher", "why", "more", "increase", "statement", "spend"],
    text: "Your total is up $420 on last month. Two drivers: a $200 airline baggage fee — disputable, your flight was delayed six hours — and $180 more on dining than your three-month average.",
  },
  {
    keys: ["expiring", "credit", "saks", "expire", "benefit"],
    text: "One credit expires in 11 days: $50.00 at Saks on your Amex Platinum. Two more expire next month — a $100 airline fee credit and $15 in Uber Cash.",
  },
  {
    keys: ["cancel", "subscription", "netflix", "recurring"],
    text: "Netflix Premium went from $19.49 to $22.99 in March. Cancelling saves $275.88 a year. I'll handle the retention flow — want me to?",
  },
  {
    keys: ["minimum", "payoff", "pay off", "interest", "apr", "clear"],
    text: "At your current APR, minimum payments clear this card in 11 years and cost $4,120 in interest. Adding $150 a month clears it in 14 months.",
  },
  {
    keys: ["fee", "fees", "audit", "scan", "dispute", "duplicate"],
    text: "I scanned five connected cards. Three fees look disputable: a $35 late fee, a $29 FX fee on a Lisbon hotel, and a $200 baggage fee. Combined: $264.00.",
  },
  {
    keys: ["utilization", "score", "credit health", "limit"],
    text: "Chase Sapphire is at 42% utilization — above the 30% mark that starts affecting your score. Paying $1,180 before the 14th brings it under.",
  },
];

const FALLBACK =
  "I only work on your money, so I'll stop short of anything else. Ask me about a statement, a fee, a subscription, or a card credit.";

function answerFor(input) {
  const q = input.toLowerCase();
  const hit = REPLIES.find((r) => r.keys.some((k) => q.includes(k)));
  return hit ? hit.text : FALLBACK;
}

let idSeq = 0;
const nextId = () => ++idSeq;

function useAssistant(seed) {
  const [messages, setMessages] = useState(seed);
  const [typing, setTyping] = useState(false);
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const send = (raw, forcedReply) => {
    const text = raw.trim();
    if (!text || typing) return;
    setMessages((m) => [...m, { id: nextId(), from: "user", text }]);
    setTyping(true);
    const t = setTimeout(() => {
      setMessages((m) => [...m, { id: nextId(), from: "ai", text: forcedReply || answerFor(text) }]);
      setTyping(false);
    }, 850);
    timers.current.push(t);
  };

  return { messages, typing, send };
}

function Thread({ messages, typing }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  return (
    <div className="thread" ref={ref} role="log" aria-live="polite" aria-label="Assistant conversation">
      {messages.map((m) => (
        <div className={`msg msg--${m.from}`} key={m.id}>
          <div className={`bubble bubble--${m.from}`}>{m.text}</div>
        </div>
      ))}
      {typing && (
        <div className="msg msg--ai">
          <div className="bubble bubble--ai typing" aria-label="Assistant is typing">
            <span /><span /><span />
          </div>
        </div>
      )}
    </div>
  );
}

function Composer({ onSend, disabled }) {
  const [value, setValue] = useState("");
  const submit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSend(value);
    setValue("");
  };
  return (
    <form className="composer" onSubmit={submit}>
      <label className="sr-only" htmlFor="amg-ask">Ask the assistant</label>
      <input
        id="amg-ask"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Ask anything about your money…"
        autoComplete="off"
      />
      <button className="composer__send" type="submit" disabled={disabled || !value.trim()} aria-label="Send message">
        <ArrowUp size={16} strokeWidth={2.5} />
      </button>
    </form>
  );
}

/* ==================================================================== */
/*  CONTENT                                                             */
/* ==================================================================== */

const NAV_LINKS = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#insights", label: "Insights" },
  { href: "#assistant", label: "Assistant" },
  { href: "#security", label: "Security" },
];

const HERO_STATS = [
  ["$1.2M+", "Recovered"],
  ["12,000+", "Institutions"],
  ["Zero", "Data selling"],
];

const HERO_SEED = [
  {
    id: nextId(),
    from: "ai",
    text: "I found a $35 late fee on your last statement. You've never missed a payment before, so I can likely get this waived. Should I file the request?",
  },
];

const SUGGESTIONS = [
  "Yes, please.",
  "Why is my Amex higher this month?",
  "What's expiring soon?",
  "What's the weather in Lisbon?",
];

const CAPABILITIES = [
  { Icon: CreditCard, label: "All your cards in one place" },
  { Icon: Calendar, label: "What's due and when" },
  { Icon: MessageSquare, label: "Assistant for statements" },
  { Icon: ShieldCheck, label: "Claims handled for you" },
];

const TRUST = ["Plaid & Spinwheel", "Read-only by default", "12,000+ US institutions", "Zero data selling"];

const LOSSES = [
  { amt: "$15.99", label: "Streaming" },
  { amt: "$39.00", label: "Late fee" },
  { amt: "$50.00", label: "Saks credit" },
  { amt: "$200.00", label: "Baggage claim" },
];

const STEPS = [
  { num: "01", title: "Connect your cards", body: "You link your credit cards through Plaid and Spinwheel. Amalgamic finds cards you may have forgotten you hold, along with their balances, limits and due dates." },
  { num: "02", title: "We tell you what changed", body: "Amalgamic reads statements continuously, and surfaces the few things that actually matter this month. Not a dashboard — a short list of what's different." },
  { num: "03", title: "Ask about any of it", body: "Every insight opens into a conversation. Ask why the statement is higher or what happens if you pay the minimum. It answers from your own accounts." },
  { num: "04", title: "Hand it over", body: "Cancel this, dispute that, claim this credit. One tap, and the tedious part after it is ours. Money goes back to your original account." },
];

const INSIGHTS = [
  {
    id: "late",
    Icon: AlertTriangle,
    title: "Late fee detected",
    meta: "Amex Gold • $35.00",
    bg: "#FEF2F2",
    fg: "#DC2626",
    offset: false,
    answer: "Charged on 14 Sept, three days after your statement date. It's your first late payment in 24 months, which puts a courtesy waiver well within reach.",
    action: "Request a waiver",
    done: "Waiver requested",
  },
  {
    id: "hike",
    Icon: TrendingUp,
    title: "Subscription price hike",
    meta: "Netflix • +$3.50 / mo",
    bg: "#FFF7ED",
    fg: "#EA580C",
    offset: true,
    answer: "Premium went from $19.49 to $22.99 in March. You've watched four hours in the last 60 days. Cancelling saves $275.88 over a year.",
    action: "Cancel and save",
    done: "Cancellation filed",
  },
  {
    id: "util",
    Icon: Gauge,
    title: "Credit utilization alert",
    meta: "Chase Sapphire • 42%",
    bg: "#EFF6FF",
    fg: "#2563EB",
    offset: false,
    answer: "You're above the 30% threshold that starts affecting your score. A $1,180 payment before the 14th brings you under it before the bureau reports.",
    action: "Schedule the payment",
    done: "Payment scheduled",
  },
];

const INSIGHT_KINDS = [
  { title: "Fees you shouldn't have paid", body: "Late fees, FX fees, and annual fees flagged with dispute success probability." },
  { title: "Charges that moved", body: "Subscription price hikes or duplicate charges across any of your connected cards." },
  { title: "Credit health", body: "Utilization creeping toward score-affecting levels, simplified into clear actions." },
  { title: "Where the money went", body: "Your most frequent merchants vs largest ones — it's rarely the same list." },
];

const ASSISTANT_POINTS = [
  { strong: "It reads your statements.", rest: " Attach a PDF and it parses the contents directly, even for accounts you haven't connected." },
  { strong: "It audits on request.", rest: " Deep scans across every connected institution for hidden fees, duplicates or spikes." },
  { strong: "It does the arithmetic.", rest: " Payoff timelines, minimum payment impact, and what an extra $200 actually changes." },
];

const SCENARIOS = [
  {
    label: "Statement went up",
    thread: [
      { from: "user", text: "Why is this month's statement higher than last month's?" },
      { from: "ai", text: "Your total spending increased by $420. The main drivers are a $200 airline baggage fee — which I can dispute for you — and a $180 spike in dining compared to your three-month average." },
      { from: "user", text: "Dispute the baggage fee." },
      { from: "ai", text: "Filed. Reference #AMX-992, drafted under DOT delay rules and submitted to the airline as well. A provisional credit of $200 is already on your account." },
    ],
  },
  {
    label: "Minimum payments",
    thread: [
      { from: "user", text: "If I only pay the minimum on this card, how long until it's clear and what does it cost me?" },
      { from: "ai", text: "At your current APR, paying only the minimum will take 11 years to clear and cost you $4,120 in interest." },
      { from: "user", text: "And if I add $150 a month?" },
      { from: "ai", text: "14 months, and $612 in total interest. You'd save $3,508 against the minimum-only path." },
    ],
  },
  {
    label: "Audit my fees",
    thread: [
      { from: "user", text: "Scan everything for fees I shouldn't have paid." },
      { from: "ai", text: "Five cards scanned, 18 months of history. Three fees look disputable: a $35 late fee (first in 24 months), a $29 FX fee on a hotel that bills in USD, and the $200 baggage fee. Combined: $264.00." },
      { from: "user", text: "What are the odds on each?" },
      { from: "ai", text: "Late fee: high — courtesy waivers on a clean record are routine. FX fee: moderate, it depends on how the merchant coded the charge. Baggage: high, the six-hour delay is documented." },
    ],
  },
  {
    label: "Something else",
    thread: [
      { from: "user", text: "Can you book me a table for Friday?" },
      { from: "ai", text: FALLBACK },
      { from: "user", text: "Fine. What's expiring on my cards?" },
      { from: "ai", text: "One credit expires in 11 days: $50.00 at Saks on your Amex Platinum. Two more expire next month — a $100 airline fee credit and $15 in Uber Cash." },
    ],
  },
];

const CARD_POINTS = [
  { title: "A calendar you can read in three seconds", body: "See exactly when payments are due and which will cost you interest if you only pay the minimum." },
  { title: "Pay from here", body: "Settle card bills in the app instead of logging into four issuer portals. If a connection needs re-authorising, you'll know early." },
];

const SUBS = [
  { id: "netflix", name: "Netflix Premium", price: 22.99, cat: "Entertainment", mark: "N", color: "#171613" },
  { id: "spotify", name: "Spotify Family", price: 19.99, cat: "Entertainment", mark: "S", color: "#2C4035" },
  { id: "nyt", name: "NYT All Access", price: 25.0, cat: "Entertainment", mark: "T", color: "#171613" },
  { id: "adobe", name: "Adobe Creative Cloud", price: 59.99, cat: "SaaS / tools", mark: "A", color: "#DC2626" },
  { id: "chatgpt", name: "AI Assistant Pro", price: 20.0, cat: "SaaS / tools", mark: "P", color: "#2C4035" },
  { id: "dropbox", name: "Dropbox Plus", price: 11.99, cat: "SaaS / tools", mark: "D", color: "#2563EB" },
  { id: "equinox", name: "Equinox", price: 185.0, cat: "Health", mark: "E", color: "#171613" },
  { id: "peloton", name: "Peloton App", price: 24.0, cat: "Health", mark: "◉", color: "#6B6658" },
];

const CAT_COLORS = { "Entertainment": "var(--accent)", "SaaS / tools": "var(--highlight)", "Health": "var(--text-1)" };

const CREDITS = [
  { id: "offers", Icon: Clock, title: "Merchant offers", body: 'Automatically activate merchant offers across all your cards. Never forget to "add to card" again.', bg: "rgba(44,64,53,.07)", fg: "#2C4035", cta: "Activate all 14", done: "14 offers activated" },
  { id: "expiring", Icon: AlertTriangle, title: "Expiring soon", body: "Credits ranked by what expires soonest, not by what's largest. Use it before the bank keeps it.", bg: "#FEF2F2", fg: "#DC2626", cta: "Claim $50 Saks credit", done: "Saks credit claimed" },
  { id: "travel", Icon: CheckCircle2, title: "Travel protections", body: "Detect delay-based insurance eligibility in your data and file the claim instantly.", bg: "rgba(141,196,172,.18)", fg: "#2C4035", cta: "File delay claim", done: "Claim filed" },
];

const SECURITY = [
  { title: "No credentials stored", body: "Connections run through Plaid. Credentials never touch our servers." },
  { title: "Restricted access", body: "Read-only by default. We cannot move funds to third parties." },
  { title: "No data selling", body: "We don't sell your data to brokers or train AI models on it." },
  { title: "Full deletion", body: "Leave anytime. Account deletion triggers a real purge of all data." },
];

const RECOVERIES = [
  { what: "Subscription active 14 months after cancellation", amount: 312.0, days: 3, time: "3 days" },
  { what: "Late fee, first in 24 months", amount: 45.0, days: 0, time: "Same day" },
  { what: "Airline fee disputed after delay", amount: 200.0, days: 11, time: "11 days" },
  { what: "Statement credit claimed before expiry", amount: 50.0, days: 0, time: "Same day" },
  { what: "Duplicate charge, same merchant, same day", amount: 89.0, days: 6, time: "6 days" },
];

const STATS = [
  ["$1.2M+", "Recovered to date"],
  ["$142", "Median recovery"],
  ["4 days", "Median resolve time"],
];

/* ==================================================================== */
/*  SECTIONS                                                            */
/* ==================================================================== */

function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <nav className="nav">
      <div className="container container--wide">
        <div className="nav__inner">
          <a href="#top" aria-label="Amalgamic home"><Logo /></a>
          <div className="nav__links">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className={active === l.href.slice(1) ? "is-active" : ""}>
                {l.label}
              </a>
            ))}
          </div>
          <button className="btn btn--sm btn--primary nav__cta">Connect account</button>
          <button
            className="nav__toggle"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {open && (
          <div className="nav__mobile">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
            ))}
            <button className="btn btn--sm btn--primary" style={{ alignSelf: "flex-start" }}>Connect account</button>
          </div>
        )}
      </div>
    </nav>
  );
}

function Hero() {
  const { messages, typing, send } = useAssistant(HERO_SEED);
  const [cards, setCards] = useState({ hike: true, credit: true });

  const dismiss = (key, prompt, reply) => {
    setCards((c) => ({ ...c, [key]: false }));
    send(prompt, reply);
  };

  return (
    <header className="hero" id="top">
      <div className="container container--wide hero__grid">
        {/* ---- copy ---- */}
        <div>
          <span className="pill">For premium cardholders</span>
          <h1 className="h1 hero__title">The money you never got around to claiming.</h1>
          <p className="lead hero__sub">
            Every month you lose a little to things not worth your time: a subscription nobody cancelled, a fee that
            should have been waived, or a card credit that expired. Amalgamic handles the work of getting it back.
          </p>
          <button className="btn btn--lg btn--primary">Connect your accounts</button>
          <p className="hero__note">
            <Lock size={15} style={{ color: "var(--accent)" }} aria-hidden="true" />
            Read-only access. Takes about two minutes.
          </p>

          <div className="herostats">
            {HERO_STATS.map(([val, label]) => (
              <div className="herostat" key={label}>
                <div className="herostat__val">{val}</div>
                <div className="micro">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ---- live assistant ---- */}
        <div className="hero__visual">
          <div className="panel">
            <div className="panel__head">
              <span className="panel__avatar" aria-hidden="true"><Logo invert markOnly /></span>
              <span>
                <span className="panel__title">Assistant</span>
                <span className="panel__status">
                  <span className="panel__pulse" aria-hidden="true" />
                  {typing ? "Thinking" : "Analyzing statements"}
                </span>
              </span>
              <button className="panel__more" aria-label="Conversation options"><MoreVertical size={16} /></button>
            </div>

            <Thread messages={messages} typing={typing} />

            <div className="chips">
              {SUGGESTIONS.map((s) => (
                <button className="chip" key={s} onClick={() => send(s)} disabled={typing}>{s}</button>
              ))}
            </div>

            <Composer onSend={send} disabled={typing} />
          </div>

          {/* ---- floating cards ---- */}
          <div className={`floatcard floatcard--hike ${cards.hike ? "" : "is-out"}`} aria-hidden={!cards.hike}>
            <div className="floatcard__row">
              <span className="floatcard__icon" style={{ background: "#FFF7ED", color: "#EA580C" }}>
                <TrendingUp size={16} aria-hidden="true" />
              </span>
              <span>
                <span className="floatcard__label">Sub price hike</span>
                <span className="floatcard__meta" style={{ display: "block" }}>Netflix • +$3.50/mo</span>
              </span>
            </div>
            <button
              className="floatcard__action"
              tabIndex={cards.hike ? 0 : -1}
              onClick={() => dismiss("hike", "Cancel Netflix and save the difference.", "Done. Netflix Premium is cancelled effective 14 Oct — I sat through the retention offers. That's $275.88 back over a year.")}
            >
              Cancel &amp; Save
            </button>
          </div>

          <div className={`floatcard floatcard--credit ${cards.credit ? "" : "is-out"}`} aria-hidden={!cards.credit}>
            <div className="floatcard__head">
              <span className="floatcard__label">Expiring credit</span>
              <span className="badge-danger">11 days left</span>
            </div>
            <div className="floatcard__row">
              <span className="chip-card" style={{ background: "#2563EB" }} aria-hidden="true" />
              <span>
                <span className="floatcard__amt">$50.00 Saks Credit</span>
                <span className="floatcard__meta" style={{ display: "block" }}>Amex Platinum benefit</span>
              </span>
            </div>
            <button
              className="floatcard__action"
              tabIndex={cards.credit ? 0 : -1}
              onClick={() => dismiss("credit", "Claim my $50 Saks credit before it expires.", "Claimed. The $50.00 Saks credit is locked in and will post to your Platinum within two statements. Two more credits expire next month — want those too?")}
            >
              Claim credit
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

function CapabilityStrip() {
  return (
    <section className="section section--bordered" style={{ paddingTop: "4rem", paddingBottom: "4rem" }}>
      <div className="container">
        <div className="capstrip">
          {CAPABILITIES.map(({ Icon, label }) => (
            <div className="capstrip__item" key={label}>
              <span className="iconwell"><Icon size={19} aria-hidden="true" /></span>
              <span style={{ fontSize: ".9375rem", fontWeight: 600 }}>{label}</span>
            </div>
          ))}
        </div>
        <div className="trustrow">
          {TRUST.map((t, i) => (
            <span key={t} style={{ display: "contents" }}>
              {i > 0 && <span className="dot" aria-hidden="true" />}
              <span className="micro">{t}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyThisExists() {
  return (
    <section className="section section--dark" style={{ overflow: "hidden" }}>
      <div className="container split">
        <div>
          <span className="eyebrow">Why this exists</span>
          <h2 className="h2" style={{ marginBottom: "2rem" }}>Every one of these is too small to be worth your afternoon.</h2>
          <div className="stack body">
            <p>A streaming subscription you stopped watching in March. A late fee from the month you travelled. A $50 Saks credit on your Platinum card that expires in eleven days.</p>
            <p>Individually, each one is worth less than the hour it takes to fix, so the rational move is to ignore it. That's exactly why these amounts sit unclaimed, year after year, in the accounts of people who can afford to ignore them.</p>
            <p className="serif" style={{ color: "#fff", fontStyle: "italic", fontSize: "1.5rem" }}>Collectively, they are not small.</p>
          </div>
        </div>
        <div className="relative" style={{ display: "flex", justifyContent: "center" }}>
          <div className="floatgrid">
            {LOSSES.map((l) => (
              <div className="valuecard" key={l.label}>
                <span className="valuecard__amt">{l.amt}</span>
                <span className="valuecard__label">{l.label}</span>
              </div>
            ))}
          </div>
          <div className="glow" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="section" id="how-it-works">
      <div className="container">
        <div className="center" style={{ marginBottom: "6rem" }}>
          <span className="eyebrow">How it works</span>
          <h2 className="h2">Connect once. Decide when it matters.<br />That's the whole job.</h2>
        </div>
        <div className="cols-4">
          {STEPS.map((s) => (
            <div key={s.num}>
              <div className="step__num">{s.num}</div>
              <h3 className="h3" style={{ marginBottom: "1rem" }}>{s.title}</h3>
              <p className="body--sm">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Insights() {
  const [open, setOpen] = useState("late");
  const [resolved, setResolved] = useState({});

  return (
    <section className="section section--tint section--bordered" id="insights">
      <div className="container split">
        <div className="relative">
          <div className="glasscard">
            {INSIGHTS.map((n) => {
              const isOpen = open === n.id;
              const isDone = resolved[n.id];
              return (
                <div
                  className={`insightwrap ${isOpen ? "is-open" : ""} ${isDone ? "is-resolved" : ""} ${n.offset ? "insight--offset" : ""}`}
                  key={n.id}
                >
                  <button
                    className="insight"
                    onClick={() => setOpen(isOpen ? null : n.id)}
                    aria-expanded={isOpen}
                  >
                    <span className="insight__left">
                      <span className="insight__icon" style={{ background: n.bg, color: n.fg }}>
                        <n.Icon size={20} aria-hidden="true" />
                      </span>
                      <span>
                        <span className="insight__title">{n.title}</span>
                        <span className="insight__meta">{n.meta}</span>
                      </span>
                    </span>
                    <span className="insight__cta">
                      {isDone ? "Done" : isOpen ? "Close" : "Chat now"}
                      <ChevronDown size={14} aria-hidden="true" />
                    </span>
                  </button>
                  {isOpen && (
                    <div className="insight__panel">
                      <p className="insight__answer">{n.answer}</p>
                      {isDone ? (
                        <span className="btn--done" style={{ display: "inline-block" }}>{n.done}</span>
                      ) : (
                        <button
                          className="btn btn--sm btn--primary"
                          onClick={() => setResolved((r) => ({ ...r, [n.id]: true }))}
                        >
                          {n.action}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="order-first-mobile">
          <span className="eyebrow">Things to know</span>
          <h2 className="h2" style={{ marginBottom: "2rem" }}>The two or three things worth knowing this month.</h2>
          <p className="body" style={{ marginBottom: "2.5rem" }}>
            Most finance apps hand you a dashboard and leave the interpretation to you, which is the same as handing you
            homework. Amalgamic tells you only what changed, in language that doesn't need decoding.
          </p>
          <div className="cols-2" style={{ marginBottom: "2.5rem" }}>
            {INSIGHT_KINDS.map((k) => (
              <div className="stack-sm" key={k.title}>
                <h4 style={{ fontWeight: 700 }}>{k.title}</h4>
                <p style={{ fontSize: ".875rem", color: "var(--text-2)", lineHeight: 1.6 }}>{k.body}</p>
              </div>
            ))}
          </div>
          <p className="quotebox">
            Every insight opens into a conversation. You're never left holding a fact with nothing to do about it.
          </p>
        </div>
      </div>
    </section>
  );
}

function Assistant() {
  const [tab, setTab] = useState(0);
  const scenario = SCENARIOS[tab];
  const messages = useMemo(
    () => scenario.thread.map((m, i) => ({ ...m, id: `${tab}-${i}` })),
    [tab, scenario]
  );

  return (
    <section className="section" id="assistant">
      <div className="container split">
        <div>
          <span className="eyebrow">Ask anything about your money</span>
          <h2 className="h2" style={{ marginBottom: "2rem" }}>An assistant that has actually read your statements.</h2>
          <p className="body" style={{ marginBottom: "2.5rem" }}>
            Most AI assistants explain general concepts. This one can tell you what{" "}
            <em style={{ color: "var(--text-1)", fontWeight: 500 }}>yours</em> is costing you, because it's working from
            your accounts rather than from the internet.
          </p>
          <div className="stack" style={{ marginBottom: "3rem" }}>
            {ASSISTANT_POINTS.map((p) => (
              <div className="bullet" key={p.strong}>
                <span className="bullet__dot" aria-hidden="true"><i /></span>
                <p style={{ color: "var(--text-2)", lineHeight: 1.6 }}>
                  <strong style={{ color: "var(--text-1)" }}>{p.strong}</strong>{p.rest}
                </p>
              </div>
            ))}
          </div>
          <div className="softbox">
            <p className="eyebrow" style={{ marginBottom: "1rem" }}>Two boundaries</p>
            <p style={{ fontSize: ".8125rem", color: "var(--text-2)", lineHeight: 1.7 }}>
              It only works on your money. Ask it anything else and it will politely decline. And it never guesses: when
              it doesn't have the data, it says so rather than filling the gap.
            </p>
          </div>
        </div>

        <div>
          <div className="tabs" role="tablist" aria-label="Example conversations">
            {SCENARIOS.map((s, i) => (
              <button
                key={s.label}
                role="tab"
                aria-selected={tab === i}
                className={`tab ${tab === i ? "is-active" : ""}`}
                onClick={() => setTab(i)}
              >
                {s.label}
              </button>
            ))}
          </div>
          <div className="panel panel--short">
            <div className="panel__head">
              <span className="panel__avatar" aria-hidden="true"><Logo invert markOnly /></span>
              <span>
                <span className="panel__title">Assistant</span>
                <span className="panel__status">
                  <span className="panel__pulse" aria-hidden="true" />
                  {scenario.label}
                </span>
              </span>
            </div>
            <Thread messages={messages} typing={false} />
            <div className="composer" aria-hidden="true">
              <span style={{ flex: 1, fontSize: ".875rem", fontStyle: "italic", color: "rgba(245,242,234,.45)" }}>
                Ask anything about your money…
              </span>
              <span className="composer__send"><ArrowUp size={16} strokeWidth={2.5} /></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CardsAndBillPay() {
  const [paid, setPaid] = useState(false);
  const [selected, setSelected] = useState(null);

  const days = [
    { n: 28, out: true }, { n: 29, out: true }, { n: 30, out: true },
    { n: 1 }, { n: 2 },
    { n: 3, kind: "due", note: "Amex Platinum — paid, $1,240.00" },
    { n: 4 }, { n: 5 }, { n: 6 }, { n: 7 }, { n: 8 },
    { n: 9, kind: paid ? "due" : "late", note: paid ? "Chase Sapphire — settled" : "Chase Sapphire due — $2,810.44" },
    { n: 10 },
  ];

  return (
    <section className="section section--dark">
      <div className="container split">
        <div className="panel-outline">
          <div className="panel-outline__inner">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "1rem" }}>
              <h4 className="serif" style={{ fontSize: "1.5rem", color: "#fff" }}>Payment calendar</h4>
              <span className="micro" style={{ color: "rgba(245,242,234,.65)" }}>October 2024</span>
            </div>

            <div>
              <div className="cal">
                {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                  <div className="cal__dow" key={i}>{d}</div>
                ))}
                {days.map((d, i) => (
                  <button
                    key={i}
                    className={`cal__day ${d.out ? "cal__day--out" : ""} ${d.kind === "due" ? "cal__day--due" : ""} ${
                      d.kind === "late" ? "cal__day--late" : ""
                    } ${selected === i ? "is-selected" : ""}`}
                    onClick={() => setSelected(selected === i ? null : i)}
                    aria-label={`October ${d.n}${d.note ? `. ${d.note}` : ""}`}
                  >
                    {d.n}
                    {d.kind === "due" && <span className="cal__dot" style={{ background: "var(--highlight)" }} />}
                    {d.kind === "late" && <span className="cal__dot" style={{ background: "#F87171" }} />}
                  </button>
                ))}
              </div>
              <p className="cal__hint" style={{ marginTop: ".85rem" }}>
                {selected !== null && days[selected].note ? days[selected].note : "Select a date to see what's due."}
              </p>
            </div>

            <div className="stack-sm">
              <div className={`acctrow ${paid ? "acctrow--done" : ""}`}>
                <span style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <span className="chip-card" style={{ background: "#2563EB" }} aria-hidden="true" />
                  <span>
                    <span style={{ display: "block", fontSize: ".8125rem", fontWeight: 700 }}>Chase Sapphire</span>
                    <span style={{ fontSize: ".6875rem", color: "rgba(245,242,234,.65)" }}>
                      {paid ? "Paid Oct 9" : "Due Oct 9 • $2,810.44"}
                    </span>
                  </span>
                </span>
                {paid ? (
                  <span className="tag tag--settled">Settled</span>
                ) : (
                  <button className="tag" onClick={() => setPaid(true)}>Pay balance</button>
                )}
              </div>
              <div className="acctrow acctrow--done">
                <span style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <span className="chip-card" style={{ background: "transparent", border: "1px solid rgba(255,255,255,.25)" }} aria-hidden="true" />
                  <span>
                    <span style={{ display: "block", fontSize: ".8125rem", fontWeight: 700 }}>Amex Platinum</span>
                    <span style={{ fontSize: ".6875rem" }}>Paid Oct 3</span>
                  </span>
                </span>
                <span className="tag tag--settled">Settled</span>
              </div>
            </div>
          </div>
        </div>

        <div className="order-first-mobile">
          <span className="eyebrow">Cards and bill pay</span>
          <h2 className="h2" style={{ marginBottom: "2rem" }}>Every card, every balance, every due date. Then the payment.</h2>
          <p className="body" style={{ marginBottom: "2.5rem" }}>
            Connect your credit cards once and Amalgamic assembles the full picture: balances, limits, statement dates,
            and minimums. Because it reads bureau data alongside your bank feeds, it catches cards that transaction feeds
            alone tend to miss.
          </p>
          <div className="stack-lg">
            {CARD_POINTS.map((p) => (
              <div className="bullet" key={p.title}>
                <span className="check" aria-hidden="true"><Check size={14} strokeWidth={3} /></span>
                <div>
                  <h4 style={{ fontWeight: 700, color: "#fff", marginBottom: ".25rem" }}>{p.title}</h4>
                  <p style={{ fontSize: ".875rem", color: "rgba(245,242,234,.65)", lineHeight: 1.6 }}>{p.body}</p>
                </div>
              </div>
            ))}
          </div>
          <p style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,.12)", fontSize: ".8125rem", fontStyle: "italic", color: "rgba(245,242,234,.6)" }}>
            Payments go to your own card issuer, from your own account. Amalgamic cannot move money anywhere else.
          </p>
        </div>
      </div>
    </section>
  );
}

function Subscriptions() {
  const [cancelled, setCancelled] = useState({});

  const active = SUBS.filter((s) => !cancelled[s.id]);
  const total = active.reduce((sum, s) => sum + s.price, 0);
  const saved = SUBS.reduce((sum, s) => sum + (cancelled[s.id] ? s.price : 0), 0);

  const byCat = Object.keys(CAT_COLORS).map((cat) => {
    const amt = active.filter((s) => s.cat === cat).reduce((n, s) => n + s.price, 0);
    return { cat, amt, pct: total ? (amt / total) * 100 : 0 };
  });

  return (
    <section className="section">
      <div className="container split">
        <div>
          <span className="eyebrow">Subscriptions</span>
          <h2 className="h2" style={{ marginBottom: "2rem" }}>The ones you forgot are the expensive ones.</h2>
          <p className="body" style={{ marginBottom: "2rem" }}>
            Amalgamic detects every recurring charge across your cards. Cancel one and watch the monthly burn drop — we
            handle the retention flows for you.
          </p>

          <div className="sublist">
            {SUBS.map((s) => {
              const off = cancelled[s.id];
              return (
                <div className={`subrow ${off ? "is-cancelled" : ""}`} key={s.id}>
                  <span style={{ display: "flex", alignItems: "center", gap: ".85rem", minWidth: 0 }}>
                    <span className="subrow__mark" style={{ background: s.color }} aria-hidden="true">{s.mark}</span>
                    <span style={{ minWidth: 0 }}>
                      <span className="subrow__name">{s.name}</span>
                      <span className="subrow__price">{money(s.price)} / mo · {s.cat}</span>
                    </span>
                  </span>
                  {off ? (
                    <span className="btn--done">Cancelled</span>
                  ) : (
                    <button className="btn--danger" onClick={() => setCancelled((c) => ({ ...c, [s.id]: true }))}>
                      Cancel
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          <p style={{ marginTop: "1.5rem", fontSize: ".875rem", fontWeight: 500 }}>
            Works across every card, so a subscription billed to one you barely use doesn't hide.
          </p>
        </div>

        <div className="burncard">
          <div className="center">
            <span className="eyebrow" style={{ letterSpacing: ".2em", marginBottom: "1rem" }}>Monthly burn</span>
            <span className="burncard__amt" style={{ color: saved > 0 ? "var(--accent)" : "var(--text-1)" }}>
              {money(total)}
            </span>
            <p style={{ fontSize: ".75rem", color: "var(--text-2)", marginTop: "1rem" }}>
              {active.length} active across 5 connected cards
            </p>
            {saved > 0 && (
              <p className="saved" style={{ marginTop: ".75rem" }}>
                Saving {money(saved)}/mo · {money(saved * 12)} a year
              </p>
            )}
          </div>
          <div className="stack-sm">
            <div className="bar">
              {byCat.map((c) => (
                <span key={c.cat} style={{ width: `${c.pct}%`, background: CAT_COLORS[c.cat] }} />
              ))}
            </div>
            <div className="legend">
              {byCat.map((c) => (
                <span className="legend__item" key={c.cat}>
                  <span className="legend__swatch" style={{ background: CAT_COLORS[c.cat] }} aria-hidden="true" />
                  <span className="micro">{c.cat}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Delegated() {
  return (
    <section className="section section--tint">
      <div className="container split split--wide-gap">
        <div className="stack">
          <div className="flexcol" style={{ alignItems: "flex-end", gap: ".5rem" }}>
            <span className="micro" style={{ marginRight: "1rem" }}>You • 9:41 AM</span>
            <div style={{ background: "var(--text-1)", color: "var(--bg)", padding: "1.25rem", borderRadius: "24px 24px 4px 24px", fontSize: ".9375rem", lineHeight: 1.6, maxWidth: "90%", boxShadow: "var(--shadow-lg)" }}>
              Dispute the $200 baggage fee on my Amex. The flight was delayed six hours.
            </div>
          </div>
          <div className="flexcol" style={{ alignItems: "flex-start", gap: ".5rem" }}>
            <span className="micro" style={{ marginLeft: "1rem", color: "var(--accent)" }}>Amalgamic • 11:22 AM</span>
            <div style={{ background: "#fff", color: "var(--text-1)", padding: "1.25rem", border: "1px solid rgba(44,64,53,.2)", borderRadius: "24px 24px 24px 4px", fontSize: ".9375rem", lineHeight: 1.65, maxWidth: "95%", boxShadow: "var(--shadow-soft)" }}>
              <p style={{ fontWeight: 700, color: "var(--accent)", marginBottom: ".5rem" }}>Dispute filed with Amex.</p>
              Reference #AMX-992. Supporting claim drafted under DOT delay rules and submitted to the airline.
              Provisional credit of $200 applied to your account.
            </div>
          </div>
        </div>

        <div>
          <span className="eyebrow">Delegated tasks</span>
          <h2 className="h2" style={{ marginBottom: "2rem" }}>Say what you want to happen. We do the rest.</h2>
          <p className="body" style={{ marginBottom: "2.5rem" }}>
            Tell Amalgamic what needs sorting, in plain language, the way you'd tell an assistant. A duplicate charge to
            reverse. A baggage fee to dispute after a delay. A refund that never landed.
          </p>
          <div className="plainbox">
            <h4 style={{ fontWeight: 700, marginBottom: "1rem" }}>You'll hear from us when something is done.</h4>
            <p style={{ fontSize: ".875rem", color: "var(--text-2)", lineHeight: 1.7 }}>
              Amalgamic files it, follows it, and tells you when it's resolved. You don't have to chase bank
              representatives or sit on hold with airlines.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CardCredits() {
  const [claimed, setClaimed] = useState({});
  return (
    <section className="section">
      <div className="container">
        <div className="center" style={{ marginBottom: "3rem" }}>
          <span className="eyebrow">Card credits and offers</span>
          <h2 className="h2">You already paid for these.</h2>
        </div>
        <div className="cols-3">
          {CREDITS.map((c) => (
            <div className="card" key={c.id}>
              <span className="iconwell iconwell--square" style={{ background: c.bg, color: c.fg, marginBottom: "1.5rem" }}>
                <c.Icon size={24} aria-hidden="true" />
              </span>
              <h4 style={{ fontWeight: 700, fontSize: "1.25rem", marginBottom: "1rem" }}>{c.title}</h4>
              <p style={{ fontSize: ".875rem", color: "var(--text-2)", lineHeight: 1.7, marginBottom: "1.5rem", flex: 1 }}>{c.body}</p>
              {claimed[c.id] ? (
                <span className="btn--done" style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: ".4rem" }}>
                  <Check size={12} strokeWidth={3} /> {c.done}
                </span>
              ) : (
                <button
                  className="btn btn--sm btn--primary"
                  style={{ alignSelf: "flex-start" }}
                  onClick={() => setClaimed((s) => ({ ...s, [c.id]: true }))}
                >
                  {c.cta} <ArrowRight size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Security() {
  return (
    <section className="section section--dark" id="security">
      <div className="container split split--wide-gap split--top">
        <div>
          <span className="eyebrow">Security and privacy</span>
          <h2 className="h2" style={{ marginBottom: "2rem" }}>The short version, without the fine print.</h2>
          <a href="#security" style={{ color: "var(--highlight)", fontWeight: 700, borderBottom: "1px solid rgba(141,196,172,.4)", paddingBottom: ".25rem" }}>
            Read the full privacy policy →
          </a>
        </div>
        <div className="cols-2" style={{ gap: "3rem" }}>
          {SECURITY.map((s) => (
            <div key={s.title}>
              <h4 style={{ fontWeight: 700, color: "#fff", marginBottom: ".75rem" }}>{s.title}</h4>
              <p style={{ fontSize: ".875rem", color: "rgba(245,242,234,.7)", lineHeight: 1.7 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Proof() {
  const [sort, setSort] = useState({ key: "amount", asc: false });

  const rows = useMemo(() => {
    const copy = [...RECOVERIES];
    copy.sort((a, b) => {
      const av = a[sort.key];
      const bv = b[sort.key];
      const cmp = typeof av === "string" ? av.localeCompare(bv) : av - bv;
      return sort.asc ? cmp : -cmp;
    });
    return copy;
  }, [sort]);

  const toggle = (key) => setSort((s) => ({ key, asc: s.key === key ? !s.asc : true }));

  const Th = ({ label, sortKey, right }) => (
    <th scope="col">
      <button
        className={`th-btn ${right ? "th-btn--right" : ""} ${sort.key === sortKey ? "is-sorted" : ""} ${
          sort.key === sortKey && sort.asc ? "is-asc" : ""
        }`}
        onClick={() => toggle(sortKey)}
        aria-sort={sort.key === sortKey ? (sort.asc ? "ascending" : "descending") : "none"}
      >
        {label} <ChevronDown size={13} aria-hidden="true" />
      </button>
    </th>
  );

  return (
    <section className="section section--white">
      <div className="container container--narrow">
        <div className="center" style={{ marginBottom: "5rem" }}>
          <span className="eyebrow">What we've found so far</span>
          <h2 className="h2" style={{ marginBottom: "1.5rem" }}>We'd rather show you the work than the reviews.</h2>
          <p style={{ color: "var(--text-2)" }}>Real, anonymised recoveries updated weekly. Sort them however you like.</p>
        </div>

        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                <Th label="What it was" sortKey="what" />
                <Th label="Amount" sortKey="amount" />
                <Th label="Time to resolve" sortKey="days" right />
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.what}>
                  <td style={{ fontWeight: 500 }}>{r.what}</td>
                  <td className="cell--amt">{money(r.amount)}</td>
                  <td className="cell--right">{r.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="statgrid">
          {STATS.map(([val, label]) => (
            <div key={label}>
              <p className="statgrid__val">{val}</p>
              <p className="micro" style={{ marginTop: ".5rem" }}>{label}</p>
            </div>
          ))}
        </div>

        <p className="center" style={{ marginTop: "5rem", fontSize: ".75rem", fontStyle: "italic", color: "var(--text-2)" }}>
          Disputes are decided by your card issuer. Some of them fail.
        </p>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="section section--accent center" style={{ paddingTop: "10rem", paddingBottom: "10rem" }}>
      <div className="container container--tight">
        <h2 className="h2 h2--xl" style={{ color: "#fff", marginBottom: "2.5rem" }}>
          Stop managing the small stuff. Start ignoring it properly.
        </h2>
        <p className="lead" style={{ marginBottom: "3rem" }}>
          Connect your cards once. Amalgamic watches, tells you what matters, answers what you ask, and handles the admin
          from there.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", justifyContent: "center", marginBottom: "3rem" }}>
          <button className="btn btn--lg btn--light">Connect your accounts</button>
          <button className="btn btn--ghost">See how it compares</button>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", justifyContent: "center" }}>
          {["Read-only access", "Revoke any time", "No card required to start"].map((t) => (
            <span className="micro" key={t} style={{ color: "rgba(245,242,234,.7)" }}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const cols = [
    { title: "Product", links: ["Features", "Security", "Pricing"] },
    { title: "Legal", links: ["Privacy policy", "Terms of service", "Security policy"] },
  ];
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="stack">
            <Logo />
            <p style={{ fontSize: ".875rem", color: "var(--text-2)", lineHeight: 1.7, maxWidth: "24rem" }}>
              The premium assistant for cardholders who value their time as much as their bank accounts.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h5 className="micro" style={{ color: "var(--text-1)", marginBottom: "1.5rem" }}>{c.title}</h5>
              <ul style={{ fontSize: ".875rem", color: "var(--text-2)" }}>
                {c.links.map((l) => (
                  <li key={l} style={{ marginTop: ".75rem" }}><a href="#top">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer__bottom">
          <span className="micro">© 2024 Amalgamic Technologies Inc.</span>
          <div style={{ display: "flex", gap: "2rem" }}>
            <a className="micro" href="#top">Twitter</a>
            <a className="micro" href="#top">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ==================================================================== */

export default function App() {
  return (
    <div className="amg">
      <style>{CSS}</style>
      <Nav />
      <Hero />
      <CapabilityStrip />
      <WhyThisExists />
      <HowItWorks />
      <Insights />
      <Assistant />
      <CardsAndBillPay />
      <Subscriptions />
      <Delegated />
      <CardCredits />
      <Security />
      <Proof />
      <FinalCTA />
      <Footer />
    </div>
  );
}
