'use client'
import Loading from '@/app/loading'
import React, { useEffect, useRef, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from './ui/button'
import { useAudioLoadingStore } from '@/store/loading-store'

export default function TestAudio() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [volume, setVolume] = useState(1)
  const [loaded, setLoaded] = useState(false)
  const [showExitModal, setShowExitModal] = useState(false)
  const { isAudioLoading, setAudioLoading } = useAudioLoadingStore()

  useEffect(() => {
    // Push a dummy state to intercept back navigation
    window.history.pushState({ preventBack: true }, '', window.location.href)

    //back
    const handlePopstate = () => {
      setShowExitModal(true)
    }

    //load
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = 'hi'
    }

    window.addEventListener('popstate', handlePopstate)
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('popstate', handlePopstate)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  //load audio
  const handleLoadedMetadata = () => {
    const audio = audioRef.current
    if (audio) {
      audio.currentTime = 9
      audio.volume = volume
      audio.play().catch(() => {})
      setLoaded(true)
      setAudioLoading(false)

      const interval = setInterval(() => {
        if (audio.currentTime >= 98) {
          audio.pause()
          clearInterval(interval)
        }
      }, 1000)

      return () => clearInterval(interval)
    }
  }

  useEffect(() => {
    const fallback = setTimeout(() => {
      if (!loaded) setAudioLoading(false)
    }, 1000)
    return () => clearTimeout(fallback)
  }, [loaded, setAudioLoading])

  const handleExitConfirm = () => {
    setShowExitModal(false)
    window.history.go(-2)
  }

  const handleExitCancel = () => {
    setShowExitModal(false)
  }

  return (
    <>
      {isAudioLoading && <Loading />}

      {showExitModal && (
        <Dialog
          open={showExitModal}
          onOpenChange={(open) => !open && handleExitCancel()}
        >
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>TOEIC READY</DialogTitle>
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
          onLoadedMetadata={handleLoadedMetadata}
        />
        <span>🔈</span>
        <input
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
    </>
  )
}
