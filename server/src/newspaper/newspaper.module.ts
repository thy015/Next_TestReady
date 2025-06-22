import { Module } from '@nestjs/common';
import { NewspaperService } from './newspaper.service';
import { NewspaperController } from './newspaper.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Newspaper } from './entities/newspaper.entity';
import { AdminGuard } from 'src/guards/admin.guards';

@Module({
  imports: [TypeOrmModule.forFeature([Newspaper])],
  controllers: [NewspaperController],
  providers: [NewspaperService,AdminGuard],
})
export class NewspaperModule {}
