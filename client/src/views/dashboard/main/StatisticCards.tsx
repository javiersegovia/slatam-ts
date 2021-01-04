import React from 'react'
import _tw from 'twin.macro'
import Link from 'next/link'

// TODO: extract the simple card to a reusable component

const StatisticCards = () => {
  return (
    <>
      {/* <!-- Cards --> */}
      <section tw="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        {/* <!-- Card --> */}
        <div tw="bg-white rounded-lg shadow-sm">
          <div tw="flex items-center p-4">
            <div tw="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
              <svg tw="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
              </svg>
            </div>

            <div>
              <p tw="mb-2 text-sm font-medium text-gray-600">Total clients</p>
              <p tw="text-lg font-semibold text-gray-700">6389</p>
            </div>
          </div>

          <Link href="#">
            <a tw="cursor-pointer p-4 block w-full bg-orange-50 text-sm font-medium text-center text-orange-600 hover:text-orange-800">
              See all clients
            </a>
          </Link>
        </div>
        {/* <!-- Card --> */}
        <div tw="bg-white rounded-lg shadow-sm">
          <div tw="flex items-center p-4">
            <div tw="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500">
              <svg tw="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <div>
              <p tw="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Account balance
              </p>
              <p tw="text-lg font-semibold text-gray-700 dark:text-gray-200">
                $ 46,760.89
              </p>
            </div>
          </div>

          <Link href="#">
            <a tw="cursor-pointer p-4 block w-full bg-green-50 text-sm font-medium text-center text-green-600 hover:text-green-800">
              See my balance details
            </a>
          </Link>
        </div>

        {/* <!-- Card --> */}
        <div tw="bg-white rounded-lg shadow-sm dark:bg-gray-800">
          <div tw="flex items-center p-4">
            <div tw="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500">
              <svg tw="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
              </svg>
            </div>
            <div>
              <p tw="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                New sales
              </p>
              <p tw="text-lg font-semibold text-gray-700 dark:text-gray-200">
                376
              </p>
            </div>
          </div>
          <Link href="#">
            <a tw="cursor-pointer p-4 block w-full bg-blue-50 text-sm font-medium text-center text-blue-600 hover:text-blue-800">
              See all sales
            </a>
          </Link>
        </div>
        {/* <!-- Card --> */}
        <div tw="bg-white rounded-lg shadow-sm dark:bg-gray-800">
          <div tw="flex items-center p-4">
            <div tw="p-3 mr-4 text-red-500 bg-red-100 rounded-full dark:text-red-100 dark:bg-red-500">
              <svg tw="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <div>
              <p tw="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                Pending contacts
              </p>
              <p tw="text-lg font-semibold text-gray-700 dark:text-gray-200">
                35
              </p>
            </div>
          </div>
          <Link href="#">
            <a tw="cursor-pointer p-4 block w-full bg-red-50 text-sm font-medium text-center text-red-600 hover:text-red-800">
              See pending contacts
            </a>
          </Link>
        </div>
      </section>
    </>
  )
}

export default StatisticCards
