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

  async createOrder(data: CreateOrderInput | any, user: any) {
    // TODO create the order using the productIds
    // and fetching the data from the DB, not with data provided by the frontend
    const productOrderPrices = []
    const orderProducts = data.products.map(
      (orderProduct) =>
        (orderProduct = {
          ...orderProduct,
          seller: { connect: { id: orderProduct.sellerId } },
        })
    )
    orderProducts.forEach((orderProduct) => {
      delete orderProduct.sellerId
      productOrderPrices.push(orderProduct.quantity * orderProduct.price)
    })
    const totalPrice = productOrderPrices.reduce(
      (totalPrice, price) => totalPrice + price
    )

    return this.prisma.order.create({
      data: {
        totalPrice: totalPrice,
        owner: {
          connect: { id: user.id },
        },
        products: {
          create: orderProducts,
        },
      },
    })
  }

  updateOrder(data: UpdateOrderInput | any) {
    const { owner, ...orderProductsData } = data
    const orderProductPrices = []
    const orderProducts = orderProductsData.products.map(
      (orderProduct) =>
        (orderProduct = {
          data: {
            ...orderProduct,
            seller: { connect: { id: orderProduct.sellerId } },
          },
          where: { id: orderProduct.id },
        })
    )
    orderProducts.forEach((orderProduct) => {
      delete orderProduct.data.sellerId
      delete orderProduct.data.id
      orderProductPrices.push(
        orderProduct.data.quantity * orderProduct.data.price
      )
    })
    const totalPrice = orderProductPrices.reduce(
      (totalPrice, price) => totalPrice + price
    )

    return this.prisma.order.update({
      where: {
        id: orderProductsData.id,
      },
      data: {
        totalPrice: totalPrice,
        owner: {
          connect: { id: owner },
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
