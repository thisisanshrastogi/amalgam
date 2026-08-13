import React, { useState, useEffect } from "react";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";

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
  
  --font-sans: 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif;
  --font-serif: 'Lora', Georgia, 'Times New Roman', serif;

  background: var(--bg);
  color: var(--text-1);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.amg *, .amg *::before, .amg *::after { box-sizing: border-box; }
.amg p, .amg h1, .amg h2, .amg h3, .amg ul, .amg li { margin: 0; padding: 0; }
.amg a { color: inherit; text-decoration: none; }
.amg button { font: inherit; cursor: pointer; border: 0; background: none; color: inherit; }
.amg :focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; border-radius: 6px; }

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

/* ---------------- layout & type ---------------- */
.container { max-width: 1200px; margin: 0 auto; width: 100%; padding: 0 2rem; }
.container--wide { max-width: 1320px; }
.container--tight { max-width: 800px; }
.section { padding: 6rem 0; }

.h1 {
  font-family: var(--font-serif); font-weight: 500;
  font-size: clamp(2.75rem, 5vw, 4.5rem); line-height: 1.1; letter-spacing: -0.02em;
}
.h2 {
  font-family: var(--font-serif); font-weight: 500;
  font-size: clamp(2rem, 3.5vw, 2.5rem); line-height: 1.2; letter-spacing: -0.015em;
}
.lead { font-size: 1.125rem; line-height: 1.65; color: var(--text-2); }
.micro {
  font-size: 0.625rem; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.12em; color: var(--text-2);
}

/* ---------------- buttons ---------------- */
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
  border-radius: 14px; font-weight: 700;
  transition: transform .18s ease, background-color .18s ease;
}
.btn--sm { padding: 0.75rem 1.35rem; font-size: 0.875rem; font-weight: 600; border-radius: 11px; }
.btn--lg { padding: 1.35rem 2.4rem; font-size: 1.0625rem; border-radius: 18px; }
.btn--primary { background: var(--accent); color: var(--bg); }
.btn--primary:hover { background: var(--text-1); transform: translateY(-1px); }

/* ---------------- nav ---------------- */
.nav {
  position: sticky; top: 0; z-index: 60;
  background: rgba(245, 242, 234, 0.84);
  backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--border); padding: 1.1rem 0;
}
.nav__inner { display: flex; align-items: center; justify-content: space-between; gap: 2rem; }
.nav__links { display: flex; align-items: center; gap: 2.5rem; font-size: 0.9375rem; font-weight: 500; color: var(--text-2); }
.nav__links a:hover { color: var(--accent); }
.nav__links a.is-active { color: var(--text-1); }
.nav__toggle { display: none; padding: 0.5rem; color: var(--text-1); }
.nav__mobile { display: none; }

/* ---------------- faq specific ---------------- */
.faq-hero { padding: 6rem 0 4rem; text-align: left; }
.faq-list { margin-top: 2rem; border-top: 1px solid var(--border); }
.faq-item { border-bottom: 1px solid var(--border); }
.faq-btn {
  width: 100%; display: flex; justify-content: space-between; align-items: center; gap: 2rem;
  padding: 2rem 0; font-family: var(--font-serif); font-size: 1.25rem; font-weight: 500;
  text-align: left; color: var(--text-1); transition: color .18s ease;
}
.faq-btn:hover { color: var(--accent); }
.faq-icon { flex-shrink: 0; color: var(--accent); transition: transform .3s ease; }
.faq-item.is-open .faq-icon { transform: rotate(180deg); }
.faq-content {
  padding-bottom: 2.5rem; color: var(--text-2); font-size: 1.0625rem;
  line-height: 1.7; animation: rise .25s ease both; max-width: 70ch;
}
.faq-content a { color: var(--accent); font-weight: 600; border-bottom: 1px solid rgba(44,64,53,.3); padding-bottom: 1px; transition: border-color .18s ease; }
.faq-content a:hover { border-color: var(--accent); }

/* ---------------- cta block ---------------- */
.cta-block {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 32px; padding: 4rem; margin: 4rem 0;
  text-align: left; display: flex; flex-direction: column; gap: 1.5rem;
}

/* ---------------- footer ---------------- */
.footer { padding: 4rem 0; margin-top: auto; border-top: 1px solid var(--border); }
.footer__grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 3rem; }
.footer__bottom { margin-top: 4rem; padding-top: 2.5rem; border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap; }
.footer a:hover { color: var(--accent); }

@keyframes rise { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }

/* ---------------- responsive ---------------- */
@media (max-width: 767px) {
  .nav__links, .nav__cta { display: none; }
  .nav__toggle { display: block; }
  .nav__mobile { display: flex; flex-direction: column; gap: 1.25rem; padding: 1.5rem 0 0.5rem; font-size: 1rem; font-weight: 500; }
  .faq-hero { padding: 4rem 0 2rem; }
  .faq-btn { font-size: 1.125rem; padding: 1.5rem 0; }
  .faq-content { font-size: 1rem; padding-bottom: 1.5rem; }
  .cta-block { padding: 2.5rem 1.5rem; border-radius: 24px; }
  .footer__grid { grid-template-columns: 1fr; }
  .footer__bottom { flex-direction: column; align-items: flex-start; }
}
`;

/* ==================================================================== */
/*  DATA                                                                */
/* ==================================================================== */

const FAQS = [
    {
        id: "q1",
        q: "Can Amalgamic move money out of my accounts?",
        a: "Only to your own card issuer, and only when you tell it to. Access is otherwise read-only. We can cancel subscriptions, file disputes and claim credits on your behalf, and pay a card bill from an account you nominate. We cannot send funds anywhere else, including to us."
    },
    {
        id: "q2",
        q: "Do you see my bank password?",
        a: "No. Connections go through Plaid and Spinwheel. At most banks you sign in on your bank's own page and we receive a read token, not a credential."
    },
    {
        id: "q3",
        q: "What happens to my data if I leave?",
        a: "Deleting your account revokes connections at Plaid and Spinwheel and purges your records. A real backend process, not a toggle that hides data while keeping it. Details in the privacy policy."
    },
    {
        id: "q4",
        q: "Do you sell my data or train AI on it?",
        a: "No, and no."
    },
    {
        id: "q5",
        q: "Does connecting affect my credit score?",
        a: "No. Reading your credit profile through Spinwheel is a soft inquiry."
    },
    {
        id: "q6",
        q: "What if it doesn't find anything?",
        a: "Then it cost you two minutes and you know your accounts are clean. We'd rather say that than manufacture a result."
    },
    {
        id: "q7",
        q: "What can the assistant see?",
        a: "Your connected accounts, transactions, statements, and anything you've told it. It answers from that, cites external sources when it looks something up, and says so when it doesn't have the data rather than guessing. Scoped to your account only."
    },
    {
        id: "q8",
        q: "How does cancelling actually work?",
        a: "For supported merchants we complete the cancellation flow on your behalf and confirm when it's done, including the retention steps designed to slow you down. For merchants we don't support yet, you get a direct link to the correct page and what you'll need ready. Coverage grows most weeks."
    },
    {
        id: "q9",
        q: "Can I pay my credit card bills through Amalgamic?",
        a: "Yes. Balances, minimums and due dates for every connected card on one calendar, payable from the app. If a connection needs re-authorising first, we tell you before the due date."
    },
    {
        id: "q10",
        q: "What if a dispute fails?",
        a: "Sometimes they do. Disputes are decided by your issuer, not us. When one is declined we tell you why and, if there's a reasonable second route, what it is. We don't quietly close them."
    },
    {
        id: "q11",
        q: "Which banks and cards do you support?",
        a: "More than 12,000 US institutions through Plaid and Spinwheel: national banks, regionals, credit unions and brokerages. Full picture on the supported banks page."
    },
    {
        id: "q12",
        q: "Is there a free trial?",
        a: "14 days. At the end of the trial, your chosen subscription plan begins unless cancelled. A card is required to start your free trial."
    },
    {
        id: "q13",
        q: "Do you take a percentage of what you recover?",
        a: "No. Flat subscription. Everything recovered is yours."
    },
    {
        id: "q14",
        q: "Who is this not for?",
        a: "People who already track their own credits and file their own disputes, and people who don't hold annual-fee cards. More on the why Amalgamic page."
    }
];

const NAV_LINKS = [
    { href: "/product", label: "Product" },
    { href: "/why-amalgamic", label: "Why Amalgamic" },
    { href: "/about", label: "About" },
    { href: "/resources", label: "Resources", isActive: true },
];

/* ==================================================================== */
/*  COMPONENTS                                                          */
/* ==================================================================== */

function Logo() {
    return (
        <a href="/" className="logo">
            <span className="logo-mark" aria-hidden="true" />
            Amalgamic
        </a>
    );
}

function Nav() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="nav">
            <div className="container container--wide nav__inner">
                <Logo />
                <div className="nav__links">
                    {NAV_LINKS.map((l) => (
                        <a key={l.href} href={l.href} className={l.isActive ? "is-active" : ""}>
                            {l.label}
                        </a>
                    ))}
                </div>
                <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }} className="nav__cta">
                    <a href="/login" style={{ fontSize: "0.9375rem", fontWeight: 600 }}>Sign in</a>
                    <button className="btn btn--sm btn--primary">See what you're owed</button>
                </div>
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
                <div className="container">
                    <div className="nav__mobile">
                        {NAV_LINKS.map((l) => (
                            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
                        ))}
                        <a href="/login">Sign in</a>
                        <button className="btn btn--sm btn--primary" style={{ alignSelf: "flex-start", marginTop: "0.5rem" }}>
                            See what you're owed
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}

function FAQAccordion() {
    const [openId, setOpenId] = useState(null);

    const toggle = (id) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className="faq-list">
            {FAQS.map((faq) => {
                const isOpen = openId === faq.id;
                return (
                    <div key={faq.id} className={`faq-item ${isOpen ? "is-open" : ""}`}>
                        <button
                            className="faq-btn"
                            onClick={() => toggle(faq.id)}
                            aria-expanded={isOpen}
                        >
                            {faq.q}
                            <ChevronDown className="faq-icon" size={24} strokeWidth={2.5} aria-hidden="true" />
                        </button>
                        {isOpen && (
                            <div className="faq-content">
                                <p>{faq.a}</p>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

function Footer() {
    return (
        <footer className="footer">
            <div className="container container--wide">
                <div className="footer__grid">
                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <Logo />
                        <p style={{ fontSize: ".875rem", color: "var(--text-2)", lineHeight: 1.7, maxWidth: "24rem" }}>
                            The premium assistant for cardholders who value their time as much as their bank accounts.
                        </p>
                    </div>
                    <div>
                        <h5 className="micro" style={{ color: "var(--text-1)", marginBottom: "1.5rem" }}>Resources</h5>
                        <ul style={{ fontSize: ".875rem", color: "var(--text-2)" }}>
                            {["FAQ", "Card benefits calculator", "Supported banks"].map((l) => (
                                <li key={l} style={{ marginTop: ".75rem" }}><a href={`/${l.toLowerCase().replace(/ /g, '-')}`}>{l}</a></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h5 className="micro" style={{ color: "var(--text-1)", marginBottom: "1.5rem" }}>Company</h5>
                        <ul style={{ fontSize: ".875rem", color: "var(--text-2)" }}>
                            {["About", "Contact", "Privacy policy", "Terms"].map((l) => (
                                <li key={l} style={{ marginTop: ".75rem" }}><a href={`/${l.toLowerCase()}`}>{l}</a></li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="footer__bottom">
                    <span className="micro">
                        © 2026 Amalgamic. United States. <br />
                        Amalgamic is a financial technology company, not a bank. Account connections are provided by Plaid and Spinwheel.
                    </span>
                    <div style={{ display: "flex", gap: "2rem" }}>
                        <a className="micro" href="#linkedin">LinkedIn</a>
                        <a className="micro" href="#x">X</a>
                        <a className="micro" href="mailto:hello@amalgamic.io">hello@amalgamic.io</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default function FAQPage() {
    return (
        <div className="amg">
            <style dangerouslySetInnerHTML={{ __html: CSS }} />
            <Nav />

            <main className="container container--tight" id="main-content">
                <header className="faq-hero">
                    <h1 className="h1">Questions people actually ask</h1>
                </header>

                <FAQAccordion />

                <div className="cta-block">
                    <div>
                        <h2 className="h2" style={{ marginBottom: "0.5rem" }}>Still have questions?</h2>
                        <p className="lead">The fastest way to find out if it works for you is to let it scan your last twelve months.</p>
                    </div>
                    <div>
                        <button className="btn btn--lg btn--primary">See what you're owed</button>
                        <div style={{ marginTop: "1rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                            <span className="micro">Read-only access</span>
                            <span className="micro">Revoke any time</span>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}