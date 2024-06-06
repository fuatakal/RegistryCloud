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
import { BsCalculator } from 'react-icons/bs'
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai'

const type: ElementsType = 'ComputationField'

const extraAttributes = {
  label: 'Computation Field',
  variableName: 'computation-field',
  required: false,
  placeHolder: 'Value here...',
  computationType: 'average',
  inputs: [0, 0],
}

const propertiesSchema = yup.object().shape({
  label: yup.string().min(2).max(50),
  variableName: yup.string().min(3).max(24),
  required: yup.boolean().default(false),
  placeHolder: yup.string().max(50),
  computationType: yup.string().oneOf(['average', 'bmi']),
  inputs: yup.array().of(yup.number()).min(2),
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
}> = ({ elementInstance, submitValue, isInvalid }) => {
  const element = elementInstance as CustomInstance

  const [values, setValues] = useState<number[]>(element.extraAttributes.inputs)
  const [error, setError] = useState(false)

  useEffect(() => {
    setError(isInvalid === true)
  }, [isInvalid])

  const { label, required, placeHolder, computationType } =
    element.extraAttributes

  const handleInputChange = (index: number, value: number) => {
    const newValues = values.slice()
    newValues[index] = value
    setValues(newValues)
  }

  const handleBlur = () => {
    if (!submitValue) return
    const valid = validate(element, values.join(','))
    setError(!valid)
    if (!valid) return
    const result = calculateResult()
    const submissionValue = `${result.toFixed(2)}`
    submitValue(parseInt(element.id), submissionValue)
  }

  const calculateResult = () => {
    if (computationType === 'average') {
      const sum = values.reduce((acc, val) => acc + val, 0)
      return sum / values.length
    } else if (computationType === 'bmi' && values.length === 2) {
      const [weight, height] = values
      return (weight / (height * height)) * 10000
    }
    return 0
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className={error ? 'text-red-500' : ''}>
        {label}
        {required && '*'}
      </label>
      {values.map((value, index) => (
        <div key={index} className="flex items-center gap-2">
          <input
            className={
              error
                ? 'input input-bordered w-full border-red-500'
                : 'input input-bordered w-full'
            }
            placeholder={placeHolder}
            type="number"
            onChange={(e) => handleInputChange(index, Number(e.target.value))}
            onBlur={handleBlur}
          />
        </div>
      ))}
      <div className="mt-2">
        <label>Result: {calculateResult()}</label>
      </div>
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
      computationType: element.extraAttributes.computationType,
      inputs: element.extraAttributes.inputs,
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
        computationType: values.computationType,
        inputs: values.inputs,
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
          name="computationType"
          render={({ field }) => (
            <div className="flex flex-col gap-1 my-2">
              <label>Computation Type</label>
              <select className="select select-bordered" {...field}>
                <option value="average">Average</option>
                <option value="bmi">BMI</option>
              </select>
            </div>
          )}
        />
        <Controller
          control={form.control}
          name="inputs"
          render={({ field }) => (
            <>
              <div className="flex justify-between items-center">
                <label>Inputs</label>
                {(form.watch('computationType') === 'bmi' &&
                  (form.watch('inputs')?.length as number) < 3) ||
                  (form.watch('computationType') !== 'bmi' && (
                    <button
                      className="btn btn-outline btn-accent gap-2"
                      onClick={(e) => {
                        e.preventDefault() // avoid submit
                        form.setValue('inputs', field.value?.concat(0))
                      }}
                    >
                      <AiOutlinePlus />
                      Add
                    </button>
                  ))}
              </div>
              <div className="flex flex-col gap-2 mt-2">
                {form.watch('computationType') !== 'bmi' &&
                  form.watch('inputs')?.map((input, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between gap-1"
                    >
                      <input
                        placeholder={`${form.watch('placeHolder')}-${index}`}
                        type="text"
                        className="input input-bordered w-[12rem]"
                        disabled
                      />
                      {(form.watch('inputs')?.length as number) > 2 && (
                        <button
                          className="btn btn-ghost"
                          onClick={(e) => {
                            e.preventDefault()
                            const newInputs = Array.isArray(field.value)
                              ? [...field.value]
                              : []
                            newInputs.splice(index, 1)
                            field.onChange(newInputs)
                          }}
                        >
                          <AiOutlineClose />
                        </button>
                      )}
                    </div>
                  ))}
                {form.watch('computationType') === 'bmi' && (
                  <>
                    <div className="flex items-center justify-between gap-1">
                      <input
                        placeholder="Weight"
                        type="text"
                        className="input input-bordered w-[8rem]"
                        disabled
                      />
                    </div>
                    <div className="flex items-center justify-between gap-1">
                      <input
                        placeholder="Height"
                        type="text"
                        className="input input-bordered w-[8rem]"
                        disabled
                      />
                    </div>
                  </>
                )}
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

const validate = (
  formElement: FormElementInstance,
  currentValue: string
): boolean => {
  const element = formElement as CustomInstance
  if (element.extraAttributes.required) {
    return currentValue.length > 0
  }

  return true
}

const ComputationFieldFormElement: FormElement = {
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
    icon: BsCalculator,
    label: 'Computation Field',
  },
  validate,
}

export default ComputationFieldFormElement
