import React from 'react'

interface StatsCard {
  title: string
  icon: React.ReactNode
  value: string
  loading: boolean
  helperText?: string
  className?: string
  type: string
}

const StatsCard = ({
  title,
  icon,
  value,
  loading,
  className,
  type,
  helperText,
}: StatsCard) => {
  return (
    <div className="stat">
      <div className="stat-figure text-secondary">{icon}</div>
      <div className="stat-title">Downloads </div>
      <div className="stat-value">31K</div>
      <div className="stat-desc">Jan 1st - Feb 1st</div>
    </div>
  )
}

export default StatsCard
