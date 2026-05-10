"use client";

import { useEffect } from "react";
import { loginUser } from "@/services/auth";
import { useAuthStore } from "@/store/authStore";
import {
  LoginPayload,
} from "@/types/auth";

export const useAuthInit = () => {
  const setAuth =
    useAuthStore(
      (state) => state.setAuth
    );

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    const user =
      localStorage.getItem("user");

    if (
      token &&
      user
    ) {
      setAuth(
        JSON.parse(user),
        token
      );
    }
  }, [setAuth]);
};

export const useLogin = () => {
  const setAuth =
    useAuthStore(
      (state) => state.setAuth
    );

  const login = async (
    payload: LoginPayload
  ) => {
    const data =
      await loginUser(payload);

    setAuth(
      data.user,
      data.token
    );

    return data;
  };

  return {
    login,
  };
};