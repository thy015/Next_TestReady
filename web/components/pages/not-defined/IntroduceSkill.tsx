import { BookOpen, Headphones, BookText, Award } from 'lucide-react'
import React from 'react'

const IntroduceSkill = () => {
  const skillData = [
    {
      icon: <BookOpen size={40} color={'#0284c7'} />,
      title: 'Từ Vựng',
      description:
        'Xây dựng từ vựng TOEIC cần thiết thông qua nhiều dạng bài tập.',
      color: '#f0f9ff',
    },
    {
      icon: <Headphones size={40} color={'#9333ea'} />,
      title: 'Nghe',
      description:
        'Cải thiện kỹ năng nghe với các tài liệu âm thanh TOEIC chính thống',
      color: '#faf5ff',
    },
    {
      icon: <BookText size={40} color={'#0d9488'} />,
      title: 'Ngữ Pháp',
      description:
        'Làm chủ các quy tắc ngữ pháp thường được kiểm tra trong các kỳ thi TOEIC.',
      color: '#f0fdfa',
    },
    {
      icon: <Award size={40} color={'#4f46e5'} className="ml-[-10px]" />,
      title: 'Đọc',
      description:
        'Phát triển các chiến lược đọc hiểu để đạt thành công trong kỳ thi TOEIC.',
      color: '#eef2ff',
    },
  ]
  return (
    <div className="w-full h-auto flex flex-col items-center justify-start text-center">
      <div className="my-8">
        <div className="text-3xl font-[900]">
          Làm chủ tất cả các kỹ năng TOEIC
        </div>
        <div className="text-md text-gray-500">
          Tham gia các khóa học toàn diện bao gồm tất cả các khía cạnh của kỳ
          thi TOEIC
        </div>
      </div>
      {/* 4 skills */}
      <div className="grid grid-cols-2 lg:grid-cols-4 container h-full gap-4 lg:gap-8">
        {skillData.map((item, index) => (
          <div
            key={index}
            className={`grid-cols-1 h-[80%] gap-4 rounded-lg text-wrap`}
            style={{ backgroundColor: item.color }}
          >
            {/* each elements */}
            <div className="w-full h-auto min-h-[230px] flex flex-col p-6 items-start justify-start">
              <div>{item.icon}</div>
              <div className="text-2xl font-[800] my-2">{item.title}</div>
              <div className="text-gray-500 text-left">{item.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default IntroduceSkill
