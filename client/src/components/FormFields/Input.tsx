import React from 'react'
import _tw from 'twin.macro'
import { FieldErrors, FieldError, RegisterOptions } from 'react-hook-form'
import Label from './Label'
import { RefReturn } from './shared'

export const getBaseStyles = (
  hasError: boolean
) => `bg-white shadow block w-full p-3 border border-gray-500 rounded-md border-gray-400 focus:outline-none focus:ring-2
          ${
            hasError
              ? 'text-red-600 border-red-500 focus:border-red-500 focus:ring-red-500'
              : 'focus:border-blue-400 focus:ring-blue-400'
          }
        `

type TInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label: string
  error?: FieldErrors | FieldError | undefined
  validations?: RegisterOptions
  register: (props: RegisterOptions) => RefReturn
  isTextArea?: boolean
}

const Input: React.FC<TInputProps> = ({
  name,
  value,
  type = 'text',
  placeholder,
  label,
  register,
  validations = {},
  isTextArea = false,
  error,
  ...otherProps
}: TInputProps) => {
  const Tagname = isTextArea ? 'textarea' : 'input'

  return (
    <label htmlFor={name} tw="block">
      {label && <Label>{label}</Label>}
      <Tagname
        {...otherProps}
        ref={register({ ...validations })}
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        rows={3}
        className={getBaseStyles(!!error)}
      />
      <span tw="text-red-600 ml-3 text-xs">{error?.message}</span>
    </label>
  )
}

export default Input
