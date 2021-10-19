import { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'

import GlobalStyles from 'styles/global'
import theme from 'styles/theme'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Tomatracker</title>
        <link rel="shortcut icon" href="/img/tomato.png" />
        <link rel="apple-touch-icon" href="/img/tomato.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#d95550" />
        <meta name="Tomatracker" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tomatracker.vercel.app/" />
        <meta property="og:title" content="Tomatracker" />
        <meta
          property="og:description"
          content="Improve your productivity using The Pomodoro Technique"
        />
        <meta property="og:image" content="/img/tomatracker.png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://tomatracker.vercel.app/"
        />
        <meta property="twitter:title" content="Tomatracker" />
        <meta
          property="twitter:description"
          content="Improve your productivity using The Pomodoro Technique"
        />
        <meta property="twitter:image" content="/img/tomatracker.png" />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default App
