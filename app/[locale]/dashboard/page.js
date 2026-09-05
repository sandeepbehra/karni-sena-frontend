"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  User,
  BadgeCheck,
  Clock3,
  ArrowRight,
  Mail,
  Phone,
} from "lucide-react";

export default function DashboardPage() {
  const t = useTranslations("Dashboard");

  // Temporary mock data
  // Later isko backend/auth context se lenge
  const user = {
    name: "Sandeep Behra",
    email: "sandeep@example.com",
    mobile: "9876543210",
    profileImage: null,

    membership: {
      status: "not_applied",
      membershipNumber: null,
    },
  };

  const membershipStatus = user?.membership?.status || "not_applied";

  return (
    <main className="min-h-screen bg-[#f8f6f1] py-10 md:py-14">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Welcome Section */}
        <section className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">
            {t("dashboard")}
          </p>

          <h1 className="text-3xl font-bold text-[#222] md:text-4xl">
            {t("welcome")}, {user.name}
          </h1>

          <p className="mt-2 max-w-2xl text-gray-500">
            {t("subtitle")}
          </p>
        </section>

        <div className="grid gap-6 lg:grid-cols-3">

          {/* Profile Card */}
          <section className="rounded-3xl border border-orange-100 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="mb-6 flex items-center justify-between gap-4">

              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-orange-100">
                  {user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt={user.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="h-7 w-7 text-orange-600" />
                  )}
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {user.name}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {t("userAccount")}
                  </p>
                </div>
              </div>

              <Link
                href="/profile"
                className="hidden rounded-full border border-orange-200 px-4 py-2 text-sm font-semibold text-orange-600 transition hover:bg-orange-50 sm:inline-flex"
              >
                {t("viewProfile")}
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">

              <div className="rounded-2xl bg-gray-50 p-4">
                <div className="mb-1 flex items-center gap-2 text-sm text-gray-500">
                  <Mail className="h-4 w-4" />
                  {t("email")}
                </div>

                <p className="font-medium text-gray-900">
                  {user.email}
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-4">
                <div className="mb-1 flex items-center gap-2 text-sm text-gray-500">
                  <Phone className="h-4 w-4" />
                  {t("mobile")}
                </div>

                <p className="font-medium text-gray-900">
                  {user.mobile}
                </p>
              </div>
            </div>

            <Link
              href="/profile"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-orange-200 py-3 text-sm font-semibold text-orange-600 transition hover:bg-orange-50 sm:hidden"
            >
              {t("viewProfile")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </section>

          {/* Membership Card */}
          <MembershipCard
            status={membershipStatus}
            membershipNumber={user?.membership?.membershipNumber}
            t={t}
          />

        </div>
      </div>
    </main>
  );
}

function MembershipCard({
  status,
  membershipNumber,
  t,
}) {
  if (status === "approved") {
    return (
      <section className="rounded-3xl border border-green-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <BadgeCheck className="h-6 w-6 text-green-600" />
        </div>

        <p className="text-sm font-semibold uppercase tracking-wider text-green-600">
          {t("membership")}
        </p>

        <h2 className="mt-2 text-2xl font-bold text-gray-900">
          {t("approved")}
        </h2>

        {membershipNumber && (
          <div className="mt-5 rounded-xl bg-gray-50 p-4">
            <p className="text-xs uppercase tracking-wider text-gray-500">
              {t("membershipId")}
            </p>

            <p className="mt-1 font-bold text-gray-900">
              {membershipNumber}
            </p>
          </div>
        )}

        <Link
          href="/membership/profile"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-600 py-3 font-semibold text-white transition hover:bg-orange-700"
        >
          {t("viewMembership")}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    );
  }

  if (status === "pending") {
    return (
      <section className="rounded-3xl border border-yellow-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
          <Clock3 className="h-6 w-6 text-yellow-600" />
        </div>

        <p className="text-sm font-semibold uppercase tracking-wider text-yellow-600">
          {t("membership")}
        </p>

        <h2 className="mt-2 text-2xl font-bold text-gray-900">
          {t("underReview")}
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-500">
          {t("underReviewDescription")}
        </p>

        <Link
          href="/membership/status"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-600 py-3 font-semibold text-white transition hover:bg-orange-700"
        >
          {t("checkStatus")}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    );
  }

  if (status === "rejected") {
    return (
      <section className="rounded-3xl border border-red-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
          <User className="h-6 w-6 text-red-600" />
        </div>

        <p className="text-sm font-semibold uppercase tracking-wider text-red-600">
          {t("membership")}
        </p>

        <h2 className="mt-2 text-2xl font-bold text-gray-900">
          {t("rejected")}
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-500">
          {t("rejectedDescription")}
        </p>

        <Link
          href="/membership/status"
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-orange-200 py-3 font-semibold text-orange-600 transition hover:bg-orange-50"
        >
          {t("viewDetails")}
        </Link>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-orange-100 bg-white p-6 shadow-sm">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
        <BadgeCheck className="h-6 w-6 text-orange-600" />
      </div>

      <p className="text-sm font-semibold uppercase tracking-wider text-orange-600">
        {t("membership")}
      </p>

      <h2 className="mt-2 text-2xl font-bold text-gray-900">
        {t("notMember")}
      </h2>

      <p className="mt-3 text-sm leading-6 text-gray-500">
        {t("notMemberDescription")}
      </p>

      <Link
        href="/join-us"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-600 py-3 font-semibold text-white transition hover:bg-orange-700"
      >
        {t("joinMembership")}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  );
}