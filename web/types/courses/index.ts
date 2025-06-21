export type LessonType =
  | 'vocabulary'
  | 'grammar'
  | 'listening'
  | 'speaking'
  | 'writing'
  | 'reading'

export interface Course {
  id: string
  isFree: boolean
  isActive: boolean
  type: LessonType
  title: string
  image: string
  price: number
  discount: number
  category: {
    name: string
    level: string
  }
  userCourseRate: {
    totalUser: number
    totalRate: number
    rate: number
  }
}
