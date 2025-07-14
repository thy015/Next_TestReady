import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { testCollections } from '@/localData/tests'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import TestCard from '@/components/pages/tests/TestCard'
import { use } from 'react'

interface PageProps {
  params: Promise<{collectionName:string}>
}
const CollectionPage =  ({ params }: PageProps ) => {
  const { collectionName } = use(params)
  // Decode the URL parameter and match with collection names
  const decodedName = collectionName.replace(/-/g, ' ')
  const collection = testCollections.find((c) =>
    c.name.toLowerCase().includes(decodedName.toLowerCase())
  )

  if (!collection) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <h1 className="text-2xl font-bold">Collection not found</h1>
        <Link href="/tests" className="mt-4">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Về trang trước
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="mb-6">
        <Link href="/tests">
          <Button variant="ghost" className="pl-0">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Về trang trước
          </Button>
        </Link>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4 border-b-2 pb-4">
          <div className="w-full flex justify-between items-center">
            <h1 className="text-3xl font-bold font-lexend">
              {collection.name}
            </h1>
            <Badge variant={'navy'}>
              {collection.test?.length} {''}
              {collection.test?.length > 1 ? 'tests' : 'test'}
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collection.test?.map((test) => (
          <TestCard key={test.id} test={test} collectionName={collectionName} />
        ))}
      </div>
    </div>
  )
}

export default CollectionPage
