import { Course } from '@/types/courses'

export const courses: Course[] = [
  {
    id: '1a',
    isFree: false,
    isActive: true,
    type: 'vocabulary',
    title:
      'Chiến lược làm bài - Từ vựng - Ngữ pháp - Luyện nghe với Dictation [Tặng khoá TED Talks]',
    image: '/images/test_4.jpeg',
    price: 1990000,
    discount: 20,
    category: {
      name: 'Web Development',
      level: 'Beginner',
    },
    userCourseRate: {
      totalUser: 100,
      totalRate: 1234,
      rate: 4.5,
    },
  },
  {
    id: '2b',
    isFree: true,
    isActive: true,
    type: 'listening',
    title:
      'Chiến lược làm bài - Chữa đề - Luyện nghe TOEIC Listening theo phương pháp Dictation',
    image: '/images/test_1.png',
    price: 2450000,
    discount: 40,
    category: {
      name: 'JavaScript',
      level: 'Advanced',
    },
    userCourseRate: {
      totalUser: 300,
      totalRate: 567,
      rate: 4.2,
    },
  },
  {
    id: '3c',
    isFree: false,
    isActive: true,
    type: 'grammar',
    title:
      'Chiến lược làm bài - Từ vựng - Ngữ pháp - Luyện nghe với Dictation [Tặng khoá TED Talks]',
    image: '/images/test_2.jpeg',
    price: 1200000,
    discount: 25,
    category: {
      name: 'Data Science',
      level: 'Intermediate',
    },
    userCourseRate: {
      totalUser: 250,
      totalRate: 789,
      rate: 4.7,
    },
  },
  {
    id: '4e',
    isFree: false,
    isActive: true,
    type: 'reading',
    title:
      'Chiến lược làm bài - Từ vựng - Ngữ pháp - Luyện nghe với Dictation [Tặng khoá TED Talks]',
    image: '/images/test_3.webp',
    price: 1350000,
    discount: 25,
    category: {
      name: 'Data Science',
      level: 'Intermediate',
    },
    userCourseRate: {
      totalUser: 250,
      totalRate: 789,
      rate: 4.7,
    },
  },
]
