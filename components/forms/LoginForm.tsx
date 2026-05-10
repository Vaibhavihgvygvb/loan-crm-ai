"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "@/hooks/useAuth";
import { toast } from "sonner";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useLogin();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await login({
        email,
        password,
      });

      toast.success(
        "Login successful"
      );

      router.push(
        "/dashboard"
      );
    } catch {
      toast.error(
        "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={
        handleSubmit
      }
      className="space-y-4 max-w-md mx-auto bg-white p-8 rounded-xl border border-slate-200"
    >
      <h2 className="text-2xl font-bold">
        Login
      </h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(
            e.target.value
          )
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(
            e.target.value
          )
        }
      />

      <button
        type="submit"
        disabled={
          loading
        }
        className="w-full bg-slate-900 text-white py-3 rounded-lg"
      >
        {loading
          ? "Logging in..."
          : "Login"}
      </button>
    </form>
  );
  <p className="text-sm text-center mt-4">
  Don’t have an account?{" "}
  <Link
    href="/register"
    className="font-medium underline"
  >
    Create account
  </Link>
</p>
}