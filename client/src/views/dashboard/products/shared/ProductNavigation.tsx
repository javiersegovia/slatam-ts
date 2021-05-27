import React from 'react'
import _tw from 'twin.macro'

interface ITabItemProps {
  children: React.ReactNode
  isActive?: boolean
  isDisabled?: boolean
}

const TabItem = ({
  children,
  isActive = false,
  isDisabled = false,
}: ITabItemProps) => (
  <div tw="text-center">
    <button
      type="button"
      tw="text-sm font-medium"
      disabled={isDisabled}
      css={[
        isActive && _tw`text-blue-800`,
        isDisabled && _tw`text-gray-400 cursor-not-allowed`,
      ]}
    >
      {children}
    </button>
  </div>
)

const ProductNavigation = () => {
  return (
    <nav tw="items-center my-8 rounded-md bg-white shadow-sm p-4 grid grid-flow-col">
      <TabItem isActive>General</TabItem>
      <TabItem isDisabled>Variations</TabItem>
      <TabItem isDisabled>Inventory</TabItem>
      <TabItem isDisabled>Shipping</TabItem>
    </nav>
  )
}

export default ProductNavigation
