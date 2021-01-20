import React from 'react'
import _tw from 'twin.macro'
import Avatar, { AvatarSize } from './Avatar'
import { Menu, Transition } from '@headlessui/react'
import { HiOutlineUser } from 'react-icons/hi'
import Link from 'next/link'
import { User } from '@graphql/schema'
import routes from '@lib/utils/routes'
import { NestedPartialExcept } from '@lib/utils/types'

interface IAvatarWithMenu {
  user: NestedPartialExcept<User, 'email'>
}

const AvatarWithMenu = ({ user }: IAvatarWithMenu) => {
  return (
    <>
      <div tw="relative inline-block text-left">
        <Menu>
          {({ open }) => (
            <>
              <span tw="rounded-md shadow-sm">
                <Menu.Button as={React.Fragment}>
                  <button type="button">
                    <Avatar
                      size={AvatarSize.XS}
                      imagePath={null} //TODO: replace when we have the dynamic image urls
                    />
                  </button>
                </Menu.Button>
              </span>

              <Transition
                show={open}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-65"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  static
                  tw="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
                >
                  <div tw="px-4 py-3">
                    {user.firstName ? (
                      <span tw="font-medium text-center w-full block text-gray-700 text-sm">
                        {`Hello ${user.firstName}!`}
                      </span>
                    ) : (
                      <>
                        <p tw="text-sm leading-5">Signed in as</p>
                        <p tw="text-sm font-medium leading-5 text-gray-900 truncate">
                          {user.email}
                        </p>
                      </>
                    )}
                  </div>

                  <div tw="py-1">
                    <Menu.Item
                      as="span"
                      disabled
                      className="flex justify-between w-full px-4 py-2 text-sm leading-5 text-left text-gray-700 cursor-not-allowed opacity-50"
                    >
                      Upgrade account (soon)
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link href={routes.dashboard.settings}>
                          <a
                            href={routes.dashboard.settings}
                            className={`${
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700'
                            } hover:bg-gray-100 hover:text-gray-900 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                          >
                            Settings
                          </a>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link href={routes.contactUs}>
                          <a
                            href={routes.contactUs}
                            className={`${
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700'
                            } hover:bg-gray-100 hover:text-gray-900 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                          >
                            Support
                          </a>
                        </Link>
                      )}
                    </Menu.Item>
                  </div>

                  <div tw="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link href={routes.session.signOut}>
                          <a
                            className={`${
                              active
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-700'
                            } hover:bg-gray-100 hover:text-gray-900 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                          >
                            Sign out
                          </a>
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      </div>
    </>
  )
}

export default AvatarWithMenu
