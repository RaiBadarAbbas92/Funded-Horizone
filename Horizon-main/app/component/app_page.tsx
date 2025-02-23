"use client"

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ForexRate {
  pair: string;
  rate: number;
  prevRate: number;
  percentChange?: number;
  history: number[];
}

// Generate random rate change
const getRandomRate = (currentRate: number) => {
  const change = (Math.random() - 0.5) * 0.002; // Small random change
  return currentRate + change;
};

// Real Forex API call with history
const fetchForexRates = async (previousRates: ForexRate[] = []): Promise<ForexRate[]> => {
  try {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const data = await response.json();
    const rates = data.rates;

    const forexPairs = [
      { base: 'EUR', quote: 'USD' },
      { base: 'GBP', quote: 'USD' },
      { base: 'JPY', quote: 'USD' },
      { base: 'CHF', quote: 'USD' },
      { base: 'AUD', quote: 'USD' },
      { base: 'CAD', quote: 'USD' },
      { base: 'NZD', quote: 'USD' }
    ];

    return forexPairs.map(({ base, quote }, index) => {
      const prevRate = previousRates[index]?.rate || (1 / rates[base]);
      const currentRate = getRandomRate(prevRate);
      const history = previousRates[index]?.history || [];
      
      return {
        pair: `${base}/${quote}`,
        rate: currentRate,
        prevRate: prevRate,
        percentChange: ((currentRate - prevRate) / prevRate) * 100,
        history: [...history, currentRate].slice(-20) // Keep last 20 points
      };
    });
  } catch (error) {
    console.error('Error fetching forex rates:', error);
    return [];
  }
};

function ForexCard({ pair, rate, prevRate, percentChange, history }: ForexRate) {
  const trend = rate > prevRate ? 'up' : rate < prevRate ? 'down' : null;

  const chartData = {
    labels: [...Array(history.length)].map((_, i) => ''),
    datasets: [{
      data: history,
      fill: false,
      borderColor: trend === 'up' ? '#4ade80' : '#f87171',
      tension: 0.1
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { display: false },
      y: { display: false }
    },
    elements: {
      point: { radius: 0 }
    }
  };

  return (
    <motion.div
      className="bg-gradient-to-br from-indigo-900 to-blue-900 rounded-xl shadow-2xl p-4 w-48 backdrop-blur-lg border border-opacity-20 border-white"
      whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
      whileTap={{ scale: 0.95 }}
      animate={{
        x: [-100, 100],
        transition: {
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear"
        }
      }}
    >
      <h3 className="text-lg font-bold mb-2 text-white tracking-wide">{pair}</h3>
      <div className="h-20 mb-2">
        <Line data={chartData} options={chartOptions} />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <motion.p 
            className="text-2xl font-bold text-white"
            animate={{
              scale: [1, 1.1, 1],
              transition: { duration: 0.3 }
            }}
            key={rate}
          >
            {rate.toFixed(4)}
          </motion.p>
          <div className="flex items-center">
            {trend === 'up' && (
              <motion.div
                initial={{ scale: 0, x: -10 }}
                animate={{ scale: 1, x: 0 }}
                className="flex items-center gap-1 bg-green-500/20 px-2 py-1 rounded-lg"
              >
                <TrendingUp className="text-green-400 h-4 w-4" />
                <span className="text-green-400 text-xs">+{(Math.abs(percentChange || 0)).toFixed(2)}%</span>
              </motion.div>
            )}
            {trend === 'down' && (
              <motion.div
                initial={{ scale: 0, x: -10 }}
                animate={{ scale: 1, x: 0 }}
                className="flex items-center gap-1 bg-red-500/20 px-2 py-1 rounded-lg"
              >
                <TrendingDown className="text-red-400 h-4 w-4" />
                <span className="text-red-400 text-xs">-{(Math.abs(percentChange || 0)).toFixed(2)}%</span>
              </motion.div>
            )}
          </div>
        </div>
        <motion.p 
          className="text-blue-200 text-xs"
          animate={{
            opacity: [0.5, 1],
            transition: { duration: 0.3 }
          }}
          key={prevRate}
        >
          Previous: {prevRate.toFixed(4)}
        </motion.p>
      </div>
    </motion.div>
  );
}

export function ForexRatesSection() {
  const [forexRates, setForexRates] = useState<ForexRate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRates = async () => {
      setIsLoading(true);
      const newData = await fetchForexRates(forexRates);
      setForexRates(newData);
      setIsLoading(false);
    };

    fetchRates();
    const interval = setInterval(fetchRates, 1000); // Update every second

    return () => clearInterval(interval);
  }, [forexRates]);

  return (
    <section className="py-8 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-6">
          <h2 className="text-3xl font-bold text-white mr-4">Live Forex Rates</h2>
          <motion.div
            animate={{ rotate: isLoading ? 360 : 0 }}
            transition={{ duration: 1, repeat: isLoading ? Infinity : 0 }}
          >
            <RefreshCw className="text-blue-400 h-6 w-6" />
          </motion.div>
        </div>
        <motion.div
          className="flex flex-row justify-center gap-4 overflow-x-auto pb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {forexRates.map((rate, index) => (
            <motion.div
              key={rate.pair}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
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
