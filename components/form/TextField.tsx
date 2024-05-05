'use client'

import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from '@/types/form-elements'
import React from 'react'
import { MdTextFields } from 'react-icons/md'

const type: ElementsType = 'TextField'

const extraAttributes = {
  label: 'Text field',
  required: false,
  placeHolder: 'Value here...',
}

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

const TextFieldFormElement: FormElement = {
  type,
  designerComponent: DesignerComponent,
  formComponent: () => <div>Form component</div>,
  propertiesComponent: () => <div>Prpperties component</div>,
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
