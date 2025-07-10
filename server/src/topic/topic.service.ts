import { Injectable } from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Topic } from './entities/topic.entity';
import { Repository } from 'typeorm';
import { Word } from 'src/word/entities/word.entity';

@Injectable()
export class TopicService {

  constructor(
    @InjectRepository(Topic)
    private readonly topicRepo: Repository<Topic>,

    @InjectRepository(Word)
    private readonly wordRepo: Repository<Word>,
  ) {}

  async create(createTopicDto: CreateTopicDto) {
    const topic = this.topicRepo.create(createTopicDto);
    return await this.topicRepo.save(topic);
  }

  async findAll() {
    return await this.topicRepo.find();
  }

  async findOne(id: number) {
    return await this.topicRepo.findOne({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateTopicDto: UpdateTopicDto) {
    return `This action updates a #${id} topic`;
  }

  remove(id: number) {
    return `This action removes a #${id} topic`;
  }
}
