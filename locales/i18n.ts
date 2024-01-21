// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "@/locales/en/translation.json";
import translationKO from "@/locales/ko/translation.json";

const resources = {
  en: {
    translation: translationEN,
  },
  ko: {
    translation: translationKO,
  },
};

i18n
  .use(initReactI18next) // Bind react-i18next to the instance
  .init({
    resources,
    lng: "en",
    fallbackLng: "ko", // Use 'en' if detected language is not available
    interpolation: {
      escapeValue: false, // React already safes from XSS
    },
  });

export default i18n;
