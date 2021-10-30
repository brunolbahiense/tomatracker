/* eslint-disable react/no-unescaped-entities */
import * as S from '../styles/styles'
import Link from 'next/link'
import Footer from 'components/Footer'
import Wrapper from 'components/Wrapper'
export default function Home() {
  return (
    <>
      <Wrapper background="red">
        <S.TitleDiv>
          <S.Title>Tomatracker</S.Title>
        </S.TitleDiv>
        <S.Container>
          <S.Message>Improve your productivity and get thing done!</S.Message>
          <S.Illustration src="/img/tomato.png" />
        </S.Container>
        <Link href="/tomatracker">
          <S.Button>I'm Ready</S.Button>
        </Link>
      </Wrapper>
      <Wrapper background="blue">
        <S.TitleDiv>
          <S.Title>The 5 Minutes Rule</S.Title>
        </S.TitleDiv>
        <S.Container>
          <S.Message>If you're fealling lazy today, no worries, :)</S.Message>
          <S.Illustration src="/img/tomato.png" />
        </S.Container>
        <Link href="/fiverule">
          <S.Button>Save Me!</S.Button>
        </Link>
      </Wrapper>
      <Footer />
    </>
  )
}
