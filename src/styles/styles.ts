import styled from 'styled-components'

export const Wrapper = styled.main`
  background-color: #d95550;
  color: ${(props) => props.theme.white};
  width: 100%;
  height: 100%;
  padding: 3rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 768px) {
    border: none;
    box-shadow: none;
    width: 100%;
    margin: unset;
    height: 105%;
    overflow: hidden;
  }
`
export const WrapperB = styled.main`
  background-color: ${(props) => props.theme.blue};
  color: ${(props) => props.theme.white};
  width: 100%;
  height: 100%;
  padding: 3rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 768px) {
    border: none;
    box-shadow: none;
    width: 100%;
    margin: unset;
    height: 105%;
    overflow: hidden;
  }
`
export const Frame = styled.main`
  background-color: ${(props) => props.theme.lightred};
  width: 60rem;
  height: 40rem;
  padding: 3rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  margin-top: 5rem;
`
export const FrameB = styled.main`
  background-color: ${(props) => props.theme.lightblue};
  width: 60rem;
  height: 40rem;
  padding: 3rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  margin-top: 5rem;
`

export const Title = styled.h1`
  font-size: 4em;
`

export const Description = styled.h2`
  font-size: 2rem;
  font-weight: 400;
`
export const Lazy = styled.h2`
  font-size: 2rem;
  font-weight: 400;
  cursor: pointer;
  margin-top: 2rem;

  :hover {
    color: ${(props) => props.theme.grayL};
  }
`

export const Button = styled.button`
  margin-top: 3rem;
  color: ${(props) => props.theme.green};
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
    background-color: ${(props) => props.theme.grayL};
  }
`
