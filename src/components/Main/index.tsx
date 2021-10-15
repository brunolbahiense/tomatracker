import * as S from './styles'
import { FaCoffee, FaCode } from 'react-icons/fa'
import Link from 'next/link'

const Main = () => (
  <S.Wrapper>
    <S.Title>BOILERPLATE</S.Title>
    <S.Description>
      Template base dos projetos desenvolvidos por Bluis
    </S.Description>
    <S.Illustration
      src="/img/hero-illustration.svg"
      alt="Um desenvolvedor de frente para uma tela com código."
    />
    <S.ClickWrapper>
      <Link href="/contact">
        <S.Click>
          <FaCoffee />
          Contato
        </S.Click>
      </Link>
      <Link href="/tech">
        <S.Click>
          <FaCode />
          Tecnologias
        </S.Click>
      </Link>
    </S.ClickWrapper>
  </S.Wrapper>
)

export default Main
