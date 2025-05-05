export interface TestCollection {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  image: string
  test: Test[]
}

export interface Test {
  id: string
  isActive: boolean
  title: string
  image: string
  duration: number
  createdAt: string
  updatedAt: string
  timesUserTest: number
}
