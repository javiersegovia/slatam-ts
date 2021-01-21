import React from 'react'
import DashboardSideBar from '@components/Layout/SideBar/DashboardSideBar'
import { Information } from '@views/dashboard/account'
import { IsAuthenticated } from '@components/Auth'

const Account = () => {
  return (
    <>
      <IsAuthenticated>
        <DashboardSideBar>
          <Information />
        </DashboardSideBar>
      </IsAuthenticated>
    </>
  )
}

export default Account
