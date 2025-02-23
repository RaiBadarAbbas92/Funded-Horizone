'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
    // Here you would typically send the data to your backend
  }

  return (
    <Card className="w-full max-w-md bg-black/80 border border-green-500">
      <CardHeader>
        <CardTitle className="text-2xl text-center text-green-500">Log In to Trading Prop Firm</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required onChange={handleChange} className="bg-white/10" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required onChange={handleChange} className="bg-white/10" />
          </div>
          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">Log In</Button>
        </form>
      </CardContent>
    </Card>
  )
}

