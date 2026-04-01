import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    ns: ['common', 'home', 'landing', 'about', 'community', 'contact', 'faq', 'whitepaper', 'auth', 'guidance', 'dashboard', 'games', 'challenges', 'assessments', 'subscription', 'ai_space', 'ai_vault', 'ai_myth', 'ai_arena', 'ai_failure', 'ai_blog', 'archetypes'],
    defaultNS: 'common',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
