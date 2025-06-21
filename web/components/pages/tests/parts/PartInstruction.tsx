'use client'
import React from 'react'
import { Part } from '@/types/tests'
import Image from 'next/image'

interface PartProps {
  part: Part
}

const PartInstruction = ({ part }: PartProps) => {
  let imageSrc = ''
  console.log('PartInstruction', part.name)
  switch (part.name) {
    case 'p1':
      //dynamic part 1 img here
      imageSrc = '/images/instruction/part1.png'
      break
    case 'p2':
      imageSrc = '/images/instruction/part2.png'
      break
    case 'p3':
      imageSrc = '/images/instruction/part3.png'
      break
    case 'p4':
      imageSrc = '/images/instruction/part4.png'
      break
    case 'p5':
      imageSrc = '/images/instruction/part5.png'
      break
    case 'p6':
      imageSrc = '/images/instruction/part6.png'
      break
    case 'p7':
      imageSrc = '/images/instruction/part7.png'
      break
    default:
      return <div>No instruction available.</div>
  }

  return (
    <div className="w-full flex justify-center">
      <Image
        src={imageSrc}
        alt={`Instruction for ${part.name}`}
        className="max-w-full h-auto"
        width={700}
        height={300}
      />
    </div>
  )
}

export default PartInstruction
