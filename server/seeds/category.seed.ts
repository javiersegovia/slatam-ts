import { PrismaClient } from '@prisma/client'

export async function categorySeeds(prisma: PrismaClient) {
  const _category1 = await prisma.category.create({
    data: {
      name: 'Technology',
    },
  })
}
