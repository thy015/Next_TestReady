import { Module } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutController } from './checkout.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Checkout } from './entities/checkout.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Checkout])],
  controllers: [CheckoutController],
  providers: [CheckoutService],
})
export class CheckoutModule {}
