import DocLayout, { DocSection, DocList, DocCTA } from '../components/DocLayout';

export default function About() {
  const groups = [
    {
      title: "The company",
      links: [
        { id: "what", num: "01", label: "What we do" },
        { id: "who", num: "02", label: "Who it's for" }
      ]
    },
    {
      title: "How we work",
      links: [
        { id: "approach", num: "03", label: "Operating principles" },
        { id: "stack", num: "04", label: "How we connect" }
      ]
    },
    {
      title: "Next",
      links: [
        { id: "reach", num: "05", label: "Get in touch" }
      ]
    }
  ];

  return (
    <DocLayout
      groups={groups}
      headerProps={{
        category: "Company / About",
        title: "About",
        lead: "For high earners who build wealth, not track pennies. We execute the tedious financial admin in the shadows, so you don't have to."
      }}
    >
      <DocSection id="what" num="§01" title="What we do">
        <p>Premium cardholders leave money behind constantly. A subscription nobody cancelled. A late fee that should have been waived. A statement credit that expired unclaimed. Each one is too small to be worth an afternoon on the phone, and collectively they are worth a great deal.</p>
        <p>Amalgamic connects to your accounts, finds those amounts, and recovers them — cancelling, disputing and claiming on your behalf. You approve the objective; we handle the admin.</p>
      </DocSection>

      <DocSection id="who" num="§02" title="Who it's for">
        <p>People whose time is worth more than the amounts being chased. If an hour of your attention is worth more than the $45 late fee, the rational move is to ignore it — which is exactly why these amounts go unclaimed, and exactly the gap Amalgamic exists to close.</p>

        <DocList
          marker={true}
          items={[
            { title: "You carry premium cards", body: "Annual-fee cards come with credits, offers and protections that mostly go unused because tracking them is a job." },
            { title: "You delegate by default", body: "You would rather state an objective once than manage a process. Text what you want; we execute it." },
            { title: "You enjoy the optimising", body: "If you already track every credit and file your own disputes, you are doing what we do — and you are probably doing it well.", muted: true }
          ]}
        />
      </DocSection>

      <DocSection id="approach" num="§03" title="Operating principles">
        <DocList
          items={[
            { title: "Read-only by default", body: "We never receive your bank login, and we cannot move money between accounts. Access is granted through Plaid or Spinwheel and is revocable at either end." },
            { title: "Quiet by design", body: "The work happens in the background. You should hear from us when something has been recovered, not while it is being chased." },
            { title: "Your data stays yours", body: <>We never sell your financial data, and we never train AI models on it. Full detail in the <a href="/privacy">privacy policy</a>.</> },
            { title: "Recoveries are yours", body: "Money we find belongs to you. It goes back to the account it came from, not to a balance you have to withdraw." }
          ]}
        />
      </DocSection>

      <DocSection id="stack" num="§04" title="How we connect">
        <p>We do not integrate with banks one at a time. Two regulated data providers do that work, which is why coverage reaches more than 12,000 US institutions rather than a handful of national names.</p>

        <DocList
          items={[
            { title: "Plaid", body: "Transaction and balance data across national banks, regionals, credit unions and brokerages. Larger institutions use OAuth, so you log in on your bank's own page." },
            { title: "Spinwheel", body: "Liability and debt accounts — loans, lines of credit and balances that transaction feeds alone tend to miss." }
          ]}
        />
        <p>The full picture is on the <a href="/supported-banks">supported banks</a> page.</p>
      </DocSection>

      <DocSection id="reach" num="§05" title="Get in touch">
        <p>Questions about the product, the company, or anything else — the <a href="/contact">contact page</a> has the right address for each.</p>
      </DocSection>

      <DocCTA />

    </DocLayout>
  );
}
