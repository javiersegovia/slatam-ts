import React from 'react'
import _tw from 'twin.macro'
import DashboardSideBar from '@components/Layout/SideBar/DashboardSideBar'
import CreateProduct from '@views/dashboard/products/create/CreateProduct'
import { IsAuthenticated } from '@components/Auth'

const DashboardProductsCreate = () => {
  return (
    <>
      <IsAuthenticated>
        <DashboardSideBar>
          <CreateProduct />
        </DashboardSideBar>
      </IsAuthenticated>
    </>
  )
}

export default DashboardProductsCreate
