'use client'

import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from '@/types/form-elements'
import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useFormActions } from '@/hooks/formActions'
import { BsFillCalendarDateFill } from 'react-icons/bs'
import { BiCalendar } from 'react-icons/bi'
import Modal from '../Modal'

const type: ElementsType = 'DateField'

const extraAttributes = {
  label: 'Date field',
  variableName: 'date-field',
  required: false,
}

const propertiesSchema = yup.object().shape({
  label: yup.string().min(2).max(50),
  variableName: yup.string().min(3).max(24),
  required: yup.boolean().default(false),
})

type propestiesSchemaProps = yup.InferType<typeof propertiesSchema>

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes
}

interface DesignerComponentProps {
  elementInstance: FormElementInstance
}

const DesignerComponent: React.FC<DesignerComponentProps> = ({
  elementInstance,
}) => {
  const element = elementInstance as CustomInstance
  const { label, required } = element.extraAttributes
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="font-semibold">
        {label}
        {required && '*'}
      </label>
      <button className="btn btn-accent btn-outline w-[10rem] self-start">
        Pick a date <BiCalendar />
      </button>
    </div>
  )
}

const FormComponent: React.FC<{
  elementInstance: FormElementInstance
  submitValue?: (question: number, answer: string) => void
  isInvalid?: boolean
  defaultValue?: string
}> = ({ elementInstance, submitValue, isInvalid, defaultValue }) => {
  const element = elementInstance as CustomInstance

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}.${month}.${year}`
  }

  const parseDate = (dateString: string) => {
    const [day, month, year] = dateString.split('.')
    return new Date(Number(year), Number(month) - 1, Number(day))
  }

  const [date, setDate] = useState<Date | undefined>(
    defaultValue ? parseDate(defaultValue) : undefined
  )
  const [error, setError] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setError(isInvalid === true)
  }, [isInvalid])

  const { label, required } = element.extraAttributes
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className={error ? 'text-red-500' : ''}>
        {label}
        {required && '*'}
      </label>
      <button
        className={
          error
            ? 'btn btn-accent btn-outline w-[10rem] self-start border-red-500'
            : 'btn btn-accent btn-outline w-[10rem] self-start'
        }
        onClick={() => setIsOpen(true)}
      >
        Pick a date <BiCalendar />
      </button>
      <Modal isOpen={isOpen}>
        <input
          type="date"
          className="input input-bordered mb-2"
          value={date ? date.toISOString().split('T')[0] : ''}
          onChange={(event) => {
            const selectedDate = new Date(event.target.value)
            if (isNaN(selectedDate.getTime())) {
              setDate(undefined)
              return
            }
            setDate(selectedDate)

            if (!submitValue) return
            const value = formatDate(selectedDate)
            const valid = DateFieldFormElement.validate(element, value)
            setError(!valid)
            submitValue(Number(element.id), value)
          }}
        />
        <div className="flex gap-4">
          <button className="btn btn-primary" onClick={() => setIsOpen(false)}>
            Save
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setIsOpen(false)}
          >
            Close
          </button>
        </div>
      </Modal>
      <input
        type="text"
        className="input input-bordered border-accent disabled"
        value={date ? formatDate(date) : ''}
        readOnly
      />
    </div>
  )
}

const PropertiesComponent: React.FC<DesignerComponentProps> = ({
  elementInstance,
}) => {
  const element = elementInstance as CustomInstance
  const form = useForm<propestiesSchemaProps>({
    resolver: yupResolver(propertiesSchema),
    mode: 'onBlur',
    defaultValues: {
      label: element.extraAttributes.label,
      variableName: element.extraAttributes.variableName,
      required: element.extraAttributes.required,
    },
  })

  useEffect(() => {
    form.reset(element.extraAttributes)
  }, [element, form])
  const { updateElement } = useFormActions()

  const applyChanges = (values: propestiesSchemaProps) => {
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        label: values.label,
        variableName: values.variableName,
        required: values.required,
      },
    })
  }

  const { label } = element.extraAttributes
  return (
    <div className="flex flex-col w-full mt-2">
      <p className="self-center font-bold text-lg">Properties of {label}</p>
      <form
        onBlur={form.handleSubmit(applyChanges)}
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <Controller
          control={form.control}
          name="label"
          render={({ field }) => (
            <div className="flex flex-col gap-1 my-2">
              <label>Label</label>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                {...field}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') e.currentTarget.blur()
                }}
              />
            </div>
          )}
        />
        <Controller
          control={form.control}
          name="variableName"
          render={({ field }) => (
            <div className="flex flex-col gap-1 my-2">
              <label>Variable name</label>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                {...field}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') e.currentTarget.blur()
                }}
              />
            </div>
          )}
        />
        <Controller
          control={form.control}
          name="required"
          render={({ field: { onChange, value } }) => (
            <div className="flex flex-col gap-1 my-2">
              <label>Is required?</label>
              <input
                type="checkbox"
                checked={value}
                className="checkbox checkbox-xs"
                onChange={onChange}
              />
            </div>
          )}
        />
      </form>
    </div>
  )
}

const DateFieldFormElement: FormElement = {
  type,
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: BsFillCalendarDateFill,
    label: 'Date Field',
  },
  validate: (
    formElement: FormElementInstance,
    currentValue: string
  ): boolean => {
    const element = formElement as CustomInstance
    if (element.extraAttributes.required) {
      return currentValue.length > 0
    }

    return true
  },
}

export default DateFieldFormElement
