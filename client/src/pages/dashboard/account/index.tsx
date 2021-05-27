import React from 'react'
import DashboardSideBar from '@components/Layout/SideBar/DashboardSideBar'
import { UserInformation } from '@views/dashboard/account'
import { IsAuthenticated } from '@components/Auth'

const Account = () => {
  return (
    <>
      <IsAuthenticated>
        <DashboardSideBar>
          <UserInformation />
        </DashboardSideBar>
      </IsAuthenticated>
    </>
  )
}

export default Account
