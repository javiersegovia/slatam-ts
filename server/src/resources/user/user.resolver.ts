import {
  Resolver,
  ResolveField,
  Parent,
  Root,
  Query,
  Args,
} from '@nestjs/graphql'
import { User } from './user.entity'
import { UserService } from './user.service'
import { PrismaService } from '../prisma/prisma.service'

@Resolver(User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private prisma: PrismaService
  ) {}

  @ResolveField('posts')
  async posts(@Root() user: User) {
    return this.userService.getUserPosts(user.id)
  }

  @ResolveField('companyMember')
  async companyMember(@Parent() user: User) {
    return this.prisma.user
      .findUnique({ where: { id: user.id } })
      .companyMember()
  }

  @Query(() => User, { nullable: true })
  getUser(@Args('id') id: number) {
    return this.userService.getUser(id)
  }

  @Query(() => [User], { nullable: true })
  getAllUsers() {
    return this.userService.getAllUsers()
  }
}
