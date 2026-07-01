'use client'

import useLocale from 'hooks/useLocale'
import * as S from './styles'

export default function Footer() {
  const locale = useLocale()

  return (
    <S.Footer>
      <S.Name>
        {locale.footer.madeBy} <strong>{locale.footer.name}</strong>
      </S.Name>
      <S.Sep />
      <S.Links>
        <S.Link
          href="https://github.com/brunolbahiense"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </S.Link>
        <S.Link
          href="https://www.linkedin.com/in/brunolbahiense/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </S.Link>
      </S.Links>
    </S.Footer>
  )
}
