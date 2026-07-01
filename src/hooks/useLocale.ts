import { useState, useEffect } from 'react'
import { translations } from 'locales'

const useLocale = () => {
  const [localeKey, setLocaleKey] = useState<'pt' | 'en'>('en')

  useEffect(() => {
    setLocaleKey(navigator.language.startsWith('pt') ? 'pt' : 'en')
  }, [])

  return translations[localeKey]
}

export default useLocale
