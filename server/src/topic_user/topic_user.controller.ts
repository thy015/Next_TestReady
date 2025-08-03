import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { TopicUserService } from './topic_user.service';
import { CreateTopicUserDto } from './dto/create-topic_user.dto';
import { UpdateTopicUserDto } from './dto/update-topic_user.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guards';

@Controller('topic-user')
@UseGuards(JwtAuthGuard)
export class TopicUserController {
  constructor(private readonly topicUserService: TopicUserService) {}

  @Post()
  create(@Req() req,@Body(ValidationPipe) createTopicUserDto: CreateTopicUserDto) {
    return this.topicUserService.create(req.user.id,createTopicUserDto);
  }

  @Get()
  findAll(@Req() req) {
    return this.topicUserService.findAllByUser(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.topicUserService.findOne(+id);
  }

  @Patch('')
  update(@Req() req, @Body() updateTopicUserDto: UpdateTopicUserDto) {
    return this.topicUserService.updateDone(req.user.id, updateTopicUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.topicUserService.remove(+id);
  }
}
