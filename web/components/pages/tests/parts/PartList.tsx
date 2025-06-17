import { Test } from '@/types/tests'
import React from 'react'
import { PartCard, PartDisplay } from '@/components/pages/tests/parts/PartDisplay'
import { convertImageToImageLink } from '@/utils'
import { TestApi } from '@/apis/tests'
// the part fetch in test page
interface PartProps{
  test?:Test
}
const PartFetchServer=async({test}:PartProps)=>{
  if(!test){
    return 'No test, server error in partfetchserver'
  }
  // image handle
  const testApi = new TestApi()
  const buffer = await testApi.getPart1Image()
  const imageSrc=convertImageToImageLink(buffer)
  return <PartDisplay imageSrc={imageSrc} test={test} />
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



export {PartList,PartFetchServer}
