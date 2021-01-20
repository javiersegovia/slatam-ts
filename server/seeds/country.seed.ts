import { PrismaClient } from '@prisma/client'

export async function countrySeeds(prisma: PrismaClient) {
  const _country1 = await prisma.country.create({
    data: {
      name: 'Venezuela',
      flag: 'https://restcountries.eu/data/ven.svg',
      code2: 'VE',
    },
  })
}
