import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { TestCollectionModule } from './test_collection/test_collection.module';
import { TestModule } from './test/test.module';
import { PartModule } from './part/part.module';
import { QuestionModule } from './question/question.module';
import { AuthModule } from './auth/auth.module';
import { PartResultModule } from './part_result/part_result.module';
import { CategoryCourseModule } from './category_course/category_course.module';
import { CourseModule } from './course/course.module';
import { CourseSectionModule } from './course_section/course_section.module';
import { LessonModule } from './lesson/lesson.module';
import { UserLessonModule } from './user_lesson/user_lesson.module';
import { NewspaperModule } from './newspaper/newspaper.module';
import { WordModule } from './word/word.module';
import { TopicModule } from './topic/topic.module';
import { RelatedWordModule } from './related_word/related_word.module';
import { RelatedVerbModule } from './related_verb/related_verb.module';
import { WordUserModule } from './word_user/word_user.module';
import { TopicUserModule } from './topic_user/topic_user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test_ready',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    TestCollectionModule,
    TestModule,
    PartModule,
    QuestionModule,
    AuthModule,
    PartResultModule,
    CategoryCourseModule,
    CourseModule,
    CourseSectionModule,
    LessonModule,
    UserLessonModule,
    NewspaperModule,
    WordModule,
    TopicModule,
    RelatedWordModule,
    RelatedVerbModule,
    WordUserModule,
    TopicUserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
