import { NextResponse } from 'next/server';

let forexPairs = [
  { pair: 'EUR/USD', rate: 1.1234, prevRate: 1.1234 },
  { pair: 'GBP/USD', rate: 1.3456, prevRate: 1.3456 },
  { pair: 'USD/JPY', rate: 110.78, prevRate: 110.78 },
  { pair: 'USD/CHF', rate: 0.9876, prevRate: 0.9876 },
  { pair: 'AUD/USD', rate: 0.7654, prevRate: 0.7654 },
  { pair: 'USD/CAD', rate: 1.2345, prevRate: 1.2345 },
  { pair: 'NZD/USD', rate: 0.6789, prevRate: 0.6789 },
];

export async function GET() {
  try {
    const updatedRates = forexPairs.map(pair => {
      const newRate = pair.rate + (Math.random() - 0.5) * 0.01;
      return {
        ...pair,
        prevRate: pair.rate,
        rate: newRate
      };
    });

    forexPairs = updatedRates;
    return NextResponse.json(updatedRates);
  } catch (error) {
    console.error('Forex rate update failed:', error);
    return NextResponse.json(
      { error: 'Failed to update forex rates' },
      { status: 500 }
    );
  }
}

