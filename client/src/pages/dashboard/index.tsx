import React from 'react'
import _tw from 'twin.macro'
import { IsAuthenticated } from '@components/Auth'
import SideBar from '@components/Layout/SideBar/DashboardSideBar'
import DashboardMain from '@views/dashboard/main'

const DashboardIndex = () => {
  return (
    <IsAuthenticated>
      <SideBar>
        <DashboardMain />
      </SideBar>
    </IsAuthenticated>
  )
}

export default DashboardIndex
