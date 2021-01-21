import React from 'react'
import _tw from 'twin.macro'
import Avatar from '@components/Avatar'
import Box from '@components/UI/Box'
import routes from '@lib/utils/routes'
import Link from 'next/link'
import { NestedPartial } from '@lib/utils/types'
import { User } from '@graphql/schema'

interface INavigationProps {
  user: NestedPartial<User>
}

const Navigation = ({ user }: INavigationProps) => {
  const getUsername = () => {
    const { firstName, lastName, email } = user

    return firstName
      ? lastName
        ? `${firstName} ${lastName}`
        : firstName
      : email
  }
  return (
    <>
      <div tw="col-span-12 lg:col-span-4 2xl:col-span-3 flex lg:block flex-col-reverse">
        <Box tw="mt-5">
          <div tw="relative flex items-center p-5">
            {/*  image-fit */}
            <div tw="w-12 h-12">
              {/* TODO: add image path of user avatar */}
              <Avatar />
            </div>
            <div tw="ml-4 mr-auto">
              <div tw="font-medium text-base">{getUsername()}</div>
              {user.information?.occupation && (
                <div tw="text-gray-600 text-xs">
                  {user.information.occupation}
                </div>
              )}
            </div>
          </div>
          <div tw="p-5 border-t border-gray-200 text-sm pb-6">
            <Link href={routes.dashboard.account.index}>
              <a tw="cursor-pointer flex items-center text-blue-800 font-medium">
                <i data-feather="activity" tw="w-4 h-4 mr-2" /> Personal
                information
              </a>
            </Link>
            <Link href={routes.dashboard.account.preferences}>
              <a tw="cursor-pointer flex items-center mt-5">
                <i data-feather="box" tw="w-4 h-4 mr-2" /> Preferences
              </a>
            </Link>
            <Link href={routes.dashboard.account.changePassword}>
              <a tw="cursor-pointer flex items-center mt-5">
                <i data-feather="lock" tw="w-4 h-4 mr-2" /> Change password
              </a>
            </Link>
            <Link href={routes.dashboard.account.settings}>
              <a tw="cursor-pointer flex items-center mt-5">
                <i data-feather="settings" tw="w-4 h-4 mr-2" /> Account settings
              </a>
            </Link>
          </div>
        </Box>
      </div>
    </>
  )
}

export default Navigation
