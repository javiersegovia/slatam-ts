import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { UpdateUserInput } from './dto/update-user.input'
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  getUser(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId },
    })
  }

  getAllUsers() {
    return this.prisma.user.findMany()
  }

  getUserPosts(userId: number) {
    return this.prisma.user
      .findUnique({
        where: {
          id: userId,
        },
      })
      .posts()
  }

  async updateUser(data: UpdateUserInput & { userId: number }) {
    const { information, userId, ...userData } = data

    if (information) {
      const { address, nationality, ...dataInfo } = information

      const existingInfo = await this.prisma.userInformation.findFirst({
        where: {
          userId,
        },
      })

      const updatedInfo = await this.prisma.userInformation.upsert({
        create: {
          ...dataInfo,
          user: {
            connect: {
              id: userId,
            },
          },
          nationality: {
            connect: nationality?.map((country) => ({
              id: country.id,
            })),
          },
        },
        update: {
          ...dataInfo,
          nationality: {
            set: nationality?.map((country) => ({
              id: country.id,
            })),
          },
        },
        where: {
          id: existingInfo?.id || '',
        },
      })

      if (address) {
        // TODO: move this update logic to the ADDRESS SERVICE inside location module
        const { country, ...dataAddress } = address

        const existingAddress = await this.prisma.address.findFirst({
          where: {
            owner: {
              id: updatedInfo.id,
            },
          },
        })

        await this.prisma.address.upsert({
          create: {
            ...dataAddress,
            country: {
              connect: {
                id: country.id,
              },
            },
            owner: {
              connect: {
                id: updatedInfo.id,
              },
            },
          },
          update: {
            ...dataAddress,
            country: {
              connect: {
                id: country.id,
              },
            },
          },
          where: {
            id: existingAddress?.id || '',
          },
        })
      }
    }

    return this.prisma.user.update({
      where: {
        id: data.userId,
      },
      data: {
        ...userData,
      },
    })
  }
}
