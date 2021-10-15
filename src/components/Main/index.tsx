import * as S from './styles'
import Timer from 'components/Timer'
import Link from 'next/link'

const Main = () => (
  <S.Wrapper>
    <S.Title>Tomatracker</S.Title>
    <S.Description>Focus at one task and get things done!</S.Description>
    <S.Frame>
      <Timer />
    </S.Frame>
    <Link href="/">
      <S.Button>Back</S.Button>
    </Link>
  </S.Wrapper>
)

export default Main
