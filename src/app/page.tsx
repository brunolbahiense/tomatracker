'use client'

import usePomodoro from 'hooks/usePomodoro'
import * as S from 'styles/styles'
import PomodoroInfo from 'components/PomodoroInfo'
import Wrapper from 'components/Wrapper'
import Footer from 'components/Footer'
import Timer from 'components/Timer'
import Settings from 'components/Settings'

export default function Home() {
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

  return (
    <>
      <Settings
        workTime={workTime}
        breakTime={breakTime}
        isMuted={isMuted}
        toggleMute={toggleMute}
        increaseWorkTime={increaseWorkTime}
        decreaseWorkTime={decreaseWorkTime}
        increaseBreakTime={increaseBreakTime}
        decreaseBreakTime={decreaseBreakTime}
      />
      <Wrapper background="dark">
        <S.SiteTitle>
          🍅 Tomat<span>racker</span>
        </S.SiteTitle>
        <S.Frame>
          <Timer
            Display={Display}
            displayMessage={displayMessage}
            isRunning={isRunning}
            workTime={workTime}
            breakTime={breakTime}
            ariaCountdown={ariaCountdown}
            toggleTimer={toggleTimer}
            resetTimer={resetTimer}
          />
        </S.Frame>
        <S.ScrollHint aria-hidden="true">↓</S.ScrollHint>
      </Wrapper>
      <PomodoroInfo />
      <Footer />
    </>
  )
}
