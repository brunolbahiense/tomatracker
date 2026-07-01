# Timer Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Modernizar o visual do timer com tema escuro quente, card flutuante glassmorphism, tipografia bold e frases motivacionais rotativas — sem alterar a lógica do `usePomodoro`.

**Architecture:** Os tokens de cor ficam no tema central e são propagados via styled-components para todos os componentes. O fundo escuro entra no `Wrapper` (novo valor `'dark'`). O `Frame` (em `styles/styles.ts`) torna-se o card glassmorphism. O `Timer` ganha novos styled components internos e lógica de rotação de frases via `phraseIndex` state.

**Tech Stack:** Next.js 15 App Router, React 18, TypeScript 5, styled-components 6

---

## File Map

| File | Change |
|---|---|
| `src/styles/theme.ts` | Add `darkBg`, `darkBgTop` tokens |
| `src/styles/styled.d.ts` | Add `darkBg`, `darkBgTop` to `DefaultTheme` |
| `src/locales/en.ts` | Add `motivationalPhrases` to `timer` block |
| `src/locales/pt.ts` | Add `motivationalPhrases` to `timer` block |
| `src/components/Wrapper/index.tsx` | Add `'dark'` to `background` prop type |
| `src/components/Wrapper/styles.ts` | Add dark background gradient case |
| `src/styles/styles.ts` | Replace `Frame` with floating card |
| `src/app/tomatracker/page.tsx` | Pass `background="dark"` to `<Wrapper>` |
| `src/components/Timer/styles.ts` | Rewrite: remove `Message`/`Illustration`, update `Title`/`ControlButton`, add `PhaseLabel`/`Divider`/`TimeInfo`/`MotivationalText` |
| `src/components/Timer/index.tsx` | Rewrite: add `phraseIndex` state + rotation effect, new JSX structure |

---

### Task 1: Add dark theme tokens

**Files:**
- Modify: `src/styles/theme.ts`
- Modify: `src/styles/styled.d.ts`

- [ ] **Update `src/styles/theme.ts`**

Replace the entire file with:

```typescript
const theme = {
  white: '#eee',
  grayDark: '#311B1B',
  grayL: '#d9d9d9',
  gray: '#6f6f6e',
  black: '#000000',
  red: '#D63731',
  lightRed: '#EC443E',
  blue: '#3B82F6',
  darkBg: '#0e0404',
  darkBgTop: '#2a0a0a',
}

export default theme
```

- [ ] **Update `src/styles/styled.d.ts`**

Replace the entire file with:

```typescript
import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    white: string
    grayDark: string
    grayL: string
    gray: string
    black: string
    red: string
    lightRed: string
    blue: string
    darkBg: string
    darkBgTop: string
  }
}
```

- [ ] **Verify TypeScript**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Commit**

```bash
git add src/styles/theme.ts src/styles/styled.d.ts
git commit -m "feat: add darkBg and darkBgTop theme tokens"
```

---

### Task 2: Add motivationalPhrases to locales

**Files:**
- Modify: `src/locales/en.ts`
- Modify: `src/locales/pt.ts`

- [ ] **Add `motivationalPhrases` to `src/locales/en.ts`**

Inside the `timer` block, after `aria: { ... }`, add:

```typescript
    motivationalPhrases: [
      'One pomodoro at a time.',
      'Deep work starts here.',
      'Focus is a superpower.',
      'Make this 25 minutes count.',
      'Small steps, big results.',
      'Stay in the zone.',
      'Progress over perfection.',
      'Your best work happens now.',
    ],
```

The full `timer` block in `en.ts` after the change:

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
    motivationalPhrases: [
      'One pomodoro at a time.',
      'Deep work starts here.',
      'Focus is a superpower.',
      'Make this 25 minutes count.',
      'Small steps, big results.',
      'Stay in the zone.',
      'Progress over perfection.',
      'Your best work happens now.',
    ],
  },
```

- [ ] **Add `motivationalPhrases` to `src/locales/pt.ts`**

Inside the `timer` block, after `aria: { ... }`, add:

```typescript
    motivationalPhrases: [
      'Um pomodoro de cada vez.',
      'O foco começa aqui.',
      'Foco é um superpoder.',
      'Faça esses 25 minutos valerem.',
      'Pequenos passos, grandes resultados.',
      'Permaneça na zona.',
      'Progresso supera perfeição.',
      'Seu melhor trabalho acontece agora.',
    ],
```

- [ ] **Verify TypeScript**

Run: `npx tsc --noEmit`
Expected: no errors (the `Translations` type in `en.ts` will enforce `pt.ts` has the same shape)

- [ ] **Commit**

```bash
git add src/locales/en.ts src/locales/pt.ts
git commit -m "feat: add motivationalPhrases to locales"
```

---

### Task 3: Add dark background to Wrapper

**Files:**
- Modify: `src/components/Wrapper/index.tsx`
- Modify: `src/components/Wrapper/styles.ts`

- [ ] **Update `src/components/Wrapper/index.tsx`**

Replace entirely with:

```typescript
'use client'

import * as S from './styles'

export interface WrapperProps {
  background?: 'blue' | 'red' | 'dark'
  children?: React.ReactNode
}

const Wrapper = ({ background = 'red', ...props }: WrapperProps) => {
  return <S.Wrapper {...props} background={background} />
}

export default Wrapper
```

- [ ] **Update `src/components/Wrapper/styles.ts`**

Replace entirely with:

```typescript
import styled from 'styled-components'
import { WrapperProps } from '.'

export const Wrapper = styled.main<WrapperProps>`
  color: ${(props) => props.theme.white};
  max-width: 100vw;
  height: 95vh;
  padding: 3rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 768px) {
    height: 100vh;
    border: none;
    box-shadow: none;
    overflow: hidden;
    margin: unset;
    width: 100%;
    height: 105%;
  }

  ${(props) =>
    props.background === 'red' &&
    `background: ${props.theme.red};
  `};

  ${(props) =>
    props.background === 'blue' &&
    `background: ${props.theme.blue};
  `};

  ${(props) =>
    props.background === 'dark' &&
    `background: radial-gradient(ellipse at 50% 0%, ${props.theme.darkBgTop} 0%, ${props.theme.darkBg} 100%);
  `};
`
```

- [ ] **Verify TypeScript**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Commit**

```bash
git add src/components/Wrapper/index.tsx src/components/Wrapper/styles.ts
git commit -m "feat: add dark background option to Wrapper"
```

---

### Task 4: Update Frame and apply dark background to timer page

**Files:**
- Modify: `src/styles/styles.ts`
- Modify: `src/app/tomatracker/page.tsx`

- [ ] **Update `Frame` in `src/styles/styles.ts`**

Replace the `Frame` export with:

```typescript
export const Frame = styled.main`
  position: relative;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 20px;
  padding: 3rem 3.5rem;
  width: 42rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(255, 255, 255, 0.04),
    0 0 80px rgba(214, 55, 49, 0.07);
  backdrop-filter: blur(8px);
  margin-top: 3rem;

  @media only screen and (max-width: 768px) {
    width: 90%;
    padding: 2.5rem 2rem;
  }
`
```

- [ ] **Pass `background="dark"` in `src/app/tomatracker/page.tsx`**

Change:

```tsx
      <Wrapper>
```

To:

```tsx
      <Wrapper background="dark">
```

- [ ] **Verify TypeScript**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Commit**

```bash
git add src/styles/styles.ts src/app/tomatracker/page.tsx
git commit -m "feat: update Frame to floating card and apply dark background to timer page"
```

---

### Task 5: Rewrite Timer/styles.ts

**Files:**
- Modify: `src/components/Timer/styles.ts`

- [ ] **Replace `src/components/Timer/styles.ts` entirely**

```typescript
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

export const Title = styled.h1`
  font-size: 10rem;
  font-weight: 700;
  letter-spacing: -0.4rem;
  line-height: 1;
`

export const Divider = styled.div`
  width: 3rem;
  height: 2px;
  background: linear-gradient(90deg, transparent, ${(props) => props.theme.red}, transparent);
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
```

- [ ] **Verify TypeScript**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Commit**

```bash
git add src/components/Timer/styles.ts
git commit -m "feat: rewrite Timer styles with PhaseLabel, Divider, TimeInfo, MotivationalText"
```

---

### Task 6: Rewrite Timer/index.tsx

**Files:**
- Modify: `src/components/Timer/index.tsx`

- [ ] **Replace `src/components/Timer/index.tsx` entirely**

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
  const [phraseIndex, setPhraseIndex] = useState(0)
  const settingsRef = useRef<HTMLDivElement>(null)
  const wasRunningRef = useRef(false)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setShowSettings(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (isRunning && !wasRunningRef.current) {
      setPhraseIndex((prev) => (prev + 1) % locale.timer.motivationalPhrases.length)
    }
    wasRunningRef.current = isRunning
  }, [isRunning, locale.timer.motivationalPhrases.length])

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
      <S.PhaseLabel aria-live="polite">
        {displayMessage ? locale.timer.breakLabel : locale.timer.workLabel}
      </S.PhaseLabel>
      <S.Title aria-label={ariaCountdown}>{Display}</S.Title>
      <S.Divider />
      <S.Controls>
        <S.ControlButton $primary onClick={toggleTimer}>
          {isRunning ? locale.timer.pause : locale.timer.play}
        </S.ControlButton>
        <S.ControlButton onClick={resetTimer}>{locale.timer.reset}</S.ControlButton>
      </S.Controls>
      <S.TimeInfo>
        {locale.timer.workLabel}: <span>{workTime} min</span>
        {' · '}
        {locale.timer.breakLabel}: <span>{breakTime} min</span>
      </S.TimeInfo>
      <S.MotivationalText>
        {locale.timer.motivationalPhrases[phraseIndex]}
      </S.MotivationalText>
    </S.Wrapper>
  )
}

export default Timer
```

- [ ] **Verify TypeScript**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Commit**

```bash
git add src/components/Timer/index.tsx
git commit -m "feat: add PhaseLabel, Divider, TimeInfo and rotating motivational phrase to Timer"
```
