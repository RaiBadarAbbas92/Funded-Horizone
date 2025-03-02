"use client"

import { useRef } from "react"
import { Footer } from "./component/components_footer"
import Testimonials from "./component/testimonials"
import Hero from "./components/hero-section"
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
import { SaleOfferModal } from './components/sale-offer-modal'
import { Navbar } from "./component/navbar"

export default function Home() {
  const faqRef = useRef<HTMLDivElement>(null)
  const tradingRef = useRef<HTMLDivElement>(null)
  const liveMarketRef = useRef<HTMLDivElement>(null)

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <SaleOfferModal />
      <main className="bg-[#0A0F1C]">
        <Navbar />
        <Hero />
        <div id="live-market">
          <LiveMarketTicker />
        </div>
        <StatisticsSection />
        <MarketOverview />
        <div id="pricing">
          <TradingChallenge />
        </div>
        <RiskManagement />
        <CommunityCallToAction />
        <div id="faqs">
          <FaqSection/>
        </div>
        <Footer />
      </main>
    </>
  )
}