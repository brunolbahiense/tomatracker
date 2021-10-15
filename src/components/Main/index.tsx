import * as S from './styles'
import Timer from 'components/Timer'

const Main = () => (
  <S.Wrapper>
    <S.Title>Tomatracker</S.Title>
    <S.Description>Focus at one task and get things done!</S.Description>
    <S.Frame>
      <Timer />
    </S.Frame>
  </S.Wrapper>
)

export default Main
