import styled from 'styled-components'

export const SettingsButton = styled.button`
  position: fixed;
  top: 1.2rem;
  right: 1.2rem;
  z-index: 100;
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 50%;
  background: rgba(214, 55, 49, 0.1);
  border: 1px solid rgba(214, 55, 49, 0.3);
  color: ${(props) => props.theme.red};
  font-size: 3rem;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 12px rgba(214, 55, 49, 0.12);
  transition:
    transform 0.4s ease,
    background 0.2s ease;

  &:hover {
    transform: rotate(90deg) scale(1.1);
    background: rgba(214, 55, 49, 0.18);
  }
`

export const SettingsPanel = styled.div`
  position: fixed;
  top: 4.4rem;
  right: 1.2rem;
  background-color: ${(props) => props.theme.white};
  color: ${(props) => props.theme.grayDark};
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  z-index: 100;
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
