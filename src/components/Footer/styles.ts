import styled from 'styled-components'

export const Footer = styled.footer`
  display: flex;
  flex-direction: row;
  background-color: ${(props) => props.theme.whiteD};
  color: ${(props) => props.theme.black};
  width: auto;
  height: auto;
  padding: 1em;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-size: 3em;
`
export const Title = styled.p`
  font-size: 1.5em;
`

export const Icons = styled.img`
  display: flex;
  flex-direction: row;
  height: 1.5em;
  margin-left: 1em;
  cursor: pointer;
`