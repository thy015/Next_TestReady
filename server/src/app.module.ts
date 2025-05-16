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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: "toeic_ready2",
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, 
    }),
    UserModule,
    TestCollectionModule,
    TestModule,
    PartModule,
    QuestionModule,
    AuthModule,
    PartResultModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
