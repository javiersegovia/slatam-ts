import { PassportSerializer } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@resources/prisma/prisma.service'
import { User } from '@prisma/client'

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly prisma: PrismaService) {
    super()
  }

  serializeUser(user: any, done: (err: Error, user: any) => void): any {
    done(null, user.id)
  }

  async deserializeUser(
    userId: any,
    done: (err: Error, user: User) => void
  ): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } })

    done(null, user)
  }
}
