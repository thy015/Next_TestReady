'use client'
import React, {
  RefObject,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from 'react'
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
  const { isAudioLoading, isAudioReady, setIsAudioReady } =
    useAudioLoadingStore()

  const { currentQuestionIndex, setCurrentQuestionIndex } = useQuestionStore()
  const {
    currentPartIndex,
    isShowingInstruction,
    setIsShowingInstruction,
    setIsUserClickedNextInstruction,
  } = useTestStore()

  const currentPart = parts[currentPartIndex] ?? parts[0]
  // Counting times
  const questionStartTimes = useMemo(() => {
    return (
      currentPart?.questions?.map((m) => {
        const minutes = parseFloat(m.start_time.toString().split('.')[0]) || 0
        const seconds = parseFloat(m.start_time.toString().split('.')[1]) || 0
        return minutes * 60 + seconds
      }) ?? []
    )
  }, [currentPart])
  //reset
  useEffect(() => {
    setIsShowingInstruction(true)
    setCurrentQuestionIndex(0)
    setIsUserClickedNextInstruction(false)
  }, [currentPartIndex])

  // Check if audio is ready
  const handleAudioReady = useCallback((ref: RefObject<HTMLAudioElement>) => {
    console.log('Audio is ready for playback')
    setAudioRef(ref)
    setIsAudioReady(true)
  }, [])

  const handleNextPart = useCallback(() => {
    console.log('handleNextPart called')
    console.log('audioRef:', audioRef)
    console.log('isAudioReady:', isAudioReady)
    console.log('questionStartTimes:', questionStartTimes)

    setIsShowingInstruction(false)
    setIsUserClickedNextInstruction(true)
    // Add delay to ensure state updates are processed
    setTimeout(() => {
      if (audioRef?.current && isAudioReady && questionStartTimes.length > 0) {
        const audio = audioRef.current
        const startTime = questionStartTimes[0]

        console.log('Setting audio time to:', startTime)
        audio.currentTime = startTime

        // Ensure audio is ready before playing
        if (audio.readyState >= 2) {
          audio
            .play()
            .then(() => {
              console.log('Audio playback started successfully')
            })
            .catch((error) => {
              console.error('Audio play failed:', error)
              audio.currentTime = 0
              audio.play().catch(console.error)
            })
        } else {
          console.warn(
            'Audio not ready for playback, readyState:',
            audio.readyState
          )
        }
      } else {
        console.warn('Audio not ready or no start times available')
      }
    }, 100)
  }, [audioRef, isAudioReady, questionStartTimes, setIsShowingInstruction])


  return (
    <div className="w-full">
      <TestHeader />
      <div className="pt-[80px]"></div>
      {isAudioLoading && (
        <Loading />
      ) }
        <div className="min-h-screen bg-gray-50 flex flex-col overflow-hidden">
          <header className="bg-white border-b top-0">
            <div className="mb-4 mx-auto px-6">
              <div className="flex items-center justify-between">
                <Button variant="buff" size="sm" className="gap-2">
                  <Boxes />
                </Button>
                <div className="flex items-center gap-4 font-bold font-lexend">
                  <TestAudio
                    questionStartTimes={questionStartTimes}
                    onQuestionChange={setCurrentQuestionIndex}
                    onAudioReady={handleAudioReady}
                  />

                  <Button
                    variant="buff"
                    size="sm"
                    className="opacity-100 pointer-events-none"
                  >
                    <ClockFading />
                    2:00:00
                  </Button>
                  <Button variant="paleorange" className="text-white" size="sm">
                    Nộp bài
                  </Button>
                </div>
              </div>
            </div>
          </header>

          <div className="flex-1 w-[90%] mx-auto py-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {isShowingInstruction ? (
                <>
                  <PartInstruction part={currentPart} />
                  <div className="flex justify-center mt-4">
                    <Button
                      onClick={handleNextPart}
                      variant="paleorange"
                      disabled={!isAudioReady}
                    >
                      Next
                    </Button>
                  </div>
                </>
              ) : (
                <div>
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
