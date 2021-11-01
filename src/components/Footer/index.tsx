import * as S from './styles'
import Link from 'next/link'

export default function Footer() {
  return (
    <>
      <S.Footer>
        <S.Title>Contact me:</S.Title>
        <Link href="http://github.com/brunolbahiense">
          <S.Icons src="/img/github.png" />
        </Link>
        <Link href="https://www.instagram.com/brunolbahiense/">
          <S.Icons src="/img/instagram.png" />
        </Link>
        <Link href="https://twitter.com/BrunoLBahiense">
          <S.Icons src="/img/twitter.png" />
        </Link>
      </S.Footer>
    </>
  )
}
