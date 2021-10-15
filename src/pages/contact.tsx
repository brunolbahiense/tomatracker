import * as S from '../components/Main/styles'
import { FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa'
import Link from 'next/link'

const contact = () => (
  <S.Wrapper>
    <S.Title>Contato</S.Title>
    <S.Description>Entre em contato conosco!</S.Description>
    <S.BoxWrapper>
      <Link href="https://github.com/brunolbahiense">
        <S.Click>
          <FaGithub />
          Github
        </S.Click>
      </Link>
      <Link href="https://twitter.com/BrunoLBahiense">
        <S.Click>
          <FaTwitter />
          Twitter
        </S.Click>
      </Link>

      <Link href="https://www.instagram.com/brunolbahiense/">
        <S.Click>
          <FaInstagram />
          Instagram
        </S.Click>
      </Link>
    </S.BoxWrapper>
  </S.Wrapper>
)

export default contact
