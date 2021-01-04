import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import _tw from 'twin.macro'

interface INavItemContentProps extends Omit<INavItemProps, 'path'> {
  isCurrentPath: boolean
}

export const NavItemContent = ({
  icon: Icon,
  title,
  isCurrentPath,
}: INavItemContentProps) => (
  <>
    {Icon && (
      <Icon
        className={`flex-shrink-0 w-5 h-5 mr-2 transition
          ${
            isCurrentPath
              ? _tw`text-gray-600`
              : _tw`text-gray-400 group-hover:text-gray-600`
          }
        `}
      />
    )}
    <span>{title}</span>
  </>
)

interface INavItemProps {
  icon?: React.ComponentType<{ className: string }>
  path: string
  title: string
  className?: string
}

const NavItem: React.FC<INavItemProps> = ({ icon, path, className, title }) => {
  const router = useRouter()
  const isCurrentPath = router.pathname === path

  return (
    <div className={className} tw="px-2 py-1">
      <Link href={path}>
        <a
          className="flex items-center px-4 py-3 rounded-md transition cursor-pointer group"
          css={[
            isCurrentPath
              ? _tw`bg-indigo-700 text-white`
              : _tw`hover:bg-indigo-700`,
          ]}
        >
          <NavItemContent
            icon={icon}
            title={title}
            isCurrentPath={isCurrentPath}
          />
        </a>
      </Link>
    </div>
  )
}

export default NavItem
