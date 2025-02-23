'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Line, Text, Html } from '@react-three/drei'
import { useMemo, useEffect, useState } from 'react'
import * as THREE from 'three'

interface PricePoint {
  timestamp: number
  open: number
  high: number
  low: number
  close: number
  volume: number
  ma7: number
  ma21: number
}

function calculateMA(data: PricePoint[], period: number): number[] {
  return data.map((_, index) => {
    const start = Math.max(0, index - period + 1)
    const values = data.slice(start, index + 1).map(d => d.close)
    return values.reduce((a, b) => a + b, 0) / values.length
  })
}

function generateMarketData(numPoints: number, prevData: PricePoint[] = []): PricePoint[] {
  const data: PricePoint[] = []
  const basePrice = prevData.length ? prevData[prevData.length - 1].close : 100
  const volatility = 0.5
  const trend = Math.random() - 0.5 // Random trend bias
  
  for (let i = 0; i < numPoints; i++) {
    const time = Date.now() - (numPoints - i) * 1000
    const noise = (Math.random() - 0.5) * volatility
    const trendEffect = trend * i * 0.05
    
    const open = i === 0 ? basePrice : data[i - 1].close
    const change = noise + trendEffect
    const close = open + change
    const high = Math.max(open, close) + Math.random() * volatility
    const low = Math.min(open, close) - Math.random() * volatility
    const volume = Math.abs(change) * (Math.random() * 100 + 50)
    
    data.push({
      timestamp: time,
      open,
      high,
      low,
      close,
      volume,
      ma7: 0,
      ma21: 0
    })
  }

  // Calculate moving averages
  const allData = [...prevData.slice(-21), ...data]
  const ma7Values = calculateMA(allData, 7)
  const ma21Values = calculateMA(allData, 21)
  
  return data.map((point, i) => ({
    ...point,
    ma7: ma7Values[prevData.length + i],
    ma21: ma21Values[prevData.length + i]
  }))
}

function Graph() {
  const [marketData, setMarketData] = useState<PricePoint[]>(generateMarketData(50))
  const [currentPrice, setCurrentPrice] = useState<number>(100)
  const [priceChange, setPriceChange] = useState<number>(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prevData => {
        const newData = generateMarketData(1, prevData)
        const updatedData = [...prevData.slice(1), ...newData]
        setCurrentPrice(newData[0].close)
        setPriceChange(((newData[0].close - prevData[0].close) / prevData[0].close) * 100)
        return updatedData
      })
    }, 1000)
    
    return () => clearInterval(interval)
  }, [])

  // Generate price lines
  const mainLine = useMemo(() => {
    return marketData.map((point, index) => {
      const x = (index - 25) * 0.2
      const y = (point.close - 100) * 0.2
      return new THREE.Vector3(x, y, 0)
    })
  }, [marketData])

  const ma7Line = useMemo(() => {
    return marketData.map((point, index) => {
      const x = (index - 25) * 0.2
      const y = (point.ma7 - 100) * 0.2
      return new THREE.Vector3(x, y, 0)
    })
  }, [marketData])

  const ma21Line = useMemo(() => {
    return marketData.map((point, index) => {
      const x = (index - 25) * 0.2
      const y = (point.ma21 - 100) * 0.2
      return new THREE.Vector3(x, y, 0)
    })
  }, [marketData])

  return (
    <>
      {/* Main price line */}
      <Line
        points={mainLine}
        color={priceChange >= 0 ? "#22c55e" : "#ef4444"}
        lineWidth={2}
        segments
      />

      {/* Moving averages */}
      <Line points={ma7Line} color="#3b82f6" lineWidth={1.5} segments />
      <Line points={ma21Line} color="#f59e0b" lineWidth={1.5} segments />

      {/* Candlesticks */}
      {marketData.map((point, index) => {
        const x = (index - 25) * 0.2
        const isGreen = point.close >= point.open
        return (
          <group key={index} position={[x, 0, 0]}>
            {/* Body */}
            <mesh position={[0, ((point.open + point.close) / 2 - 100) * 0.2, 0]}>
              <boxGeometry args={[0.1, Math.abs(point.close - point.open) * 0.2, 0.1]} />
              <meshStandardMaterial color={isGreen ? "#22c55e" : "#ef4444"} />
            </mesh>
            {/* Wick */}
            <mesh position={[0, ((point.high + point.low) / 2 - 100) * 0.2, 0]}>
              <boxGeometry args={[0.02, Math.abs(point.high - point.low) * 0.2, 0.02]} />
              <meshStandardMaterial color={isGreen ? "#22c55e" : "#ef4444"} />
            </mesh>
          </group>
        )
      })}

      {/* Volume bars */}
      {marketData.map((point, index) => {
        const x = (index - 25) * 0.2
        const height = point.volume * 0.001
        return (
          <mesh
            key={`volume-${index}`}
            position={[x, -3 + height / 2, 0]}
            scale={[0.15, height, 0.1]}
          >
            <boxGeometry />
            <meshStandardMaterial
              color={point.close >= point.open ? "#22c55e44" : "#ef444444"}
              transparent
              opacity={0.5}
            />
          </mesh>
        )
      })}

      {/* Price levels */}
      <Html position={[-5.8, 0, 0]} center>
        <div className="text-white text-xs font-mono bg-black/50 px-2 py-1 rounded">
          ${currentPrice.toFixed(2)}
        </div>
      </Html>

      {/* Indicators */}
      <Html position={[5.8, 3, 0]}>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-0.5 bg-blue-500" />
            <span className="text-blue-500">MA7</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-0.5 bg-yellow-500" />
            <span className="text-yellow-500">MA21</span>
          </div>
        </div>
      </Html>
    </>
  )
}

export default function TradingGraph3D() {
  return (
    <div className="w-full h-[500px] relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-orange-500/5 rounded-xl backdrop-blur-sm" />
      
      {/* Trading interface overlay */}
      <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg p-4 z-10 border border-white/10">
        <div className="flex items-center gap-4">
          <div>
            <div className="text-white/60 text-sm mb-1">BTC/USD</div>
            <div className="text-2xl font-bold text-green-400">$43,567.89</div>
          </div>
          <div className="border-l border-white/10 pl-4">
            <div className="text-white/60 text-sm mb-1">24h Change</div>
            <div className="text-lg font-medium text-green-400">+2.34%</div>
          </div>
        </div>
      </div>

      <Canvas
        camera={{ position: [0, 0, 15], fov: 45 }}
        className="rounded-xl"
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Graph />
        <OrbitControls
          enableZoom={false}
          autoRotate={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
          enableRotate={false}
        />
        <gridHelper args={[10, 20, '#1a365d', '#1a365d']} />
      </Canvas>
    </div>
  )
} 