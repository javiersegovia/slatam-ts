import 'reflect-metadata'
import { Resolver, Query, Args } from '@nestjs/graphql'
import { User } from '../models/user'

// @InputType()
// class SignupUserInput {
//   @Field({ nullable: true })
//   name: string

//   @Field()
//   email: string
// }

@Resolver(User)
export class UserResolver {
  // @ResolveField()
  // async posts(@Root() user: User, @Context() ctx): Promise<Post[]> {
  //   return this.prismaService.user
  //     .findOne({
  //       where: {
  //         id: user.id,
  //       },
  //     })
  //     .posts()
  // }
  // @Mutation((returns) => User)
  // async signupUser(
  //   @Args('data') data: SignupUserInput,
  //   @Context() ctx
  // ): Promise<User> {
  //   return this.prismaService.user.create({
  //     data: {
  //       email: data.email,
  //       name: data.name,
  //     },
  //   })
  // }
  // @Query((returns) => User, { nullable: true })
  // async user(@Args('id') id: number, @Context() ctx) {
  //   return this.prismaService.user.findOne({
  //     where: { id: id },
  //   })
  // }

  @Query(() => String)
  helloWorld(): string {
    return 'Hello World!'
  }
  @Query(() => String)
  hello(@Args('name') name: string): string {
    return `Hello ${name}!`
  }
}
