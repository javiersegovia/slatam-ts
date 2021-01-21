import React from 'react'
import _tw from 'twin.macro'
import Button from '@components/Button'
import Box from '@components/UI/Box'

const PersonalInformation = () => {
  return (
    <>
      {/* BEGIN: Personal Information */}
      {/* intro-y box */}
      <Box tw="lg:mt-5">
        <div tw="flex items-center p-5">
          <h2 tw="font-medium text-base mr-auto">Personal Information</h2>
        </div>
        <div tw="p-5">
          <div tw="grid grid-cols-12 gap-5">
            <div tw="col-span-12 xl:col-span-6">
              <div>
                <label htmlFor="x">Email</label>
                <input
                  type="text"
                  // inputxxx
                  tw="w-full border bg-gray-100 cursor-not-allowed mt-2"
                  placeholder="Input text"
                  defaultValue="bradpitt@left4code.com"
                  disabled
                />
              </div>
              <div tw="mt-3">
                <label htmlFor="x">Name</label>
                <input
                  type="text"
                  // inputxxx
                  tw="w-full border mt-2"
                  placeholder="Input text"
                  defaultValue="Brad Pitt"
                  disabled
                />
              </div>
              <div tw="mt-3">
                <label htmlFor="x">ID Type</label>
                <select tw="w-full border mt-2">
                  <option>IC</option>
                  <option>FIN</option>
                  <option>Passport</option>
                </select>
              </div>
              <div tw="mt-3">
                <label htmlFor="x">ID Number</label>
                <input
                  type="text"
                  // xxxinput
                  tw="w-full border mt-2"
                  placeholder="Input text"
                  defaultValue={357821204950001}
                />
              </div>
            </div>
            <div tw="col-span-12 xl:col-span-6">
              <div>
                <label htmlFor="x">Phone Number</label>
                <input
                  type="text"
                  // xxxinput
                  tw="w-full border mt-2"
                  placeholder="Input text"
                  defaultValue={65570828}
                />
              </div>
              <div tw="mt-3">
                <label htmlFor="x">Address</label>
                <input
                  type="text"
                  // inputxxx
                  tw="w-full border mt-2"
                  placeholder="Input text"
                  defaultValue="10 Anson Road, International Plaza, #10-11, 079903 Singapore, Singapore"
                />
              </div>
              <div tw="mt-3">
                <label htmlFor="x">Bank Name</label>
                <div tw="mt-2">
                  <select data-search="true" tw="w-full">
                    <option value={1}>SBI - STATE BANK OF INDIA</option>
                    <option value={1}>CITI BANK - CITI BANK</option>
                  </select>
                </div>
              </div>
              <div tw="mt-3">
                <label htmlFor="x">Bank Account</label>
                <input
                  type="text"
                  // inputxxx
                  tw="w-full border mt-2"
                  placeholder="Input text"
                  defaultValue="DBS Current 011-903573-0"
                />
              </div>
            </div>
          </div>
          <div tw="flex justify-end mt-4">
            <Button
              type="button"
              tw="bg-blue-800 text-white ml-auto w-full md:w-20"
            >
              Save
            </Button>
          </div>
        </div>
      </Box>
      {/* END: Personal Information */}
    </>
  )
}

export default PersonalInformation
