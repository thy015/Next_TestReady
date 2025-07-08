'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '../../ui/button'
import { useAudioLoadingStore } from '@/store/loading-store'
import { useQuestionStore, useTestStore } from '@/store/test-store'
import { Alert } from '@/components/ui/alert'
interface TestAudioProps {
  questionStartTimes: number[]
  onAudioReady: (audioRef: React.RefObject<HTMLAudioElement>) => void
  partEndTimes: number
}

export default function TestAudio({
  questionStartTimes,
  onAudioReady,
  partEndTimes,
}: TestAudioProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [volume, setVolume] = useState(1)
  const [showExitModal, setShowExitModal] = useState(false)

  const { isAudioReady, setIsAudioReady } = useAudioLoadingStore()

  const {
    currentPartIndex,
    setIsShowingInstruction,
    setCurrentPartIndex,
    isTestCompleted,
    setIsTestCompleted,
  } = useTestStore()

  const { setCurrentQuestionIndex } = useQuestionStore()

  // Browser navigation handling
  useEffect(() => {
    window.history.pushState({ preventBack: true }, '', window.location.href)
    const handlePopstate = () => setShowExitModal(true)
    window.addEventListener('popstate', handlePopstate)
    return () => {
      window.removeEventListener('popstate', handlePopstate)
    }
  }, [])

  // Handle when audio is fully ready to play
  const handleCanPlayThrough = useCallback(() => {
    const audio = audioRef.current
    if (audio && !isAudioReady) {
      console.log('Audio fully loaded and ready to play')

      audio.currentTime = 9
      audio.volume = volume

      setIsAudioReady(true)
      onAudioReady(audioRef as React.RefObject<HTMLAudioElement>)

      audio.play().catch((error) => {
        console.error('Audio play failed:', error)
      })
    }
  }, [isAudioReady, volume, onAudioReady, setIsAudioReady])
  // Handle audio loading progress
  const handleProgress = () => {
    const audio = audioRef.current
    if (audio) {
      const buffered = audio.buffered
      if (buffered.length > 0) {
        const loadedPercentage = (buffered.end(0) / audio.duration) * 100
        console.log(`Audio loading progress: ${loadedPercentage.toFixed(1)}%`)
      }
    }
  }

  // Check if audio is ready on mount
  useEffect(() => {
    const audio = audioRef.current
    if (audio && audio.readyState >= 2 && !isAudioReady) {
      console.log('Audio was already ready on mount')
      handleCanPlayThrough()
    }
  }, [isAudioReady, handleCanPlayThrough])

  // Audio time tracking for question changes
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !isAudioReady || questionStartTimes.length === 0) return

    let currentQuestion = 0
    console.log('Question start times:', questionStartTimes)

    const interval = setInterval(() => {
      const time = audio.currentTime
      // Hide instruction once audio reaches the first question
      if (questionStartTimes[0] && time >= questionStartTimes[0] - 0.5) {
        setIsShowingInstruction(false)
      }

      if (currentQuestion < questionStartTimes.length - 1) {
        const nextStart = questionStartTimes[currentQuestion + 1]

        // Move to the next question if reached the next start time
        if (time >= nextStart - 0.5) {
          currentQuestion++
          console.log(
            `Switching to question ${currentQuestion} at time ${time}`
          )
          setCurrentQuestionIndex(currentQuestion)
        }
      } else if (
        currentQuestion === questionStartTimes.length - 1 &&
        partEndTimes !== null &&
        time >= partEndTimes - 0.5
      ) {
        // Last question of the current part
        const nextIndex = currentPartIndex + 1

        if (nextIndex < 7) {
          setIsShowingInstruction(true)
          setCurrentPartIndex(nextIndex)
          setCurrentQuestionIndex(0)
        } else {
          // Test is completed
          setIsTestCompleted(true)
          audio.pause()
          setIsShowingInstruction(false)
          clearInterval(interval)
        }
      }
    }, 500)

    return () => clearInterval(interval)
  }, [
    questionStartTimes,
    setCurrentQuestionIndex,
    isAudioReady,
    setIsShowingInstruction,
    setCurrentPartIndex,
    setIsTestCompleted,
    currentPartIndex,
    partEndTimes,
  ])

  const handleExitConfirm = () => {
    setShowExitModal(false)
    window.history.go(-2)
  }

  const handleExitCancel = () => {
    setShowExitModal(false)
  }

  return (
    <>
      {showExitModal && (
        <Dialog
          open={showExitModal}
          onOpenChange={(open) => !open && handleExitCancel()}
        >
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>TEST READY</DialogTitle>
              <DialogDescription>
                Bạn có chắc muốn rời khỏi bài test? Tiến trình của bạn sẽ không
                được lưu.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={handleExitCancel}>
                Hủy
              </Button>
              <Button variant="destructive" onClick={handleExitConfirm}>
                Xác nhận
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <div className="flex items-center gap-2 mt-2">
        <audio
          ref={audioRef}
          src="/audios/ETS2024_Test1.mp3"
          preload="auto"
          onCanPlayThrough={handleCanPlayThrough}
          onProgress={handleProgress}
          onLoadedMetadata={() => console.log('Audio metadata loaded')}
          onError={(e) => {
            console.error('Audio loading error:', e)
            setIsAudioReady(false)
          }}
          onStalled={() => console.warn('Audio loading stalled')}
        />
        <span>🔈</span>
        <input
          className="w-32"
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => {
            const vol = parseFloat(e.target.value)
            setVolume(vol)
            if (audioRef.current) {
              audioRef.current.volume = vol
            }
          }}
        />
        <span>🔊</span>
      </div>
      {isTestCompleted && <Alert variant="default">Test completed!</Alert>}
    </>
  )
}
