"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

import {
  Link,
  useRouter,
} from "@/i18n/navigation";

import { useAuth } from "@/context/AuthContext";

import {
  Eye,
  EyeOff,
} from "lucide-react";

export default function LoginPage() {
  const t = useTranslations("Login");

  const router = useRouter();

  const searchParams = useSearchParams();

  const { login } = useAuth();

  const redirect =
    searchParams.get("redirect") ||
    "/dashboard";

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,

      [e.target.name]:
        e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    setLoading(true);

    try {
      /*
      MOCK USER
    Later actual backend response yahan aayega.
      */

      const userData = {
        _id: "USER-001",

        name: "Sandeep Behra",

        email: formData.email,

        mobile: "9876543210",

        profileImage: null,

        role: "user",

        membership: null,
      };

      login(userData);

      /*
      Important:
      User Join Us se login pe aaya tha,
      toh redirect membership/apply hoga.
      */

      router.replace(redirect);

    } catch (error) {
      setError(
        error?.message ||
          t("loginError")
      );
    } finally {
      setLoading(false);
    }
  };

  const signupHref =
    redirect !== "/dashboard"
      ? `/signup?redirect=${encodeURIComponent(
          redirect
        )}`
      : "/signup";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f6f1] px-4 py-12">

      <div className="w-full max-w-md rounded-3xl border border-orange-100 bg-white p-6 shadow-sm sm:p-8">

        <div className="mb-8 text-center">

          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">
            {t("welcome")}
          </p>

          <h1 className="text-3xl font-bold text-gray-900">
            {t("title")}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {t("subtitle")}
          </p>

        </div>

        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* EMAIL */}

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t("email")}
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t(
                "emailPlaceholder"
              )}
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />

          </div>

          {/* PASSWORD */}

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t("password")}
            </label>

            <div className="relative">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                value={
                  formData.password
                }
                onChange={handleChange}
                placeholder={t(
                  "passwordPlaceholder"
                )}
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    (prev) => !prev
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >

                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}

              </button>

            </div>

          </div>

          <div className="text-right">

            <Link
              href="/forgot-password"
              className="text-sm font-semibold text-orange-600 hover:text-orange-700"
            >
              {t("forgotPassword")}
            </Link>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-orange-600 py-3.5 font-semibold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? t("loading")
              : t("button")}
          </button>

        </form>

        <p className="mt-6 text-center text-sm text-gray-500">

          {t("noAccount")}{" "}

          <Link
            href={signupHref}
            className="font-semibold text-orange-600 hover:text-orange-700"
          >
            {t("signup")}
          </Link>

        </p>

      </div>

    </main>
  );
}

// "use client";

// import { useTranslations } from "next-intl";
// import { Link } from "@/i18n/navigation";

// export default function LoginPage() {
//   const t = useTranslations("Login");

//   return (
//     <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
//       <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold">
//             {t("title")}
//           </h1>

//           <p className="text-gray-500 mt-2">
//             {t("subtitle")}
//           </p>
//         </div>

//         <form className="space-y-5">

//           <div>
//             <label className="block text-sm font-medium mb-2">
//               {t("email")}
//             </label>

//             <input
//               type="email"
//               placeholder={t("emailPlaceholder")}
//               className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-2">
//               {t("password")}
//             </label>

//             <input
//               type="password"
//               placeholder={t("passwordPlaceholder")}
//               className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500"
//             />
//           </div>

//           <div className="text-right">
//             <Link
//               href="/forgot-password"
//               className="text-sm text-orange-600"
//             >
//               {t("forgotPassword")}
//             </Link>
//           </div>

//           <button
//             type="submit"
//             className="w-full py-3 rounded-xl bg-orange-600 text-white font-semibold"
//           >
//             {t("button")}
//           </button>

//         </form>

//         <p className="text-center mt-6 text-sm text-gray-500">
//           {t("noAccount")}{" "}
//           <Link
//             href="/signup"
//             className="text-orange-600 font-semibold"
//           >
//             {t("signup")}
//           </Link>
//         </p>

//       </div>
//     </main>
//   );
// }