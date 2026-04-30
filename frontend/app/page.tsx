import { Button } from "./components/ui/button"
import { User, Lightbulb, Users } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          {/* Logo */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center">
              <span className="text-white text-2xl font-bold">N</span>
            </div>
            <span className="ml-3 text-3xl font-bold text-slate-800">NeoMeet</span>
          </div>

          {/* Tagline */}
          <div className="space-y-1 mb-8">
            <h1 className="text-4xl font-bold text-slate-800 text-balance">Connect,</h1>
            <h1 className="text-4xl font-bold text-slate-800 text-balance">Learn,</h1>
            <h1 className="text-4xl font-bold text-slate-800 text-balance">Collaborate</h1>
          </div>

          {/* Feature Icons */}
          <div className="flex justify-center gap-4 mb-12">
            <div className="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="w-20 h-20 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Lightbulb className="w-8 h-8 text-white" />
            </div>
            <div className="w-20 h-20 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        {/* Auth Buttons */}
        <div className="space-y-4">
          <Link href="/login" className="block">
            <Button className="w-full h-14 text-lg font-semibold bg-blue-500 hover:bg-blue-600 text-white rounded-2xl shadow-lg">
              Login
            </Button>
          </Link>

          <Link href="/signup" className="block">
            <Button
              variant="ghost"
              className="w-full h-14 text-lg font-semibold text-slate-700 hover:text-slate-900 rounded-2xl"
            >
              Sign up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
