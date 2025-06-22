import { AppTestDialog } from '@/components/app-test-dialog'
import { Test } from '@/types/tests'

interface TestCardProps {
  test: Test
  collectionName: string
}

const TestCard = ({ test }: TestCardProps) => {
  if (!test) {
    return (
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <p className="text-red-500">Test data not available.</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg neumorphic-card text-card-foreground shadow-sm hover:shadow-md transition-all">
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{test.name}</h3>
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-muted-foreground">120 minutes</span>
          <span className="text-sm text-muted-foreground">
            {test.timesUserTest} attempts
          </span>
        </div>
        <AppTestDialog test={test} parts={test.parts} />
      </div>
    </div>
  )
}
export default TestCard
