import { AccentKey, colorPresets } from './colorPresets'

export type ThemeMode = 'dark' | 'light'

function hexToRgb(hex: string): [number, number, number] {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16)
  ]
}

function toHex(r: number, g: number, b: number): string {
  const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)))
  return `#${clamp(r).toString(16).padStart(2, '0')}${clamp(g).toString(16).padStart(2, '0')}${clamp(b).toString(16).padStart(2, '0')}`
}

function blendWithBlack(hex: string, ratio: number): string {
  const [r, g, b] = hexToRgb(hex)
  return toHex(r * ratio, g * ratio, b * ratio)
}

function blendWithWhite(hex: string, ratio: number): string {
  const [r, g, b] = hexToRgb(hex)
  return toHex(
    255 + (r - 255) * ratio,
    255 + (g - 255) * ratio,
    255 + (b - 255) * ratio
  )
}

function hexToRgba(hex: string, alpha: number): string {
  const [r, g, b] = hexToRgb(hex)
  return `rgba(${r},${g},${b},${alpha})`
}

export function buildTheme(mode: ThemeMode, accent: AccentKey) {
  const { primary, light } = colorPresets[accent]

  const accentProps = {
    red: primary,
    lightRed: light,
    accentGlow: hexToRgba(primary, 0.07),
    accentShadow: hexToRgba(primary, 0.45),
    accentHoverGlow: hexToRgba(primary, 0.65),
    accentSoft: hexToRgba(primary, 0.1),
    accentHover: hexToRgba(primary, 0.18)
  }

  if (mode === 'light') {
    return {
      ...accentProps,
      white: '#1C1C1E',
      grayDark: '#1F1F1F',
      grayL: '#E5E7EB',
      gray: '#6B7280',
      black: '#000000',
      blue: '#3B82F6',
      darkBg: blendWithWhite(primary, 0.05),
      darkBgTop: blendWithWhite(primary, 0.12),
      darkBgSection: blendWithWhite(primary, 0.07),
      darkBgFooter: blendWithWhite(primary, 0.04),
      panelBg: '#FFFFFF',
      surfaceWeak: 'rgba(0,0,0,0.03)',
      surfaceStrong: 'rgba(0,0,0,0.06)',
      borderWeak: 'rgba(0,0,0,0.06)',
      borderMid: 'rgba(0,0,0,0.1)',
      textMuted: 'rgba(0,0,0,0.4)',
      textFaint: 'rgba(0,0,0,0.2)'
    }
  }

  return {
    ...accentProps,
    white: '#EEEEEE',
    grayDark: '#1F1F1F',
    grayL: '#d9d9d9',
    gray: '#6f6f6e',
    black: '#000000',
    blue: '#3B82F6',
    darkBg: blendWithBlack(primary, 0.06),
    darkBgTop: blendWithBlack(primary, 0.16),
    darkBgSection: blendWithBlack(primary, 0.1),
    darkBgFooter: blendWithBlack(primary, 0.04),
    panelBg: '#FFFFFF',
    surfaceWeak: 'rgba(255,255,255,0.03)',
    surfaceStrong: 'rgba(255,255,255,0.07)',
    borderWeak: 'rgba(255,255,255,0.05)',
    borderMid: 'rgba(255,255,255,0.09)',
    textMuted: 'rgba(255,255,255,0.3)',
    textFaint: 'rgba(255,255,255,0.15)'
  }
}
