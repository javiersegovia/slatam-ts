import React from 'react'
import _tw from 'twin.macro'
import Avatar, { AvatarSize } from './Avatar'
import { Menu, Transition } from '@headlessui/react'
import Link from 'next/link'

const AvatarWithMenu = () => {
  return (
    <>
      <div className="relative inline-block text-left">
        <Menu>
          {({ open }) => (
            <>
              <span className="rounded-md shadow-sm">
                <Menu.Button as={React.Fragment}>
                  <button type="button">
                    <Avatar
                      size={AvatarSize.XS}
                      imagePath="/images/avatar-sample.jpg"
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
                  className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
                >
                  <div className="px-4 py-3">
                    <p className="text-sm leading-5">Signed in as</p>
                    <p className="text-sm font-medium leading-5 text-gray-900 truncate">
                      example@mail.com
                    </p>
                  </div>

                  <div className="py-1">
                    <Menu.Item
                      as="span"
                      disabled
                      className="flex justify-between w-full px-4 py-2 text-sm leading-5 text-left text-gray-700 cursor-not-allowed opacity-50"
                    >
                      Upgrade account (soon)
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link href="/dashboard/settings">
                          <a
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
                        <Link href="/support">
                          <a
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

                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link href="/sign-out">
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
