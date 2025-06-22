import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserLessonDto } from './dto/create-user_lesson.dto';
import { UpdateUserLessonDto } from './dto/update-user_lesson.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserLesson } from './entities/user_lesson.entity';
import { Repository } from 'typeorm';
import { Lesson } from 'src/lesson/entities/lesson.entity';
import { User } from 'src/user/entities/user.entity';
import { use } from 'passport';

@Injectable()
export class UserLessonService {

  constructor(
    @InjectRepository(UserLesson)
    private userLessonRepo:Repository<UserLesson>,

    @InjectRepository(Lesson)
    private lessonRepo:Repository<Lesson>,

    @InjectRepository(User)
    private userRepo:Repository<User>,
  ) {}

 async create(createUserLessonDto: CreateUserLessonDto,user_id:number) {
    const {lesson_id, minutes} = createUserLessonDto;
    if(!lesson_id)
      throw new BadRequestException('Không tìm thấy bài học !');
    if(!minutes || minutes < 0)
      throw new BadRequestException('Thời gian học không hợp lệ !');
    const lesson = await this.lessonRepo.findOne({
      where: { id: lesson_id },
    });
    if(!lesson)
      throw new BadRequestException('Không tìm thấy bài học !');
    const user = await this.userRepo.findOne({
      where: { id: user_id },
    });
    if(!user) 
      throw new BadRequestException('Không tìm thấy người dùng !');
    
    const {durations} = lesson;
    const progress = (minutes / durations) * 100;

    if(progress > 100 || progress < 0)
      throw new BadRequestException('Thời gian học không hợp lệ !');

    const is_completed = progress >= 90;
    
    const userLesson = this.userLessonRepo.create({
      lesson,
      user,
      progress,
      minutes: minutes,
      is_completed,
    });
  
    return await this.userLessonRepo.save(userLesson);
  }

  async getUserByIdLesson(lesson_id:number) {
    const userLessons = await this.userLessonRepo.find({
      where: { lesson: { id: lesson_id } },
      relations: ['user']
    })
    if(!userLessons || userLessons.length === 0)
      throw new BadRequestException('Không tìm thấy người dùng học bài này !');
    const userTemp = userLessons.map(userLesson => userLesson.user);
    const users = Array.from (
      new Map(userTemp.map(user => [user.id, user])).values()
    )
    return users;
  }

  async getLessonByIdUser(user_id:number) {
    const userLessons = await this.userLessonRepo.find({
      where: { user: { id: user_id } },
      relations: ['lesson']
    })
    if(!userLessons || userLessons.length === 0)
      throw new BadRequestException('Không tìm thấy bài học của người dùng này !');
    const lessonTemp = userLessons.map(userLessons => userLessons.lesson);
    const lessons = Array.from(
      new Map(lessonTemp.map(lesson=>[lesson.id,lesson])).values()
    )
    return lessons;
  }

  async findAll() {
    return this.userLessonRepo.find({
      relations:['user']
    });
  }

  async getProgressByIdLesson(lesson_id:number, user_id:number){
    const userLesson = await this.userLessonRepo.findOne({
      where:{
        lesson:{id:lesson_id},
        user:{id:user_id}
      }
    })

    if(!userLesson)
      throw new BadRequestException('Không tìm thấy tiến độ học của người dùng này !');

    return userLesson
  }

  async update(user_id: number, updateUserLessonDto: UpdateUserLessonDto) {
    const {lesson_id, minutes} = updateUserLessonDto;
    if(!lesson_id)
      throw new BadRequestException('Không tìm thấy bài học !');
    if(!minutes || minutes < 0)
      throw new BadRequestException('Thời gian học không hợp lệ !');
    
    const lesson = await this.lessonRepo.findOne({
      where: { id: lesson_id },
    });
    if(!lesson)
      throw new BadRequestException('Không tìm thấy bài học !');  

    const progress = (minutes / lesson.durations) * 100;
    if(progress > 100 || progress < 0)
      throw new BadRequestException('Thời gian học không hợp lệ !');
    const is_completed = progress >= 90;

    const userLesson = await this.userLessonRepo.findOne({
      where: {
        lesson: { id: lesson_id },
        user: { id: user_id }
      }
    });
    if(!userLesson)
      throw new BadRequestException('Không tìm thấy tiến độ học của người dùng này !');

    userLesson.progress = progress;
    userLesson.minutes = minutes;
    userLesson.is_completed = is_completed;
    return await this.userLessonRepo.save(userLesson);
  }

  remove(id: number) {
    return `This action removes a #${id} userLesson`;
  }
}
