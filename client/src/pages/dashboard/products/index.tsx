import React from 'react'
import _tw from 'twin.macro'
import DashboardSideBar from '@components/Layout/SideBar/DashboardSideBar'

const Title: React.FC = ({ children }) => (
  <div tw="prose mb-10 prose-xl">
    <h2 tw="ml-5">{children}</h2>
  </div>
)

const DashboardProducts = () => {
  return (
    <DashboardSideBar>
      <Title>My products</Title>
    </DashboardSideBar>
  )
}

export default DashboardProducts
