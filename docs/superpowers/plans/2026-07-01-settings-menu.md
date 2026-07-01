# Settings Floating Menu Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a ⚙ gear icon to the Timer that opens a floating menu with work/break time controls and a mute toggle switch.

**Architecture:** `isMuted` and `toggleMute` live in `usePomodoro` (persisted to localStorage). `showSettings` lives as local state in the `Timer` component. The floating panel is absolutely positioned inside `S.Wrapper`, which becomes a transparent `position: relative` container.

**Tech Stack:** React 18, styled-components 6, TypeScript 5

---

## File Map

| File | Change |
|---|---|
| `src/locales/en.ts` | Add `settingsTitle`, `aria.muteLabel` |
| `src/locales/pt.ts` | Add translated equivalents |
| `src/hooks/usePomodoro.ts` | Add `isMuted`, `toggleMute`, reactivate `playSound` |
| `src/components/Timer/styles.ts` | Update `Wrapper`, remove `Config`, add `SettingsButton`, `SettingsPanel`, `MuteRow`, `MuteSwitch`, `MuteThumb` |
| `src/components/Timer/index.tsx` | Add `showSettings`, `settingsRef`, click-outside, render panel |

---

### Task 1: Update locales

**Files:**
- Modify: `src/locales/en.ts`
- Modify: `src/locales/pt.ts`

- [ ] **Add `settingsTitle` and `aria.muteLabel` to `src/locales/en.ts`**

Replace the `timer` block with:

```typescript
  timer: {
    play: 'PLAY',
    pause: 'PAUSE',
    reset: 'RESET',
    workLabel: 'Work',
    breakLabel: 'Break',
    breakMessage: 'Break time! Chill a little and come back in:',
    settingsTitle: 'Settings',
    aria: {
      countdown: (m: number, s: number) =>
        `${m} minutes and ${s} seconds remaining`,
      decreaseWork: 'Decrease work time',
      increaseWork: 'Increase work time',
      decreaseBreak: 'Decrease break time',
      increaseBreak: 'Increase break time',
      muteLabel: 'Toggle sound',
    },
  },
```

- [ ] **Add translated strings to `src/locales/pt.ts`**

Replace the `timer` block with:

```typescript
  timer: {
    play: 'INICIAR',
    pause: 'PAUSAR',
    reset: 'REINICIAR',
    workLabel: 'Foco',
    breakLabel: 'Pausa',
    breakMessage: 'Hora da pausa! Relaxe um pouco e volte em:',
    settingsTitle: 'Configurações',
    aria: {
      countdown: (m: number, s: number) =>
        `${m} minutos e ${s} segundos restantes`,
      decreaseWork: 'Diminuir tempo de foco',
      increaseWork: 'Aumentar tempo de foco',
      decreaseBreak: 'Diminuir tempo de pausa',
      increaseBreak: 'Aumentar tempo de pausa',
      muteLabel: 'Alternar som',
    },
  },
```

- [ ] **Commit**

```bash
git add src/locales/en.ts src/locales/pt.ts
git commit -m "feat: add settings and mute labels to locales"
```

---

### Task 2: Add `isMuted` and `toggleMute` to `usePomodoro`

**Files:**
- Modify: `src/hooks/usePomodoro.ts`

- [ ] **Add `isMuted` state with localStorage initialization**

After the `isRunning` useState line, add:

```typescript
  const [isMuted, setIsMuted] = useState(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem('isMuted') === 'true'
  })
```

- [ ] **Add localStorage persistence effect for `isMuted`**

After the existing `breakTime` persistence effect, add:

```typescript
  useEffect(() => {
    localStorage.setItem('isMuted', String(isMuted))
  }, [isMuted])
```

- [ ] **Add `toggleMute` function**

After `resetTimer`, add:

```typescript
  const toggleMute = () => setIsMuted((prev) => !prev)
```

- [ ] **Reactivate `playSound` with mute guard**

Replace the commented line:

```typescript
          // playSound()
```

With:

```typescript
          if (!isMuted) playSound()
```

- [ ] **Export `isMuted` and `toggleMute`**

Add to the return object:

```typescript
    isMuted,
    toggleMute,
```

- [ ] **Commit**

```bash
git add src/hooks/usePomodoro.ts
git commit -m "feat: add isMuted state and toggleMute to usePomodoro"
```

---

### Task 3: Update `Timer/styles.ts`

**Files:**
- Modify: `src/components/Timer/styles.ts`

- [ ] **Update `Wrapper` to a transparent positioning container**

Replace the current `Wrapper`:

```typescript
export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
```

- [ ] **Remove `Config` styled component**

Delete the entire `Config` block:

```typescript
export const Config = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`
```

- [ ] **Add `SettingsButton`, `SettingsPanel`, `MuteRow`, `MuteSwitch`, `MuteThumb` at the end of the file**

```typescript
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
```

- [ ] **Commit**

```bash
git add src/components/Timer/styles.ts
git commit -m "feat: add SettingsButton, SettingsPanel and MuteSwitch styled components"
```

---

### Task 4: Update `Timer/index.tsx`

**Files:**
- Modify: `src/components/Timer/index.tsx`

- [ ] **Rewrite `Timer/index.tsx` with settings panel and click-outside logic**

```typescript
'use client'

import { useState, useEffect, useRef } from 'react'
import usePomodoro from 'hooks/usePomodoro'
import useLocale from 'hooks/useLocale'
import * as S from './styles'

const Timer = () => {
  const {
    Display,
    displayMessage,
    isRunning,
    workTime,
    breakTime,
    ariaCountdown,
    isMuted,
    toggleTimer,
    resetTimer,
    toggleMute,
    increaseWorkTime,
    decreaseWorkTime,
    increaseBreakTime,
    decreaseBreakTime,
  } = usePomodoro()

  const locale = useLocale()
  const [showSettings, setShowSettings] = useState(false)
  const settingsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setShowSettings(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <S.Wrapper ref={settingsRef}>
      <S.SettingsButton
        onClick={() => setShowSettings((prev) => !prev)}
        aria-label={locale.timer.settingsTitle}
      >
        ⚙
      </S.SettingsButton>
      {showSettings && (
        <S.SettingsPanel>
          <S.ConfigRow>
            <S.ConfigLabel>{locale.timer.workLabel}</S.ConfigLabel>
            <S.ConfigButton
              onClick={decreaseWorkTime}
              aria-label={locale.timer.aria.decreaseWork}
            >
              −
            </S.ConfigButton>
            <S.ConfigValue>{workTime}</S.ConfigValue>
            <S.ConfigButton
              onClick={increaseWorkTime}
              aria-label={locale.timer.aria.increaseWork}
            >
              +
            </S.ConfigButton>
          </S.ConfigRow>
          <S.ConfigRow>
            <S.ConfigLabel>{locale.timer.breakLabel}</S.ConfigLabel>
            <S.ConfigButton
              onClick={decreaseBreakTime}
              aria-label={locale.timer.aria.decreaseBreak}
            >
              −
            </S.ConfigButton>
            <S.ConfigValue>{breakTime}</S.ConfigValue>
            <S.ConfigButton
              onClick={increaseBreakTime}
              aria-label={locale.timer.aria.increaseBreak}
            >
              +
            </S.ConfigButton>
          </S.ConfigRow>
          <S.MuteRow>
            <S.MuteSwitch
              $isMuted={isMuted}
              onClick={toggleMute}
              aria-label={locale.timer.aria.muteLabel}
            >
              <S.MuteThumb $isMuted={isMuted} />
            </S.MuteSwitch>
          </S.MuteRow>
        </S.SettingsPanel>
      )}
      <S.Message aria-live="polite">
        {displayMessage && <div>{locale.timer.breakMessage}</div>}
      </S.Message>
      <S.Title aria-label={ariaCountdown}>{Display}</S.Title>
      <S.Controls>
        <S.ControlButton onClick={toggleTimer}>
          {isRunning ? locale.timer.pause : locale.timer.play}
        </S.ControlButton>
        <S.ControlButton onClick={resetTimer}>{locale.timer.reset}</S.ControlButton>
      </S.Controls>
    </S.Wrapper>
  )
}

export default Timer
```

- [ ] **Commit**

```bash
git add src/components/Timer/index.tsx
git commit -m "feat: add settings floating menu with mute toggle to Timer"
```
