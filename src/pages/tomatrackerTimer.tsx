import * as S from '../styles/styles'
import Timer from 'components/Timer'
import Link from 'next/link'
import Wrapper from 'components/Wrapper'

export default function Tracker() {
  return (
    <>
      <Wrapper>
        <S.Title>Tomatracker</S.Title>
        <S.Description>Focus at one task and get things done!</S.Description>
        <S.Frame>
          <Timer time={25} breakTime={5} />
        </S.Frame>
        <Link href="/tomatracker">
          <S.Button>Back</S.Button>
        </Link>
      </Wrapper>
    </>
  )
}
