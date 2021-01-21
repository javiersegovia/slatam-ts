import React from 'react'
import DashboardSideBar from '@components/Layout/SideBar/DashboardSideBar'
import { Information } from '@views/dashboard/account'

const Account = () => {
  return (
    <>
      <DashboardSideBar>
        <Information />
      </DashboardSideBar>
    </>
  )
}

export default Account
