# SPA Conversion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the two-page site (landing + timer) into a single-page app rooted at `/`, removing the landing page, compacting PomodoroInfo to 3 pillars, and modernizing the Footer to a simple signature with GitHub + LinkedIn links.

**Architecture:** `/` becomes the SPA root rendering `Wrapper(dark) → SiteTitle → Timer card → ScrollHint` + `PomodoroInfo` + `Footer`. The old `/tomatracker` route becomes a server-side redirect to `/`. The locale system is updated atomically with PomodoroInfo to avoid mid-commit TypeScript failures.

**Tech Stack:** Next.js 15 App Router, React 18, TypeScript 5 strict, styled-components 6, custom `useLocale` hook, `src/` as TypeScript base URL.

---

## File Map

| File | Action | Reason |
|---|---|---|
| `src/locales/en.ts` | Modify | Replace `pomodoroInfo.steps` with `pillars`, add `footer` namespace |
| `src/locales/pt.ts` | Modify | Mirror `en.ts` changes (typed as `Translations`) |
| `src/components/PomodoroInfo/index.tsx` | Rewrite | Consume new `pillars` shape |
| `src/components/PomodoroInfo/styles.ts` | Rewrite | New 3-pillar grid styles |
| `src/components/Footer/index.tsx` | Rewrite | Simple signature + links |
| `src/components/Footer/styles.ts` | Rewrite | Dark minimal styles |
| `src/styles/styles.ts` | Modify | Remove landing-page exports, add `SiteTitle` + `ScrollHint` |
| `src/app/page.tsx` | Rewrite | SPA root (title + timer + scroll hint) |
| `src/app/tomatracker/page.tsx` | Rewrite | `redirect('/')` |
| `public/img/logo.svg` | Delete | Replaced by 🍅 emoji |

---

## Task 1: Update locales and rewrite PomodoroInfo

> These four files are committed together. `en.ts` changes the `Translations` type; `pt.ts` must match immediately; `PomodoroInfo/index.tsx` must consume `pillars` in the same commit — otherwise TypeScript fails between commits.

**Files:**
- Modify: `src/locales/en.ts`
- Modify: `src/locales/pt.ts`
- Modify: `src/components/PomodoroInfo/index.tsx`
- Modify: `src/components/PomodoroInfo/styles.ts`

- [ ] **Step 1: Replace `pomodoroInfo` block in `src/locales/en.ts`**

Replace the entire `pomodoroInfo` key (lines 43–78) and add `footer` above the closing brace:

```typescript
const en = {
  landing: {
    tagline: 'Improve your productivity and get things done!',
    cta: "I'm Ready",
  },
  timerPage: {
    description: 'Using The Pomodoro Technique to improve your productivity',
  },
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
  notifications: {
    backToWork: 'Back to work!',
    backToWorkBody: (m: number) => `Focus for ${m} minutes.`,
    breakTime: 'Break time!',
    breakTimeBody: (m: number) => `Relax for ${m} minutes.`,
  },
  pomodoroInfo: {
    title: 'The Pomodoro Technique',
    subtitle: 'Simple, proven, effective.',
    pillars: [
      {
        icon: '🍅',
        label: '25 min',
        title: 'Full Focus',
        description: 'Work on one task without interruption for one Pomodoro.',
      },
      {
        icon: '☕',
        label: '5 min',
        title: 'Short Break',
        description: 'Stand up, breathe, rest your mind before the next cycle.',
      },
      {
        icon: '🔁',
        label: '× 4',
        title: 'Repeat',
        description: 'After 4 Pomodoros, take a longer 15–30 min break.',
      },
    ],
  },
  footer: {
    madeBy: 'Made by',
    name: 'Bruno',
  },
}

export type Translations = typeof en
export default en
```

- [ ] **Step 2: Replace `pomodoroInfo` block in `src/locales/pt.ts`**

Full file content:

```typescript
import type { Translations } from './en'

const pt: Translations = {
  landing: {
    tagline: 'Melhore sua produtividade e faça as coisas acontecerem!',
    cta: 'Estou Pronto',
  },
  timerPage: {
    description: 'Usando a Técnica Pomodoro para melhorar sua produtividade',
  },
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
  },
  notifications: {
    backToWork: 'De volta ao foco!',
    backToWorkBody: (m: number) => `Concentre-se por ${m} minutos.`,
    breakTime: 'Hora da pausa!',
    breakTimeBody: (m: number) => `Descanse por ${m} minutos.`,
  },
  pomodoroInfo: {
    title: 'A Técnica Pomodoro',
    subtitle: 'Simples, comprovada, eficaz.',
    pillars: [
      {
        icon: '🍅',
        label: '25 min',
        title: 'Foco total',
        description:
          'Trabalhe em uma única tarefa sem interrupções durante um Pomodoro.',
      },
      {
        icon: '☕',
        label: '5 min',
        title: 'Pausa curta',
        description: 'Levante, respire, descanse a mente antes do próximo ciclo.',
      },
      {
        icon: '🔁',
        label: '× 4',
        title: 'Repita',
        description: 'A cada 4 Pomodoros, faça uma pausa longa de 15–30 minutos.',
      },
    ],
  },
  footer: {
    madeBy: 'Feito por',
    name: 'Bruno',
  },
}

export default pt
```

- [ ] **Step 3: Rewrite `src/components/PomodoroInfo/index.tsx`**

```tsx
'use client'

import useLocale from 'hooks/useLocale'
import * as S from './styles'

export default function PomodoroInfo() {
  const locale = useLocale()

  return (
    <S.Section>
      <S.Heading>
        <S.HeadingTitle>{locale.pomodoroInfo.title}</S.HeadingTitle>
        <S.HeadingSubtitle>{locale.pomodoroInfo.subtitle}</S.HeadingSubtitle>
      </S.Heading>
      <S.Pillars>
        {locale.pomodoroInfo.pillars.map((pillar) => (
          <S.Pillar key={pillar.title}>
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

- [ ] **Step 4: Rewrite `src/components/PomodoroInfo/styles.ts`**

```typescript
import styled from 'styled-components'

export const Section = styled.section`
  background: #1a0808;
  padding: 5rem 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`

export const Heading = styled.div`
  text-align: center;
`

export const HeadingTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.5px;
  margin-bottom: 0.5rem;
`

export const HeadingSubtitle = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.35);
`

export const Pillars = styled.div`
  display: flex;
  gap: 1.5rem;
  max-width: 700px;
  width: 100%;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`

export const Pillar = styled.div`
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

  @media only screen and (max-width: 768px) {
    width: 90%;
  }
`

export const PillarIcon = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: rgba(214, 55, 49, 0.12);
  border: 1px solid rgba(214, 55, 49, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`

export const PillarHighlight = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${(props) => props.theme.red};
  letter-spacing: -1px;
  line-height: 1;
`

export const PillarTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.3px;
`

export const PillarDescription = styled.p`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.4);
  line-height: 1.6;
`
```

- [ ] **Step 5: Verify TypeScript is clean**

```bash
yarn tsc --noEmit
```

Expected: no errors. If TypeScript reports `Property 'steps' does not exist`, the old `PomodoroInfo/index.tsx` was not fully replaced — re-check Step 3.

- [ ] **Step 6: Commit**

```bash
git add src/locales/en.ts src/locales/pt.ts src/components/PomodoroInfo/index.tsx src/components/PomodoroInfo/styles.ts
git commit -m "feat: compact PomodoroInfo to 3 pillars, add footer locale"
```

---

## Task 2: Rewrite Footer

**Files:**
- Modify: `src/components/Footer/index.tsx`
- Modify: `src/components/Footer/styles.ts`

- [ ] **Step 1: Rewrite `src/components/Footer/index.tsx`**

```tsx
'use client'

import useLocale from 'hooks/useLocale'
import * as S from './styles'

export default function Footer() {
  const locale = useLocale()

  return (
    <S.Footer>
      <S.Name>
        {locale.footer.madeBy} <strong>{locale.footer.name}</strong>
      </S.Name>
      <S.Sep />
      <S.Links>
        <S.Link
          href="https://github.com/brunolbahiense"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </S.Link>
        <S.Link
          href="https://www.linkedin.com/in/brunolbahiense/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </S.Link>
      </S.Links>
    </S.Footer>
  )
}
```

- [ ] **Step 2: Rewrite `src/components/Footer/styles.ts`**

```typescript
import styled from 'styled-components'

export const Footer = styled.footer`
  background: #0a0303;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding: 2rem 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
`

export const Name = styled.span`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.35);

  strong {
    color: rgba(255, 255, 255, 0.6);
    font-weight: 600;
  }
`

export const Sep = styled.div`
  width: 1px;
  height: 1rem;
  background: rgba(255, 255, 255, 0.1);
`

export const Links = styled.div`
  display: flex;
  gap: 0.8rem;
`

export const Link = styled.a`
  font-size: 0.72rem;
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

- [ ] **Step 3: Verify TypeScript is clean**

```bash
yarn tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer/index.tsx src/components/Footer/styles.ts
git commit -m "feat: modernize footer — signature + GitHub + LinkedIn"
```

---

## Task 3: SPA root — styles, pages, redirect

> These three files are committed together. `styles/styles.ts` removes `Title`, `Description`, `Message`, `Button`, `Illustration`, `Container`, `TitleDiv` (all used only by the old landing and tomatracker pages). Both pages are updated in the same commit so TypeScript never sees stale imports.

**Files:**
- Modify: `src/styles/styles.ts`
- Modify: `src/app/page.tsx`
- Modify: `src/app/tomatracker/page.tsx`

- [ ] **Step 1: Rewrite `src/styles/styles.ts`**

Replace the entire file:

```typescript
import styled from 'styled-components'

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

export const SiteTitle = styled.h1`
  font-size: 2.2rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: -1px;
  margin-bottom: 1.5rem;

  span {
    color: ${(props) => props.theme.red};
  }

  @media only screen and (max-width: 768px) {
    font-size: 1.8rem;
  }
`

export const ScrollHint = styled.div`
  margin-top: 2rem;
  font-size: 1.4rem;
  color: rgba(255, 255, 255, 0.2);
  animation: bounce 2s ease-in-out infinite;

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(5px);
    }
  }
`
```

- [ ] **Step 2: Rewrite `src/app/page.tsx`**

```tsx
'use client'

import * as S from 'styles/styles'
import PomodoroInfo from 'components/PomodoroInfo'
import Wrapper from 'components/Wrapper'
import Footer from 'components/Footer'
import Timer from 'components/Timer'

export default function Home() {
  return (
    <>
      <Wrapper background="dark">
        <S.SiteTitle>
          🍅 Tomat<span>racker</span>
        </S.SiteTitle>
        <S.Frame>
          <Timer />
        </S.Frame>
        <S.ScrollHint aria-hidden="true">↓</S.ScrollHint>
      </Wrapper>
      <PomodoroInfo />
      <Footer />
    </>
  )
}
```

- [ ] **Step 3: Rewrite `src/app/tomatracker/page.tsx`**

```tsx
import { redirect } from 'next/navigation'

export default function TomatrackerPage() {
  redirect('/')
}
```

Note: no `'use client'` directive — this is a server component. `redirect()` from `next/navigation` works in server components and throws a `NEXT_REDIRECT` internally (Next.js handles it as a 307 temporary redirect).

- [ ] **Step 4: Verify TypeScript is clean**

```bash
yarn tsc --noEmit
```

Expected: no errors. If TypeScript reports `Cannot find name 'S.Title'` or similar, it means the old page.tsx was not fully replaced — re-check Steps 2 and 3.

- [ ] **Step 5: Commit**

```bash
git add src/styles/styles.ts src/app/page.tsx src/app/tomatracker/page.tsx
git commit -m "feat: convert to SPA — timer at root, tomatracker redirects to /"
```

---

## Task 4: Cleanup

**Files:**
- Delete: `public/img/logo.svg`

- [ ] **Step 1: Delete `public/img/logo.svg`**

```bash
rm public/img/logo.svg
```

- [ ] **Step 2: Verify build passes**

```bash
yarn build
```

Expected output ends with:
```
✓ Compiled successfully
Route (app)         Size     First Load JS
┌ ○ /               ...
└ ○ /tomatracker    ...
```

No `logo.svg` references should appear in build output. If `yarn build` fails with a missing file error, grep for any remaining references to `logo.svg`:

```bash
grep -r "logo.svg" src/
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove obsolete logo.svg"
```
