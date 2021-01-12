import { Resolver, ResolveField, Root, Query, Args } from '@nestjs/graphql'
import { User } from './user.entity'
import { UserService } from './user.service'

@Resolver(User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @ResolveField('posts')
  async posts(@Root() user: User) {
    return this.userService.getUserPosts(user.id)
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
