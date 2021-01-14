import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'
import { InputType } from '@nestjs/graphql'

// TODO: clean DTO

@InputType()
export class LoginInput {
  @IsEmail()
  email: string

  @IsNotEmpty()
  @MinLength(8)
  password: string
}
