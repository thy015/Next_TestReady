import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards, Req, Query } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { UpdateCheckoutDto } from './dto/update-checkout.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guards';

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

  @Get("success/:idSession")
  successfulSession(@Param("idSession") idSession: string, @Query('idCus') idUser: number) {
    return this.checkoutService.susscessSession(idUser,idSession);
  }

  @Get("get-package")
  @UseGuards(JwtAuthGuard)
  getPackage(@Req() req){
    return this.checkoutService.findPackageByIdUser(req.user.id)
  }

  

}
