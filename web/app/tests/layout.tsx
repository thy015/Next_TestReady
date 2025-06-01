import { AppBreadcrumb } from '@/components/app-breadcrumb'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ArrowDownWideNarrow, Search } from 'lucide-react'
import Image from 'next/image'

export default function TestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="pb-6 flex overflow-y-auto min-h-screen flex-col mt-24 justify-center bg-white">
      {/* Searchbar */}
      <div className="h-auto w-full flex items-center justify-center">
        <div className="w-[90%] h-full p-4">
          <div className="my-4">
            <AppBreadcrumb />
          </div>
          <div className="font-lexend font-bold text-3xl mt-4">
            Danh mục đề thi
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
        <div className="border w-[90%] h-full max-h-[1000px] overflow-y-auto p-6">
          <div className="flex flex-col lg:grid grid-cols-12 h-full w-full ">
            <div className="lg:col-span-9 mr-8">{children}</div>
            <div className="neumorphic-side-card mt-10 lg:mt-0 lg:col-span-3 h-[600px] w-full bg-buff rounded-2xl p-6">
              <Image
                alt="toeic image"
                width={480}
                height={300}
                src="/images/toeic_real_pic.webp"
              ></Image>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
