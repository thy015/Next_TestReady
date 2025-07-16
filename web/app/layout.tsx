import type { Metadata } from 'next'
import { Roboto, Mogra, Lexend } from 'next/font/google'
import '../global.css'
import '../styles/_style.scss'
import { Suspense } from 'react'
import Loading from './loading'
import Footer from '@/components/partials/footer'

// font config
const roboto = Roboto({
  variable: '--font-roboto',
  weight: '400',
  subsets: ['latin'],
})

const mogra = Mogra({
  variable: '--font-mogra',
  weight: '400',
  subsets: ['latin'],
})

const lexend = Lexend({
  variable: '--font-lexend',
  weight: '400',
  subsets: ['latin'],
})
export const metadata: Metadata = {
  title: 'TEST Ready',
  description: 'An english, japanese,... testing website',
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
      <body
        className={` ${roboto.variable} ${mogra.variable} ${lexend.variable}`}
      >
        <Suspense fallback={<Loading />}>
          <main className="w-full h-full">
            {children}
            <Footer />
          </main>
        </Suspense>
      </body>
    </html>
  )
}
