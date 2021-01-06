import React from 'react'
import AvatarWithMenu from '@components/Avatar/AvatarMenu'
import { NotificationMenu } from '@components/Notification'
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
  return (
    <header className="flex items-center justify-between w-full px-4 bg-white border-b h-14">
      <button
        type="button"
        className="block btn btn-light md:hidden"
        onClick={() => setShowSideBar(true)}
      >
        <span className="sr-only">Menu</span>
        <svg
          className="w-4 h-4"
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

      <div className="hidden -ml-3 form-icon md:block w-96">
        <i>Available space</i>
      </div>

      <div className="flex items-center space-x-4">
        <NotificationMenu notifications={notificationList} />
        <AvatarWithMenu />
      </div>
    </header>
  )
}

export default Header
