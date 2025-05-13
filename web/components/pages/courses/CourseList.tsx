'use client'
import Loading from '@/app/loading'
import React, { Suspense } from 'react'
import { CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import Link from 'next/link'
import { Course } from '@/types/courses'
import { courses } from './data'
import {
  adjustFinalPrice,
  formatPrice,
  matchingColor,
  upperCaseFirstLetter,
} from '@/utils'
import { Button } from '@/components/ui/button'

interface CourseCardProps {
  course: Course
}
const CourseCard = ({ course }: CourseCardProps) => {
  const colorMatched = matchingColor(course.type)
  const [bgColor, borderColor] = colorMatched.split(' ')

  return (
    <>
      {/* Badge */}
      <div
        className={`${bgColor} w-32 text-white items-center flex justify-center rounded-tl-2xl rounded-tr-2xl font-semibold h-8`}
      >
        {upperCaseFirstLetter(course.type)}
      </div>
      {/* Card */}
      <div className={`w-[300px] h-auto border-2 ${borderColor}`}>
        <CardContent className="flex flex-col">
          <div className="relative w-full h-[150px] my-4">
            <Image
              src={course.image}
              alt="Test Image"
              fill
              className="object-cover"
              priority
            />
          </div>
          <Badge className={`${bgColor} text-md mb-2 rounded-3xl`}>
            {course.category.level}
          </Badge>
          <strong>{course.title}</strong>
          <div className="flex items-center mt-2">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <Star className="h-5 w-5 text-yellow-400" />
            <span className="text-sm text-muted-foreground ml-2">(10)</span>
            <span className="text-sm ml-1">
              {course.userCourseRate.totalUser} Học viên{' '}
            </span>
          </div>
          <div className="gap-2 flex mt-2 items-center mb-4">
            <span className="text-primary text-xl font-semibold">
              {formatPrice(adjustFinalPrice(course.price, course.discount))}
            </span>
            <span className="line-through text-gray-500">
              {formatPrice(course.price)}
            </span>
            <span className="bg-destructive rounded-lg text-white text-sm h-6 w-12 font-semibold items-center flex justify-center">
              -{course.discount}%
            </span>
          </div>
          <Button className={`w-full ${bgColor} text-lg font-[900] mb-8`}>
            Mua Ngay
          </Button>
        </CardContent>
      </div>
    </>
  )
}

const CourseList = () => {
  const [sliceCount, setSliceCount] = React.useState(4)

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 760) {
        setSliceCount(2)
      } else if (width < 1025) {
        setSliceCount(4)
      } else if (width < 1280) {
        setSliceCount(3)
      } else {
        setSliceCount(4)
      }
    }

    // Set initial value
    handleResize()

    // Add event listener
    window.addEventListener('resize', handleResize)

    // Clean up
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const filterCourse = courses
    .filter((course) => course.isActive)
    .slice(0, sliceCount)
  return (
    <div className="flex justify-center flex-col items-center sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-2 lg:gap-4">
      <Suspense fallback={<Loading />}>
        {filterCourse.map((course) => (
          <div key={course.id} className="mt-4 sm:mt-0">
            <Link href={`/courses/${course.id}`}>
              <CourseCard course={course} />
            </Link>
          </div>
        ))}
      </Suspense>
    </div>
  )
}

export { CourseList, CourseCard }
