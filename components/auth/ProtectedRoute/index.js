"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({
  children,
}) {
  const {
    isLoggedIn,
    loading,
  } = useAuth();

  const router = useRouter();

  const pathname = usePathname();

  useEffect(() => {
    if (
      !loading &&
      !isLoggedIn
    ) {
      /*
      pathname:
      /en/membership/apply

      next-intl router ke liye
      locale remove karna better hoga.
      */

      const cleanPath =
        pathname.replace(
          /^\/(en|hi)/,
          ""
        ) ||
        "/dashboard";

      router.replace(
        `/login?redirect=${encodeURIComponent(
          cleanPath
        )}`
      );
    }
  }, [
    loading,
    isLoggedIn,
    router,
    pathname,
  ]);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">

        <div className="text-center">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-orange-200 border-t-orange-600" />

          <p className="mt-4 text-sm text-gray-500">
            Loading...
          </p>

        </div>

      </div>
    );
  }

  if (!isLoggedIn) {
    return null;
  }

  return children;
}