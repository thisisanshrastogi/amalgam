import React, { useState } from 'react';
import DocLayout, { DocSection } from '../components/DocLayout';

export default function SupportedBanks() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const groups = [
    {
      title: "Coverage",
      links: [
        { id: "how", num: "01", label: "How coverage works" },
        { id: "find", num: "02", label: "Find your institution" },
        { id: "missing", num: "03", label: "If yours isn't listed" }
      ]
    },
    {
      title: "Control",
      links: [
        { id: "revoke", num: "04", label: "Disconnecting an account" }
      ]
    }
  ];

  const banks = [
    { name: "Chase", type: "National bank", conn: "OAuth" },
    { name: "Bank of America", type: "National bank", conn: "OAuth" },
    { name: "Wells Fargo", type: "National bank", conn: "OAuth" },
    { name: "Capital One", type: "National bank", conn: "OAuth" },
    { name: "Citi", type: "National bank", conn: "OAuth" },
    { name: "U.S. Bank", type: "National bank", conn: "OAuth" },
    { name: "PNC", type: "National bank", conn: "OAuth" },
    { name: "American Express", type: "Card issuer", conn: "OAuth" },
    { name: "Navy Federal Credit Union", type: "Credit union", conn: "OAuth" },
    { name: "Merrill", type: "Brokerage", conn: "OAuth" },
    { name: "Truist", type: "National bank", conn: "Supported" },
    { name: "TD Bank", type: "National bank", conn: "Supported" },
    { name: "USAA", type: "National bank", conn: "Supported" },
    { name: "Discover", type: "Card issuer", conn: "Supported" },
    { name: "Barclays US", type: "Card issuer", conn: "Supported" },
    { name: "Synchrony Bank", type: "Card issuer", conn: "Supported" },
    { name: "Fifth Third Bank", type: "Regional bank", conn: "Supported" },
    { name: "Citizens Bank", type: "Regional bank", conn: "Supported" },
    { name: "KeyBank", type: "Regional bank", conn: "Supported" },
    { name: "Regions Bank", type: "Regional bank", conn: "Supported" },
    { name: "M&T Bank", type: "Regional bank", conn: "Supported" },
    { name: "Huntington Bank", type: "Regional bank", conn: "Supported" },
    { name: "BMO Harris", type: "Regional bank", conn: "Supported" },
    { name: "Comerica", type: "Regional bank", conn: "Supported" },
    { name: "Santander US", type: "Regional bank", conn: "Supported" },
    { name: "Ally Bank", type: "Online bank", conn: "Supported" },
    { name: "Marcus by Goldman Sachs", type: "Online bank", conn: "Supported" },
    { name: "SoFi", type: "Online bank", conn: "Supported" },
    { name: "Chime", type: "Online bank", conn: "Supported" },
    { name: "Varo", type: "Online bank", conn: "Supported" },
    { name: "Current", type: "Online bank", conn: "Supported" },
    { name: "PenFed Credit Union", type: "Credit union", conn: "Supported" },
    { name: "Alliant Credit Union", type: "Credit union", conn: "Supported" },
    { name: "BECU", type: "Credit union", conn: "Supported" },
    { name: "State Employees Credit Union", type: "Credit union", conn: "Supported" },
    { name: "Charles Schwab", type: "Brokerage", conn: "Supported" },
    { name: "Fidelity", type: "Brokerage", conn: "Supported" },
    { name: "Vanguard", type: "Brokerage", conn: "Supported" },
    { name: "E*TRADE", type: "Brokerage", conn: "Supported" },
    { name: "Robinhood", type: "Brokerage", conn: "Supported" }
  ];

  const types = ["All", "Brokerage", "Card issuer", "Credit union", "National bank", "Online bank", "Regional bank"];

  const filteredBanks = banks.filter(b => {
    const matchSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = activeFilter === "All" || b.type === activeFilter;
    return matchSearch && matchType;
  });

  return (
    <DocLayout
      groups={groups}
      headerProps={{
        category: "Product / Coverage",
        title: "Supported Banks",
        lead: "We connect through Plaid and Spinwheel rather than integrating bank by bank, which means coverage runs to more than 12,000 US institutions — national banks, regionals, credit unions and brokerages.",
        meta: [
          { label: "Providers", value: "Plaid & Spinwheel" },
          { label: "Institutions", value: "12,000+" },
          { label: "Connection", value: "Read-only, revocable" }
        ]
      }}
    >
      <DocSection id="how" num="§01" title="How coverage works">
        <p>Amalgamic does not integrate with banks one at a time. We connect through two regulated data providers, and our coverage is whatever theirs is — which in practice means the overwhelming majority of US institutions, down to small credit unions.</p>
        
        <div className="grid md:grid-cols-2 gap-4 my-6">
          <div className="bg-surface border border-border p-6 rounded-xl shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand block mb-3 font-mono">Primary</span>
            <h4 className="font-bold text-brand mb-2">Plaid</h4>
            <p className="text-sm">Connects more than 12,000 financial institutions across the US — national banks, regional banks, credit unions and brokerages.</p>
          </div>
          <div className="bg-surface border border-border p-6 rounded-xl shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand block mb-3 font-mono">Specialist</span>
            <h4 className="font-bold text-brand mb-2">Spinwheel</h4>
            <p className="text-sm">Liability and debt accounts — loans, lines of credit and balances that transaction feeds alone tend to miss.</p>
          </div>
        </div>
        <p>When you link an account you authenticate with your bank through the provider, not through us. Larger institutions use OAuth, meaning you log in on your bank's own page and approve access there.</p>
      </DocSection>

      <DocSection id="find" num="§02" title="Find your institution">
        <p>A sample of commonly connected institutions. This is not the full list — searching in the dashboard queries live coverage.</p>
        
        <div className="bg-surface border border-border rounded-2xl overflow-hidden my-6 shadow-sm">
          <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-black/5">
            <span className="text-xs uppercase tracking-widest font-bold text-muted font-mono">Institution directory</span>
            <span className="text-xs font-bold text-muted font-mono">{filteredBanks.length} of {banks.length}</span>
          </div>
          
          <div className="p-4 border-b border-border flex flex-wrap items-center gap-3 bg-white">
            <input 
              type="search" 
              placeholder="Search institutions" 
              className="flex-1 min-w-[200px] bg-black/5 border border-border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex flex-wrap gap-2">
              {types.map(t => (
                <button 
                  key={t}
                  className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${activeFilter === t ? 'bg-ink text-white' : 'bg-black/5 text-muted hover:bg-black/10'}`}
                  style={activeFilter === t ? { backgroundColor: 'var(--brand)', color: 'white' } : {}}
                  onClick={() => setActiveFilter(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          
          <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
            {filteredBanks.length > 0 ? (
              <table className="w-full text-left min-w-[600px]">
                <thead className="sticky top-0 bg-surface shadow-sm z-10">
                  <tr className="bg-white/90 backdrop-blur text-[10px] uppercase tracking-widest text-muted border-b border-border">
                    <th className="px-5 py-3 font-bold">Institution</th>
                    <th className="px-5 py-3 font-bold">Type</th>
                    <th className="px-5 py-3 font-bold">Connection</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-sm">
                  {filteredBanks.map((b, i) => (
                    <tr key={i} className="hover:bg-black/[0.02] transition-colors">
                      <td className="px-5 py-3.5"><span className="font-bold text-brand">{b.name}</span></td>
                      <td className="px-5 py-3.5"><span className="bg-black/5 border border-border px-2 py-0.5 rounded text-[11px] font-bold text-muted">{b.type}</span></td>
                      <td className="px-5 py-3.5">
                        {b.conn === 'OAuth' ? (
                          <span className="text-xs font-bold text-accent flex items-center gap-1.5 bg-accent/5 w-fit px-2 py-0.5 rounded border border-accent/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent"></span> OAuth
                          </span>
                        ) : (
                          <span className="text-xs font-bold text-muted flex items-center gap-1.5 bg-black/5 w-fit px-2 py-0.5 rounded border border-border">
                            Supported
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-8 text-center text-muted">
                <span className="block font-mono text-xs uppercase tracking-widest mb-2 font-bold">No match</span>
                <p className="text-sm max-w-md mx-auto">Nothing here matches that. Coverage runs to more than 12,000 institutions, far beyond this list — search in the dashboard, or email support@amalgamic.io and we will check.</p>
              </div>
            )}
          </div>
        </div>
        <p className="text-sm">Institutions marked OAuth use your bank's own login page, so your credentials are never typed into an Amalgamic screen.</p>
      </DocSection>

      <DocSection id="missing" num="§03" title="If yours isn't listed">
        <p>Try connecting anyway. Coverage is far wider than this page shows and it changes constantly. If the connection fails, email <a href="mailto:support@amalgamic.io">support@amalgamic.io</a> with the institution name and we will tell you whether it is coming.</p>
      </DocSection>

      <DocSection id="revoke" num="§04" title="Disconnecting an account">
        <div className="bg-surface border border-accent/20 rounded-2xl p-6 my-6 shadow-sm">
          <span className="text-[10px] uppercase tracking-widest text-muted font-bold block mb-2 font-mono">Control</span>
          <p className="text-xl font-bold text-brand mb-2">Revocable from either end, at any time.</p>
          <p className="text-sm">Disconnect an institution from your Amalgamic dashboard, or revoke access directly with Plaid or Spinwheel without involving us. Either stops the data flow. What we already hold is governed by the retention rules in the <a href="/privacy-policy">privacy policy</a>.</p>
        </div>
      </DocSection>
    </DocLayout>
  );
}
