import { Injectable } from '@nestjs/common';
import { CreateNewspaperDto } from './dto/create-newspaper.dto';
import { UpdateNewspaperDto } from './dto/update-newspaper.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Newspaper } from './entities/newspaper.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NewspaperService {

  constructor(
    @InjectRepository(Newspaper)
    private newPaperRepo: Repository<Newspaper>
  ) { }

  async create(createNewspaperDto: CreateNewspaperDto) {
    const newspaper = await this.newPaperRepo.create(createNewspaperDto);
    return await this.newPaperRepo.save(newspaper);
  }

  async findAll() {
    return await this.newPaperRepo.find();
  }

  async findOne(id: number) {
    return await this.newPaperRepo.findOne({
      where: { id },
    });
  }

  update(id: number, updateNewspaperDto: UpdateNewspaperDto) {
    return `This action updates a #${id} newspaper`;
  }

  remove(id: number) {
    return `This action removes a #${id} newspaper`;
  }
}
