# Design Polish — Spec

## Overview

Três melhorias visuais: engrenagem fora do card com cores do sistema, textos maiores e animações leves pontuais.

## Decisões

| Elemento | Decisão |
|---|---|
| Engrenagem | Flutua acima do card glassmorphism, cor vermelha do tema |
| Textos | +20–30% nos textos menores do timer, info e footer |
| Animações | 6 animações leves: entrada, flutuação, engrenagem, divisor, scroll e glow |

---

## 1. Engrenagem fora do card

### Abordagem

`S.Wrapper` em `Timer/styles.ts` tem `position: relative` — os filhos `position: absolute` (SettingsButton e SettingsPanel) são posicionados em relação a ele. Para que o botão flutue acima do card (`S.Frame`), remover `position: relative` de `S.Wrapper`, fazendo os absolutos referenciarem `S.Frame` diretamente.

### `src/components/Timer/styles.ts`

**`Wrapper`:** remover `position: relative`.

**`SettingsButton`:** nova aparência e posição:
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
  transition: transform 0.3s ease, background 0.2s;

  &:hover {
    transform: rotate(90deg) scale(1.1);
    background: rgba(214, 55, 49, 0.18);
  }
`
```

**`SettingsPanel`:** ajustar `top` para compensar a nova referência (agora relativa a `S.Frame` em vez de `S.Wrapper`). Valor correto: `top: 4rem` — o painel deve aparecer logo abaixo do botão, dentro do card. O implementador deve ler o valor atual e ajustar conforme necessário para que o painel apareça corretamente.

### `src/styles/styles.ts`

`S.Frame` por default já tem `overflow: visible` (não declarado). Nenhuma mudança necessária aqui.

---

## 2. Tamanho dos textos

### `src/components/Timer/styles.ts`

| Componente | Atual | Novo |
|---|---|---|
| `PhaseLabel` | `1.2rem` | `1.5rem` |
| `TimeInfo` | `1.2rem` | `1.5rem` |
| `MotivationalText` | `1.3rem` | `1.6rem` |

### `src/components/PomodoroInfo/styles.ts`

| Componente | Atual | Novo |
|---|---|---|
| `HeadingSubtitle` | `0.9rem` | `1.1rem` |
| `PillarTitle` | `1rem` (via theme.white) | `1.15rem` |
| `PillarDescription` | `0.85rem` | `1rem` |

### `src/components/Footer/styles.ts`

| Componente | Atual | Novo |
|---|---|---|
| `Name` | `0.8rem` | `1rem` |
| `Link` | `0.72rem` | `0.85rem` |

---

## 3. Animações

### 3a. Entrada fade-up — `src/styles/styles.ts`

`SiteTitle` e `Frame` entram com fade + slide suave ao carregar:

```typescript
// Adicionar ao SiteTitle:
animation: fadeUp 0.6s ease-out both;

// Adicionar ao Frame:
animation: fadeUp 0.6s ease-out 0.15s both;

// Keyframes globais (adicionar em src/app/globals.css ou via injectGlobal, ou inline):
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

Como styled-components não tem escopo global para keyframes, definir com `keyframes` helper do styled-components e reusar:

```typescript
import { keyframes } from 'styled-components'

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`

// Em SiteTitle:
animation: ${fadeUp} 0.6s ease-out both;

// Em Frame:
animation: ${fadeUp} 0.6s ease-out 0.15s both;
```

### 3b. Card flutuante — `src/styles/styles.ts`

`Frame` flutua suavemente em loop:

```typescript
const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-6px); }
`

// Em Frame — concatenar animações:
animation: ${fadeUp} 0.6s ease-out 0.15s both, ${float} 4s ease-in-out 0.75s infinite;
```

### 3c. Engrenagem giratória ao hover — já contemplado no `SettingsButton` acima (`transform: rotate(90deg)` no `&:hover`). Adicionar `transition: transform 0.4s ease`.

### 3d. Divisor pulsante — `src/components/Timer/styles.ts`

```typescript
const dividerPulse = keyframes`
  0%, 100% { width: 3rem; opacity: 0.7; }
  50%       { width: 5rem; opacity: 1; }
`

export const Divider = styled.div`
  height: 2px;
  background: linear-gradient(90deg, transparent, ${(props) => props.theme.red}, transparent);
  border-radius: 2px;
  margin-bottom: 2rem;
  animation: ${dividerPulse} 2.5s ease-in-out infinite;
`
```

### 3e. Pilares em cascata no scroll — `src/components/PomodoroInfo/index.tsx` e `styles.ts`

Usar `IntersectionObserver` para detectar quando a seção entra na viewport e adicionar classe animada:

**`index.tsx`:** adicionar ref + useEffect com IntersectionObserver:
```tsx
const sectionRef = useRef<HTMLDivElement>(null)
const [visible, setVisible] = useState(false)

useEffect(() => {
  const el = sectionRef.current
  if (!el) return
  const observer = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) setVisible(true) },
    { threshold: 0.15 }
  )
  observer.observe(el)
  return () => observer.disconnect()
}, [])
```

Passar `$visible` e `$index` para `S.Pillar`:
```tsx
<S.Pillars ref={sectionRef}>
  {locale.pomodoroInfo.pillars.map((pillar, index) => (
    <S.Pillar key={pillar.title} $visible={visible} $index={index}>
      ...
    </S.Pillar>
  ))}
</S.Pillars>
```

**`styles.ts`:** `Pillar` recebe props transientes:
```typescript
interface PillarProps {
  $visible?: boolean
  $index?: number
}

export const Pillar = styled.div<PillarProps>`
  ...estilos existentes...
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  transform: ${(props) => (props.$visible ? 'translateY(0)' : 'translateY(20px)')};
  transition: opacity 0.5s ease, transform 0.5s ease;
  transition-delay: ${(props) => (props.$index ?? 0) * 0.12}s;
`
```

### 3f. Glow no botão primário — `src/components/Timer/styles.ts`

`ControlButton` quando `$primary`, adicionar hover com box-shadow pulsante:

```typescript
${(props) =>
  props.$primary && `
  &:hover {
    box-shadow: 0 4px 24px rgba(214, 55, 49, 0.65), 0 0 40px rgba(214, 55, 49, 0.3);
    transform: scale(1.04);
  }
`}
```

---

## Files Changed

| Arquivo | Mudança |
|---|---|
| `src/components/Timer/styles.ts` | Wrapper sem position:relative, SettingsButton novo estilo+posição, PhaseLabel/TimeInfo/MotivationalText maiores, Divider pulsante, ControlButton glow hover |
| `src/styles/styles.ts` | SiteTitle e Frame com animações fadeUp + float |
| `src/components/PomodoroInfo/index.tsx` | useRef + IntersectionObserver + props $visible/$index |
| `src/components/PomodoroInfo/styles.ts` | Pillar com props transientes + transition, HeadingSubtitle/PillarTitle/PillarDescription maiores |
| `src/components/Footer/styles.ts` | Name e Link maiores |

---

## O que NÃO muda

- Lógica do `usePomodoro` (timer, mute, notificações)
- Estrutura JSX do Timer (só estilos e props)
- Sistema de locales
- Estrutura de rotas
