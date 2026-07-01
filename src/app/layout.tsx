import type { Metadata } from 'next'
import StyledComponentsRegistry from './registry'

export const metadata: Metadata = {
  title: 'Tomatracker',
  description: 'Improve your productivity using The Pomodoro Technique',
  icons: {
    shortcut: '/img/tomato.png',
    apple: '/img/tomato.png'
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    url: 'https://tomatracker.vercel.app/',
    title: 'Tomatracker',
    description: 'Improve your productivity using The Pomodoro Technique',
    images: ['/img/tomatracker.png']
  },
  twitter: {
    card: 'summary_large_image',
    site: 'https://tomatracker.vercel.app/',
    title: 'Tomatracker',
    description: 'Improve your productivity using The Pomodoro Technique',
    images: ['/img/tomatracker.png']
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  )
}
