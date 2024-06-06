import { AttendedForm } from '@/types'
import React from 'react'
interface FormWithChildren extends AttendedForm {
  children?: FormWithChildren[]
}
interface FormItemProps {
  form: FormWithChildren
  onClick: (id: number) => void
  projectId?: number
  isDetail?: boolean
  isSubmitted?: boolean
}

const DashboardAttendedFormItem: React.FC<FormItemProps> = ({
  form,
  onClick,
  projectId,
  isDetail = false,
  isSubmitted = false,
}) => {
  return (
    <li
      className={`my-4 cursor-pointer transition-transform duration-300 transform ${isDetail ? 'hover:scale-105' : 'hover:scale-110'}`}
    >
      <div
        className="flex py-2 px-4 bg-base-100 h-20 w-full border-1 border-neutral rounded-xl shadow-lg ml-4 relative"
        onClick={() => onClick(form.form as number)}
      >
        <span
          className={`text-neutral text-lg font-semibold flex items-center justify-center h-full ${isDetail && ' text-sm'}`}
        >
          {form.formName}
        </span>
        <p className="self-end mb-4 ml-8 text-sm font-light">
          {form.formDescription}
        </p>

        {isSubmitted ? (
          <div className="badge badge-info absolute top-1/2 transform -translate-y-1/2 right-4 px-2 text-xs">
            submitted
          </div>
        ) : (
          <div className="badge badge-info absolute top-1/2 transform -translate-y-1/2 right-4 px-2 text-xs">
            new
          </div>
        )}
      </div>
      {form.children && form.children.length > 0 && (
        <ul className="pl-8">
          {form.children.map((child) => (
            <DashboardAttendedFormItem
              key={child.form}
              form={child}
              onClick={onClick}
              projectId={projectId}
              isDetail
            />
          ))}
        </ul>
      )}
    </li>
  )
}

export default DashboardAttendedFormItem
