import * as S from './styles'
import Link from 'next/link'

export default function Footer() {
  return (
    <>
      <S.Footer>
        <S.ContactDiv>
          <S.Title>Project by:</S.Title>
          <Link href="https://bluis.vercel.app/">
            <S.Name>{'<B/uis>'}</S.Name>
          </Link>
        </S.ContactDiv>
        <S.LinkDiv>
          <S.Title>Follow me</S.Title>
          <S.IconsDiv>
            <Link href="http://github.com/brunolbahiense">
              <S.Icons src="/img/github.png" />
            </Link>
            <Link href="https://www.instagram.com/brunolbahiense/">
              <S.Icons src="/img/instagram.png" />
            </Link>
            <Link href="https://twitter.com/BrunoLBahiense">
              <S.Icons src="/img/twitter.png" />
            </Link>
          </S.IconsDiv>
          <Link href="http://github.com/brunolbahiense">
            <S.Link>@brunolbahiense</S.Link>
          </Link>
        </S.LinkDiv>
      </S.Footer>
    </>
  )
}
