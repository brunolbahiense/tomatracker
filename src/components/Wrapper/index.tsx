'use client'

import * as S from './styles'

export type WrapperBackground = 'blue' | 'red' | 'dark'

export interface WrapperProps {
  background?: WrapperBackground
  children?: React.ReactNode
}

const Wrapper = ({ background = 'red', children }: WrapperProps) => {
  return <S.Wrapper $background={background}>{children}</S.Wrapper>
}

export default Wrapper
