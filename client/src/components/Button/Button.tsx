import React, { ButtonHTMLAttributes } from 'react'
import _tw, { styled } from 'twin.macro'

export enum ButtonColorVariants {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  GOOGLE = 'google',
  APPLE = 'apple',
}

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | ButtonColorVariants.PRIMARY
    | ButtonColorVariants.SECONDARY
    | ButtonColorVariants.GOOGLE
    | ButtonColorVariants.APPLE
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
  variant = ButtonColorVariants.PRIMARY,
  disabled = false,
  children,
  ...otherProps
}: IButtonProps) => {
  const { PRIMARY, GOOGLE, APPLE } = ButtonColorVariants

  const isPrimary = variant === PRIMARY
  const isGoogle = variant === GOOGLE
  const isApple = variant === APPLE
  return (
    <button
      {...otherProps}
      type={type}
      disabled={disabled}
      css={[
        _tw`w-full py-3 flex justify-center rounded-md font-medium transition duration-100 text-center`,

        isPrimary && _tw`transform active:scale-95 bg-blue-800 text-white`,
        isPrimary && !disabled && _tw`hover:bg-blue-900`,

        isGoogle && _tw`transform active:scale-95 bg-red-500 text-white`,
        isGoogle && !disabled && _tw`hover:bg-red-700`,

        isApple && _tw`transform active:scale-95 bg-black text-white`,
        isApple && !disabled && _tw` hover:bg-gray-800`,

        disabled && _tw`opacity-30 cursor-not-allowed`,
      ]}
    >
      {children}
    </button>
  )
}

export default Button
