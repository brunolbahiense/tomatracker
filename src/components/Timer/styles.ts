import styled from 'styled-components'

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
  font-size: 1.2rem;
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
  width: 3rem;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    ${(props) => props.theme.red},
    transparent
  );
  border-radius: 2px;
  margin-bottom: 2rem;
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
  `
      : `
    background: rgba(255, 255, 255, 0.07);
    color: rgba(255, 255, 255, 0.45);
    border: 1px solid rgba(255, 255, 255, 0.1);
  `}

  &:hover {
    transform: scale(1.05);
  }
`

export const TimeInfo = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.3);
  margin-top: 1.2rem;
  letter-spacing: 0.05rem;

  span {
    color: rgba(255, 255, 255, 0.5);
    font-weight: 500;
  }
`

export const MotivationalText = styled.p`
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.3);
  font-style: italic;
  text-align: center;
  line-height: 1.5;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding-top: 1.2rem;
  margin-top: 1.2rem;
  width: 100%;
`

export const ConfigRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  font-size: 2rem;
`

export const ConfigLabel = styled.span`
  width: 5rem;
  text-align: right;
`

export const ConfigValue = styled.span`
  width: 3rem;
  text-align: center;
`

export const ConfigButton = styled.button`
  color: ${(props) => props.theme.gray};
  background-color: ${(props) => props.theme.white};
  width: 3rem;
  height: 3rem;
  font-size: 2rem;
  font-weight: 500;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    transform: scale(1.1);
  }
`

export const SettingsButton = styled.button`
  position: absolute;
  top: 0.8rem;
  right: 0.8rem;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  background-color: ${(props) => props.theme.white};
  color: ${(props) => props.theme.red};
  border: none;
  cursor: pointer;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    transform: scale(1.1);
  }
`

export const SettingsPanel = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 3.5rem;
  background-color: ${(props) => props.theme.white};
  color: ${(props) => props.theme.grayDark};
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  z-index: 10;
  min-width: 18rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const MuteRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-top: 1rem;
  border-top: 1px solid ${(props) => props.theme.grayL};
`

interface MuteProps {
  $isMuted: boolean
}

export const MuteSwitch = styled.div<MuteProps>`
  width: 4.4rem;
  height: 2.2rem;
  border-radius: 20px;
  background-color: ${(props) => (props.$isMuted ? props.theme.grayL : props.theme.red)};
  padding: 0.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.2s;
`

export const MuteThumb = styled.div<MuteProps>`
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 50%;
  background-color: ${(props) => props.theme.white};
  transform: translateX(${(props) => (props.$isMuted ? '0' : '2.2rem')});
  transition: transform 0.2s;
`
