'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from 'react'
import { ThemeProvider } from 'styled-components'
import { AccentKey, colorPresets } from 'styles/colorPresets'
import { ThemeMode, buildTheme } from 'styles/buildTheme'

interface AppThemeContextValue {
  mode: ThemeMode
  accent: AccentKey
  setMode: (mode: ThemeMode) => void
  setAccent: (accent: AccentKey) => void
}

const AppThemeContext = createContext<AppThemeContextValue>({
  mode: 'dark',
  accent: 'tomato',
  setMode: () => {},
  setAccent: () => {}
})

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>('dark')
  const [accent, setAccentState] = useState<AccentKey>('tomato')

  useEffect(() => {
    const savedMode = localStorage.getItem('tt_mode') as ThemeMode | null
    const savedAccent = localStorage.getItem('tt_accent')
    if (savedMode === 'dark' || savedMode === 'light') setModeState(savedMode)
    if (savedAccent && savedAccent in colorPresets)
      setAccentState(savedAccent as AccentKey)
  }, [])

  const setMode = (mode: ThemeMode) => {
    setModeState(mode)
    localStorage.setItem('tt_mode', mode)
  }

  const setAccent = (accent: AccentKey) => {
    setAccentState(accent)
    localStorage.setItem('tt_accent', accent)
  }

  return (
    <AppThemeContext.Provider value={{ mode, accent, setMode, setAccent }}>
      <ThemeProvider theme={buildTheme(mode, accent)}>{children}</ThemeProvider>
    </AppThemeContext.Provider>
  )
}

export function useAppTheme() {
  return useContext(AppThemeContext)
}
