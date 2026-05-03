import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Building2,
  ArrowRight,
  Loader2,
} from "lucide-react";

import { useAuth } from "./auth";
import { api } from "./api";

const BG_IMAGE =
  "https://images.unsplash.com/photo-1764889744736-b92830365267?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600";

export default function Login() {
  const [isLogin, setIsLogin] =
    useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] =
    useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    if (
      !form.email ||
      !form.password ||
      (!isLogin && !form.name)
    ) {
      toast.error(
        "Please fill all fields"
      );
      return;
    }

    setLoading(true);

    try {
      const endpoint = isLogin
        ? "/login"
        : "/register";

      const result = await api(
        endpoint,
        {
          method: "POST",
          body: JSON.stringify(form),
        }
      );

      if (result.user_id) {
        login(result);

        toast.success(
          isLogin
            ? "Login successful"
            : "Account created"
        );

        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(
        error.message ||
          "Authentication failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-5 bg-stone-50">
      <div className="lg:col-span-2 px-10 py-10 flex flex-col">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-900 text-white rounded-md flex items-center justify-center">
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

        <div className="flex-1 flex items-center">
          <div className="w-full max-w-md">
            <h1 className="text-4xl font-heading mb-4">
              {isLogin
                ? "Welcome Back"
                : "Create Account"}
            </h1>

            <form
              onSubmit={submit}
              className="space-y-4"
            >
              {!isLogin && (
                <input
                  className="crm-input"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name:
                        e.target.value,
                    })
                  }
                />
              )}

              <input
                type="email"
                className="crm-input"
                placeholder="Email"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email:
                      e.target.value,
                  })
                }
              />

              <input
                type="password"
                className="crm-input"
                placeholder="Password"
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password:
                      e.target.value,
                  })
                }
              />

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full"
              >
                {loading ? (
                  <Loader2 className="animate-spin w-4 h-4" />
                ) : (
                  <>
                    {isLogin
                      ? "Sign In"
                      : "Create Account"}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <button
              onClick={() =>
                setIsLogin(
                  !isLogin
                )
              }
              className="mt-4 text-sm"
            >
              {isLogin
                ? "Create account"
                : "Already have an account?"}
            </button>
          </div>
        </div>
      </div>

      <div className="hidden lg:block lg:col-span-3 relative">
        <img
          src={BG_IMAGE}
          alt="Banking"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
}