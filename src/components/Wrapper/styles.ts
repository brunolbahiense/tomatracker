import styled from 'styled-components'
import { WrapperProps } from '.'

export const Wrapper = styled.main<WrapperProps>`
  color: ${(props) => props.theme.white};
  max-width: 100vw;
  height: 95vh;
  padding: 3rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 768px) {
    height: 100vh;
    border: none;
    box-shadow: none;
    overflow: hidden;
    margin: unset;
    width: 100%;
    height: 105%;
  }

  ${(props) =>
    props.background === 'red' &&
    `background: ${props.theme.red};
  `};
  ${(props) =>
    props.background === 'blue' &&
    `background: ${props.theme.blue};
  `};
`
