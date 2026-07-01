'use client'

import { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import GlobalStyles from 'styles/global'
import { AppThemeProvider } from 'contexts/AppThemeContext'

export default function StyledComponentsRegistry({
  children
}: {
  children: React.ReactNode
}) {
  const [styleSheet] = useState(() => new ServerStyleSheet())

  useServerInsertedHTML(() => {
    const styles = styleSheet.getStyleElement()
    styleSheet.instance.clearTag()
    return <>{styles}</>
  })

  if (typeof window !== 'undefined') {
    return (
      <AppThemeProvider>
        <GlobalStyles />
        {children}
      </AppThemeProvider>
    )
  }

  return (
    <StyleSheetManager sheet={styleSheet.instance}>
      <AppThemeProvider>
        <GlobalStyles />
        {children}
      </AppThemeProvider>
    </StyleSheetManager>
  )
}
