import React from 'react'
import _tw from 'twin.macro'
import AvatarWithMenu from '@components/Avatar/AvatarMenu'
import { NotificationMenu } from '@components/Notification'
import { useGetCurrentUserQuery } from '@graphql/hooks'

// TODO: replace inline svgs for icons from react-icons

const notificationList = [
  {
    path: '/dashboard/notifications/1',
    description: 'Alimentos Polar is interested on your product NIKE SHOES',
  },
  {
    path: '/dashboard/notifications/2',
    description: 'You have two orders pending without response',
  },
  {
    path: '/dashboard/notifications/3',
    description: 'You have a new review on your product ADIDAS BAG',
  },
]

const Header = ({
  setShowSideBar,
}: {
  setShowSideBar: (arg: boolean) => void
}) => {
  const { data } = useGetCurrentUserQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  })

  return (
    <header tw="flex items-center justify-between w-full px-4 bg-white rounded-t-3xl border-b h-16">
      <button
        type="button"
        className="block btn btn-light md:hidden"
        onClick={() => setShowSideBar(true)}
      >
        <span tw="sr-only">Menu</span>
        <svg
          tw="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <div tw="ml-auto flex items-center space-x-4">
        <NotificationMenu notifications={notificationList} />
        {data?.currentUser && <AvatarWithMenu user={data.currentUser} />}
      </div>
    </header>
  )
}

export default Header
