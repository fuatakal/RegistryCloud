'use client'

import { FormElementInstance, FormElements } from '@/types/form-elements'
import React from 'react'

function FormPreviewComponent({ content }: { content: FormElementInstance[] }) {
  return (
    <div className="flex justify-center w-full h-full items-center p-8 ">
      <div className="max-w-[820px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl rounded">
        {content.map((element) => {
          const FormElement = FormElements[element.type].formComponent
          return <FormElement key={element.id} elementInstance={element} />
        })}
      </div>
    </div>
  )
}

export default FormPreviewComponent
