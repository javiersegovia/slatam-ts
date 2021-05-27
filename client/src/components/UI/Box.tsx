import React from 'react'
import _tw from 'twin.macro'

const Box: React.FC = ({ children, ...otherProps }) => {
  return (
    <div tw="shadow-sm bg-white rounded-md relative" {...otherProps}>
      {children}
    </div>
  )
}

export default Box
