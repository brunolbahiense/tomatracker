import styled from 'styled-components'
import { WrapperBackground } from '.'

export const Wrapper = styled.main<{ $background: WrapperBackground }>`
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
    height: auto;
    min-height: 100vh;
    min-height: 100svh;
    border: none;
    box-shadow: none;
    margin: unset;
    width: 100%;
    padding: 2rem 1.5rem;
  }

  ${(props) =>
    props.$background === 'red' &&
    `background: ${props.theme.red};
  `};

  ${(props) =>
    props.$background === 'blue' &&
    `background: ${props.theme.blue};
  `};

  ${(props) =>
    props.$background === 'dark' &&
    `background: radial-gradient(ellipse at 50% 0%, ${props.theme.darkBgTop} 0%, ${props.theme.darkBg} 100%);
  `};
`
