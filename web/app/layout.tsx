import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import '../global.css'
import { Suspense } from 'react'
import Loading from './loading'
import Header from '@/components/partials/header'

// font config

const roboto = Roboto({
  variable: '--font-roboto',
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'TOEIC Ready',
  description: 'An TOEIC testing website',
  icons: {
    icon: '/icons/logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={` ${roboto.variable}`}>
        <Suspense fallback={<Loading />}>
          <Header />
          {children}
        </Suspense>
      </body>
    </html>
  )
}
