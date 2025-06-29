import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { ClockFading } from 'lucide-react'

const CountDownClock = () => {
  // Init the timer with 2 hours (7200 secs)
  const initialTime = 2 * 60 * 60
  const [timeLeft, setTimeLeft] = useState(initialTime)

  // Update the timer every second
  useEffect(() => {
    if (timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  // Format time as HH:MM:SS
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <Button
      variant="buff"
      size="sm"
      className="opacity-100 pointer-events-none"
    >
      <ClockFading />
      {formatTime(timeLeft)}
    </Button>
  )
}

export default CountDownClock
