'use client'

import { useState, useRef, useEffect } from 'react'
import useLocale from 'hooks/useLocale'
import { useAppTheme } from 'contexts/AppThemeContext'
import { colorPresets, AccentKey } from 'styles/colorPresets'
import * as S from './styles'

interface SettingsProps {
  workTime: number
  breakTime: number
  isMuted: boolean
  toggleMute: () => void
  increaseWorkTime: () => void
  decreaseWorkTime: () => void
  increaseBreakTime: () => void
  decreaseBreakTime: () => void
}

export default function Settings({
  workTime,
  breakTime,
  isMuted,
  toggleMute,
  increaseWorkTime,
  decreaseWorkTime,
  increaseBreakTime,
  decreaseBreakTime
}: SettingsProps) {
  const locale = useLocale()
  const { mode, accent, setMode, setAccent } = useAppTheme()
  const [showSettings, setShowSettings] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!showSettings) return
    const handlePointerDown = (e: PointerEvent) => {
      if (
        panelRef.current?.contains(e.target as Node) ||
        buttonRef.current?.contains(e.target as Node)
      )
        return
      setShowSettings(false)
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowSettings(false)
    }
    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [showSettings])

  return (
    <>
      <S.SettingsButton
        ref={buttonRef}
        onClick={() => setShowSettings((prev) => !prev)}
        aria-label={locale.timer.settingsTitle}
      >
        ⚙
      </S.SettingsButton>
      {showSettings && (
        <S.SettingsPanel ref={panelRef}>
          <S.ConfigRow>
            <S.ConfigLabel>{locale.timer.workLabel}</S.ConfigLabel>
            <S.ConfigButton
              onClick={decreaseWorkTime}
              aria-label={locale.timer.aria.decreaseWork}
            >
              −
            </S.ConfigButton>
            <S.ConfigValue>{workTime}</S.ConfigValue>
            <S.ConfigButton
              onClick={increaseWorkTime}
              aria-label={locale.timer.aria.increaseWork}
            >
              +
            </S.ConfigButton>
          </S.ConfigRow>
          <S.ConfigRow>
            <S.ConfigLabel>{locale.timer.breakLabel}</S.ConfigLabel>
            <S.ConfigButton
              onClick={decreaseBreakTime}
              aria-label={locale.timer.aria.decreaseBreak}
            >
              −
            </S.ConfigButton>
            <S.ConfigValue>{breakTime}</S.ConfigValue>
            <S.ConfigButton
              onClick={increaseBreakTime}
              aria-label={locale.timer.aria.increaseBreak}
            >
              +
            </S.ConfigButton>
          </S.ConfigRow>
          <S.SectionDivider />
          <S.SectionLabel>{locale.timer.colorsLabel}</S.SectionLabel>
          <S.ColorRow>
            {(
              Object.entries(colorPresets) as [
                AccentKey,
                (typeof colorPresets)[AccentKey]
              ][]
            ).map(([key, preset]) => (
              <S.ColorSwatch
                key={key}
                $color={preset.primary}
                $selected={accent === key}
                onClick={() => setAccent(key)}
                aria-label={preset.label}
                title={preset.label}
              />
            ))}
          </S.ColorRow>
          <S.SectionDivider />
          <S.SectionLabel>{locale.timer.themeLabel}</S.SectionLabel>
          <S.ModeSwitcher>
            <S.ModeButton
              $active={mode === 'dark'}
              onClick={() => setMode('dark')}
            >
              ☾ {locale.timer.dark}
            </S.ModeButton>
            <S.ModeButton
              $active={mode === 'light'}
              onClick={() => setMode('light')}
            >
              ☀ {locale.timer.light}
            </S.ModeButton>
          </S.ModeSwitcher>
          <S.MuteRow>
            <S.MuteSwitch
              $isMuted={isMuted}
              onClick={toggleMute}
              aria-label={locale.timer.aria.muteLabel}
              role="switch"
              aria-checked={isMuted}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  toggleMute()
                }
              }}
            >
              <S.MuteThumb $isMuted={isMuted} />
            </S.MuteSwitch>
          </S.MuteRow>
        </S.SettingsPanel>
      )}
    </>
  )
}
