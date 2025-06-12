'use client'
import React from 'react'
import { Boxes, ClockFading } from 'lucide-react'
import { Button } from '@/components/ui/button'
import TestAudio from '@/components/pages/tests/TestAudio'
import { useScrollToTop } from '@/hooks/use-scroll-to-top'
import { useAudioLoadingStore } from '@/store/loading-store'

export default function TestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const scroll = useScrollToTop()
  const { isAudioLoading } = useAudioLoadingStore()

  return (
    <main ref={scroll}>
      <div className="pt-[80px]"></div>
      <div className="min-h-screen bg-gray-50 flex flex-col overflow-hidden">
        {/* Header bar */}
        {!isAudioLoading && (
          <header className="bg-white border-b top-0">
            <div className="container mx-auto py-4 px-6">
              <div className="flex items-center justify-between">
                <Button variant="buff" size="lg" className="gap-2">
                  <Boxes />
                </Button>
                <div className="flex items-center gap-4 font-bold font-lexend">
                  <TestAudio />
                  <Button
                    variant="buff"
                    size="lg"
                    className="opacity-100 pointer-events-none"
                  >
                    <ClockFading></ClockFading>
                    2:00:00
                  </Button>
                  <Button
                    variant="paleorange"
                    className="text-white "
                    size="lg"
                  >
                    Nộp bài
                  </Button>
                </div>
              </div>
            </div>
          </header>
        )}

        {/* Main Content */}
        <main className="flex-1 container mx-auto py-6 px-6">
          <div className="bg-white rounded-lg shadow-sm p-6">{children}</div>
        </main>
      </div>{' '}
      {isAudioLoading && <TestAudio />}
    </main>
  )
}
