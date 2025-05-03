import Loading from '@/app/loading'
import React, { Suspense } from 'react'
import Image from 'next/image'
import { MessageSquareText, SquarePen } from 'lucide-react'
const TestCard = () => {
  return (
    <div className="w-64 h-40">
      <div className="relative w-64 h-40">
        <Image
          src="/images/study.jpg"
          alt="Study Background"
          fill
          className="object-cover"
          priority
          quality={85}
        />
      </div>
      <div className="mt-2 flex items-center justify-center font-medium text-xl text-primary">
        ETS 2024
      </div>
      <div className="flex items-center justify-center gap-2">
        <SquarePen className="text-muted-foreground" /> <div>1568</div>
        <div className="text-muted-foreground"> | </div>
        <MessageSquareText className="text-muted-foreground" /> <div>123</div>
      </div>
    </div>
  )
}

const TestList = () => {
  return (
    <Suspense fallback={<Loading />}>
      <TestCard />
    </Suspense>
  )
}

export { TestList, TestCard }
