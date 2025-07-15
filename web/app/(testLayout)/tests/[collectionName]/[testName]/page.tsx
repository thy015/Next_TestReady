import { testCollections } from '@/localData/tests'
import { convertLinkToNormalName } from '@/utils'
import { PartFetchServer } from '@/components/pages/tests/parts/PartList'
import { use } from 'react'

interface Props {
  params: Promise<{collectionName:string,testName:string}>
}

export default function TestPage({ params }: Props) {
  const { collectionName, testName } = use(params)
  const convertedCollectionName = convertLinkToNormalName(collectionName)
  const convertedTestName = convertLinkToNormalName(testName)

  const collection = testCollections.find(
    (c) => c.name.toLowerCase() === convertedCollectionName
  )

  if (!collection) {
    return <p>Collection not found</p>
  }

  const test = collection.test.find(
    (t) => t.name.toLowerCase() === convertedTestName
  )

  if (!test) {
    return <p>Test not found</p>
  }

  return <PartFetchServer test={test} />
}
