
"use client";

import { useEffect, useMemo, useState } from "react";

import { useLocale, useTranslations } from "next-intl";

import { useSearchParams } from "next/navigation";

import { Link, useRouter } from "@/i18n/navigation";

import { useAuth } from "@/context/AuthContext";

import { State, City } from "country-state-city";

import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Eye,
  EyeOff,
  ImagePlus,
  Loader2,
  LockKeyhole,
  Phone,
  ShieldCheck,
  UserPlus,
  X,
} from "lucide-react";

/*
=====================================================
OCCUPATION OPTIONS
=====================================================
*/

const occupationOptions = [
  {
    label: "Student",
    value: "student",
  },
  {
    label: "Business",
    value: "business",
  },
  {
    label: "Private Job",
    value: "private_job",
  },
  {
    label: "Government Job",
    value: "government_job",
  },
  {
    label: "Farmer",
    value: "farmer",
  },
  {
    label: "Self Employed",
    value: "self_employed",
  },
  {
    label: "Social Worker",
    value: "social_worker",
  },
  {
    label: "Other",
    value: "other",
  },
];

const S3_BASE_URL = "https://karni-sena.s3.ap-south-1.amazonaws.com";
const API_ENDPOINTS = {
  generateOtp:
    "https://6zq9472qqb.execute-api.ap-south-1.amazonaws.com/auth/generate-otp",

  verifyOtp:
    "https://6zq9472qqb.execute-api.ap-south-1.amazonaws.com/auth/verify-otp",

  register:
    "https://6zq9472qqb.execute-api.ap-south-1.amazonaws.com/auth/register",
};

/*
=====================================================
IMAGE PRESIGNED URL API
=====================================================
*/

const IMAGE_UPLOAD_API =
  "https://6zq9472qqb.execute-api.ap-south-1.amazonaws.com/upload";

/*
=====================================================
COMMON INPUT CLASS
=====================================================
*/

const inputClass =
  "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500";

export default function SignupPage() {
  const t = useTranslations("Signup");

  const locale = useLocale();

  const router = useRouter();

  const searchParams = useSearchParams();

  const { signup } = useAuth();

  /*
  =====================================================
  REDIRECT
  =====================================================
  */

  const redirect = searchParams.get("redirect") || "/dashboard";

  const loginHref =
    redirect !== "/dashboard"
      ? `/login?redirect=${encodeURIComponent(redirect)}`
      : "/login";

  /*
  =====================================================
  STEP

  1 = Mobile
  2 = OTP
  3 = Registration form
  =====================================================
  */

  const [step, setStep] = useState(1);

  /*
  =====================================================
  MOBILE / OTP
  =====================================================
  */

  const [phone, setPhone] = useState("");

  const [otp, setOtp] = useState("");

  const [isPhoneVerified, setIsPhoneVerified] = useState(false);

  const [resendTimer, setResendTimer] = useState(0);

  /*
  =====================================================
  FORM DATA
  =====================================================
  */

  const [formData, setFormData] = useState({
    fullName: "",
    guardianName: "",
    dob: "",
    gender: "",

    alternateContactNumber: "",
    email: "",

    /*
    Address
    */

    street: "",

    country: "India",
    countryCode: "IN",

    state: "",
    stateCode: "",

    district: "",
    city: "",

    postalCode: "",

    /*
    Professional
    */

    occupation: "",
    organizationalUnit: "",

    /*
    Preferred language
    */

    preferredLanguage: locale === "hi" ? "HIN" : "ENG",

    /*
    Password
    */

    password: "",
    confirmPassword: "",
  });

  /*
  =====================================================
  PHOTO
  =====================================================
  */

  const [photo, setPhoto] = useState(null);

  const [photoPreview, setPhotoPreview] = useState("");

  /*
  =====================================================
  UI STATES
  =====================================================
  */

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [loadingType, setLoadingType] = useState("");

  const [error, setError] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const [showErrorPopup, setShowErrorPopup] = useState(false);

  /*
  =====================================================
  INDIA STATES
  =====================================================
  */

  const states = useMemo(() => {
    return State.getStatesOfCountry("IN");
  }, []);

  /*
  =====================================================
  CITIES
  =====================================================
  */

  const cities = useMemo(() => {
    if (!formData.stateCode) {
      return [];
    }

    return City.getCitiesOfState("IN", formData.stateCode);
  }, [formData.stateCode]);

  /*
  =====================================================
  DISTRICTS

  country-state-city me actual district
  data nahi hota.

  Currently selected state ki city list
  ko district dropdown ke liye use kar rahe hain.
  =====================================================
  */

  const districts = cities;

  /*
  =====================================================
  ERROR HELPER
  =====================================================
  */

  const showErrorMessage = (message) => {
    setError(message);
    setShowErrorPopup(true);
  };

  /*
  =====================================================
  AUTO HIDE ERROR POPUP
  =====================================================
  */

  useEffect(() => {
    if (!showErrorPopup) {
      return;
    }

    const timer = setTimeout(() => {
      setShowErrorPopup(false);
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [showErrorPopup]);

  /*
  =====================================================
  RESEND TIMER
  =====================================================
  */

  useEffect(() => {
    if (resendTimer <= 0) {
      return;
    }

    const interval = setInterval(() => {
      setResendTimer((previous) => {
        if (previous <= 1) {
          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [resendTimer]);

  /*
  =====================================================
  PHOTO PREVIEW CLEANUP
  =====================================================
  */

  useEffect(() => {
    return () => {
      if (photoPreview) {
        URL.revokeObjectURL(photoPreview);
      }
    };
  }, [photoPreview]);

  /*
  =====================================================
  NORMAL INPUT CHANGE
  =====================================================
  */

  const handleChange = (event) => {
    const { name, value } = event.target;

    /*
    Numeric-only fields
    */

    if (name === "alternateContactNumber" || name === "postalCode") {
      const onlyNumbers = value.replace(/\D/g, "");

      setFormData((previous) => ({
        ...previous,

        [name]: onlyNumbers,
      }));

      return;
    }

    setFormData((previous) => ({
      ...previous,

      [name]: value,
    }));
  };

  /*
  =====================================================
  PHONE CHANGE
  =====================================================
  */

  const handlePhoneChange = (event) => {
    const onlyNumbers = event.target.value.replace(/\D/g, "");

    setPhone(onlyNumbers.slice(0, 10));
  };

  /*
  =====================================================
  OTP CHANGE
  =====================================================
  */

  const handleOtpChange = (event) => {
    const onlyNumbers = event.target.value.replace(/\D/g, "");

    setOtp(onlyNumbers.slice(0, 6));
  };

  /*
  =====================================================
  STATE CHANGE
  =====================================================
  */

  const handleStateChange = (event) => {
    const stateCode = event.target.value;

    const selectedState = states.find((state) => state.isoCode === stateCode);

    setFormData((previous) => ({
      ...previous,

      state: selectedState?.name || "",

      stateCode,

      district: "",
      city: "",
    }));
  };

  /*
  =====================================================
  DISTRICT CHANGE
  =====================================================
  */

  const handleDistrictChange = (event) => {
    setFormData((previous) => ({
      ...previous,

      district: event.target.value,
    }));
  };

  /*
  =====================================================
  CITY CHANGE
  =====================================================
  */

  const handleCityChange = (event) => {
    setFormData((previous) => ({
      ...previous,

      city: event.target.value,
    }));
  };

  /*
  =====================================================
  SAFE API RESPONSE PARSER
  =====================================================
  */

  const parseApiResponse = async (response) => {
    const contentType = response.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      return await response.json();
    }

    const text = await response.text();

    return {
      message: text || `Request failed with status ${response.status}`,
    };
  };

  /*
  =====================================================
  GENERATE OTP
  =====================================================
  */

  const handleGenerateOtp = async () => {
    setError("");
    setSuccessMessage("");
    setShowErrorPopup(false);

    if (!/^[0-9]{10}$/.test(phone)) {
      showErrorMessage(t("invalidMobile"));

      return;
    }

    try {
      setLoading(true);

      setLoadingType("generateOtp");

      const response = await fetch(API_ENDPOINTS.generateOtp, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          phoneNumber: phone,
        }),
      });

      const data = await parseApiResponse(response);

      if (!response.ok) {
        throw new Error(data?.message || data?.error || t("otpGenerateError"));
      }

      setOtp("");

      setResendTimer(60);

      setSuccessMessage(data?.message || t("otpSent"));

      setStep(2);
    } catch (error) {
      console.error("Generate OTP error:", error);

      showErrorMessage(error?.message || t("otpGenerateError"));
    } finally {
      setLoading(false);

      setLoadingType("");
    }
  };

  /*
  =====================================================
  VERIFY OTP
  =====================================================
  */

  const handleVerifyOtp = async () => {
    setError("");
    setSuccessMessage("");
    setShowErrorPopup(false);

    if (!/^[0-9]{4,6}$/.test(otp)) {
      showErrorMessage(t("invalidOtp"));

      return;
    }

    try {
      setLoading(true);

      setLoadingType("verifyOtp");

      const response = await fetch(API_ENDPOINTS.verifyOtp, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          phoneNumber: phone,
          otp: otp,
        }),
      });

      const data = await parseApiResponse(response);

      if (!response.ok) {
        throw new Error(data?.message || data?.error || t("otpVerifyError"));
      }

      setIsPhoneVerified(true);

      setSuccessMessage(data?.message || t("phoneVerified"));

      setStep(3);
    } catch (error) {
      console.error("Verify OTP error:", error);

      showErrorMessage(error?.message || t("otpVerifyError"));
    } finally {
      setLoading(false);

      setLoadingType("");
    }
  };

  /*
  =====================================================
  RESEND OTP
  =====================================================
  */

  const handleResendOtp = async () => {
    if (resendTimer > 0 || loading) {
      return;
    }

    await handleGenerateOtp();
  };

  /*
  =====================================================
  CHANGE MOBILE
  =====================================================
  */

  const handleChangeMobile = () => {
    if (isPhoneVerified) {
      return;
    }

    setOtp("");

    setError("");

    setSuccessMessage("");

    setShowErrorPopup(false);

    setResendTimer(0);

    setStep(1);
  };

  /*
  =====================================================
  PHOTO CHANGE
  =====================================================
  */

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      showErrorMessage(t("invalidPhotoType"));

      return;
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      showErrorMessage(t("photoTooLarge"));

      return;
    }

    setError("");
    setShowErrorPopup(false);

    if (photoPreview) {
      URL.revokeObjectURL(photoPreview);
    }

    setPhoto(file);

    const previewUrl = URL.createObjectURL(file);

    setPhotoPreview(previewUrl);
  };

  /*
  =====================================================
  PHOTO UPLOAD

  1. POST API for presigned URL
  2. get uploadUrl + filePath
  3. PUT actual file to S3
  4. return filePath
  =====================================================
  */

  const uploadPhoto = async () => {
    if (!photo) {
      throw new Error(t("photoRequired"));
    }

    /*
      ==============================================
      STEP 1
      GET PRESIGNED URL
      ==============================================
      */

    const generateResponse = await fetch(IMAGE_UPLOAD_API, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        fileName: photo.name,

        contentType: photo.type,
      }),
    });

    const generateData = await parseApiResponse(generateResponse);

    if (!generateResponse.ok || !generateData?.success) {
      throw new Error(generateData?.message || t("photoUrlError"));
    }

    const uploadUrl = generateData?.data?.uploadUrl;

    const filePath = generateData?.data?.filePath;

    if (!uploadUrl || !filePath) {
      throw new Error(t("photoUrlError"));
    }

    /*
      ==============================================
      STEP 2
      PUT FILE DIRECTLY TO S3
      ==============================================
      */

    const uploadResponse = await fetch(uploadUrl, {
      method: "PUT",

      headers: {
        "Content-Type": photo.type,
      },

      body: photo,
    });

    if (!uploadResponse.ok) {
      const responseText = await uploadResponse.text();

      console.error("S3 upload error:", responseText);

      throw new Error(t("photoUploadError"));
    }

    return filePath;
  };

  /*
  =====================================================
  FORM VALIDATION
  =====================================================
  */

  const validateForm = () => {
    if (!isPhoneVerified) {
      return t("verifyPhoneFirst");
    }

    if (!formData.fullName.trim()) {
      return t("nameRequired");
    }

    if (!formData.guardianName.trim()) {
      return t("guardianRequired");
    }

    if (!formData.dob) {
      return t("dobRequired");
    }

    if (!formData.gender) {
      return t("genderRequired");
    }

    if (
      formData.alternateContactNumber &&
      !/^[0-9]{10}$/.test(formData.alternateContactNumber)
    ) {
      return t("invalidAlternateMobile");
    }

    if (
      formData.alternateContactNumber &&
      formData.alternateContactNumber === phone
    ) {
      return t("alternateSameAsPhone");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return t("invalidEmail");
    }

    /*
      ADDRESS
      */

    if (!formData.street.trim()) {
      return t("streetRequired");
    }

    if (!formData.state) {
      return t("stateRequired");
    }

    if (!formData.district) {
      return t("districtRequired");
    }

    if (!formData.city) {
      return t("cityRequired");
    }

    if (!/^[0-9]{6}$/.test(formData.postalCode)) {
      return t("invalidPostalCode");
    }

    /*
      OCCUPATION
      */

    if (!formData.occupation) {
      return t("occupationRequired");
    }

    if (!formData.organizationalUnit.trim()) {
      return t("organizationalUnitRequired");
    }

    /*
      PHOTO
      */

    if (!photo) {
      return t("photoRequired");
    }

    /*
      PASSWORD
      */

    if (formData.password.length < 8) {
      return t("passwordLength");
    }

    if (formData.password !== formData.confirmPassword) {
      return t("passwordMismatch");
    }

    return "";
  };

  /*
  =====================================================
  REGISTER
  =====================================================
  */

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccessMessage("");
    setShowErrorPopup(false);

    /*
      =====================================
      FRONTEND VALIDATION
      =====================================
      */

    const validationError = validateForm();

    if (validationError) {
      showErrorMessage(validationError);

      return;
    }

    try {
      setLoading(true);

      setLoadingType("photo");

      const photoFilePath = await uploadPhoto();

      const finalPhotoUrl = `${S3_BASE_URL}/${photoFilePath}`;

      console.log("Uploaded photo path:", photoFilePath);

      /*
        =====================================
        FINAL REGISTER PAYLOAD
        =====================================
        */

      const payload = {
        fullName: formData.fullName.trim(),

        guardianName: formData.guardianName.trim(),

        dob: formData.dob,

        gender: formData.gender,

        /*
          Verified mobile number
          */

        phone,

        alternateContactNumber: formData.alternateContactNumber,

        email: formData.email.trim().toLowerCase(),

        /*
          label = same as selected/entered value
          */

        address: {
          street: {
            name: formData.street.trim(),

            label: formData.street.trim(),
          },

          city: {
            name: formData.city,

            label: formData.city,
          },

          district: {
            name: formData.district,

            label: formData.district,
          },

          state: {
            name: formData.state,

            label: formData.state,
          },

          postalCode: formData.postalCode,
        },

        /*
          OTP retained after verification
          */

        otp,

        /*
          Dropdown machine value
          example private_job
          */

        occupation: formData.occupation,

        organizationalUnit: formData.organizationalUnit.trim(),

        /*
          S3 filePath
          */

        photoUrl: finalPhotoUrl,

        preferredLanguage: formData.preferredLanguage,

        password: formData.password,

        confirmPassword: formData.confirmPassword,
      };

      console.log("Final Register Payload:", payload);

      /*
        =====================================
        REGISTER API
        =====================================
        */

      setLoadingType("register");

      const response = await fetch(API_ENDPOINTS.register, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(payload),
      });

      const data = await parseApiResponse(response);

      console.log("Register response:", data);

      /*
        =====================================
        BACKEND ERROR
        =====================================

        Example:

        400
        User with this phone number already exists.
        */

      if (!response.ok) {
        const backendMessage =
          data?.message ||
          data?.error ||
          data?.data?.message ||
          t("signupError");

        throw new Error(backendMessage);
      }

      /*
        =====================================
        SUCCESS
        =====================================
        */

      const registeredUser =
        data?.userData || data?.data?.user || data?.user || data?.data || null;

      /*
        Agar register ke baad backend
        user object deta hai
        */
      console.log("Registered user:", registeredUser);
      if (registeredUser && typeof registeredUser === "object") {
        signup(registeredUser);

        router.replace(redirect);

        return;
      }

      /*
        Agar backend sirf success
        return karta hai
        */

      router.replace(loginHref);
    } catch (error) {
      console.error("Signup error:", error);

      showErrorMessage(error?.message || t("signupError"));
    } finally {
      setLoading(false);

      setLoadingType("");
    }
  };

  /*
  =====================================================
  UI
  =====================================================
  */

  return (
    <main className="relative min-h-screen bg-[#f8f6f1] px-4 py-10 sm:py-14">
      {/* =================================================
          ERROR POPUP
      ================================================= */}

      {showErrorPopup && error && (
        <div className="fixed right-4 top-5 z-[9999] w-[calc(100%-2rem)] max-w-sm">
          <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-white p-4 shadow-xl">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-100">
              <span className="text-lg font-bold text-red-600">!</span>
            </div>

            <div className="min-w-0 flex-1">
              <p className="font-semibold text-gray-900">{t("signupFailed")}</p>

              <p className="mt-1 text-sm leading-5 text-red-600">{error}</p>
            </div>

            <button
              type="button"
              onClick={() => setShowErrorPopup(false)}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <div className="mx-auto w-full max-w-5xl">
        <div className="overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-sm">
          {/* =================================================
              HEADER
          ================================================= */}

          <div className="border-b border-orange-100 bg-gradient-to-r from-orange-50 to-white px-6 py-7 sm:px-10">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-orange-100">
              <UserPlus className="h-6 w-6 text-orange-600" />
            </div>

            <div className="text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">
                {t("account")}
              </p>

              <h1 className="text-3xl font-bold text-gray-900">{t("title")}</h1>

              <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-gray-500">
                {t("subtitle")}
              </p>
            </div>

            <SignupSteps step={step} isPhoneVerified={isPhoneVerified} t={t} />
          </div>

          <div className="p-6 sm:p-10">
            {/* =================================================
                SUCCESS MESSAGE
            ================================================= */}

            {successMessage && (
              <div className="mb-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />

                <span>{successMessage}</span>
              </div>
            )}

            {/* =================================================
                STEP 1
                MOBILE
            ================================================= */}

            {step === 1 && (
              <div className="mx-auto max-w-md">
                <div className="mb-7 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-50">
                    <Phone className="h-5 w-5 text-orange-600" />
                  </div>

                  <h2 className="text-xl font-bold text-gray-900">
                    {t("verifyMobileTitle")}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {t("verifyMobileSubtitle")}
                  </p>
                </div>

                <FormLabel required>{t("mobile")}</FormLabel>

                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 border-r border-gray-200 pr-3 text-sm font-semibold text-gray-600">
                    +91
                  </div>

                  <input
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    maxLength={10}
                    inputMode="numeric"
                    autoComplete="tel"
                    placeholder={t("mobilePlaceholder")}
                    className="w-full rounded-xl border border-gray-300 py-3.5 pl-[72px] pr-4 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                {error && <InlineError error={error} />}

                <button
                  type="button"
                  disabled={loading}
                  onClick={handleGenerateOtp}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-600 py-3.5 font-semibold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading && loadingType === "generateOtp" ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />

                      {t("sendingOtp")}
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="h-5 w-5" />

                      {t("sendOtp")}
                    </>
                  )}
                </button>
              </div>
            )}

            {/* =================================================
                STEP 2
                OTP
            ================================================= */}

            {step === 2 && (
              <div className="mx-auto max-w-md">
                <button
                  type="button"
                  onClick={handleChangeMobile}
                  className="mb-6 flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-orange-600"
                >
                  <ArrowLeft className="h-4 w-4" />

                  {t("changeMobile")}
                </button>

                <div className="mb-7 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-50">
                    <LockKeyhole className="h-5 w-5 text-orange-600" />
                  </div>

                  <h2 className="text-xl font-bold text-gray-900">
                    {t("enterOtp")}
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {t("otpSentTo")}{" "}
                    <span className="font-semibold text-gray-900">
                      +91 {phone}
                    </span>
                  </p>
                </div>

                <input
                  type="text"
                  value={otp}
                  onChange={handleOtpChange}
                  maxLength={6}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  placeholder="••••••"
                  className="w-full rounded-xl border border-gray-300 px-4 py-4 text-center text-2xl font-bold tracking-[0.45em] outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                />

                {error && <InlineError error={error} />}

                <button
                  type="button"
                  disabled={loading}
                  onClick={handleVerifyOtp}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-600 py-3.5 font-semibold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading && loadingType === "verifyOtp" ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />

                      {t("verifyingOtp")}
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="h-5 w-5" />

                      {t("verifyOtp")}
                    </>
                  )}
                </button>

                <div className="mt-5 text-center text-sm text-gray-500">
                  {resendTimer > 0 ? (
                    <p>
                      {t("resendOtpIn")}{" "}
                      <span className="font-semibold text-gray-800">
                        00:
                        {String(resendTimer).padStart(2, "0")}
                      </span>
                    </p>
                  ) : (
                    <button
                      type="button"
                      disabled={loading}
                      onClick={handleResendOtp}
                      className="font-semibold text-orange-600 transition hover:text-orange-700"
                    >
                      {t("resendOtp")}
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* =================================================
                STEP 3
                REGISTRATION
            ================================================= */}

            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-9">
                {/* VERIFIED MOBILE */}

                <section>
                  <SectionTitle title={t("verifiedMobile")} />

                  <div className="relative max-w-md">
                    <input
                      type="text"
                      value={`+91 ${phone}`}
                      readOnly
                      className="w-full cursor-not-allowed rounded-xl border border-green-200 bg-green-50 px-4 py-3.5 pr-32 font-medium text-gray-700 outline-none"
                    />

                    <div className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-1 text-sm font-semibold text-green-600">
                      <Check className="h-4 w-4" />

                      {t("verified")}
                    </div>
                  </div>
                </section>

                {/* =================================================
                    PERSONAL DETAILS
                ================================================= */}

                <section>
                  <SectionTitle title={t("personalDetails")} />

                  <div className="grid gap-5 md:grid-cols-2">
                    <FormInput
                      label={t("fullName")}
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />

                    <FormInput
                      label={t("guardianName")}
                      name="guardianName"
                      value={formData.guardianName}
                      onChange={handleChange}
                      required
                    />

                    <FormInput
                      label={t("dob")}
                      name="dob"
                      type="date"
                      value={formData.dob}
                      onChange={handleChange}
                      required
                    />

                    {/* GENDER */}

                    <div>
                      <FormLabel required>{t("gender")}</FormLabel>

                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                        className={inputClass}
                      >
                        <option value="">{t("selectGender")}</option>

                        <option value="MALE">{t("male")}</option>

                        <option value="FEMALE">{t("female")}</option>

                        <option value="OTHER">{t("other")}</option>
                      </select>
                    </div>

                    {/* ALTERNATE MOBILE */}

                    <FormInput
                      label={t("alternateMobile")}
                      name="alternateContactNumber"
                      type="tel"
                      maxLength={10}
                      inputMode="numeric"
                      value={formData.alternateContactNumber}
                      onChange={handleChange}
                    />

                    {/* EMAIL */}

                    <FormInput
                      label={t("email")}
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </section>

                {/* =================================================
                    ADDRESS
                ================================================= */}

                <section>
                  <SectionTitle title={t("addressDetails")} />

                  <div className="grid gap-5 md:grid-cols-2">
                    {/* COUNTRY */}

                    <div>
                      <FormLabel required>{t("country")}</FormLabel>

                      <select value="IN" disabled className={inputClass}>
                        <option value="IN">India</option>
                      </select>
                    </div>

                    {/* STATE */}

                    <div>
                      <FormLabel required>{t("stateName")}</FormLabel>

                      <select
                        value={formData.stateCode}
                        onChange={handleStateChange}
                        required
                        className={inputClass}
                      >
                        <option value="">{t("selectState")}</option>

                        {states.map((state) => (
                          <option key={state.isoCode} value={state.isoCode}>
                            {state.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* DISTRICT */}

                    <div>
                      <FormLabel required>{t("districtName")}</FormLabel>

                      <select
                        value={formData.district}
                        onChange={handleDistrictChange}
                        disabled={!formData.stateCode}
                        required
                        className={inputClass}
                      >
                        <option value="">
                          {formData.stateCode
                            ? t("selectDistrict")
                            : t("selectStateFirst")}
                        </option>

                        {districts.map((district, index) => (
                          <option
                            key={`${district.name}-${index}`}
                            value={district.name}
                          >
                            {district.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* CITY */}

                    <div>
                      <FormLabel required>{t("cityName")}</FormLabel>

                      <select
                        value={formData.city}
                        onChange={handleCityChange}
                        disabled={!formData.stateCode}
                        required
                        className={inputClass}
                      >
                        <option value="">
                          {formData.stateCode
                            ? t("selectCity")
                            : t("selectStateFirst")}
                        </option>

                        {cities.map((city, index) => (
                          <option
                            key={`${city.name}-${index}`}
                            value={city.name}
                          >
                            {city.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* STREET */}

                    <div className="md:col-span-2">
                      <FormInput
                        label={t("streetName")}
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* PINCODE */}

                    <FormInput
                      label={t("postalCode")}
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      maxLength={6}
                      inputMode="numeric"
                      required
                    />
                  </div>
                </section>

                {/* =================================================
                    PROFESSIONAL DETAILS
                ================================================= */}

                <section>
                  <SectionTitle title={t("professionalDetails")} />

                  <div className="grid gap-5 md:grid-cols-2">
                    {/* OCCUPATION DROPDOWN */}

                    <div>
                      <FormLabel required>{t("occupation")}</FormLabel>

                      <select
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleChange}
                        required
                        className={inputClass}
                      >
                        <option value="">{t("selectOccupation")}</option>

                        {occupationOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* ORGANIZATIONAL UNIT */}

                    <FormInput
                      label={t("organizationalUnit")}
                      name="organizationalUnit"
                      value={formData.organizationalUnit}
                      onChange={handleChange}
                      required
                    />

                    {/* LANGUAGE */}

                    <div>
                      <FormLabel required>{t("preferredLanguage")}</FormLabel>

                      <select
                        name="preferredLanguage"
                        value={formData.preferredLanguage}
                        onChange={handleChange}
                        required
                        className={inputClass}
                      >
                        <option value="ENG">English</option>

                        <option value="HIN">हिंदी</option>
                      </select>
                    </div>
                  </div>
                </section>

                {/* =================================================
                    PHOTO
                ================================================= */}

                <section>
                  <SectionTitle title={t("profilePhoto")} />

                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                    <div className="flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-dashed border-orange-300 bg-orange-50">
                      {photoPreview ? (
                        <img
                          src={photoPreview}
                          alt="Profile preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <ImagePlus className="h-9 w-9 text-orange-400" />
                      )}
                    </div>

                    <div>
                      <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-orange-200 bg-white px-4 py-3 text-sm font-semibold text-orange-600 transition hover:bg-orange-50">
                        <ImagePlus className="h-4 w-4" />

                        {t("choosePhoto")}

                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          onChange={handlePhotoChange}
                          className="hidden"
                        />
                      </label>

                      <p className="mt-2 text-xs leading-5 text-gray-500">
                        {t("photoHint")}
                      </p>

                      {photo && (
                        <p className="mt-2 max-w-sm truncate text-xs font-medium text-green-600">
                          {photo.name}
                        </p>
                      )}
                    </div>
                  </div>
                </section>

                {/* =================================================
                    PASSWORD
                ================================================= */}

                <section>
                  <SectionTitle title={t("securityDetails")} />

                  <div className="grid gap-5 md:grid-cols-2">
                    <PasswordField
                      label={t("password")}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      visible={showPassword}
                      setVisible={setShowPassword}
                      t={t}
                    />

                    <PasswordField
                      label={t("confirmPassword")}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      visible={showConfirmPassword}
                      setVisible={setShowConfirmPassword}
                      t={t}
                    />
                  </div>
                </section>

                {/* =================================================
                    CREATE ACCOUNT
                ================================================= */}

                <div className="border-t border-gray-100 pt-6">
                  {/* ERROR NEAR BUTTON */}

                  {error && <InlineError error={error} />}

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-600 py-3.5 font-semibold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />

                        {t("creatingAccount")}
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-5 w-5" />

                        {t("button")}
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* =================================================
                LOGIN LINK
            ================================================= */}

            <p className="mt-8 text-center text-sm text-gray-500">
              {t("alreadyAccount")}{" "}
              <Link
                href={loginHref}
                className="font-semibold text-orange-600 transition hover:text-orange-700"
              >
                {t("login")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

/*
=====================================================
INLINE ERROR
=====================================================
*/

function InlineError({ error }) {
  return (
    <div className="mt-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
        !
      </div>

      <p className="text-sm font-medium leading-5 text-red-600">{error}</p>
    </div>
  );
}

/*
=====================================================
SIGNUP STEPS
=====================================================
*/

function SignupSteps({ step, isPhoneVerified, t }) {
  const steps = [
    {
      number: 1,
      label: t("stepMobile"),
    },
    {
      number: 2,
      label: t("stepOtp"),
    },
    {
      number: 3,
      label: t("stepDetails"),
    },
  ];

  return (
    <div className="mx-auto mt-8 flex max-w-xl items-center">
      {steps.map((item, index) => {
        const completed =
          step > item.number || (item.number === 2 && isPhoneVerified);

        const active = step === item.number;

        return (
          <div
            key={item.number}
            className="flex flex-1 items-center last:flex-none"
          >
            <div className="flex flex-col items-center">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition ${
                  completed
                    ? "bg-green-600 text-white"
                    : active
                      ? "bg-orange-600 text-white"
                      : "bg-gray-100 text-gray-400"
                }`}
              >
                {completed ? <Check className="h-4 w-4" /> : item.number}
              </div>

              <span
                className={`mt-2 hidden whitespace-nowrap text-xs font-semibold sm:block ${
                  active
                    ? "text-orange-600"
                    : completed
                      ? "text-green-600"
                      : "text-gray-400"
                }`}
              >
                {item.label}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div
                className={`mx-3 h-[2px] flex-1 ${
                  step > item.number ? "bg-green-500" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/*
=====================================================
SECTION TITLE
=====================================================
*/

function SectionTitle({ title }) {
  return (
    <div className="mb-5 border-b border-gray-100 pb-3">
      <h2 className="text-lg font-bold text-gray-900">{title}</h2>
    </div>
  );
}

/*
=====================================================
FORM LABEL
=====================================================
*/

function FormLabel({ children, required = false }) {
  return (
    <label className="mb-2 block text-sm font-medium text-gray-700">
      {children}

      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
}

/*
=====================================================
FORM INPUT
=====================================================
*/

function FormInput({ label, required = false, ...props }) {
  return (
    <div>
      <FormLabel required={required}>{label}</FormLabel>

      <input {...props} required={required} className={inputClass} />
    </div>
  );
}

/*
=====================================================
PASSWORD FIELD
=====================================================
*/

function PasswordField({
  label,
  name,
  value,
  onChange,
  visible,
  setVisible,
  t,
}) {
  return (
    <div>
      <FormLabel required>{label}</FormLabel>

      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          autoComplete="new-password"
          required
          className={`${inputClass} pr-12`}
        />

        <button
          type="button"
          onClick={() => setVisible((previous) => !previous)}
          aria-label={visible ? t("hide") : t("show")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-orange-600"
        >
          {visible ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
}
