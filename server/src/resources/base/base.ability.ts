import { CompanyMemberRole } from '@resources/company/company-member/company-member.entity'
import { User } from '@resources/user/user.entity'
import { Ability, AbilityClass, AbilityBuilder } from '@casl/ability'
import { TCurrentUser } from '@resources/auth/session.serializer'

export enum Action {
  MANAGE = 'manage', // Manage is a special keyword that represents "all" actions
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
}

export type TPermissions = {
  isMember: boolean
  isManager: boolean
  isOwner: boolean
}

const getPermissions = (user?: TCurrentUser): TPermissions => {
  return {
    isMember: Boolean(
      user?.companyMember?.roles?.includes(CompanyMemberRole.MEMBER)
    ),
    isManager: Boolean(
      user?.companyMember?.roles?.includes(CompanyMemberRole.MANAGER)
    ),
    isOwner: Boolean(
      user?.companyMember?.roles?.includes(CompanyMemberRole.OWNER)
    ),
  }
}

export abstract class BaseAbility<T> {
  createBuilder(user?: TCurrentUser) {
    const builder = new AbilityBuilder<Ability<[Action, T]>>(
      Ability as AbilityClass<Ability<[Action, T]>>
    )

    const permissions = getPermissions(user)

    return {
      builder,
      permissions,
    }
  }

  protected abstract create(user?: TCurrentUser): Ability<[Action, T]>
  protected abstract defineRules({ builder, user, permissions }): void
}
