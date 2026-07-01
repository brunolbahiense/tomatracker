import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    // Text / base
    white: string
    grayDark: string
    grayL: string
    gray: string
    black: string
    // Legacy
    blue: string
    // Accent (dynamic)
    red: string
    lightRed: string
    accentGlow: string
    accentShadow: string
    accentHoverGlow: string
    accentSoft: string
    accentHover: string
    // Backgrounds
    darkBg: string
    darkBgTop: string
    darkBgSection: string
    darkBgFooter: string
    // Semantic overlays
    panelBg: string
    surfaceWeak: string
    surfaceStrong: string
    borderWeak: string
    borderMid: string
    textMuted: string
    textFaint: string
  }
}
