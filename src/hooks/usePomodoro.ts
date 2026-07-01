import { useEffect, useState } from 'react'
import useLocale from './useLocale'

const DEFAULT_WORK_TIME = 25
const DEFAULT_BREAK_TIME = 5

const getStoredWorkTime = () => {
  if (typeof window === 'undefined') return DEFAULT_WORK_TIME
  return Number(localStorage.getItem('workTime')) || DEFAULT_WORK_TIME
}

const getStoredBreakTime = () => {
  if (typeof window === 'undefined') return DEFAULT_BREAK_TIME
  return Number(localStorage.getItem('breakTime')) || DEFAULT_BREAK_TIME
}

const getStoredIsMuted = () => {
  if (typeof window === 'undefined') return false
  return localStorage.getItem('isMuted') === 'true'
}

const requestNotificationPermission = async () => {
  if (typeof Notification !== 'undefined' && Notification.permission === 'default') {
    await Notification.requestPermission()
  }
}

const sendNotification = (title: string, body: string) => {
  if (typeof Notification !== 'undefined' && Notification.permission === 'granted') {
    new Notification(title, { body, icon: '/img/tomato.png' })
  }
}

const playSound = () => {
  const AudioContextClass =
    typeof window !== 'undefined'
      ? window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      : undefined

  if (!AudioContextClass) return

  const context = new AudioContextClass()
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
  const [workTime, setWorkTime] = useState(getStoredWorkTime)
  const [breakTime, setBreakTime] = useState(getStoredBreakTime)
  const [minutes, setMinutes] = useState(getStoredWorkTime)
  const [seconds, setSeconds] = useState(0)
  const [displayMessage, setDisplayMessage] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [isMuted, setIsMuted] = useState(getStoredIsMuted)

  const locale = useLocale()

  const TimerMinutes = minutes < 10 ? `0${minutes}` : minutes
  const TimerSeconds = seconds < 10 ? `0${seconds}` : seconds
  const Display = `${TimerMinutes}:${TimerSeconds}`

  useEffect(() => {
    if (!isRunning) return

    document.title = Display

    const interval = setInterval(() => {
      if (seconds === 0) {
        if (minutes !== 0) {
          setSeconds(59)
          setMinutes(minutes - 1)
        } else {
          const nextMinutes = displayMessage ? workTime - 1 : breakTime
          setSeconds(0)
          setMinutes(nextMinutes)
          setDisplayMessage(!displayMessage)

          if (!isMuted) playSound()
          if (displayMessage) {
            sendNotification(locale.notifications.backToWork, locale.notifications.backToWorkBody(workTime))
          } else {
            sendNotification(locale.notifications.breakTime, locale.notifications.breakTimeBody(breakTime))
          }
        }
      } else {
        setSeconds(seconds - 1)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning, displayMessage, minutes, breakTime, workTime, seconds, Display, locale, isMuted])

  useEffect(() => {
    localStorage.setItem('workTime', String(workTime))
  }, [workTime])

  useEffect(() => {
    localStorage.setItem('breakTime', String(breakTime))
  }, [breakTime])

  useEffect(() => {
    localStorage.setItem('isMuted', String(isMuted))
  }, [isMuted])

  const toggleTimer = async () => {
    if (!isRunning) await requestNotificationPermission()
    setIsRunning((prev) => !prev)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setMinutes(workTime)
    setSeconds(0)
    setDisplayMessage(false)
    document.title = 'Tomatracker'
  }

  const toggleMute = () => setIsMuted((prev) => !prev)

  const increaseWorkTime = () => {
    const next = workTime + 1
    setWorkTime(next)
    if (!displayMessage) {
      setMinutes(next)
      setSeconds(0)
    }
  }

  const decreaseWorkTime = () => {
    const next = Math.max(1, workTime - 1)
    setWorkTime(next)
    if (!displayMessage) {
      setMinutes(next)
      setSeconds(0)
    }
  }

  const increaseBreakTime = () => {
    const next = breakTime + 1
    setBreakTime(next)
    if (displayMessage) {
      setMinutes(next)
      setSeconds(0)
    }
  }

  const decreaseBreakTime = () => {
    const next = Math.max(1, breakTime - 1)
    setBreakTime(next)
    if (displayMessage) {
      setMinutes(next)
      setSeconds(0)
    }
  }

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
    decreaseBreakTime,
  }
}

export default usePomodoro
