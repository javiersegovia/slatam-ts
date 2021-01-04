import React from 'react'
import _tw from 'twin.macro'

interface Legend {
  title: string
  color: string
}

interface IChartLegendProps {
  legends: Legend[]
}

const ChartLegend: React.FC<IChartLegendProps> = ({ legends }) => {
  return (
    <div tw="flex justify-center mt-4 space-x-3 text-sm text-gray-600 dark:text-gray-400">
      {legends.map((legend) => (
        <div tw="flex items-center" key={legend.title}>
          <span
            className={legend.color}
            tw="inline-block w-3 h-3 mr-1 rounded-full"
          ></span>
          <span>{legend.title}</span>
        </div>
      ))}
    </div>
  )
}

export default ChartLegend
