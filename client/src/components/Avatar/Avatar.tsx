import React from 'react'
import _tw from 'twin.macro'
import { FaUserTie } from 'react-icons/fa'

type TAvatarSize = 'MD' | 'SM' | 'XS'

const Avatar = ({
  imagePath,
  size = 'SM',
}: {
  imagePath?: string | null
  size?: TAvatarSize
}) => {
  const styles = [
    size === 'MD' && _tw`w-16 h-16`,
    size === 'SM' && _tw`w-12 h-12`,
    size === 'XS' && _tw`w-10 h-10`,
  ]

  return imagePath ? (
    <img
      alt="Avatar"
      src={imagePath}
      tw="inline object-cover rounded-full"
      css={styles}
    />
  ) : (
    <div
      tw="bg-gray-200 rounded-full flex items-center justify-center"
      css={styles}
    >
      <FaUserTie
        className="text-gray-500"
        style={{
          fontSize: '1.25rem',
        }}
      />
    </div>
  )
}

export default Avatar
