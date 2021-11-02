import * as S from '../../styles/styles'
import SmallTimer from 'components/SmallTimer'
import Link from 'next/link'
import Wrapper from 'components/Wrapper'

export default function Tracker() {
  return (
    <Wrapper background="blue">
      <S.Title>The 5 minutes rule</S.Title>
      <S.Description>Focus at one task and get things done!</S.Description>
      <S.FrameB>
        <SmallTimer />
      </S.FrameB>
      <Link href="/FiveRule">
        <S.Button>Reset</S.Button>
      </Link>
    </Wrapper>
  )
}
