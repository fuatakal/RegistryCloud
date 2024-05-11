'use client'

import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from '@/types/form-elements'
import React, { useEffect } from 'react'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'

import { MdTextFields } from 'react-icons/md'
import { yupResolver } from '@hookform/resolvers/yup'
import { useFormActions } from '@/hooks/formActions'

const type: ElementsType = 'TextField'

const extraAttributes = {
  label: 'Text field',
  required: false,
  placeHolder: 'Value here...',
}

const propertiesSchema = yup.object().shape({
  label: yup.string().min(2).max(50),
  required: yup.boolean().default(false),
  placeHolder: yup.string().max(50),
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

const PropertiesComponent: React.FC<DesignerComponentProps> = ({
  elementInstance,
}) => {
  const element = elementInstance as CustomInstance
  const form = useForm<propestiesSchemaProps>({
    resolver: yupResolver(propertiesSchema),
    mode: 'onBlur',
    defaultValues: {
      label: element.extraAttributes.label,
      placeHolder: element.extraAttributes.placeHolder,
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
        placeHolder: values.placeHolder,
        required: values.required,
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

const TextFieldFormElement: FormElement = {
  type,
  designerComponent: DesignerComponent,
  formComponent: () => <div>Form component</div>,
  propertiesComponent: PropertiesComponent,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: MdTextFields,
    label: 'Text Field',
  },
}

export default TextFieldFormElement
