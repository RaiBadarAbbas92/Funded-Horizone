"use client"

import { Navbar } from "./component/navbar"
import { Footer } from "./component/components_footer"
import Testimonials from "./component/testimonials"
import Hero from "./components/hero-section"
import { EvaluationProcess } from "./components/evaluation-process"
import { AccountOptions } from "./components/account-options"
import { LiveMarketTicker } from "./components/live-market-ticker"
import { MarketOverview } from "./components/market-overview"
import StatisticsSection from "./component/StatisticsSection"
import { Advantages } from "./component/components_advantages"
import { CommunityCallToAction } from "./component/components_community-cta"
import { EconomicCalendar } from "./components/economic-calendar"
import { TradingInstruments } from "./components/trading-instruments"
import { TradingPlatforms } from "./components/trading-platforms"
import { RiskManagement } from "./components/risk-management"
import { PayoutSection } from "./components/PayoutSection"
import TradingChallenge from "./component/trading-challenge"
import FaqSection from "./component/faqsection"
export default function Home() {
  return (
    <main className="bg-[#0A0F1C]">
      <Navbar />
      <Hero />
      <LiveMarketTicker />
      <StatisticsSection />
      <MarketOverview />
      <TradingInstruments />
      <EconomicCalendar />
      <EvaluationProcess />
      <TradingChallenge />
      <RiskManagement />
      <PayoutSection />
      <CommunityCallToAction />
      <FaqSection/>
      <Footer />
    </main>
  )
}