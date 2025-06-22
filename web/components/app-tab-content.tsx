import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { testCollections as mockTestData } from '@/localData/tests'
import { TestCollectionList } from './pages/tests/collections/CollectionList'

const AppTabContent = () => {
  const filterCollections = (tab: string) => {
    if (tab === 'all') return mockTestData
    return mockTestData.filter((col) =>
      col.name.toLowerCase().includes(tab.toLowerCase())
    )
  }
  return (
    <div>
      <Tabs defaultValue="all">
        <TabsList className="h-11 mb-4">
          <TabsTrigger value="all">All tests</TabsTrigger>
          <TabsTrigger value="ets">ETS</TabsTrigger>
          <TabsTrigger value="hacker">Hacker</TabsTrigger>
          <TabsTrigger value="preparation">TOEIC Preparation</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <TestCollectionList collections={filterCollections('all')} />
        </TabsContent>
        <TabsContent value="ets">
          <TestCollectionList collections={filterCollections('ets')} />
        </TabsContent>
        <TabsContent value="hacker">
          <TestCollectionList collections={filterCollections('hacker')} />
        </TabsContent>
        <TabsContent value="preparation">
          <TestCollectionList collections={filterCollections('preparation')} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AppTabContent
