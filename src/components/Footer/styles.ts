import styled from 'styled-components'

export const Footer = styled.footer`
  background-color: ${(props) => props.theme.whiteD};
  color: #${(props) => props.theme.red};
  width: auto;
  height: auto;
  padding: 3em;
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`
