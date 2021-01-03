import React from 'react'

interface IChildrenProps {
  children: React.ReactNode
}

export default function Layout({ children }: IChildrenProps) {
  return <div className="bg-red-100">{children}</div>
}
