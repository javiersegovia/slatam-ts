import React from 'react'
import _tw from 'twin.macro'

type DashboardContainerProps = {
  children: React.ReactNode
}

const DashboardContainerProps = ({
  children,
  ...otherProps
}: DashboardContainerProps) => {
  return (
    <section
      tw="px-2 sm:px-10 pb-10 max-w-screen-lg mx-auto w-full"
      {...otherProps}
    >
      {children}
    </section>
  )
}

export default DashboardContainerProps
