"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/services/auth";
import { toast } from "sonner";

export default function RegisterForm() {
  const router = useRouter();

  const [name, setName] =
    useState("");

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

      await registerUser({
        name,
        email,
        password,
      });

      toast.success(
        "Registration successful"
      );

      router.push(
        "/login"
      );
    } catch {
      toast.error(
        "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md mx-auto bg-white p-8 rounded-xl border border-slate-200"
    >
      <h2 className="text-2xl font-bold">
        Register
      </h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) =>
          setName(
            e.target.value
          )
        }
      />

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
        disabled={loading}
        className="w-full bg-slate-900 text-white py-3 rounded-lg"
      >
        {loading
          ? "Registering..."
          : "Register"}
      </button>
    </form>
  );
}