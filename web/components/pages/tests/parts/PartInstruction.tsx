import React from 'react'
import { Part } from '@/types/tests'

interface PartProps {
  part: Part
}

const PartInstruction = ({ part }: PartProps) => {
  let imageSrc = ''

  switch (part.name) {
    case 'Part 1':
      //dynamic part 1 img here
      break
    case 'Part 2':
      imageSrc = '/images/instruction/part2.png'
      break
    case 'Part 3':
      imageSrc = '/images/instruction/part3.png'
      break
    case 'Part 4':
      imageSrc = '/images/instruction/part4.png'
      break
    case 'Part 5':
      imageSrc = '/images/instruction/part5.png'
      break
    case 'Part 6':
      imageSrc = '/images/instruction/part6.png'
      break
    case 'Part 7':
      imageSrc = '/images/instruction/part7.png'
      break
    default:
      return <div>No instruction available.</div>
  }

  return (
    <div className="w-full flex justify-center">
      <img src={imageSrc} alt={`Instruction for ${part.name}`} className="max-w-full h-auto" />
    </div>
  )
}

export default PartInstruction
