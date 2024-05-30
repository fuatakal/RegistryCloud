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
import { RxDropdownMenu } from 'react-icons/rx'
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai'

const type: ElementsType = 'SelectField'

const extraAttributes = {
  label: 'Select field',
  variableName: 'select-field',
  required: false,
  placeHolder: 'Value here...',
  options: [],
}

const propertiesSchema = yup.object().shape({
  label: yup.string().min(2).max(50),
  variableName: yup.string().min(3).max(24),
  required: yup.boolean().default(false),
  placeHolder: yup.string().max(50),
  options: yup.array(yup.string()).default([]),
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
  const { label, required, placeHolder } = element.extraAttributes
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className=" font-semibold">
        {label}
        {required && '*'}
      </label>
      <select className="select select-accent w-full max-w-xs">
        <option disabled selected>
          {placeHolder}
        </option>
      </select>
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

  const [value, setValue] = useState(defaultValue || '')
  const [error, setError] = useState(false)

  useEffect(() => {
    setError(isInvalid === true)
  }, [isInvalid])

  const { label, required, placeHolder, options } = element.extraAttributes
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className={error ? 'text-red-500' : ''}>
        {label}
        {required && '*'}
      </label>
      <select
        className={
          error
            ? 'select select-accent w-full max-w-xs border-red-500'
            : 'select select-accent w-full max-w-xs'
        }
        value={value} // Set value here
        onChange={(e) => {
          const selectedValue = e.target.value
          setValue(selectedValue)
          if (!submitValue) return
          const valid = SelectFieldFormElement.validate(element, selectedValue)
          setError(!valid)
          submitValue(Number(element.id), selectedValue)
        }}
      >
        <option disabled value="">
          {placeHolder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
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
      placeHolder: element.extraAttributes.placeHolder,
      required: element.extraAttributes.required,
      options: element.extraAttributes.options,
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
        placeHolder: values.placeHolder,
        required: values.required,
        options: values.options,
      },
    })
  }

  const { label } = element.extraAttributes
  return (
    <div className="flex flex-col w-full mt-2">
      <p className=" self-center font-bold text-lg">Properties of {label}</p>
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
          name="placeHolder"
          render={({ field }) => (
            <div className="flex flex-col gap-1 my-2">
              <label>Placeholder</label>
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
          name="options"
          render={({ field }) => (
            <>
              <div className="flex justify-between items-center">
                <label>Options</label>
                <button
                  className="btn btn-outline btn-accent gap-2"
                  onClick={(e) => {
                    e.preventDefault() // avoid submit
                    form.setValue('options', field.value.concat('New option'))
                  }}
                >
                  <AiOutlinePlus />
                  Add
                </button>
              </div>
              <div className="flex flex-col gap-2 mt-2">
                {form.watch('options').map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-1"
                  >
                    <input
                      placeholder=""
                      type="text"
                      className="input input-bordered w-[8rem]"
                      value={option}
                      onChange={(e) => {
                        field.value[index] = e.target.value
                        field.onChange(field.value)
                      }}
                    />
                    <button
                      className="btn btn-ghost"
                      onClick={(e) => {
                        e.preventDefault()
                        const newOptions = [...field.value]
                        newOptions.splice(index, 1)
                        field.onChange(newOptions)
                      }}
                    >
                      <AiOutlineClose />
                    </button>
                  </div>
                ))}
              </div>
            </>
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

const SelectFieldFormElement: FormElement = {
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
    icon: RxDropdownMenu,
    label: 'Select Field',
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

export default SelectFieldFormElement
