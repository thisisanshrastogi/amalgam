import React from 'react';
import DocLayout, { DocSection } from '../components/DocLayout';

export default function Privacy() {
  const groups = [
    {
      title: "Overview",
      links: [
        { id: "summary", num: "01", label: "The short version" },
        { id: "coverage", num: "02", label: "What this policy covers" }
      ]
    },
    {
      title: "What we collect",
      links: [
        { id: "categories", num: "03", label: "Data we collect" },
        { id: "sources", num: "04", label: "Where it comes from" }
      ]
    },
    {
      title: "How we use it",
      links: [
        { id: "purposes", num: "05", label: "Why we collect it" },
        { id: "disclosure", num: "06", label: "Who we disclose it to" },
        { id: "ai", num: "07", label: "How we use AI" },
        { id: "cookies", num: "08", label: "Cookies" },
        { id: "ads", num: "09", label: "Interest-based ads" },
        { id: "security", num: "10", label: "Security and retention" },
        { id: "children", num: "11", label: "Children's data" }
      ]
    },
    {
      title: "Your rights",
      links: [
        { id: "california", num: "12", label: "California resident rights" },
        { id: "sensitive", num: "13", label: "Limiting sensitive data use" },
        { id: "nondiscrimination", num: "14", label: "No discrimination" },
        { id: "incentives", num: "15", label: "Referral and reward programs" },
        { id: "exercise", num: "16", label: "How to exercise your rights" },
        { id: "states", num: "17", label: "Other state privacy rights" }
      ]
    },
    {
      title: "Admin",
      links: [
        { id: "changes", num: "18", label: "Changes to this policy" },
        { id: "contact", num: "19", label: "Contact us" }
      ]
    }
  ];

  return (
    <DocLayout
      groups={groups}
      headerProps={{
        category: "Legal / Privacy",
        title: "Privacy Policy",
        lead: "We connect to your financial accounts to find money that already belongs to you. That takes data. This page sets out exactly what we take, why we take it, who else sees it, and how you get it back or delete it.",
        meta: [
          { label: "Effective", value: "28 April 2025" },
          { label: "Privacy contact", value: "lizann@amalgamic.io" }
        ]
      }}
    >
      <DocSection id="summary" num="§01" title="The short version">
        <p>Privacy policies are not fun to read. Our goal at Amalgamic is to make managing money less complicated, and doing that means collecting certain information about you. We aim to collect only what we need in order to serve you.</p>
        <div className="bg-surface border border-ink/20 rounded-2xl p-6 my-6 shadow-sm">
          <span className="text-[10px] uppercase tracking-widest text-muted font-bold block mb-2">Commitment</span>
          <p className="text-xl font-bold text-ink mb-2">We will never sell your financial data.</p>
          <p className="text-sm">You will see the words "selling" and "sharing" below. Certain privacy laws define those terms very broadly, and we use them only as they relate to advertising cookies on our website. No money changes hands, and your financial data is never part of it.</p>
        </div>
        <p>By using or accessing our services in any way, you accept the practices described here and consent to us collecting, using and sharing your information as set out below. Terms used here without definition carry the meaning given in our Terms of Use.</p>
        <p>If you have a disability and need this policy in an alternative format, email <a href="mailto:lizann@amalgamic.io">lizann@amalgamic.io</a>.</p>
      </DocSection>

      <DocSection id="coverage" num="§02" title="What this policy covers">
        <p>This policy covers how we treat personal data gathered when you access or use our services. Personal data means any information that identifies or relates to a particular individual, including what data privacy laws call personally identifiable information or personal information.</p>
        <p>It does not cover the practices of companies we do not own or control, or people we do not manage.</p>
      </DocSection>

      <DocSection id="categories" num="§03" title="Data we collect">
        <p>Every category of personal data we have collected in the past 12 months, what it is for, and which categories of third party receive it.</p>
        
        <div className="bg-surface border border-border rounded-2xl overflow-hidden my-6 shadow-sm">
          <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-black/5">
            <span className="text-xs uppercase tracking-widest font-bold text-muted">Data ledger • past 12 months</span>
            <span className="text-xs font-bold text-muted">10 records</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[700px]">
              <thead>
                <tr className="bg-white/50 text-[10px] uppercase tracking-widest text-muted border-b border-border">
                  <th className="px-5 py-3 font-bold">Rec</th>
                  <th className="px-5 py-3 font-bold">Category</th>
                  <th className="px-5 py-3 font-bold">Purpose</th>
                  <th className="px-5 py-3 font-bold">Shared with</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-sm">
                <tr className="hover:bg-black/[0.02] transition-colors">
                  <td className="px-5 py-4 font-mono text-[11px] text-muted">REC-01</td>
                  <td className="px-5 py-4"><span className="block font-bold text-ink mb-1">Profile and contact data</span><span className="text-xs text-muted">First and last name, email address, login information.</span></td>
                  <td className="px-5 py-4 text-xs"><div className="flex flex-wrap gap-1"><span className="bg-black/5 px-2 py-0.5 rounded">Provide service</span><span className="bg-black/5 px-2 py-0.5 rounded">Improve service</span><span className="bg-black/5 px-2 py-0.5 rounded">Marketing</span></div></td>
                  <td className="px-5 py-4 text-xs"><div className="flex flex-wrap gap-1"><span className="bg-black/5 px-2 py-0.5 rounded">Service providers</span></div></td>
                </tr>
                <tr className="hover:bg-black/[0.02] transition-colors">
                  <td className="px-5 py-4 font-mono text-[11px] text-muted">REC-02</td>
                  <td className="px-5 py-4"><span className="block font-bold text-ink mb-1">Payment data</span><span className="text-xs text-muted">Card type, last 4 digits, expiration date, billing address, phone number, email.</span></td>
                  <td className="px-5 py-4 text-xs"><div className="flex flex-wrap gap-1"><span className="bg-black/5 px-2 py-0.5 rounded">Provide service</span></div></td>
                  <td className="px-5 py-4 text-xs"><div className="flex flex-wrap gap-1"><span className="bg-black/5 px-2 py-0.5 rounded">Plaid</span><span className="bg-black/5 px-2 py-0.5 rounded">Spinwheel</span></div></td>
                </tr>
                <tr className="hover:bg-black/[0.02] transition-colors">
                  <td className="px-5 py-4 font-mono text-[11px] text-muted">REC-03</td>
                  <td className="px-5 py-4"><span className="block font-bold text-ink mb-1">Commercial and debt-related data</span><span className="text-xs text-muted">Financial transactions, account balances, credit reports, credit score, outstanding debt.</span></td>
                  <td className="px-5 py-4 text-xs"><div className="flex flex-wrap gap-1"><span className="bg-black/5 px-2 py-0.5 rounded">Provide service</span><span className="bg-black/5 px-2 py-0.5 rounded">Improve service</span></div></td>
                  <td className="px-5 py-4 text-xs"><div className="flex flex-wrap gap-1"><span className="bg-black/5 px-2 py-0.5 rounded">Plaid</span><span className="bg-black/5 px-2 py-0.5 rounded">Spinwheel</span><span className="bg-black/5 px-2 py-0.5 rounded">Parties you authorize</span></div></td>
                </tr>
                <tr className="hover:bg-black/[0.02] transition-colors">
                  <td className="px-5 py-4 font-mono text-[11px] text-muted">REC-04</td>
                  <td className="px-5 py-4"><span className="block font-bold text-ink mb-1">Device and IP data</span><span className="text-xs text-muted">IP address, device ID, domain server, device, operating system, browser.</span></td>
                  <td className="px-5 py-4 text-xs"><div className="flex flex-wrap gap-1"><span className="bg-black/5 px-2 py-0.5 rounded">Provide service</span></div></td>
                  <td className="px-5 py-4 text-xs"><div className="flex flex-wrap gap-1"><span className="bg-black/5 px-2 py-0.5 rounded">Service providers</span></div></td>
                </tr>
                <tr className="hover:bg-black/[0.02] transition-colors">
                  <td className="px-5 py-4 font-mono text-[11px] text-muted">REC-05</td>
                  <td className="px-5 py-4"><span className="block font-bold text-ink mb-1">Web analytics</span><span className="text-xs text-muted">Page interactions, referring page or source, non-identifiable request IDs, browser interaction statistics.</span></td>
                  <td className="px-5 py-4 text-xs"><div className="flex flex-wrap gap-1"><span className="bg-black/5 px-2 py-0.5 rounded">Provide service</span></div></td>
                  <td className="px-5 py-4 text-xs"><div className="flex flex-wrap gap-1"><span className="bg-black/5 px-2 py-0.5 rounded">Service providers</span><span className="bg-black/5 px-2 py-0.5 rounded">Advertising partners</span></div></td>
                </tr>
                <tr className="hover:bg-black/[0.02] transition-colors">
                  <td className="px-5 py-4 font-mono text-[11px] text-muted">REC-06</td>
                  <td className="px-5 py-4"><span className="block font-bold text-ink mb-1">Consumer demographic data</span><span className="text-xs text-muted">Age or date of birth, and ZIP code.</span></td>
                  <td className="px-5 py-4 text-xs"><div className="flex flex-wrap gap-1"><span className="bg-black/5 px-2 py-0.5 rounded">Provide service</span></div></td>
                  <td className="px-5 py-4 text-xs"><div className="flex flex-wrap gap-1"><span className="bg-black/5 px-2 py-0.5 rounded">Service providers</span></div></td>
                </tr>
                <tr className="hover:bg-black/[0.02] transition-colors">
                  <td className="px-5 py-4 font-mono text-[11px] text-muted">REC-07</td>
                  <td className="px-5 py-4"><span className="block font-bold text-ink mb-1">Sensory data</span><span className="text-xs text-muted">Photos, videos or recordings — a profile photo or a recorded interview. Collected with your consent.</span></td>
                  <td className="px-5 py-4 text-xs"><div className="flex flex-wrap gap-1"><span className="bg-black/5 px-2 py-0.5 rounded">Provide service</span></div></td>
                  <td className="px-5 py-4 text-xs"><div className="flex flex-wrap gap-1"><span className="bg-black/5 px-2 py-0.5 rounded">Service providers</span></div></td>
                </tr>
                <tr className="hover:bg-black/[0.02] transition-colors">
                  <td className="px-5 py-4 font-mono text-[11px] text-muted">REC-08</td>
                  <td className="px-5 py-4"><span className="block font-bold text-ink mb-1">Data treated as sensitive under the CCPA</span><span className="text-xs text-muted">Health data to the extent it relates to an outstanding debt. Personal identification numbers including Social Security, driver's licence, passport or state ID numbers.</span></td>
                  <td className="px-5 py-4 text-xs"><div className="flex flex-wrap gap-1"><span className="bg-black/5 px-2 py-0.5 rounded">Provide service</span></div></td>
                  <td className="px-5 py-4 text-xs"><div className="flex flex-wrap gap-1"><span className="bg-black/5 px-2 py-0.5 rounded">Service providers</span></div></td>
                </tr>
                <tr className="hover:bg-black/[0.02] transition-colors">
                  <td className="px-5 py-4 font-mono text-[11px] text-muted">REC-09</td>
                  <td className="px-5 py-4"><span className="block font-bold text-ink mb-1">Inferences drawn from other data</span><span className="text-xs text-muted">Inferences relating specifically to your use of our services.</span></td>
                  <td className="px-5 py-4 text-xs"><div className="flex flex-wrap gap-1"><span className="bg-black/5 px-2 py-0.5 rounded">Provide service</span></div></td>
                  <td className="px-5 py-4 text-xs"><div className="flex flex-wrap gap-1"><span className="bg-black/5 px-2 py-0.5 rounded">Service providers</span></div></td>
                </tr>
                <tr className="hover:bg-black/[0.02] transition-colors">
                  <td className="px-5 py-4 font-mono text-[11px] text-muted">REC-10</td>
                  <td className="px-5 py-4"><span className="block font-bold text-ink mb-1">Anything else you choose to send us</span><span className="text-xs text-muted">Emails, letters, texts or other communications you send to us.</span></td>
                  <td className="px-5 py-4 text-xs"><div className="flex flex-wrap gap-1"><span className="bg-black/5 px-2 py-0.5 rounded">Provide service</span><span className="bg-black/5 px-2 py-0.5 rounded">Correspond</span></div></td>
                  <td className="px-5 py-4 text-xs"><div className="flex flex-wrap gap-1"><span className="bg-black/5 px-2 py-0.5 rounded">Service providers</span></div></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <p>We do not collect data considered sensitive under the CCPA in order to infer characteristics about you. Our use of it is limited to the purposes set out in section 7027(m) of the CCPA regulations, listed in §13.</p>
      </DocSection>

      <DocSection id="sources" num="§04" title="Where it comes from">
        <div className="grid sm:grid-cols-2 gap-4 my-6">
          <div className="bg-surface p-5 rounded-xl border border-border shadow-sm">
            <span className="text-[10px] uppercase tracking-widest text-ink font-bold block mb-2">Source</span>
            <h4 className="font-bold text-ink mb-1">From you</h4>
            <p className="text-sm">When you create an account, use our tools, fill in a free-text field, answer a survey, or email us.</p>
          </div>
          <div className="bg-surface p-5 rounded-xl border border-border shadow-sm">
            <span className="text-[10px] uppercase tracking-widest text-ink font-bold block mb-2">Source</span>
            <h4 className="font-bold text-ink mb-1">Automatically</h4>
            <p className="text-sm">Through cookies, and — if you use our app or a location-enabled browser — device and location information.</p>
          </div>
          <div className="bg-surface p-5 rounded-xl border border-border shadow-sm">
            <span className="text-[10px] uppercase tracking-widest text-ink font-bold block mb-2">Source</span>
            <h4 className="font-bold text-ink mb-1">Your connected accounts</h4>
            <p className="text-sm">Transaction and balance data through Plaid and Spinwheel. We never receive your bank login credentials.</p>
          </div>
          <div className="bg-surface p-5 rounded-xl border border-border shadow-sm">
            <span className="text-[10px] uppercase tracking-widest text-ink font-bold block mb-2">Source</span>
            <h4 className="font-bold text-ink mb-1">Third parties</h4>
            <p className="text-sm">Analytics and support vendors, advertising partners, and any third-party account you choose to link.</p>
          </div>
        </div>
        <p>When you log in to a financial account to connect it to Amalgamic, we receive transaction and balance information through Plaid and Spinwheel. At no point do we receive the login credentials for any of your financial accounts.</p>
        <p>We may also collect how you use the site — pages visited, links clicked, non-sensitive text entered, mouse movement, referring URL, browser, operating system and IP address.</p>
      </DocSection>

      <DocSection id="purposes" num="§05" title="Why we collect it">
        <h3>Providing, customising and improving the services</h3>
        <ul>
          <li>Creating and managing your account and profiles.</li>
          <li>Processing orders and other transactions, and billing.</li>
          <li>Providing the products, services or information you request.</li>
          <li>Meeting the reason you gave us the information in the first place.</li>
          <li>Providing support and assistance.</li>
          <li>Testing, research, internal analytics and product development.</li>
          <li>Personalising content and communications to your preferences.</li>
          <li>Fraud protection, security and debugging.</li>
          <li>Other business purposes stated when we collect your data, or permitted under applicable law such as the California Consumer Privacy Act.</li>
        </ul>
        <h3>Marketing the services</h3>
        <ul>
          <li>Marketing and selling Amalgamic.</li>
          <li>Showing you advertisements, including interest-based, online behavioural or targeted advertising.</li>
        </ul>
        <h3>Corresponding with you</h3>
        <ul>
          <li>Replying to you, and contacting you when necessary or requested.</li>
          <li>Sending emails according to your preferences.</li>
        </ul>
        <h3>Legal obligations</h3>
        <p>Any category above may also be used or disclosed to government, law enforcement or other parties to meet legal requirements: complying with law, regulation, court order or legal process; preventing, detecting and investigating security incidents and potentially illegal activity; protecting the rights, property or safety of you, Amalgamic or another party; enforcing our agreements with you; responding to claims that content violates third-party rights; and resolving disputes.</p>
        <p>We will not collect additional categories of personal data, or use what we have collected for materially different or incompatible purposes, without telling you first.</p>
      </DocSection>

      <DocSection id="disclosure" num="§06" title="Who we disclose it to">
        <h3>Service providers</h3>
        <p>These parties help us run the service or perform business functions for us: hosting, technology and communication providers; analytics providers that do not assist with interest-based advertising; security and fraud prevention consultants; and support and customer service vendors.</p>
        <h3>Financial data providers</h3>
        <p>Plaid and Spinwheel connect your financial accounts to Amalgamic and pass us transaction and balance data. Their own privacy practices govern that connection, and you can revoke Amalgamic's access directly with them at any time.</p>
        <h3>Advertising and analytics partners</h3>
        <p>Ad networks, marketing providers and analytics partners that assist with our interest-based advertising, plus companies that track how people found the service and how they use it.</p>
        <h3>Business transfers</h3>
        <p>If we go through a merger, acquisition, bankruptcy or other transaction where a third party assumes control of our business in whole or in part, your personal data may transfer with it. We will make reasonable efforts to notify you before your information becomes subject to different privacy practices.</p>
        <h3>Data that is not personal data</h3>
        <p>We may create aggregated, de-identified or anonymised data from what we collect and share it with third parties for lawful business purposes, but never in a way that could identify you.</p>
      </DocSection>

      <DocSection id="ai" num="§07" title="How we use AI">
        <p>Parts of Amalgamic use artificial intelligence to read merchant cancellation flows, draft correspondence and interpret instructions you give in plain language.</p>
        <div className="bg-surface border border-ink/20 rounded-2xl p-6 my-6 shadow-sm">
          <span className="text-[10px] uppercase tracking-widest text-muted font-bold block mb-2">Commitment</span>
          <p className="text-xl font-bold text-ink mb-2">We do not train AI on your data.</p>
          <p className="text-sm">Your personal or financial data is never used to train artificial intelligence models, ours or anyone else's. AI is used to carry out the task you asked for, and for nothing beyond it.</p>
        </div>
        <p>AI output can be wrong. You should not treat AI-generated correspondence or summaries as verified fact, and you remain responsible for instructions you confirm.</p>
      </DocSection>

      <DocSection id="cookies" num="§08" title="Cookies">
        <p>We use cookies and similar technologies — pixel tags, web beacons, clear GIFs and JavaScript — so our servers recognise your browser and so we can see how and when you use the service. Because of how we use cookies, the service does not currently support browser Do Not Track requests.</p>
        <div className="grid sm:grid-cols-2 gap-4 my-6">
          <div className="bg-surface p-5 rounded-xl border border-border shadow-sm">
            <span className="text-[10px] uppercase tracking-widest text-ink font-bold block mb-2">Cookie type</span>
            <h4 className="font-bold text-ink mb-1">Essential</h4>
            <p className="text-sm">Required for features you asked for — logging into secure areas, for example. Disabling these makes parts of the service unavailable.</p>
          </div>
          <div className="bg-surface p-5 rounded-xl border border-border shadow-sm">
            <span className="text-[10px] uppercase tracking-widest text-ink font-bold block mb-2">Cookie type</span>
            <h4 className="font-bold text-ink mb-1">Functional</h4>
            <p className="text-sm">Records your choices and settings, keeps your preferences over time, and recognises you when you come back.</p>
          </div>
          <div className="bg-surface p-5 rounded-xl border border-border shadow-sm">
            <span className="text-[10px] uppercase tracking-widest text-ink font-bold block mb-2">Cookie type</span>
            <h4 className="font-bold text-ink mb-1">Performance</h4>
            <p className="text-sm">Tells us how many people visit, which pages they view and how long they stay, and measures how our advertising performs.</p>
          </div>
          <div className="bg-surface p-5 rounded-xl border border-border shadow-sm">
            <span className="text-[10px] uppercase tracking-widest text-ink font-bold block mb-2">Cookie type</span>
            <h4 className="font-bold text-ink mb-1">Advertising</h4>
            <p className="text-sm">Collects data about your online activity to advertise Amalgamic on third-party sites. We do not show you third-party ads on ours.</p>
          </div>
        </div>
        <p>You control cookies through your browser settings, and you can delete cookies already on your device — though you may then need to reset preferences on every visit, and some features may stop working.</p>
      </DocSection>

      <DocSection id="ads" num="§09" title="Interest-based ads">
        <p>We may work with third-party ad networks, ad servers, agencies, ad technology vendors and research firms to serve advertisements aimed at people who fit general profile categories or show certain preferences and behaviours.</p>
        <p>The information behind those ads may come from you, or be derived from usage patterns on our service and on third-party services, including activity tracked over time and across unaffiliated sites. To do this we or our providers may deliver cookies and web beacons through the service, which let ad networks report in aggregate and serve you targeted ads on other websites.</p>
      </DocSection>

      <DocSection id="security" num="§10" title="Security and retention">
        <p>We protect your personal data from unauthorised access, use and disclosure using physical, technical, organisational and administrative measures appropriate to the type of data and how we process it. Help us by choosing a strong password, limiting access to your devices and browser, and signing out when you finish. No method of transmitting or storing data is completely secure.</p>
        <p>We keep personal data for as long as we need it to provide the service or fulfil the business purpose we collected it for. In setting a retention period we consider who we collected the data from, why, our need for it, and how sensitive it is. We keep data longer where we must in order to comply with legal obligations, resolve disputes or collect fees owed. Your profile information and credentials are kept for as long as you have an account.</p>
      </DocSection>

      <DocSection id="children" num="§11" title="Children's data">
        <p>We do not knowingly collect or solicit personal data from anyone under 18. If you are under 18, please do not register for the service or send us personal data. If we learn we have collected data from someone under 18, we will delete it as quickly as possible. If you believe a child under 18 has given us personal data, contact <a href="mailto:lizann@amalgamic.io">lizann@amalgamic.io</a>.</p>
      </DocSection>

      <DocSection id="california" num="§12" title="California resident rights">
        <p>If you are a California resident you have the rights below. They are subject to conditions and exceptions under applicable law, which may permit or require us to deny a request. Where this section conflicts with anything else in this policy, the more protective provision wins.</p>
        <div className="my-6 space-y-3">
          <div className="flex flex-col sm:flex-row gap-4 bg-surface border border-border p-5 rounded-xl shadow-sm">
            <span className="font-bold text-ink uppercase tracking-widest text-[10px] sm:w-1/4 pt-1">Access</span>
            <p className="sm:w-3/4 text-sm">Ask what we collected about you over the past 12 months — the categories, the sources, the purposes, who we shared it with, and the specific pieces. You can ask beyond 12 months, back to 1 January 2022.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 bg-surface border border-border p-5 rounded-xl shadow-sm">
            <span className="font-bold text-ink uppercase tracking-widest text-[10px] sm:w-1/4 pt-1">Deletion</span>
            <p className="sm:w-3/4 text-sm">Ask us to delete the personal data we hold. Some exceptions apply — we may need to keep data to deliver a service or complete a transaction you asked for.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 bg-surface border border-border p-5 rounded-xl shadow-sm">
            <span className="font-bold text-ink uppercase tracking-widest text-[10px] sm:w-1/4 pt-1">Correction</span>
            <p className="sm:w-3/4 text-sm">Ask us to fix inaccurate personal data. We may decline if, considering everything we hold, we determine the data is already correct.</p>
          </div>
        </div>
        <p>If we disclosed your personal data to third parties for a business purpose in the past 12 months, we will identify the categories shared with each category of recipient. Where we process personal data as a service provider on behalf of a customer, contact that customer first to exercise your rights over that data.</p>
      </DocSection>

      <DocSection id="sensitive" num="§13" title="Limiting sensitive data use">
        <p>Consumers have a right to ask a business to limit the use and disclosure of sensitive personal information. Our use of it is already confined to the purposes listed in section 7027(m) of the CCPA regulations, so we do not offer a separate request route. Those purposes are:</p>
        <ul>
          <li>Performing the services or providing the goods you reasonably expect.</li>
          <li>Preventing, detecting and investigating security incidents.</li>
          <li>Resisting malicious, deceptive, fraudulent or illegal actions.</li>
          <li>Performing services on behalf of the business.</li>
          <li>Verifying or maintaining the quality or safety of a product or service.</li>
          <li>Collecting or processing sensitive personal information, but not for the purpose of inferring characteristics about you.</li>
        </ul>
      </DocSection>

      <DocSection id="nondiscrimination" num="§14" title="No discrimination">
        <p>We will not discriminate against you for exercising your rights under the CCPA. We will not deny you goods or services, charge you a different price, or give you a lower quality of service. We may offer different tiers of service at different prices as permitted by law, related to the value of the personal data we receive from you.</p>
      </DocSection>

      <DocSection id="incentives" num="§15" title="Referral and reward programs">
        <p>We run a referral program and may from time to time run contests or similar promotions. Signing up may ask for personal data such as your name and email, and for referrals the name and contact details of the person you refer.</p>
        <p>Because these programs collect personal data and offer benefits, California law may treat them as financial incentive programs. The value of your personal data to us relates to the value of the rewards or benefits provided, less the expense of offering them. You can withdraw from any program at any time by emailing <a href="mailto:lizann@amalgamic.io">lizann@amalgamic.io</a>.</p>
      </DocSection>

      <DocSection id="exercise" num="§16" title="How to exercise your rights">
        <p>Send us a request that gives us enough information to verify you are the person we collected data about, and describes what you want in enough detail for us to evaluate it. A request meeting both criteria is a valid request. We may not respond to requests that do not.</p>
        <div className="my-6 space-y-3">
          <div className="flex flex-col sm:flex-row gap-4 bg-surface border border-border p-5 rounded-xl shadow-sm">
            <span className="font-bold text-ink uppercase tracking-widest text-[10px] sm:w-1/4 pt-1">Delete account</span>
            <p className="sm:w-3/4 text-sm">Delete your account yourself from account settings.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 bg-surface border border-border p-5 rounded-xl shadow-sm">
            <span className="font-bold text-ink uppercase tracking-widest text-[10px] sm:w-1/4 pt-1">Any right</span>
            <p className="sm:w-3/4 text-sm">Email <a href="mailto:support@amalgamic.io">support@amalgamic.io</a> with your request and the email address on your account.</p>
          </div>
        </div>
      </DocSection>

      <DocSection id="states" num="§17" title="Other state privacy rights">
        <h3>California — Shine the Light</h3>
        <p>Under California Civil Code sections 1798.83–1798.84, California residents may contact us to prevent disclosure of personal data to third parties for those third parties' own direct marketing purposes. Email <a href="mailto:lizann@amalgamic.io">lizann@amalgamic.io</a>.</p>
        <h3>Nevada</h3>
        <p>Nevada residents may opt out of the sale of certain personal data to third parties who intend to license or sell it. Email <a href="mailto:lizann@amalgamic.io">lizann@amalgamic.io</a> with the subject line Nevada Do Not Sell Request, your name, and the email address on your account.</p>
      </DocSection>

      <DocSection id="changes" num="§18" title="Changes to this policy">
        <p>We are constantly improving the service, so this policy may change. We will tell you about material changes by posting a notice on the Amalgamic website, emailing you, or by other means. If you opted out of legal notice emails, or never gave us an email address, those notices still govern your use of the service and you remain responsible for reading them.</p>
        <p>Continuing to use the service after a change means you agree to it. Information we have already collected stays subject to the policy in effect when we collected it.</p>
      </DocSection>

      <DocSection id="contact" num="§19" title="Contact us">
        <p>Questions about this policy, about how we collect and use your personal data, or about your rights over it — we would rather hear from you than not.</p>
        <div className="my-6 space-y-3">
          <div className="flex flex-col sm:flex-row gap-4 bg-surface border border-border p-5 rounded-xl shadow-sm">
            <span className="font-bold text-ink uppercase tracking-widest text-[10px] sm:w-1/4 pt-1">General</span>
            <p className="sm:w-3/4 text-sm"><a href="mailto:support@amalgamic.io">support@amalgamic.io</a></p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 bg-surface border border-border p-5 rounded-xl shadow-sm">
            <span className="font-bold text-ink uppercase tracking-widest text-[10px] sm:w-1/4 pt-1">Privacy</span>
            <p className="sm:w-3/4 text-sm"><a href="mailto:lizann@amalgamic.io">lizann@amalgamic.io</a></p>
          </div>
        </div>
        <p>See also the <a href="/contact">contact page</a> for where to send other requests.</p>
      </DocSection>

    </DocLayout>
  );
}
