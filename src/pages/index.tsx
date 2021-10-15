import * as S from '../styles/styles'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <S.Wrapper>
        <S.Title>Tomatracker</S.Title>
        <S.Description>
          Using The Pomodoro Technique to improve your productivity
        </S.Description>
        <Link href="/tracker">
          <S.Button>START</S.Button>
        </Link>
        <Link href="/fiverule">
          <S.Lazy>Fealling lazy?</S.Lazy>
        </Link>
      </S.Wrapper>
    </>
  )
}
