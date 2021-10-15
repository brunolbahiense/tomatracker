import * as S from '../components/Main/styles'
import {
  SiReact,
  SiTypescript,
  SiEslint,
  SiPrettier,
  SiStyledComponents
} from 'react-icons/si'

const Tech = () => (
  <S.Wrapper>
    <S.Title>Tecnologias utilizadas</S.Title>
    <S.Description>
      Estas são as tecnologias que usamos neste projeto!
    </S.Description>
    <S.BoxWrapper>
      <S.Click>
        <SiReact />
        React
      </S.Click>
      <S.Click>
        <SiTypescript />
        Typescript
      </S.Click>
      <S.Click>
        <SiEslint />
        Eslint
      </S.Click>
      <S.Click>
        <SiPrettier />
        Prettier
      </S.Click>
      <S.Click>
        <SiStyledComponents />
        Styled-Components
      </S.Click>
    </S.BoxWrapper>
  </S.Wrapper>
)

export default Tech
