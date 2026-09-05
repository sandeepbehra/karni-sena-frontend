"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { ArrowLeft, Eye, EyeOff, LockKeyhole } from "lucide-react";

export default function ChangePasswordPage() {
  const t = useTranslations("ChangePassword");
  const router = useRouter();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const togglePassword = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (formData.newPassword !== formData.confirmPassword) {
      setError(t("passwordMismatch"));
      return;
    }

    if (formData.newPassword.length < 6) {
      setError(t("passwordLength"));
      return;
    }

    setLoading(true);

    try {
      // Backend API later

      // const response = await fetch(
      //   `${process.env.NEXT_PUBLIC_API_URL}/auth/change-password`,
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     credentials: "include",
      //     body: JSON.stringify({
      //       currentPassword: formData.currentPassword,
      //       newPassword: formData.newPassword,
      //     }),
      //   }
      // );

      setSuccess(t("success"));

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        router.push("/profile");
      }, 1000);
    } catch (error) {
      setError(error.message || t("error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f6f1] py-10 md:py-14">
      <div className="mx-auto max-w-xl px-4 sm:px-6">

        <div className="mb-6">
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-orange-600"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("back")}
          </Link>
        </div>

        <div className="rounded-3xl border border-orange-100 bg-white p-6 shadow-sm sm:p-8">

          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-100">
              <LockKeyhole className="h-6 w-6 text-orange-600" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900">
              {t("title")}
            </h1>

            <p className="mt-2 text-gray-500">
              {t("subtitle")}
            </p>
          </div>

          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            <PasswordField
              label={t("currentPassword")}
              name="currentPassword"
              value={formData.currentPassword}
              show={showPassword.current}
              onChange={handleChange}
              onToggle={() => togglePassword("current")}
            />

            <PasswordField
              label={t("newPassword")}
              name="newPassword"
              value={formData.newPassword}
              show={showPassword.new}
              onChange={handleChange}
              onToggle={() => togglePassword("new")}
            />

            <PasswordField
              label={t("confirmPassword")}
              name="confirmPassword"
              value={formData.confirmPassword}
              show={showPassword.confirm}
              onChange={handleChange}
              onToggle={() => togglePassword("confirm")}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-orange-600 py-3.5 font-semibold text-white transition hover:bg-orange-700 disabled:opacity-60"
            >
              {loading ? t("updating") : t("button")}
            </button>

          </form>
        </div>
      </div>
    </main>
  );
}

function PasswordField({
  label,
  name,
  value,
  show,
  onChange,
  onToggle,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="relative">
        <input
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 pr-12 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
          required
        />

        <button
          type="button"
          onClick={onToggle}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-orange-600"
        >
          {show ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
}