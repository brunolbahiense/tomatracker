# Design Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply three visual improvements to Tomatracker: move the settings gear outside the timer card with system red colors, increase small text sizes by ~20–30%, and add six lightweight animations.

**Architecture:** Pure styled-components changes across five files — no new components, no logic changes, no locale changes. Animations use the `keyframes` helper from styled-components. The pillar scroll animation adds a `useEffect`/`IntersectionObserver` to `PomodoroInfo/index.tsx` with transient props (`$visible`, `$index`) passed to `S.Pillar`.

**Tech Stack:** styled-components 6, React 18 hooks (`useRef`, `useState`, `useEffect`), TypeScript 5 strict mode.

---

## File Map

| File | Change |
|---|---|
| `src/components/Timer/styles.ts` | Remove `position: relative` from `Wrapper`; restyle `SettingsButton` (red, floating above card); increase `PhaseLabel`, `TimeInfo`, `MotivationalText`; add `dividerPulse` keyframe to `Divider`; add glow hover to `ControlButton` primary variant |
| `src/styles/styles.ts` | Add `fadeUp` + `float` keyframes; apply animations to `SiteTitle` and `Frame` |
| `src/components/PomodoroInfo/index.tsx` | Add `sectionRef` (`useRef`), `visible` state, `IntersectionObserver` `useEffect`; pass `$visible` and `$index` to `S.Pillar`; move `ref` to `S.Pillars` |
| `src/components/PomodoroInfo/styles.ts` | Add `PillarProps` interface + transient props to `Pillar`; increase `HeadingSubtitle`, `PillarTitle`, `PillarDescription` |
| `src/components/Footer/styles.ts` | Increase `Name` and `Link` font sizes |

---

### Task 1: Gear outside the card + red system colors

**Files:**
- Modify: `src/components/Timer/styles.ts`

> **Note:** No unit test target for styled-components. Verify visually: open the app, confirm gear appears above the top-right corner of the Frame card, not inside it. Confirm clicking gear opens the SettingsPanel still anchored inside the card. Confirm gear rotates 90° on hover.

- [ ] **Step 1: Remove `position: relative` from `Wrapper` and restyle `SettingsButton`**

In `src/components/Timer/styles.ts`, apply these two changes:

**`Wrapper`** — remove the `position: relative` line (line 4). Result:
```typescript
export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
```

**`SettingsButton`** — replace the entire block (lines 140–159) with:
```typescript
export const SettingsButton = styled.button`
  position: absolute;
  top: -1.4rem;
  right: 1rem;
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 50%;
  background: rgba(214, 55, 49, 0.1);
  border: 1px solid rgba(214, 55, 49, 0.3);
  color: ${(props) => props.theme.red};
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 12px rgba(214, 55, 49, 0.12);
  transition: transform 0.4s ease, background 0.2s;

  &:hover {
    transform: rotate(90deg) scale(1.1);
    background: rgba(214, 55, 49, 0.18);
  }
`
```

**`SettingsPanel`** — update `top` from `0.5rem` to `4rem` so it anchors inside the card below the button:
```typescript
export const SettingsPanel = styled.div`
  position: absolute;
  top: 4rem;
  right: 3.5rem;
  ...
```

- [ ] **Step 2: Start dev server and verify visually**

Run: `yarn dev` (or `npm run dev`)

Check:
- Settings gear sits above the top-right corner of the glassmorphism card, not inside it
- Clicking gear opens the settings panel inside the card at the correct position
- Gear rotates on hover with smooth 0.4s transition

- [ ] **Step 3: Commit**

```bash
git add src/components/Timer/styles.ts
git commit -m "style: move settings gear above card with red system colors"
```

---

### Task 2: Increase small text sizes

**Files:**
- Modify: `src/components/Timer/styles.ts`
- Modify: `src/components/PomodoroInfo/styles.ts`
- Modify: `src/components/Footer/styles.ts`

> **Note:** No unit test target. Verify visually that text is readable and proportional.

- [ ] **Step 1: Update Timer text sizes**

In `src/components/Timer/styles.ts`:

**`PhaseLabel`** — change `font-size` from `1.2rem` to `1.5rem` (line 14):
```typescript
export const PhaseLabel = styled.div`
  font-size: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  color: ${(props) => props.theme.red};
  font-weight: 600;
  margin-bottom: 0.8rem;
`
```

**`TimeInfo`** — change `font-size` from `1.2rem` to `1.5rem` (line 81):
```typescript
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
```

**`MotivationalText`** — change `font-size` from `1.3rem` to `1.6rem` (line 92):
```typescript
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
```

- [ ] **Step 2: Update PomodoroInfo text sizes**

In `src/components/PomodoroInfo/styles.ts`:

**`HeadingSubtitle`** — change `font-size` from `0.9rem` to `1.1rem`:
```typescript
export const HeadingSubtitle = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.35);
`
```

**`PillarTitle`** — change `font-size` from `1rem` to `1.15rem`:
```typescript
export const PillarTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 700;
  color: ${(props) => props.theme.white};
  letter-spacing: -0.3px;
`
```

**`PillarDescription`** — change `font-size` from `0.85rem` to `1rem`:
```typescript
export const PillarDescription = styled.p`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.4);
  line-height: 1.6;
`
```

- [ ] **Step 3: Update Footer text sizes**

In `src/components/Footer/styles.ts`:

**`Name`** — change `font-size` from `0.8rem` to `1rem`:
```typescript
export const Name = styled.span`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.35);

  strong {
    color: rgba(255, 255, 255, 0.6);
    font-weight: 600;
  }
`
```

**`Link`** — change `font-size` from `0.72rem` to `0.85rem`:
```typescript
export const Link = styled.a`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.3);
  letter-spacing: 0.5px;
  text-transform: uppercase;
  text-decoration: none;
  padding: 0.3rem 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  transition: all 0.2s;

  &:hover {
    color: rgba(255, 255, 255, 0.6);
    border-color: rgba(255, 255, 255, 0.2);
  }
`
```

- [ ] **Step 4: Commit**

```bash
git add src/components/Timer/styles.ts src/components/PomodoroInfo/styles.ts src/components/Footer/styles.ts
git commit -m "style: increase small text sizes ~20-30% across timer, info, footer"
```

---

### Task 3: Six lightweight animations

**Files:**
- Modify: `src/styles/styles.ts`
- Modify: `src/components/Timer/styles.ts`
- Modify: `src/components/PomodoroInfo/index.tsx`
- Modify: `src/components/PomodoroInfo/styles.ts`

Animations to implement:
1. **3a** — `fadeUp` entry on `SiteTitle` (0s delay)
2. **3b** — `fadeUp` + `float` on `Frame` (0.15s delay for fadeUp, then infinite float)
3. **3c** — gear rotate on hover (already done in Task 1 via `SettingsButton` hover)
4. **3d** — `dividerPulse` on `Divider` (infinite)
5. **3e** — pillar cascade on scroll via `IntersectionObserver`
6. **3f** — glow hover on primary `ControlButton`

> **Note:** Animation 3c is complete after Task 1. This task covers 3a, 3b, 3d, 3e, 3f.

- [ ] **Step 1: Add `fadeUp` and `float` to `src/styles/styles.ts`**

Add `keyframes` import and two keyframe definitions, then apply them to `SiteTitle` and `Frame`:

```typescript
import styled, { keyframes } from 'styled-components'

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-6px); }
`

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
  animation: ${fadeUp} 0.6s ease-out 0.15s both, ${float} 4s ease-in-out 0.75s infinite;

  @media only screen and (max-width: 768px) {
    width: 90%;
    padding: 2.5rem 2rem;
  }
`

export const SiteTitle = styled.h1`
  font-size: 2.2rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: -1px;
  margin-bottom: 1.5rem;
  animation: ${fadeUp} 0.6s ease-out both;

  span {
    color: ${(props) => props.theme.red};
  }

  @media only screen and (max-width: 768px) {
    font-size: 1.8rem;
  }
`
```

- [ ] **Step 2: Add `dividerPulse` and primary button glow to `src/components/Timer/styles.ts`**

Add `keyframes` import at top of file, then update `Divider` and `ControlButton`:

**At the top of the file**, add the import (replace existing `import styled from 'styled-components'`):
```typescript
import styled, { keyframes } from 'styled-components'
```

**Add keyframe** before the first `export const`:
```typescript
const dividerPulse = keyframes`
  0%, 100% { width: 3rem; opacity: 0.7; }
  50%       { width: 5rem; opacity: 1; }
`
```

**`Divider`** — replace entire block:
```typescript
export const Divider = styled.div`
  height: 2px;
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
```

**`ControlButton`** — add primary hover glow inside the `$primary` branch. Replace the `$primary` conditional block:
```typescript
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
  `}

  &:hover {
    transform: scale(1.05);
  }
```

> **Note:** The outer `&:hover` handles the non-primary button. The inner `&:hover` inside the `$primary` string literal overrides it for primary. This works because the `$primary` CSS is appended later in the cascade.

- [ ] **Step 3: Add IntersectionObserver to `src/components/PomodoroInfo/index.tsx`**

Replace the entire file:
```tsx
'use client'

import { useRef, useState, useEffect } from 'react'
import useLocale from 'hooks/useLocale'
import * as S from './styles'

export default function PomodoroInfo() {
  const locale = useLocale()
  const pillarsRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = pillarsRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <S.Section>
      <S.Heading>
        <S.HeadingTitle>{locale.pomodoroInfo.title}</S.HeadingTitle>
        <S.HeadingSubtitle>{locale.pomodoroInfo.subtitle}</S.HeadingSubtitle>
      </S.Heading>
      <S.Pillars ref={pillarsRef}>
        {locale.pomodoroInfo.pillars.map((pillar, index) => (
          <S.Pillar key={pillar.title} $visible={visible} $index={index}>
            <S.PillarIcon>{pillar.icon}</S.PillarIcon>
            <S.PillarHighlight>{pillar.label}</S.PillarHighlight>
            <S.PillarTitle>{pillar.title}</S.PillarTitle>
            <S.PillarDescription>{pillar.description}</S.PillarDescription>
          </S.Pillar>
        ))}
      </S.Pillars>
    </S.Section>
  )
}
```

- [ ] **Step 4: Add transient props to `Pillar` in `src/components/PomodoroInfo/styles.ts`**

Add `PillarProps` interface and update `Pillar` to accept `$visible` and `$index` (keep all existing styles, just add the animation-related additions):

```typescript
interface PillarProps {
  $visible?: boolean
  $index?: number
}

export const Pillar = styled.div<PillarProps>`
  flex: 1;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 16px;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  text-align: center;
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  transform: ${(props) => (props.$visible ? 'translateY(0)' : 'translateY(20px)')};
  transition: opacity 0.5s ease, transform 0.5s ease;
  transition-delay: ${(props) => (props.$index ?? 0) * 0.12}s;

  @media only screen and (max-width: 768px) {
    width: 90%;
  }
`
```

- [ ] **Step 5: Verify animations visually in the browser**

With dev server running:
- Reload page — `SiteTitle` should fade up, `Frame` should fade up with 0.15s delay then gently float
- `Divider` inside the timer card should pulse width from 3rem to 5rem
- Hover the play button — red glow should intensify
- Scroll down to PomodoroInfo — pillars should cascade in left-to-right with ~120ms stagger

- [ ] **Step 6: Commit**

```bash
git add src/styles/styles.ts src/components/Timer/styles.ts src/components/PomodoroInfo/index.tsx src/components/PomodoroInfo/styles.ts
git commit -m "style: add six lightweight animations (fadeUp, float, gear, divider, pillars, glow)"
```
