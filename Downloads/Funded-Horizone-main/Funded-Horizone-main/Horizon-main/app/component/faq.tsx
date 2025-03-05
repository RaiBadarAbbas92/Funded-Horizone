"use client"

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface ForexRate {
  pair: string;
  rate: number;
  prevRate: number;
}

// Mock API function
const fetchForexRates = (): Promise<ForexRate[]> => {
  const forexPairs = [
    { pair: 'EUR/USD', rate: 1.1234, prevRate: 1.1234 },
    { pair: 'GBP/USD', rate: 1.3456, prevRate: 1.3456 },
    { pair: 'USD/JPY', rate: 110.78, prevRate: 110.78 },
    { pair: 'USD/CHF', rate: 0.9876, prevRate: 0.9876 },
    { pair: 'AUD/USD', rate: 0.7654, prevRate: 0.7654 },
    { pair: 'USD/CAD', rate: 1.2345, prevRate: 1.2345 },
    { pair: 'NZD/USD', rate: 0.6789, prevRate: 0.6789 },
  ];

  const updatedRates = forexPairs.map(pair => ({
    ...pair,
    prevRate: pair.rate,
    rate: pair.rate + (Math.random() - 0.5) * 0.01
  }));

  return new Promise(resolve => {
    setTimeout(() => resolve(updatedRates), 500);
  });
};

function ForexCard({ pair, rate, prevRate }: ForexRate) {
  const trend = rate > prevRate ? 'up' : rate < prevRate ? 'down' : null;

  return (
    <motion.div
      className="bg-blue-900 rounded-lg shadow-lg p-4 w-48 text-white"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <h3 className="text-lg font-bold mb-2">{pair}</h3>
      <div className="flex items-center justify-between">
        <p className="text-2xl font-semibold">{rate.toFixed(4)}</p>
        {trend === 'up' && <TrendingUp className="text-green-400" />}
        {trend === 'down' && <TrendingDown className="text-red-400" />}
      </div>
    </motion.div>
  );
}

function ForexRatesSection() {
  const [forexRates, setForexRates] = useState<ForexRate[]>([]);

  useEffect(() => {
    const fetchRates = async () => {
      const data = await fetchForexRates();
      setForexRates(data);
    };

    fetchRates();
    const interval = setInterval(fetchRates, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-900">Real-Time Forex Rates</h2>
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {forexRates.map((rate, index) => (
            <motion.div
              key={rate.pair}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ForexCard {...rate} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="bg-gray-900 min-h-screen">
      <ForexRatesSection />
    </main>
  );
}

