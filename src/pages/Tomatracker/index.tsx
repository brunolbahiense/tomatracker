import * as S from '../../styles/styles'
import Link from 'next/link'
import PomodoroInfo from '../../components/PomodoroInfo'
import Wrapper from 'components/Wrapper'
import Timer from 'components/Timer'
import { useState } from 'react'

export default function Home() {
  const [showCounter, setShowCounter] = useState(false)
  const [breakTime, setBreakTime] =useState(5)
  return (
    <>
      <Wrapper>
        <Link href="/">
          <S.Title>Tomatracker</S.Title>
        </Link>
        <S.Description>
          Hora de focar!
        </S.Description>
        <S.Frame>
          <Timer time={25} breakTime={breakTime} />
        </S.Frame>
      </Wrapper>
      <PomodoroInfo />
    </>
  )
}
