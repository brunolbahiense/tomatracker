# 🍅 Tomatracker

Improve your productivity using The Pomodoro Technique.

**Live app:** [tomatracker.vercel.app](https://tomatracker.vercel.app/)

Tomatracker is a Pomodoro timer PWA: focus for 25 minutes, take a 5-minute break, repeat. It keeps working accurately even with the tab in the background, notifies you when each cycle ends, and lets you track the tasks you complete along the way.

## Features

- **Pomodoro timer** — timestamp-based countdown that stays accurate even when the browser throttles background tabs, with configurable work and break durations
- **Task list** — add, complete and delete tasks, with completion time tracking and a downloadable daily report
- **Notifications & sound** — desktop notification and a beep at the end of each cycle (sound can be muted)
- **Themes** — dark/light mode and six accent color presets (Tomato, Sakura, Ocean, Emerald, Mustard, Gruvbox)
- **Bilingual** — English and Portuguese (pt-BR), auto-detected from the browser language
- **PWA** — installable and works offline
- **Persistent settings** — timer durations, theme, accent color, mute state and tasks are saved in localStorage

## Tech stack

- [Next.js 15](https://nextjs.org/) (App Router) + React 18
- TypeScript (strict)
- [styled-components 6](https://styled-components.com/) with a custom theme
- [@ducanh2912/next-pwa](https://github.com/DuCanhGH/next-pwa) (Workbox) for offline support
- ESLint + Prettier

No state management library — plain React hooks (`usePomodoro`, `useTasks`, `useLocale`) and two small contexts for theme and locale.

## Getting started

Requires Node.js >= 20 and Yarn.

```bash
git clone https://github.com/brunolbahiense/tomatracker.git
cd tomatracker
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script       | Description                                    |
| ------------ | ---------------------------------------------- |
| `yarn dev`   | Start the development server                   |
| `yarn build` | Production build (also generates the PWA files) |
| `yarn start` | Serve the production build                     |
| `yarn lint`  | Run ESLint + Prettier checks                   |

## Project structure

```
src/
├── app/            # App Router pages, layout and styled-components registry
├── components/     # Timer, Tasks, Settings, PomodoroInfo, Footer, Wrapper
│   └── */          # each component: index.tsx + styles.ts
├── contexts/       # AppThemeContext (mode + accent), LocaleContext
├── hooks/          # usePomodoro, useTasks, useLocale
├── locales/        # en / pt translations
└── styles/         # theme builder, color presets, global styles
```

## Author

Made by **Bruno Bahiense** — [GitHub](https://github.com/brunolbahiense) · [LinkedIn](https://www.linkedin.com/in/brunolbahiense/)
