import React from 'react'
import _tw from 'twin.macro'
import DashboardSideBar from '@components/Layout/SideBar/DashboardSideBar'
import { IsAuthenticated } from '@components/Auth'
import { useRouter } from 'next/router'
import { useProductQuery } from '@graphql/hooks'
import UpdateProduct from '@root/src/views/dashboard/products/update/UpdateProduct'

const DashboardProductsCreate = () => {
  const router = useRouter()
  const { pid } = router.query

  const { data: product, isLoading } = useProductQuery(
    {
      id: (pid && parseInt(pid as string, 10)) || 0,
    },
    {
      enabled: !!pid,
    }
  )

  return (
    <>
      <IsAuthenticated>
        <DashboardSideBar>
          {product && <UpdateProduct product={product.product} />}
        </DashboardSideBar>
      </IsAuthenticated>
    </>
  )
}

export default DashboardProductsCreate
