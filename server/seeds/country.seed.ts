import fs from 'fs'
import { join } from 'path'
import { PrismaClient } from '@prisma/client'

async function countrySeeds(prisma: PrismaClient) {
  const rawFile = fs.readFileSync(
    join(process.cwd(), 'seeds/data/countries_states_cities.json'),
    'utf8'
  )
  const countriesData = JSON.parse(rawFile)

  const formattedRegions = countriesData.reduce((total, country) => {
    if (!country.region) {
      return {
        ...total,
      }
    }
    return {
      ...total,
      [country.region]: country.subregion
        ? [...new Set([...(total[country.region] || []), country.subregion])]
        : [...(total[country.region] || [])],
    }
  }, {})

  const promisesOfRegions = Object.keys(formattedRegions)
    .map((key) => {
      if (!key) return null
      const subRegions = formattedRegions[key]

      return prisma.region.create({
        data: {
          name: key,
          subRegions: subRegions.length
            ? {
                create: subRegions.map((subregion) => ({
                  name: subregion,
                })),
              }
            : undefined,
        },
      })
    })
    .filter(Boolean)

  await Promise.all(promisesOfRegions)

  const regions = await prisma.region.findMany({
    include: {
      subRegions: true,
    },
  })

  const formattedRegionsWithIds = regions.reduce((total, region) => {
    const subRegions = region.subRegions.length
      ? region.subRegions.reduce((totalSubRegions, subRegion) => {
          return {
            ...totalSubRegions,
            [subRegion.name]: subRegion.id,
          }
        }, {})
      : undefined

    return {
      ...total,
      [region.name]: {
        id: region.id,
        subRegions,
      },
    }
  }, {})

  const promisesOfCountries = countriesData.map((country) => {
    const {
      name,
      iso2,
      iso3,
      phone_code,
      capital,
      emoji,
      emojiU,
      latitude,
      longitude,
      region,
      subregion,
      states,
    } = country

    return prisma.country.create({
      data: {
        name,
        code2: iso2,
        code3: iso3,
        phoneCode: phone_code,
        capital,
        emoji,
        emojiU,
        latitude,
        longitude,
        states: states.length
          ? {
              create: states.map((state) => ({
                name: state.name,
                stateCode: state.state_code,
                cities: state.cities?.length
                  ? {
                      create: state.cities.map((city) => ({
                        name: city.name,
                        latitude: city.latitude,
                        longitude: city.longitude,
                      })),
                    }
                  : undefined,
              })),
            }
          : undefined,
        regionId: formattedRegionsWithIds[region]?.id || undefined,
        subRegionId:
          formattedRegionsWithIds[region]?.subRegions?.[subregion] || undefined,
      },
    })
  })

  return Promise.all(promisesOfCountries)
}

export default countrySeeds
