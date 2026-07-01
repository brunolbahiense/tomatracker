import { useEffect, useRef, useState } from 'react'
import useLocale from './useLocale'

const DEFAULT_WORK_TIME = 25
const DEFAULT_BREAK_TIME = 5

const requestNotificationPermission = async () => {
  if (
    typeof Notification !== 'undefined' &&
    Notification.permission === 'default'
  ) {
    await Notification.requestPermission()
  }
}

const sendNotification = (title: string, body: string) => {
  if (
    typeof Notification !== 'undefined' &&
    Notification.permission === 'granted'
  ) {
    new Notification(title, { body, icon: '/img/tomato.png' })
  }
}

// O AudioContext é compartilhado e destravado num gesto do usuário (play ou
// toggle de som) — criado dentro do setInterval ele nasce suspenso e nunca toca.
let audioContext: AudioContext | null = null

const getAudioContext = () => {
  if (typeof window === 'undefined') return null

  const AudioContextClass =
    window.AudioContext ||
    (window as Window & { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext

  if (!AudioContextClass) return null

  if (!audioContext) audioContext = new AudioContextClass()
  if (audioContext.state === 'suspended') audioContext.resume()

  return audioContext
}

const playSound = () => {
  const context = getAudioContext()
  if (!context) return

  const oscillator = context.createOscillator()
  const gainNode = context.createGain()

  oscillator.connect(gainNode)
  gainNode.connect(context.destination)

  oscillator.type = 'sine'
  oscillator.frequency.value = 880
  gainNode.gain.setValueAtTime(0.3, context.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.6)

  oscillator.start(context.currentTime)
  oscillator.stop(context.currentTime + 0.6)
}

const usePomodoro = () => {
  const [workTime, setWorkTime] = useState(DEFAULT_WORK_TIME)
  const [breakTime, setBreakTime] = useState(DEFAULT_BREAK_TIME)
  const [secondsLeft, setSecondsLeft] = useState(DEFAULT_WORK_TIME * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [displayMessage, setDisplayMessage] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const endTimeRef = useRef(0)

  const locale = useLocale()

  useEffect(() => {
    const storedWorkTime =
      Number(localStorage.getItem('workTime')) || DEFAULT_WORK_TIME
    const storedBreakTime =
      Number(localStorage.getItem('breakTime')) || DEFAULT_BREAK_TIME
    setWorkTime(storedWorkTime)
    setBreakTime(storedBreakTime)
    setSecondsLeft(storedWorkTime * 60)
    setIsMuted(localStorage.getItem('isMuted') === 'true')
  }, [])

  // O tempo restante vem de um timestamp de término, não de decrementos por
  // tick — assim o timer se autocorrige mesmo com throttling de aba inativa.
  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      const remaining = Math.max(
        0,
        Math.round((endTimeRef.current - Date.now()) / 1000)
      )
      setSecondsLeft(remaining)
    }, 500)

    return () => clearInterval(interval)
  }, [isRunning])

  useEffect(() => {
    if (!isRunning || secondsLeft > 0) return

    const startingBreak = !displayMessage
    const nextMinutes = startingBreak ? breakTime : workTime
    setDisplayMessage(startingBreak)
    setSecondsLeft(nextMinutes * 60)
    endTimeRef.current = Date.now() + nextMinutes * 60 * 1000

    if (!isMuted) playSound()
    if (startingBreak) {
      sendNotification(
        locale.notifications.breakTime,
        locale.notifications.breakTimeBody(breakTime)
      )
    } else {
      sendNotification(
        locale.notifications.backToWork,
        locale.notifications.backToWorkBody(workTime)
      )
    }
  }, [
    isRunning,
    secondsLeft,
    displayMessage,
    workTime,
    breakTime,
    isMuted,
    locale
  ])

  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60
  const Display = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`

  useEffect(() => {
    if (isRunning) document.title = Display
  }, [isRunning, Display])

  const toggleTimer = async () => {
    if (isRunning) {
      setIsRunning(false)
      return
    }
    await requestNotificationPermission()
    getAudioContext()
    endTimeRef.current = Date.now() + secondsLeft * 1000
    setIsRunning(true)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setDisplayMessage(false)
    setSecondsLeft(workTime * 60)
    document.title = 'Tomatracker'
  }

  const toggleMute = () => {
    const next = !isMuted
    setIsMuted(next)
    localStorage.setItem('isMuted', String(next))
    if (!next) playSound()
  }

  const restartCountdown = (nextMinutes: number) => {
    setSecondsLeft(nextMinutes * 60)
    endTimeRef.current = Date.now() + nextMinutes * 60 * 1000
  }

  const changeWorkTime = (next: number) => {
    setWorkTime(next)
    localStorage.setItem('workTime', String(next))
    if (!displayMessage) restartCountdown(next)
  }

  const changeBreakTime = (next: number) => {
    setBreakTime(next)
    localStorage.setItem('breakTime', String(next))
    if (displayMessage) restartCountdown(next)
  }

  const increaseWorkTime = () => changeWorkTime(workTime + 1)
  const decreaseWorkTime = () => changeWorkTime(Math.max(1, workTime - 1))
  const increaseBreakTime = () => changeBreakTime(breakTime + 1)
  const decreaseBreakTime = () => changeBreakTime(Math.max(1, breakTime - 1))

  const ariaCountdown = locale.timer.aria.countdown(minutes, seconds)

  return {
    Display,
    displayMessage,
    isRunning,
    isMuted,
    toggleMute,
    workTime,
    breakTime,
    ariaCountdown,
    toggleTimer,
    resetTimer,
    increaseWorkTime,
    decreaseWorkTime,
    increaseBreakTime,
    decreaseBreakTime
  }
}

export default usePomodoro
