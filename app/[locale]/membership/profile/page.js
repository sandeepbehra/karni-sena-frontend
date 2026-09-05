"use client";

import { useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";

import {
  BadgeCheck,
  User,
  Mail,
  Phone,
  MapPin,
  BriefcaseBusiness,
  Users,
  CalendarDays,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";

export default function MemberProfilePage() {
  const t = useTranslations("MemberProfile");

  const locale = useLocale();

  const router = useRouter();

  const {
    user,
    loading,
    isLoggedIn,
  } = useAuth();

  const membership =
    user?.membership;

  /*
  ==========================================
  PAGE PROTECTION
  ==========================================
  */

  useEffect(() => {
    if (loading) {
      return;
    }

    /*
    Not logged in
    */

    if (!isLoggedIn) {
      router.replace(
        "/login?redirect=/membership/profile"
      );

      return;
    }

    /*
    Membership apply hi nahi ki
    */

    if (!membership) {
      router.replace(
        "/membership/apply"
      );

      return;
    }

    /*
    Pending / rejected
    */

    if (
      membership.status === "pending" ||
      membership.status === "rejected"
    ) {
      router.replace(
        "/membership/status"
      );

      return;
    }

    /*
    Unknown status
    */

    if (
      membership.status !== "approved"
    ) {
      router.replace(
        "/dashboard"
      );
    }
  }, [
    loading,
    isLoggedIn,
    membership,
    router,
  ]);

  /*
  ==========================================
  LOADING
  ==========================================
  */

  if (loading) {
    return <PageLoader text={t("loading")} />;
  }

  /*
  Redirect process chal raha hai.
  */

  if (
    !isLoggedIn ||
    !membership ||
    membership.status !== "approved"
  ) {
    return <PageLoader text={t("loading")} />;
  }

  /*
  ==========================================
  MOCK / FRONTEND DATA
  ==========================================

  Abhi membership form ke saare fields
  AuthContext me save nahi kar rahe.

  Backend ke baad ye membership object
  API se full data ke saath aayega.

  Filhal fallback user data use kar rahe hain.
  */

  const memberData = {
    fullName:
      membership.fullName ||
      user?.name ||
      "-",

    email:
      membership.email ||
      user?.email ||
      "-",

    mobileNumber:
      membership.mobileNumber ||
      user?.mobile ||
      "-",

    alternativeNumber:
      membership.alternativeNumber ||
      "-",

    guardianName:
      membership.guardianName ||
      "-",

    occupation:
      membership.occupation ||
      "-",

    role:
      membership.role ||
      "member",

    profileImage:
      membership.photoPreview ||
      user?.profileImage ||
      null,

    address: {
      street:
        membership?.address?.street ||
        membership?.street ||
        "",

      city:
        membership?.address?.city ||
        membership?.city ||
        "",

      district:
        membership?.address?.district ||
        membership?.district ||
        "",

      state:
        membership?.address?.state ||
        membership?.state ||
        "",

      country:
        membership?.address?.country ||
        membership?.country ||
        "",

      pincode:
        membership?.address?.pincode ||
        membership?.pincode ||
        "",
    },
  };

  /*
  ==========================================
  APPROVED DATE
  ==========================================
  */

  const approvedDate =
    membership.approvedAt
      ? new Intl.DateTimeFormat(
          locale === "hi"
            ? "hi-IN"
            : "en-IN",
          {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }
        ).format(
          new Date(
            membership.approvedAt
          )
        )
      : "-";

  /*
  ==========================================
  SUBMITTED DATE
  ==========================================
  */

  const submittedDate =
    membership.submittedAt
      ? new Intl.DateTimeFormat(
          locale === "hi"
            ? "hi-IN"
            : "en-IN",
          {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }
        ).format(
          new Date(
            membership.submittedAt
          )
        )
      : "-";

  const formattedAddress =
    [
      memberData.address.street,
      memberData.address.city,
      memberData.address.district,
      memberData.address.state,
      memberData.address.country,
      memberData.address.pincode,
    ]
      .filter(Boolean)
      .join(", ") || "-";

  return (
    <main className="min-h-screen bg-[#f8f6f1] py-10 md:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* BACK */}

        <Link
          href="/dashboard"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-orange-600"
        >
          <ArrowLeft className="h-4 w-4" />

          {t("backDashboard")}
        </Link>

        {/* MEMBER HEADER */}

        <section className="overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-sm">
          <div className="bg-gradient-to-r from-[#2b1b10] via-[#4b2a15] to-orange-700 px-6 py-8 text-white sm:px-8 md:py-10">

            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                {/* PROFILE IMAGE */}

                <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-white/20 bg-white/10">

                  {memberData.profileImage ? (
                    <img
                      src={
                        memberData.profileImage
                      }
                      alt={
                        memberData.fullName
                      }
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="h-10 w-10 text-white" />
                  )}

                </div>

                <div>

                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-100 ring-1 ring-green-300/30">
                    <BadgeCheck className="h-4 w-4" />

                    {t("activeMember")}
                  </div>

                  <h1 className="text-3xl font-bold sm:text-4xl">
                    {memberData.fullName}
                  </h1>

                  <p className="mt-2 text-sm text-white/70">
                    {t("memberOfOrganization")}
                  </p>

                </div>

              </div>

              {/* MEMBERSHIP ID */}

              <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm md:min-w-[250px]">

                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-200">
                  {t("membershipId")}
                </p>

                <p className="mt-2 text-xl font-bold">
                  {membership.membershipNumber ||
                    "-"}
                </p>

              </div>

            </div>

          </div>

          {/* BODY */}

          <div className="p-6 sm:p-8">

            <div className="grid gap-6 lg:grid-cols-3">

              {/* LEFT */}

              <div className="space-y-6 lg:col-span-2">

                {/* PERSONAL DETAILS */}

                <InfoSection
                  title={t(
                    "personalDetails"
                  )}
                  icon={User}
                >
                  <InfoGrid>

                    <InfoItem
                      icon={User}
                      label={t("fullName")}
                      value={
                        memberData.fullName
                      }
                    />

                    <InfoItem
                      icon={Users}
                      label={t(
                        "guardianName"
                      )}
                      value={
                        memberData.guardianName
                      }
                    />

                    <InfoItem
                      icon={Mail}
                      label={t("email")}
                      value={
                        memberData.email
                      }
                    />

                    <InfoItem
                      icon={Phone}
                      label={t("mobile")}
                      value={
                        memberData.mobileNumber
                      }
                    />

                    <InfoItem
                      icon={Phone}
                      label={t(
                        "alternativeMobile"
                      )}
                      value={
                        memberData.alternativeNumber
                      }
                    />

                  </InfoGrid>
                </InfoSection>

                {/* ADDRESS */}

                <InfoSection
                  title={t(
                    "addressDetails"
                  )}
                  icon={MapPin}
                >

                  <div className="rounded-2xl bg-gray-50 p-5">

                    <div className="flex items-start gap-3">

                      <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-orange-600" />

                      <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                          {t(
                            "currentAddress"
                          )}
                        </p>

                        <p className="mt-1 leading-7 text-gray-800">
                          {formattedAddress}
                        </p>
                      </div>

                    </div>

                  </div>

                </InfoSection>

                {/* PROFESSIONAL */}

                <InfoSection
                  title={t(
                    "professionalDetails"
                  )}
                  icon={BriefcaseBusiness}
                >

                  <InfoGrid>

                    <InfoItem
                      icon={
                        BriefcaseBusiness
                      }
                      label={t(
                        "occupation"
                      )}
                      value={formatValue(
                        memberData.occupation
                      )}
                    />

                    <InfoItem
                      icon={ShieldCheck}
                      label={t("role")}
                      value={formatValue(
                        memberData.role
                      )}
                    />

                  </InfoGrid>

                </InfoSection>

              </div>

              {/* RIGHT SIDEBAR */}

              <div className="space-y-5">

                {/* STATUS CARD */}

                <div className="rounded-3xl border border-green-100 bg-green-50 p-6">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100">
                    <BadgeCheck className="h-6 w-6 text-green-600" />
                  </div>

                  <p className="mt-5 text-sm font-semibold text-green-700">
                    {t("membershipStatus")}
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-gray-900">
                    {t("approved")}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {t(
                      "approvedDescription"
                    )}
                  </p>

                </div>

                {/* MEMBERSHIP INFO */}

                <div className="rounded-3xl border border-gray-200 bg-white p-6">

                  <h3 className="font-bold text-gray-900">
                    {t(
                      "membershipDetails"
                    )}
                  </h3>

                  <div className="mt-5 space-y-5">

                    <SidebarInfo
                      icon={ShieldCheck}
                      label={t(
                        "membershipId"
                      )}
                      value={
                        membership.membershipNumber ||
                        "-"
                      }
                    />

                    <SidebarInfo
                      icon={CalendarDays}
                      label={t(
                        "applicationDate"
                      )}
                      value={
                        submittedDate
                      }
                    />

                    <SidebarInfo
                      icon={BadgeCheck}
                      label={t(
                        "approvedDate"
                      )}
                      value={
                        approvedDate
                      }
                    />

                  </div>

                </div>

              </div>

            </div>

          </div>
        </section>
      </div>
    </main>
  );
}

/*
============================================
INFO SECTION
============================================
*/

function InfoSection({
  title,
  icon: Icon,
  children,
}) {
  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-5 sm:p-6">

      <div className="mb-5 flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100">
          <Icon className="h-5 w-5 text-orange-600" />
        </div>

        <h2 className="text-lg font-bold text-gray-900">
          {title}
        </h2>

      </div>

      {children}
    </section>
  );
}

/*
============================================
INFO GRID
============================================
*/

function InfoGrid({ children }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {children}
    </div>
  );
}

/*
============================================
INFO ITEM
============================================
*/

function InfoItem({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="rounded-2xl bg-gray-50 p-4">

      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-gray-400">

        <Icon className="h-4 w-4 text-orange-500" />

        {label}

      </div>

      <p className="mt-2 break-words font-semibold text-gray-900">
        {value || "-"}
      </p>

    </div>
  );
}

/*
============================================
SIDEBAR INFO
============================================
*/

function SidebarInfo({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="flex items-start gap-3">

      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-50">
        <Icon className="h-4 w-4 text-orange-600" />
      </div>

      <div>
        <p className="text-xs text-gray-400">
          {label}
        </p>

        <p className="mt-1 text-sm font-semibold text-gray-900">
          {value || "-"}
        </p>
      </div>

    </div>
  );
}

/*
============================================
LOADER
============================================
*/

function PageLoader({ text }) {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#f8f6f1]">

      <div className="text-center">

        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-orange-200 border-t-orange-600" />

        <p className="mt-4 text-sm text-gray-500">
          {text}
        </p>

      </div>

    </main>
  );
}

/*
============================================
FORMAT MACHINE VALUE
============================================
*/

function formatValue(value) {
  if (!value || value === "-") {
    return "-";
  }

  return value
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) =>
      char.toUpperCase()
    );
}