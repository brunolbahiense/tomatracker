import styled from 'styled-components'

export const WrapperW = styled.main`
  background-color: #eee;
  color: #d95550;
  width: auto;
  height: auto;
  padding: 3em;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
export const Title = styled.h1`
  margin-top: 3em;
  font-size: 4rem;
  @media only screen and (max-width: 1080px) {
    font-size: 3em;
  }
`

export const Description = styled.h2`
  font-size: 2rem;
  font-weight: 400;
  @media only screen and (max-width: 1080px) {
    font-size: 2em;
  }
`

export const List = styled.div`
  font-size: 3rem;
  margin-top: 3em;
  padding: 2em;
  font-weight: 500;
  border-radius: 15px;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media only screen and (max-width: 1080px) {
    font-size: 1.5em;
  }
`
export const ListItems = styled.div`
  color: #d95550;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media only screen and (max-width: 1080px) {
    font-size: 1em;
  }
`
export const Info = styled.p`
  color: #6f6f6e;
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  text-align: start;
  @media only screen and (max-width: 1080px) {
    font-size: 1em;
  }
`
export const InfoTitle = styled.h1`
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  text-align: start;
  @media only screen and (max-width: 1080px) {
    font-size: 1em;
    margin-bottom: 2em;
  }
`
