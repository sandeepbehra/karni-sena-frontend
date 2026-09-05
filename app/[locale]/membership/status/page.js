"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import {
  Clock3,
  BadgeCheck,
  XCircle,
  ArrowRight,
  FileText,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

export default function MembershipStatusPage() {
  const t = useTranslations("MembershipStatus");
  const locale = useLocale();
  const router = useRouter();

  const {
    user,
    loading,
    isLoggedIn,
  } = useAuth();

  const membership = user?.membership;

  /*
  ==========================================
  PROTECT PAGE
  ==========================================
  */

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.replace(
        "/login?redirect=/membership/status"
      );
    }
  }, [
    loading,
    isLoggedIn,
    router,
  ]);

  /*
  ==========================================
  LOADING
  ==========================================
  */

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#f8f6f1]">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-orange-200 border-t-orange-600" />

          <p className="mt-4 text-sm text-gray-500">
            {t("loading")}
          </p>
        </div>
      </div>
    );
  }

  /*
  ==========================================
  NOT LOGGED IN
  ==========================================
  */

  if (!isLoggedIn) {
    return null;
  }

  /*
  ==========================================
  NO MEMBERSHIP APPLICATION
  ==========================================
  */

  if (!membership) {
    return (
      <main className="min-h-screen bg-[#f8f6f1] py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="rounded-3xl border border-orange-100 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
              <FileText className="h-8 w-8 text-orange-600" />
            </div>

            <h1 className="mt-6 text-2xl font-bold text-gray-900">
              {t("noApplication")}
            </h1>

            <p className="mt-3 leading-7 text-gray-500">
              {t("noApplicationDescription")}
            </p>

            <Link
              href="/membership/apply"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-orange-600 px-6 py-3 font-semibold text-white transition hover:bg-orange-700"
            >
              {t("applyMembership")}

              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  /*
  ==========================================
  DATE FORMAT
  ==========================================
  */

  const appliedOn = membership?.submittedAt
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

  return (
    <main className="min-h-screen bg-[#f8f6f1] py-12">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">

        {/* PAGE HEADER */}

        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">
            {t("membership")}
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
            {t("title")}
          </h1>

          <p className="mt-2 text-gray-500">
            {t("subtitle")}
          </p>
        </div>

        {/* PENDING */}

        {membership.status ===
          "pending" && (
          <PendingStatus
            membership={membership}
            appliedOn={appliedOn}
            t={t}
          />
        )}

        {/* APPROVED */}

        {membership.status ===
          "approved" && (
          <ApprovedStatus
            membership={membership}
            appliedOn={appliedOn}
            t={t}
          />
        )}

        {/* REJECTED */}

        {membership.status ===
          "rejected" && (
          <RejectedStatus
            membership={membership}
            appliedOn={appliedOn}
            t={t}
          />
        )}
      </div>
    </main>
  );
}

/*
==========================================
PENDING
==========================================
*/

function PendingStatus({
  membership,
  appliedOn,
  t,
}) {
  return (
    <section className="rounded-3xl border border-yellow-200 bg-white p-6 shadow-sm sm:p-8">
      <StatusIcon type="pending" />

      <p className="mt-6 text-sm font-semibold uppercase tracking-[0.15em] text-yellow-600">
        {t("pending")}
      </p>

      <h2 className="mt-2 text-2xl font-bold text-gray-900">
        {t("pendingTitle")}
      </h2>

      <p className="mt-3 leading-7 text-gray-500">
        {t("pendingDescription")}
      </p>

      <ApplicationInfo
        membership={membership}
        appliedOn={appliedOn}
        t={t}
      />

      <Link
        href="/dashboard"
        className="mt-7 inline-flex items-center gap-2 rounded-xl bg-orange-600 px-6 py-3 font-semibold text-white transition hover:bg-orange-700"
      >
        {t("dashboard")}

        <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  );
}

/*
==========================================
APPROVED
==========================================
*/

function ApprovedStatus({
  membership,
  appliedOn,
  t,
}) {
  return (
    <section className="rounded-3xl border border-green-200 bg-white p-6 shadow-sm sm:p-8">
      <StatusIcon type="approved" />

      <p className="mt-6 text-sm font-semibold uppercase tracking-[0.15em] text-green-600">
        {t("approved")}
      </p>

      <h2 className="mt-2 text-2xl font-bold text-gray-900">
        {t("approvedTitle")}
      </h2>

      <p className="mt-3 leading-7 text-gray-500">
        {t("approvedDescription")}
      </p>

      <ApplicationInfo
        membership={membership}
        appliedOn={appliedOn}
        t={t}
      />

      {membership.membershipNumber && (
        <div className="mt-5 rounded-2xl border border-green-100 bg-green-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-green-600">
            {t("membershipNumber")}
          </p>

          <p className="mt-1 text-xl font-bold text-gray-900">
            {
              membership.membershipNumber
            }
          </p>
        </div>
      )}

      <Link
        href="/membership/profile"
        className="mt-7 inline-flex items-center gap-2 rounded-xl bg-orange-600 px-6 py-3 font-semibold text-white transition hover:bg-orange-700"
      >
        {t("viewMemberProfile")}

        <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  );
}

/*
==========================================
REJECTED
==========================================
*/

function RejectedStatus({
  membership,
  appliedOn,
  t,
}) {
  return (
    <section className="rounded-3xl border border-red-200 bg-white p-6 shadow-sm sm:p-8">
      <StatusIcon type="rejected" />

      <p className="mt-6 text-sm font-semibold uppercase tracking-[0.15em] text-red-600">
        {t("rejected")}
      </p>

      <h2 className="mt-2 text-2xl font-bold text-gray-900">
        {t("rejectedTitle")}
      </h2>

      <p className="mt-3 leading-7 text-gray-500">
        {t("rejectedDescription")}
      </p>

      <ApplicationInfo
        membership={membership}
        appliedOn={appliedOn}
        t={t}
      />

      {membership.rejectionReason && (
        <div className="mt-5 rounded-2xl border border-red-100 bg-red-50 p-5">
          <p className="text-sm font-semibold text-red-700">
            {t("reason")}
          </p>

          <p className="mt-1 text-sm leading-6 text-red-600">
            {
              membership.rejectionReason
            }
          </p>
        </div>
      )}

      <Link
        href="/dashboard"
        className="mt-7 inline-flex items-center gap-2 rounded-xl border border-orange-200 px-6 py-3 font-semibold text-orange-600 transition hover:bg-orange-50"
      >
        {t("dashboard")}
      </Link>
    </section>
  );
}

/*
==========================================
APPLICATION INFO
==========================================
*/

function ApplicationInfo({
  membership,
  appliedOn,
  t,
}) {
  return (
    <div className="mt-7 grid gap-4 sm:grid-cols-2">

      {/* APPLICATION ID */}

      <div className="rounded-2xl bg-gray-50 p-4">
        <div className="mb-1 flex items-center gap-2 text-sm text-gray-500">
          <FileText className="h-4 w-4" />

          {t("applicationId")}
        </div>

        <p className="font-semibold text-gray-900">
          {membership.applicationId ||
            "-"}
        </p>
      </div>

      {/* DATE */}

      <div className="rounded-2xl bg-gray-50 p-4">
        <p className="mb-1 text-sm text-gray-500">
          {t("appliedOn")}
        </p>

        <p className="font-semibold text-gray-900">
          {appliedOn}
        </p>
      </div>
    </div>
  );
}

/*
==========================================
STATUS ICON
==========================================
*/

function StatusIcon({ type }) {
  if (type === "approved") {
    return (
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
        <BadgeCheck className="h-8 w-8 text-green-600" />
      </div>
    );
  }

  if (type === "rejected") {
    return (
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
        <XCircle className="h-8 w-8 text-red-600" />
      </div>
    );
  }

  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
      <Clock3 className="h-8 w-8 text-yellow-600" />
    </div>
  );
}

// "use client";

// import { useTranslations } from "next-intl";
// import { Link } from "@/i18n/navigation";
// import {
//   Clock3,
//   BadgeCheck,
//   XCircle,
//   ArrowRight,
//   FileText,
// } from "lucide-react";
// import { useAuth } from "@/context/AuthContext";

// export default function MembershipStatusPage() {
//   const t = useTranslations("MembershipStatus");
//   const {
//   user,
//   loading,
// } = useAuth();

// const membership =
//   user?.membership;

//   // Temporary mock data
//   // later GET membership status API se aayega
 

//   return (
//     <main className="min-h-screen bg-[#f8f6f1] py-12">
//       <div className="mx-auto max-w-3xl px-4 sm:px-6">
//         <div className="mb-8">
//           <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">
//             {t("membership")}
//           </p>

//           <h1 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
//             {t("title")}
//           </h1>

//           <p className="mt-2 text-gray-500">
//             {t("subtitle")}
//           </p>
//         </div>

//         {membership.status === "pending" && (
//           <PendingStatus
//             membership={membership}
//             t={t}
//           />
//         )}

//         {membership.status === "approved" && (
//           <ApprovedStatus
//             membership={membership}
//             t={t}
//           />
//         )}

//         {membership.status === "rejected" && (
//           <RejectedStatus
//             membership={membership}
//             t={t}
//           />
//         )}
//       </div>
//     </main>
//   );
// }

// function PendingStatus({
//   membership,
//   t,
// }) {
//   return (
//     <section className="rounded-3xl border border-yellow-200 bg-white p-6 shadow-sm sm:p-8">
//       <StatusIcon type="pending" />

//       <p className="mt-6 text-sm font-semibold uppercase tracking-[0.15em] text-yellow-600">
//         {t("pending")}
//       </p>

//       <h2 className="mt-2 text-2xl font-bold text-gray-900">
//         {t("pendingTitle")}
//       </h2>

//       <p className="mt-3 leading-7 text-gray-500">
//         {t("pendingDescription")}
//       </p>

//       <ApplicationInfo
//         membership={membership}
//         t={t}
//       />

//       <Link
//         href="/dashboard"
//         className="mt-7 inline-flex items-center gap-2 rounded-xl bg-orange-600 px-6 py-3 font-semibold text-white transition hover:bg-orange-700"
//       >
//         {t("dashboard")}
//         <ArrowRight className="h-4 w-4" />
//       </Link>
//     </section>
//   );
// }

// function ApprovedStatus({
//   membership,
//   t,
// }) {
//   return (
//     <section className="rounded-3xl border border-green-200 bg-white p-6 shadow-sm sm:p-8">
//       <StatusIcon type="approved" />

//       <p className="mt-6 text-sm font-semibold uppercase tracking-[0.15em] text-green-600">
//         {t("approved")}
//       </p>

//       <h2 className="mt-2 text-2xl font-bold text-gray-900">
//         {t("approvedTitle")}
//       </h2>

//       <p className="mt-3 leading-7 text-gray-500">
//         {t("approvedDescription")}
//       </p>

//       <ApplicationInfo
//         membership={membership}
//         t={t}
//       />

//       {membership.membershipNumber && (
//         <div className="mt-5 rounded-2xl bg-green-50 p-5">
//           <p className="text-xs font-semibold uppercase tracking-wider text-green-600">
//             {t("membershipNumber")}
//           </p>

//           <p className="mt-1 text-xl font-bold text-gray-900">
//             {membership.membershipNumber}
//           </p>
//         </div>
//       )}

//       <Link
//         href="/membership/profile"
//         className="mt-7 inline-flex items-center gap-2 rounded-xl bg-orange-600 px-6 py-3 font-semibold text-white transition hover:bg-orange-700"
//       >
//         {t("viewMemberProfile")}
//         <ArrowRight className="h-4 w-4" />
//       </Link>
//     </section>
//   );
// }

// function RejectedStatus({
//   membership,
//   t,
// }) {
//   return (
//     <section className="rounded-3xl border border-red-200 bg-white p-6 shadow-sm sm:p-8">
//       <StatusIcon type="rejected" />

//       <p className="mt-6 text-sm font-semibold uppercase tracking-[0.15em] text-red-600">
//         {t("rejected")}
//       </p>

//       <h2 className="mt-2 text-2xl font-bold text-gray-900">
//         {t("rejectedTitle")}
//       </h2>

//       <p className="mt-3 leading-7 text-gray-500">
//         {t("rejectedDescription")}
//       </p>

//       <ApplicationInfo
//         membership={membership}
//         t={t}
//       />

//       {membership.rejectionReason && (
//         <div className="mt-5 rounded-2xl border border-red-100 bg-red-50 p-5">
//           <p className="text-sm font-semibold text-red-700">
//             {t("reason")}
//           </p>

//           <p className="mt-1 text-sm leading-6 text-red-600">
//             {membership.rejectionReason}
//           </p>
//         </div>
//       )}

//       <Link
//         href="/dashboard"
//         className="mt-7 inline-flex items-center gap-2 rounded-xl border border-orange-200 px-6 py-3 font-semibold text-orange-600 transition hover:bg-orange-50"
//       >
//         {t("dashboard")}
//       </Link>
//     </section>
//   );
// }

// function ApplicationInfo({
//   membership,
//   t,
// }) {
//   return (
//     <div className="mt-7 grid gap-4 sm:grid-cols-2">
//       <div className="rounded-2xl bg-gray-50 p-4">
//         <div className="mb-1 flex items-center gap-2 text-sm text-gray-500">
//           <FileText className="h-4 w-4" />
//           {t("applicationId")}
//         </div>

//         <p className="font-semibold text-gray-900">
//           {membership.applicationId}
//         </p>
//       </div>

//       <div className="rounded-2xl bg-gray-50 p-4">
//         <p className="mb-1 text-sm text-gray-500">
//           {t("appliedOn")}
//         </p>

//         <p className="font-semibold text-gray-900">
//           {membership.appliedOn}
//         </p>
//       </div>
//     </div>
//   );
// }

// function StatusIcon({ type }) {
//   if (type === "approved") {
//     return (
//       <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
//         <BadgeCheck className="h-8 w-8 text-green-600" />
//       </div>
//     );
//   }

//   if (type === "rejected") {
//     return (
//       <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
//         <XCircle className="h-8 w-8 text-red-600" />
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100">
//       <Clock3 className="h-8 w-8 text-yellow-600" />
//     </div>
//   );
// }