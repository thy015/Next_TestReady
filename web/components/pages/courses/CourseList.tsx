import Loading from '@/app/loading'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import React, { Suspense } from 'react'

const courseCard = () => {
  return (
    <div>
      <Card className="w-[300px] h-auto border-primary">
        <CardContent>
          <Image
            src="/images/test1.png"
            alt="Test Image"
            width={190}
            height={71}
            className="w-full h-24 mb-4"
          />
          <strong>
            [Complete TOEIC] Chiến lược làm bài - Từ vựng - Ngữ pháp - Luyện
            nghe với Dictation [Tặng khoá TED Talks]
          </strong>
        </CardContent>
      </Card>
    </div>
  )
}

const CourseCard = React.lazy(() => Promise.resolve({ default: courseCard }))

const CourseList = () => {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <CourseCard />
      </Suspense>
    </div>
  )
}

export { CourseList, CourseCard }
