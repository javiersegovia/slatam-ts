import React from 'react'
import _tw from 'twin.macro'
import DashboardSideBar from '@components/Layout/SideBar/DashboardSideBar'
import { IsAuthenticated } from '@components/Auth'
import { useRouter } from 'next/router'
import OrderDetails from '@root/src/views/dashboard/orders/OrderDetails'

const DashboardProductsCreate = () => {
  const router = useRouter()
  const { oid } = router.query

  // const { data: order, isLoading } = useOrderQuery(
  //   {
  //     id: (pid && parseInt(pid as string, 10)) || 0,
  //   },
  //   {
  //     enabled: !!pid,
  //   }
  // )

  return (
    <>
      <IsAuthenticated>
        <DashboardSideBar>
          {/* {order && <OrderDetails order={order.order} />} */}
          <OrderDetails />
        </DashboardSideBar>
      </IsAuthenticated>
    </>
  )
}

export default DashboardProductsCreate
