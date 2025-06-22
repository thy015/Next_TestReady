"use client"
import React from 'react'
import { TestRadio } from '@/components/pages/tests/TestRadio'
import { Part, Test } from '@/types/tests'
// the part display in test page -- display image src for testing purpose
interface TestProps {
  test?:Test
  imageSrc:string
}
const PartDisplay = ({imageSrc}:TestProps) => {
  return (
    <div className="grid grid-cols-2">
      {/*Ques*/}
      <div className="col-span-1 flex-center">
        <img src={imageSrc} alt={'test'}/>
      </div>
      {/*Ans*/}
      <div className="col-span-1 p-4">
        <div>1/....</div>
        <div className='p-4'>
          <TestRadio/>
        </div>
      </div>{' '}
    </div>
  )
}
// the part card display in test categories
interface PartCardProps {
  part: Part
}
const PartCard = ({ part }: PartCardProps) => {
  const partNameMap: Record<string, string> = {
    p1: 'Part 1',
    p2: 'Part 2',
    p3: 'Part 3',
    p4: 'Part 4',
    p5: 'Part 5',
    p6: 'Part 6',
    p7: 'Part 7',
  };

  return (
    <div className="neumorphic-button rounded-md w-[32%] sm:w-[30%] lg:w-[24%] h-10 text-primary font-semibold font-lexend flex items-center justify-center">
      {partNameMap[part.name] ?? 'No name'}
    </div>
  )
}
export { PartCard , PartDisplay}
