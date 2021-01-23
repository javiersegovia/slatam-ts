import { PrismaClient } from '@prisma/client'

export async function productSeeds(prisma: PrismaClient) {
  const _product1 = await prisma.product.create({
    data: {
      name: 'Nike Shoes',
      price: 400,
      description: 'Beautiful nike shoes size 24',
      status: 'INACTIVE',
      owner: {
        connect: {
          id: 2,
        },
      },
    },
  })
  const _product2 = await prisma.product.create({
    data: {
      name: 'Adidas Shoes',
      price: 300,
      description: 'Beautiful sport Adidas shoes',
      status: 'ACTIVE',
      owner: {
        connect: {
          id: 2,
        },
      },
    },
  })
  const _product3 = await prisma.product.create({
    data: {
      name: 'Trek Bicycle',
      price: 10000,
      description: 'A great bicycle',
      status: 'ACTIVE',
      owner: {
        connect: {
          id: 3,
        },
      },
    },
  })
  const _product4 = await prisma.product.create({
    data: {
      name: 'OEM Stand Golf Bag',
      price: 300,
      description: 'A high quality golf bag',
      status: 'ACTIVE',
      owner: {
        connect: {
          id: 3,
        },
      },
    },
  })
  const _product5 = await prisma.product.create({
    data: {
      name: '6063 Aluminum Sheet',
      price: 300,
      description: 'We provide a high quality aluminum',
      status: 'ACTIVE',
      owner: {
        connect: {
          id: 1,
        },
      },
    },
  })
}
