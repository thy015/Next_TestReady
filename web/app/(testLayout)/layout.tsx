'use client'
import React from 'react'
import { Boxes, ClockFading } from 'lucide-react'
import { Button } from '@/components/ui/button'
import TestAudio from '@/components/pages/tests/TestAudio'
import { useScrollToTop } from '@/hooks/use-scroll-to-top'
import { useAudioLoadingStore } from '@/store/loading-store'
import TestHeader from '@/components/partials/test-header'

export default function TestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const scroll = useScrollToTop()
  const { isAudioLoading } = useAudioLoadingStore()

  return (
    <main ref={scroll}>
      <TestHeader />
      <div className="pt-[80px]"></div>
      <div className="min-h-screen bg-gray-50 flex flex-col overflow-hidden">
        {/* Header bar */}
        {!isAudioLoading && (
          <header className="bg-white border-b top-0">
            <div className="mb-4 mx-auto px-6">
              <div className="flex items-center justify-between">
                <Button variant="buff" size="sm" className="gap-2">
                  <Boxes />
                </Button>
                <div className="flex items-center gap-4 font-bold font-lexend">
                  <TestAudio onAudioComplete={() => {}} />
                  <Button
                    variant="buff"
                    size="sm"
                    className="opacity-100 pointer-events-none"
                  >
                    <ClockFading></ClockFading>
                    2:00:00
                  </Button>
                  <Button
                    variant="paleorange"
                    className="text-white "
                    size="sm"
                  >
                    Nộp bài
                  </Button>
                </div>
              </div>
            </div>
          </header>
        )}

        {/* Main Content */}
        <div className="flex-1 w-[90%] mx-auto py-6">
          <div className="bg-white rounded-lg shadow-sm p-6">{children}</div>
        </div>
      </div>{' '}
      {isAudioLoading && <TestAudio onAudioComplete={() => {}} />}
    </main>
  )
}
