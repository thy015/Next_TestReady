import { Badge } from '@/components/ui/badge'
import { TestCollection } from '@/types/tests'
import { convertToLinkName } from '@/utils'
import Link from 'next/link'

interface TestCollectionListProps {
  collections: TestCollection[]
}

interface TestCollectionCardProps {
  collection: TestCollection
}

const TestCollectionList = ({ collections }: TestCollectionListProps) => {
  if (collections.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No tests available
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 cursor-pointer gap-6 w-full">
      {collections.map((collection) => {
        const linkName = convertToLinkName(collection.name)
        return (
          <Link href={`/tests/${linkName}`} key={collection.id}>
            <TestCollectionCard key={collection.id} collection={collection} />
          </Link>
        )
      })}
    </div>
  )
}

const TestCollectionCard = ({ collection }: TestCollectionCardProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="neumorphic-card rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-lg transition-shadow flex-1 flex flex-col">
        <div className="h-3 bg-navy/70 rounded-t-lg"></div>
        <div className="p-6 flex-1">
          <div className="flex justify-between items-center mb-4">
            <div className="text-lg font-lexend font-semibold ">
              {collection.name}
            </div>
            <Badge variant={'navy'}>
              {collection.test.length} {''}
              {collection.test.length > 1 ? 'tests' : 'test'}
            </Badge>
          </div>
          {collection.test && collection.test.length > 0 && (
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {collection.test.slice(0, 3).map((test) => (
                  <span
                    key={test.id}
                    className="text-sm px-3 py-1 bg-gray-100 rounded-xl "
                  >
                    {test.name}
                  </span>
                ))}
                {collection.test.length > 3 && (
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                    +{collection.test.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export { TestCollectionCard, TestCollectionList }
