import NumberFieldFormElement from '@/components/form/NumberField'
import TextFieldFormElement from '@/components/form/TextField'

export type ElementsType = 'TextField' | 'NumberField'

export interface FormElementInstance {
  id: string
  type: ElementsType
  extraAttributes: Record<string, unknown>
}
export interface FormElement {
  validate(
    element: FormElementInstance & {
      extraAttributes: {
        label: string
        variableName: string
        required: boolean
        placeHolder: string
      }
    },
    value: string
  ): unknown
  type: ElementsType

  construct: (id: string) => FormElementInstance

  designerBtnElement: {
    icon: React.ElementType
    label: string
  }
  designerComponent: React.FC<{
    elementInstance: FormElementInstance
  }>
  formComponent: React.FC<{
    elementInstance: FormElementInstance
    submitValue?: (question: number, answer: string) => void
    isInvalid?: boolean
    defaultValue?: string
  }>
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance
  }>
}

type FormElementsType = {
  [key in ElementsType]: FormElement
}

export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement,
  NumberField: NumberFieldFormElement,
}
