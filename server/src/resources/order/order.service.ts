import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateOrderInput } from './dto/create-order.input'

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  getAllOrders() {
    return this.prisma.order.findMany({
      include: {
        products: true,
      },
    })
  }

  async getOrder(orderId: number) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        products: true,
      },
    })

    if (!order) {
      throw new NotFoundException('NOT_FOUND')
    }

    return order
  }

  createOrder(data: CreateOrderInput, user: any) {
    const totalPrice = data.price * data.quantity
    const { sellerId, ...orderData } = data
    return this.prisma.order.create({
      data: {
        totalPrice: totalPrice,
        owner: {
          connect: { id: user.id },
        },
        products: {
          create: [
            {
              ...orderData,
              seller: {
                connect: { id: sellerId },
              },
            },
          ],
        },
      },
    })
  }
}
