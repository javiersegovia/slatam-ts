import React from 'react'
import _tw from 'twin.macro'

const Label: React.FC = ({ children }) => {
  return <span tw="block mb-1 text-xs font-medium">{children}</span>
}

export default Label
