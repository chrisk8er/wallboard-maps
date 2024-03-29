import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import translationEN from 'locales/en/translation.json'
import translationID from 'locales/id/translation.json'

export default i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: translationEN,
      },
      id: {
        translation: translationID,
      },
    },
    lng: 'id',
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false,
    },
  })
