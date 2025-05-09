import { CourseList } from '@/components/pages/courses/CourseList'
import { CollectionList } from '@/components/pages/tests/CollectionList'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
export default function Home() {
  return (
    // Image background with text and button
    <div>
      <div className="relative w-full h-[320px]">
        <div className="w-full grid grid-cols-2 h-full">
          {/* left side */}
          <div className="col-span-1 flex flex-col items-start justify-center h-full">
            <div className="text-lg bg-light-blue text-white w-42 rounded-2xl flex justify-center">
              TOEIC Preparation
            </div>
            <div>
              <div>Nâng Cao Khả Năng Tiếng Anh</div>
              <div>Của Bạn Với TOEIC READY</div>
            </div>
            <div>
              Chuẩn bị toàn diện cho bài kiểm tra Tiếng Anh quan trọng. Hãy tham
              gia làm bài kiểm tra miễn phí và bắt đầu hành trình của bạn ngay
              hôm nay.
            </div>
            <div className="flex justify-center items-center">
              <Button variant={'paleorange'}>
                <Link href="/"> Bắt đầu ngay</Link>
                <ArrowRight></ArrowRight>
              </Button>
              <Button>
                <Link href="/courses">Khám phá khóa học</Link>
              </Button>
            </div>
          </div>
          <div className="col-span-1">
            <div>hi</div>
          </div>
        </div>
      </div>
      {/* Seperator */}
      <div className="h-48"></div>
      {/* Course list */}
      <div className="container mx-auto p-4">
        <div className="mt-16 sm:mt-0 font-bold text-primary text-xl">
          Các khóa học online nổi bật
        </div>
        <div className="text-lg">
          Giúp bạn nâng cao kĩ năng và định hướng mục tiêu thông qua các bài
          giảng trực tuyến
        </div>
        <div className="h-auto my-4">
          <CourseList />
        </div>
        <div className="flex justify-center items-center mr-8">
          <Link href="/courses">
            <Button variant={'paleorange'} className="w-64 h-10 cursor-pointer">
              Xem thêm
            </Button>
          </Link>
        </div>
      </div>
      {/* Test List */}
      <div className="container mx-auto p-4">
        <div className="mt-16 sm:mt-0 font-bold text-primary text-xl">
          Các bộ đề TOEIC mới nhất
        </div>
        <div className="mt-4">
          <CollectionList />
        </div>
      </div>
    </div>
  )
}
