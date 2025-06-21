import { Smile, Mail } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
export default function Footer() {
  // these icons from lucide deprecated
  const socialLinks = [
    {
      name: 'Facebook',
      src: '/icons/facebook.png',
      url: 'https://www.facebook.com/toeicready',
    },
    {
      name: 'Telegram',
      src: '/icons/telegram.png',
      url: 'https://www.telegram.com/toeicready',
    },
    {
      name: 'Tiktok',
      src: '/icons/tik-tok.png',
      url: 'https://www.tiktok.com/toeicready',
    },
    {
      name: 'Youtube',
      src: '/icons/youtube.png',
      url: 'https://www.youtube.com/toeicready',
      additionalClass: 'mt-2',
    },
  ]
  return (
    <>
      <div className="bg-[#111827] w-full h-auto lg:h-72">
        <div className="container h-full w-full mx-auto p-4 text-white grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="col-span-1 mt-4">
            <div className="flex items-center space-x-2 my-4">
              {/* TODO: need image logo */}
              <Smile />
              <div className="text-2xl font-bold">TEST Ready</div>
            </div>

            <p className="text-gray-400">
              Nền tảng toàn diện của bạn cho việc chuẩn bị TOEIC và cải thiện
              khả năng tiếng Anh
            </p>
            {/* social display */}
            <div className="flex items-center jutify-center space-x-3 my-4 cursor-pointer">
              {socialLinks.map((link, index) => (
                <div key={index}>
                  <Image
                    src={link.src}
                    alt={link.name}
                    width={24}
                    height={24}
                    className={`hover:scale-110 transition-all duration-300 ${link.additionalClass}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-1 mt-4">
            <div className="my-2 text-lg font-bold">Liên kết nhanh</div>
            <div className="flex flex-col space-y-2 text-gray-400">
              <Link href="/">Bài kiểm tra</Link>
              <Link href="/">Mẹo TOEIC</Link>
              <Link href="/">Xây dựng từ vựng</Link>
              <Link href="/">Các khóa học</Link>
              <Link href="/">Blog</Link>
            </div>
          </div>

          <div className="col-span-1 mt-4">
            <div className="my-2 text-lg font-bold">Tài nguyên</div>
            <div className="flex flex-col space-y-2 text-gray-400">
              <Link href="/">Đánh giá đầu vào</Link>
              <Link href="/">Tài liệu học tập</Link>
              <Link href="/">Cấu trúc bài làm TOEIC</Link>
              <Link href="/">Các bài báo</Link>
              <Link href="/">Câu hỏi thường gặp</Link>
            </div>
          </div>

          <div className="col-span-1 mt-4">
            <div className="my-2 text-lg font-bold">Liên hệ với chúng tôi</div>
            <div className="flex flex-col space-y-2 text-gray-400">
              <div>828 Sư Vạn Hạnh P.12 Quận 10, TPHCM</div>
              <div>02838632052</div>
              <Link
                href="mailto:toiecready@gmail.com"
                className="flex space-x-2 hover:text-white transform ease-in-out duration-300"
              >
                <Mail />
                <div>toiecready@gmail.com</div>
              </Link>
              <div>Đăng ký ngay để nhận thông báo mới nhất về TOEIC !</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#111827] w-full h-20 border-t border-gray-400">
        <div className="flex-center text-lg h-full w-full mx-auto p-4 text-gray-400">
          <div>© 2025 TEST Ready. All rights reserved.</div>
        </div>
      </div>
    </>
  )
}
