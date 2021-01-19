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
import { IsNotEmpty } from 'class-validator'
import { User } from '../user/user.entity'
import { Post } from './post.entity'
import { PostService } from './post.service'
import { UseGuards } from '@nestjs/common'
import { IsAuthGuard } from '@guards/is-auth.guard'

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
  @UseGuards(IsAuthGuard)
  getPublishedPosts() {
    return this.postService.getPublishedPosts()
  }

  @ResolveField('author', () => User, { nullable: true })
  author(@Root() post: Post) {
    return this.postService.getAuthor(post.id)
  }
}
