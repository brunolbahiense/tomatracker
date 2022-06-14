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
        <Link href="/Tomatracker">
          <S.Button>I'm Ready</S.Button>
        </Link>
      </Wrapper>
      <Footer />
    </>
  )
}
