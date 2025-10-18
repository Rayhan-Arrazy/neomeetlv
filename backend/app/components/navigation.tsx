"use client"

import type React from "react"

import { Button } from "../components/ui/button"
import { Video, Calendar, BookOpen, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function BottomNavigation() {
  const pathname = usePathname()

  const navItems = [
    { href: "/dashboard", icon: "N", label: "Home", isLogo: true },
    { href: "/meetings", icon: Video, label: "Meetings" },
    { href: "/schedule", icon: Calendar, label: "Schedule" },
    { href: "/resources", icon: BookOpen, label: "Resources" },
    { href: "/profile", icon: Settings, label: "Profile" },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-2">
      <div className="max-w-md mx-auto">
        <div className="flex justify-around">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const IconComponent = item.icon as React.ComponentType<{ className?: string }>

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={`flex flex-col items-center gap-1 ${isActive ? "text-blue-500" : "text-slate-600"}`}
                >
                  {item.isLogo ? (
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                        isActive ? "bg-blue-500" : "bg-slate-400"
                      }`}
                    >
                      <span className="text-white text-xs font-bold">{item.icon}</span>
                    </div>
                  ) : (
                    <IconComponent className="w-6 h-6" />
                  )}
                  <span className="text-xs">{item.label}</span>
                </Button>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
