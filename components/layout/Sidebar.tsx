"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  FileText,
  Users,
  ScrollText,
  TrendingUp,
  Activity,
} from "lucide-react";

import {
  ROUTES,
} from "@/utils/constants";

const navItems = [
  {
    label: "Dashboard",
    href: ROUTES.dashboard,
    icon: LayoutDashboard,
  },
  {
    label: "Loan",
    href: ROUTES.loan,
    icon: FileText,
  },
  {
    label: "Customers",
    href: ROUTES.customers,
    icon: Users,
  },
  {
    label: "Audit",
    href: ROUTES.audit,
    icon: ScrollText,
  },
  {
    label: "Forecast",
    href: ROUTES.forecast,
    icon: TrendingUp,
  },
  {
    label: "Drift",
    href: ROUTES.drift,
    icon: Activity,
  },
];

export default function Sidebar() {
  const pathname =
    usePathname();

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-slate-200 p-6">
      <div className="mb-10">
        <h1 className="text-2xl font-bold">
          Loan CRM AI
        </h1>
      </div>

      <nav className="space-y-3">
        {navItems.map(
          (item) => {
            const Icon =
              item.icon;

            const active =
              pathname ===
              item.href;

            return (
              <Link
                key={item.href}
                href={
                  item.href
                }
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  active
                    ? "bg-slate-900 text-white"
                    : "hover:bg-slate-100"
                }`}
              >
                <Icon
                  size={18}
                />
                {
                  item.label
                }
              </Link>
            );
          }
        )}
      </nav>
    </aside>
  );
}