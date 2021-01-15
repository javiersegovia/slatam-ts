import { IsNotEmpty, MinLength } from 'class-validator'
import { InputType } from '@nestjs/graphql'

@InputType()
export class ResetPasswordInput {
  @IsNotEmpty()
  @MinLength(8)
  password: string

  @IsNotEmpty()
  resetPasswordToken: string
}
