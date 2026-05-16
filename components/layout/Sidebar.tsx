"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Users,
  CreditCard,
  LineChart,
  Settings,
  Zap,
  LayoutDashboard,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/customers", label: "Customers", icon: Users },
  { href: "/billing", label: "Revenue", icon: CreditCard },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 shrink-0 bg-gray-950 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="h-16 flex items-center px-5 border-b border-gray-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-violet-500 flex items-center justify-center">
            <LineChart className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-semibold text-lg">Metric</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                active
                  ? "bg-violet-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Upgrade CTA */}
      <div className="p-4">
        <div className="bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-yellow-300" />
            <span className="text-white text-xs font-semibold">Growth Plan</span>
          </div>
          <p className="text-violet-200 text-xs mb-3">Unlock unlimited customers and advanced analytics.</p>
          <Link
            href="/settings"
            className="block w-full text-center bg-white text-violet-700 text-xs font-semibold py-1.5 rounded-lg hover:bg-violet-50 transition-colors"
          >
            Upgrade to Scale
          </Link>
        </div>
      </div>

      {/* User */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-bold">AJ</span>
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-medium truncate">Alex Johnson</p>
            <p className="text-gray-500 text-xs truncate">alex@acme.io</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
