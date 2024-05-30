import React from 'react'
import SidebarBtnElement from './SidebarBtnElement'
import { FormElements } from '@/types/form-elements'

const FormElementsSidebar = () => {
  return (
    <>
      <SidebarBtnElement formElement={FormElements.TextField} />
      <SidebarBtnElement formElement={FormElements.NumberField} />
      <SidebarBtnElement formElement={FormElements.TextAreaField} />
      <SidebarBtnElement formElement={FormElements.DateField} />
      <SidebarBtnElement formElement={FormElements.SelectField} />
      <SidebarBtnElement formElement={FormElements.CheckBoxField} />
      <SidebarBtnElement formElement={FormElements.ConditionalSelectField} />
    </>
  )
}

export default FormElementsSidebar
