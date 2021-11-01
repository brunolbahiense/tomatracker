import * as S from '../styles/styles'
import Link from 'next/link'
import Wrapper from 'components/Wrapper'

export default function Home() {
  return (
    <>
      <Wrapper background="blue">
        <S.Title>The 5 minutes rule</S.Title>
        <S.Description>
          If you are fealling that it is impossible to get things done, just
          schedule 1 small task to do in 5 minutes
        </S.Description>
        <Link href="/fiveRuleTimer">
          <S.Button>START</S.Button>
        </Link>
        <Link href="/tomatracker">
          <S.Lazy>I am Ready to Pomodoro!</S.Lazy>
        </Link>
      </Wrapper>
    </>
  )
}
