"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import {
  Link,
  usePathname,
  useRouter,
} from "@/i18n/navigation";

import { useAuth } from "@/context/AuthContext";

import {
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  UserRound,
  BadgeCheck,
  FileClock,
  UserPlus,
  ChevronDown,
  Languages,
} from "lucide-react";

export default function Navbar() {
  const t = useTranslations("Navbar");

  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const {
    user,
    isLoggedIn,
    loading,
    logout,
  } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);

  const [
    profileDropdownOpen,
    setProfileDropdownOpen,
  ] = useState(false);

  const [
    languageDropdownOpen,
    setLanguageDropdownOpen,
  ] = useState(false);

  const profileRef = useRef(null);
  const languageRef = useRef(null);

  const membershipStatus =
    user?.membership?.status;

  /*
  ========================================
  NAV ITEMS
  ========================================
  */

  const navItems = [
    {
      label: t("home"),
      href: "/",
    },
    {
      label: t("about"),
      href: "/aboutus",
    },
    {
      label: t("events"),
      href: "/events",
    },
    {
      label: t("media"),
      href: "/media",
    },
    {
      label: t("blogs"),
      href: "/blogs",
    },
    {
      label: t("contact"),
      href: "/contactus",
    },
  ];

  /*
  ========================================
  CLOSE ALL MENUS
  ========================================
  */

  const closeMenus = () => {
    setMobileOpen(false);
    setProfileDropdownOpen(false);
    setLanguageDropdownOpen(false);
  };

  /*
  ========================================
  OUTSIDE CLICK
  ========================================
  */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileDropdownOpen(false);
      }

      if (
        languageRef.current &&
        !languageRef.current.contains(event.target)
      ) {
        setLanguageDropdownOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /*
  ========================================
  LOGOUT
  ========================================
  */

  const handleLogout = () => {
    logout();

    closeMenus();

    router.replace("/");
  };

  /*
  ========================================
  LANGUAGE CHANGE
  ========================================
  */

  const handleLanguageChange = (
    newLocale
  ) => {
    router.replace(pathname, {
      locale: newLocale,
    });

    closeMenus();
  };

  /*
  ========================================
  MEMBERSHIP MENU
  ========================================
  */

  const getMembershipMenu = () => {
    /*
    No membership application
    */

    if (!membershipStatus) {
      return {
        label: t("joinMembership"),
        href: "/membership/apply",
        icon: UserPlus,
      };
    }

    /*
    Pending / rejected
    */

    if (
      membershipStatus === "pending" ||
      membershipStatus === "rejected"
    ) {
      return {
        label: t("membershipStatus"),
        href: "/membership/status",
        icon: FileClock,
      };
    }

    /*
    Approved
    */

    if (
      membershipStatus === "approved"
    ) {
      return {
        label: t("memberProfile"),
        href: "/membership/profile",
        icon: BadgeCheck,
      };
    }

    return null;
  };

  const membershipMenu =
    getMembershipMenu();

  return (
    <header className="sticky top-0 z-50 border-b border-orange-100 bg-white/95 backdrop-blur-md">

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* LOGO */}
        <img src="/logo-full.png" alt="Logo" className="h-auto w-32" />

        {/* <Link
          href="/"
          onClick={closeMenus}
          className="flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-600 text-lg font-bold text-white">
            KS
          </div>

          <div className="hidden sm:block">
            <p className="text-lg font-bold leading-none text-gray-900">
              {t("brand")}
            </p>

            <p className="mt-1 text-xs font-medium text-orange-600">
              {t("tagline")}
            </p>
          </div>
        </Link> */}

        {/* DESKTOP NAV */}

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(
                    item.href
                  );

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenus}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-orange-50 text-orange-600"
                    : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* RIGHT SIDE */}

        <div className="flex items-center gap-2">

          {/* LANGUAGE DROPDOWN */}

          <div
            ref={languageRef}
            className="relative hidden sm:block"
          >
            <button
              type="button"
              onClick={() => {
                setLanguageDropdownOpen(
                  (prev) => !prev
                );

                setProfileDropdownOpen(false);
              }}
              className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:border-orange-200 hover:text-orange-600"
            >
              <Languages className="h-4 w-4" />

              {locale === "hi"
                ? "हिंदी"
                : "EN"}

              <ChevronDown
                className={`h-4 w-4 transition ${
                  languageDropdownOpen
                    ? "rotate-180"
                    : ""
                }`}
              />
            </button>

            {languageDropdownOpen && (
              <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-36 overflow-hidden rounded-xl border border-gray-100 bg-white p-1 shadow-xl">

                <button
                  type="button"
                  onClick={() =>
                    handleLanguageChange(
                      "en"
                    )
                  }
                  className={`flex w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                    locale === "en"
                      ? "bg-orange-50 font-semibold text-orange-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  English
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleLanguageChange(
                      "hi"
                    )
                  }
                  className={`flex w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                    locale === "hi"
                      ? "bg-orange-50 font-semibold text-orange-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  हिंदी
                </button>

              </div>
            )}
          </div>

          {/* GUEST AUTH */}

          {!loading &&
            !isLoggedIn && (
              <div className="hidden items-center gap-2 lg:flex">

                <Link
                  href="/login"
                  onClick={closeMenus}
                  className="rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-orange-50 hover:text-orange-600"
                >
                  {t("login")}
                </Link>

                <Link
                  href="/join-us"
                  onClick={closeMenus}
                  className="rounded-xl bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-700"
                >
                  {t("joinUs")}
                </Link>

              </div>
            )}

          {/* LOGGED IN PROFILE */}

          {!loading &&
            isLoggedIn && (
              <div
                ref={profileRef}
                className="relative hidden lg:block"
              >
                <button
                  type="button"
                  onClick={() => {
                    setProfileDropdownOpen(
                      (prev) => !prev
                    );

                    setLanguageDropdownOpen(
                      false
                    );
                  }}
                  className="flex items-center gap-2 rounded-xl border border-gray-200 px-2.5 py-2 transition hover:border-orange-200"
                >

                  <UserAvatar
                    user={user}
                  />

                  <div className="max-w-[130px] text-left">

                    <p className="truncate text-sm font-semibold text-gray-900">
                      {user?.name ||
                        t("user")}
                    </p>

                    <p className="truncate text-[11px] text-gray-400">
                      {getUserStatusLabel(
                        membershipStatus,
                        t
                      )}
                    </p>

                  </div>

                  <ChevronDown
                    className={`h-4 w-4 text-gray-400 transition ${
                      profileDropdownOpen
                        ? "rotate-180"
                        : ""
                    }`}
                  />

                </button>

                {profileDropdownOpen && (
                  <ProfileDropdown
                    user={user}
                    membershipMenu={
                      membershipMenu
                    }
                    handleLogout={
                      handleLogout
                    }
                    closeMenus={
                      closeMenus
                    }
                    t={t}
                  />
                )}

              </div>
            )}

          {/* MOBILE BUTTON */}

          <button
            type="button"
            onClick={() => {
              setMobileOpen(
                (prev) => !prev
              );

              setProfileDropdownOpen(
                false
              );

              setLanguageDropdownOpen(
                false
              );
            }}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-700 transition hover:border-orange-200 hover:text-orange-600 lg:hidden"
            aria-label="Menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

        </div>
      </div>

      {/* MOBILE NAV */}

      {mobileOpen && (
        <MobileMenu
          navItems={navItems}
          pathname={pathname}
          locale={locale}
          handleLanguageChange={
            handleLanguageChange
          }
          loading={loading}
          isLoggedIn={isLoggedIn}
          user={user}
          membershipMenu={
            membershipMenu
          }
          handleLogout={
            handleLogout
          }
          closeMenus={
            closeMenus
          }
          t={t}
        />
      )}

    </header>
  );
}

/*
========================================
PROFILE DROPDOWN
========================================
*/

function ProfileDropdown({
  user,
  membershipMenu,
  handleLogout,
  closeMenus,
  t,
}) {
  return (
    <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-64 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">

      {/* USER INFO */}

      <div className="border-b border-gray-100 p-4">

        <div className="flex items-center gap-3">

          <UserAvatar
            user={user}
            large
          />

          <div className="min-w-0">

            <p className="truncate text-sm font-bold text-gray-900">
              {user?.name ||
                t("user")}
            </p>

            <p className="truncate text-xs text-gray-500">
              {user?.email || "-"}
            </p>

          </div>

        </div>

      </div>

      {/* LINKS */}

      <div className="p-2">

        <DropdownLink
          href="/dashboard"
          icon={LayoutDashboard}
          label={t("dashboard")}
          onClick={closeMenus}
        />

        <DropdownLink
          href="/profile"
          icon={UserRound}
          label={t("myProfile")}
          onClick={closeMenus}
        />

        {membershipMenu && (
          <DropdownLink
            href={
              membershipMenu.href
            }
            icon={
              membershipMenu.icon
            }
            label={
              membershipMenu.label
            }
            onClick={closeMenus}
          />
        )}

      </div>

      {/* LOGOUT */}

      <div className="border-t border-gray-100 p-2">

        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" />

          {t("logout")}
        </button>

      </div>

    </div>
  );
}

/*
========================================
DROPDOWN LINK
========================================
*/

function DropdownLink({
  href,
  icon: Icon,
  label,
  onClick,
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-orange-50 hover:text-orange-600"
    >
      <Icon className="h-4 w-4 shrink-0" />

      <span>
        {label}
      </span>
    </Link>
  );
}

/*
========================================
USER AVATAR
========================================
*/

function UserAvatar({
  user,
  large = false,
}) {
  const size = large
    ? "h-11 w-11"
    : "h-9 w-9";

  if (user?.profileImage) {
    return (
      <img
        src={user.profileImage}
        alt={user?.name || "User"}
        className={`${size} shrink-0 rounded-full object-cover`}
      />
    );
  }

  const initial =
    user?.name
      ?.trim()
      ?.charAt(0)
      ?.toUpperCase() ||
    "U";

  return (
    <div
      className={`${size} flex shrink-0 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-600`}
    >
      {initial}
    </div>
  );
}

/*
========================================
MOBILE MENU
========================================
*/

function MobileMenu({
  navItems,
  pathname,
  locale,
  handleLanguageChange,
  loading,
  isLoggedIn,
  user,
  membershipMenu,
  handleLogout,
  closeMenus,
  t,
}) {
  return (
    <div className="border-t border-gray-100 bg-white px-4 py-5 shadow-lg lg:hidden">

      {/* MOBILE NAV LINKS */}

      <nav className="space-y-1">

        {navItems.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(
                  item.href
                );

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenus}
              className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${
                active
                  ? "bg-orange-50 text-orange-600"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {item.label}
            </Link>
          );
        })}

      </nav>

      {/* MOBILE LANGUAGE */}

      <div className="mt-4 border-t border-gray-100 pt-4">

        <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
          {t("language")}
        </p>

        <div className="grid grid-cols-2 gap-2">

          <button
            type="button"
            onClick={() =>
              handleLanguageChange(
                "en"
              )
            }
            className={`rounded-xl px-4 py-2.5 text-sm font-medium transition ${
              locale === "en"
                ? "bg-orange-600 text-white"
                : "bg-gray-50 text-gray-700"
            }`}
          >
            English
          </button>

          <button
            type="button"
            onClick={() =>
              handleLanguageChange(
                "hi"
              )
            }
            className={`rounded-xl px-4 py-2.5 text-sm font-medium transition ${
              locale === "hi"
                ? "bg-orange-600 text-white"
                : "bg-gray-50 text-gray-700"
            }`}
          >
            हिंदी
          </button>

        </div>

      </div>

      {/* MOBILE AUTH */}

      {!loading && (
        <div className="mt-5 border-t border-gray-100 pt-5">

          {!isLoggedIn ? (
            <div className="grid grid-cols-2 gap-3">

              <Link
                href="/login"
                onClick={closeMenus}
                className="rounded-xl border border-orange-200 px-4 py-3 text-center text-sm font-semibold text-orange-600 transition hover:bg-orange-50"
              >
                {t("login")}
              </Link>

              <Link
                href="/join-us"
                onClick={closeMenus}
                className="rounded-xl bg-orange-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-orange-700"
              >
                {t("joinUs")}
              </Link>

            </div>
          ) : (
            <div>

              {/* USER INFO */}

              <div className="mb-3 flex items-center gap-3 rounded-2xl bg-gray-50 p-4">

                <UserAvatar
                  user={user}
                  large
                />

                <div className="min-w-0">

                  <p className="truncate text-sm font-bold text-gray-900">
                    {user?.name ||
                      t("user")}
                  </p>

                  <p className="truncate text-xs text-gray-500">
                    {user?.email ||
                      "-"}
                  </p>

                </div>

              </div>

              {/* USER LINKS */}

              <div className="space-y-1">

                <DropdownLink
                  href="/dashboard"
                  icon={
                    LayoutDashboard
                  }
                  label={
                    t("dashboard")
                  }
                  onClick={
                    closeMenus
                  }
                />

                <DropdownLink
                  href="/profile"
                  icon={UserRound}
                  label={
                    t("myProfile")
                  }
                  onClick={
                    closeMenus
                  }
                />

                {membershipMenu && (
                  <DropdownLink
                    href={
                      membershipMenu.href
                    }
                    icon={
                      membershipMenu.icon
                    }
                    label={
                      membershipMenu.label
                    }
                    onClick={
                      closeMenus
                    }
                  />
                )}

                <button
                  type="button"
                  onClick={
                    handleLogout
                  }
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />

                  {t("logout")}
                </button>

              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}

/*
========================================
USER STATUS LABEL
========================================
*/

function getUserStatusLabel(
  status,
  t
) {
  if (status === "approved") {
    return t("activeMember");
  }

  if (status === "pending") {
    return t("pendingMember");
  }

  if (status === "rejected") {
    return t(
      "membershipRejected"
    );
  }

  return t("registeredUser");
}
// "use client";

// import { useState } from "react";
// import Link from "next/link";

// const navLinks = [
//   { label: "Home", href: "/" },
//   { label: "About Us", href: "/about" },
//   { label: "Events", href: "/events" },
//   { label: "Media", href: "/media" },
//   { label: "Contact Us", href: "/contact-us" },
//   { label: "Blogs", href: "/blogs" },
// ];

// export default function Navbar() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const closeMobileMenu = () => {
//     setMobileMenuOpen(false);
//   };

//   return (
//     <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
          
//           {/* Logo */}
//           <Link
//             href="/"
//             onClick={closeMobileMenu}
//             className="flex items-center shrink-0"
//           >
//             <img
//               src="/logo-full.png"
//               alt="Karni Sena"
//               className="h-auto w-32 sm:w-36"
//             />
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            
//             {/* Main Links */}
//             {navLinks.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className="relative text-gray-700 hover:text-orange-600 font-medium transition-colors duration-200 py-2 group"
//               >
//                 {link.label}

//                 {/* Hover underline */}
//                 <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-orange-600 transition-all duration-300 group-hover:w-full" />
//               </Link>
//             ))}

//             {/* Login */}
//             <Link
//               href="/login"
//               className="text-gray-700 hover:text-orange-600 font-semibold transition-colors duration-200"
//             >
//               Login
//             </Link>

//             {/* Join Us */}
//             <Link
//               href="/join-us"
//               className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
//             >
//               Join Us
//             </Link>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setMobileMenuOpen((prev) => !prev)}
//             className="lg:hidden text-gray-800 hover:text-orange-600 p-2 focus:outline-none"
//             aria-label="Toggle menu"
//             aria-expanded={mobileMenuOpen}
//           >
//             <div className="w-6 h-6 relative flex items-center justify-center">
              
//               {/* Top */}
//               <span
//                 className={`absolute h-0.5 w-6 bg-current transition-all duration-300 ${
//                   mobileMenuOpen
//                     ? "rotate-45"
//                     : "-translate-y-2"
//                 }`}
//               />

//               {/* Middle */}
//               <span
//                 className={`absolute h-0.5 w-6 bg-current transition-all duration-200 ${
//                   mobileMenuOpen
//                     ? "opacity-0"
//                     : "opacity-100"
//                 }`}
//               />

//               {/* Bottom */}
//               <span
//                 className={`absolute h-0.5 w-6 bg-current transition-all duration-300 ${
//                   mobileMenuOpen
//                     ? "-rotate-45"
//                     : "translate-y-2"
//                 }`}
//               />
//             </div>
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <div
//         className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
//           mobileMenuOpen
//             ? "max-h-[600px] opacity-100"
//             : "max-h-0 opacity-0"
//         }`}
//       >
//         <div className="border-t border-gray-100 bg-white px-5 py-5">
          
//           <div className="flex flex-col">
            
//             {/* Navigation Links */}
//             {navLinks.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 onClick={closeMobileMenu}
//                 className="py-3.5 text-gray-800 font-medium border-b border-gray-100 hover:text-orange-600 transition-colors"
//               >
//                 {link.label}
//               </Link>
//             ))}

//             {/* Login */}
//             <Link
//               href="/login"
//               onClick={closeMobileMenu}
//               className="py-3.5 text-gray-800 font-semibold border-b border-gray-100 hover:text-orange-600 transition-colors"
//             >
//               Login
//             </Link>

//             {/* Join Us */}
//             <div className="pt-5">
//               <Link
//                 href="/join-us"
//                 onClick={closeMobileMenu}
//                 className="block w-full text-center bg-orange-600 hover:bg-orange-700 text-white font-semibold px-5 py-3 rounded-lg transition-all duration-200 shadow-sm"
//               >
//                 Join Us
//               </Link>
//             </div>

//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }