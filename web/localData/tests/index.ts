import { PartType, TestCollection } from '@/types/tests'

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
        name: 'Test 1',
        timesUserTest: 12,
        testCollectionId: 'col1',
        parts: [
          {
            id: 'part1',
            name: 'p1',
            type: 'listening' as PartType,
            total_question: 6,
            duration: 30,
          },
          {
            id: 'part2',
            name: 'p2',
            type: 'listening' as PartType,
            total_question: 25,
            duration: 30,
          },
          {
            id: 'part3',
            name: 'p3',
            type: 'listening' as PartType,
            total_question: 39,
            duration: 30,
          },
          {
            id: 'part4',
            name: 'p4',
            type: 'listening' as PartType,
            total_question: 30,
            duration: 30,
          },
          {
            id: 'part5',
            name: 'p5',
            type: 'reading' as PartType,
            total_question: 30,
            duration: 30,
          },
          {
            id: 'part6',
            name: 'p6',
            type: 'reading' as PartType,
            total_question: 16,
            duration: 30,
          },
          {
            id: 'part7',
            name: 'p7',
            type: 'reading' as PartType,
            total_question: 54,
            duration: 30,
          },
        ],
      },
      {
        id: 'test2',
        isActive: true,
        name: 'Test 2',
        testCollectionId: 'col1',
        timesUserTest: 245,
      },
      {
        id: 'ni',
        isActive: true,
        name: 'Test 3',
        testCollectionId: 'col1',
        timesUserTest: 245,
      },
      {
        id: 'nihon',
        isActive: true,
        name: 'Test 4',
        testCollectionId: 'col1',
        timesUserTest: 245,
      },
      {
        id: 'nihongo',
        isActive: true,
        name: 'Test 5',
        testCollectionId: 'col1',
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
        name: 'Test 1',
        testCollectionId: 'col2',
        timesUserTest: 111,
      },
      {
        id: 'test4',
        isActive: true,
        name: 'Test 2',
        testCollectionId: 'col2',
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
        name: 'Test 1',
        testCollectionId: 'col3',
        timesUserTest: 1222,
      },
      {
        id: 'test7',
        isActive: true,
        name: 'Test 2',
        testCollectionId: 'col3',
        timesUserTest: 8,
      },
      {
        id: 'test8',
        isActive: true,
        name: 'Test 3',
        testCollectionId: 'col3',
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
        name: 'Test 1',
        testCollectionId: 'col4',
        timesUserTest: 121,
      },
      {
        id: 'test10',
        isActive: true,
        name: 'Test 2',
        testCollectionId: 'col4',
        timesUserTest: 42,
      },
    ],
  },
]
