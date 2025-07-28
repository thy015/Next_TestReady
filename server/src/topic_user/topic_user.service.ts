import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTopicUserDto } from './dto/create-topic_user.dto';
import { UpdateTopicUserDto } from './dto/update-topic_user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Topic } from 'src/topic/entities/topic.entity';
import { TopicUser } from './entities/topic_user.entity';

@Injectable()
export class TopicUserService {

  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,

    @InjectRepository(Topic)
    private topicRepo: Repository<Topic>,

    @InjectRepository(TopicUser)
    private topicUserRepo: Repository<TopicUser>,
  ) { }

  async create(idUser: number, createTopicUserDto: CreateTopicUserDto) {
    const { topicID, isDone } = createTopicUserDto
    const user = await this.userRepo.findOne({ where: { id: idUser } })
    if (!user)
      throw new BadRequestException("Không tìm thấy người dùng !")
    const topic = await this.topicRepo.findOne({ where: { id: topicID } })
    if (!topic)
      throw new BadRequestException("Không tìm thấy chủ đề từ vựng nào !")
    const createdTopicUser = this.topicUserRepo.create({ ...createTopicUserDto, user: user, topic: topic })
    return await this.topicUserRepo.save(createdTopicUser);
  }

  async findAllByUser(idUser: number) {
    const topicUser = await this.topicUserRepo.find({
      where: {
        user: { id: idUser }
      },
      relations: ["topic"]
    })
    return topicUser;
  }

  findOne(id: number) {
    return `This action returns a #${id} topicUser`;
  }

  async updateDone(idUser: number, updateTopicUserDto: UpdateTopicUserDto) {
    const { topicID, isDone } = updateTopicUserDto
    const topicUser = await this.topicUserRepo.findOne({
      where: {
        user: { id: idUser },
        topic: { id: topicID }
      }
    })

    if(!topicUser)
      throw new BadRequestException("Người dùng chưa học chủ đề này")
    topicUser.isDone = isDone ?? false
    return await this.topicUserRepo.save(topicUser);
  }

  remove(id: number) {
    return `This action removes a #${id} topicUser`;
  }
}
