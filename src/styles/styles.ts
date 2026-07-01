import styled, { keyframes } from 'styled-components'

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`

export const Frame = styled.main`
  position: relative;
  background: ${(props) => props.theme.surfaceWeak};
  border: 1px solid ${(props) => props.theme.borderMid};
  border-radius: 20px;
  padding: 3rem 3.5rem;
  width: 42rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.4),
    0 0 0 1px ${(props) => props.theme.borderWeak},
    0 0 80px ${(props) => props.theme.accentGlow};
  backdrop-filter: blur(8px);
  margin-top: 3rem;
  animation: ${fadeUp} 0.6s ease-out 0.15s both;

  @media only screen and (max-width: 768px) {
    width: 90%;
    padding: 2.5rem 2rem;
  }
`

export const SiteTitle = styled.h1`
  font-size: 5.2rem;
  font-weight: 700;
  color: ${(props) => props.theme.white};
  letter-spacing: -1px;
  margin-bottom: 1.5rem;
  animation: ${fadeUp} 0.6s ease-out both;

  span {
    color: ${(props) => props.theme.red};
  }

  @media only screen and (max-width: 768px) {
    font-size: 3.6rem;
  }
`

export const ScrollHint = styled.div`
  margin-top: 2rem;
  font-size: 1.4rem;
  color: ${(props) => props.theme.textFaint};
  animation: bounce 2s ease-in-out infinite;

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(5px);
    }
  }
`
