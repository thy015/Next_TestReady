export interface Course {
  isFree: boolean;
  isActive: boolean;
  type: string;
  title: string;
  image: string;
  price: number;
  discount: number;
  category: {
    name: string;
    level: string;
  };
  userCourseRate: {
    totalRate: number;
    rate: number;
  };
}