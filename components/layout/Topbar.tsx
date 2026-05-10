"use client";

import { Bell } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

export default function Topbar() {
  const user =
    useAuthStore(
      (state) => state.user
    );

  const logout =
    useAuthStore(
      (state) => state.logout
    );

  return (
    <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold">
          Welcome back
        </h2>
        <p className="text-sm text-slate-500">
          {user?.name || "User"}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-lg border border-slate-200">
          <Bell size={18} />
        </button>

        <button
          onClick={logout}
          className="px-4 py-2 rounded-lg bg-red-500 text-white"
        >
          Logout
        </button>
      </div>
    </header>
  );

const router = useRouter();

const handleLogout = () => {
  logout();
  router.push("/login");
};
}