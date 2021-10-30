import * as S from './styles'

export interface WrapperProps {
  background: 'blue' | 'red'
}
const Wrapper = ({ background = 'red', ...props }: WrapperProps) => {
  return <S.Wrapper {...props} background={background} />
}

export default Wrapper
