'use client'

import { useRef, useState, useEffect } from 'react'
import useLocale from 'hooks/useLocale'
import * as S from './styles'

export default function PomodoroInfo() {
  const locale = useLocale()
  const pillarsRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = pillarsRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true)
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <S.Section>
      <S.Heading>
        <S.HeadingTitle>{locale.pomodoroInfo.title}</S.HeadingTitle>
        <S.HeadingSubtitle>{locale.pomodoroInfo.subtitle}</S.HeadingSubtitle>
      </S.Heading>
      <S.Pillars ref={pillarsRef}>
        {locale.pomodoroInfo.pillars.map((pillar, index) => (
          <S.Pillar key={pillar.title} $visible={visible} $index={index}>
            <S.PillarIcon>{pillar.icon}</S.PillarIcon>
            <S.PillarHighlight>{pillar.label}</S.PillarHighlight>
            <S.PillarTitle>{pillar.title}</S.PillarTitle>
            <S.PillarDescription>{pillar.description}</S.PillarDescription>
          </S.Pillar>
        ))}
      </S.Pillars>
    </S.Section>
  )
}
