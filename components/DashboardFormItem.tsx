import { Form } from '@/types'
import React from 'react'
interface FormWithChildren extends Form {
  children?: FormWithChildren[]
}
interface FormItemProps {
  form: FormWithChildren
  onClick: (id: number) => void
  projectId?: number
}

const DashboardFormItem: React.FC<FormItemProps> = ({
  form,
  onClick,
  projectId,
}) => {
  return (
    <li className="my-4 cursor-pointer transition-transform duration-300 transform hover:scale-105">
      <div
        className="flex py-2 px-4 bg-base-100 h-20 w-full border-1 border-neutral rounded-xl shadow-lg ml-4 relative"
        onClick={() => onClick(form.id as number)}
      >
        <span className="text-neutral text-lg font-semibold flex items-center justify-center h-full">
          {form.name}
        </span>
        <p className="self-end mb-4 ml-8 text-sm font-light">
          {form.description}
        </p>

        {form.attenders ? (
          <div className="badge badge-info absolute top-1/2 transform -translate-y-1/2 right-4 px-2 text-xs">
            published
          </div>
        ) : (
          <div className="badge badge-info absolute top-1/2 transform -translate-y-1/2 right-4 px-2 text-xs">
            new
          </div>
        )}
      </div>
      {form.children && form.children.length > 0 && (
        <ul className="pl-6">
          {form.children.map((child) => (
            <DashboardFormItem
              key={child.id}
              form={child}
              onClick={onClick}
              projectId={projectId}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

export default DashboardFormItem
