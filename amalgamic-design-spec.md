# Amalgamic — Design System & Content Spec

Complete reconstruction reference for the landing page.
Stack: single static HTML file + Tailwind CSS v3.4.17 (custom theme) + Google Fonts. No JS.

---

## 1. Design tokens

### Colour

Six named tokens do the entire page. There is no gradient anywhere except one blurred glow.

| Token | Hex | RGB | Role |
|---|---|---|---|
| `bg` | `#F5F2EA` | 245 242 234 | Page background. Warm bone/eggshell, not white. |
| `brand` | `#171613` | 23 22 19 | Primary text. Near-black with a brown bias — never pure `#000`. |
| `accent` | `#2C4035` | 44 64 53 | Deep forest green. Buttons, eyebrows, emphasis, dark CTA panel. |
| `highlight` | `#8DC4AC` | 141 196 172 | Pale sage/mint. **Only ever used on dark backgrounds.** |
| `muted` | `#6B6658` | 107 102 88 | Secondary text. Warm taupe-grey. |
| `surface` | `#FFFFFF` | 255 255 255 | Cards on light sections; also the "white text" token on dark ones. |
| `border` | `#E2DFD5` | 226 223 213 | Hairline rules and card borders. |

Utility colours appear only inside mock UI (fake product screenshots), never in page chrome:
`red-50/200/400/600`, `orange-50/600`, `blue-50/600/600`, `black`.

**The alpha discipline is the core of the look.** Almost nothing uses a second solid colour — it uses one of the six at low opacity:

- `accent/5` — tinted section backgrounds, icon wells, inline quote boxes
- `accent/10` — icon circles, progress track, calendar day fill
- `accent/20` — the blurred ambient glow
- `bg/40`, `bg/60`, `bg/70`, `bg/80` — text hierarchy *on dark* sections
- `white/5`, `white/10`, `white/20` — card fills and hairlines on dark sections
- `accent/10` as a *text* colour for the giant step numerals `01–04`

### Typography

Two families, loaded from Google Fonts:

```html
<link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

- **Lora** (`font-serif`) — every heading, every dollar figure, every stat. Weights 400–600, plus italic 400 for pull-quotes.
- **Plus Jakarta Sans** (`font-sans`) — body, labels, buttons, UI. Weights 300–700. Set as the Tailwind `sans` default so `html` inherits it.

The serif/sans split is strictly semantic: **Lora = statement, Jakarta = mechanics.** Money is always Lora. Never mix.

Type scale as used:

| Role | Classes | Computed |
|---|---|---|
| Hero H1 | `text-6xl md:text-[84px]` + `.hero-title` | 60px → 84px, `line-height: 1.05`, `letter-spacing: -0.02em` |
| Section H2 | `text-5xl leading-tight` | 48px / 1.25 |
| Final CTA H2 | `text-6xl leading-tight` | 60px / 1.25 |
| Card H3/H4 | `text-2xl` / `text-xl` / base bold | 24 / 20 / 16px |
| Hero sub | `text-xl md:text-2xl leading-relaxed` | 20 → 24px / 1.625 |
| Section body | `text-lg leading-relaxed` | 18px / 1.625 |
| Small body | `text-[15px] leading-relaxed` | 15px |
| Eyebrow | `text-xs font-bold uppercase tracking-widest` | 12px, `0.1em` |
| Micro-label | `text-[10px] font-bold uppercase tracking-widest` | 10px |
| Stat eyebrow | `text-xs uppercase tracking-[0.2em]` | 12px, `0.2em` |

The eyebrow is the page's most repeated device — it opens **every** section. `text-accent` on light, `text-highlight` on dark.

### Space & shape

- Section rhythm: `py-32` (128px) everywhere. Hero `pt-40 pb-24`. Final CTA `py-40`. Footer `py-20`.
- Gutters: `px-8` (32px).
- Containers: `max-w-[1440px]` nav · `max-w-[1200px]` most sections · `max-w-[1000px]` proof table · `max-w-[800px]` final CTA · `max-w-5xl` hero H1 · `max-w-3xl` hero sub.
- Two-column split: `grid lg:grid-cols-2 gap-20 items-center` (sometimes `gap-24`).
- Radius ladder — deliberately large and escalating with element size:
  `rounded-lg` 8 → `rounded-xl` 12 → `rounded-2xl` 16 → `rounded-3xl` 24 → `rounded-[32px]` → `rounded-[40px]` → `rounded-full` (all buttons and pills).
- Buttons are **always** `rounded-full`. Primary: `px-10 py-5 text-lg font-bold`. Nav: `px-6 py-2.5 text-sm font-semibold`.

### Custom CSS (the only non-Tailwind rules)

```css
body { background-color: #F5F2EA; color: #171613; scroll-behavior: smooth; }

.premium-shadow { box-shadow: 0 20px 40px -15px rgba(23, 22, 19, 0.08); }

.glass-card {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(226, 223, 213, 0.5);
}

.hero-title { line-height: 1.05; letter-spacing: -0.02em; }

.chat-bubble-user { border-radius: 20px 20px 4px 20px; }
.chat-bubble-ai   { border-radius: 20px 20px 20px 4px; }

@keyframes subtle-float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-8px); }
}
.animate-subtle-float { animation: subtle-float 5s ease-in-out infinite; }

/* scrollbars hidden globally */
* { -ms-overflow-style: none !important; scrollbar-width: none !important; }
*::-webkit-scrollbar { display: none !important; width: 0 !important; height: 0 !important; }
```

The asymmetric bubble radii (one corner collapsed to 4px) are the tail — a nice detail worth keeping.

### Motion

Deliberately near-zero. Only:
- `transition-colors` / `transition-all` / `transition-transform` at the Tailwind default 150ms.
- `hover:scale-[1.02]` on the hero button, `hover:scale-105` on the final CTA button.
- `group-hover:translate-x-1` on the "Chat now →" arrows.
- `animate-subtle-float` on one card cluster, 5s loop, 8px travel.

No scroll reveals, no parallax, no counters. The restraint reads as expensive.

### Depth

- `.premium-shadow` — the signature, very soft and warm-tinted.
- `shadow-xl shadow-accent/20` on the hero button (green-tinted glow).
- `shadow-2xl` on the phone/panel mocks.
- One ambient light: `absolute -inset-20 bg-accent/20 blur-[100px] -z-10` behind the floating cards.

---

## 2. Tailwind config

```js
// tailwind.config.js
module.exports = {
  content: ["./**/*.html"],
  theme: {
    extend: {
      colors: {
        bg:        "#F5F2EA",
        brand:     "#171613",
        accent:    "#2C4035",
        highlight: "#8DC4AC",
        muted:     "#6B6658",
        surface:   "#FFFFFF",
        border:    "#E2DFD5",
      },
      fontFamily: {
        sans:  ['"Plus Jakarta Sans"', "sans-serif"],
        serif: ["Lora", "serif"],
      },
    },
  },
};
```

`html` is set to `font-family: "Plus Jakarta Sans"`; `<body class="font-sans antialiased">`.

---

## 3. Section map

Fourteen blocks. The spine is an alternating light/dark rhythm — this is what carries the whole page, so preserve the order of backgrounds even if you change the content.

```
NAV            bg/80 + blur, fixed
01 HERO        bg          light
02 WHY         brand       DARK
03 HOW         bg          light
04 INSIGHTS    accent/5    tint      + border-y
05 ASSISTANT   bg          light
06 CARDS       brand       DARK
07 SUBS        bg          light
08 DELEGATE    accent/5    tint
09 CREDITS     bg          light
10 SECURITY    brand       DARK
11 PROOF       white       pure white (only place)
12 CTA         accent      GREEN
FOOTER         bg          light
```

Three dark `brand` slabs at positions 2, 6, 10 — roughly every fourth section. The green CTA at 12 is the only full-bleed accent, saved for the very end.

---

### NAV
`fixed top-0 z-50 bg-bg/80 backdrop-blur-md border-b border-border px-8 py-5`

Left: 32px `bg-accent rounded-lg` tile holding a 20px dollar-sign glyph stroked in `#F5F2EA` (`M12 2v20` + the S curve, stroke-width 2.5) · wordmark `text-xl font-bold tracking-tight font-serif`.
Centre (`hidden md:flex`, `gap-10 text-[15px] font-medium text-muted`): How it works · Insights · Assistant · Security.
Right: pill button, `bg-accent text-bg`, "Connect your accounts".

### 01 · HERO — centred stack
`pt-40 pb-24 px-8`, `max-w-[1200px]` centred column.

1. Pill eyebrow: `bg-accent/5 text-accent px-4 py-1.5 rounded-full` — **For premium cardholders**
2. H1 (`max-w-5xl`): *The money you never got around to claiming.*
3. Sub (`max-w-3xl`): *Every month you lose a little to things not worth your time: a subscription nobody cancelled, a fee that should have been waived, a card credit that expired unused. Amalgamic connects to your cards, tells you what's worth knowing, answers what you ask about it, and does the work of getting the money back.*
4. Primary button, then a lock icon + *Read-only access. Takes about two minutes. Revoke any time.*
5. **4-up feature strip**, `border-y border-border py-12`, each = 40px `bg-accent/5` circle icon over a `text-sm font-semibold` label: All your cards in one place · What's due and when · Assistant for statements · Claims handled for you
6. Trust row, `text-[11px] uppercase tracking-widest opacity-60`, separated by 4px dots: Plaid & Spinwheel · Read-only by default · 12,000+ US Institutions · Zero data selling

### 02 · WHY — dark, 2-col
Eyebrow **Why this exists** (highlight). H2: *Every one of these is too small to be worth your afternoon.*

Body (`text-bg/70`):
> A streaming subscription you stopped watching in March. A late fee from the month you travelled. A $50 Saks credit on your Platinum card that expires in eleven days.
>
> Individually, each one is worth less than the hour it takes to fix, so the rational move is to ignore it. That's exactly why these amounts sit unclaimed, year after year, in the accounts of people who can afford to ignore them.

Kicker, `font-serif italic text-2xl text-surface`: *Collectively, they are not small.*

Right: 2×2 grid of `bg-surface/5 border-white/10 rounded-2xl` cards, alternating cards pushed down `mt-10`, whole grid `animate-subtle-float`, `bg-accent/20 blur-[100px]` glow behind. Values in `text-3xl font-serif text-highlight`:
`$15.99` Streaming · `$39.00` Late Fee · `$50.00` Saks Credit · `$200.00` Baggage Claim

### 03 · HOW IT WORKS `#how-it-works`
Centred header, then `grid md:grid-cols-4 gap-12`.
H2: *Connect once. Decide when it matters.* `<br>` *That's the whole job.*

Each column: numeral in `text-5xl font-serif text-accent/10` (ghosted), `font-serif text-2xl` title, `text-muted text-[15px]` body.

1. **01 Connect your cards** — You link your credit cards through Plaid and Spinwheel. Amalgamic finds cards you may have forgotten you hold, along with their balances, limits and due dates.
2. **02 We tell you what changed** — Amalgamic reads statements continuously, and surfaces the few things that actually matter this month. Not a dashboard—a short list of what's different.
3. **03 Ask about any of it** — Every insight opens into a conversation. Ask why the statement is higher or what happens if you pay the minimum. It answers from your own accounts.
4. **04 Hand it over** — Cancel this, dispute that, claim this credit. One tap, and the tedious part after it is ours. Money goes back to your original account.

### 04 · INSIGHTS `#insights` — tint, 2-col, **mock left / copy right**
Mock uses `.glass-card p-8 rounded-3xl premium-shadow`, three `bg-surface rounded-2xl` rows with `border border-transparent hover:border-accent`. Middle row nudged `translate-x-4` — a deliberate stagger. Each row: coloured `rounded-xl` icon well, title + `Issuer • amount`, and `Chat now →` in `text-accent text-xs font-bold` with `group-hover:translate-x-1`.

- red · **Late Fee Detected** — Amex Gold • $35.00
- orange · **Subscription Price Hike** — Netflix • +$3.50 / mo
- blue · **Credit Utilization Alert** — Chase Sapphire • 42% level

Copy side — eyebrow **Things to know**. H2: *The two or three things worth knowing this month.*
Body: *Most finance apps hand you a dashboard and leave the interpretation to you, which is the same as handing you homework. Amalgamic tells you only what changed, in language that doesn't need decoding.*

2×2 sub-grid:
- **Fees you shouldn't have paid** — Late fees, FX fees, and annual fees flagged with dispute success probability.
- **Charges that moved** — Subscription price hikes or duplicate charges across any of your connected cards.
- **Credit health** — Utilization creeping toward score-affecting levels, simplified into clear actions.
- **Where the money went** — Your most frequent merchants vs largest ones—it's rarely the same list.

Closing quote box (`bg-accent/5 rounded-2xl italic text-accent border border-accent/10`): *"Every insight has a 'chat now' next to it. You're never left holding a fact with nothing to do about it."*

### 05 · ASSISTANT `#assistant` — light, copy left / chat mock right
Eyebrow **Ask anything about your money**. H2: *An assistant that has actually read your statements.*
Body: *Most AI assistants explain general concepts. This one can tell you what* **yours** *is costing you, because it's working from your accounts rather than from the internet.* ("yours" = `text-brand font-medium italic`.)

Three bullets, each a 24px `bg-accent/10` circle with an 8px `bg-accent` dot:
- **It reads your statements.** Attach a PDF and it parses the contents directly, even for accounts you haven't connected.
- **It audits on request.** Deep scans across every connected institution for hidden fees, duplicates or spikes.
- **It does the arithmetic.** Payoff timelines, minimum payment impact, and what an extra $200 actually changes.

Boundaries box (`bg-accent/5 rounded-3xl border border-accent/10`), label **Two Boundaries**: *It only works on your money. Ask it anything else and it will politely decline. And it never guesses: when it doesn't have the data, it says so rather than filling the gap.*

Chat mock: `bg-brand rounded-[40px] p-8 shadow-2xl h-[600px] flex flex-col`. Header = accent circle + **Amalgamic Assistant** + `text-[10px] text-highlight uppercase` "Active • Reading Statements". Scroll area `flex-1 overflow-y-auto`. Composer pinned bottom: `bg-white/5 rounded-full px-6 py-4` reading "Ask anything about your money..." with an accent send circle.

- User (`bg-white/10 text-white .chat-bubble-user max-w-[80%]`): Why is this month's statement higher than last month's?
- AI (`bg-accent text-bg .chat-bubble-ai max-w-[85%] shadow-lg`): Your total spending increased by $420. The main drivers are a $200 airline baggage fee (which I can dispute for you), and a $180 spike in dining compared to your 3-month average.
- User: If I only pay the minimum on this card, how long until it's clear and what does it cost me?
- AI: At your current APR, paying only the minimum will take 11 years to clear and cost you **$4,120 in interest** *(bold + underline + `text-surface`)*. If you add $150/mo, you're clear in 14 months.

### 06 · CARDS & BILL PAY — dark, calendar left / copy right
Calendar panel: `bg-surface/5 p-1 rounded-[40px] border border-white/10`, inner `p-8`. Header **Payment Calendar** + "October 2024". `grid-cols-7` day grid, `M T W T F S S`, leading greys at `text-bg/20`, normal days `text-bg/40`. Day 3 highlighted `border-accent/30 bg-accent/10` with an accent dot; day 9 `border-red-400/30 bg-red-400/5` with a red dot.

Two account rows below (`bg-surface/10 rounded-2xl`):
- blue chip · **Chase Sapphire** / Due Oct 9th · outline pill **PAY BALANCE** in highlight
- outlined chip · **Amex Platinum** / Paid Oct 3rd · **SETTLED**, whole row `opacity-40`

Copy — eyebrow **Cards and bill pay**. H2: *Every card, every balance, every due date. Then the payment.*
Body: *Connect your credit cards once and Amalgamic assembles the full picture: balances, limits, statement dates, and minimums. Because it reads bureau data alongside your bank feeds, it catches cards that transaction feeds alone tend to miss.*

Two checkmark items (24px `bg-highlight` circle, `text-brand` tick):
- **A calendar you can read in three seconds** — See exactly when payments are due and which will cost you interest if you only pay the minimum.
- **Pay from here** — Settle card bills in the app instead of logging into four issuer portals. If a connection needs re-authorising, you'll know early.

Footnote above a `border-t border-white/10`: *"Payments go to your own card issuer, from your own account. Amalgamic cannot move money anywhere else."*

### 07 · SUBSCRIPTIONS — light, copy left / stat card right
Eyebrow **Subscriptions**. H2: *The ones you forgot are the expensive ones.*
Body: *Amalgamic detects every recurring charge across your cards and shows what you're actually paying each month. For most services, cancelling is one tap and we handle the retention flows for you.*
Inline row: black `N` tile · **Netflix Premium** / $22.99 / mo · red outline button **CANCEL SERVICE**.
Under it: *Works across every card, so a subscription billed to one you barely use doesn't hide.*

Right card `bg-surface p-12 rounded-[40px] border border-border shadow-2xl`: eyebrow **Monthly Burn** (`tracking-[0.2em]`), `text-6xl font-serif` **$412.40**, caption "Detected across 5 connected cards". Below, a single 8px `rounded-full` segmented bar — accent 45% / highlight 30% / brand 25% — with a 3-up legend: Entertainment · SaaS / Tools · Health.

### 08 · DELEGATED TASKS — tint, chat left / copy right
Timestamped bubbles, no avatars:
- `You • 9:41 AM` (right-aligned, `bg-brand text-bg rounded-3xl .chat-bubble-user`): Dispute the $200 baggage fee on my Amex. The flight was delayed six hours.
- `Amalgamic • 11:22 AM` (left, `bg-surface border-accent/20 .chat-bubble-ai shadow-xl`): **Dispute filed with Amex.** Reference #AMX-992. Supporting claim drafted under DOT delay rules and submitted to the airline. Provisional credit of $200 applied to your account.

The two-hour gap between timestamps is the point — it shows elapsed work.

Copy — eyebrow **Delegated tasks**. H2: *Say what you want to happen. We do the rest.*
Body: *Tell Amalgamic what needs sorting, in plain language, the way you'd tell an assistant. A duplicate charge to reverse. A baggage fee to dispute after a delay. A refund that never landed.*
Card: **You'll hear from us when something is done.** — Amalgamic files it, follows it, and tells you when it's resolved. You don't have to chase bank representatives or sit on hold with airlines.

### 09 · CARD CREDITS — light, centred, 3-up
Eyebrow **Card credits and offers**. H2 centred: *You already paid for these.*
Cards: `p-8 bg-surface rounded-[32px] border border-border hover:border-accent`, 48px `rounded-2xl` icon well.
- clock, accent well — **Merchant Offers** — Automatically activate merchant offers across all your cards. Never forget to "add to card" again.
- alert, red well — **Expiring Soon** — Credits ranked by what expires soonest, not by what's largest. Use it before the bank keeps it.
- check-circle, highlight well — **Travel Protections** — Detect delay-based insurance eligibility in your data and file the claim instantly.

### 10 · SECURITY `#security` — dark, `items-start`
Eyebrow **Security and privacy**. H2: *The short version, without the fine print.* Link: *Read the full privacy policy →* (`text-highlight border-b border-highlight/30`).
2×2 grid:
- **No credentials stored** — Connections run through Plaid. Credentials never touch our servers.
- **Restricted Access** — Read-only by default. We cannot move funds to third parties.
- **No Data Selling** — We don't sell your data to brokers or train AI models on it.
- **Full Deletion** — Leave anytime. Account deletion triggers a real purge of all data.

### 11 · PROOF — `bg-white`, `max-w-[1000px]`
Eyebrow **What we've found so far**. H2: *We'd rather show you the work than the reviews.* Sub: *Real, anonymized recoveries updated weekly.*

Table in `border border-border rounded-3xl overflow-hidden premium-shadow`. Header row `bg-accent/5`, cells `px-8 py-5 text-xs uppercase tracking-widest text-muted`. Body `divide-y divide-border`, rows `hover:bg-accent/5`. **Amount column is `font-serif text-xl font-bold text-accent`** — the money is always serif.

| What it was | Amount | Time to resolve |
|---|---|---|
| Subscription active 14 months after cancellation | $312.00 | 3 days |
| Late fee, first in 24 months | $45.00 | Same day |
| Airline fee disputed after delay | $200.00 | 11 days |
| Statement credit claimed before expiry | $50.00 | Same day |
| Duplicate charge, same merchant, same day | $89.00 | 6 days |

3-up stats: **$1.2M+** Recovered to date · **$142** Median recovery · **4 days** Median resolve time.
Closing disclaimer: *"Disputes are decided by your card issuer. Some of them fail."*

### 12 · FINAL CTA — `py-40 bg-accent text-bg text-center`, `max-w-[800px]`
H2 `text-6xl`: *Stop managing the small stuff. Start ignoring it properly.*
Sub: *Connect your cards once. Amalgamic watches, tells you what matters, answers what you ask, and handles the admin from there.*
Buttons: solid `bg-surface text-accent` **Connect your accounts** · ghost `border-surface/20` **See how it compares**.
Micro row: Read-only access • Revoke any time • No card required to start

### FOOTER
`py-20 bg-bg border-t border-border`, `grid md:grid-cols-4`. Brand block spans 2: logo + *The premium assistant for cardholders who value their time as much as their bank accounts.*
**Product**: Features · Security · Pricing. **Legal**: Privacy Policy · Terms of Service · Security Policy.
Bottom bar above `border-t`: © 2024 Amalgamic Technologies Inc. · Twitter · LinkedIn.

---

## 4. Rules that make it feel like this

1. **Never pure white or pure black.** `#F5F2EA` and `#171613`. This single choice does most of the "premium" work.
2. **Money is always Lora.** Every dollar amount, every stat, every heading. Sans for everything operational.
3. **The eyebrow opens every section.** `text-xs font-bold uppercase tracking-widest` — accent on light, highlight on dark. Skipping it breaks the rhythm instantly.
4. **`highlight` only on dark.** `#8DC4AC` on `#F5F2EA` fails contrast and looks washed. It exists to be the one bright thing in the dark slabs.
5. **Alternate light and dark.** Three `bg-brand` slabs plus one green CTA, spaced roughly every four sections.
6. **Product mocks instead of screenshots.** Every proof point is a hand-built HTML fragment — chat panel, calendar, insight list, burn card. Cheap, sharp at any DPI, and always on-brand.
7. **Copy does the persuading.** Long, specific, plain sentences with real numbers ($312.00, 11 days, #AMX-992). No exclamation marks, no "revolutionary". Objections are answered in the body text rather than in a FAQ.
8. **The page admits limits.** "Some of them fail." "It never guesses." That candour is the brand voice — keep it if you keep anything.
9. **Generous radii, generous space.** `py-32` between sections, 24–40px radii, `leading-relaxed` body. Nothing is tight.
10. **Motion is almost absent.** One float loop, hover states, nothing else.

---

## 5. Accessibility gaps to fix on rebuild

The original is a design mock; a production build should address:

- Contrast: `text-bg/40` and `opacity-40` text on dark, and `text-muted` (`#6B6658`) on `accent/5`, fall below 4.5:1. Lift to `/60` minimum.
- Hidden scrollbars are set globally with `!important` — restore them for keyboard and low-vision users, or at least scope the rule to the chat mock.
- No `prefers-reduced-motion` guard on `animate-subtle-float`.
- No visible `:focus-visible` styles anywhere.
- Mobile nav has no menu — links simply vanish below `md`.
- Decorative SVGs need `aria-hidden="true"`; the mock panels should be `aria-hidden` or labelled as illustrations.
- Icon-well colour is the only signal distinguishing insight severity — add text labels.
