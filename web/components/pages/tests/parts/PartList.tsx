import { Part, Test } from '@/types/tests'
import React from 'react'
interface PartListProps {
  parts: Test['parts']
}
interface PartCardProps {
  part: Part
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

const PartCard = ({ part }: PartCardProps) => {
  return (
    <div className="neumorphic-button  rounded-md w-[32%] sm:w-[30%] lg:w-[24%] h-10 text-primary font-semibold font-lexend flex items-center justify-center">
      {part.name ?? 'No name'}
    </div>
  )
}

export default PartList
