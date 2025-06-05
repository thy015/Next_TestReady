"use client"
import React, { useEffect, useRef, useState } from 'react'
import { Boxes, ClockFading } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function TestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [volume, setVolume] = useState(1)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // Wait for audio to load enough to seek
    const handleCanPlay = () => {
      audio.currentTime = 9
      audio.play()

      // Stop at 30s
      const stopTimeout = setTimeout(() => {
        audio.pause()
      }, (30 - 9) * 1000)

      return () => clearTimeout(stopTimeout)
    }

    audio.addEventListener('canplay', handleCanPlay)

    return () => {
      audio.removeEventListener('canplay', handleCanPlay)
    }
  }, [])

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Fixed Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto py-4 px-6">
          <div className="flex items-center justify-between">
            <Button variant="buff" size="lg" className="gap-2">
              <Boxes />
            </Button>
            <div className="flex items-center gap-4 font-bold font-lexend">
               <div>
                {/* Hidden audio element */}
                <audio
                  ref={audioRef}
                  src="/audios/ETS2024_Test1.mp3"
                  hidden
                  preload="auto"
                />
                {/* Volume control */}
                <div className="flex items-center gap-2 mt-2">
                  <span>🔈</span>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={volume}
                    onChange={handleVolumeChange}
                  />
                  <span>🔊</span>
                </div>
              </div>
              <Button variant='buff' size='lg' className='opacity-100 pointer-events-none'>
                <ClockFading></ClockFading>
                2:00:00</Button>
              <Button variant="paleorange" className='text-white ' size="lg">
                Nộp bài
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto py-6 px-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
