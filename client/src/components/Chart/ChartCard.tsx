import React from 'react'
import _tw from 'twin.macro'

interface IChartCardProps {
  title: string
}

const ChartCard: React.FC<IChartCardProps> = ({ children, title }) => {
  return (
    <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
      <h3 tw="mb-4 text-lg font-semibold text-gray-800 dark:text-gray-300">
        {title}
      </h3>
      {children}
    </div>
  )
}

export default ChartCard
