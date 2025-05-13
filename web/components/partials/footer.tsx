import { Smile } from 'lucide-react'

export default function Footer() {
  return (
    <div className="bg-[#111827] w-full h-64">
      <div className="container h-full w-full mx-auto p-4 text-white grid grid-cols-4 gap-4">
        <div className="col-span-1">
          <div className="flex items-center space-x-2 my-4">
            {/* TODO: need image logo */}
            <Smile />
            <div className="text-2xl font-bold">TOEIC Ready</div>
          </div>

          <p className="text-gray-400">
            Nền tảng toàn diện của bạn cho việc chuẩn bị TOEIC và cải thiện khả
            năng tiếng Anh
          </p>
          {/* social display */}
        </div>

        <div className="col-span-1">
          <div>Liên kết</div>
        </div>

        <div className="col-span-1">
          <div>Tài nguyên</div>
        </div>

        <div className="col-span-1">
          <div>Liên hệ với chúng tôi</div>
        </div>
      </div>
    </div>
  )
}
