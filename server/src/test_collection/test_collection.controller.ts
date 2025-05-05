import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { TestCollectionService } from './test_collection.service';
import { CreateTestCollectionDto } from './dto/create-test_collection.dto';
import { UpdateTestCollectionDto } from './dto/update-test_collection.dto';

@Controller('test')
export class TestCollectionController {
  constructor(private readonly testCollectionService: TestCollectionService) {}

  @Post("create-test-collection")
  create(@Body(ValidationPipe) createTestCollectionDto: CreateTestCollectionDto) {
    return this.testCollectionService.create(createTestCollectionDto);
  }

  @Get("get-all-collection")
  findAll() {
    return this.testCollectionService.findAll();
  }

  @Get('test-collection/:id')
  findOne(@Param('id') id: string) {
    return this.testCollectionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestCollectionDto: UpdateTestCollectionDto) {
    return this.testCollectionService.update(+id, updateTestCollectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testCollectionService.remove(+id);
  }
}
