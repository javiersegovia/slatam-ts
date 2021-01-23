import React from 'react'
import _tw from 'twin.macro'
import {
  HiOutlineShoppingCart,
  HiOutlineDocumentAdd,
  HiOutlineChartBar,
  HiOutlineCurrencyDollar,
} from 'react-icons/hi'
import Avatar from '@components/Avatar'

const DashboardMain = () => {
  return (
    <>
      <div tw="flex-1 py-4 lg:py-10">
        <div tw="max-w-screen-2xl mx-auto">
          {/* cards row */}
          <div tw="grid grid-cols-1 md:grid-cols-3 gap-4 2xl:gap-8">
            {/* monthly target */}
            <div tw="col-span-1 bg-white rounded-lg px-4 lg:px-8 py-4 lg:py-6">
              <h2 tw="text-xl text-gray-900 font-bold mb-4 lg:mb-6">
                Monthly target
              </h2>
              <div tw="flex space-x-4 items-end mb-4 lg:mb-6">
                <div tw="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <svg
                    tw="w-6 h-6 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.736 6.979C9.208 6.193 9.696 6 10 6c.304 0 .792.193 1.264.979a1 1 0 001.715-1.029C12.279 4.784 11.232 4 10 4s-2.279.784-2.979 1.95c-.285.475-.507 1-.67 1.55H6a1 1 0 000 2h.013a9.358 9.358 0 000 1H6a1 1 0 100 2h.351c.163.55.385 1.075.67 1.55C7.721 15.216 8.768 16 10 16s2.279-.784 2.979-1.95a1 1 0 10-1.715-1.029c-.472.786-.96.979-1.264.979-.304 0-.792-.193-1.264-.979a4.265 4.265 0 01-.264-.521H10a1 1 0 100-2H8.017a7.36 7.36 0 010-1H10a1 1 0 100-2H8.472c.08-.185.167-.36.264-.521z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span tw="text-2xl mb-2 text-gray-900">€21.291,09</span>
                <span tw="text-gray-900 opacity-70 mb-2 whitespace-pre hidden xl:inline-block">
                  / €40.000
                </span>
              </div>
              <div tw="rounded-md bg-green-100 h-7 overflow-hidden">
                <div
                  style={{ width: '65%' }}
                  tw="bg-green-400 h-7 rounded-md text-center text-green-50 flex items-center justify-center"
                >
                  65%
                </div>
              </div>
            </div>
            {/*/ monthly target */}
            {/* customers */}
            <div tw="col-span-1 bg-white rounded-lg px-4 lg:px-8 py-4 lg:py-6">
              <h2 tw="text-xl text-gray-900 font-bold mb-4 lg:mb-6">
                Customers
              </h2>
              <div tw="flex space-x-4 items-end mb-4 lg:mb-6">
                <div tw="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <svg
                    tw="w-6 h-6 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                  </svg>
                </div>
                <span tw="text-2xl mb-2">491</span>
                <span tw="text-green-500 text-base mb-2 bg-green-100 px-3 rounded-md">
                  ↝ 32
                </span>
              </div>
              <p>Customers this month</p>
            </div>
            {/*/ customers */}
            {/* sales */}
            <div tw="col-span-1 bg-white rounded-lg px-4 lg:px-8 py-4 lg:py-6">
              <h2 tw="text-xl text-gray-900 font-bold mb-4 lg:mb-6">Sales</h2>
              <div tw="flex space-x-4 items-end mb-4 lg:mb-6">
                <div tw="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <svg
                    tw="w-6 h-6 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <span tw="text-2xl mb-2">230</span>
                <span tw="text-red-500 text-base mb-2 bg-red-100 px-3 rounded-md">
                  <span tw="transform rotate-180 inline-block">↜</span>
                  12
                </span>
              </div>
              <p>Sales this month</p>
            </div>
            {/*/ sales */}
          </div>
          {/*/ cards row */}
          {/* recent orders */}
          <div tw="bg-white rounded-lg px-4 lg:px-8 py-4 lg:py-6 mt-8">
            <h2 tw="text-xl text-gray-900 font-bold mb-4 lg:mb-6">
              Recent orders
            </h2>
            <div tw="overflow-x-auto">
              <div tw="align-middle inline-block min-w-full overflow-hidden">
                <table tw="min-w-full">
                  <thead tw="text-left bg-blue-50">
                    <tr>
                      <th tw="py-2 px-3">ID</th>
                      <th tw="py-2 px-3">Product</th>
                      <th tw="py-2 px-3">Customer</th>
                      <th tw="py-2 px-3">Date</th>
                      <th tw="py-2 px-3">Status</th>
                      <th tw="py-2 px-3">&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody tw="divide-y divide-blue-100 text-gray-900 text-opacity-80 whitespace-nowrap">
                    <tr>
                      <td tw="py-3 px-3">#12831</td>
                      <td tw="py-3 px-3">Traditional Package</td>
                      <td tw="py-3 px-3">Frances Nichols</td>
                      <td tw="py-3 px-3">12-01-2021</td>
                      <td tw="py-3 px-3">
                        <span tw="bg-green-100 text-green-500 text-xs rounded-md px-3 py-1 font-bold w-16 inline-block text-center uppercase">
                          Done
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td tw="py-3 px-3">#12830</td>
                      <td tw="py-3 px-3">Pro Package</td>
                      <td tw="py-3 px-3">Ronald George</td>
                      <td tw="py-3 px-3">12-01-2021</td>
                      <td tw="py-3 px-3">
                        <span tw="bg-green-100 text-green-500 text-xs rounded-md px-3 py-1  w-16 inline-block text-center font-bold uppercase">
                          Done
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td tw="py-3 px-3">#12829</td>
                      <td tw="py-3 px-3">Pro Package</td>
                      <td tw="py-3 px-3">Charlene Scott</td>
                      <td tw="py-3 px-3">12-01-2021</td>
                      <td tw="py-3 px-3">
                        <span tw="bg-red-100 text-red-500 text-xs rounded-md px-3 py-1  w-16 inline-block text-center font-bold uppercase">
                          Failed
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td tw="py-3 px-3">#12828</td>
                      <td tw="py-3 px-3">Starter Package</td>
                      <td tw="py-3 px-3">Beverley Owens</td>
                      <td tw="py-3 px-3">11-01-2021</td>
                      <td tw="py-3 px-3">
                        <span tw="bg-green-100 text-green-500 text-xs rounded-md px-3 py-1 w-16 inline-block text-center font-bold uppercase">
                          Done
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td tw="py-3 px-3">#12827</td>
                      <td tw="py-3 px-3">Pro Package</td>
                      <td tw="py-3 px-3">Julian Hansen</td>
                      <td tw="py-3 px-3">11-01-2021</td>
                      <td tw="py-3 px-3">
                        <span tw="bg-yellow-100 text-yellow-500 text-xs rounded-md px-3 py-1 w-16 inline-block text-center font-bold uppercase">
                          Hold
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td tw="py-3 px-3">#12826</td>
                      <td tw="py-3 px-3">Pro Package</td>
                      <td tw="py-3 px-3">Nathan Howell</td>
                      <td tw="py-3 px-3">11-01-2021</td>
                      <td tw="py-3 px-3">
                        <span tw="bg-green-100 text-green-500 text-xs rounded-md px-3 py-1 w-16 inline-block text-center font-bold uppercase">
                          Done
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <a
              href="#"
              tw="font-bold text-blue-800 inline-block mt-5 hover:underline"
            >
              View all orders
            </a>
          </div>
          {/*/ recent orders */}
          {/* quick actions */}
          <div tw=" bg-white rounded-lg px-4 lg:px-8 py-4 lg:py-6 mt-8 flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-12">
            <div>
              <h2 tw="text-xl text-gray-900 font-bold mb-2">Quick actions</h2>
              <p tw="text-gray-900 opacity-70">
                Your recently most used actions
              </p>
            </div>
            <nav tw="md:flex md:space-x-4 space-y-2 md:space-y-0">
              <a
                href="#"
                tw="inline-flex flex-col justify-center items-center px-3 py-3 border border-blue-100 rounded-lg hover:bg-blue-50 w-32"
              >
                <HiOutlineShoppingCart tw="text-3xl text-blue-900 mb-2" />
                <span tw="text-gray-700 text-sm font-normal">
                  Create product
                </span>
              </a>
              <a
                href="#"
                tw="inline-flex flex-col justify-center items-center px-3 py-3 border border-blue-100 rounded-lg hover:bg-blue-50 w-32"
              >
                <HiOutlineDocumentAdd tw="text-3xl text-blue-900 mb-2" />
                <span tw="text-gray-700 text-sm font-normal">Upload file</span>
              </a>
              <a
                href="#"
                tw="inline-flex flex-col justify-center items-center px-3 py-3 border border-blue-100 rounded-lg hover:bg-blue-50 w-32"
              >
                <HiOutlineCurrencyDollar tw="text-3xl text-blue-900 mb-2" />
                <span tw="text-gray-700 text-sm font-normal">
                  View payments
                </span>
              </a>
              <a
                href="#"
                tw="inline-flex flex-col justify-center items-center px-3 py-3 border border-blue-100 rounded-lg hover:bg-blue-50 w-32"
              >
                <HiOutlineChartBar tw="text-3xl text-blue-900 mb-2" />
                <span tw="text-gray-700 text-sm font-normal">View Stats</span>
              </a>
            </nav>
          </div>
          {/*/ quick actions */}
          {/* top customers */}
          <div tw="bg-white rounded-lg px-4 lg:px-8 py-4 lg:py-6 mt-8">
            <h2 tw="text-xl text-gray-900 font-bold mb-4 lg:mb-6">
              Top customers
            </h2>
            <div tw="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12">
              <div tw="space-y-4 md:max-w-sm">
                <a tw="w-full flex items-center space-x-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-60">
                  <Avatar />

                  <div tw="flex flex-col items-start  text-sm flex-1">
                    <span tw="font-bold text-gray-900 ">Danielle Arnold</span>
                    <span tw="font-normal text-sm italic text-blue-800">
                      View profile
                    </span>
                  </div>
                  <span tw="text-green-500 text-base mb-2 bg-green-100 px-3 rounded-md">
                    €438
                  </span>
                </a>
                <a tw="w-full flex items-center space-x-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-60">
                  <Avatar />
                  <div tw="flex flex-col items-start  text-sm flex-1">
                    <span tw="font-bold text-gray-900 ">Leta Washington</span>
                    <span tw="font-normal text-sm italic text-blue-800">
                      View profile
                    </span>
                  </div>
                  <span tw="text-green-500 text-base mb-2 bg-green-100 px-3 rounded-md">
                    €256
                  </span>
                </a>
                <a tw="w-full flex items-center space-x-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-60">
                  <Avatar />

                  <div tw="flex flex-col items-start  text-sm flex-1">
                    <span tw="font-bold text-gray-900 ">Clinton Torres</span>
                    <span tw="font-normal text-sm italic text-blue-800">
                      View profile
                    </span>
                  </div>
                  <span tw="text-green-500 text-base mb-2 bg-green-100 px-3 rounded-md">
                    €149
                  </span>
                </a>
              </div>
              <div tw="space-y-4 md:max-w-sm">
                <a tw="w-full flex items-center space-x-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-60">
                  <Avatar />

                  <div tw="flex flex-col items-start  text-sm flex-1">
                    <span tw="font-bold text-gray-900 ">Sonia Watkins</span>
                    <span tw="font-normal text-sm italic text-blue-800">
                      View profile
                    </span>
                  </div>
                  <span tw="text-green-500 text-base mb-2 bg-green-100 px-3 rounded-md">
                    €136
                  </span>
                </a>
                <a tw="w-full flex items-center space-x-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-60">
                  <Avatar />

                  <div tw="flex flex-col items-start  text-sm flex-1">
                    <span tw="font-bold text-gray-900 ">Arthur Garcia</span>
                    <span tw="font-normal text-sm italic text-blue-800">
                      View profile
                    </span>
                  </div>
                  <span tw="text-green-500 text-base mb-2 bg-green-100 px-3 rounded-md">
                    €128
                  </span>
                </a>
                <a tw="w-full flex items-center space-x-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-60">
                  <Avatar />

                  <div tw="flex flex-col items-start  text-sm flex-1">
                    <span tw="font-bold text-gray-900 ">Gerald Beck</span>
                    <span tw="font-normal text-sm italic text-blue-800">
                      View profile
                    </span>
                  </div>
                  <span tw="text-green-500 text-base mb-2 bg-green-100 px-3 rounded-md">
                    €97
                  </span>
                </a>
              </div>
            </div>
            <a
              href="#"
              tw="font-bold text-blue-800 inline-block mt-7 hover:underline"
            >
              View all customers
            </a>
          </div>
          {/*/ top customers */}
        </div>
      </div>
    </>
  )
}

export default DashboardMain
