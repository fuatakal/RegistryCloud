export type ElementsType = 'TextField'

export interface FormElement {
  type: ElementsType
  designerComponent: React.FC
  formComponent: React.FC
  propertiesComponent: React.FC
}
