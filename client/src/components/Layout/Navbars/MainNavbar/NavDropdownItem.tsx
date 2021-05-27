import React from 'react'
import _tw from 'twin.macro'
import { Menu, Transition } from '@headlessui/react'

interface IProps {
  title: string
  children: React.ReactNode
}

export default function NavDropdownItem({ title, children }: IProps) {
  return (
    <Menu>
      {({ open }) => (
        <div className="relative">
          <Menu.Button as={React.Fragment}>
            <button
              type="button"
              css={[open ? _tw`text-gray-900` : _tw`text-gray-500`]}
              className="group bg-white rounded-md text-gray-500 inline-flex items-center text-base font-medium hover:text-gray-900"
            >
              <span>{title}</span>
              <svg
                css={[open ? _tw`text-gray-600` : _tw`text-gray-400`]}
                className="ml-2 h-5 w-5 group-hover:text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </Menu.Button>

          <Transition
            show={open}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Menu.Items
              static
              className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2"
            >
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                {children}
              </div>
            </Menu.Items>
          </Transition>
        </div>
      )}
    </Menu>
  )
}
