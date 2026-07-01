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

export const Title = styled.h1`
  font-size: 10rem;
`

export const Message = styled.h2`
  font-size: 2rem;
  font-weight: 400;
`

export const Illustration = styled.img`
  margin-top: 3rem;
  width: min(30rem, 100%);
`

export const Controls = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
`

export const ControlButton = styled.button`
  color: ${(props) => props.theme.gray};
  background-color: ${(props) => props.theme.white};
  padding: 1rem 2rem;
  font-size: 2rem;
  font-weight: 500;
  border-radius: 10px;
  border: none;
  cursor: pointer;

  :hover {
    transform: scale(1.1);
  }
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
