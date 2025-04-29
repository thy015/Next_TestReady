import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Test } from './entities/test.entity';
import { Repository } from 'typeorm';
import { TestCollection } from 'src/test_collection/entities/test_collection.entity';

@Injectable()
export class TestService {

  constructor(
    @InjectRepository(Test)
    private testRespo: Repository<Test>,

    @InjectRepository(TestCollection)
    private collectionRespo: Repository<TestCollection>

  ) { }

  async create(createTestDto: CreateTestDto) {
    const testCollection = await this.collectionRespo.findOne({
      where: { id: createTestDto.collection_id }
  });

    if(!testCollection){
      throw new BadRequestException("Không tìm thấy Test Collection")
    }
  
    
    return await this.testRespo.save({...createTestDto,testCollection})
  }

  async findAll() {
    return await this.testRespo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} test`;
  }

  update(id: number, updateTestDto: UpdateTestDto) {
    return `This action updates a #${id} test`;
  }

  remove(id: number) {
    return `This action removes a #${id} test`;
  }
}
