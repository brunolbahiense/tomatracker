import styled from 'styled-components'

export const Frame = styled.main`
  position: relative;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 20px;
  padding: 3rem 3.5rem;
  width: 42rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(255, 255, 255, 0.04),
    0 0 80px rgba(214, 55, 49, 0.07);
  backdrop-filter: blur(8px);
  margin-top: 3rem;

  @media only screen and (max-width: 768px) {
    width: 90%;
    padding: 2.5rem 2rem;
  }
`

export const Title = styled.h1`
  font-size: 4em;
  margin-bottom: 0.5em;
  cursor: pointer;
  @media only screen and (max-width: 768px) {
    margin-right: 0em;
    font-size: 3em;
  }
`

export const Description = styled.h2`
  font-size: 2rem;
  font-weight: 400;
`
export const Message = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-right: 8em;
  @media only screen and (max-width: 768px) {
    margin-right: 0em;
    font-weight: 400;
  }
`

export const Button = styled.button`
  margin-top: 3rem;
  color: ${(props) => props.theme.gray};
  background-color: ${(props) => props.theme.white};
  padding: 2rem;
  font-size: 3rem;
  font-weight: 500;
  border-radius: 15px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  :hover {
    transform: scale(1.1);
    animation: smooth;
  }
`

export const Illustration = styled.img`
  height: 20em;
  display: flex;
  justify-content: flex-end;
  @media only screen and (max-width: 768px) {
    display: none;
  }
`
export const Container = styled.div`
  display: flex;
  width: 80%;
  flex-direction: row;
  align-items: center;
  padding: 3em 8em;
  justify-content: center;

  @media only screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    border: none;
    margin: unset;
    overflow: hidden;
    padding: none;
    width: auto;
  }
`

export const TitleDiv = styled.div`
  cursor: pointer;
  display: flex;
  align-items: flex-start;
  width: 100%;
  padding-left: 15em;
  font-size: 1.5em;
  @media only screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
    box-shadow: none;
    margin: unset;
    overflow: hidden;
    padding: 0em;
    justify-content: center;
  }
`
