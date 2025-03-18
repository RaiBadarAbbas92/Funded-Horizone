"use client"
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Sparkles, Search, BookOpen, Target, Shield, Wallet, Clock, AlertTriangle, Zap, Layers, StepForward } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const hftNeoCategories = [
    {
        title: "Challenge Phase Rules",
        icon: Target,
        faqs: [
            {
                question: "What are the Challenge Phase Trading Objectives?",
                answer: `• Profit Target: 8%
• Daily Drawdown: 5%
• Overall Drawdown Limit: 10%
• Minimum Trading Days: 0`
            },
            {
                question: "What are the Challenge Phase Trading Permissions?",
                answer: `• News Trading: Allowed
• Overnight Holding: Allowed
• Weekend Holding: Prohibited – All trades must be closed before market closes on Friday
• HFT Bots: Allowed during challenge phase
• Minimum Trade Duration: All trades must be held for at least 2 minutes before closing`
            }
        ]
    },
    {
        title: "Funded Phase Rules",
        icon: Shield,
        faqs: [
            {
                question: "What are the Funded Phase Trading Restrictions?",
                answer: `• Expert Advisors (EA) Prohibited: No automated trading systems allowed
• Hedging: Only allowed within the same account, cross-account hedging prohibited
• Weekend Holding: Strictly prohibited (Hard Breach)
• Trading Layers: Maximum 2 layers allowed, exceeding results in account breach
• Martingale Strategy: Not allowed
• Minimum Trade Duration: 2 minutes minimum hold time`
            }
        ]
    },
    {
        title: "Profit & Risk Rules",
        icon: Wallet,
        faqs: [
            {
                question: "What is the 35% Maximum Trade Profit Rule?",
                answer: `• No single trade can exceed 35% of total period profits
• Trades within 2-minute window count as one trade
• Daily payout limit: 35% maximum from single trade
• Exceeding limits may result in profit reduction or trade adjustments`
            },
            {
                question: "How does the Lot Size Consistency Rule work?",
                answer: `• Calculate your average lot size: Total lots ÷ Total trades
• Minimum allowed = Average × 0.25
• Maximum allowed = Average × 2.00
• Example: For 2 lot average
  - Minimum: 0.5 lots
  - Maximum: 4 lots
• Trades outside range excluded from withdrawal calculations
• Multiple trades within 2 minutes count as one position`
            }
        ]
    },
    {
        title: "Payouts & Withdrawals",
        icon: Clock,
        faqs: [
            {
                question: "How are profits distributed?",
                answer: `• Profit share ranges from 50% to 90%
• Withdrawals processed bi-weekly
• Final amount based on trader performance and agreement terms
• Trades must follow lot size consistency rules
• All trading rules must be followed for withdrawal eligibility`
            }
        ]
    }
];

const oneStepCategories = [
    {
        title: "Challenge Phase Rules",
        icon: Target,
        faqs: [
            {
                question: "What are the Challenge Phase Trading Objectives?",
                answer: `• Profit Target: 10%
• Daily Drawdown: 4%
• Overall Drawdown Limit: 10%
• Minimum Trading Days: 5`
            },
            {
                question: "What are the Challenge Phase Trading Permissions?",
                answer: `• News Trading: Allowed
• Overnight Holding: Allowed
• Weekend Holding: Prohibited – Trades must be closed before market closes on Friday
• EA (Expert Advisor): Allowed during Phase 1
• HFT Bots: Not Allowed during Phase 1
• Minimum Trade Duration: All trades must be held for at least 2 minutes before closing`
            }
        ]
    },
    {
        title: "Funded Phase Rules",
        icon: Shield,
        faqs: [
            {
                question: "What are the Funded Phase Trading Restrictions?",
                answer: `• Expert Advisors (EA) Prohibited: No automated trading systems allowed
• Hedging: Only allowed within the same account, cross-account hedging prohibited
• Weekend Holding: Strictly prohibited (Hard Breach)
• Trading Layers: Maximum 2 layers allowed, exceeding results in account breach
• Martingale Strategy: Not allowed
• Minimum Trade Duration: 2 minutes minimum hold time`
            }
        ]
    },
    {
        title: "Profit & Risk Rules",
        icon: Wallet,
        faqs: [
            {
                question: "What is the 35% Maximum Trade Profit Rule?",
                answer: `1. Maximum Trade Profit Rule:
• No single trade can exceed 35% of total period profits
• Applies to traders who passed the 1-Step ALGO
• Ensures consistent strategy over relying on few big trades

2. Two-Minute Window Rule:
• Trades within 2 minutes count as one trade for 35% limit

3. Daily Payout Limit:
• Maximum 35% profit from single trade per day
• Promotes steady performance

4. Exceeding Limits:
• Penalties may include profit reduction
• Trade count adjustments based on policies
• Encourages balanced trading approach`
            }
        ]
    },
    {
        title: "Payouts & Withdrawals",
        icon: Clock,
        faqs: [
            {
                question: "How are profits distributed?",
                answer: `• Profit share ranges from 50% to 80%
• Withdrawals processed bi-weekly
• Final amount based on trader performance
• Must follow all trading rules for eligibility`
            }
        ]
    }
];

const twoStepCategories = [
    {
        title: "Challenge Phase Rules",
        icon: Target,
        faqs: [
            {
                question: "What are the Challenge Phase Trading Objectives?",
                answer: `• Profit Target First Phase: 10%
• Profit Target Second Phase: 5%
• Daily Drawdown: 5%
• Overall Drawdown Limit: 10%
• Minimum Trading Days: 0`
            },
            {
                question: "What are the Challenge Phase Trading Permissions?",
                answer: `• News Trading: Allowed
• Overnight Holding: Allowed
• Weekend Holding: Prohibited – Trades must be closed before market closes on Friday
• EA (Expert Advisor): Allowed
• HFT Bots: Not Allowed
• Minimum Trade Duration: All trades must be held for at least 2 minutes before closing`
            }
        ]
    },
    {
        title: "Funded Phase Rules",
        icon: Shield,
        faqs: [
            {
                question: "What are the Funded Phase Trading Restrictions?",
                answer: `• Expert Advisors (EA) Prohibited: No automated trading systems allowed
• Hedging: Only allowed within the same account, cross-account hedging prohibited
• Weekend Holding: Strictly prohibited (Hard Breach)
• Trading Layers: Maximum 2 layers allowed, exceeding results in account breach
• Martingale Strategy: Not allowed
• Minimum Trade Duration: 2 minutes minimum hold time`
            }
        ]
    },
    {
        title: "Profit & Risk Rules",
        icon: Wallet,
        faqs: [
            {
                question: "What are the profit allocation and withdrawal rules?",
                answer: `• Profit share ranges from 50% to 80%
• Withdrawals processed bi-weekly
• 6% Profit Cap per Payout Cycle: Maximum withdrawal of 6% profit per cycle
• Ensures controlled and steady growth
• All trading rules must be followed for withdrawal eligibility

These guidelines maintain a fair, disciplined, and sustainable trading environment for all Two-Step traders.`
            }
        ]
    }
];

const FaqSection: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedCategory, setExpandedCategory] = useState<number | null>(0);
    const [expandedQuestions, setExpandedQuestions] = useState<{[key: number]: number[]}>({0: []});
    const [activeTab, setActiveTab] = useState<'hft' | 'onestep' | 'twostep'>('hft');

    const handleTabChange = (tab: 'hft' | 'onestep' | 'twostep') => {
        setActiveTab(tab);
        setExpandedCategory(0); // Reset expanded category when switching tabs
        setExpandedQuestions({0: []}); // Reset expanded questions
        setSearchTerm(''); // Clear search when switching tabs
    };

    const handleCategoryToggle = (categoryIndex: number) => {
        setExpandedCategory(expandedCategory === categoryIndex ? null : categoryIndex);
        if (!expandedQuestions[categoryIndex]) {
            setExpandedQuestions({...expandedQuestions, [categoryIndex]: []});
        }
    };

    const handleQuestionToggle = (categoryIndex: number, questionIndex: number) => {
        const currentExpanded = expandedQuestions[categoryIndex] || [];
        const newExpanded = currentExpanded.includes(questionIndex)
            ? currentExpanded.filter(i => i !== questionIndex)
            : [...currentExpanded, questionIndex];
        setExpandedQuestions({...expandedQuestions, [categoryIndex]: newExpanded});
    };

    const currentCategories = 
        activeTab === 'hft' ? hftNeoCategories : 
        activeTab === 'onestep' ? oneStepCategories :
        twoStepCategories;

    const filteredCategories = currentCategories.map(category => ({
        ...category,
        faqs: category.faqs.filter(faq =>
            faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })).filter(category => category.faqs.length > 0);

    return (
        <section className="relative py-12 sm:py-20 md:py-32 bg-[#0A0F1C] overflow-hidden min-h-screen">
            {/* Background effects */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 via-purple-900/20 to-transparent" />
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full blur-[120px] opacity-20" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full blur-[120px] opacity-20" />
            
            <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Enhanced header section */}
                <div className="text-center mb-8 sm:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-4 sm:mb-6"
                    >
                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 animate-pulse" />
                        <span className="text-sm sm:text-base text-blue-200 font-semibold tracking-wide">Choose Your Program</span>
                    </motion.div>
                    
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 via-red-500 to-blue-600 bg-clip-text text-transparent mb-4 sm:mb-6"
                    >
                        Trading Rules & Requirements
                    </motion.h2>
                </div>

                {/* Updated tab navigation with three options - now mobile responsive */}
                <div className="max-w-5xl mx-auto mb-8 sm:mb-16">
                    <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8 sm:mb-12">
                        <button
                            onClick={() => handleTabChange('hft')}
                            className={`flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-base sm:text-lg font-semibold transition-all duration-300 ${
                                activeTab === 'hft'
                                ? 'bg-gradient-to-r from-orange-500 to-blue-500 text-white shadow-lg shadow-orange-500/20 scale-[1.02] sm:scale-105'
                                : 'bg-blue-900/20 text-blue-200 hover:bg-blue-900/30'
                            }`}
                        >
                            <Zap className={`w-5 h-5 sm:w-6 sm:h-6 ${activeTab === 'hft' ? 'text-yellow-400 animate-pulse' : 'text-blue-400'}`} />
                            <div className="flex flex-col items-start">
                                <span className="text-xs sm:text-sm opacity-80">Program 1</span>
                                <span>HFT-NEO</span>
                            </div>
                        </button>
                        <button
                            onClick={() => handleTabChange('onestep')}
                            className={`flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-base sm:text-lg font-semibold transition-all duration-300 ${
                                activeTab === 'onestep'
                                ? 'bg-gradient-to-r from-orange-500 to-blue-500 text-white shadow-lg shadow-orange-500/20 scale-[1.02] sm:scale-105'
                                : 'bg-blue-900/20 text-blue-200 hover:bg-blue-900/30'
                            }`}
                        >
                            <Layers className={`w-5 h-5 sm:w-6 sm:h-6 ${activeTab === 'onestep' ? 'text-yellow-400 animate-pulse' : 'text-blue-400'}`} />
                            <div className="flex flex-col items-start">
                                <span className="text-xs sm:text-sm opacity-80">Program 2</span>
                                <span>One-Step</span>
                            </div>
                        </button>
                        <button
                            onClick={() => handleTabChange('twostep')}
                            className={`flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-base sm:text-lg font-semibold transition-all duration-300 ${
                                activeTab === 'twostep'
                                ? 'bg-gradient-to-r from-orange-500 to-blue-500 text-white shadow-lg shadow-orange-500/20 scale-[1.02] sm:scale-105'
                                : 'bg-blue-900/20 text-blue-200 hover:bg-blue-900/30'
                            }`}
                        >
                            <StepForward className={`w-5 h-5 sm:w-6 sm:h-6 ${activeTab === 'twostep' ? 'text-yellow-400 animate-pulse' : 'text-blue-400'}`} />
                            <div className="flex flex-col items-start">
                                <span className="text-xs sm:text-sm opacity-80">Program 3</span>
                                <span>Two-Step</span>
                            </div>
                        </button>
                    </div>

                    {/* Search bar with mobile optimization */}
                    <div className="relative group mx-4 sm:mx-0 mb-8 sm:mb-12">
                        <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-red-500 to-blue-600 rounded-xl sm:rounded-2xl opacity-30 group-hover:opacity-50 transition duration-300 blur-lg"></div>
                        <div className="relative bg-blue-900/40 rounded-xl sm:rounded-2xl backdrop-blur-sm">
                            <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-blue-400/50 h-4 w-4 sm:h-5 sm:w-5" />
                            <input
                                type="text"
                                placeholder={`Search ${activeTab === 'hft' ? 'HFT-NEO' : activeTab === 'onestep' ? 'One-Step' : 'Two-Step'} rules...`}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full py-3 sm:py-4 px-10 sm:px-12 rounded-xl sm:rounded-2xl bg-transparent border border-blue-500/20 text-sm sm:text-base text-white placeholder-blue-400/50 focus:outline-none focus:border-blue-500/40 transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* FAQ Grid with mobile-first design */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mx-4 sm:mx-0">
                    {filteredCategories.map((category, categoryIndex) => (
                        <motion.div
                            key={categoryIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: categoryIndex * 0.1 }}
                            className="flex flex-col group bg-blue-900/20 border border-blue-500/20 rounded-xl sm:rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 backdrop-blur-sm"
                        >
                            <button
                                className="w-full p-4 sm:p-6 flex items-center justify-between text-left bg-gradient-to-r from-blue-900/40 to-purple-900/40"
                                onClick={() => handleCategoryToggle(categoryIndex)}
                            >
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/20 group-hover:border-blue-400/30 transition-colors">
                                        {React.createElement(category.icon, { 
                                            className: "w-5 h-5 sm:w-6 sm:h-6 text-blue-400 group-hover:text-blue-300 transition-colors" 
                                        })}
                                    </div>
                                    <span className="text-lg sm:text-xl font-semibold text-white group-hover:text-blue-300 transition-colors">
                                        {category.title}
                                    </span>
                                </div>
                                <motion.div
                                    animate={{ rotate: expandedCategory === categoryIndex ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                                </motion.div>
                            </button>
                            
                            <AnimatePresence>
                                {expandedCategory === categoryIndex && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex-1 border-t border-blue-500/20"
                                    >
                                        {category.faqs.map((faq, faqIndex) => (
                                            <div 
                                                key={faqIndex} 
                                                className="border-b border-blue-500/10 last:border-0"
                                            >
                                                <button
                                                    className="w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between text-left hover:bg-blue-500/5 transition-colors"
                                                    onClick={() => handleQuestionToggle(categoryIndex, faqIndex)}
                                                >
                                                    <span className="text-base sm:text-lg text-blue-100 group-hover:text-white transition-colors pr-3 sm:pr-4">
                                                        {faq.question}
                                                    </span>
                                                    <motion.div
                                                        animate={{ 
                                                            rotate: expandedQuestions[categoryIndex]?.includes(faqIndex) ? 180 : 0 
                                                        }}
                                                        transition={{ duration: 0.2 }}
                                                        className="flex-shrink-0"
                                                    >
                                                        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                                                    </motion.div>
                                                </button>
                                                
                                                <AnimatePresence>
                                                    {expandedQuestions[categoryIndex]?.includes(faqIndex) && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.2 }}
                                                            className="px-4 sm:px-6 pb-4 sm:pb-6 pt-2"
                                                        >
                                                            <p className="text-sm sm:text-base text-blue-200/90 whitespace-pre-line leading-relaxed">
                                                                {faq.answer}
                                                            </p>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FaqSection;
