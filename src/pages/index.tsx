import * as S from '../components/Main/styles'
import Link from 'next/link'

export default function Home() {
  return (
    <S.Wrapper>
      <S.Title>Tomatracker</S.Title>
      <S.Description>
        Using the pomodoro method to improve your productivity
      </S.Description>
      <Link href="/tracker">
        <S.Button>START</S.Button>
      </Link>
    </S.Wrapper>
  )
}
