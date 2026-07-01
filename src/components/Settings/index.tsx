'use client'

import { useState, useEffect, useRef } from 'react'
import useLocale from 'hooks/useLocale'
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
  const [showSettings, setShowSettings] = useState(false)
  const settingsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        settingsRef.current &&
        !settingsRef.current.contains(event.target as Node)
      ) {
        setShowSettings(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={settingsRef}>
      <S.SettingsButton
        onClick={() => setShowSettings((prev) => !prev)}
        aria-label={locale.timer.settingsTitle}
      >
        ⚙
      </S.SettingsButton>
      {showSettings && (
        <S.SettingsPanel>
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
    </div>
  )
}
