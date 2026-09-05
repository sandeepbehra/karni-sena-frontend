"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Languages } from "lucide-react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = (newLocale) => {
    router.replace(pathname, {
      locale: newLocale
    });
  };

  return (
    <div className="flex items-center gap-2">
      {/* <Languages className="w-4 h-4 text-orange-600" /> */}

      <select
        value={locale}
        onChange={(e) => changeLanguage(e.target.value)}
        className="bg-transparent text-sm font-medium outline-none cursor-pointer"
      >
        <option value="en">English</option>
        <option value="hi">हिंदी</option>
      </select>
    </div>
  );
}