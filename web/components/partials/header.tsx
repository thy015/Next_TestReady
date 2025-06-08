'use client'
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
import { useEffect, useState } from 'react'

const Header = () => {
  const [onScroll, setOnScroll] = useState('bg-transparent')
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setOnScroll('bg-primary')
      } else {
        setOnScroll('bg-transparent')
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
    <div className={`h-24 w-full ${onScroll} grid grid-cols-12 fixed z-10 `}>
      {/* 3 - 6 - 3 */}
      <div className="col-span-6 sm:col-span-3 flex justify-center items-center space-x-2">
        <Link href="/">
          <Image
            src="/icons/logo_2.png"
            alt="Logo"
            width={242}
            height={110}
            className="w-40 md:mt-0"
          />
        </Link>
      </div>
      <div className="hidden sm:col-span-6 sm:flex items-center justify-center">
        <div className="hidden sm:flex items-center justify-center gap-4 text-white md:text-lg flex-wrap">
          {/* TODO: add icon nav and dropdown menu */}
          <Link href="/tests">Đề thi TOEIC</Link>
          <Link href="/">TOEIC Tips</Link>
          <Link href="/">Luyện từ vựng</Link>
          <Link href="/">Các Khóa Học</Link>
          <Link href="/">Về Chúng Tôi</Link>
        </div>
      </div>
      <div className="hidden md:col-span-3 md:flex items-center justify-center">
        <div className="hidden md:flex items-center justify-center gap-3 text-primary text-lg">
          <Button variant="outline">
            <Link href="/">Đăng Ký</Link>
          </Button>
          <Button variant="paleorange">
            <Link href="/">Đăng Nhập</Link>
          </Button>
        </div>
      </div>
      <div className="col-span-6 sm:col-span-2 md:hidden flex items-center space-x-3">
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
          <DropdownMenuContent className="w-48 mt-4 bg-primary border-paleorange text-white">
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
  )
}

export default Header
