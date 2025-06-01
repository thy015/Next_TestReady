import { LessonType } from '@/types/courses'
// UI
export const matchingColor = (options: LessonType) => {
  const colorMap = {
    vocabulary: 'bg-primary border-primary',
    grammar: 'bg-dark-cyan border-dark-cyan',
    listening: 'bg-purple-500 border-purple-500',
    speaking: 'bg-paleorange border-paleorange',
    writing: 'bg-destructive border-destructive',
    reading: 'bg-indigo-500 border-indigo-500',
  } as Record<LessonType, string>

  return colorMap[options] || 'bg-gray-500 border-gray-500'
}
export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price)
}
export const upperCaseFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
export const adjustFinalPrice = (price: number, bonus: number) => {
  return price - (price * bonus) / 100
}
export const convertToLinkName = (orgName: string) => {
  return orgName
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '')
}
