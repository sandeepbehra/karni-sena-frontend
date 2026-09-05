"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter, Link } from "@/i18n/navigation";
import { User, Camera, ArrowLeft } from "lucide-react";

export default function EditProfilePage() {
  const t = useTranslations("EditProfile");
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "Sandeep Behra",
    email: "sandeep@example.com",
    mobile: "9876543210",
  });

  const [profilePreview, setProfilePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const preview = URL.createObjectURL(file);
    setProfilePreview(preview);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");

    try {
      // Backend API later connect karenge

      // Example:
      //
      // const response = await fetch(
      //   `${process.env.NEXT_PUBLIC_API_URL}/users/profile`,
      //   {
      //     method: "PUT",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     credentials: "include",
      //     body: JSON.stringify(formData),
      //   }
      // );
      //
      // const data = await response.json();
      //
      // if (!response.ok) {
      //   throw new Error(data.message);
      // }

      setSuccess(t("success"));

      setTimeout(() => {
        router.push("/profile");
      }, 800);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f6f1] py-10 md:py-14">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

        <div className="mb-6">
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-orange-600"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("back")}
          </Link>
        </div>

        <div className="rounded-3xl border border-orange-100 bg-white p-6 shadow-sm sm:p-8 md:p-10">

          <div className="mb-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">
              {t("account")}
            </p>

            <h1 className="text-3xl font-bold text-gray-900">
              {t("title")}
            </h1>

            <p className="mt-2 text-gray-500">
              {t("subtitle")}
            </p>
          </div>

          {success && (
            <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Avatar */}
            <div className="flex flex-col items-center gap-4 sm:flex-row">

              <div className="relative">
                <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-orange-100">
                  {profilePreview ? (
                    <img
                      src={profilePreview}
                      alt="Profile preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="h-10 w-10 text-orange-600" />
                  )}
                </div>

                <label className="absolute bottom-0 right-0 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-orange-600 text-white shadow-md transition hover:bg-orange-700">
                  <Camera className="h-4 w-4" />

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>

              <div>
                <p className="font-semibold text-gray-900">
                  {t("profilePhoto")}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {t("photoHint")}
                </p>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                {t("fullName")}
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                {t("email")}
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                required
              />
            </div>

            {/* Mobile */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                {t("mobile")}
              </label>

              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                required
              />
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">

              <Link
                href="/profile"
                className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                {t("cancel")}
              </Link>

              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-orange-600 px-6 py-3 font-semibold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? t("saving") : t("save")}
              </button>

            </div>

          </form>
        </div>
      </div>
    </main>
  );
}