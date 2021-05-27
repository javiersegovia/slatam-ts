import { PrismaClient } from '@prisma/client'

function categorySeeds(prisma: PrismaClient) {
  const categories = [
    'Apparel',
    'Beauty & Personal Care',
    'Consumer Electronics',
    'Vehicles & Accesories',
    'Sports & Entertainment',
    'Machinery',
    'Home & Garden',
    'Packaging & Printing',
    'Minerals & Metallurgy',
    'Energy',
  ]

  return categories.map((category) =>
    prisma.category.create({
      data: {
        name: category,
      },
    })
  )
}

export default categorySeeds
