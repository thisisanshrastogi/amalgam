import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturesGrid from './components/FeaturesGrid';
import CollectiveImpact from './components/CollectiveImpact';
import HowItWorks from './components/HowItWorks';
import Insights from './components/Insights';
import Assistant from './components/Assistant';
import CardsAndBillPay from './components/CardsAndBillPay';
import Subscriptions from './components/Subscriptions';
import CardCredits from './components/CardCredits';
import DelegatedTasks from './components/DelegatedTasks';
import Proof from './components/Proof';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-bg text-brand font-sans antialiased overflow-x-hidden selection:bg-highlight selection:text-accent">
      <Navbar />
      <main>
        <Hero />
        <FeaturesGrid />
        <CollectiveImpact />
        <HowItWorks />
        <Insights />
        <Assistant />
        <CardsAndBillPay />
        <Subscriptions />
        <CardCredits />
        <DelegatedTasks />
        <Proof />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
