import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { Admin } from './entities/admin.entity';
import { AdminStrategy } from './strategies/admin.strategy';

@Module({
  imports:[
    TypeOrmModule.forFeature([User,Admin]),
    JwtModule.register({
      secret:"khongaibenem",
      signOptions:{expiresIn:"30d"}
    }),
    PassportModule.register({session:false})
  ],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy,JwtStrategy,AdminStrategy],
})
export class AuthModule {}
