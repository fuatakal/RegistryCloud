import draggedItemAtom from '@/atoms/draggedItemAtom'
import { DragOverlay, useDndMonitor } from '@dnd-kit/core'
import { useAtom } from 'jotai'
import React from 'react'
import { SidebarBtnElementDragOverlay } from './SidebarBtnElement'
import {
  ElementsType,
  FormElementInstance,
  FormElements,
} from '@/types/form-elements'
import formElementsAtom from '@/atoms/formElementsAtom'

const DragOverlayWrapper = () => {
  const [elements] = useAtom(formElementsAtom)
  const [draggedItem, setDraggedItem] = useAtom(draggedItemAtom)
  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active)
    },
    onDragCancel: () => {
      setDraggedItem(null)
    },
    onDragEnd: () => {
      setDraggedItem(null)
    },
  })

  if (!draggedItem) return null

  let node = <div>No drag overlay</div>

  const isSidebarBtnElement = draggedItem?.data?.current?.isDesignerBtnElement

  if (isSidebarBtnElement) {
    const type = draggedItem.data?.current?.type as ElementsType
    node = <SidebarBtnElementDragOverlay formElement={FormElements[type]} />
  }

  const isDesignerElement = draggedItem?.data?.current?.isDesignerElement

  if (isDesignerElement) {
    const elementId = draggedItem?.data?.current?.elementId
    const element = elements.find(
      (val: FormElementInstance) => val.id === elementId
    )
    if (!element) {
      node = <div>Element not found!</div>
    } else {
      const DesignerElementComponent =
        FormElements[element.type as ElementsType].designerComponent
      node = (
        <div className="flex bg-base-200 border rounded-lg h-[120px] w-full py-2 px-4 opacity-60 pointer-events-none">
          <DesignerElementComponent elementInstance={element} />
        </div>
      )
    }
  }

  return <DragOverlay>{node}</DragOverlay>
}

export default DragOverlayWrapper
