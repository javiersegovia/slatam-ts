import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateOrderInput } from './dto/create-order.input'
import { UpdateOrderInput } from './dto/update-order.input'

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  getAllOrders() {
    return this.prisma.order.findMany()
  }

  async getOrder(orderId: number) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
    })

    if (!order) {
      throw new NotFoundException('NOT_FOUND')
    }

    return order
  }

  createOrder(data: CreateOrderInput) {
    // TODO create the order using the productIds
    // and fetching the data from the DB, not with data provided by the frontend

    const totalPrice = data.products.reduce(
      (totalPrice, orderProduct) =>
        totalPrice + orderProduct.price * orderProduct.quantity,
      0
    )

    return this.prisma.order.create({
      data: {
        totalPrice: totalPrice,
        buyer: {
          connect: { id: data.buyerId },
        },
        seller: {
          connect: { id: data.sellerId },
        },
        products: {
          create: data.products,
        },
      },
    })
  }

  updateOrder(data: UpdateOrderInput) {
    const orderProducts = data.products.map((orderProduct) => {
      const { id, ...orderProductData } = orderProduct
      return {
        data: {
          ...orderProductData,
        },
        where: { id: id },
      }
    })
    const totalPrice = orderProducts.reduce(
      (totalPrice, orderProduct) =>
        totalPrice + orderProduct.data.price * orderProduct.data.quantity,
      0
    )

    return this.prisma.order.update({
      where: {
        id: data.id,
      },
      data: {
        totalPrice: totalPrice,
        buyer: {
          connect: { id: data.buyerId },
        },
        seller: {
          connect: { id: data.sellerId },
        },
        products: {
          update: orderProducts,
        },
      },
    })
  }

  async deleteOrder(orderId) {
    const orderProducts = await this.prisma.orderProduct.findMany({
      where: {
        orderId: orderId,
      },
      select: {
        id: true,
      },
    })

    await this.prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        products: {
          delete: orderProducts,
        },
      },
    })

    return this.prisma.order.delete({
      where: {
        id: orderId,
      },
    })
  }
}
