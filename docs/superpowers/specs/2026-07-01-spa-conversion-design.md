# SPA Conversion — Design Spec

## Overview

Transformar o site de two-page (landing → timer) em um Single-Page App. A landing page é removida. O timer vira a raiz (`/`), com o título da marca acima do card, seguido de uma seção compacta do Pomodoro Info e um footer moderno com assinatura + links.

## Design Decisions

| Elemento | Decisão |
|---|---|
| Estrutura de rotas | `/` é o SPA root; `/tomatracker` redireciona para `/` |
| Título da marca | `🍅 Tomatracker` inline acima do card (ícone + texto, mesma linha) |
| Pomodoro Info | 3 pilares compactos (25 min, 5 min, × 4) substituindo 6 passos verbosos |
| Footer | Assinatura simples: "Feito por Bruno" + links GitHub e LinkedIn |
| Scroll hint | Seta ↓ abaixo do card indicando conteúdo abaixo |

---

## Estrutura de Arquivos

### Modificados

| Arquivo | Mudança |
|---|---|
| `src/app/page.tsx` | Substituir landing page pelo SPA root |
| `src/app/tomatracker/page.tsx` | `redirect('/')` — redirect para a raiz |
| `src/styles/styles.ts` | Adicionar `SiteTitle`, `ScrollHint`; remover `Title`, `Description`, `Message`, `Button`, `Illustration`, `Container`, `TitleDiv` |
| `src/components/PomodoroInfo/index.tsx` | Reescrever para layout de 3 pilares |
| `src/components/PomodoroInfo/styles.ts` | Reescrever estilos completamente |
| `src/components/Footer/index.tsx` | Reescrever para footer simples |
| `src/components/Footer/styles.ts` | Reescrever estilos completamente |
| `src/locales/en.ts` | Atualizar `pomodoroInfo`, adicionar `footer` |
| `src/locales/pt.ts` | Idem |

---

## `src/app/page.tsx` — SPA Root

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

## `src/app/tomatracker/page.tsx` — Redirect

```tsx
import { redirect } from 'next/navigation'

export default function TomatrackerPage() {
  redirect('/')
}
```

---

## `src/styles/styles.ts`

**Manter:** `Frame`

**Adicionar:**

```typescript
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
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(5px); }
  }
`
```

**Remover:** `Title`, `Description`, `Message`, `Button`, `Illustration`, `Container`, `TitleDiv`

---

## `src/locales/en.ts` e `pt.ts`

### `pomodoroInfo` — substituir `subtitle` e `steps` por `subtitle` (novo) e `pillars`:

**EN:**
```typescript
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
```

**PT:**
```typescript
pomodoroInfo: {
  title: 'A Técnica Pomodoro',
  subtitle: 'Simples, comprovada, eficaz.',
  pillars: [
    {
      icon: '🍅',
      label: '25 min',
      title: 'Foco total',
      description: 'Trabalhe em uma única tarefa sem interrupções durante um Pomodoro.',
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
```

### `footer` — adicionar namespace:

**EN:**
```typescript
footer: {
  madeBy: 'Made by',
  name: 'Bruno',
},
```

**PT:**
```typescript
footer: {
  madeBy: 'Feito por',
  name: 'Bruno',
},
```

> **Nota sobre tipagem:** `Translations` em `en.ts` é a fonte de verdade. Toda chave adicionada lá deve ser espelhada em `pt.ts` com o mesmo shape. O campo `steps` do `pomodoroInfo` é removido e substituído por `pillars`.

---

## `src/components/PomodoroInfo`

### `index.tsx`

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

### `styles.ts`

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

---

## `src/components/Footer`

### `index.tsx`

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

### `styles.ts`

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

---

## Comportamento

- **Rota `/`**: renderiza SPA completo (Wrapper dark → SiteTitle → Frame/Timer → ScrollHint) + PomodoroInfo + Footer
- **Rota `/tomatracker`**: `redirect('/')` — redireciona imediatamente, sem renderizar nada
- **Scroll**: natural — o usuário rola para ver PomodoroInfo e Footer abaixo do timer
- **Mobile**: Wrapper já é responsivo; Pillars muda para `flex-direction: column` em < 768px

---

## O que NÃO muda

- Toda a lógica do `usePomodoro` (timer, mute, notificações, localStorage)
- O `<Timer>` component e seus styled components (`styles.ts`)
- O `<Wrapper>` component e seus styles
- O sistema de locales existente (apenas editando `pomodoroInfo` e adicionando `footer`)
- O menu de configurações flutuante
