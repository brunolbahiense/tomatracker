import styled from 'styled-components'

export const Wrapper = styled.main`
  background-color: ${(props) => props.theme.blue};
  color: ${(props) => props.theme.white};
  width: 40rem;
  height: 30rem;
  padding: 3rem;
  margin-top: 5rem;
  display: flex;
  text-align: center;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  @media only screen and (max-width: 768px) {
    border: none;
    box-shadow: none;
  }
`

export const Title = styled.h1`
  font-size: 10rem;
`

export const Message = styled.h2`
  font-size: 2rem;
  font-weight: 400;
`
export const Button = styled.button`
  color: ${(props) => props.theme.red};
  background-color: ${(props) => props.theme.white};
  padding: 2rem;
  font-size: 3rem;
  font-weight: 500;
  border-radius: 15px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;

  :hover {
    background-color: ${(props) => props.theme.grayL};
  }
`

export const Illustration = styled.img`
  margin-top: 3rem;
  width: min(30rem, 100%);
`
export const FrameB = styled.main`
  background-color: ${(props) => props.theme.lightblue};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
