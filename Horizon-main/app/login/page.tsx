"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/header"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")

  // Dummy login credentials
  const validCredentials = [
    { email: "admin@horizon.com", password: "admin123" },
    { email: "manager@horizon.com", password: "manager456" },
    { email: "support@horizon.com", password: "support789" },
    { email: "analyst@horizon.com", password: "analyst321" },
    { email: "staff@horizon.com", password: "staff654" }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const isValidUser = validCredentials.some(
        cred => cred.email === formData.email && cred.password === formData.password
      )

      if (isValidUser) {
        // Set the admin token in cookies and localStorage
        const token = "your-secure-token"
        document.cookie = `admin-token=${token}; path=/`
        localStorage.setItem('admin-token', token)
        router.push("/adminportal")
      } else {
        setError("Invalid credentials")
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-[#0a1929]">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-orange-500/5 blur-3xl" />
      </div>

      <Header />

      <div className="container relative z-10 py-20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-gradient-to-br from-[#0d2339]/90 to-[#132f4c]/90 rounded-xl border border-gray-800/50 p-8 backdrop-blur-sm shadow-xl">
            <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Admin Login
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/5 border-gray-800/50 text-white"
                  required
                />
              </div>

              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-white/5 border-gray-800/50 text-white"
                  required
                />
              </div>

              {error && (
                <p className="text-red-400 text-sm text-center">{error}</p>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white"
              >
                Login
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}