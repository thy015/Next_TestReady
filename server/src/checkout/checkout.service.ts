import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { UpdateCheckoutDto } from './dto/update-checkout.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Checkout } from './entities/checkout.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { CategoryCourse } from 'src/category_course/entities/category_course.entity';
require('dotenv').config()
const dayjs = require("dayjs")
const stripe = require('stripe')(process.env.STRIPE_SKEY);

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
          currency: "vnd",
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

  async susscessSession(idCus: number, idSession: string) {
    if (!idCus)
      throw new BadRequestException("Mất id người dùng")
    const user = await this.user.findOne({ where: { id: idCus } });
    if (!user)
      throw new BadRequestException("Không tìm thấy người dùng");
    if (!idSession)
      throw new BadRequestException("Không thấy idSession");

    const session = await stripe.checkout.sessions.retrieve(idSession, { expand: ["line_items.data.price.product"] });
    const { productId, duration } = session.line_items.data[0].price.product?.metadata;
    if (!productId)
      throw new BadRequestException("Không tìm thấy gói");
    const expire = dayjs().add(duration, "month").toDate()

    const userPackage = await this.checkOut.findOne({
      where: {
        user: { id: idCus }
      }
    })
    if (userPackage) {
      userPackage.id_package = productId
      userPackage.expirePackage = expire
      return await this.checkOut.save(userPackage)
    }
    const createdPackage = this.checkOut.create({ id_package: productId, user: user, expirePackage: expire });
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
