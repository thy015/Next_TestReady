import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Heart } from './entities/heart.entity';
import { HeartService } from './service/user.heart.service';
import { DiamondService } from './service/user.diamond.service';
import { Diamond } from './entities/diamond.entity';
import { JwtAuthGuard } from 'src/guards/jwt.guards';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { PartResult } from 'src/part_result/entities/part_result.entity';
import { UserLesson } from 'src/user_lesson/entities/user_lesson.entity';
import { WordUser } from 'src/word_user/entities/word_user.entity';
import { TopicUser } from 'src/topic_user/entities/topic_user.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([User,Heart,Diamond,PartResult,UserLesson,WordUser,TopicUser]),
    PassportModule.register({session:false})
  ],
  controllers: [UserController],
  providers: [UserService,HeartService,DiamondService,JwtAuthGuard],
})
export class UserModule {}
