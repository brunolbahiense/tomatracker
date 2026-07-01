# Timer Redesign — Design Spec

## Overview

Modernizar o visual do timer do Tomatracker, mantendo toda a lógica existente intacta. O novo design usa tema escuro quente com card flutuante glassmorphism, tipografia bold compacta e frases motivacionais rotativas.

## Design Decisions

| Elemento | Decisão |
|---|---|
| Fundo da página | Gradiente radial escuro quente: `#2a0a0a` (topo) → `#0e0404` (base) |
| Timer container | Card flutuante — semi-transparente, borda sutil, `border-radius: 20px`, `backdrop-filter: blur(8px)` |
| Números do timer | `font-weight: 700`, `letter-spacing: -0.4rem`, branco |
| Label de fase | "FOCO" / "PAUSA" — vermelho, uppercase, `letter-spacing: 0.2rem` |
| Divisor | Linha fina `2px` com gradiente vermelho entre números e botões |
| Botão primário (INICIAR/PAUSAR) | Gradiente vermelho com `box-shadow` glow |
| Botão secundário (REINICIAR) | Glass — branco transparente com borda sutil |
| Info de tempo | "Foco: 25 min · Pausa: 5 min" abaixo dos botões em texto discreto |
| Frase motivacional | Rotativa a cada sessão iniciada, localizada PT/EN, separada por linha fina |
| Ícone de configurações | Círculo semi-transparente, canto superior direito do card |
| Ilustração do tomate | Removida — card fica mais limpo sem ela |
| Mensagem de pausa longa | Removida — fase comunicada pelo label "PAUSA" |

---

## Color Tokens Novos

Adicionar em `src/styles/theme.ts`:

```typescript
darkBg: '#0e0404',
darkBgTop: '#2a0a0a',
```

---

## Frases Motivacionais

### `src/locales/en.ts` — adicionar ao bloco `timer`:

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

### `src/locales/pt.ts` — adicionar ao bloco `timer`:

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

---

## Files Changed

### `src/styles/theme.ts`
- Adicionar `darkBg` e `darkBgTop`

### `src/styles/styled.d.ts`
- Adicionar `darkBg: string` e `darkBgTop: string` ao `DefaultTheme` para que os tokens sejam tipados corretamente nos styled-components

### `src/components/Wrapper/index.tsx`
- Adicionar `'dark'` ao tipo `background?: 'blue' | 'red' | 'dark'`

### `src/components/Wrapper/styles.ts`
- Adicionar case para `background === 'dark'`: gradiente radial `${theme.darkBgTop}` topo → `${theme.darkBg}` base

```typescript
${(props) =>
  props.background === 'dark' &&
  `background: radial-gradient(ellipse at 50% 0%, ${props.theme.darkBgTop} 0%, ${props.theme.darkBg} 100%);
`};
```

### `src/styles/styles.ts` — `Frame`
- Remover `background-color`, `width` fixo, `height` fixo, `border-radius: 5px`, `margin-top: 5rem`
- Novo estilo: card flutuante glassmorphism

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

### `src/app/tomatracker/page.tsx`
- Passar `background="dark"` ao `<Wrapper>`

```tsx
<Wrapper background="dark">
```

### `src/components/Timer/styles.ts`

**Atualizar `Title`:**
```typescript
export const Title = styled.h1`
  font-size: 10rem;
  font-weight: 700;
  letter-spacing: -0.4rem;
  line-height: 1;
`
```

**Atualizar `ControlButton` com prop transiente `$primary`:**
```typescript
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
```

**Adicionar novos styled components (ao final do arquivo):**

```typescript
export const PhaseLabel = styled.div`
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  color: ${(props) => props.theme.red};
  font-weight: 600;
  margin-bottom: 0.8rem;
`

export const Divider = styled.div`
  width: 3rem;
  height: 2px;
  background: linear-gradient(90deg, transparent, ${(props) => props.theme.red}, transparent);
  border-radius: 2px;
  margin-bottom: 2rem;
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
```

**Remover:** `Message` (visual — manter apenas se necessário para `aria-live`)

> **Nota:** `PhaseLabel` recebe `aria-live="polite"` para anunciar mudanças de fase a leitores de tela, substituindo o papel que `Message` cumpria.

---

### `src/components/Timer/index.tsx`

**Lógica de frase motivacional:**
- Adicionar `const [phraseIndex, setPhraseIndex] = useState(0)` ao componente
- Usar `useEffect` observando `isRunning`: quando muda de `false` → `true`, avançar `phraseIndex` ciclicamente (mod frases.length)
- Frase exibida: `locale.timer.motivationalPhrases[phraseIndex]`

**JSX atualizado (estrutura dentro de `<S.Wrapper>`):**
```tsx
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
```

---

## Comportamento

- **Frase motivacional**: inicia no índice 0. A cada vez que `isRunning` muda de `false` para `true`, o índice avança: `(prev + 1) % phrases.length`. Frases ciclam continuamente.
- **Label de fase**: muda em tempo real conforme `displayMessage` alterna — com `aria-live="polite"` para acessibilidade.
- **Card flutuante**: `backdrop-filter: blur(8px)` requer suporte do browser; tem fallback gracioso (apenas semi-transparente sem blur em browsers mais antigos).
- **Botões**: `INICIAR`/`PAUSAR` usa `$primary` (gradiente vermelho com glow); `REINICIAR` usa estilo glass.

---

## Scope — O que NÃO muda neste redesign

- Toda a lógica do `usePomodoro` (timer, notificações, som, localStorage)
- O menu de configurações flutuante (já implementado)
- A landing page (`src/app/page.tsx`)
- O `PomodoroInfo` e o `Footer`
- O sistema de locales existente (apenas adicionando `motivationalPhrases`)
