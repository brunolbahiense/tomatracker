'use client'

import { useState, useEffect, useRef } from 'react'
import usePomodoro from 'hooks/usePomodoro'
import useLocale from 'hooks/useLocale'
import * as S from './styles'

const Timer = () => {
  const {
    Display,
    displayMessage,
    isRunning,
    workTime,
    breakTime,
    ariaCountdown,
    isMuted,
    toggleTimer,
    resetTimer,
    toggleMute,
    increaseWorkTime,
    decreaseWorkTime,
    increaseBreakTime,
    decreaseBreakTime
  } = usePomodoro()

  const locale = useLocale()
  const [showSettings, setShowSettings] = useState(false)
  const [phraseIndex, setPhraseIndex] = useState(0)
  const settingsRef = useRef<HTMLDivElement>(null)
  const wasRunningRef = useRef(false)

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

  useEffect(() => {
    if (isRunning && !wasRunningRef.current) {
      setPhraseIndex(
        (prev) => (prev + 1) % locale.timer.motivationalPhrases.length
      )
    }
    wasRunningRef.current = isRunning
  }, [isRunning, locale.timer.motivationalPhrases.length])

  return (
    <S.Wrapper ref={settingsRef}>
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
            >
              <S.MuteThumb $isMuted={isMuted} />
            </S.MuteSwitch>
          </S.MuteRow>
        </S.SettingsPanel>
      )}
      <S.PhaseLabel aria-live="polite">
        {displayMessage ? locale.timer.breakLabel : locale.timer.workLabel}
      </S.PhaseLabel>
      <S.Title aria-label={ariaCountdown}>{Display}</S.Title>
      <S.Divider />
      <S.Controls>
        <S.ControlButton $primary onClick={toggleTimer}>
          {isRunning ? locale.timer.pause : locale.timer.play}
        </S.ControlButton>
        <S.ControlButton onClick={resetTimer}>
          {locale.timer.reset}
        </S.ControlButton>
      </S.Controls>
      <S.TimeInfo>
        {locale.timer.workLabel}: <span>{workTime} min</span>
        {' · '}
        {locale.timer.breakLabel}: <span>{breakTime} min</span>
      </S.TimeInfo>
      <S.MotivationalText>
        {locale.timer.motivationalPhrases[phraseIndex]}
      </S.MotivationalText>
    </S.Wrapper>
  )
}

export default Timer
