import React from 'react'
import _tw from 'twin.macro'
import SideBar from '@components/Layout/SideBar/DashboardSideBar'
import { StatisticCards, StatisticCharts } from '@views/dashboard/main'

const Title: React.FC = ({ children }) => (
  <div tw="prose mb-10 prose-xl">
    <h2 tw="ml-5">{children}</h2>
  </div>
)

const Dashboard = () => {
  return (
    <SideBar>
      <Title>Overview</Title>
      <StatisticCards />
      <Title>Statistics</Title>
      <StatisticCharts />
    </SideBar>
  )
}

export default Dashboard
