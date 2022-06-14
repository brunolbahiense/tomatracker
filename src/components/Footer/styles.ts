import styled from 'styled-components'

export const Footer = styled.footer`
  background-color: ${(props) => props.theme.grayDark};
  color: ${(props) => props.theme.white};
  max-width: 100vw;
  display: flex;
  flex-direction: row;
  padding: 1.5em;
  text-align: center;
  align-items: center;
  justify-content: space-around;
  font-size: 3em;
  @media only screen and (max-width: 768px) {
    align-items: center;
    border: none;
    box-shadow: none;
    margin: unset;
    overflow: hidden;
    justify-content: center;
    padding: 1em;
    font-size: 2em;
  }
`
export const IconsDiv = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1em;
  align-items: center;
  justify-content: center;
`
export const ContactDiv = styled.div`
  width: 50vw;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`
export const LinkDiv = styled.div`
  width: 50vw;
  border-left: solid 1px ${(props) => props.theme.white};

  @media only screen and (max-width: 768px) {
    width: 100vw;
    border: none;
  }
`
export const Title = styled.p`
  font-size: 1.5em;
`
export const Name = styled.p`
  font-size: 2.5em;
  margin-top: 0.5em;
  font-weight: 600;
  cursor: pointer;
  :hover {
    color: ${(props) => props.theme.red};
    transform: scale(1.1);
    animation: smooth;
  }
`
export const Link = styled.p`
  font-size: 1em;
  cursor: pointer;
  :hover {
    color: ${(props) => props.theme.red};
    transform: scale(1.1);
    animation: smooth;
  }
`

export const Icons = styled.img`
  display: flex;
  flex-direction: row;
  height: 1.5em;
  margin: 0.5em;
  cursor: pointer;
  :hover {
    transform: scale(1.2);
    animation: smooth;
  }
`
