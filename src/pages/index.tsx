/* eslint-disable react/no-unescaped-entities */
import * as S from '../styles/styles'
import Link from 'next/link'
import Footer from 'components/Footer'
export default function Home() {
  return (
    <>
      <S.RedWrapper>
        <S.Title>Tomatracker</S.Title>
        <S.Description>
          Improve your productivity and get thing done!
        </S.Description>
        <Link href="/tomatrackerTimer">
          <S.Button>I'm Ready</S.Button>
        </Link>
      </S.RedWrapper>
      <S.BlueWrapper>
        <Link href="/fiverule">
          <S.Button>Save Me!</S.Button>
        </Link>
      </S.BlueWrapper>
      <Footer />
    </>
  )
}
