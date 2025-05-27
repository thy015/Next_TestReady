import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { testCollections as mockTestData } from '@/localData/tests'
import { TestCollectionList } from './pages/tests/CollectionList'

const AppTabContent = () => {
  return (
    <>
      <Tabs defaultValue="all">
        <TabsList className="h-11 mb-4">
          <TabsTrigger value="all">All tests</TabsTrigger>
          <TabsTrigger value="ets">ETS</TabsTrigger>
          <TabsTrigger value="hacker">Hacker</TabsTrigger>
          <TabsTrigger value="preparation">TOEIC Preparation</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <TestCollectionList collections={mockTestData} />
        </TabsContent>
      </Tabs>
    </>
  )
}

export default AppTabContent
