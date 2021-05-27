import { PrismaClient } from '@prisma/client'

async function companySeeds(prisma: PrismaClient) {
  const _company1 = await prisma.company.create({
    data: {
      name: 'Slatam Company',
      members: {
        create: [
          {
            user: {
              connect: {
                id: 1,
              },
            },
            roles: ['MEMBER'],
          },
        ],
      },
    },
  })
  const _company2 = await prisma.company.create({
    data: {
      name: 'Example Company',
      members: {
        create: [
          {
            user: {
              connect: {
                id: 2,
              },
            },
            roles: ['MEMBER', 'MANAGER'],
          },
        ],
      },
    },
  })
  const _company3 = await prisma.company.create({
    data: {
      name: 'Example Company with Owner',
      members: {
        create: [
          {
            user: {
              connect: {
                id: 3,
              },
            },
            roles: ['MEMBER', 'MANAGER', 'OWNER'],
          },
        ],
      },
    },
  })
}

export default companySeeds
