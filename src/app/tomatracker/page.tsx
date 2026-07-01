'use client'

import * as S from 'styles/styles'
import Link from 'next/link'
import PomodoroInfo from 'components/PomodoroInfo'
import Wrapper from 'components/Wrapper'
import Timer from 'components/Timer'
import useLocale from 'hooks/useLocale'

export default function TomatrackerPage() {
  const locale = useLocale()

  return (
    <>
      <Wrapper background="dark">
        <Link href="/">
          <S.Title>Tomatracker</S.Title>
        </Link>
        <S.Description>{locale.timerPage.description}</S.Description>
        <S.Frame>
          <Timer />
        </S.Frame>
      </Wrapper>
      <PomodoroInfo />
    </>
  )
}
