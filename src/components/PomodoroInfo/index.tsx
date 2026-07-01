'use client'

import useLocale from 'hooks/useLocale'
import * as S from './styles'

export default function PomodoroInfo() {
  const locale = useLocale()

  return (
    <S.Section>
      <S.Heading>
        <S.HeadingTitle>{locale.pomodoroInfo.title}</S.HeadingTitle>
        <S.HeadingSubtitle>{locale.pomodoroInfo.subtitle}</S.HeadingSubtitle>
      </S.Heading>
      <S.Pillars>
        {locale.pomodoroInfo.pillars.map((pillar) => (
          <S.Pillar key={pillar.title}>
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
