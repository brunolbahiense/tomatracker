import * as S from './styles'

export interface WrapperProps {
  background?: 'blue' | 'red'
  children?: React.ReactNode
}
const Wrapper = ({ background = 'red', ...props }: WrapperProps) => {
  return <S.Wrapper {...props} background={background} />
}

export default Wrapper
