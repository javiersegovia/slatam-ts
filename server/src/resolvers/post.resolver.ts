import 'reflect-metadata'
import {
  Resolver,
  ResolveField,
  Root,
  Query,
  Args,
  ArgsType,
  Field,
} from '@nestjs/graphql'
import { User } from '@entities/user.entity'
import { Post } from '@entities/post.entity'
import { PostService } from '@services/post.service'
import { IsNotEmpty } from 'class-validator'

@ArgsType()
export class PostIdArgs {
  @Field()
  @IsNotEmpty()
  id: string
}

@Resolver(Post)
export class PostResolver {
  constructor(private postService: PostService) {}

  @Query(() => Post, { nullable: true })
  getPost(@Args() { id }: PostIdArgs) {
    return this.postService.getPost(id)
  }

  @Query(() => [Post], { nullable: true })
  getPublishedPosts() {
    return this.postService.getPublishedPosts()
  }

  @ResolveField('author', () => User, { nullable: true })
  author(@Root() post: Post) {
    return this.postService.getAuthor(post.id)
  }
}
