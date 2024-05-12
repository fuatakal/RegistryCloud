import React from 'react'

interface FormItemProps {
  name: string
  onClick: () => void
}

const DashboardFormItem = ({ name, onClick }: FormItemProps) => {
  return (
    <li className=" my-4" onClick={onClick}>
      <div className=" bg-slate-400">{name}</div>
    </li>
  )
}

export default DashboardFormItem
