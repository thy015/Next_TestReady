import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe } from '@nestjs/common';
import { WordService } from './word.service';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { HttpService } from '@nestjs/axios';

@Controller('word')
export class WordController {
  constructor(
    private readonly wordService: WordService,
  ) {}

  @Post("create")
  create(@Body(ValidationPipe) createWordDto: CreateWordDto) {
    return this.wordService.create(createWordDto);
  }

  @Get("get-all")
  findAll() {
    return this.wordService.findAll();
  }

  @Get('search')
  search(@Query('word') query: string) {
    return this.wordService.search(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wordService.findOne(+id);
  }

  @Get('get-by-topic/:topicId')
  findByTopic(@Param('topicId') topicId: string) {
    return this.wordService.findByTopicId(+topicId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWordDto: UpdateWordDto) {
    return this.wordService.update(+id, updateWordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wordService.remove(+id);
  }
}
