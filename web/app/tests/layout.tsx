import { AppBreadcrumb } from '@/components/app-breadcrumb'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ArrowDownWideNarrow, Search } from 'lucide-react'
import { TabsList, TabsTrigger, Tabs } from '@/components/ui/tabs'

export default function TestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-[1300px] flex-col mt-24 justify-center bg-white">
      {/* Searchbar */}
      <div className="h-auto w-full flex items-center justify-center">
        <div className="w-[90%] h-full p-4">
          <div className="my-4">
            <AppBreadcrumb />
          </div>
          <div className="font-lexend font-bold text-3xl mt-4">
            English Test Categories
          </div>
          <div className="font-lexend text-lg text-gray-500 mb-8">
            TOEIC Ready luôn đảm bảo các bài test và cách test giống đến 90% thi
            thật
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="w-[30%] relative">
              <Input placeholder="Search test..." className="pl-9" />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            <div>
              <Button className="font-bold">
                <ArrowDownWideNarrow />
                Sort
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Test list */}
      <div className="h-full w-full flex items-center justify-center">
        <div className="border w-[90%] h-full p-4">
          <div className="grid grid-cols-12 h-full w-full">
            <div className="col-span-9">
              <Tabs defaultValue="all" className="h-12">
                <TabsList>
                  <TabsTrigger value="all">All tests</TabsTrigger>
                  <TabsTrigger value="ets">ETS</TabsTrigger>
                  <TabsTrigger value="hacker">Hacker</TabsTrigger>
                  <TabsTrigger value="preparation">
                    TOEIC Preparation
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              {children}
            </div>
            <div className="col-span-3 h-full w-full bg-gradient-to-b from-[#F5EEDC] via-[#FFF7E3]  to-[#F5EEDC] rounded-2xl p-4">
              hi
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
