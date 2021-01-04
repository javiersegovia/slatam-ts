import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import _tw from 'twin.macro'
import { Transition } from '@headlessui/react'
import { HiOutlineChevronDown } from 'react-icons/hi'
import { NavItemContent } from './NavItem'

interface INavItemProps {
  icon?: React.ComponentType<{ className: string }>
  path: string
  title: string
  subPaths: {
    title: string
    path: string
  }[]
}

const buttonClass =
  'w-full font-medium flex items-center px-4 py-3 rounded-md transition cursor-pointer group'

const buttonCss = (isCurrentPath: boolean) => [
  isCurrentPath ? _tw`bg-indigo-700 text-white` : _tw`hover:bg-indigo-700`,
]

const NavItem: React.FC<INavItemProps> = ({ icon, path, title, subPaths }) => {
  const router = useRouter()
  const isCurrentPath = router.pathname.includes(path)
  const [showDropdown, setShowDropdown] = useState(isCurrentPath)

  return (
    <div tw="px-2 py-1">
      <button
        type="button"
        className={buttonClass}
        css={buttonCss(isCurrentPath)}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <NavItemContent
          icon={icon}
          title={title}
          isCurrentPath={isCurrentPath}
        />
        <HiOutlineChevronDown
          className={`flex-shrink-0 w-4 h-4 transition transform ml-auto ${
            showDropdown && 'rotate-180'
          }`}
        />
      </button>

      <Transition
        show={showDropdown}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <div tw="mb-1">
          {subPaths.map(({ path, title }) => (
            <Link key={title + path} href={path}>
              <a tw="flex items-center py-2 pl-10 pr-4 transition cursor-pointer hover:(underline text-white)">
                • {title}
              </a>
            </Link>
          ))}
        </div>
      </Transition>
    </div>
  )
}

export default NavItem
