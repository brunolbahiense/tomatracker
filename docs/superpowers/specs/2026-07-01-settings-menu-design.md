# Settings Floating Menu — Design Spec

## Overview

Add a gear icon (⚙) to the Timer component that opens a floating menu with timer configuration (work/break time) and a mute toggle.

## Design Decisions

| Decision | Choice |
|---|---|
| Button position | Absolute, top-right corner of the timer box |
| Menu type | Floating popover — white background, box shadow, appears to the left of the gear icon |
| Visibility | Always accessible, whether running or paused |
| Time changes | Apply immediately to the current countdown |
| Mute control | Toggle switch only — no label, no emoji |
| Close trigger | Click ⚙ again OR click outside the menu |
| Existing config section | Removed — controls migrate into the floating menu |

## State

| Variable | Lives in | Persisted |
|---|---|---|
| `isMuted` | `usePomodoro` | `localStorage` key `isMuted` |
| `showSettings` | `Timer` component | No (UI only) |

## Files Changed

### `src/hooks/usePomodoro.ts`
- Add `isMuted` state, initialized from `localStorage.getItem('isMuted') === 'true'`
- Add `useEffect` to persist `isMuted` to localStorage on change
- Add `toggleMute` function
- Reactivate `playSound()` — wrap call with `if (!isMuted)` guard
- Export `isMuted` and `toggleMute`

### `src/components/Timer/index.tsx`
- Add `showSettings` local state (`useState(false)`)
- Render `S.SettingsButton` (always visible, absolute positioned)
- Render `S.SettingsPanel` (floating, conditional on `showSettings`)
- Add `useEffect` with `mousedown` listener on `document` to close menu on outside click — cleanup on unmount
- Remove existing `{!isRunning && <S.Config>}` block — time controls move into the panel
- Destructure `isMuted` and `toggleMute` from `usePomodoro`

### `src/components/Timer/styles.ts`
- `SettingsButton` — small circle, absolute top-right, white background, red icon
- `SettingsPanel` — absolute, white background, box shadow, border-radius, z-index above timer
- `MuteRow` — flex row to hold the toggle
- `MuteSwitch` — pill-shaped track (grey when muted, red when active)
- `MuteThumb` — sliding circle — positioned via `isMuted` prop (left when muted, right when active)
- Remove `Config` (the outer wrapper) — `SettingsPanel` replaces it
- Keep `ConfigRow`, `ConfigLabel`, `ConfigValue`, `ConfigButton` — reused as-is inside `SettingsPanel`

### `src/locales/en.ts` + `src/locales/pt.ts`
- Add `settingsTitle: 'Settings'` / `'Configurações'` to `timer` section — used as `aria-label` on `SettingsButton`
- Add `muteLabel` to `timer.aria` section for the toggle's `aria-label`: `'Toggle sound'` / `'Alternar som'`

## Behavior Details

- `isMuted = true` → `playSound()` is skipped entirely
- Changing work/break time while timer is running resets current countdown immediately (already implemented in `increaseWorkTime`/`decreaseWorkTime`)
- `SettingsPanel` uses `position: absolute` — the timer box does not resize when the menu opens
- The `S.Wrapper` in `Timer/styles.ts` receives `position: relative` to anchor the `SettingsButton`
