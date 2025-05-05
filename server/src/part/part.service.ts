import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Part } from './entities/part.entity';
import { Repository } from 'typeorm';
import { Test } from 'src/test/entities/test.entity';

@Injectable()
export class PartService {

  constructor(
    @InjectRepository(Part)
    private partRespo: Repository<Part>,
    @InjectRepository(Test)
    private testRespo: Repository<Test>
  ) { }

  async create(createPartDto: CreatePartDto) {
    const testExisted = await this.testRespo.findOne({
      where: { id: createPartDto.test_id }
    })
    if(!testExisted){
      throw new BadRequestException("Không có bài kiểm tra theo id đã cho!")
    }
    const partCreated = await this.partRespo.create({...createPartDto,test:testExisted})
    return await this.partRespo.save(partCreated)
  }

  async findAll() {
    console.log("[PART] find all")
    return await this.partRespo.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} part`;
  }

  update(id: number, updatePartDto: UpdatePartDto) {
    return `This action updates a #${id} part`;
  }

  remove(id: number) {
    return `This action removes a #${id} part`;
  }
}
