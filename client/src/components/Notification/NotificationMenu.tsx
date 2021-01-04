import React from 'react'
import _tw from 'twin.macro'
import { Menu, Transition } from '@headlessui/react'
import Link from 'next/link'
import { HiOutlineBell } from 'react-icons/hi'

const NotificationButton = () => {
  return (
    <div tw="flex">
      <HiOutlineBell tw="flex-shrink-0 w-6 h-6" />
    </div>
  )
}

interface INotificationItemProps {
  description: string
  path: string
}

const NotificationItem = ({ description, path }: INotificationItemProps) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <Link href={path}>
          <a
            className={`${
              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
            } hover:bg-gray-100 text-gray-900 flex justify-between w-full px-6 py-4 text-sm leading-5 text-left`}
          >
            {description}
          </a>
        </Link>
      )}
    </Menu.Item>
  )
}

const NotificationMenu = ({
  notifications,
}: {
  notifications: INotificationItemProps[]
}) => {
  return (
    <>
      <div className="relative inline-block text-left">
        <Menu>
          {({ open }) => (
            <>
              <span tw="flex transition duration-75 text-gray-500 hover:text-blue-900">
                <Menu.Button as={React.Fragment}>
                  <button type="button">
                    <NotificationButton />
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
                  className="absolute right-0 w-64 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none overflow-hidden border-b-0"
                >
                  {notifications.map(({ description, path }) => (
                    <NotificationItem
                      key={description + path}
                      description={description}
                      path={path}
                    />
                  ))}

                  <div className="pt-0">
                    <Menu.Item>
                      {({ active }) => (
                        <Link href="/dashboard/notifications">
                          <a
                            className={`${
                              active
                                ? 'bg-gray-100 text-blue-800'
                                : 'text-gray-800'
                            } bg-white transition duration-150 text-center font-medium border-gray-300 hover:underline hover:bg-gray-100 hover:text-black flex justify-center w-full p-4 text-sm leading-5`}
                          >
                            See all notifications
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

export default NotificationMenu
