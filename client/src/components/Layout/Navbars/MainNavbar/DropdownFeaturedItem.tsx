import React from 'react'
import { Menu } from '@headlessui/react'
import Link from 'next/link'

const DropdownFeaturedItem = ({
  href,
  icon,
  title,
  description,
}: {
  href: string
  icon: React.ReactNode
  title: string
  description: string
}) => {
  return (
    <Menu.Item>
      <Link href={href}>
        <a className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
          {icon}
          <div className="ml-4">
            <p className="text-base font-medium text-gray-900">{title}</p>
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          </div>
        </a>
      </Link>
    </Menu.Item>
  )
}

export default DropdownFeaturedItem
