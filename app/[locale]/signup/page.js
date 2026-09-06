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
  UserPlus,
} from "lucide-react";

export default function SignupPage() {
  const t = useTranslations("Signup");

  const router = useRouter();

  const searchParams = useSearchParams();

  const { signup } = useAuth();

  /*
  ============================================
  REDIRECT
  ============================================

  Example:

  Normal signup:
  /en/signup

  redirect:
  /dashboard


  Join Us se:

  /en/signup?redirect=/membership/apply

  redirect:
  /membership/apply
  */

  const redirect =
    searchParams.get("redirect") ||
    "/dashboard";

  /*
 
  FORM STATE

  */

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
    });

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  /*
  
  INPUT CHANGE

  */

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    /*
    Mobile me sirf digits allow
    */

    if (name === "mobile") {
      const onlyNumbers =
        value.replace(/\D/g, "");

      setFormData((prev) => ({
        ...prev,
        mobile: onlyNumbers,
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /*
  SIGNUP
  */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    /*
    Basic validation
    */

    if (!formData.name.trim()) {
      setError(t("nameRequired"));
      return;
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {
      setError(t("invalidEmail"));
      return;
    }

    if (
      !/^[0-9]{10}$/.test(
        formData.mobile
      )
    ) {
      setError(t("invalidMobile"));
      return;
    }

    if (
      formData.password.length < 6
    ) {
      setError(
        t("passwordLength")
      );
      return;
    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      setError(
        t("passwordMismatch")
      );
      return;
    }

    setLoading(true);

    try {
      /*

      BACKEND API LATER
     

      Example:

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            mobile: formData.mobile,
            password: formData.password,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
          t("signupError")
        );
      }

      signup(data.user);

      */

      /*
      MOCK USER

      Backend connect hone ke baad
      ye remove kar dena.
      */

      const userData = {
        _id: "USER-001",

        name: formData.name,

        email: formData.email,

        mobile: formData.mobile,

        profileImage: null,

        role: "user",

        /*
        IMPORTANT

        Signup ka matlab membership
        nahi hai.

        User pehle normal account
        create karega.

        Membership separately apply
        karega.
        */

        membership: null,
      };

      /*
      AuthContext me user save hoga
      */

      signup(userData);

      /*
      REDIRECT

      Normal signup:
      /dashboard

      Join Us signup:
      /membership/apply
      */

      router.replace(redirect);

    } catch (error) {
      console.error(
        "Signup error:",
        error
      );

      setError(
        error?.message ||
        t("signupError")
      );
    } finally {
      setLoading(false);
    }
  };

  /*
  LOGIN LINK

  redirect preserve karenge.
  
  */

  const loginHref =
    redirect !== "/dashboard"
      ? `/login?redirect=${encodeURIComponent(
          redirect
        )}`
      : "/login";

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f6f1] px-4 py-12">

      <div className="w-full max-w-md rounded-3xl border border-orange-100 bg-white p-6 shadow-sm sm:p-8">

        {/* ICON */}

        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-orange-100">
          <UserPlus className="h-6 w-6 text-orange-600" />
        </div>

        {/* HEADER */}

        <div className="mb-8 text-center">

          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">
            {t("account")}
          </p>

          <h1 className="text-3xl font-bold text-gray-900">
            {t("title")}
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            {t("subtitle")}
          </p>

        </div>

        {/* ERROR */}

        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* NAME */}

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t("name")}
              <span className="ml-1 text-red-500">
                *
              </span>
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t(
                "namePlaceholder"
              )}
              autoComplete="name"
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />

          </div>

          {/* EMAIL */}

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t("email")}
              <span className="ml-1 text-red-500">
                *
              </span>
            </label>

            <input
              type="email"
              name="email"
              value={
                formData.email
              }
              onChange={handleChange}
              placeholder={t(
                "emailPlaceholder"
              )}
              autoComplete="email"
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />

          </div>

          {/* MOBILE */}

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t("mobile")}
              <span className="ml-1 text-red-500">
                *
              </span>
            </label>

            <input
              type="tel"
              name="mobile"
              value={
                formData.mobile
              }
              onChange={handleChange}
              placeholder={t(
                "mobilePlaceholder"
              )}
              maxLength={10}
              inputMode="numeric"
              autoComplete="tel"
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
            />

          </div>

          {/* PASSWORD */}

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t("password")}
              <span className="ml-1 text-red-500">
                *
              </span>
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
                onChange={
                  handleChange
                }
                placeholder={t(
                  "passwordPlaceholder"
                )}
                autoComplete="new-password"
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
                aria-label={
                  showPassword
                    ? t("hide")
                    : t("show")
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-orange-600"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>

            </div>

          </div>

          {/* CONFIRM PASSWORD */}

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t(
                "confirmPassword"
              )}

              <span className="ml-1 text-red-500">
                *
              </span>
            </label>

            <div className="relative">

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                name="confirmPassword"
                value={
                  formData.confirmPassword
                }
                onChange={
                  handleChange
                }
                placeholder={t(
                  "confirmPasswordPlaceholder"
                )}
                autoComplete="new-password"
                required
                className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    (prev) => !prev
                  )
                }
                aria-label={
                  showConfirmPassword
                    ? t("hide")
                    : t("show")
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-orange-600"
              >

                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}

              </button>

            </div>

          </div>

          {/* SUBMIT */}

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

        {/* LOGIN */}

        <p className="mt-6 text-center text-sm text-gray-500">

          {t("alreadyAccount")}{" "}

          <Link
            href={loginHref}
            className="font-semibold text-orange-600 transition hover:text-orange-700"
          >
            {t("login")}
          </Link>

        </p>

      </div>

    </main>
  );
}

// "use client";

// import { useState } from "react";
// import { useTranslations } from "next-intl";
// import { Link, useRouter } from "@/i18n/navigation";
// import { useSearchParams } from "next/navigation";
// import { useAuth } from "@/context/AuthContext";

// export default function SignupPage() {
//   const t = useTranslations("Signup");
//   const router = useRouter();
  
//   const searchParams = useSearchParams();

// const { signup } = useAuth();

// const redirect =
//   searchParams.get("redirect") ||
//   "/dashboard";

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setError("");

//     if (formData.password !== formData.confirmPassword) {
//       setError(t("passwordMismatch"));
//       return;
//     }

//     setLoading(true);

//     try {
//       // Backend API baad me connect karenge

//       // Example:
//       // const response = await fetch(
//       //   `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
//       //   {
//       //     method: "POST",
//       //     headers: {
//       //       "Content-Type": "application/json",
//       //     },
//       //     credentials: "include",
//       //     body: JSON.stringify({
//       //       name: formData.name,
//       //       email: formData.email,
//       //       mobile: formData.mobile,
//       //       password: formData.password,
//       //     }),
//       //   }
//       // );

//       // const data = await response.json();

//       // if (!response.ok) {
//       //   throw new Error(data.message || "Signup failed");
//       // }

//       router.push("/dashboard");
//     } catch (error) {
//       setError(error.message || t("signupError"));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-[#f8f6f1] flex items-center justify-center px-4 py-12">
//       <div className="w-full max-w-lg">
//         <div className="bg-white rounded-3xl shadow-xl border border-orange-100 p-6 sm:p-8 md:p-10">
//           <div className="text-center mb-8">
//             <div className="w-14 h-14 mx-auto rounded-full bg-orange-100 flex items-center justify-center mb-4">
//               <span className="text-2xl">👤</span>
//             </div>

//             <h1 className="text-3xl font-bold text-[#222]">
//               {t("title")}
//             </h1>

//             <p className="text-gray-500 mt-2">
//               {t("subtitle")}
//             </p>
//           </div>

//           {error && (
//             <div className="mb-5 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 {t("name")}
//               </label>

//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder={t("namePlaceholder")}
//                 className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 {t("email")}
//               </label>

//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder={t("emailPlaceholder")}
//                 className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 {t("mobile")}
//               </label>

//               <input
//                 type="tel"
//                 name="mobile"
//                 value={formData.mobile}
//                 onChange={handleChange}
//                 placeholder={t("mobilePlaceholder")}
//                 className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 {t("password")}
//               </label>

//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder={t("passwordPlaceholder")}
//                   className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-20 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//                   required
//                 />

//                 <button
//                   type="button"
//                   onClick={() => setShowPassword((prev) => !prev)}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-orange-600"
//                 >
//                   {showPassword ? t("hide") : t("show")}
//                 </button>
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 {t("confirmPassword")}
//               </label>

//               <div className="relative">
//                 <input
//                   type={showConfirmPassword ? "text" : "password"}
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   placeholder={t("confirmPasswordPlaceholder")}
//                   className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-20 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
//                   required
//                 />

//                 <button
//                   type="button"
//                   onClick={() =>
//                     setShowConfirmPassword((prev) => !prev)
//                   }
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-orange-600"
//                 >
//                   {showConfirmPassword ? t("hide") : t("show")}
//                 </button>
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full rounded-xl bg-orange-600 py-3.5 font-semibold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
//             >
//               {loading ? t("loading") : t("button")}
//             </button>
//           </form>

//           <div className="mt-6 text-center text-sm text-gray-500">
//             {t("alreadyAccount")}{" "}
//             <Link
//               href="/login"
//               className="font-semibold text-orange-600 hover:text-orange-700"
//             >
//               {t("login")}
//             </Link>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }