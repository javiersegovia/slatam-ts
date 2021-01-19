import React from 'react'
import _tw from 'twin.macro'

const Spinner = ({ size = 6, color = 'white' }) => {
  return (
    <svg
      className="animate-spin text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      css={[
        color === 'white' && _tw`text-white`,
        color === 'black' && _tw`text-black`,
        color === 'blue' && _tw`text-blue-700`,
        size === 6 && _tw`h-6 w-6`,
        size === 7 && _tw`h-7 w-7`,
        size === 8 && _tw`h-8 w-8`,
        size === 9 && _tw`h-9 w-9`,
        size === 10 && _tw`h-10 w-10`,
      ]}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  )
}
export default Spinner
