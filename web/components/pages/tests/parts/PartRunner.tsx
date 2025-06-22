'use client'
import React from 'react'
import PartInstruction from './PartInstruction'
import { PartDisplay } from './PartDisplay'
import { Part } from '@/types/tests'
import { useTestStore } from '@/store/loading-store'
import { Button } from '@/components/ui/button'

interface TestPartRunnerProps {
  parts: Part[]
}

const PartRunner = ({ parts }: TestPartRunnerProps) => {
  const {
    currentPartIndex,
    isShowingInstruction,
    setIsShowingInstruction,
    setCurrentPartIndex,
  } = useTestStore()

  const currentPart = parts[currentPartIndex] ?? parts[0] // Fallback to first

  //   const handleAudioComplete = () => {
  //     setIsShowingInstruction(false)
  //   }

  const handleNextPart = () => {
    if (currentPartIndex < parts.length - 1) {
      setCurrentPartIndex(currentPartIndex + 1)
      setIsShowingInstruction(true)
    } else {
      alert('Test complete! 🎉')
    }
  }

  return (
    <div className="w-full">
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
          <PartDisplay imageSrc={currentPart.name} />
        </div>
      )}
    </div>
  )
}

export default PartRunner
