import {
  ExecutionContext,
  Injectable,
  CanActivate,
  ForbiddenException,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

@Injectable()
export class IsAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = GqlExecutionContext.create(context).getContext().req
    const can = await request.isAuthenticated()

    if (!can) {
      throw new ForbiddenException('UNAUTHENTICATED')
    }

    return can
  }
}
