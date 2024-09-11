import { useEffect, useState } from 'react'
import * as S from './styles'

interface TimerProps {
  time: number
  breakTime: number
}

const Timer = ({ time, breakTime }: TimerProps) => {
  const [minutes, setMinutes] = useState(time)
  const [seconds, setSeconds] = useState(0)
  const [pause, setPause] = useState(true)
  const [sound, setSound] = useState(true)
  const [displayMensage, setDisplayMensage] = useState(false)

  const TimerMinutes = minutes < 10 ? `0${minutes}` : minutes
  const TimerSeconds = seconds < 10 ? `0${seconds}` : seconds

  const reload = () => {
    const seconds = 0
    setPause(true)
    setMinutes(25)
    setSeconds(seconds)
  }
  useEffect(() => {
    const Display = `${TimerMinutes}:${TimerSeconds}`
    document.title = `${Display} - Tomatracker`
    const interval = setInterval(() => {

      if(!pause){
        if (seconds === 0) {
          if (minutes !== 0) {
            setSeconds(59)
            setMinutes(minutes - 1)
          }else{
            const minutes = displayMensage ? 24 : breakTime
            const seconds = 0
            setSeconds(seconds)
            setMinutes(minutes)
            setDisplayMensage(!displayMensage)
          }
        }
        if(seconds !== 0) {
          const left = seconds - 1
          setSeconds(left)
        }
      }
      console.log('interval:', interval)
      clearInterval(interval)
    }, 1000)
  }, [displayMensage, minutes, breakTime, TimerMinutes,TimerSeconds ,pause])

  return (
    <>
      <S.Message>
        {displayMensage && (
          <div>Break time! Chill a little and come back in:</div>
        )}
      </S.Message>
      <S.Title>{`${TimerMinutes}:${TimerSeconds}`}</S.Title>
      <S.Actions>
        <img
          src={`/img/actions/${sound ? 'sound' : 'mute'}.svg`}
          alt={`${sound ? 'sound' : 'mute'}`}
          onClick={() => setSound(!sound)}
        />
        <img
          src={`/img/actions/${pause ? 'play' : 'pause'}.svg`}
          alt={`${pause ? 'play' : 'pause'}`}
          onClick={() => setPause(!pause)}
        />
         <img
          src={`/img/actions/reload.svg`}
          alt="reload button"
          onClick={reload}
        />
      </S.Actions>
    </>
  )
}

export default Timer
