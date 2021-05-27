import React from 'react'
import Link from 'next/link'
import _tw from 'twin.macro'

export default function MainFooter() {
  return (
    <div tw="flex items-end w-full mt-10">
      <footer tw="w-full text-gray-700 bg-gray-100">
        <div tw="container flex flex-col flex-wrap px-5 py-24 mx-auto md:items-center lg:items-start md:flex-row">
          <div tw="flex-shrink-0 w-64 mx-auto text-center md:mx-0 md:text-right">
            <Link href="/" passHref>
              <a tw="flex items-end justify-end font-medium text-gray-900 md:justify-end">
                SLATAM LOGO
              </a>
            </Link>
            <p tw="mt-2 text-sm text-gray-500">Trade without borders</p>
            <div tw="mt-4">
              <span tw="inline-flex justify-center mt-2 sm:ml-auto sm:mt-0 sm:justify-start">
                <button tw="text-gray-500 cursor-pointer hover:text-gray-700">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    tw="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </button>
                <button tw="ml-3 text-gray-500 cursor-pointer hover:text-gray-700">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    tw="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </button>
                <button tw="ml-3 text-gray-500 cursor-pointer hover:text-gray-700">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    tw="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <rect
                      width="20"
                      height="20"
                      x="2"
                      y="2"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                  </svg>
                </button>
                <button tw="ml-3 text-gray-500 cursor-pointer hover:text-gray-700">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="0"
                    tw="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="none"
                      d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                    ></path>
                    <circle cx="4" cy="4" r="2" stroke="none"></circle>
                  </svg>
                </button>
              </span>
            </div>
          </div>
          <div tw="flex flex-wrap flex-grow mt-10 -mb-10 text-center md:pl-20 md:mt-0 md:text-left">
            <div tw="w-full px-4 lg:w-1/4 md:w-1/2">
              <h2 tw="mb-3 text-sm font-medium tracking-widest text-gray-900 uppercase ">
                About
              </h2>
              <nav tw="mb-10 list-none">
                <li tw="mt-3">
                  <a tw="text-gray-500 cursor-pointer hover:text-gray-900">
                    Company
                  </a>
                </li>
                <li tw="mt-3">
                  <a tw="text-gray-500 cursor-pointer hover:text-gray-900">
                    Careers
                  </a>
                </li>
                <li tw="mt-3">
                  <a tw="text-gray-500 cursor-pointer hover:text-gray-900">
                    Blog
                  </a>
                </li>
              </nav>
            </div>
            <div tw="w-full px-4 lg:w-1/4 md:w-1/2">
              <h2 tw="mb-3 text-sm font-medium tracking-widest text-gray-900 uppercase ">
                Support
              </h2>
              <nav tw="mb-10 list-none">
                <li tw="mt-3">
                  <a tw="text-gray-500 cursor-pointer hover:text-gray-900">
                    Contact Support
                  </a>
                </li>
                <li tw="mt-3">
                  <a tw="text-gray-500 cursor-pointer hover:text-gray-900">
                    Help Resources
                  </a>
                </li>
                <li tw="mt-3">
                  <a tw="text-gray-500 cursor-pointer hover:text-gray-900">
                    Release Updates
                  </a>
                </li>
              </nav>
            </div>
            <div tw="w-full px-4 lg:w-1/4 md:w-1/2">
              <h2 tw="mb-3 text-sm font-medium tracking-widest text-gray-900 uppercase ">
                Platform
              </h2>
              <nav tw="mb-10 list-none">
                <li tw="mt-3">
                  <a tw="text-gray-500 cursor-pointer hover:text-gray-900">
                    Terms &amp; Privacy
                  </a>
                </li>
                <li tw="mt-3">
                  <a tw="text-gray-500 cursor-pointer hover:text-gray-900">
                    Pricing
                  </a>
                </li>
                <li tw="mt-3">
                  <a tw="text-gray-500 cursor-pointer hover:text-gray-900">
                    FAQ
                  </a>
                </li>
              </nav>
            </div>
            <div tw="w-full px-4 lg:w-1/4 md:w-1/2">
              <h2 tw="mb-3 text-sm font-medium tracking-widest text-gray-900 uppercase ">
                Contact
              </h2>
              <nav tw="mb-10 list-none">
                <li tw="mt-3">
                  <a tw="text-gray-500 cursor-pointer hover:text-gray-900">
                    Send a Message
                  </a>
                </li>
                <li tw="mt-3">
                  <a tw="text-gray-500 cursor-pointer hover:text-gray-900">
                    Request a Quote
                  </a>
                </li>
                <li tw="mt-3">
                  <a tw="text-gray-500 cursor-pointer hover:text-gray-900">
                    +123-456-7890
                  </a>
                </li>
              </nav>
            </div>
          </div>
        </div>
        <div tw="bg-gray-300">
          <div tw="container px-5 py-4 mx-auto">
            <p tw="text-sm text-gray-700 capitalize xl:text-center">
              Slatam Group © {new Date().getFullYear()} All rights reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
