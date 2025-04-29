import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Diamond } from "../entities/diamond.entity";
import { Repository } from "typeorm";
import { CreateDiamondDto } from "../dto/create-diamond.dto";

@Injectable()
export class DiamondService{

    constructor(
        @InjectRepository(Diamond)
        private diamondRespo : Repository<Diamond>
    ){}

    async createAuto(){
        const diamond: CreateDiamondDto={
            balance:100,
            total_earned:0,
            total_spent:0
        }
        const diamondCreated = this.diamondRespo.create(diamond)
        return await this.diamondRespo.save(diamond)
    }

}