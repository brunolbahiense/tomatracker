import * as S from '../../styles/styles'
import Link from 'next/link'
import PomodoroInfo from '../../components/PomodoroInfo'
import Wrapper from 'components/Wrapper'
import Timer from 'components/Timer'
import { useState } from 'react'

export default function Home() {
  const [showCounter, setShowCounter] = useState(false)
  return (
    <>
      <Wrapper>
        <Link href="/">
          <S.Title>Tomatracker</S.Title>
        </Link>
        <S.Description>
          Using The Pomodoro Technique to improve your productivity
        </S.Description>
        {showCounter && (
          <S.Frame>
            <Timer time={25} breakTime={5} />
          </S.Frame>
        )}
        <S.Button onClick={() => setShowCounter(!showCounter)}>
          {!showCounter ? 'START' : 'STOP'}
        </S.Button>
      </Wrapper>
      <PomodoroInfo />
    </>
  )
}
