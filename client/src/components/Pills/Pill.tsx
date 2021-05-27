import React from 'react'
import _tw from 'twin.macro'

type TPillSizes = 'XS'
// | 'SM' | 'MD' | 'LG' | 'XL'
type TPillVariants = 'PRIMARY' | 'SECONDARY' | 'SUCCESS' | 'ERROR' | 'WARNING'
// | 'TEAL'
// | 'PINK'

interface IPillProps {
  size?: TPillSizes
  variant?: TPillVariants
  children: React.ReactNode
}

const Pill = ({ size = 'XS', variant = 'SECONDARY', children }: IPillProps) => {
  const isPrimary = variant === 'PRIMARY'
  const isSecondary = variant === 'SECONDARY'
  const isSuccess = variant === 'SUCCESS'
  const isError = variant === 'ERROR'
  const isWarning = variant === 'WARNING'

  const isXS = size === 'XS'

  return (
    <span
      tw="text-xs rounded-md px-3 py-1 font-bold inline-block text-center uppercase"
      css={[
        isXS && _tw`px-3 py-1`,

        isPrimary && _tw`bg-blue-900 text-white`,
        isSecondary && _tw`bg-gray-100 text-gray-500`,
        isSuccess && _tw`bg-green-100 text-green-500`,
        isError && _tw`bg-red-100 text-red-500`,
        isWarning && _tw`bg-yellow-100 text-yellow-500`,
      ]}
    >
      {children}
    </span>
  )
}

export default Pill
