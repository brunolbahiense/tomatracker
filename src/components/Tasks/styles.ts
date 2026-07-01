import styled from 'styled-components'

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 999;
`

interface ActiveProps {
  $active: boolean
}

export const TasksButton = styled.button<ActiveProps>`
  position: fixed;
  top: 1.5rem;
  left: 1.5rem;
  z-index: 1000;
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 50%;
  background: ${(props) => (props.$active ? props.theme.red : props.theme.accentSoft)};
  border: 1px solid ${(props) => props.theme.accentGlow};
  color: ${(props) => (props.$active ? props.theme.panelBg : props.theme.red)};
  font-size: 2rem;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 12px ${(props) => props.theme.accentGlow};
  transition:
    transform 0.2s ease,
    background 0.2s ease,
    color 0.2s ease;

  &:hover {
    transform: scale(1.1);
    background: ${(props) => (props.$active ? props.theme.red : props.theme.accentHover)};
  }
`

export const TasksDrawer = styled.div`
  position: fixed;
  top: 5rem;
  left: 1.5rem;
  z-index: 1000;
  background-color: ${(props) => props.theme.panelBg};
  color: ${(props) => props.theme.grayDark};
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  min-width: 22rem;
  max-height: calc(100vh - 7rem);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`

export const InputRow = styled.div`
  display: flex;
  gap: 0.6rem;
  margin-bottom: 0.4rem;
`

export const TaskInput = styled.input`
  flex: 1;
  background: ${(props) => props.theme.surfaceWeak};
  border: 1px solid ${(props) => props.theme.borderWeak};
  border-radius: 6px;
  padding: 0.6rem 0.8rem;
  font-size: 1.3rem;
  color: ${(props) => props.theme.grayDark};
  outline: none;

  &::placeholder {
    color: ${(props) => props.theme.grayL};
  }

  &:focus {
    border-color: ${(props) => props.theme.borderMid};
  }
`

export const AddButton = styled.button`
  width: 3rem;
  height: 3rem;
  border-radius: 6px;
  background: ${(props) => props.theme.red};
  color: ${(props) => props.theme.panelBg};
  border: none;
  font-size: 2rem;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.85;
  }
`

export const TaskRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.3rem 0;
`

interface DoneProps {
  $done: boolean
}

export const Checkbox = styled.div<DoneProps>`
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 4px;
  flex-shrink: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  background: ${(props) => (props.$done ? props.theme.accentSoft : 'transparent')};
  border: 1.5px solid ${(props) => (props.$done ? props.theme.red : props.theme.borderMid)};
  color: ${(props) => props.theme.red};
  transition: all 0.15s;
`

export const TaskText = styled.span<DoneProps>`
  flex: 1;
  font-size: 1.3rem;
  color: ${(props) => (props.$done ? props.theme.gray : props.theme.grayDark)};
  text-decoration: ${(props) => (props.$done ? 'line-through' : 'none')};
`

export const Timestamp = styled.span`
  font-size: 1rem;
  color: ${(props) => props.theme.gray};
  flex-shrink: 0;
`

export const DeleteButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.gray};
  font-size: 1.6rem;
  line-height: 1;
  cursor: pointer;
  padding: 0 0.2rem;
  flex-shrink: 0;
  transition: color 0.15s;

  &:hover {
    color: ${(props) => props.theme.red};
  }
`

export const SectionDivider = styled.div`
  height: 1px;
  background: ${(props) => props.theme.borderWeak};
  margin: 0.4rem 0;
`

export const SectionLabel = styled.div`
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  color: ${(props) => props.theme.gray};
  margin-bottom: 0.2rem;
`

export const DownloadButton = styled.button`
  width: 100%;
  margin-top: 0.4rem;
  padding: 0.7rem;
  background: ${(props) => props.theme.red};
  color: ${(props) => props.theme.panelBg};
  border: none;
  border-radius: 6px;
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  cursor: pointer;
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.85;
  }
`
