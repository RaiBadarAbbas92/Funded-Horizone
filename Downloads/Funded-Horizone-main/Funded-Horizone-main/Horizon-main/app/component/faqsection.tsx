"use client"
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Sparkles, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqData = [
    { question: "What is a prop trading firm?", answer: "A proprietary trading firm provides capital to traders, allowing them to trade with the firm's money in exchange for a share of the profits. We offer various account sizes and profit-sharing arrangements." },
    { question: "How does the evaluation process work?", answer: "Our evaluation process consists of two phases where traders must demonstrate consistent profitability while adhering to risk management rules. Once passed, traders receive a funded account." },
    { question: "What are the profit targets and drawdown limits?", answer: "Profit targets and drawdown limits vary by account size. Generally, traders need to achieve 8-10% profit while staying within maximum daily and overall drawdown limits of 5% and 10% respectively." },
    { question: "What trading instruments can I trade?", answer: "We offer a wide range of instruments including Forex pairs, Commodities, Indices, Cryptocurrencies, and Stocks. All instruments are traded through our supported platforms." },
    { question: "How do payouts work?", answer: "Successful traders receive up to 90% profit share, paid monthly. Payouts are processed within 5-7 business days after request and can be received via bank transfer or crypto." },
    { question: "What trading platforms do you support?", answer: "We support popular platforms including MetaTrader 4, MetaTrader 5, and cTrader. All platforms come with real-time data and professional trading tools." },
    { question: "Are there any time restrictions for trading?", answer: "You can trade 24/5 during market hours. We don't impose minimum trading days, but consistency is key for successful evaluation." },
    { question: "What happens if I break a trading rule?", answer: "Breaking trading rules like exceeding drawdown limits results in immediate account termination. We strictly enforce rules to maintain risk management standards." },
    { question: "Can I trade news events?", answer: "Yes, you can trade during news events. However, we recommend proper risk management due to increased volatility during these times." },
    { question: "Do you offer any training or support?", answer: "We provide comprehensive educational resources, market analysis, and 24/7 technical support. Our community also includes experienced traders who share insights." }
];

const FaqSection: React.FC = () => {
    const [visibleQuestions, setVisibleQuestions] = useState(6);
    const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleShowMore = () => {
        setVisibleQuestions(prev => Math.min(prev + 6, faqData.length));
    };

    const handleToggleAnswer = (index: number) => {
        setExpandedQuestion(expandedQuestion === index ? null : index);
    };

    const filteredFaqs = faqData.filter(faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section className="relative py-12 sm:py-20 bg-[#0A0F1C]">
            {/* Simplified background */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Simplified header */}
                <div className="text-center mb-8 sm:mb-16">
                    <h2 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
                        FAQ
                    </h2>
                    <p className="text-xl text-blue-200/80">
                        Everything you need to know about our services
                    </p>
                </div>

                {/* Simplified search bar */}
                <div className="max-w-2xl mx-auto mb-8 sm:mb-12 px-4 sm:px-0">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400/50" />
                        <input
                            type="text"
                            placeholder="Search your question..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full py-4 px-12 rounded-2xl bg-blue-900/20 border border-blue-500/20 text-white placeholder-blue-400/50 focus:outline-none"
                        />
                    </div>
                </div>

                {/* Simplified FAQ Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
                    {filteredFaqs.slice(0, visibleQuestions).map((faq, index) => (
                        <div
                            key={index}
                            className="bg-blue-900/40 border border-blue-500/20 rounded-2xl overflow-hidden"
                        >
                            <button
                                className="w-full p-6 flex items-center justify-between text-left"
                                onClick={() => handleToggleAnswer(index)}
                            >
                                <span className="text-xl font-semibold text-white">
                                    {faq.question}
                                </span>
                                <HelpCircle className="w-6 h-6 text-orange-500" />
                            </button>
                            
                            {expandedQuestion === index && (
                                <div className="px-6 pb-6">
                                    <p className="text-blue-200/90 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Simplified Load More button */}
                {visibleQuestions < filteredFaqs.length && (
                    <div className="text-center mt-16">
                        <button
                            className="px-10 py-5 bg-gradient-to-r from-orange-500 to-blue-500 text-white rounded-2xl font-bold text-xl"
                            onClick={handleShowMore}
                        >
                            Load More Questions
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default FaqSection;