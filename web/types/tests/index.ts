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

export enum PartType {
  Listening = 'listening',
  Reading = 'reading',
}

export interface Part {
  id: string
  name: string
  type: PartType
  total_question: number
  duration?: number
}
