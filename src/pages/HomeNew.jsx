import React from 'react';
import Hero from '../components/HeroWithWallet';
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
import FinalCTA from '../components/FinalCTA';

export default function HomeNew() {
    return (
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
    );
}
