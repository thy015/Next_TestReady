import type { Metadata } from 'next'
import { Roboto, Mogra, Lexend } from 'next/font/google'
import '../global.css'
import '../styles/_style.scss'
import { Suspense } from 'react'
import Loading from './loading'
import Header from '@/components/partials/header'
import Footer from '@/components/partials/footer'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'

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
      <body
        className={` ${roboto.variable} ${mogra.variable} ${lexend.variable}`}
      >
        <SidebarProvider defaultOpen={false} className="relative">
          <AppSidebar />
          <Suspense fallback={<Loading />}>
            <main className="w-full h-full">
              <Header />
              {children}
              <Footer />
            </main>
          </Suspense>
        </SidebarProvider>
      </body>
    </html>
  )
}
