import TextFieldFormElement from '@/components/form/TextField'

export type ElementsType = 'TextField'

export interface FormElementInstance {
  id: string
  type: ElementsType
  extraAttributes: Record<string, unknown>
}
export interface FormElement {
  type: ElementsType

  construct: (id: string) => FormElementInstance

  designerBtnElement: {
    icon: React.ElementType
    label: string
  }
  designerComponent: React.FC<{
    elementInstance: FormElementInstance
  }>
  formComponent: React.FC
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance
  }>
}

type FormElementsType = {
  [key in ElementsType]: FormElement
}

export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement,
}
