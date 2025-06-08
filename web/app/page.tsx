'use client'
import { CourseList } from '@/components/pages/courses/CourseList'
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
    <div
      style={{
        backgroundImage: "url('/images/banner.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Image background with slideshow*/}

      <div className="relative w-full h-auto flex-center flex-col pt-20 md:pt-30">
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
              <Button variant={'paleorange'} className="text-white" size={'lg'}>
                <Link href="/tests"> Bắt đầu ngay</Link>
                <ArrowRight></ArrowRight>
              </Button>
              <Button size={'lg'}>
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
        {/* Gradient Ratio */}
        <div className="py-12 h-[40%] w-[86%] ">
          <div className="p-2 bg-white flex items-center justify-center rounded-2xl">
            <div className="grid grid-cols-4 w-full text-sky-800">
              <div className="col-span-1 flex flex-col items-center justify-center">
                <div className="text-2xl font-bold">1000+</div>
                <div className="text-md">Học viên</div>
              </div>
              <div className="col-span-1 flex flex-col items-center justify-center">
                <div className="text-2xl font-bold">95%</div>
                <div className="text-md">Tỉ lệ đạt Aim</div>
              </div>
              <div className="col-span-1 flex flex-col items-center justify-center">
                <div className="text-2xl font-bold">200+</div>
                <div className="text-md">Bài test</div>
              </div>
              <div className="col-span-1 flex flex-col items-center justify-center">
                <div className="text-2xl font-bold">4.8</div>
                <div className="text-md">Đánh giá</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Introduce skill */}
      <div className="bg-white rounded-b-lg">
        <IntroduceSkill />
      </div>
      {/* Course list */}
      <div className="bg-white rounded-lg">
        <div className="container mx-auto p-4 sm:my-10">
          <div className="flex justify-between items-center mb-10">
            <div>
              <div className="font-bold text-primary text-2xl">
                Các khóa học online nổi bật
              </div>
              <div className="text-lg">
                Giúp bạn nâng cao kĩ năng và định hướng mục tiêu thông qua các
                bài giảng trực tuyến
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
      </div>
      {/* Emphasize Free Testing */}
      <div className="bg-paleorange w-full h-auto sm:h-72 rounded-t-lg">
        <div className="container h-full mx-auto p-4 text-white flex flex-col sm:grid sm:grid-cols-2">
          {/* left side */}
          <div className="flex flex-col pt-4 items-center justify-center text-justify mb-8 sm:items-start sm:col-span-1 sm:text-left sm:mb-0">
            <div className="text-2xl font-bold my-2">
              Sẵn sàng cho bài test TOEIC của bạn chưa ?
            </div>
            <div>
              Tham gia bài kiểm tra đánh giá miễn phí của chúng tôi và khám phá
              trình độ TOEIC hiện tại của bạn. Nhận các gợi ý cá nhân hóa để cải
              thiện.
            </div>
            <Button
              variant={'ghost'}
              className="w-40 h-10 cursor-pointer bg-white text-paleorange font-bold mt-2"
            >
              <Link href="/tests">Bắt đầu ngay</Link>
            </Button>
          </div>
          {/* Right side */}
          <div className="sm:col-span-1 flex items-center justify-center">
            <div className="font-mogra flex flex-col">
              <div className="text-4xl transform -rotate-5 mb-3">Ready for</div>
              <div className="text-7xl">TOEIC ?</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
