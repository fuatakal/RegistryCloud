import React from 'react'

interface FormItemProps {
  name: string
  description: string
  onClick: () => void
}

const DashboardFormItem = ({ name, description, onClick }: FormItemProps) => {
  return (
    <li className="my-4 cursor-pointer" onClick={onClick}>
      <div className="flex py-2 px-4 bg-base-100 h-20 w-full border-4 border-neutral rounded-xl shadow-lg ml-4 relative">
        <span className="text-neutral text-lg font-semibold flex items-center justify-center h-full">
          {name}
        </span>
        <p>{description}</p>
        <div className="badge badge-outline absolute top-1/2 transform -translate-y-1/2 right-4 px-2">
          default
        </div>
      </div>
    </li>
  )
}

export default DashboardFormItem
