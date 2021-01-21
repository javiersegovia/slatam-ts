import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'
import { userSeeds } from './user.seed'
import { companySeeds } from './company.seed'
import { productSeeds } from './product.seed'
import { countrySeeds } from './country.seed'
import { categorySeeds } from './category.seed'

const prisma = new PrismaClient()

async function seedTheDB(prisma) {
  dotenv.config()
  console.log('Seeding...')

  await userSeeds(prisma)
  await companySeeds(prisma)
  await productSeeds(prisma)
  await countrySeeds(prisma)
  await categorySeeds(prisma)

  console.log('Seeding is done!')
}

seedTheDB(prisma)
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
