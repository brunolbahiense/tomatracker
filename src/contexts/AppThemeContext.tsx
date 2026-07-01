'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { ThemeProvider } from 'styled-components'
import { AccentKey } from 'styles/colorPresets'
import { ThemeMode, buildTheme } from 'styles/buildTheme'

interface AppThemeContextValue {
  mode: ThemeMode
  accent: AccentKey
  setMode: (m: ThemeMode) => void
  setAccent: (a: AccentKey) => void
}

const AppThemeContext = createContext<AppThemeContextValue>({
  mode: 'dark',
  accent: 'tomato',
  setMode: () => {},
  setAccent: () => {},
})

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>('dark')
  const [accent, setAccentState] = useState<AccentKey>('tomato')

  useEffect(() => {
    const savedMode = localStorage.getItem('tt_mode') as ThemeMode | null
    const savedAccent = localStorage.getItem('tt_accent') as AccentKey | null
    if (savedMode === 'dark' || savedMode === 'light') setModeState(savedMode)
    if (savedAccent && savedAccent in colorPresetsKeys) setAccentState(savedAccent)
  }, [])

  const setMode = (m: ThemeMode) => {
    setModeState(m)
    localStorage.setItem('tt_mode', m)
  }

  const setAccent = (a: AccentKey) => {
    setAccentState(a)
    localStorage.setItem('tt_accent', a)
  }

  return (
    <AppThemeContext.Provider value={{ mode, accent, setMode, setAccent }}>
      <ThemeProvider theme={buildTheme(mode, accent)}>
        {children}
      </ThemeProvider>
    </AppThemeContext.Provider>
  )
}

const colorPresetsKeys = new Set<string>([
  'tomato', 'sakura', 'ocean', 'emerald', 'mustard', 'gruvbox',
])

export function useAppTheme() {
  return useContext(AppThemeContext)
}
