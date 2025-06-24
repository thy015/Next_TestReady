import { TestRadio } from '../../TestRadio'
import Image from 'next/image'

interface QuestProps {
  imageSrc: string
}
const QuestionDisplay = ({ imageSrc }: QuestProps) => {
  return (
    <div className="grid grid-cols-2">
      {/*Ques*/}
      <div className="col-span-1 flex-center">
        <Image src={imageSrc} alt={'test'} width={400} height={400} />
      </div>
      {/*Ans*/}
      <div className="col-span-1 p-4">
        <div>1/....</div>
        <div className="p-4">
          <TestRadio />
        </div>
      </div>{' '}
    </div>
  )
}

export { QuestionDisplay }
