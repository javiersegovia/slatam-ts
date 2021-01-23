import { PrismaClient } from '@prisma/client'

export async function categorySeeds(prisma: PrismaClient) {
  const _category1 = await prisma.category.create({
    data: {
      name: 'Beauty & Personal Care',
    },
  })
  const _category2 = await prisma.category.create({
    data: {
      name: 'Consumer Electronics',
    },
  })
  const _category3 = await prisma.category.create({
    data: {
      name: 'Apparel',
    },
  })
  const _category4 = await prisma.category.create({
    data: {
      name: 'Vehicles & Accesories',
    },
  })
  const _category5 = await prisma.category.create({
    data: {
      name: 'Sports & Entertainment',
    },
  })
  const _category6 = await prisma.category.create({
    data: {
      name: 'Machinery',
    },
  })
  const _category7 = await prisma.category.create({
    data: {
      name: 'Home & Garden',
    },
  })
  const _category8 = await prisma.category.create({
    data: {
      name: 'Packaging & Printing',
    },
  })
  const _category9 = await prisma.category.create({
    data: {
      name: 'Minerals & Metallurgy',
    },
  })
  const _category10 = await prisma.category.create({
    data: {
      name: 'Energy',
    },
  })
}
