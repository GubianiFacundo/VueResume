import en from '@/locales/en';
import es from '@/locales/es';
import { createI18n } from 'vue-i18n';

const messages = {
  en: en,
  es: es,
};

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
});

export default i18n;