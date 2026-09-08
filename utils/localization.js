/**
 * Safely extracts localized text from an API response object.
 * @param {Object} dataObj - The object containing language keys (e.g., { en: "...", hin: "..." })
 * @param {String} locale - The current active locale ("en" or "hi")
 * @param {String} fallback - A hard fallback if data is entirely missing
 */
export const getLocalizedText = (dataObj, locale, fallback = "Information Unavailable") => {
  // 1. Safety check: If the object itself is null or undefined
  if (!dataObj) return fallback;

  // 2. Map the app's 'hi' state to the backend's 'hin' key if necessary
  const backendKey = locale === "hi" ? "hin" : "en";

  // 3. Try to get the requested language
  const requestedText = dataObj[backendKey];

  // 4. Fallback Logic: 
  // If Hindi is requested but null/empty, fallback to English. 
  // If both are null/empty, return the hard fallback.
  if (requestedText && requestedText.trim() !== "") {
    return requestedText;
  } else if (dataObj.en && dataObj.en.trim() !== "") {
    return dataObj.en; // Silent fallback to English
  }

  return fallback;
};