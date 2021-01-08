import React from 'react'
import _tw from 'twin.macro'

interface ILabelProps {
  htmlFor: string
  description?: string
  children?: React.ReactNode
}

const Label = ({ htmlFor, description, children }: ILabelProps) => {
  return (
    <label htmlFor={htmlFor} tw="block">
      {description && (
        <span tw="block mb-1 text-xs font-medium">{description}</span>
      )}
      {children}
    </label>
  )
}

export default Label
