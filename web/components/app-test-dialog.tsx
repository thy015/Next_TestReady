'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Test } from '@/types/tests'
import PartList from './pages/tests/parts/PartList'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { convertToLinkName } from '@/utils'
interface AppTestDialog {
  test: Test
  parts: Test['parts']
}
export function AppTestDialog({ test, parts }: AppTestDialog) {
  const pathName = usePathname()
  const testLinkName = convertToLinkName(test.name)
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant={'navy'} className="w-full">
            Bắt đầu thi
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] md:max-w-[70%]">
          <DialogHeader>
            <DialogTitle>{test.name}</DialogTitle>
            <DialogDescription>
              Chọn test theo từng phần hoặc chọn bắt đầu để test toàn bộ bài
            </DialogDescription>
            <DialogDescription>
              * Listening từ Part 1-4 | Reading từ Part 5-7
            </DialogDescription>
          </DialogHeader>
          {/* Part Cards */}
          <PartList parts={parts}></PartList>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Quay lại</Button>
            </DialogClose>
            <Link href={`${pathName}/${testLinkName}`}>
              <Button variant="navy" type="submit">
                Bắt đầu
              </Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
