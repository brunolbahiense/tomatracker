import styled from 'styled-components'

export const Section = styled.section`
  background: ${(props) => props.theme.darkBgSection};
  padding: 5rem 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`

export const Heading = styled.div`
  text-align: center;
`

export const HeadingTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${(props) => props.theme.white};
  letter-spacing: -0.5px;
  margin-bottom: 0.5rem;
`

export const HeadingSubtitle = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.35);
`

export const Pillars = styled.div`
  display: flex;
  gap: 1.5rem;
  max-width: 700px;
  width: 100%;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`

export const Pillar = styled.div`
  flex: 1;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 16px;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  text-align: center;

  @media only screen and (max-width: 768px) {
    width: 90%;
  }
`

export const PillarIcon = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: rgba(214, 55, 49, 0.12);
  border: 1px solid rgba(214, 55, 49, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`

export const PillarHighlight = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${(props) => props.theme.red};
  letter-spacing: -1px;
  line-height: 1;
`

export const PillarTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 700;
  color: ${(props) => props.theme.white};
  letter-spacing: -0.3px;
`

export const PillarDescription = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.4);
  line-height: 1.6;
`
