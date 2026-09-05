"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useAuth } from "@/context/AuthContext";

import {
  Users,
  ShieldCheck,
  HeartHandshake,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function JoinUsPage() {
  const t = useTranslations("JoinUs");

  const router = useRouter();

  const {
    isLoggedIn,
    loading,
    user,
  } = useAuth();

  const benefits = [
    t("benefit1"),
    t("benefit2"),
    t("benefit3"),
    t("benefit4"),
  ];

  /*
  ========================================
  JOIN MEMBERSHIP
  ========================================
  */

  const handleJoinMembership = () => {
    /*
    User login nahi hai
    */

    if (!isLoggedIn) {
      router.push(
        "/login?redirect=/membership/apply"
      );

      return;
    }

    /*
    Already applied
    */

    if (
      user?.membership?.status === "pending" ||
      user?.membership?.status === "rejected"
    ) {
      router.push("/membership/status");
      return;
    }

    /*
    Already approved
    */

    if (
      user?.membership?.status === "approved"
    ) {
      router.push("/membership/profile");
      return;
    }

    /*
    Logged in + membership nahi hai
    */

    router.push("/membership/apply");
  };

  return (
    <main className="min-h-screen bg-[#f8f6f1]">

      {/* HERO */}

      <section className="relative overflow-hidden bg-[#24180f] px-4 py-16 text-white sm:px-6 md:py-24">

        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-orange-500 blur-3xl" />

          <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-orange-400 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl">

          <div className="max-w-3xl">

            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-orange-400">
              {t("eyebrow")}
            </p>

            <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              {t("title")}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/75 md:text-lg">
              {t("description")}
            </p>

            <div className="mt-8">

              <button
                type="button"
                onClick={handleJoinMembership}
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-6 py-3.5 font-semibold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? t("checking")
                  : t("applyNow")}

                <ArrowRight className="h-4 w-4" />
              </button>

            </div>

          </div>

        </div>
      </section>

      {/* WHY JOIN */}

      <section className="px-4 py-14 sm:px-6 md:py-20">

        <div className="mx-auto max-w-6xl">

          <div className="mb-10 max-w-2xl">

            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">
              {t("whyJoin")}
            </p>

            <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
              {t("whyJoinTitle")}
            </h2>

            <p className="mt-3 text-gray-500">
              {t("whyJoinDescription")}
            </p>

          </div>

          <div className="grid gap-5 md:grid-cols-3">

            <BenefitCard
              icon={Users}
              title={t("communityTitle")}
              description={t(
                "communityDescription"
              )}
            />

            <BenefitCard
              icon={HeartHandshake}
              title={t("serviceTitle")}
              description={t(
                "serviceDescription"
              )}
            />

            <BenefitCard
              icon={ShieldCheck}
              title={t("identityTitle")}
              description={t(
                "identityDescription"
              )}
            />

          </div>

        </div>
      </section>

      {/* BENEFITS */}

      <section className="px-4 pb-16 sm:px-6 md:pb-24">

        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">

          <div className="rounded-3xl border border-orange-100 bg-white p-6 shadow-sm sm:p-8">

            <h2 className="text-2xl font-bold text-gray-900">
              {t("benefitsTitle")}
            </h2>

            <div className="mt-6 space-y-4">

              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-orange-600" />

                  <p className="text-sm leading-6 text-gray-600">
                    {benefit}
                  </p>
                </div>
              ))}

            </div>
          </div>

          {/* CTA */}

          <div className="flex flex-col justify-center rounded-3xl bg-orange-600 p-6 text-white shadow-sm sm:p-8">

            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-100">
              {t("ready")}
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {t("ctaTitle")}
            </h2>

            <p className="mt-3 max-w-xl text-orange-50">
              {t("ctaDescription")}
            </p>

            <button
              type="button"
              onClick={handleJoinMembership}
              disabled={loading}
              className="mt-7 inline-flex w-fit items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-orange-600 transition hover:bg-orange-50 disabled:opacity-60"
            >
              {t("startApplication")}

              <ArrowRight className="h-4 w-4" />
            </button>

          </div>

        </div>
      </section>

    </main>
  );
}

function BenefitCard({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div className="rounded-3xl border border-orange-100 bg-white p-6 shadow-sm">

      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100">
        <Icon className="h-6 w-6 text-orange-600" />
      </div>

      <h3 className="text-lg font-bold text-gray-900">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-gray-500">
        {description}
      </p>

    </div>
  );
}

// "use client";

// import { useTranslations } from "next-intl";
// import { Link } from "@/i18n/navigation";
// import {
//   Users,
//   ShieldCheck,
//   HeartHandshake,
//   ArrowRight,
//   CheckCircle2,
// } from "lucide-react";

// export default function JoinUsPage() {
//   const t = useTranslations("JoinUs");

//   const benefits = [
//     t("benefit1"),
//     t("benefit2"),
//     t("benefit3"),
//     t("benefit4"),
//   ];

//   return (
//     <main className="min-h-screen bg-[#f8f6f1]">
//       {/* Hero */}
//       <section className="relative overflow-hidden bg-[#24180f] px-4 py-16 text-white sm:px-6 md:py-24">
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-orange-500 blur-3xl" />
//           <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-orange-400 blur-3xl" />
//         </div>

//         <div className="relative mx-auto max-w-6xl">
//           <div className="max-w-3xl">
//             <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-orange-400">
//               {t("eyebrow")}
//             </p>

//             <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
//               {t("title")}
//             </h1>

//             <p className="mt-6 max-w-2xl text-base leading-7 text-white/75 md:text-lg">
//               {t("description")}
//             </p>

//             <div className="mt-8 flex flex-col gap-3 sm:flex-row">
//               <Link
//                 href="/membership/apply"
//                 className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-6 py-3.5 font-semibold text-white transition hover:bg-orange-700"
//               >
//                 {t("applyNow")}
//                 <ArrowRight className="h-4 w-4" />
//               </Link>

//               <Link
//                 href="/dashboard"
//                 className="inline-flex items-center justify-center rounded-xl border border-white/20 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
//               >
//                 {t("dashboard")}
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Why Join */}
//       <section className="px-4 py-14 sm:px-6 md:py-20">
//         <div className="mx-auto max-w-6xl">
//           <div className="mb-10 max-w-2xl">
//             <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">
//               {t("whyJoin")}
//             </p>

//             <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
//               {t("whyJoinTitle")}
//             </h2>

//             <p className="mt-3 text-gray-500">
//               {t("whyJoinDescription")}
//             </p>
//           </div>

//           <div className="grid gap-5 md:grid-cols-3">
//             <BenefitCard
//               icon={Users}
//               title={t("communityTitle")}
//               description={t("communityDescription")}
//             />

//             <BenefitCard
//               icon={HeartHandshake}
//               title={t("serviceTitle")}
//               description={t("serviceDescription")}
//             />

//             <BenefitCard
//               icon={ShieldCheck}
//               title={t("identityTitle")}
//               description={t("identityDescription")}
//             />
//           </div>
//         </div>
//       </section>

//       {/* Benefits + CTA */}
//       <section className="px-4 pb-16 sm:px-6 md:pb-24">
//         <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
//           <div className="rounded-3xl border border-orange-100 bg-white p-6 shadow-sm sm:p-8">
//             <h2 className="text-2xl font-bold text-gray-900">
//               {t("benefitsTitle")}
//             </h2>

//             <div className="mt-6 space-y-4">
//               {benefits.map((benefit) => (
//                 <div
//                   key={benefit}
//                   className="flex items-start gap-3"
//                 >
//                   <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-orange-600" />

//                   <p className="text-sm leading-6 text-gray-600">
//                     {benefit}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="flex flex-col justify-center rounded-3xl bg-orange-600 p-6 text-white shadow-sm sm:p-8">
//             <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-100">
//               {t("ready")}
//             </p>

//             <h2 className="mt-2 text-3xl font-bold">
//               {t("ctaTitle")}
//             </h2>

//             <p className="mt-3 max-w-xl text-orange-50">
//               {t("ctaDescription")}
//             </p>

//             <Link
//               href="/membership/apply"
//               className="mt-7 inline-flex w-fit items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-orange-600 transition hover:bg-orange-50"
//             >
//               {t("startApplication")}
//               <ArrowRight className="h-4 w-4" />
//             </Link>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }

// function BenefitCard({
//   icon: Icon,
//   title,
//   description,
// }) {
//   return (
//     <div className="rounded-3xl border border-orange-100 bg-white p-6 shadow-sm">
//       <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100">
//         <Icon className="h-6 w-6 text-orange-600" />
//       </div>

//       <h3 className="text-lg font-bold text-gray-900">
//         {title}
//       </h3>

//       <p className="mt-2 text-sm leading-6 text-gray-500">
//         {description}
//       </p>
//     </div>
//   );
// }