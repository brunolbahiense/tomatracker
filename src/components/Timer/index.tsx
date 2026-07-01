'use client'

import { useState, useEffect, useRef } from 'react'
import useLocale from 'hooks/useLocale'
import * as S from './styles'

interface TimerProps {
  Display: string
  displayMessage: boolean
  isRunning: boolean
  workTime: number
  breakTime: number
  ariaCountdown: string
  toggleTimer: () => void
  resetTimer: () => void
}

const Timer = ({
  Display,
  displayMessage,
  isRunning,
  workTime,
  breakTime,
  ariaCountdown,
  toggleTimer,
  resetTimer
}: TimerProps) => {
  const locale = useLocale()
  const [phraseIndex, setPhraseIndex] = useState(0)
  const wasRunningRef = useRef(false)

  useEffect(() => {
    if (isRunning && !wasRunningRef.current) {
      setPhraseIndex(
        (prev) => (prev + 1) % locale.timer.motivationalPhrases.length
      )
    }
    wasRunningRef.current = isRunning
  }, [isRunning, locale.timer.motivationalPhrases.length])

  return (
    <S.Wrapper>
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
