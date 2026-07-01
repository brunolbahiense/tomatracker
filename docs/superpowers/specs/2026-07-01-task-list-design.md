# Task List Feature — Design Spec

**Goal:** Add a task list drawer to Tomatracker where users can add tasks, mark them as completed (with timestamp), and download a .txt report of completed tasks.

**Architecture:** A new `useTasks` hook manages task state and localStorage persistence. A `Tasks` component renders the toggle button and the drawer. Both button and drawer use `position: fixed` anchored to the top-left corner, mirroring the Settings button on the top-right.

**Tech Stack:** React, styled-components 6, localStorage, Blob API for file download.

---

## Data Model

Each task is stored as:

```ts
interface Task {
  id: string         // crypto.randomUUID()
  text: string
  done: boolean
  completedAt: string | null  // "HH:MM" local time, set when task is marked done
}
```

localStorage key: `tt_task_list`  
Value: JSON array of `Task[]`. Initialized to `[]` if absent.

---

## Hook — `useTasks`

Location: `src/hooks/useTasks.ts`

Responsibilities:
- Load `tt_task_list` from localStorage on mount (via `useEffect`)
- Expose `taskList: Task[]`
- `addTask(text: string)`: appends new task, ignores empty strings
- `toggleTask(id: string)`: flips `done`; sets `completedAt` to `HH:MM` on completion, clears it on un-complete
- `deleteTask(id: string)`: removes task from list
- Persist full `taskList` to `tt_task_list` on every change

---

## Component — `Tasks`

Location: `src/components/Tasks/index.tsx` + `src/components/Tasks/styles.ts`

### Button

- `position: fixed; top: 1.5rem; left: 1.5rem; z-index: 1000`
- Same size, shape, and theme tokens as `SettingsButton` (circle, `accentSoft` bg, `red` icon)
- Icon: `✓`
- Active state (drawer open): filled background (`red`), white icon

### Drawer

- `position: fixed; top: 5rem; left: 1.5rem; z-index: 1000`
- Same visual tokens as `SettingsPanel` (`panelBg`, `borderMid`, `grayDark`)
- Dismissed by clicking a `Backdrop` (same pattern as Settings)

### Drawer layout (top to bottom)

1. **Input row**: text input + `+` button. Enter key also triggers add. Empty string blocked.
2. **Active tasks list**: one row per task with checkbox, text, `×` delete button.
3. **"CONCLUÍDAS" divider**: horizontal rule + uppercase label (only rendered if at least 1 completed task).
4. **Completed tasks list**: checkbox (checked, accent), strikethrough text, HH:MM timestamp, `×` delete.
5. **Download row**: accent button "↓ Baixar relatório" — only rendered if at least 1 completed task.

### Backdrop

Same `position: fixed; inset: 0; z-index: 999` pattern as Settings backdrop.

---

## Report Download

Triggered by the "Baixar relatório" button. Generates a `.txt` file via Blob:

```
Tomatracker — Relatório de tarefas
YYYY-MM-DD

Tarefas concluídas:
✓ <task text> — HH:MM
✓ <task text> — HH:MM

Total: N tarefas
```

Filename: `tomatracker-YYYY-MM-DD.txt`  
Date is derived from `new Date()` formatted as `YYYY-MM-DD`.  
Download triggered via a temporary `<a>` element with `href` set to `URL.createObjectURL(blob)`.

---

## Placement in page.tsx

`<Tasks />` rendered as a sibling of `<Settings />` at the top of the page fragment, before `<Wrapper>`. It receives all handlers from `useTasks`.

```tsx
<Tasks taskList={taskList} addTask={addTask} toggleTask={toggleTask} deleteTask={deleteTask} />
<Settings ... />
<Wrapper ...>
```

---

## Localization

New keys added to `src/locales/en.ts` and `src/locales/pt.ts` under a `tasks` namespace:

- `openLabel` — aria-label for the open button
- `inputPlaceholder` — "New task..." / "Nova tarefa..."
- `completedLabel` — "COMPLETED" / "CONCLUÍDAS"
- `downloadButton` — "↓ Download report" / "↓ Baixar relatório"
- `reportTitle` — "Tomatracker — Task Report" / "Tomatracker — Relatório de tarefas"
- `reportTotal` — "Total: N tasks" / "Total: N tarefas"
- `deleteLabel` — aria-label for delete buttons

---

## Styled Components

All new components use existing theme tokens — no new theme variables needed:

- `TasksButton` — mirrors `SettingsButton`, adds `$active: boolean` prop for filled state
- `TasksDrawer` — mirrors `SettingsPanel`
- `TaskInput`, `AddButton`
- `TaskRow` — shared layout for active and completed rows
- `Checkbox` — styled div, `$done: boolean` for checked state
- `TaskText` — `$done: boolean` for strikethrough + muted color
- `Timestamp` — small muted text
- `DeleteButton`
- `SectionDivider`, `SectionLabel` — reuse from Settings styles or duplicate
- `DownloadButton`
