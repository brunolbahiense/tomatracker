import styled from 'styled-components'

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
`

export const SettingsButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 200;
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 50%;
  background: ${(props) => props.theme.accentSoft};
  border: 1px solid ${(props) => props.theme.accentGlow};
  color: ${(props) => props.theme.red};
  font-size: 2.2rem;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 12px ${(props) => props.theme.accentGlow};
  transition:
    transform 0.4s ease,
    background 0.2s ease;

  &:hover {
    transform: rotate(90deg) scale(1.1);
    background: ${(props) => props.theme.accentHover};
  }
`

export const SettingsPanel = styled.div`
  position: absolute;
  top: 5rem;
  right: 1rem;
  background-color: ${(props) => props.theme.panelBg};
  color: ${(props) => props.theme.grayDark};
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  z-index: 200;
  min-width: 18rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
  background-color: ${(props) => props.theme.panelBg};
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

  &:hover {
    transform: scale(1.1);
  }
`

export const SectionDivider = styled.div`
  height: 1px;
  background: ${(props) => props.theme.grayL};
`

export const SectionLabel = styled.div`
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  color: ${(props) => props.theme.gray};
`

export const ColorRow = styled.div`
  display: flex;
  gap: 0.8rem;
`

interface SwatchProps {
  $color: string
  $selected: boolean
}

export const ColorSwatch = styled.button<SwatchProps>`
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  background: ${(props) => props.$color};
  border: 2px solid ${(props) => (props.$selected ? props.theme.grayDark : 'transparent')};
  outline: 2px solid ${(props) => (props.$selected ? props.$color : 'transparent')};
  outline-offset: 2px;
  cursor: pointer;
  transition:
    transform 0.15s,
    outline 0.15s;

  &:hover {
    transform: scale(1.15);
  }
`

export const ModeSwitcher = styled.div`
  display: flex;
  gap: 0.4rem;
  background: ${(props) => props.theme.grayL};
  border-radius: 8px;
  padding: 0.3rem;
`

interface ModeButtonProps {
  $active: boolean
}

export const ModeButton = styled.button<ModeButtonProps>`
  flex: 1;
  padding: 0.4rem 0.8rem;
  font-size: 1.2rem;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  background: ${(props) => (props.$active ? props.theme.red : 'transparent')};
  color: ${(props) => (props.$active ? props.theme.panelBg : props.theme.gray)};
  transition:
    background 0.15s,
    color 0.15s;
`

export const MuteRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-top: 0.5rem;
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
  background-color: ${(props) => props.theme.panelBg};
  transform: translateX(${(props) => (props.$isMuted ? '0' : '2.2rem')});
  transition: transform 0.2s;
`
