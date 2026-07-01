import styled, { keyframes } from 'styled-components'

const dividerPulse = keyframes`
  0%, 100% { width: 3rem; opacity: 0.7; }
  50%       { width: 5rem; opacity: 1; }
`

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const PhaseLabel = styled.div`
  font-size: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  color: ${(props) => props.theme.red};
  font-weight: 600;
  margin-bottom: 0.8rem;
`

export const Title = styled.div`
  font-size: 10rem;
  font-weight: 700;
  letter-spacing: -0.4rem;
  line-height: 1;
`

export const Divider = styled.div`
  height: 2px;
  width: 3rem;
  background: linear-gradient(
    90deg,
    transparent,
    ${(props) => props.theme.red},
    transparent
  );
  border-radius: 2px;
  margin-bottom: 2rem;
  animation: ${dividerPulse} 2.5s ease-in-out infinite;
`

export const Controls = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
`

interface ControlButtonProps {
  $primary?: boolean
}

export const ControlButton = styled.button<ControlButtonProps>`
  padding: 0.9rem 2.5rem;
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: 0.15rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  text-transform: uppercase;

  ${(props) =>
    props.$primary
      ? `
    background: linear-gradient(135deg, ${props.theme.red}, ${props.theme.lightRed});
    color: ${props.theme.white};
    box-shadow: 0 4px 18px rgba(214, 55, 49, 0.45);

    &:hover {
      box-shadow: 0 4px 24px rgba(214, 55, 49, 0.65), 0 0 40px rgba(214, 55, 49, 0.3);
      transform: scale(1.04);
    }
  `
      : `
    background: rgba(255, 255, 255, 0.07);
    color: rgba(255, 255, 255, 0.45);
    border: 1px solid rgba(255, 255, 255, 0.1);

    &:hover {
      transform: scale(1.05);
    }
  `}
`

export const TimeInfo = styled.p`
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.3);
  margin-top: 1.2rem;
  letter-spacing: 0.05rem;

  span {
    color: rgba(255, 255, 255, 0.5);
    font-weight: 500;
  }
`

export const MotivationalText = styled.p`
  font-size: 1.6rem;
  color: rgba(255, 255, 255, 0.3);
  font-style: italic;
  text-align: center;
  line-height: 1.5;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding-top: 1.2rem;
  margin-top: 1.2rem;
  width: 100%;
`
