import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next, I18nextProvider as Provider } from 'react-i18next';
// utils
import { localStorageGetItem } from 'src/utils/storage-available';
//
import { ReactNode } from 'react';
import resourcesToBackend from 'i18next-resources-to-backend';
import { defaultLang } from './config-lang';
//
import translationFa from './langs/fa.json';

// ----------------------------------------------------------------------

const lng = localStorageGetItem('i18nextLng', defaultLang.value);

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(resourcesToBackend((lang: any, ns: any) => import(`./langs/${lang}/${ns}.json`)))
  .init({
    resources: {
      fa: { translations: translationFa },
    },
    lng,
    fallbackLng: lng,
    debug: false,
    ns: ['translations'],
    defaultNS: 'translations',
    interpolation: {
      escapeValue: false,
    },
  });

// ----------------------------------------------------------------------

export function I18nProvider({ children }: { children: ReactNode }) {
  return <Provider i18n={i18next}>{children}</Provider>;
}
