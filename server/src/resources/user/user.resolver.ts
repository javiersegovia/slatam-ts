import 'reflect-metadata'
import { Resolver, ResolveField, Root, Query, Args } from '@nestjs/graphql'
import { User, UserService } from '.'

@Resolver(User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @ResolveField()
  async posts(@Root() user: User) {
    return this.userService.getUserPosts(user.id)
  }

  @Query(() => User, { nullable: true })
  getUser(@Args('id') id: string) {
    return this.userService.getUser(id)
  }

  @Query(() => [User], { nullable: true })
  getAllUsers() {
    return this.userService.getAllUsers()
  }
}
