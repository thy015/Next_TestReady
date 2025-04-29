import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Heart } from './entities/heart.entity';
import { HeartService } from './service/user.heart.service';
import { DiamondService } from './service/user.diamond.service';
import { Diamond } from './entities/diamond.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Heart,Diamond])],
  controllers: [UserController],
  providers: [UserService,HeartService,DiamondService],
})
export class UserModule {}
