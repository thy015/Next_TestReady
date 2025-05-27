import { TestCollection } from '@/types/tests'

export const testCollections: TestCollection[] = [
  {
    id: 'col1',
    name: 'TOEIC ETS 2024',
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-01-15T08:00:00Z',

    test: [
      {
        id: 'test1',
        isActive: true,
        title: 'TOEIC Practice Test 1',

        duration: 120,
        createdAt: '2024-01-10T08:00:00Z',
        updatedAt: '2024-01-10T08:00:00Z',
        timesUserTest: 12,
      },
      {
        id: 'test2',
        isActive: true,
        title: 'TOEIC Practice Test 2',

        duration: 120,
        createdAt: '2024-01-12T08:00:00Z',
        updatedAt: '2024-01-12T08:00:00Z',
        timesUserTest: 245,
      },
    ],
  },
  {
    id: 'col2',
    name: 'TOEIC ETS 2023',
    createdAt: '2023-12-20T08:00:00Z',
    updatedAt: '2024-01-05T08:00:00Z',

    test: [
      {
        id: 'test3',
        isActive: true,
        title: 'Listening Practice',

        duration: 45,
        createdAt: '2023-12-22T08:00:00Z',
        updatedAt: '2024-01-02T08:00:00Z',
        timesUserTest: 111,
      },
      {
        id: 'test4',
        isActive: false,
        title: 'Reading Practice (Coming Soon)',

        duration: 75,
        createdAt: '2023-12-25T08:00:00Z',
        updatedAt: '2023-12-25T08:00:00Z',
        timesUserTest: 120,
      },
    ],
  },
  {
    id: 'col3',
    name: 'Hacker TOEIC 3',
    createdAt: '2024-02-01T08:00:00Z',
    updatedAt: '2024-02-10T08:00:00Z',

    test: [
      {
        id: 'test6',
        isActive: true,
        title: 'Hacker TOEIC 3 - Test 1 (Nghe)',

        duration: 45,
        createdAt: '2024-02-05T08:00:00Z',
        updatedAt: '2024-02-05T08:00:00Z',
        timesUserTest: 1222,
      },
      {
        id: 'test7',
        isActive: true,
        title: 'Hacker TOEIC 3 - Test 1 (Đọc)',

        duration: 75,
        createdAt: '2024-02-05T08:00:00Z',
        updatedAt: '2024-02-05T08:00:00Z',
        timesUserTest: 8,
      },
      {
        id: 'test8',
        isActive: false,
        title: 'Hacker TOEIC 3 - Test 2 (Full)',

        duration: 120,
        createdAt: '2024-02-10T08:00:00Z',
        updatedAt: '2024-02-10T08:00:00Z',
        timesUserTest: 887,
      },
    ],
  },
  {
    id: 'col4',
    name: 'TOEIC ETS 2022',
    createdAt: '2023-10-01T08:00:00Z',
    updatedAt: '2024-01-20T08:00:00Z',

    test: [
      {
        id: 'test9',
        isActive: true,
        title: 'Luyện Nghe Part 1-2',
        duration: 30,
        createdAt: '2023-10-05T08:00:00Z',
        updatedAt: '2023-12-15T08:00:00Z',
        timesUserTest: 121,
      },
      {
        id: 'test10',
        isActive: true,
        title: 'Luyện Nghe Part 3-4',
        duration: 45,
        createdAt: '2023-10-10T08:00:00Z',
        updatedAt: '2023-12-18T08:00:00Z',
        timesUserTest: 42,
      },
    ],
  },
]
