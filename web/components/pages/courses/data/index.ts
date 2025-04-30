import { Course } from "@/types/courses";

export const courses: Course[] = [
  {
    isFree: false,
    isActive: true,
    type: 'Online',
    title: 'Introduction to Web Development',
    image: 'https://example.com/course-image-1.jpg',
    price: 99.99,
    discount: 20,
    category: {
      name: 'Web Development',
      level: 'Beginner'
    },
    userCourseRate: {
      totalRate: 1234,
      rate: 4.5
    }
  },
  {
    isFree: true,
    isActive: true,
    type: 'Classroom',
    title: 'Advanced JavaScript Techniques',
    image: 'https://example.com/course-image-2.jpg',
    price: 199.99,
    discount: 10,
    category: {
      name: 'JavaScript',
      level: 'Advanced'
    },
    userCourseRate: {
      totalRate: 567,
      rate: 4.2
    }
  },
  {
    isFree: false,
    isActive: false,
    type: 'Online',
    title: 'Introduction to Data Science',
    image: 'https://example.com/course-image-3.jpg',
    price: 149.99,
    discount: 15,
    category: {
      name: 'Data Science',
      level: 'Intermediate'
    },
    userCourseRate: {
      totalRate: 789,
      rate: 4.7
    }
  }
];
