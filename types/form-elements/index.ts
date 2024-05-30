import NumberFieldFormElement from '@/components/form/NumberField'
import TextFieldFormElement from '@/components/form/TextField'
import TextAreaFieldFormElement from '@/components/form/TextAreaField.'
import DateFieldFormElement from '@/components/form/DateField'
import SelectFieldFormElement from '@/components/form/SelectField'
import CheckBoxFieldFormElement from '@/components/form/CheckBoxField'
import ConditionalSelectFieldElement from '@/components/form/ConditionalSelectField'

export type ElementsType =
  | 'TextField'
  | 'NumberField'
  | 'TextAreaField'
  | 'DateField'
  | 'SelectField'
  | 'CheckBoxField'
  | 'ConditionalSelectField'

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
        render?: boolean
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
  TextAreaField: TextAreaFieldFormElement,
  DateField: DateFieldFormElement,
  SelectField: SelectFieldFormElement,
  CheckBoxField: CheckBoxFieldFormElement,
  ConditionalSelectField: ConditionalSelectFieldElement,
}
