import styled from 'styled-components'

export const Wrapper = styled.main`
  background-color: #000;
  color: #d9d9d9;
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
  }
`
export const Box = styled.div`
  background-color: #1c1f23;
  padding: 3rem;
  border-radius: 15px;
`

export const ClickWrapper = styled.div`
  width: 40%;
  height: 100%;
  padding: 2rem;
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  @media only screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`
export const BoxWrapper = styled.div`
  padding: 2rem;
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  @media only screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`

export const Title = styled.h1`
  font-size: 4em;
`

export const Description = styled.h2`
  font-size: 2rem;
  font-weight: 400;
  color: #e01673;
`
export const Click = styled.button`
  color: #d9d9d9;
  font-size: 2rem;
  font-weight: 400;
  padding: 1.5rem;
  border-radius: 15px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    /* background-color: #161616; */
    color: #e01673;
  }

  svg {
    background-color: transparent;
    margin-right: 1rem;
  }
`

export const Illustration = styled.img`
  margin-top: 3rem;
  width: min(30rem, 100%);
`
