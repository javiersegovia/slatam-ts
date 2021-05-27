import { PrismaClient } from '@prisma/client'

async function userSeeds(prisma: PrismaClient) {
  const _user1 = await prisma.user.create({
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
  const _user2 = await prisma.user.create({
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
  const _user3 = await prisma.user.create({
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
}

export default userSeeds
