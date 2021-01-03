import React from 'react'
import _tw from 'twin.macro'
import { FieldErrors, FieldError, RegisterOptions } from 'react-hook-form'

// export interface InputProps {
//   id: string
//   value: string
//   type?: string
//   placeholder?: string
//   label?: string | null
//   required?: boolean
//   register
// }

// interface IRegisterProps {
//   required?: boolean
//   minLength?: number
//   maxLength?: number
// }

interface IInputErrorMessages {
  required?: string
  minLength?: string
  maxLength?: string
}

type RefReturn =
  | string
  | ((instance: HTMLInputElement | null) => void)
  | React.RefObject<HTMLInputElement>
  | null
  | undefined

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label: string
  error?: FieldErrors | FieldError | undefined
  // errorMessages: IInputErrorMessages
  validations?: RegisterOptions
  register: (props: RegisterOptions) => RefReturn
}

const Input: React.FC<InputProps> = ({
  id,
  value,
  type = 'text',
  placeholder,
  label,
  register,
  validations = {},
  error,
  // errorMessages,
  ...otherProps
}: InputProps) => {
  return (
    <label htmlFor={id} tw="block">
      {label && <span tw="block mb-1 text-xs font-medium">{label}</span>}
      <input
        {...otherProps}
        ref={register({ ...validations })}
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        value={value}
        css={[
          _tw`shadow block w-full rounded-md border-gray-400 focus:(outline-none ring-2 ring-blue-400 border-blue-400)`,
          error &&
            _tw`text-red-600 border-red-500 focus:(border-red-500 ring-red-500)`,
        ]}
      />
      {/* {error?.message && (
        )} */}
      <span tw="text-red-600 ml-3 text-xs">{error?.message}</span>
    </label>
  )
}

export default Input
