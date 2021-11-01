import * as S from '../styles/styles'
import Link from 'next/link'
import PomodoroInfo from '../components/PomodoroInfo'
import Wrapper from 'components/Wrapper'

export default function Home() {
  return (
    <>
      <Wrapper>
        <Link href="/">
          <S.Title>Tomatracker</S.Title>
        </Link>
        <S.Description>
          Using The Pomodoro Technique to improve your productivity
        </S.Description>
        <Link href="/tomatrackerTimer">
          <S.Button>START</S.Button>
        </Link>
        <Link href="/fiverule">
          <S.Lazy>Fealling lazy?</S.Lazy>
        </Link>
      </Wrapper>
      <PomodoroInfo />
    </>
  )
}
