import React from 'react'
import _tw from 'twin.macro'

const ErrorMessage: React.FC = ({ children }) => {
  return <span tw="text-red-600 ml-3 text-xs">{children}</span>
}

export default ErrorMessage
