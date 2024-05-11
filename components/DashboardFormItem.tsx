import React from 'react'

interface FormItemProps {
  name: string
}

const DashboardFormItem = ({ name }: FormItemProps) => {
  return (
    <li className=" my-4">
      <div className=" bg-slate-400">{name}</div>
    </li>
  )
}

export default DashboardFormItem
