import React from 'react';
import DocLayout, { DocSection } from '../components/DocLayout';

export default function Contact() {
  const groups = [
    {
      title: "Reach us",
      links: [
        { id: "route", num: "01", label: "Where to send what" },
        { id: "account", num: "02", label: "Account and billing" }
      ]
    },
    {
      title: "Formal requests",
      links: [
        { id: "privacy", num: "03", label: "Privacy requests" },
        { id: "entity", num: "04", label: "Company details" }
      ]
    }
  ];

  return (
    <DocLayout
      groups={groups}
      headerProps={{
        category: "Company / Contact",
        title: "Contact",
        lead: "Two inboxes, going to different people. Below is which one you want, what to put in it, and what you can do faster yourself without emailing anyone.",
        meta: [
          { label: "Support", value: "support@amalgamic.io" },
          { label: "Privacy", value: "lizann@amalgamic.io" }
        ]
      }}
    >
      <DocSection id="route" num="§01" title="Where to send what">
        <p>Two addresses, monitored by different people. Sending to the right one is faster than sending to both.</p>
        
        <div className="grid sm:grid-cols-2 gap-4 my-6">
          <a href="mailto:support@amalgamic.io" className="block bg-glass-subtle border border-glass-border p-5 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted block mb-3 font-bold">Support</span>
            <span className="block text-brand font-bold mb-2 group-hover:text-accent transition-colors">support@amalgamic.io</span>
            <span className="block text-sm text-muted">Anything about your account, a recovery that did not land, a cancellation that failed, billing questions, or connecting an institution.</span>
          </a>
          <a href="mailto:lizann@amalgamic.io" className="block bg-glass-subtle border border-glass-border p-5 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted block mb-3 font-bold">Privacy</span>
            <span className="block text-brand font-bold mb-2 group-hover:text-accent transition-colors">lizann@amalgamic.io</span>
            <span className="block text-sm text-muted">Access, deletion and correction requests. Nevada and California requests. Anything under the CCPA.</span>
          </a>
        </div>
      </DocSection>

      <DocSection id="account" num="§02" title="Account and billing">
        <div className="my-6 space-y-3">
          <div className="flex flex-col sm:flex-row gap-4 bg-glass-subtle border border-glass-border p-5 rounded-xl shadow-sm items-baseline">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted sm:w-24 flex-none">Fastest</span>
            <p className="text-sm m-0">Most account actions are self-serve in your <a href="https://cards.amalgamic.io/dashboard">dashboard</a> — connecting or disconnecting institutions, changing what runs automatically, updating your details, and closing your account.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 bg-glass-subtle border border-glass-border p-5 rounded-xl shadow-sm items-baseline">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted sm:w-24 flex-none">Everything else</span>
            <p className="text-sm m-0">Email <a href="mailto:support@amalgamic.io">support@amalgamic.io</a> and include the email address on your account so we can find you.</p>
          </div>
        </div>
      </DocSection>

      <DocSection id="privacy" num="§03" title="Privacy requests">
        <p>To exercise a right under the CCPA or another state privacy law, email <a href="mailto:lizann@amalgamic.io">lizann@amalgamic.io</a>. For us to treat it as a valid request it needs to give us enough information to verify you are the person whose data we hold, and describe what you want in enough detail for us to act on it.</p>
        
        <div className="my-6 space-y-3">
          <div className="flex flex-col sm:flex-row gap-4 bg-glass-subtle border border-glass-border p-5 rounded-xl shadow-sm items-baseline">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted sm:w-24 flex-none">Include</span>
            <p className="text-sm m-0">The email address on your account, and which right you are exercising — access, deletion or correction.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 bg-glass-subtle border border-glass-border p-5 rounded-xl shadow-sm items-baseline">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted sm:w-24 flex-none">Nevada</span>
            <p className="text-sm m-0">Use the subject line "Nevada Do Not Sell Request" and include your name and account email.</p>
          </div>
        </div>
        <p>The full detail of each right, and the exceptions that may let us decline, is in the <a href="/privacy-policy">privacy policy</a>.</p>
      </DocSection>

      <DocSection id="entity" num="§04" title="Company details">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
          <div className="bg-glass-subtle border border-glass-border p-4 rounded-xl shadow-sm">
            <span className="uppercase tracking-widest text-muted block mb-1 text-[10px] font-bold">Web</span>
            <span className="text-[15px] font-bold text-brand">amalgamic.io</span>
          </div>
          <div className="bg-glass-subtle border border-glass-border p-4 rounded-xl shadow-sm">
            <span className="uppercase tracking-widest text-muted block mb-1 text-[10px] font-bold">Dashboard</span>
            <span className="text-[15px] font-bold text-brand">cards.amalgamic.io</span>
          </div>
          <div className="bg-glass-subtle border border-glass-border p-4 rounded-xl shadow-sm">
            <span className="uppercase tracking-widest text-muted block mb-1 text-[10px] font-bold">Region</span>
            <span className="text-[15px] font-bold text-brand">United States</span>
          </div>
        </div>
      </DocSection>

    </DocLayout>
  );
}
