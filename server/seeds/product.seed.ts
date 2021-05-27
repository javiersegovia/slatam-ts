import { PrismaClient } from '@prisma/client'

async function productSeeds(prisma: PrismaClient) {
  const _product1 = await prisma.product.create({
    data: {
      name: 'Nike Shoes',
      price: 400,
      status: 'INACTIVE',
      information: {
        create: {
          description: 'Beautiful nike shoes size 24',
          category: {
            connect: {
              id: 1,
            },
          },
        },
      },
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
      status: 'ACTIVE',
      information: {
        create: {
          description: 'Beautiful sport Adidas shoes',
          category: {
            connect: {
              id: 1,
            },
          },
        },
      },
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
      status: 'ACTIVE',
      information: {
        create: {
          description: 'A great bicycle',
          category: {
            connect: {
              id: 1,
            },
          },
        },
      },
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
      status: 'ACTIVE',
      information: {
        create: {
          description: 'A high quality golf bag',
          category: {
            connect: {
              id: 1,
            },
          },
        },
      },
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
      status: 'ACTIVE',
      information: {
        create: {
          description: 'We provide a high quality aluminum',
          category: {
            connect: {
              id: 1,
            },
          },
        },
      },
      owner: {
        connect: {
          id: 1,
        },
      },
    },
  })
}

export default productSeeds
