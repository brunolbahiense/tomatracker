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
    color: ${props.theme.panelBg};
    box-shadow: 0 4px 18px ${props.theme.accentShadow};

    &:hover {
      box-shadow: 0 4px 24px ${props.theme.accentHoverGlow}, 0 0 40px ${props.theme.accentGlow};
      transform: scale(1.04);
    }
  `
      : `
    background: ${props.theme.surfaceStrong};
    color: ${props.theme.textMuted};
    border: 1px solid ${props.theme.borderWeak};

    &:hover {
      transform: scale(1.05);
    }
  `}
`

export const TimeInfo = styled.p`
  font-size: 1.5rem;
  color: ${(props) => props.theme.textMuted};
  margin-top: 1.2rem;
  letter-spacing: 0.05rem;

  span {
    color: ${(props) => props.theme.gray};
    font-weight: 500;
  }
`

export const MotivationalText = styled.p`
  font-size: 1.6rem;
  color: ${(props) => props.theme.textMuted};
  font-style: italic;
  text-align: center;
  line-height: 1.5;
  border-top: 1px solid ${(props) => props.theme.borderWeak};
  padding-top: 1.2rem;
  margin-top: 1.2rem;
  width: 100%;
`
