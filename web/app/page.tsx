'use client'
import { CourseList } from '@/components/pages/courses/CourseList'
import { CollectionList } from '@/components/pages/tests/CollectionList'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BookOpen, Dot } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import IntroduceSkill from '@/components/pages/not-defined/IntroduceSkill'
export default function Home() {
  // slide show
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const imageSlideShowLink = useMemo(
    () => [
      '/images/woman-teach-english.jpg',
      '/images/woman-teach-english-2.jpg',
      '/images/man-learn-english.jpg',
    ],
    []
  )
  const handleDotClick = (index: number) => {
    setCurrentImageIndex(index)
  }

  useEffect(() => {
    const i = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % imageSlideShowLink.length
      )
    }, 3000)
    return () => clearInterval(i)
  }, [imageSlideShowLink])

  return (
    <div>
      {/* Seperator */}
      <div className="h-[96px]"></div>
      {/* Image background with slideshow*/}
      <div className="relative w-full h-auto md:h-[400px] bg-gradient-to-r from-[#0b4c71] to-[#04669c]">
        <div className="w-full flex flex-col md:grid md:grid-cols-2 h-full ">
          {/* Left side */}
          <div className="md:col-span-1  mt-8 md:mt-0 flex flex-col items-start justify-center h-full pl-10 lg:pl-20 xl:pl-30 text-white ">
            <div className="text-lg bg-light-blue text-white w-42 rounded-2xl flex justify-center">
              TOEIC Preparation
            </div>
            <div className="text-3xl py-4">
              <div>Nâng Cao Khả Năng Tiếng Anh</div>
              <div>
                Của Bạn Với <span className="font-bold"> TOEIC READY</span>
              </div>
            </div>
            <div className="max-w-[80%] text-justify">
              Chuẩn bị toàn diện cho bài kiểm tra Tiếng Anh quan trọng. Hãy tham
              gia làm bài kiểm tra miễn phí và bắt đầu hành trình của bạn ngay
              hôm nay.
            </div>
            <div className="flex justify-center items-center mt-4 gap-4">
              <Button variant={'paleorange'} className="text-white">
                <Link href="/"> Bắt đầu ngay</Link>
                <ArrowRight></ArrowRight>
              </Button>
              <Button>
                <Link href="/courses">Khám phá khóa học</Link>
                <BookOpen />
              </Button>
            </div>
          </div>
          {/* Right side */}
          <div className="md:col-span-1 flex justify-center mt-8 md:mt-0">
            <div className="w-[420px] h-full flex items-center justify-end flex-col">
              <Image
                src={imageSlideShowLink[currentImageIndex]}
                alt="slide show image"
                width={6000}
                height={4000}
                className="object-cover w-full h-72"
              />
              <div className="flex flex-row">
                {imageSlideShowLink.map((_, index) => (
                  <span key={index}>
                    <Dot
                      size={40}
                      className={`text-white ${
                        currentImageIndex === index
                          ? 'opacity-100'
                          : 'opacity-50'
                      } cursor-pointer`}
                      onClick={() => handleDotClick(index)}
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Gradient Ratio */}
      <div className="h-48 w-full bg-gradient-to-r from-[#0b4c71] to-[#04669c] flex items-center justify-center">
        <div className="bg-gradient-to-r from-[#245e80] to-[#1e77a8] h-[40%] w-[86%] flex items-center justify-center rounded-2xl">
          <div className="grid grid-cols-4 w-full">
            <div className="col-span-1 text-white flex flex-col items-center justify-center">
              <div className="text-2xl font-bold">1000+</div>
              <div className="text-md">Học viên</div>
            </div>
            <div className="col-span-1 text-white flex flex-col items-center justify-center">
              <div className="text-2xl font-bold">95%</div>
              <div className="text-md">Tỉ lệ đạt Aim</div>
            </div>
            <div className="col-span-1 text-white flex flex-col items-center justify-center">
              <div className="text-2xl font-bold">200+</div>
              <div className="text-md">Bài test</div>
            </div>
            <div className="col-span-1 text-white flex flex-col items-center justify-center">
              <div className="text-2xl font-bold">4.8</div>
              <div className="text-md">Đánh giá</div>
            </div>
          </div>
        </div>
      </div>
      {/* Introduce skill */}
      <IntroduceSkill />
      {/* Course list */}
      <div className="container mx-auto p-4 sm:my-10">
        <div className="flex justify-between items-center mb-10">
          <div>
            <div className="font-bold text-primary text-2xl">
              Các khóa học online nổi bật
            </div>
            <div className="text-lg">
              Giúp bạn nâng cao kĩ năng và định hướng mục tiêu thông qua các bài
              giảng trực tuyến
            </div>
          </div>

          <Button variant={'ghost'} className="w-40 h-10 cursor-pointer">
            <Link href="/courses">Xem thêm</Link>
            <ArrowRight />
          </Button>
        </div>

        <div className="h-auto my-4">
          <CourseList />
        </div>
      </div>
      {/* Emphasize Free Testing */}
      <div className="bg-paleorange w-full h-64">
        <div className="container mx-auto p-4 text-white">
          {/* left side */}
          <div>
            <div className="text-2xl font-bold">
              Bắt đầu làm bài test miễn phí
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
