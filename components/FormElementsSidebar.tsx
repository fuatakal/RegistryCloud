import React from 'react'
import SidebarBtnElement from './SidebarBtnElement'
import { FormElements } from '@/types/form-elements'

const FormElementsSidebar = () => {
  return (
    <>
      <SidebarBtnElement formElement={FormElements.TextField} />
    </>
  )
}

export default FormElementsSidebar
