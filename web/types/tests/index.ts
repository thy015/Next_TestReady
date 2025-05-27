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
  title: string
  duration: number
  createdAt: string
  updatedAt: string
  timesUserTest: number
}
