import { Spinner } from '@components/Loading'
import React, { ButtonHTMLAttributes } from 'react'
import { HiCheck } from 'react-icons/hi'
import _tw from 'twin.macro'

type TButtonSizes = 'XS' | 'SM' | 'MD' | 'LG' | 'XL'
type TButtonVariants = 'PRIMARY' | 'SECONDARY' | 'GOOGLE' | 'APPLE' | 'SUCCESS'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  showCheckOnSuccess?: boolean
  size?: TButtonSizes
  variant?: TButtonVariants
}

// const StyledButton = styled.button(
//   ({ isDisabled, isPrimary, isGoogle, isApple }) => [
//     _tw`w-full py-3 flex justify-center rounded-md font-medium transition duration-100 text-center`,
//     isPrimary && _tw`transform active:scale-95 bg-blue-800 text-white`,
//     isPrimary && !isDisabled && _tw`hover:bg-blue-900`,
//     isGoogle && _tw`transform active:scale-95 bg-red-500 text-white`,
//     isGoogle && !isDisabled && _tw` hover:bg-red-700`,
//   ]
// )

const Button = ({
  type = 'button',
  size = 'MD',
  variant = 'PRIMARY',
  disabled = false,
  children,
  isLoading = false,
  showCheckOnSuccess = false,
  ...otherProps
}: IButtonProps) => {
  const isPrimary = variant === 'PRIMARY'
  const isGoogle = variant === 'GOOGLE'
  const isApple = variant === 'APPLE'
  const isSuccess = variant === 'SUCCESS'

  return (
    <button
      type={type}
      disabled={disabled}
      css={[
        _tw`w-full flex justify-center rounded-md font-medium transition duration-100 text-center`,

        size === 'MD' && _tw`py-3`,
        size === 'SM' && _tw`py-2`,

        disabled && _tw`opacity-40 cursor-not-allowed`,

        isPrimary && _tw`transform active:scale-95 bg-blue-800 text-white`,
        isPrimary && !disabled && _tw`hover:bg-blue-900`,

        isSuccess && _tw`transform active:scale-95 bg-green-400 text-white`,
        isSuccess && !disabled && _tw`hover:bg-green-600`,
        isSuccess && disabled && _tw`opacity-100`,

        isGoogle && _tw`transform active:scale-95 bg-red-500 text-white`,
        isGoogle && !disabled && _tw`hover:bg-red-700`,

        isApple && _tw`transform active:scale-95 bg-black text-white`,
        isApple && !disabled && _tw` hover:bg-gray-800`,
      ]}
      {...otherProps}
    >
      {isLoading ? (
        <Spinner />
      ) : showCheckOnSuccess && isSuccess ? (
        <HiCheck tw="text-2xl" />
      ) : (
        <>{children}</>
      )}
    </button>
  )
}

export default Button
