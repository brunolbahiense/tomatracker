import { translations } from 'locales'

const useLocale = () => {
  const language = typeof navigator !== 'undefined' ? navigator.language : 'en'
  const localeKey = language.startsWith('pt') ? 'pt' : 'en'
  return translations[localeKey]
}

export default useLocale
