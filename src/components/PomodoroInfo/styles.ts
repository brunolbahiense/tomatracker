import styled from 'styled-components'

export const Section = styled.section`
  background: ${(props) => props.theme.darkBgSection};
  padding: 5rem 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  border-top: 1px solid ${(props) => props.theme.borderWeak};
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
  font-size: 1.3rem;
  color: ${(props) => props.theme.textMuted};
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

interface PillarProps {
  $visible?: boolean
  $index?: number
}

export const Pillar = styled.div<PillarProps>`
  flex: 1;
  background: ${(props) => props.theme.surfaceWeak};
  border: 1px solid ${(props) => props.theme.borderWeak};
  border-radius: 16px;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  text-align: center;
  transform: ${(props) => (props.$visible ? 'translateY(0)' : 'translateY(24px)')};
  transition: transform 0.5s ease;
  transition-delay: ${(props) => (props.$index ?? 0) * 0.12}s;

  @media only screen and (max-width: 768px) {
    width: 90%;
  }
`

export const PillarIcon = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: ${(props) => props.theme.accentSoft};
  border: 1px solid ${(props) => props.theme.accentGlow};
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
  font-size: 1.3rem;
  font-weight: 700;
  color: ${(props) => props.theme.white};
  letter-spacing: -0.3px;
`

export const PillarDescription = styled.p`
  font-size: 1.1rem;
  color: ${(props) => props.theme.textMuted};
  line-height: 1.6;
`
