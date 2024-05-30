'use client'

import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { MdArrowDropDownCircle } from 'react-icons/md'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from '@/types/form-elements'
import { useFormActions } from '@/hooks/formActions'
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai'

const type: ElementsType = 'ConditionalSelectField'

const extraAttributes = {
  label: 'Select field',
  variableName: 'select-field',
  placeHolder: 'Value here...',
  required: false,
  options: [
    {
      label: 'Option 1',
      showTextField: false,
      extraAtributes: {
        label: 'Text field',
        variableName: 'text-field',
        placeHolder: 'Value here...',
        required: false,
      },
    },
    {
      label: 'Option 2',
      showTextField: true,
      extraAtributes: {
        label: 'Text field',
        variableName: 'text-field',
        placeHolder: 'Value here...',
        required: false,
      },
    },
  ],
}

const propertiesSchema = yup.object().shape({
  label: yup.string().min(2).max(50),
  variableName: yup.string().min(3).max(24),
  placeHolder: yup.string().max(50),
  required: yup.boolean().default(false),
  options: yup
    .array()
    .of(
      yup.object().shape({
        label: yup.string().required(),
        showTextField: yup.boolean().required(),
        extraAttributes: yup.object().shape({
          label: yup.string().min(2).max(50),
          variableName: yup.string().min(3).max(24),
          placeHolder: yup.string().max(50),
          required: yup.boolean().default(false),
        }),
      })
    )
    .min(2)
    .max(10)
    .required(),
})

type PropertiesSchemaProps = yup.InferType<typeof propertiesSchema>

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
  const { label, required, options, placeHolder } = element.extraAttributes
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="font-semibold">
        {label}
        {required && '*'}
      </label>
      <select className="select select-bordered w-full max-w-xs">
        <option disabled selected>
          {placeHolder}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.label}>
            {option.label}
          </option>
        ))}
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
  const [selectedOption, setSelectedOption] = useState(
    defaultValue || element.extraAttributes.options[0].label
  )
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    setError(isInvalid === true)
  }, [isInvalid])

  const { label, required, options, placeHolder } = element.extraAttributes

  const selectedOptionObj = options.find(
    (option) => option.label === selectedOption
  )

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className={error ? 'text-red-500' : ''}>
        {label}
        {required && '*'}
      </label>
      <select
        className="select select-bordered w-full max-w-xs"
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option disabled value="">
          {placeHolder}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.label}>
            {option.label}
          </option>
        ))}
      </select>

      {selectedOptionObj?.showTextField && (
        <div className="flex flex-col gap-2 w-full">
          <label className={error ? 'text-red-500' : ''}>
            {selectedOptionObj.extraAtributes.label}{' '}
            {selectedOptionObj.extraAtributes.required && '*'}
          </label>
          <input
            className={
              error
                ? 'input input-bordered w-full border-red-500'
                : 'input input-bordered w-full'
            }
            placeholder={selectedOptionObj.extraAtributes.placeHolder}
            onChange={(e) => setValue(e.target.value)}
            onBlur={(e) => {
              if (!submitValue) return
              const valid = ConditionalSelectField.validate(
                element,
                e.target.value
              )
              setError(!valid)
              if (!valid) return
              submitValue(parseInt(element.id), e.target.value)
            }}
            value={value}
          />
        </div>
      )}
    </div>
  )
}

const PropertiesComponent: React.FC<DesignerComponentProps> = ({
  elementInstance,
}) => {
  const element = elementInstance as CustomInstance
  const form = useForm<PropertiesSchemaProps>({
    resolver: yupResolver(propertiesSchema),
    mode: 'onBlur',
    defaultValues: {
      label: element.extraAttributes.label,
      variableName: element.extraAttributes.variableName,
      options: element.extraAttributes.options,
      required: element.extraAttributes.required,
    },
  })

  useEffect(() => {
    form.reset(element.extraAttributes)
  }, [element, form])
  const { updateElement } = useFormActions()

  const applyChanges = (values: PropertiesSchemaProps) => {
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        label: values.label,
        variableName: values.variableName,
        placeHolder: values.placeHolder,
        options: values.options,
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
                    form.setValue(
                      'options',
                      field.value?.concat({
                        label: 'New option',
                        showTextField: false,
                        extraAttributes: {
                          label: 'Text field',
                          variableName: 'text-field',
                          placeHolder: 'Value here...',
                          required: false,
                        },
                      })
                    )
                  }}
                >
                  <AiOutlinePlus />
                  Add
                </button>
              </div>
              <div className="flex flex-col gap-2 mt-2">
                {form.watch('options')?.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-1"
                  >
                    <input
                      placeholder="Option label"
                      type="text"
                      className="input input-bordered w-[8rem]"
                      value={option.label}
                      onChange={(e) => {
                        const newOptions = [...field.value]
                        newOptions[index].label = e.target.value
                        field.onChange(newOptions)
                      }}
                    />
                    <label className="flex items-center gap-2">
                      <span>Show Text Field</span>
                      <input
                        type="checkbox"
                        checked={option.showTextField}
                        onChange={(e) => {
                          const newOptions = [...field.value]
                          newOptions[index].showTextField = e.target.checked
                          field.onChange(newOptions)
                        }}
                      />
                    </label>
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
        {form.watch('options')?.map((option, index) => {
          if (option.showTextField)
            return (
              <div key={index}>
                <Controller
                  control={form.control}
                  name={`options.${index}.extraAttributes.label`}
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
                  name={`options.${index}.extraAttributes.variableName`}
                  render={({ field }) => (
                    <div className="flex flex-col gap-1 my-2">
                      <label>Variable Name</label>
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
                  name={`options.${index}.extraAttributes.placeHolder`}
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
                  name={`options.${index}.extraAttributes.required`}
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
              </div>
            )
        })}
      </form>
    </div>
  )
}

const ConditionalSelectField: FormElement = {
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
    icon: MdArrowDropDownCircle,
    label: 'Conditional Select Field',
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

export default ConditionalSelectField
