/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'

const prisma = new PrismaClient()

async function main() {
  dotenv.config()
  console.log('Seeding...')

  const user1 = await prisma.user.create({
    data: {
      email: 'lisa@simpson.com',
      firstName: 'Lisa',
      lastName: 'Simpson',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
      posts: {
        create: {
          title: 'Join us for Prisma Day 2019 in Berlin',
          content: 'https://www.prisma.io/day/',
          published: true,
        },
      },
      verification: {
        create: {
          verifiedEmail: true,
        },
      },
    },
  })
  const user2 = await prisma.user.create({
    data: {
      email: 'bart@simpson.com',
      firstName: 'Bart',
      lastName: 'Simpson',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
      verification: {
        create: {
          verifiedEmail: true,
        },
      },
      posts: {
        create: [
          {
            title: 'Subscribe to GraphQL Weekly for community news',
            content: 'https://graphqlweekly.com/',
            published: true,
          },
          {
            title: 'Follow Prisma on Twitter',
            content: 'https://twitter.com/prisma',
            published: false,
          },
        ],
      },
    },
  })
  const user3 = await prisma.user.create({
    data: {
      email: 'homero@simpson.com',
      firstName: 'Homero',
      lastName: 'Simpson',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
      verification: {
        create: {
          verifiedEmail: true,
        },
      },
    },
  })
  const company1 = await prisma.company.create({
    data: {
      name: 'Slatam Company',
      members: {
        create: [
          {
            user: {
              connect: {
                id: user1.id,
              },
            },
            roles: ['MEMBER'],
          },
        ],
      },
    },
  })
  const company2 = await prisma.company.create({
    data: {
      name: 'Example Company',
      members: {
        create: [
          {
            user: {
              connect: {
                id: user2.id,
              },
            },
            roles: ['MEMBER', 'MANAGER'],
          },
        ],
      },
    },
  })
  const company3 = await prisma.company.create({
    data: {
      name: 'Example Company with Owner',
      members: {
        create: [
          {
            user: {
              connect: {
                id: user3.id,
              },
            },
            roles: ['MEMBER', 'MANAGER', 'OWNER'],
          },
        ],
      },
    },
  })

  const product1 = await prisma.product.create({
    data: {
      name: 'Nike Shoes',
      description: 'Beautiful nike shoes size 24',
      status: 'INACTIVE',
      owner: {
        connect: {
          id: company1.id,
        },
      },
    },
  })
  const product2 = await prisma.product.create({
    data: {
      name: 'Adidas Shoes',
      description: 'Beautiful sport Adidas shoes',
      status: 'ACTIVE',
      owner: {
        connect: {
          id: company2.id,
        },
      },
    },
  })

  const country1 = await prisma.country.create({
    data: {
      name: 'Venezuela',
      flag: 'https://restcountries.eu/data/ven.svg',
      code2: 'VE',
    },
  })

  console.log('Seeding is done!')
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
