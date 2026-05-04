import {
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";

import {
  LayoutDashboard,
  FileSignature,
  History,
  Users,
  ScrollText,
  TrendingUp,
  Activity,
  LogOut,
  Building2,
  Search,
  Bell,
} from "lucide-react";

import { useAuth } from "./auth";

const navItems = [
  {
    to: "/dashboard",
    label: "Overview",
    icon: LayoutDashboard,
  },
  {
    to: "/loan-apply",
    label: "Loan Origination",
    icon: FileSignature,
  },
  {
    to: "/history",
    label: "My Applications",
    icon: History,
  },
  {
    to: "/customers",
    label: "Customer 360",
    icon: Users,
  },
  {
    to: "/audit",
    label: "Audit Trail",
    icon: ScrollText,
  },
  {
    to: "/forecast",
    label: "Demand Forecast",
    icon: TrendingUp,
  },
  {
    to: "/drift",
    label: "Model Drift",
    icon: Activity,
  },
];

export default function AppShell() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const initials = (
    user?.name ||
    user?.email ||
    "U"
  )
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex">
      <aside className="hidden lg:flex w-64 flex-col border-r border-stone-200 bg-white h-screen sticky top-0">
        <div className="px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-emerald-900 text-white flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>

            <div>
              <h2 className="font-heading text-lg">
                Meridian
              </h2>
              <p className="text-xs text-stone-500">
                Banking Intelligence
              </p>
            </div>
          </div>
        </div>

        <nav className="px-3 flex-1 space-y-2">
          {navItems.map(
            ({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg ${
                    isActive
                      ? "bg-emerald-900 text-white"
                      : "hover:bg-stone-100"
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                {label}
              </NavLink>
            )
          )}
        </nav>

        <div className="p-4 border-t border-stone-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-stone-900 text-white flex items-center justify-center">
              {initials}
            </div>

            <div className="flex-1">
              <p className="text-sm font-medium">
                {user?.name ||
                  user?.email}
              </p>

              <p className="text-xs text-stone-500">
                Relationship Manager
              </p>
            </div>

            <button
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 text-rose-600" />
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-stone-200 px-6 py-4 flex items-center gap-4">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-3 w-4 h-4 text-stone-400" />

            <input
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>

          <button>
            <Bell className="w-5 h-5" />
          </button>
        </header>

        <main className="flex-1 p-8">
          <Outlet />
        </main>

        <footer className="border-t border-stone-200 px-6 py-4 text-xs text-stone-400">
          ©{" "}
          {new Date().getFullYear()}{" "}
          Bharat Banking Intelligence
        </footer>
      </div>
    </div>
  );
}