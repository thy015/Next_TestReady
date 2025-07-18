export interface TestCollection {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  test: Test[]
}

export interface Test {
  id: string
  isActive: boolean
  name: string
  testCollectionId: string
  duration?: number
  timesUserTest: number
  parts?: Part[]
}

export type PartType = 'listening' | 'reading' | 'speaking' | 'writing'

export interface Part {
  id: string
  name: string
  type: PartType
  total_question: number
  end_time: number
  questions?: Question[]
}
type CorrectAnswer = 'a' | 'b' | 'c' | 'd'

export interface Question {
  id: string
  testId: string
  partId: string
  content: string
  imgSrc: string
  explanation: string
  correctAnswer: CorrectAnswer
  answers: string
  score: number
  start_time: number
}
