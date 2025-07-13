import { Test } from '@/types/tests'
import React from 'react'
import { PartCard } from '@/components/pages/tests/parts/PartDisplay'
import PartRunner from '@/components/pages/tests/parts/PartRunner'

// the part fetch in test page
interface PartProps {
  test?: Test
}
const PartFetchServer = async ({ test }: PartProps) => {
  if (!test || !test.parts || test.parts.length === 0) {
    return 'No test, server error in partfetchserver'
  }
  const parts = test.parts
  console.log('Parts fetched:', parts)

  return <PartRunner parts={parts}></PartRunner>
}

// the part card fetch in test categories
interface PartListProps {
  parts: Test['parts']
}
const PartList = ({ parts }: PartListProps) => {
  if (!parts) {
    return <div>Không có bài test</div>
  }
  return (
    <div className="flex-center border p-4 flex-wrap gap-2 cursor-pointer">
      {parts.map((part, idx) => (
        <PartCard key={part.id ?? idx} part={part} />
      ))}
    </div>
  )
}

export { PartList, PartFetchServer }
