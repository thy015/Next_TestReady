import React from 'react'
import { TestRadio } from '@/components/pages/tests/TestRadio'
import { TestApi } from '@/apis/tests'
import { convertImageToImageLink } from '@/utils'
import { Test } from '@/types/tests'
interface PartDisplayProps{
  test?:Test
}
const PartDisplay = async({test}:PartDisplayProps) => {
  // image handle
  const testApi = new TestApi()
  const buffer = await testApi.getPart1Image()
  const imageSrc=convertImageToImageLink(buffer)
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
export default PartDisplay
