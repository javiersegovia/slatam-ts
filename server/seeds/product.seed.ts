import { PrismaClient } from '@prisma/client'

export async function productSeeds(prisma: PrismaClient) {
  const _product1 = await prisma.product.create({
    data: {
      name: 'Nike Shoes',
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
