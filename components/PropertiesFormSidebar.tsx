import selectedElementAtom from '@/atoms/selectedElementAtom'
import { FormElements } from '@/types/form-elements'
import { useAtom } from 'jotai'
import React from 'react'
import { FaX } from 'react-icons/fa6'

const PropertiesFormSidebar = () => {
  const [selectedElement, setSelectedElement] = useAtom(selectedElementAtom)

  if (!selectedElement) return null

  const PropertiesForm = FormElements[selectedElement?.type].propertiesComponent

  return (
    <div className="flex flex-col p-2  bg-base-200 p-6 rounded-lg">
      <div className="flex justify-between items-center">
        <p className="text-sm text-base-content/80">Properties</p>
        <button
          className="btn btn-square btn-xs btn-outline"
          onClick={() => {
            setSelectedElement(null)
          }}
        >
          <FaX size={14} />
        </button>
      </div>
      <div className="divider divider-neutral" />
      <PropertiesForm elementInstance={selectedElement} />
    </div>
  )
}

export default PropertiesFormSidebar
