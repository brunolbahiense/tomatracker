const en = {
  landing: {
    tagline: 'Improve your productivity and get things done!',
    cta: "I'm Ready"
  },
  timer: {
    play: 'PLAY',
    pause: 'PAUSE',
    reset: 'RESET',
    workLabel: 'Work',
    breakLabel: 'Break',
    breakMessage: 'Break time! Chill a little and come back in:',
    settingsTitle: 'Settings',
    colorsLabel: 'Colors',
    themeLabel: 'Theme',
    dark: 'Dark',
    light: 'Light',
    aria: {
      countdown: (m: number, s: number) =>
        `${m} minutes and ${s} seconds remaining`,
      decreaseWork: 'Decrease work time',
      increaseWork: 'Increase work time',
      decreaseBreak: 'Decrease break time',
      increaseBreak: 'Increase break time',
      muteLabel: 'Toggle sound'
    },
    motivationalPhrases: [
      'One pomodoro at a time.',
      'Deep work starts here.',
      'Focus is a superpower.',
      'Make this 25 minutes count.',
      'Small steps, big results.',
      'Stay in the zone.',
      'Progress over perfection.',
      'Your best work happens now.'
    ]
  },
  notifications: {
    backToWork: 'Back to work!',
    backToWorkBody: (m: number) => `Focus for ${m} minutes.`,
    breakTime: 'Break time!',
    breakTimeBody: (m: number) => `Relax for ${m} minutes.`
  },
  pomodoroInfo: {
    title: 'The Pomodoro Technique',
    subtitle: 'Simple, proven, effective.',
    pillars: [
      {
        icon: '🍅',
        label: '25 min',
        title: 'Full Focus',
        description: 'Work on one task without interruption for one Pomodoro.'
      },
      {
        icon: '☕',
        label: '5 min',
        title: 'Short Break',
        description: 'Stand up, breathe, rest your mind before the next cycle.'
      },
      {
        icon: '🔁',
        label: '× 4',
        title: 'Repeat',
        description: 'After 4 Pomodoros, take a longer 15–30 min break.'
      }
    ]
  },
  footer: {
    madeBy: 'Made by',
    name: 'Bruno'
  }
}

export type Translations = typeof en
export default en
