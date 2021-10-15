import { useEffect, useState } from 'react'
import * as S from './styles'

const Timer = () => {
  const [minutes, setMinutes] = useState(25)
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
          const minutes = displayMensage ? 24 : 4
          const seconds = 59

          setSeconds(seconds)
          setMinutes(minutes)
          setDisplayMensage(!displayMensage)
        }
      } else {
        setSeconds(seconds - 1)
      }
    }, 1000)
  }, [displayMensage, minutes, seconds])

  const TimerMinutes = minutes < 10 ? `0${minutes}` : minutes
  const TimerSeconds = seconds < 10 ? `0${seconds}` : seconds

  return (
    <>
      <S.Message>
        {displayMensage && (
          <div>Break time! Chill a little and come back in:</div>
        )}
      </S.Message>
      <S.Title>
        {TimerMinutes}:{TimerSeconds}
      </S.Title>
    </>
  )
}

export default Timer
