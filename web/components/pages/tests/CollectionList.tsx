import Loading from '@/app/loading'
import React, { Suspense } from 'react'
import Image from 'next/image'
import { MessageSquareText, SquarePen } from 'lucide-react'
import { TestCollection } from '@/types/tests'
import { testCollections } from './data'

interface TestCardProps {
  collection: TestCollection
}
const CollectionCard = ({ collection }: TestCardProps) => {
  const totalTestAttemps = collection.test.reduce(
    (sum, test) => sum + (test.timesUserTest || 0),
    0
  )
  return (
    <div className="w-64 h-48 flex flex-col">
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={collection.image}
          alt={collection.name}
          fill
          className="object-cover object-center"
          priority
          quality={85}
        />
      </div>
      <div className="mt-2 flex items-center justify-center font-medium text-xl text-primary">
        {collection.name}
      </div>
      <div className="flex items-center justify-center gap-2">
        <SquarePen className="text-muted-foreground" />{' '}
        <div>{totalTestAttemps}</div>
        <div className="text-muted-foreground"> | </div>
        <MessageSquareText className="titletext-muted-foreground" />{' '}
        <div>123</div>
      </div>
    </div>
  )
}

const CollectionList = () => {
  const activeCollections = testCollections
    .filter((collection) => collection.id)
    .slice(0, 4)
  return (
    <div className="flex justify-center flex-col items-center my-8 sm:my-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-2 lg:gap-4">
      <Suspense fallback={<Loading />}>
        {activeCollections.map((c) => (
          <CollectionCard collection={c} key={c.id} />
        ))}
      </Suspense>
    </div>
  )
}

export { CollectionCard, CollectionList }
