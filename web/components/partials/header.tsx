import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'
import { LayoutList } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
const Header = () => {
  return (
    <div className="h-24 w-full bg-white grid grid-cols-12 fixed z-10 border-b">
      {/* 3 - 6 - 3 */}
      <div className="col-span-6 sm:col-span-3 flex justify-end ">
        <Image
          src="/icons/logo_2.png"
          alt="Logo"
          width={266}
          height={266}
          className="w-48 md:mt-0"
        />
      </div>
      <div className="sm:col-span-6 flex items-center justify-center">
        <div className="hidden sm:flex items-center justify-center gap-6 text-primary">
          {' '}
          <Link href="/">Đề thi TOEIC</Link>
          <Link href="/">TOEIC Tips</Link>
          <Link href="/">Luyện từ vựng</Link>
          <Link href="/">Các Khóa Học</Link>
        </div>
      </div>
      <div className="md:col-span-3 flex items-center justify-start">
        <div className="hidden md:flex items-center justify-center gap-3 text-primary">
          <Link href="/">Đăng Ký</Link>
          <Link href="/">Đăng Nhập</Link>
        </div>
        <div className="col-span-3 md:hidden flex items-center space-x-3">
          <Button variant="paleorange" className="ml-4">
            <Link href="/" className="text-white font-roboto">
              Đăng Nhập
            </Link>
          </Button>
          {/* Dropdown nav */}
          <DropdownMenu>
            <DropdownMenuTrigger className="text-paleorange sm:hidden">
              <LayoutList />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 mt-4 bg-primary border-paleorange text-primary">
              <DropdownMenuItem>
                <Link href="/">Đề thi TOEIC</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/">TOEIC Tips</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/">Luyện từ vựng</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/">Các Khóa Học</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

export default Header
