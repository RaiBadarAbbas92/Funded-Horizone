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
    { question: "Do you offer any training or support?", answer: "We provide comprehensive educational resources, market analysis, and 24/7 technical support. Our community also includes experienced traders who share insights." },
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
        <section className="relative min-h-screen py-20 bg-[#0A1428] overflow-hidden">
            {/* Enhanced animated background effects */}
            <div className="absolute inset-0">
                <div className="absolute w-[800px] h-[800px] -left-96 -top-96 bg-blue-500/10 rounded-full blur-[150px] animate-pulse" />
                <div className="absolute w-[800px] h-[800px] -right-96 -bottom-96 bg-orange-500/10 rounded-full blur-[150px] animate-pulse delay-1000" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Sparkles className="w-8 h-8 text-orange-500 animate-pulse" />
                        <h2 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-orange-400 via-white to-blue-400 bg-clip-text text-transparent">
                            FAQ
                        </h2>
                        <Sparkles className="w-8 h-8 text-blue-500 animate-pulse" />
                    </div>
                    <p className="text-2xl text-blue-200/80 font-light">
                        Everything you need to know about our services
                    </p>
                </motion.div>

                {/* Search Bar */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-2xl mx-auto mb-12"
                >
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400/50" />
                        <input
                            type="text"
                            placeholder="Search your question..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full py-4 px-12 rounded-2xl bg-blue-900/20 border border-blue-500/20 text-white placeholder-blue-400/50 
                                     focus:outline-none focus:ring-2 focus:ring-orange-500/50 backdrop-blur-xl transition-all duration-300"
                        />
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {filteredFaqs.slice(0, visibleQuestions).map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative"
                        >
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-30 transition-all duration-500 blur" />
                            <div className="relative bg-gradient-to-br from-blue-900/40 to-transparent backdrop-blur-xl border border-blue-500/20 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500">
                                <button
                                    className="w-full p-6 flex items-center justify-between text-left group"
                                    onClick={() => handleToggleAnswer(index)}
                                >
                                    <span className="text-xl font-semibold bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent pr-4 group-hover:scale-105 transition-transform duration-300">
                                        {faq.question}
                                    </span>
                                    <motion.div
                                        animate={{ rotate: expandedQuestion === index ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="text-orange-500 group-hover:scale-110 transition-transform duration-300"
                                    >
                                        <HelpCircle className="w-6 h-6" />
                                    </motion.div>
                                </button>
                                
                                <AnimatePresence>
                                    {expandedQuestion === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="px-6 pb-6"
                                        >
                                            <p className="text-blue-200/90 leading-relaxed text-lg">
                                                {faq.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {visibleQuestions < filteredFaqs.length && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mt-16"
                    >
                        <button
                            className="group px-10 py-5 bg-gradient-to-r from-orange-500 to-blue-500 text-white rounded-2xl font-bold
                                     text-xl transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/20
                                     focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 relative overflow-hidden"
                            onClick={handleShowMore}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Load More Questions
                                <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </button>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default FaqSection;