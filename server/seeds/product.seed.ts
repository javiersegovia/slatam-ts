import { PrismaClient } from '@prisma/client'

export async function productSeeds(prisma: PrismaClient) {
  const _product1 = await prisma.product.create({
    data: {
      name: 'Nike Shoes',
      price: 4,
      description: 'Beautiful nike shoes size 24',
      status: 'INACTIVE',
      owner: {
        connect: {
          id: 1,
        },
      },
    },
  })
  const _product2 = await prisma.product.create({
    data: {
      name: 'Adidas Shoes',
      price: 3,
      description: 'Beautiful sport Adidas shoes',
      status: 'ACTIVE',
      owner: {
        connect: {
          id: 2,
        },
      },
    },
  })
}
