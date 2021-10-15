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

        <title>Tomatracker</title>
        <meta name="title" content="Tomatracker" />
        <meta
          name="description"
          content="Improve your productivity using The Pomodoro Technique"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://metatags.io/" />
        <meta property="og:title" content="Tomatracker" />
        <meta
          property="og:description"
          content="Improve your productivity using The Pomodoro Technique"
        />
        <meta
          property="og:image"
          content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://metatags.io/" />
        <meta property="twitter:title" content="Tomatracker" />
        <meta
          property="twitter:description"
          content="Improve your productivity using The Pomodoro Technique"
        />
        <meta
          property="twitter:image"
          content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png"
        />
      </Head>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  )
}

export default App
