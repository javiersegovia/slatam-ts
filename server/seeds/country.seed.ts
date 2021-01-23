import { PrismaClient } from '@prisma/client'

export async function countrySeeds(prisma: PrismaClient) {
  const _country1 = await prisma.country.create({
    data: {
      name: 'Venezuela',
      flag: 'https://restcountries.eu/data/ven.svg',
      code2: 'VE',
    },
  })
  const _country2 = await prisma.country.create({
    data: {
      name: 'United States',
      flag: 'https://restcountries.eu/data/usa.svg',
      code2: 'US',
    },
  })
  const _country3 = await prisma.country.create({
    data: {
      name: 'Colombia',
      flag: 'https://restcountries.eu/data/col.svg',
      code2: 'CO',
    },
  })
  const _country4 = await prisma.country.create({
    data: {
      name: 'Spain',
      flag: 'https://restcountries.eu/data/esp.svg',
      code2: 'ES',
    },
  })
  const _country5 = await prisma.country.create({
    data: {
      name: 'Canada',
      flag: 'https://restcountries.eu/data/can.svg',
      code2: 'CA',
    },
  })
  const _country6 = await prisma.country.create({
    data: {
      name: 'Brazil',
      flag: 'https://restcountries.eu/data/bra.svg',
      code2: 'BR',
    },
  })
  const _country7 = await prisma.country.create({
    data: {
      name: 'Mexico',
      flag: 'https://restcountries.eu/data/mex.svg',
      code2: 'MX',
    },
  })
  const _country8 = await prisma.country.create({
    data: {
      name: 'United Kingdom',
      flag: 'https://restcountries.eu/data/gbr.svg',
      code2: 'GB',
    },
  })
  const _country9 = await prisma.country.create({
    data: {
      name: 'China',
      flag: 'https://restcountries.eu/data/ven.chn',
      code2: 'CN',
    },
  })
  const _country10 = await prisma.country.create({
    data: {
      name: 'Chile',
      flag: 'https://restcountries.eu/data/chl.svg',
      code2: 'cl',
    },
  })
}
