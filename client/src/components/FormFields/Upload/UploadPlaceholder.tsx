import React from 'react'
import _tw from 'twin.macro'
import { BiImageAdd } from 'react-icons/bi'

const UploadPlaceholder = () => {
  return (
    <>
      <div tw="flex justify-center px-6 pt-10 pb-6 border border-gray-300 bg-blue-50 rounded-md focus-within:(outline-none ring-2 ring-offset-2 ring-blue-700)">
        <div className="space-y-1 text-center">
          <BiImageAdd className="mx-auto h-12 w-12 text-gray-400" />
          <div className="flex text-sm text-center text-gray-600">
            <div className="relative w-full rounded-md font-medium text-blue-700 hover:text-blue-900"></div>
          </div>
          <p className="text-xs text-gray-500">PNG, JPG, WEBP up to 10MB</p>
        </div>
      </div>
    </>
  )
}

export default UploadPlaceholder
