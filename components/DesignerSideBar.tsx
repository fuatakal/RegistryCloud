'use client'

import React from 'react'
import { useAtom } from 'jotai'
import selectedElementAtom from '@/atoms/selectedElementAtom'
import FormElementsSidebar from './FormElementsSidebar'
import PropertiesFormSidebar from './PropertiesFormSidebar'

const DesignerSideBar = () => {
  const [selectedElement] = useAtom(selectedElementAtom)
  return (
    <aside
      className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 order-l-2 
    border-muted p-4 bg-background overflow-y-auto h-full"
    >
      {!selectedElement ? <FormElementsSidebar /> : <PropertiesFormSidebar />}
    </aside>
  )
}

export default DesignerSideBar
