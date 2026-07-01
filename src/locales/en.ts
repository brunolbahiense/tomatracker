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
  },
  notifications: {
    backToWork: 'Back to work!',
    backToWorkBody: (m: number) => `Focus for ${m} minutes.`,
    breakTime: 'Break time!',
    breakTimeBody: (m: number) => `Relax for ${m} minutes.`,
  },
  pomodoroInfo: {
    title: 'The Pomodoro Technique',
    subtitle: 'How to master it!',
    steps: [
      {
        title: '1. Find out how much effort an activity requires',
        description:
          "Ever wonder where all your time goes? Wonder no more: it's all on the page. Your Pomodoro® To-Do sheet is a visual overview of the time you've spent on various tasks.",
      },
      {
        title: '2. Cut down on interruptions',
        description:
          "Usually, you can afford to take 25 minutes before calling back a friend or replying to an email. You'll learn how to handle the inevitable interruption while staying focused on the task at hand.",
      },
      {
        title: '3. Estimate the effort for activities',
        description:
          "While the contours of the Pomodoro® are set, what you do within them can be adjusted to maximize efficiency. One way to make a Pomodoro® more effective is to use the first few minutes to review what you've done before. Other methods are discussed in the book.",
      },
      {
        title: '4. Make the Pomodoro more effective',
        description:
          "While the contours of the Pomodoro are set, what you do within them can be adjusted to maximize efficiency. One way to make a Pomodoro® more effective is to use the first few minutes to review what you've done before. Other methods are discussed in the book.",
      },
      {
        title: '5. Set up a timetable',
        description:
          'A timetable sets a limit, motivating you to complete a task within a set period of time. It also delineates your work time from your free time. Creating a clear timetable will allow you to enjoy your time off without worrying that you could be doing more work.',
      },
      {
        title: '6. Define your own objectives',
        description:
          'A timetable sets a limit, motivating you to complete a task within a set period of time. It also delineates your work time from your free time. Creating a clear timetable will allow you to enjoy your time off without worrying that you could be doing more work.',
      },
    ],
  },
}

export type Translations = typeof en
export default en
