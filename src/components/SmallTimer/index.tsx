import { useEffect, useState } from 'react'
import * as S from './styles'
import Link from 'next/link'

const SmallTimer = () => {
  const [minutes, setMinutes] = useState(5)
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
          setDisplayMensage(true)
        }
      } else {
        setSeconds(seconds - 1)
      }
    }, 1000)
  }, [displayMensage, minutes, seconds])

  const TimerMinutes = minutes < 10 ? `0${minutes}` : minutes
  const TimerSeconds = seconds < 10 ? `0${seconds}` : seconds
  const Time = `${TimerMinutes}:${TimerSeconds}`

  return (
    <>
      <S.Message>
        {displayMensage && (
          <S.FrameB>
            <div>Fealling ready to start your pomodori?</div>
            <Link href="/">
              <S.Button>Go to Pomodoro</S.Button>
            </Link>
          </S.FrameB>
        )}
      </S.Message>
      <S.Title>{Time}</S.Title>
    </>
  )
}

export default SmallTimer
