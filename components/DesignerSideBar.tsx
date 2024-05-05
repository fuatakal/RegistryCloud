'use client'

import { FormElements } from '@/types/form-elements'
import React from 'react'
import SidebarBtnElement from './SidebarBtnElement'

const DesignerSideBar = () => {
  return (
    <aside
      className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 order-l-2 
    border-muted p-4 bg-background overflow-y-auto h-full"
    >
      DesignerSideBar
      <SidebarBtnElement formElement={FormElements.TextField} />
    </aside>
  )
}

export default DesignerSideBar
