import { CourseList } from '@/components/pages/courses/CourseList'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
export default function Home() {
  return (
    // Image background with text and button
    <div>
      <div className="relative w-full h-[64]">
        <Image
          src="/images/study.jpg"
          alt="Background"
          width={5621}
          height={3748}
          className="w-full h-[320px] sm:h-64 object-cover absolute"
        />

        <div className="relative z-10 container mx-auto h-full p-4">
          <div className="grid grid-cols-4 h-full items-center">
            <div className="col-span-3 lg:col-span-2 text-2xl border-2 border-paleorange border-dashed p-4">
              <div>Muốn biết khả năng</div>
              <strong>TOEIC của bạn đến đâu?</strong>
              <div className="mt-4">
                <div>
                  Thử sức{' '}
                  <span className="text-dark-cyan font-bold">miễn phí</span>,
                  biết điểm{' '}
                  <span className="text-dark-cyan font-bold"> tức thì !</span>
                </div>
              </div>
              <Button variant={'paleorange'} className="mt-6 w-40 text-lg h-12">
                <Link href="/">Bắt đầu ngay</Link>
              </Button>
            </div>
            <div className="hidden lg:flex col-span-2">
              <Image
                src="/images/readingbook.svg"
                alt="Logo"
                width={710}
                height={789}
                className="w-64 h-44"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Seperator */}
      <div className="h-48"></div>
      {/* Course list */}
      <div className="container mx-auto w-full h-[500px] p-4 mt-8">
        <CourseList />
      </div>
    </div>
  )
}
