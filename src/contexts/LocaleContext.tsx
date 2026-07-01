'use client'

import { createContext, useState, useEffect, ReactNode } from 'react'
import { translations, Locale } from 'locales'

export const LocaleContext = createContext(translations.en)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [localeKey, setLocaleKey] = useState<Locale>('en')

  useEffect(() => {
    const detected: Locale = navigator.language.startsWith('pt') ? 'pt' : 'en'
    setLocaleKey(detected)
    document.documentElement.lang = detected === 'pt' ? 'pt-BR' : 'en'
  }, [])

  return (
    <LocaleContext.Provider value={translations[localeKey]}>
      {children}
    </LocaleContext.Provider>
  )
}
