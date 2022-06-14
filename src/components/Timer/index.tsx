import { useEffect, useState } from 'react'
import * as S from './styles'

interface TimerProps {
  time: number
  breakTime: number
}

const Timer = ({ time, breakTime }: TimerProps) => {
  const [minutes, setMinutes] = useState(time)
  const [seconds, setSeconds] = useState(0)
  const [displayMensage, setDisplayMensage] = useState(false)

  const TimerMinutes = minutes < 10 ? `0${minutes}` : minutes
  const TimerSeconds = seconds < 10 ? `0${seconds}` : seconds
  const Display = `${TimerMinutes}:${TimerSeconds}`

  useEffect(() => {
    document.title = Display
    const interval = setInterval(() => {
      clearInterval(interval)
      if (seconds === 0) {
        if (minutes !== 0) {
          setSeconds(59)
          setMinutes(minutes - 1)
        } else {
          const minutes = displayMensage ? 24 : breakTime
          const seconds = 0

          setSeconds(seconds)
          setMinutes(minutes)
          setDisplayMensage(!displayMensage)
        }
      } else {
        setSeconds(seconds - 1)
      }
    }, 1000)
  }, [displayMensage, minutes, breakTime, seconds, Display])

  return (
    <>
      <S.Message>
        {displayMensage && (
          <div>Break time! Chill a little and come back in:</div>
        )}
      </S.Message>
      <S.Title>{Display}</S.Title>
    </>
  )
}

export default Timer
