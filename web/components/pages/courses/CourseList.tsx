import Loading from '@/app/loading'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-dropdown-menu'
import React, { Suspense } from 'react'

const courseCard = () => {
  return <div>
    <Card className="w-[350px] border-primary">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Framework</Label>
            </div>
          </div>
        </form>
      </CardContent>
</Card>
</div>
}

const CourseCard = React.lazy(() => Promise.resolve({ default: courseCard }))

const CourseList = () => {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <CourseCard />
      </Suspense>
    </div>
  )
}

export { CourseList, CourseCard }
