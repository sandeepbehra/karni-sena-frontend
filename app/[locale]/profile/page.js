"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  User,
  Mail,
  Phone,
  CalendarDays,
  Pencil,
  LockKeyhole,
} from "lucide-react";

export default function ProfilePage() {
  const t = useTranslations("Profile");

  // Temporary mock user
  const user = {
    name: "Sandeep Behra",
    email: "sandeep@example.com",
    mobile: "9876543210",
    profileImage: null,
    joinedAt: "05 September 2026",
  };

  return (
    <main className="min-h-screen bg-[#f8f6f1] py-10 md:py-14">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">
            {t("account")}
          </p>

          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
            {t("title")}
          </h1>

          <p className="mt-2 text-gray-500">
            {t("subtitle")}
          </p>
        </div>

        <section className="overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-sm">

          {/* Profile Header */}
          <div className="border-b border-gray-100 px-6 py-8 sm:px-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-orange-100">
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User className="h-10 w-10 text-orange-600" />
                )}
              </div>

              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">
                  {user.name}
                </h2>

                <p className="mt-1 text-gray-500">
                  {t("registeredUser")}
                </p>
              </div>

              <Link
                href="/profile/edit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-5 py-3 font-semibold text-white transition hover:bg-orange-700"
              >
                <Pencil className="h-4 w-4" />
                {t("editProfile")}
              </Link>
            </div>
          </div>

          {/* Details */}
          <div className="grid gap-5 p-6 sm:grid-cols-2 sm:p-8">

            <ProfileField
              icon={User}
              label={t("fullName")}
              value={user.name}
            />

            <ProfileField
              icon={Mail}
              label={t("email")}
              value={user.email}
            />

            <ProfileField
              icon={Phone}
              label={t("mobile")}
              value={user.mobile}
            />

            <ProfileField
              icon={CalendarDays}
              label={t("joinedOn")}
              value={user.joinedAt}
            />

          </div>

          <div className="border-t border-gray-100 p-6 sm:p-8">
            <Link
              href="/change-password"
              className="inline-flex items-center gap-2 font-semibold text-orange-600 hover:text-orange-700"
            >
              <LockKeyhole className="h-4 w-4" />
              {t("changePassword")}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

function ProfileField({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="rounded-2xl bg-gray-50 p-5">
      <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
        <Icon className="h-4 w-4" />
        {label}
      </div>

      <p className="font-semibold text-gray-900">
        {value || "-"}
      </p>
    </div>
  );
}