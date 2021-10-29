import { useEffect, useState } from 'react'
import * as S from './styles'

interface TimerProps {
  time: number
  breakTime: number
}

const Timer = (props: TimerProps) => {
  const [minutes, setMinutes] = useState(props.time)
  const [seconds, setSeconds] = useState(0)
  const [displayMensage, setDisplayMensage] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      clearInterval(interval)
      if (seconds === 0) {
        if (minutes !== 0) {
          setSeconds(59)
          setMinutes(minutes - 1)
        } else {
          const minutes = displayMensage ? 24 : props.breakTime
          const seconds = 0

          setSeconds(seconds)
          setMinutes(minutes)
          setDisplayMensage(!displayMensage)
        }
      } else {
        setSeconds(seconds - 1)
      }
    }, 1000)
  }, [displayMensage, minutes, props.breakTime, seconds])

  const TimerMinutes = minutes < 10 ? `0${minutes}` : minutes
  const TimerSeconds = seconds < 10 ? `0${seconds}` : seconds
  const Display = `${TimerMinutes}:${TimerSeconds}`

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
