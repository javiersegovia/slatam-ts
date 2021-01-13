import React from 'react'
import _tw from 'twin.macro'
import { Doughnut, Line } from 'react-chartjs-2'
import { ChartLegend, ChartCard } from '@components/Chart'
import {
  doughnutOptions,
  doughnutLegends,
  lineOptions,
  lineLegends,
} from '@lib/demo/chartData'

// TODO: replace chart's data with real data

const StaticticCharts = () => {
  return (
    <div tw="grid gap-6 mb-8 md:grid-cols-2">
      <ChartCard title="Best seller products">
        <Doughnut {...doughnutOptions} />
        <ChartLegend legends={doughnutLegends} />
      </ChartCard>

      <ChartCard title="Most visited products">
        <Line {...lineOptions} />
        <ChartLegend legends={lineLegends} />
      </ChartCard>
    </div>
  )
}

export default StaticticCharts
