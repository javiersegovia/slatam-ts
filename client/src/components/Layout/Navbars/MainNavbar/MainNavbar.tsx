import React, { useState } from 'react'
import _tw from 'twin.macro'
import { useCurrentUserQuery } from '@graphql/hooks'
import { Menu, Transition } from '@headlessui/react'
import ResponsiveDropdown from './ResponsiveDropdown'
import UserMenu from './UserMenu'
import Link from 'next/link'

export default function MainNavbar() {
  const [showResponsiveDropdown, setShowResponsiveDropdown] = useState(false)
  const { data, isLoading } = useCurrentUserQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  })

  return (
    <>
      <div tw="relative bg-white">
        <div tw="max-w-7xl mx-auto px-4 sm:px-6">
          <div tw="flex justify-between items-center border-b-2 border-gray-100 py-4">
            <div tw="flex justify-start lg:w-0 lg:flex-1">
              <Link href="/">
                <a href="/">
                  <span tw="sr-only">Workflow</span>
                  <img
                    tw="h-8 w-auto sm:h-10"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Logo"
                  />
                </a>
              </Link>
            </div>
            <div tw="-mr-2 -my-2 md:hidden">
              <Menu>
                <>
                  <button
                    type="button"
                    onClick={() => setShowResponsiveDropdown(true)}
                    tw="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  >
                    <span tw="sr-only">Open menu</span>
                    <svg
                      tw="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>

                  <Transition
                    show={showResponsiveDropdown}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <ResponsiveDropdown
                      user={data?.currentUser}
                      close={() => setShowResponsiveDropdown(false)}
                    />
                  </Transition>
                </>
              </Menu>
            </div>

            {/* <nav tw="hidden md:flex space-x-10">
              <NavDropdownItem title="Solutions">
                <SolutionsDropdownContent />
              </NavDropdownItem>

              <a
                href="/pricing"
                tw="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Pricing
              </a>

              <NavDropdownItem title="More">
                <MoreDropdownContent />
              </NavDropdownItem>
            </nav> */}

            <UserMenu isLoading={isLoading} user={data?.currentUser} />
          </div>
        </div>
      </div>
    </>
  )
}
