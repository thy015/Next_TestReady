'use client'
import React, { RefObject, useMemo, useState } from 'react'
import PartInstruction from './PartInstruction'
import { Part } from '@/types/tests'
import { Button } from '@/components/ui/button'
import { useQuestionStore, useTestStore } from '@/store/test-store'
import { QuestionDisplay } from './questions/QuestionDisplay'
import TestHeader from '@/components/partials/test-header'
import { Boxes, ClockFading } from 'lucide-react'
import TestAudio from '../TestAudio'
import { useAudioLoadingStore } from '@/store/loading-store'
import Loading from '@/app/loading'

interface TestPartRunnerProps {
  parts: Part[]
}

const PartRunner = ({ parts }: TestPartRunnerProps) => {
  const [audioRef, setAudioRef] = useState<RefObject<HTMLAudioElement>>()
  const { isAudioLoading } = useAudioLoadingStore()

  const { currentQuestionIndex } = useQuestionStore()
  const { setCurrentQuestionIndex } = useQuestionStore()

  const { currentPartIndex, isShowingInstruction, setIsShowingInstruction } =
    useTestStore()
  const currentPart = parts[currentPartIndex] ?? parts[0] // Fallback to first

  const questionStartTimes = useMemo(() => {
    return (
      currentPart?.questions?.map((q) => {
        const [min, sec] = q.start_time.toString().split('.')
        return parseInt(min) * 60 + parseInt(sec || '0')
      }) ?? []
    )
  }, [currentPart])

  const handleNextPart = () => {
    setIsShowingInstruction(false)

    if (audioRef?.current && questionStartTimes.length > 0) {
      console.log('Jumping to time:', questionStartTimes[0], 'seconds')
      audioRef.current.currentTime = questionStartTimes[0]
      audioRef.current.play()
    }
  }

  return (
    <div className="w-full">
      <TestHeader />
      {/* Spacer for fixed header */}
      <div className="pt-[80px]"></div>
      {isAudioLoading && <Loading />}
      <div className="min-h-screen bg-gray-50 flex flex-col overflow-hidden">
        {/* Header bar */}
        <header className="bg-white border-b top-0">
          <div className="mb-4 mx-auto px-6">
            <div className="flex items-center justify-between">
              <Button variant="buff" size="sm" className="gap-2">
                <Boxes />
              </Button>
              <div className="flex items-center gap-4 font-bold font-lexend">
                <TestAudio
                  questionStartTimes={questionStartTimes}
                  onQuestionChange={(index) => {
                    setCurrentQuestionIndex(index)
                  }}
                  onAudioReady={(ref) => setAudioRef(ref)}
                />

                <Button
                  variant="buff"
                  size="sm"
                  className="opacity-100 pointer-events-none"
                >
                  <ClockFading></ClockFading>
                  2:00:00
                </Button>
                <Button variant="paleorange" className="text-white " size="sm">
                  Nộp bài
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 w-[90%] mx-auto py-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {' '}
            {isShowingInstruction ? (
              <>
                <PartInstruction part={currentPart} />
                <div className="flex justify-center mt-4">
                  <Button onClick={handleNextPart} variant="paleorange">
                    Next
                  </Button>
                </div>
              </>
            ) : (
              <div>
                {/* Need handle */}
                {currentPart?.questions?.[currentQuestionIndex] && (
                  <QuestionDisplay
                    key={currentPart.questions[currentQuestionIndex].id}
                    imageSrc={
                      currentPart.questions[currentQuestionIndex].imgSrc
                    }
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PartRunner
