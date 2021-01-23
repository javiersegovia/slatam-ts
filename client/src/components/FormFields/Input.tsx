import React from 'react'
import _tw from 'twin.macro'
import { FieldErrors, FieldError, RegisterOptions } from 'react-hook-form'
import ErrorMessage from './ErrorMessage'
import Label from './Label'

export const getBaseStyles = (
  hasError: boolean
) => `bg-white shadow-sm block w-full p-3 border text-sm leading-6 rounded-md border-gray-300 focus:outline-none focus:ring-2
          ${
            hasError
              ? 'text-red-600 border-red-500 focus:border-red-500 focus:ring-red-500'
              : 'focus:border-blue-400 focus:ring-blue-400'
          }
        `

export type RefReturn =
  | string
  | ((instance: HTMLInputElement | null) => void)
  | ((instance: HTMLTextAreaElement | null) => void)
  | React.RefObject<HTMLInputElement>
  | React.RefObject<HTMLAreaElement>
  | null
  | undefined

type TInputProps = {
  name: string
  value?: string
  type: string
  className?: string
  placeholder?: string | undefined
  label: string
  error?: FieldErrors | FieldError | undefined
  validations?: RegisterOptions
  register: (props: RegisterOptions) => any
  isTextArea?: boolean
}

const Input: React.FC<TInputProps> = ({
  name,
  value,
  className = '',
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
    <Label htmlFor={name} description={label} tw="block w-full">
      <Tagname
        {...otherProps}
        ref={register({ ...validations })}
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        rows={3}
        className={`${getBaseStyles(!!error)} ${className}`}
      />
      {Boolean(validations) && <ErrorMessage>{error?.message}</ErrorMessage>}
    </Label>
  )
}

export default Input
