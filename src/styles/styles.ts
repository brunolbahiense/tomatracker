import styled from 'styled-components'

export const Wrapper = styled.main`
  background-color: #d95550;
  color: #eee;
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
  background-color: #dd6662;
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

export const Button = styled.button`
  margin-top: 3rem;
  color: #dd6662;
  background-color: #eee;
  padding: 2rem;
  font-size: 3rem;
  font-weight: 500;
  border-radius: 15px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    background-color: #d9d9d9;
  }
`
