import React from 'react'
import _tw from 'twin.macro'

export enum AvatarSize {
  MD,
  SM,
  XS,
}

const Avatar = ({
  imagePath,
  size = AvatarSize.SM,
}: {
  imagePath: string
  size?: AvatarSize
}) => {
  const { XS, SM, MD } = AvatarSize
  return (
    <img
      alt="Avatar"
      src={imagePath}
      tw="inline object-cover rounded-full"
      css={[
        size === MD && _tw`w-16 h-16`,
        size === SM && _tw`w-12 h-12`,
        size === XS && _tw`w-8 h-8`,
      ]}
    />
  )
}

export default Avatar
