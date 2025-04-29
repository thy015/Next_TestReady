import { Injectable } from '@nestjs/common';
import { CreateTestCollectionDto } from './dto/create-test_collection.dto';
import { UpdateTestCollectionDto } from './dto/update-test_collection.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TestCollection } from './entities/test_collection.entity';

@Injectable()
export class TestCollectionService {

  constructor(
    @InjectRepository(TestCollection)
    private testRespo: Repository<TestCollection>
  ) { }
  async create(createTestCollectionDto: CreateTestCollectionDto) {
    const collectionCreated = await this.testRespo.create(createTestCollectionDto)
    return await this.testRespo.save(collectionCreated)
  }

  async findAll() {
    return await this.testRespo.find({
      // relations: {
      //   test: true
      // }
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} testCollection`;
  }

  update(id: number, updateTestCollectionDto: UpdateTestCollectionDto) {
    return `This action updates a #${id} testCollection`;
  }

  remove(id: number) {
    return `This action removes a #${id} testCollection`;
  }
}
