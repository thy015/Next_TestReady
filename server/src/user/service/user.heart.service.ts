import { Injectable } from '@nestjs/common';
import { CreateHeartDto } from '../dto/create-heart.dto';
import { UpdateHeartDto } from '../dto/update-heart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Heart } from '../entities/heart.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HeartService {

  constructor(
    @InjectRepository(Heart)
    private heart: Repository<Heart>
  ){}

  // async create(createHeartDto: CreateHeartDto) {
  //   const heartCreated =  this.heart.create(createHeartDto)
  //   this.heart.save(heartCreated)
  //   return  this.heart.save(heartCreated);
  // }

  async createAuto() {
    var heart: CreateHeartDto = {
      balance:5,
      total_spent:0,
      total_earned:0,
      recover_time:5,
      max_amount:5,
    }
    const heartCreated =  this.heart.create(heart)

    return await this.heart.save(heartCreated);
  }


  update(id: number, updateHeartDto: UpdateHeartDto) {
    return `This action updates a #${id} heart`;
  }

}
