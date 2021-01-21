import Button from '@components/Button'
import Box from '@components/UI/Box'
import React from 'react'
import _tw from 'twin.macro'
import Input from '@components/FormFields/Input'
import { useForm } from 'react-hook-form'
// import { useSignUpMutation } from '@graphql/hooks'
import { getExceptionErrors } from '@lib/utils/errors'

// import { User } from '@graphql/schema'

// interface FormValues extends Partial<User>

const DisplayInformation = () => {
  return (
    <>
      {/* BEGIN: Display Information */}
      {/* xxx intro-y box */}
      <Box tw="lg:mt-5">
        <div tw="flex items-center p-5">
          <h2 tw="font-medium text-base mr-auto">Display Information</h2>
        </div>
        <div tw="p-5">
          <div tw="grid grid-cols-12 gap-5">
            {/* <div tw="col-span-12 xl:col-span-4">
              <div tw="border border-gray-200  rounded-md p-5">
                <div
                  // image-fit // xxx zoom-in
                  tw="w-40 h-40 relative cursor-pointer mx-auto"
                >
                  <img
                    tw="rounded-md"
                    alt="Midone Tailwind HTML Admin Template"
                    src="dist/images/profile-7.jpg"
                  />
                  <div
                    title="Remove this profile photo?"
                    // xxx tooltip
                    tw="w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-red-500 right-0 top-0 -mr-2 -mt-2"
                  >
                    {' '}
                    <i data-feather="x" tw="w-4 h-4" />{' '}
                  </div>
                </div>
                <div tw="w-40 mx-auto cursor-pointer relative mt-5">
                  <button
                    type="button"
                    // button
                    tw="w-full bg-blue-800 text-white"
                  >
                    Change Photo
                  </button>
                  <input
                    type="file"
                    tw="w-full h-full top-0 left-0 absolute opacity-0"
                  />
                </div>
              </div>
            </div> */}

            <div tw="col-span-12 xl:col-span-8">
              <div>
                <label htmlFor="x">Display Name</label>
                <input
                  type="text"
                  // xxx input
                  tw="w-full border bg-gray-100 cursor-not-allowed mt-2"
                  placeholder="Input text"
                  defaultValue="Brad Pitt"
                  disabled
                />
              </div>
              <div tw="mt-3">
                <label htmlFor="x">Nearest MRT Station</label>
                <div tw="mt-2">
                  <select data-search="true" tw="w-full">
                    <option value={1}>Admiralty</option>
                    <option value={2}>Aljunied</option>
                    <option value={3}>Ang Mo Kio</option>
                    <option value={4}>Bartley</option>
                    <option value={5}>Beauty World</option>
                  </select>
                </div>
              </div>
              <div tw="mt-3">
                <label htmlFor="x">Postal Code</label>
                <div tw="mt-2">
                  <select data-search="true" tw="w-full">
                    <option value={1}>
                      018906 - 1 STRAITS BOULEVARD SINGA...
                    </option>
                    <option value={2}>
                      018910 - 5A MARINA GARDENS DRIVE...
                    </option>
                    <option value={3}>
                      018915 - 100A CENTRAL BOULEVARD...
                    </option>
                    <option value={4}>018925 - 21 PARK STREET MARINA...</option>
                    <option value={5}>018926 - 23 PARK STREET MARINA...</option>
                  </select>
                </div>
              </div>
              <div tw="mt-3">
                <label htmlFor="x">Address</label>
                {/* input */}
                <textarea
                  tw="w-full border mt-2"
                  placeholder="Adress"
                  defaultValue={
                    '10 Anson Road, International Plaza, #10-11, 079903 Singapore, Singapore'
                  }
                />
              </div>
              <div tw="flex justify-end">
                <Button
                  size="SM"
                  type="button"
                  // xxx button
                  tw="bg-blue-800 text-white mt-3 w-full md:w-20"
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Box>
      {/* END: Display Information */}
    </>
  )
}

export default DisplayInformation
