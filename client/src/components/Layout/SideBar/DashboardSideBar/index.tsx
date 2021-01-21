import React, { useRef, useState } from 'react'
import _tw from 'twin.macro'
import useOnClickOutside from '@lib/hooks/useOnClickOutside'
import Link from 'next/link'
import { Transition } from '@headlessui/react'
import {
  HiOutlineHome,
  HiOutlineClipboardList,
  HiOutlineShoppingCart,
  HiOutlineCog,
} from 'react-icons/hi'
import NavItemDropdown from './NavDropdownItem'
import NavItem from './NavItem'
import Header from './Header'
import routes from '@lib/utils/routes'

const linkPaths = [
  {
    icon: HiOutlineHome,
    path: routes.dashboard.index,
    title: 'Overview',
  },
  {
    icon: HiOutlineShoppingCart,
    title: 'Products',
    path: routes.dashboard.products.index,
    subPaths: [
      {
        path: routes.dashboard.products.index,
        title: 'All products',
      },
      {
        path: routes.dashboard.products.create,
        title: 'Create new product',
      },
    ],
  },
  {
    icon: HiOutlineClipboardList,
    path: routes.dashboard.orders,
    title: 'Orders',
  },
]

const SideBar: React.FC = ({ children }) => {
  const [showSideBar, setShowSideBar] = useState(false)

  const navRef = useRef(null)
  useOnClickOutside(navRef, () => setShowSideBar(false))

  return (
    <>
      <section tw="min-h-screen bg-blue-900">
        <nav
          ref={navRef}
          css={[
            _tw`fixed top-0 left-0 z-20 h-full pb-10 overflow-x-hidden overflow-y-auto transition origin-left transform bg-blue-900 w-60 md:translate-x-0`,
            showSideBar ? _tw`translate-x-0` : _tw`-translate-x-full`,
          ]}
        >
          <Link href="/">
            <a tw="flex items-center px-4 py-5 text-white cursor-pointer">
              Slatam Logo
            </a>
          </Link>
          <nav
            tw="text-sm font-medium text-gray-200"
            aria-label="Main Navigation"
          >
            {linkPaths.map(({ title, icon, path, subPaths }) => {
              if (subPaths?.length) {
                return (
                  <NavItemDropdown
                    key={title}
                    title={title}
                    icon={icon}
                    path={path}
                    subPaths={subPaths}
                  />
                )
              }
              return (
                <NavItem key={title} title={title} icon={icon} path={path} />
              )
            })}

            <NavItem
              title="My account"
              icon={HiOutlineCog}
              path={routes.dashboard.account.index}
              tw="absolute bottom-2 w-full"
            />
          </nav>
        </nav>

        <div tw="ml-0 transition md:ml-60 py-6 px-3 md:(p-4 pl-0)">
          <Header setShowSideBar={setShowSideBar} />
          <div tw="p-4 bg-gray-100 rounded-b-3xl">{children}</div>
        </div>

        <Transition
          show={showSideBar}
          enter="transition ease-out duration-150"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <div tw="fixed inset-0 z-10 w-screen h-screen bg-black bg-opacity-25 md:hidden"></div>
        </Transition>
      </section>
    </>
  )
}

export default SideBar
