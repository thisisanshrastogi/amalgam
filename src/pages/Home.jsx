import React from 'react';
import DitherDivider from '../components/DitherDivider';
import Hero from '../components/Hero';
import FeaturesGrid from '../components/FeaturesGrid';
import CollectiveImpact from '../components/CollectiveImpact';
import HowItWorks from '../components/HowItWorks';
import Insights from '../components/Insights';
import Assistant from '../components/Assistant';
import CardsAndBillPay from '../components/CardsAndBillPay';
import Subscriptions from '../components/Subscriptions';
import CardCredits from '../components/CardCredits';
import DelegatedTasks from '../components/DelegatedTasks';
import Proof from '../components/Proof';
import PrivacySecurity from '../components/PrivacySecurity';
import FinalCTA from '../components/FinalCTA';
import FeaturesFacade from '../components/FeaturesGrid';
import FeaturesBlack from '../components/FeaturesGrid';

export default function Home() {
  return (
    <main>
      <Hero />
      {/* <FeaturesGrid /> */}
      {<FeaturesBlack />}
      <DitherDivider dark />
      {/* <CollectiveImpact /> */}
      {/* <Insights /> */}
      <Assistant />
      <CardsAndBillPay />
      <Subscriptions />
      <CardCredits />
      <DelegatedTasks />
      <HowItWorks />
      <div className="bg-ink overflow-hidden">
        <PrivacySecurity />
        {/* <Proof /> */}
        <FinalCTA />
      </div>
    </main>
  );
}
