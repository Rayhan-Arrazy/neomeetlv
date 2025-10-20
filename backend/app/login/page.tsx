"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
// --- 1. Import the necessary auth hook and login function ---
import { useAuth } from "../context/AuthContext"
import { login } from "../lib/utils"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  // --- 2. Add state for handling login errors ---
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  // --- 3. Get the login function from the AuthContext ---
  const { login: authLogin } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    // --- 4. Implement the actual API login call ---
    try {
      const response = await login({ email, password, device_name: 'browser' })
      authLogin(response.data.user, response.data.access_token)
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/">
            <Button variant="ghost" size="icon" className="mr-4">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
              <span className="text-white text-lg font-bold">N</span>
            </div>
            <span className="ml-2 text-xl font-bold text-slate-800">NeoMeet</span>
          </div>
        </div>

        <Card className="border-0 shadow-xl rounded-3xl">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-slate-800">Welcome Back</CardTitle>
            <p className="text-slate-600">Sign in to your account</p>
          </CardHeader>

          {/* --- 5. Display the error message if it exists --- */}
          {error && (
            <div className="px-6 pb-4 text-center text-red-500">{error}</div>
          )}

          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700 font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500 pr-12"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex justify-end">
                <Link href="/forgot-password" className="text-sm text-blue-500 hover:text-blue-600">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-lg font-semibold bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-lg"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-slate-600">
                {"Don't have an account? "}
                <Link href="/signup" className="text-blue-500 hover:text-blue-600 font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
