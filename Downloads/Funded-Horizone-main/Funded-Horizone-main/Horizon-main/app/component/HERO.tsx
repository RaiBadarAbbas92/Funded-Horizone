import React from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Left Content */}
        <motion.div
          className="md:w-1/2"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Formed by <span className="text-green-400">Traders</span> for <span className="text-red-500">Traders</span>
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            Formed Funding is a trader's choice prop firm committed to providing
            a market-friendly space for traders of all experiences to harness their
            skills via our easy simulated program.
          </p>
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg">
            Get Funded →
          </button>
        </motion.div>

        {/* Right Content */}
        <motion.div
          className="md:w-1/2 relative mt-12 md:mt-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          {/* Main Card */}
          <motion.div
            className="absolute top-0 right-16 bg-gray-800 rounded-lg p-6 shadow-lg text-center w-56"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <img
              src="/images/charles.jpg" // Replace with actual image path
              alt="Trader"
              className="w-16 h-16 mx-auto rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Charles</h3>
            <p className="text-green-400 text-2xl font-bold">+10.5%</p>
          </motion.div>

          {/* Funded Amount */}
          <motion.div
            className="absolute top-36 left-0 bg-gray-800 rounded-lg p-6 shadow-lg text-center w-44"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h3 className="text-lg text-gray-300 mb-2">Funded</h3>
            <p className="text-white text-3xl font-bold">$50,000</p>
          </motion.div>

          {/* Trades Profit */}
          <motion.div
            className="absolute bottom-16 right-0 bg-gray-800 rounded-lg p-6 shadow-lg text-center w-44"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h3 className="text-lg text-gray-300 mb-2">Trades up to</h3>
            <p className="text-white text-3xl font-bold">$400k</p>
          </motion.div>

          {/* Small Card */}
          <motion.div
            className="absolute bottom-[-50px] left-8 bg-gray-800 rounded-lg p-4 shadow-lg text-center w-40"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <h3 className="text-sm font-medium text-gray-300 mb-1">Janice</h3>
            <p className="text-green-400 text-lg font-semibold">+$4,000</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
