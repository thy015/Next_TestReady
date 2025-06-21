import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRelatedVerbDto } from './dto/create-related_verb.dto';
import { UpdateRelatedVerbDto } from './dto/update-related_verb.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RelatedVerb } from './entities/related_verb.entity';
import { Word } from 'src/word/entities/word.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RelatedVerbService {

  constructor(
    @InjectRepository(RelatedVerb)
    private readonly relatedVerbRepo: Repository<RelatedVerb>,
    @InjectRepository(Word)
    private readonly wordRepo: Repository<Word>,
  ) {}

  async create(createRelatedVerbDto: CreateRelatedVerbDto) {
    const{word_id} = createRelatedVerbDto;
    if(!word_id) {
      throw new BadRequestException("Không tìm thấy id của từ");
    }
    const word = await this.wordRepo.findOne({
      where: {
        id: word_id,
      },
    })
    if (!word) {
      throw new BadRequestException("Không tìm thấy từ tương ứng");
    }
    const relatedVerb = this.relatedVerbRepo.create({
      ...createRelatedVerbDto,
      word: word,
    });
    return await this.relatedVerbRepo.save(relatedVerb);
  }

  async findAll() {
      return await this.relatedVerbRepo.find();
    }

  async findOne(id: number) {
    return await this.relatedVerbRepo.findOne({
      where: {
        id: id,
      },
      relations: {
        word: true,
      },
    });
  }

  update(id: number, updateRelatedVerbDto: UpdateRelatedVerbDto) {
    return `This action updates a #${id} relatedVerb`;
  }

  remove(id: number) {
    return `This action removes a #${id} relatedVerb`;
  }
}
