import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRespo : Repository<User>,
    private jwtService: JwtService
  ){}

  async comparePassword(passwordInput:string, password:string){
    return await bcrypt.compare(passwordInput,password)
  }

  async validateUser({email,password}:CreateAuthDto){
    const findUser = await this.userRespo.findOne({where:{email:email}})
    if(!findUser) return null
    if(await this.comparePassword(password,findUser.password)){
      const user = {
        id:findUser.id,
        fullname:findUser.fullname,
        email:findUser.email
      }

     return { access_token:this.jwtService.sign(user),user_payload:user}
    } 
  }
}
