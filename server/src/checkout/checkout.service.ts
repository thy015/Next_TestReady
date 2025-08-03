import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { UpdateCheckoutDto } from './dto/update-checkout.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Checkout } from './entities/checkout.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { CategoryCourse } from 'src/category_course/entities/category_course.entity';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';
require('dotenv').config()
const dayjs = require("dayjs")
const stripe = require('stripe')('sk_test_51PxVYpBpaG5M20JqFZ3ejIPwqz5ghKCuVJ3mm2XsC0mtg97l2LzsQPkrHUmHAZ3KTfUTCeJapgLmRWy1tyBYhHES00qv9UQAlz');

@Injectable()
export class CheckoutService {

  constructor(
    @InjectRepository(User)
    private user: Repository<User>,

    @InjectRepository(Checkout)
    private checkOut: Repository<Checkout>,
  ) { }

  async createSession(createCheckoutDto: CreateCheckoutDto, idCus: number) {
    const { idPackage, name, duration, price, price_per_month, discount } = createCheckoutDto
    const session = await stripe.checkout.sessions.create({
      line_items: [{
        price_data: {
          currency: "usd",
          product_data: {
            name: name,
            metadata: {
              productId: idPackage,
              duration: duration
            }
          },
          unit_amount: discount === 0 ? price : price - discount
        },
        quantity: 1
      }],
      client_reference_id: idCus,
      mode: "payment",
      success_url: `http://localhost:4040/checkout/success/{CHECKOUT_SESSION_ID}?idCus=${idCus}`,
      cancel_url: "http://localhost:4040/checkout/failed"
    })

    return session

  }
async createPaymentIntent(createCheckoutDto: CreateCheckoutDto, idCus: number) {
  const { idPackage, name, duration, price, price_per_month, discount } = createCheckoutDto;

  const amount = discount === 0 ? price : price - discount;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: 'vnd',
    metadata: {
      idPackage,
      name,
      duration,
      userId: idCus
    },
    automatic_payment_methods: {
      enabled: true,
    }
  });

  return {
    clientSecret: paymentIntent.client_secret,
  };
}

  async confirmPayment(idCus: number, confirmDto: ConfirmPaymentDto) {
  if (!idCus) {
    throw new BadRequestException("Thiếu ID người dùng");
  }

  const user = await this.user.findOne({ where: { id: idCus } });
  if (!user) {
    throw new BadRequestException("Không tìm thấy người dùng");
  }

  const { idPackage, duration } = confirmDto;

  if (!idPackage || !duration) {
    throw new BadRequestException("Thiếu thông tin gói hoặc thời hạn");
  }

  const expire = dayjs().add(duration, "month").toDate();

  const userPackage = await this.checkOut.findOne({
    where: { user: { id: idCus } },
  });

  if (userPackage) {
    userPackage.id_package = idPackage;
    userPackage.expirePackage = expire;
    return await this.checkOut.save(userPackage);
  }

  const createdPackage = this.checkOut.create({
    id_package: idPackage,
    user: user,
    expirePackage: expire,
  });

  return await this.checkOut.save(createdPackage);
}

  async findPackageByIdUser(idUser: number) {
    const userPackage = await this.checkOut.findOne({
      where: {
        user: { id: idUser }
      }
    })
    if (!userPackage)
      return { status: false, message: "Chưa mua gói" }
    const now = dayjs()
    const expireDate = dayjs(userPackage.expirePackage)
    const couterDate = expireDate.diff(now, "day")
    const isStillValid = expireDate.isAfter(now)
    return { status: isStillValid, counterDay: couterDate };
  }


}
