import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards, Req, Query } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { UpdateCheckoutDto } from './dto/update-checkout.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guards';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';

@Controller('checkout')

export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) { }

  @Post("create-session")
  @UseGuards(JwtAuthGuard)
  createSession(@Req() req, @Body(ValidationPipe) createCheckoutDto: CreateCheckoutDto) {
    return this.checkoutService.createSession(createCheckoutDto, req.user.id);
  }
@Post('create-payment-intent')
@UseGuards(JwtAuthGuard)
createPaymentIntent(
  @Req() req,
  @Body(ValidationPipe) createCheckoutDto: CreateCheckoutDto
) {
  return this.checkoutService.createPaymentIntent(createCheckoutDto, req.user.id);
}

@Post('confirm-payment')
@UseGuards(JwtAuthGuard)
confirmPayment(@Req() req, @Body() dto: ConfirmPaymentDto) {
  return this.checkoutService.confirmPayment(req.user.id, dto);
}

  @Get("get-package")
  @UseGuards(JwtAuthGuard)
  getPackage(@Req() req){
    return this.checkoutService.findPackageByIdUser(req.user.id)
  }

  

}
