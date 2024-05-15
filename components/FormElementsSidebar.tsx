import React from 'react'
import SidebarBtnElement from './SidebarBtnElement'
import { FormElements } from '@/types/form-elements'

const FormElementsSidebar = () => {
  return (
    <>
      <SidebarBtnElement formElement={FormElements.TextField} />
      <SidebarBtnElement formElement={FormElements.NumberField} />
    </>
  )
}

export default FormElementsSidebar
