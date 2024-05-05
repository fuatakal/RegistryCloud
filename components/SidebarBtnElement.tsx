'use client'

import { FormElement } from '@/types/form-elements'
import { useDraggable } from '@dnd-kit/core'
import React from 'react'

interface SidebarBtnElementProps {
  formElement: FormElement
}

const SidebarBtnElement = ({ formElement }: SidebarBtnElementProps) => {
  const { label, icon: Icon } = formElement.designerBtnElement
  const draggable = useDraggable({
    id: `designer-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerBtnElement: true,
    },
  })
  return (
    <button
      className="btn btn-outlined flex gap-2 h-[60px] w-max-[240px] cursor-grap"
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Icon className="w-5 h-5" />
      {label}
    </button>
  )
}

export const SidebarBtnElementDragOverlay = ({
  formElement,
}: SidebarBtnElementProps) => {
  const { label, icon: Icon } = formElement.designerBtnElement
  return (
    <button className="btn btn-outlined flex gap-2 h-[60px] w-[240px] cursor-grap">
      <Icon className="w-5 h-5" />
      {label}
    </button>
  )
}

export default SidebarBtnElement
