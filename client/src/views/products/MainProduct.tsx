import Button from '@components/Button'
import React from 'react'
import _tw from 'twin.macro'
import faker from 'faker'

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export function formatMoney(cents: number) {
  const dollars = cents / 100
  return formatter.format(dollars)
}

const MainProduct = () => {
  return (
    <>
      <section tw="text-gray-600 max-w-screen-lg mx-auto">
        <div tw="px-5 py-24 w-full m-0 md:mt-10 mx-auto bg-white md:shadow-sm rounded-lg">
          <div tw="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              tw="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src={faker.random.image()}
            />
            <div tw="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 tw="text-sm  text-gray-500 tracking-widest">BRAND NAME</h2>
              <h1 tw="text-gray-900 text-3xl  font-medium mb-1">
                The Catcher in the Rye
              </h1>
              <div tw="flex mb-4">
                <span tw="flex items-center">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    tw="w-4 h-4 text-blue-700"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    tw="w-4 h-4 text-blue-700"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    tw="w-4 h-4 text-blue-700"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    tw="w-4 h-4 text-blue-700"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    tw="w-4 h-4 text-blue-700"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span tw="text-gray-600 ml-3">4 Reviews</span>
                </span>
              </div>

              <div tw="flex items-center space-x-4 my-4">
                <div>
                  <div tw="rounded-lg bg-gray-100 flex py-2 px-3">
                    <span tw=" text-3xl font-bold text-blue-900">
                      {formatMoney(faker.random.number(100000))}
                    </span>
                  </div>
                </div>
                <div tw="flex-1">
                  <p tw="text-green-500 text-xl font-semibold">Save 12%</p>
                  <p tw="text-gray-400 text-sm">Inclusive of all Taxes.</p>
                </div>
              </div>

              <p tw="leading-relaxed">
                Quis commodo aliquip incididunt velit. Laboris anim amet eu
                nulla minim proident. Ex do pariatur amet consectetur labore
                mollit nisi officia mollit quis. Do ipsum non dolor do tempor
              </p>
              <div tw="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div tw="flex">
                  <span tw="mr-3">Color</span>
                  <button tw="border-2 border-gray-300 bg-black rounded-full w-6 h-6 focus:outline-none" />
                  <button tw="border-2 border-gray-300 ml-1 bg-teal-300 rounded-full w-6 h-6 focus:outline-none" />
                  <button tw="border-2 border-gray-300 ml-1 bg-yellow-400 rounded-full w-6 h-6 focus:outline-none" />
                </div>
                <div tw="flex ml-6 items-center">
                  <span tw="mr-3">Size</span>
                  <div tw="relative">
                    <select tw="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 text-base pl-3 pr-10">
                      <option>SM</option>
                      <option>M</option>
                      <option>L</option>
                      <option>XL</option>
                    </select>
                    <span tw="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        tw="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div tw="flex items-center">
                <Button tw="md:w-40">Get in touch</Button>
                <button tw="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    tw="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="shadow-sm bg-white text-gray-700 m-0 md:my-10 p-6 md:rounded-lg">
          <div className="flex items-center">
            <div>
              <div className="flex flex-row items-center">
                <h2 className="text-2xl font-semibold mr-4 text-gray-900">
                  Product details
                </h2>
              </div>
            </div>
          </div>
          {/* Collapsed content */}

          <div className="w-full flex flex-col mt-4">
            <hr className="mb-4 border-gray-300" />
            <p tw="mb-4">
              Veniam duis veniam ex labore esse nisi aliqua et amet minim.
              Cupidatat ut eiusmod sint non enim incididunt fugiat sunt eiusmod
              et eu adipisicing reprehenderit amet. Do quis duis incididunt sint
              cillum enim et occaecat labore id.
            </p>
            <ul className="list-disc ml-4 mt-2 space-y-2">
              <li>
                Dolore qui pariatur est nulla velit duis in exercitation est do
                commodo laborum.
              </li>
              <li>Pariatur Lorem nostrud ut commodo qui sint veniam.</li>
              <li>Tempor duis pariatur adipisicing commodo.</li>
              <li>
                Excepteur anim anim reprehenderit excepteur sit laborum eiusmod
                occaecat reprehenderit cillum.
              </li>
              <li>
                Dolore qui pariatur est nulla velit duis in exercitation est do
                commodo laborum.
              </li>
              <li>Pariatur Lorem nostrud ut commodo qui sint veniam.</li>
            </ul>
          </div>
        </div>
        <div className="shadow-sm bg-white text-gray-700 m-0 md:my-10 p-6 md:rounded-lg">
          <div className="flex items-center">
            <div>
              <div className="flex flex-row items-center">
                <h2 className="text-2xl font-semibold mr-4 text-gray-900">
                  Terms and conditions
                </h2>
              </div>
            </div>
          </div>
          {/* Collapsed content */}

          <div className="w-full flex flex-col mt-4">
            <hr className="mb-4 border-gray-300" />
            <p tw="mb-4">
              Veniam duis veniam ex labore esse nisi aliqua et amet minim.
              Cupidatat ut eiusmod sint non enim incididunt fugiat sunt eiusmod
              et eu adipisicing reprehenderit amet. Do quis duis incididunt sint
              cillum enim et occaecat labore id.
            </p>
            <ul className="list-disc ml-4 mt-2 space-y-2">
              <li>
                Dolore qui pariatur est nulla velit duis in exercitation est do
                commodo laborum.
              </li>
              <li>Pariatur Lorem nostrud ut commodo qui sint veniam.</li>
              <li>Tempor duis pariatur adipisicing commodo.</li>
              <li>
                Excepteur anim anim reprehenderit excepteur sit laborum eiusmod
                occaecat reprehenderit cillum.
              </li>
              <li>
                Dolore qui pariatur est nulla velit duis in exercitation est do
                commodo laborum.
              </li>
              <li>Pariatur Lorem nostrud ut commodo qui sint veniam.</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}

export default MainProduct
