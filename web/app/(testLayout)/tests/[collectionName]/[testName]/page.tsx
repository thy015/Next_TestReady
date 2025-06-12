
import React from 'react'
import { testCollections } from '@/localData/tests'
import PartDisplay from '@/components/pages/tests/parts/PartDisplay'
import { convertLinkToNormalName } from '@/utils'


interface Props {
  params:{
    collectionName:string
    testName:string
  }
}

const TestPage = ({ params }: Props) => {
  // test handle - local first
  const {collectionName,testName} = params

  const convertedCollectionName=convertLinkToNormalName(collectionName)
  const convertedTestName=convertLinkToNormalName(testName)

  const collection = testCollections.find(
    (c) => c.name.toLowerCase() === convertedCollectionName
  );

  if (!collection) {
    console.error('Collection not found in test page');
  }

  const test = collection?.test.find(
    (t) => t.name.toLowerCase() === convertedTestName
  );

  if (!test) {
    console.error('Test not found in test page');
  }
  console.log('found test and col',collection,test)

  return (
    <PartDisplay test={test}/>
  )
}

export default TestPage
