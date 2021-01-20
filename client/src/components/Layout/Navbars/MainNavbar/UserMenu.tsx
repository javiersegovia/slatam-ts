import React from 'react'
import _tw from 'twin.macro'
import Link from 'next/link'
import { AvatarWithMenu } from '@components/Avatar'
import { User } from '@graphql/schema'
import { NestedPartialExcept } from '@lib/utils/types'
import routes from '@lib/utils/routes'

const LoadingUserProfileSkeleton = () => {
  return (
    <div tw="animate-pulse flex items-center space-x-4">
      <div tw="rounded-md bg-gray-300 block h-10 w-24" />
      <div tw="rounded-md bg-gray-300 block h-10 w-12" />
    </div>
  )
}

interface IUserLoggedIn {
  user: NestedPartialExcept<User, 'email'>
}

const UserLoggedIn = ({ user }: IUserLoggedIn) => {
  return (
    <div tw="flex items-center space-x-4">
      <div tw="ml-5">
        <AvatarWithMenu user={user} />
      </div>
    </div>
  )
}

interface IUserMenu {
  isLoading: boolean
  user?: NestedPartialExcept<User, 'email'>
}

const UserMenu = ({ isLoading, user }: IUserMenu) => {
  if (isLoading) {
    return (
      <div tw="hidden md:block">
        <LoadingUserProfileSkeleton />
      </div>
    )
  }

  if (user) {
    return (
      <div tw="hidden ml-auto md:flex items-center space-x-6 divide-x">
        <Link href={routes.dashboard.index}>
          <a
            href={routes.dashboard.index}
            className="whitespace-nowrap inline-flex transition duration-100 items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-800 hover:bg-blue-900"
          >
            Go to dashboard
          </a>
        </Link>
        <UserLoggedIn user={user} />
      </div>
    )
  }

  return (
    <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
      <Link href={routes.session.signIn}>
        <a
          href={routes.session.signIn}
          className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
        >
          Sign in
        </a>
      </Link>
      <Link href={routes.session.signOut}>
        <a className="ml-8 whitespace-nowrap inline-flex transition duration-100 items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-800 hover:bg-blue-900">
          Sign up
        </a>
      </Link>
    </div>
  )
}

export default UserMenu
