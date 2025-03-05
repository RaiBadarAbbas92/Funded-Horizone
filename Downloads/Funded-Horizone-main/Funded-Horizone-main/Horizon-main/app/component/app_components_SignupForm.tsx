'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from 'framer-motion'

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    country: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
    // Here you would typically send the data to your backend
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 }
    }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full min-h-screen p-4 flex items-center justify-center bg-gradient-to-br from-blue-950 to-black"
    >
      <Card className="w-full max-w-4xl bg-black/80 border border-green-500 backdrop-blur-lg shadow-xl">
        <CardHeader className="px-6 py-8">
          <motion.div variants={itemVariants}>
            <CardTitle className="text-2xl md:text-3xl lg:text-4xl text-center text-green-500 font-bold">
              Sign Up for Trading Prop Firm
            </CardTitle>
          </motion.div>
        </CardHeader>
        <CardContent className="px-6 pb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div 
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="name" className="text-green-400">Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  required 
                  onChange={handleChange} 
                  className="bg-white/10 border-green-500/50 focus:border-green-500 transition-colors"
                />
              </motion.div>
              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="username" className="text-green-400">Username</Label>
                <Input 
                  id="username" 
                  name="username" 
                  required 
                  onChange={handleChange} 
                  className="bg-white/10 border-green-500/50 focus:border-green-500 transition-colors"
                />
              </motion.div>
              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="email" className="text-green-400">Email</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  required 
                  onChange={handleChange} 
                  className="bg-white/10 border-green-500/50 focus:border-green-500 transition-colors"
                />
              </motion.div>
              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="password" className="text-green-400">Password</Label>
                <Input 
                  id="password" 
                  name="password" 
                  type="password" 
                  required 
                  onChange={handleChange} 
                  className="bg-white/10 border-green-500/50 focus:border-green-500 transition-colors"
                />
              </motion.div>
              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="phone" className="text-green-400">Phone (with country code)</Label>
                <Input 
                  id="phone" 
                  name="phone" 
                  type="tel" 
                  required 
                  onChange={handleChange} 
                  className="bg-white/10 border-green-500/50 focus:border-green-500 transition-colors"
                />
              </motion.div>
              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="address" className="text-green-400">Address</Label>
                <Input 
                  id="address" 
                  name="address" 
                  required 
                  onChange={handleChange} 
                  className="bg-white/10 border-green-500/50 focus:border-green-500 transition-colors"
                />
              </motion.div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="space-y-2">
              <Label htmlFor="country" className="text-green-400">Country</Label>
              <Select 
                name="country" 
                onValueChange={(value) => setFormData({ ...formData, country: value })}
              >
                <SelectTrigger className="bg-white/10 border-green-500/50 focus:border-green-500">
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent className="bg-black/95 border-green-500">
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="ca">Canada</SelectItem>
                  <SelectItem value="au">Australia</SelectItem>
                  <SelectItem value="eu">European Union</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-green-500/20"
              >
                Sign Up
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
