import { PassportSerializer } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@resources/prisma/prisma.service'
import { CompanyMember, User, UserVerification } from '@prisma/client'

export type TCurrentUser = User & {
  companyMember: CompanyMember
  verification: UserVerification
}

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly prisma: PrismaService) {
    super()
  }

  serializeUser(user: User, done: (err: Error, userId: number) => void): void {
    done(null, user.id)
  }

  async deserializeUser(
    userId: number | undefined,
    done: (err: Error, user: User) => void
  ): Promise<void> {
    const user: TCurrentUser = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        companyMember: true,
        verification: true,
      },
    })

    done(null, user)
  }
}
