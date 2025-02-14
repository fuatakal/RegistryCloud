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
import { Bs123 } from 'react-icons/bs'

const type: ElementsType = 'NumberField'

const extraAttributes = {
  label: 'Number field',
  variableName: 'number-field',
  required: false,
  placeHolder: 'Value here...',
  max: 10000,
  min: 0,
}

const propertiesSchema = yup.object().shape({
  label: yup.string().min(2).max(50),
  variableName: yup.string().min(3).max(24),
  required: yup.boolean().default(false),
  placeHolder: yup.string().max(50),
  max: yup.number(),
  min: yup.number(),
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
      <input
        type="text"
        placeholder={placeHolder}
        className="input input-bordered w-full max-w-xs"
      />
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

  const { label, required, placeHolder, max, min } = element.extraAttributes

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const val = e.target.value

    if (!submitValue) return

    const valid = NumberFieldFormElement.validate(element, val)
    setError(!valid)
    submitValue(parseInt(element.id), val)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    const numVal = parseFloat(val)

    if (isNaN(numVal) || numVal < min || numVal > max) {
      setError(true)
    } else {
      setError(false)
    }

    setValue(val)
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className={error ? 'text-red-500' : ''}>
        {label}
        {required && '*'}
      </label>
      <input
        className={
          error
            ? 'input input-bordered w-full border-red-500'
            : 'input input-bordered w-full'
        }
        placeholder={placeHolder}
        type="number"
        max={max}
        min={min}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
      />
      {error && (
        <p className="text-red-500">
          Value must be between {min} and {max}
        </p>
      )}
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
      max: element.extraAttributes.max,
      min: element.extraAttributes.min,
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
        max: values.max,
        min: values.min,
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
                type="number"
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
          name="max"
          render={({ field }) => (
            <div className="flex flex-col gap-1 my-2">
              <label>Max value</label>
              <input
                type="number"
                className="input input-bordered w-full max-w-xs"
                {...field}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') e.currentTarget.blur()
                }}
                onBlur={() => {
                  const minValue = form.watch('min') ?? 0
                  if ((field.value ?? 0) < minValue) {
                    form.setValue('max', Number(minValue) + 1)
                  }
                }}
                min={form.watch('min') ?? 0}
              />
            </div>
          )}
        />
        <Controller
          control={form.control}
          name="min"
          render={({ field }) => (
            <div className="flex flex-col gap-1 my-2">
              <label>Min value</label>
              <input
                type="number"
                className="input input-bordered w-full max-w-xs"
                {...field}
                onBlur={() => {
                  const maxValue = form.watch('max') ?? 0
                  if ((field.value ?? 0) > maxValue) {
                    form.setValue('min', Number(maxValue) - 1)
                  }
                }}
                min={form.watch('min') ?? 0}
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

const NumberFieldFormElement: FormElement = {
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
    icon: Bs123,
    label: 'Number Field',
  },
  validate: (
    formElement: FormElementInstance,
    currentValue: string
  ): boolean => {
    const element = formElement as CustomInstance
    if (element.extraAttributes.required) {
      return currentValue.length > 0
    }
    if (
      isNaN(Number(currentValue)) ||
      Number(currentValue) < element.extraAttributes.min ||
      Number(currentValue) > element.extraAttributes.max
    ) {
      return false
    }

    return true
  },
}

export default NumberFieldFormElement
