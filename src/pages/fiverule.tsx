import * as S from '../styles/styles'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <S.WrapperB>
        <S.Title>The 5 minutes rule</S.Title>
        <S.Description>
          If you are fealling that it is impossible to get things done, just
          schedule 1 small task to do in 5 minutes
        </S.Description>
        <Link href="/smalltracker">
          <S.Button>START</S.Button>
        </Link>
      </S.WrapperB>
    </>
  )
}
