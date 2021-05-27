import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'
import userSeeds from './user.seed'
import companySeeds from './company.seed'
import productSeeds from './product.seed'
import countrySeeds from './country.seed'
import categorySeeds from './category.seed'

const prisma = new PrismaClient()

async function seedTheDB(prisma) {
  dotenv.config()
  console.log('Seeding...')

  /**
   * First, all the base seeds
   */
  await Promise.all(categorySeeds(prisma))
  await countrySeeds(prisma)

  /**
   * Then, all the seeds with dependencies
   */
  await userSeeds(prisma)
  await companySeeds(prisma)
  // await productSeeds(prisma)
}

seedTheDB(prisma)
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
