"use client";

import { useAuthInit } from "@/hooks/useAuth";

export default function AuthInitializer() {
  useAuthInit();

  return null;
}