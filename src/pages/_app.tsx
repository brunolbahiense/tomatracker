import { AppProps } from 'next/app'
import Head from 'next/head'

import GlobalStyles from 'styles/global'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Tomatracker</title>
        <link rel="shortcut icon" href="/img/tomato.png" />
        <link rel="apple-touch-icon" href="/img/tomato.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#d95550" />
        <meta
          name="description"
          content="Using the pomodoro method to improve your productivity 🚀"
        />
      </Head>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  )
}

export default App
