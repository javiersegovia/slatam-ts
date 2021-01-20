import React from 'react'
import _tw from 'twin.macro'
import DashboardSideBar from '@components/Layout/SideBar/DashboardSideBar'
import ProductForm from '@components/Form/ProductForm'
import { IsAuthenticated } from '@components/Auth'

const Title: React.FC = ({ children }) => (
  <div tw="prose mb-10 prose-xl">
    <h2 tw="ml-5">{children}</h2>
  </div>
)

const DashboardCreateProduct = () => {
  return (
    <IsAuthenticated>
      <DashboardSideBar>
        <Title>Create new product</Title>
        <ProductForm />
      </DashboardSideBar>
    </IsAuthenticated>
  )
}

export default DashboardCreateProduct
