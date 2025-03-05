'use client'

import { createChart, IChartApi } from 'lightweight-charts'
import { useEffect, useRef } from 'react'

interface PriceData {
  time: number
  value: number
}

export default function TradingChart() {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)

  useEffect(() => {
    if (!chartContainerRef.current) return

    // Create Chart
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: 'solid', color: '#0A1428' },
        textColor: '#DDD',
      },
      grid: {
        vertLines: { color: '#1E3A5F' },
        horzLines: { color: '#1E3A5F' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
    })

    chartRef.current = chart

    // Create line series using addSeries
    const lineSeries = chart.addSeries('line', {
      color: '#2962FF',
      lineWidth: 2,
      priceFormat: {
        type: 'price',
        precision: 2,
        minMove: 0.01,
      },
    })

    // Generate initial data
    const currentTime = Math.floor(Date.now() / 1000)
    const initialData = Array.from({ length: 100 }, (_, i) => ({
      time: currentTime - (100 - i) * 60,
      value: 40000 + Math.random() * 1000,
    }))

    lineSeries.setData(initialData)

    // Connect to WebSocket
    const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade')
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.p) {
        lineSeries.update({
          time: Math.floor(data.T / 1000),
          value: parseFloat(data.p)
        })
      }
    }

    // Handle window resize
    const handleResize = () => {
      if (chartRef.current && chartContainerRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth
        })
      }
    }

    window.addEventListener('resize', handleResize)

    // Configure price scale
    chart.priceScale('right').applyOptions({
      scaleMargins: {
        top: 0.1,
        bottom: 0.1,
      },
      borderVisible: false,
    })

    // Configure time scale
    chart.timeScale().applyOptions({
      timeVisible: true,
      secondsVisible: false,
      borderColor: '#1E3A5F',
      rightOffset: 5,
    })

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      ws.close()
      chart.remove()
    }
  }, [])

  return (
    <div className="relative">
      <div ref={chartContainerRef} className="w-full h-[400px]" />
      <div className="absolute top-4 left-4 text-sm text-gray-400 bg-[#0A1428]/80 px-3 py-1 rounded-md backdrop-blur-sm">
        BTC/USDT Live Price
      </div>
    </div>
  )
} 