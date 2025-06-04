import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { UserLessonService } from './user_lesson.service';
import { CreateUserLessonDto } from './dto/create-user_lesson.dto';
import { UpdateUserLessonDto } from './dto/update-user_lesson.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guards';

@Controller('user-lesson')
@UseGuards(JwtAuthGuard)
export class UserLessonController {
  constructor(private readonly userLessonService: UserLessonService) {}

  @Post()
  create(@Req() req,@Body(ValidationPipe) createUserLessonDto: CreateUserLessonDto) {
    return this.userLessonService.create(createUserLessonDto,req.user.id);
  }

  @Get("get-user-by-lesson/:lesson_id")
  getUserByLesson(@Param("lesson_id") id_lesson: number) {
    return this.userLessonService.getUserByIdLesson(id_lesson);
  }

  @Get('get-lesson-by-user')
  getLessonByUser(@Req() req) {
    return this.userLessonService.getLessonByIdUser(req.user.id);
  }

  @Get("get-progress/:lesson_id")
  getProgress(@Param("lesson_id") id_lesson: number, @Req() req) {
    return this.userLessonService.getProgressByIdLesson(id_lesson,req.user.id);
  }


  @Get()
  findAll() {
    return this.userLessonService.findAll();
  }

  @Patch('update-progress')
  update( @Body() updateUserLessonDto: UpdateUserLessonDto, @Req() req) {
    return this.userLessonService.update(req.user.id, updateUserLessonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userLessonService.remove(+id);
  }
}
