"use client";

import { useMemo, useState , useEffect} from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { Country, State, City } from "country-state-city";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  Camera,
  User,
  MapPin,
  BriefcaseBusiness,
  ClipboardCheck,
} from "lucide-react";

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

const roleOptions = [
  {
    label: "Member",
    value: "member",
  },
  {
    label: "Volunteer",
    value: "volunteer",
  },
  {
    label: "Social Worker",
    value: "social_worker",
  },
  {
    label: "Coordinator",
    value: "coordinator",
  },
];

export default function MembershipApplyPage() {
  const t = useTranslations("MembershipForm");
  const router = useRouter();

  const [step, setStep] = useState(1);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [photoPreview, setPhotoPreview] = useState(null);
  

  const {
  user,
  updateMembership,
  isLoggedIn,
  loading: authLoading,
} = useAuth();

useEffect(() => {
  if (authLoading || !isLoggedIn) {
    return;
  }

  const status =
    user?.membership?.status;

  if (status === "pending") {
    router.replace(
      "/membership/status"
    );
  }

  if (status === "approved") {
    router.replace(
      "/membership/profile"
    );
  }

  if (status === "rejected") {
    router.replace(
      "/membership/status"
    );
  }
}, [
  user,
  isLoggedIn,
  authLoading,
  router,
]);

  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    alternativeNumber: "",
    email: "",
    photo: null,
    guardianName: "",

    street: "",
    city: "",

    country: "",
    countryCode: "",

    state: "",
    stateCode: "",

    district: "",

    pincode: "",

    occupation: "",
    role: "",
  });

  /*
  --------------------------------------------------
  COUNTRY DATA
  --------------------------------------------------
  */

  const countries = useMemo(() => {
    return Country.getAllCountries();
  }, []);

  /*
  --------------------------------------------------
  STATE DATA
  --------------------------------------------------
  */

  const states = useMemo(() => {
    if (!formData.countryCode) {
      return [];
    }

    return State.getStatesOfCountry(formData.countryCode);
  }, [formData.countryCode]);

  /*
  --------------------------------------------------
  DISTRICT DATA
  --------------------------------------------------

  Important:
  country-state-city package ka third level City hai.

  Abhi UI me hum ise district dropdown ke liye use kar rahe hain.

  Backend agar later proper district API deta hai,
  to sirf ye section replace karna hoga.
  */

  const districts = useMemo(() => {
    if (!formData.countryCode || !formData.stateCode) {
      return [];
    }

    return City.getCitiesOfState(
      formData.countryCode,
      formData.stateCode
    );
  }, [formData.countryCode, formData.stateCode]);

  /*
  --------------------------------------------------
  NORMAL INPUT CHANGE
  --------------------------------------------------
  */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /*
  --------------------------------------------------
  COUNTRY CHANGE
  --------------------------------------------------
  */

  const handleCountryChange = (e) => {
    const countryCode = e.target.value;

    const selectedCountry = countries.find(
      (country) => country.isoCode === countryCode
    );

    setFormData((prev) => ({
      ...prev,

      country: selectedCountry?.name || "",
      countryCode,

      state: "",
      stateCode: "",

      district: "",

      city: "",
    }));
  };

  /*
  --------------------------------------------------
  STATE CHANGE
  --------------------------------------------------
  */

  const handleStateChange = (e) => {
    const stateCode = e.target.value;

    const selectedState = states.find(
      (state) => state.isoCode === stateCode
    );

    setFormData((prev) => ({
      ...prev,

      state: selectedState?.name || "",
      stateCode,

      district: "",

      city: "",
    }));
  };

  /*
  --------------------------------------------------
  DISTRICT CHANGE
  --------------------------------------------------
  */

  const handleDistrictChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      district: e.target.value,
    }));
  };

  /*
  --------------------------------------------------
  PHOTO
  --------------------------------------------------
  */

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError(t("invalidPhoto"));
      return;
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      setError(t("photoTooLarge"));
      return;
    }

    setError("");

    setFormData((prev) => ({
      ...prev,
      photo: file,
    }));

    if (photoPreview) {
      URL.revokeObjectURL(photoPreview);
    }

    const previewURL = URL.createObjectURL(file);

    setPhotoPreview(previewURL);
  };

  /*
  --------------------------------------------------
  VALIDATION
  --------------------------------------------------
  */

  const validateCurrentStep = () => {
    setError("");

    /*
    STEP 1
    */

    if (step === 1) {
      if (
        !formData.fullName.trim() ||
        !formData.mobileNumber.trim() ||
        !formData.email.trim() ||
        !formData.guardianName.trim()
      ) {
        setError(t("requiredFields"));
        return false;
      }

      if (!/^[0-9]{10}$/.test(formData.mobileNumber)) {
        setError(t("invalidMobile"));
        return false;
      }

      if (
        formData.alternativeNumber &&
        !/^[0-9]{10}$/.test(formData.alternativeNumber)
      ) {
        setError(t("invalidAlternativeMobile"));
        return false;
      }

      if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
      ) {
        setError(t("invalidEmail"));
        return false;
      }
    }

    /*
    STEP 2
    */

    if (step === 2) {
      if (
        !formData.street.trim() ||
        !formData.city.trim() ||
        !formData.country ||
        !formData.state ||
        !formData.district ||
        !formData.pincode.trim()
      ) {
        setError(t("requiredFields"));
        return false;
      }

      if (!/^[0-9]{6}$/.test(formData.pincode)) {
        setError(t("invalidPincode"));
        return false;
      }
    }

    /*
    STEP 3
    */

    if (step === 3) {
      if (!formData.occupation || !formData.role) {
        setError(t("requiredFields"));
        return false;
      }
    }

    return true;
  };

  /*
  --------------------------------------------------
  NEXT STEP
  --------------------------------------------------
  */

  const nextStep = () => {
    const valid = validateCurrentStep();

    if (!valid) {
      return;
    }

    setStep((prev) => Math.min(prev + 1, 4));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /*
  --------------------------------------------------
  PREVIOUS STEP
  --------------------------------------------------
  */

  const previousStep = () => {
    setError("");

    setStep((prev) => Math.max(prev - 1, 1));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /*
  --------------------------------------------------
  SUBMIT
  --------------------------------------------------
  */

  const handleSubmit = async (e) => {
  e.preventDefault();

  setError("");
  setSubmitting(true);

  try {
    /*
    ==========================================
    BACKEND API LATER
    ==========================================

    const formPayload = new FormData();

    formPayload.append("fullName", formData.fullName);
    formPayload.append("mobileNumber", formData.mobileNumber);
    formPayload.append(
      "alternativeNumber",
      formData.alternativeNumber
    );
    formPayload.append("email", formData.email);
    formPayload.append(
      "guardianName",
      formData.guardianName
    );

    formPayload.append(
      "street",
      formData.street
    );

    formPayload.append(
      "city",
      formData.city
    );

    formPayload.append(
      "country",
      formData.country
    );

    formPayload.append(
      "state",
      formData.state
    );

    formPayload.append(
      "district",
      formData.district
    );

    formPayload.append(
      "pincode",
      formData.pincode
    );

    formPayload.append(
      "occupation",
      formData.occupation
    );

    formPayload.append(
      "role",
      formData.role
    );

    if (formData.photo) {
      formPayload.append(
        "photo",
        formData.photo
      );
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/membership/apply`,
      {
        method: "POST",
        credentials: "include",
        body: formPayload,
      }
    );

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        data?.message ||
        t("submitError")
      );
    }

    updateMembership({
      status: data.membership.status,
      applicationId:
        data.membership.applicationId,
      membershipNumber:
        data.membership.membershipNumber ||
        null,
    });

    */

    /*
    ==========================================
    MOCK APPLICATION RESPONSE
    ==========================================
    */

    const mockApplication = {
      status: "pending",

      applicationId:
        `APP-${Date.now()}`,

      membershipNumber: null,

      submittedAt:
        new Date().toISOString(),
    };

    /*
    AuthContext update
    */

    updateMembership(
      mockApplication
    );

    /*
    status page
    */

    router.replace(
      "/membership/status"
    );

  } catch (error) {
    console.error(
      "Membership submit error:",
      error
    );

    setError(
      error?.message ||
      t("submitError")
    );
  } finally {
    setSubmitting(false);
  }
};

  return (
    <ProtectedRoute>
    <main className="min-h-screen bg-[#f8f6f1] py-10 md:py-14">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* Back */}
        <div className="mb-6">
          <Link
            href="/join-us"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-orange-600"
          >
            <ArrowLeft className="h-4 w-4" />

            {t("backToJoinUs")}
          </Link>
        </div>

        <div className="overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-sm">

          {/* Header */}
          <div className="border-b border-gray-100 px-6 py-8 sm:px-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-orange-600">
              {t("membership")}
            </p>

            <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
              {t("title")}
            </h1>

            <p className="mt-2 max-w-2xl text-gray-500">
              {t("subtitle")}
            </p>
          </div>

          {/* Progress */}
          <div className="border-b border-gray-100 px-6 py-6 sm:px-8">
            <StepProgress
              step={step}
              t={t}
            />
          </div>

          {/* Form Content */}
          <div className="p-6 sm:p-8">

            {error && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                {error}
              </div>
            )}

            {/* STEP 1 */}
            {step === 1 && (
              <PersonalDetails
                formData={formData}
                handleChange={handleChange}
                handlePhotoChange={handlePhotoChange}
                photoPreview={photoPreview}
                t={t}
              />
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <AddressDetails
                formData={formData}
                handleChange={handleChange}
                handleCountryChange={handleCountryChange}
                handleStateChange={handleStateChange}
                handleDistrictChange={handleDistrictChange}
                countries={countries}
                states={states}
                districts={districts}
                t={t}
              />
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <ProfessionalDetails
                formData={formData}
                handleChange={handleChange}
                t={t}
              />
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <ReviewApplication
                formData={formData}
                photoPreview={photoPreview}
                t={t}
              />
            )}

            {/* Bottom Buttons */}
            <div className="mt-10 flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-between">

              <div>
                {step > 1 && (
                  <button
                    type="button"
                    onClick={previousStep}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 sm:w-auto"
                  >
                    <ArrowLeft className="h-4 w-4" />

                    {t("back")}
                  </button>
                )}
              </div>

              {step < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-600 px-7 py-3 font-semibold text-white transition hover:bg-orange-700 sm:w-auto"
                >
                  {t("next")}

                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-600 px-7 py-3 font-semibold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  <Check className="h-4 w-4" />

                  {loading
                    ? t("submitting")
                    : t("submit")}
                </button>
              )}

            </div>

          </div>
        </div>
      </div>
    </main>
    </ProtectedRoute>
  );
}

/*
====================================================
STEP PROGRESS
====================================================
*/

function StepProgress({ step, t }) {
  const steps = [
    {
      number: 1,
      title: t("personalDetails"),
      icon: User,
    },
    {
      number: 2,
      title: t("addressDetails"),
      icon: MapPin,
    },
    {
      number: 3,
      title: t("professionalDetails"),
      icon: BriefcaseBusiness,
    },
    {
      number: 4,
      title: t("review"),
      icon: ClipboardCheck,
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-2">

      {steps.map((item) => {
        const Icon = item.icon;

        const active =
          step >= item.number;

        return (
          <div
            key={item.number}
            className="flex flex-col items-center text-center"
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full transition ${
                active
                  ? "bg-orange-600 text-white"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {step > item.number ? (
                <Check className="h-5 w-5" />
              ) : (
                <Icon className="h-5 w-5" />
              )}
            </div>

            <span
              className={`mt-2 hidden text-xs font-semibold sm:block ${
                active
                  ? "text-orange-600"
                  : "text-gray-400"
              }`}
            >
              {item.title}
            </span>
          </div>
        );
      })}

    </div>
  );
}

/*
====================================================
STEP 1
====================================================
*/

function PersonalDetails({
  formData,
  handleChange,
  handlePhotoChange,
  photoPreview,
  t,
}) {
  return (
    <section>

      <SectionHeading
        title={t("personalDetails")}
        description={t(
          "personalDescription"
        )}
      />

      {/* Photo */}
      <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row">

        <div className="relative">

          <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-orange-100">

            {photoPreview ? (
              <img
                src={photoPreview}
                alt={formData.fullName || "Profile"}
                className="h-full w-full object-cover"
              />
            ) : (
              <User className="h-10 w-10 text-orange-600" />
            )}

          </div>

          <label className="absolute bottom-0 right-0 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-orange-600 text-white shadow transition hover:bg-orange-700">

            <Camera className="h-4 w-4" />

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handlePhotoChange}
              className="hidden"
            />

          </label>

        </div>

        <div>
          <p className="font-semibold text-gray-900">
            {t("photo")}
          </p>

          <p className="mt-1 text-sm text-gray-500">
            {t("photoHint")}
          </p>
        </div>

      </div>

      <div className="grid gap-5 md:grid-cols-2">

        <InputField
          label={t("fullName")}
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        <InputField
          label={t("guardianName")}
          name="guardianName"
          value={formData.guardianName}
          onChange={handleChange}
          required
        />

        <InputField
          label={t("mobileNumber")}
          name="mobileNumber"
          type="tel"
          value={formData.mobileNumber}
          onChange={handleChange}
          maxLength={10}
          required
        />

        <InputField
          label={t("alternativeNumber")}
          name="alternativeNumber"
          type="tel"
          value={formData.alternativeNumber}
          onChange={handleChange}
          maxLength={10}
        />

        <div className="md:col-span-2">
          <InputField
            label={t("email")}
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

      </div>

    </section>
  );
}

/*
====================================================
STEP 2 ADDRESS
====================================================
*/

function AddressDetails({
  formData,
  handleChange,
  handleCountryChange,
  handleStateChange,
  handleDistrictChange,
  countries,
  states,
  districts,
  t,
}) {
  return (
    <section>

      <SectionHeading
        title={t("addressDetails")}
        description={t(
          "addressDescription"
        )}
      />

      <div className="grid gap-5 md:grid-cols-2">

        {/* Street */}
        <div className="md:col-span-2">
          <InputField
            label={t("street")}
            name="street"
            value={formData.street}
            onChange={handleChange}
            required
          />
        </div>

        {/* Country */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">

            {t("country")}

            <span className="ml-1 text-red-500">
              *
            </span>
          </label>

          <select
            value={formData.countryCode}
            onChange={handleCountryChange}
            required
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
          >
            <option value="">
              {t("selectCountry")}
            </option>

            {countries.map((country) => (
              <option
                key={country.isoCode}
                value={country.isoCode}
              >
                {country.name}
              </option>
            ))}

          </select>
        </div>

        {/* State */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">

            {t("state")}

            <span className="ml-1 text-red-500">
              *
            </span>

          </label>

          <select
            value={formData.stateCode}
            onChange={handleStateChange}
            disabled={!formData.countryCode}
            required
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
          >
            <option value="">
              {t("selectState")}
            </option>

            {states.map((state) => (
              <option
                key={state.isoCode}
                value={state.isoCode}
              >
                {state.name}
              </option>
            ))}

          </select>
        </div>

        {/* District */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">

            {t("district")}

            <span className="ml-1 text-red-500">
              *
            </span>

          </label>

          <select
            value={formData.district}
            onChange={handleDistrictChange}
            disabled={!formData.stateCode}
            required
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
          >
            <option value="">
              {t("selectDistrict")}
            </option>

            {districts.map(
              (district, index) => (
                <option
                  key={`${district.name}-${index}`}
                  value={district.name}
                >
                  {district.name}
                </option>
              )
            )}

          </select>
        </div>

        {/* City */}
        <InputField
          label={t("city")}
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />

        {/* Pincode */}
        <InputField
          label={t("pincode")}
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
          maxLength={6}
          required
        />

      </div>

    </section>
  );
}

/*
====================================================
STEP 3 PROFESSIONAL
====================================================
*/

function ProfessionalDetails({
  formData,
  handleChange,
  t,
}) {
  return (
    <section>

      <SectionHeading
        title={t("professionalDetails")}
        description={t(
          "professionalDescription"
        )}
      />

      <div className="grid gap-5 md:grid-cols-2">

        <SelectField
          label={t("occupation")}
          name="occupation"
          value={formData.occupation}
          onChange={handleChange}
          placeholder={t(
            "selectOccupation"
          )}
          options={occupationOptions}
          required
        />

        <SelectField
          label={t("role")}
          name="role"
          value={formData.role}
          onChange={handleChange}
          placeholder={t(
            "selectRole"
          )}
          options={roleOptions}
          required
        />

      </div>

    </section>
  );
}

/*
====================================================
STEP 4 REVIEW
====================================================
*/

function ReviewApplication({
  formData,
  photoPreview,
  t,
}) {
  return (
    <section>

      <SectionHeading
        title={t("review")}
        description={t(
          "reviewDescription"
        )}
      />

      <div className="space-y-6">

        {/* User Header */}
        <div className="rounded-2xl bg-orange-50 p-5">

          <div className="flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-white">

              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt={formData.fullName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <User className="h-7 w-7 text-orange-600" />
              )}

            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900">
                {formData.fullName}
              </h3>

              <p className="text-sm text-gray-500">
                {formData.email}
              </p>
            </div>

          </div>

        </div>

        {/* Personal */}
        <ReviewSection
          title={t("personalDetails")}
        >

          <ReviewItem
            label={t("fullName")}
            value={formData.fullName}
          />

          <ReviewItem
            label={t("guardianName")}
            value={formData.guardianName}
          />

          <ReviewItem
            label={t("mobileNumber")}
            value={formData.mobileNumber}
          />

          <ReviewItem
            label={t("alternativeNumber")}
            value={
              formData.alternativeNumber
            }
          />

          <ReviewItem
            label={t("email")}
            value={formData.email}
          />

        </ReviewSection>

        {/* Address */}
        <ReviewSection
          title={t("addressDetails")}
        >

          <ReviewItem
            label={t("street")}
            value={formData.street}
          />

          <ReviewItem
            label={t("city")}
            value={formData.city}
          />

          <ReviewItem
            label={t("district")}
            value={formData.district}
          />

          <ReviewItem
            label={t("state")}
            value={formData.state}
          />

          <ReviewItem
            label={t("country")}
            value={formData.country}
          />

          <ReviewItem
            label={t("pincode")}
            value={formData.pincode}
          />

        </ReviewSection>

        {/* Professional */}
        <ReviewSection
          title={t(
            "professionalDetails"
          )}
        >

          <ReviewItem
            label={t("occupation")}
            value={
              occupationOptions.find(
                (item) =>
                  item.value ===
                  formData.occupation
              )?.label
            }
          />

          <ReviewItem
            label={t("role")}
            value={
              roleOptions.find(
                (item) =>
                  item.value ===
                  formData.role
              )?.label
            }
          />

        </ReviewSection>

      </div>

    </section>
  );
}

/*
====================================================
COMMON COMPONENTS
====================================================
*/

function ReviewSection({
  title,
  children,
}) {
  return (
    <div className="rounded-2xl border border-gray-200 p-5">

      <h3 className="mb-5 text-lg font-bold text-gray-900">
        {title}
      </h3>

      <div className="grid gap-5 sm:grid-cols-2">
        {children}
      </div>

    </div>
  );
}

function ReviewItem({
  label,
  value,
}) {
  return (
    <div>

      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <p className="mt-1 break-words font-medium text-gray-900">
        {value || "-"}
      </p>

    </div>
  );
}

function SectionHeading({
  title,
  description,
}) {
  return (
    <div className="mb-7">

      <h2 className="text-2xl font-bold text-gray-900">
        {title}
      </h2>

      <p className="mt-2 text-sm leading-6 text-gray-500">
        {description}
      </p>

    </div>
  );
}

function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  maxLength,
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-medium text-gray-700">

        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}

      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        maxLength={maxLength}
        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
      />

    </div>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  placeholder,
  options,
  disabled = false,
  required = false,
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-medium text-gray-700">

        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}

      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100 disabled:cursor-not-allowed disabled:bg-gray-100"
      >

        <option value="">
          {placeholder}
        </option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}

      </select>

    </div>
  );
}