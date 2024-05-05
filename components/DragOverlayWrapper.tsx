import draggedItemAtom from '@/atoms/draggedItemAtom'
import { DragOverlay, useDndMonitor } from '@dnd-kit/core'
import { useAtom } from 'jotai'
import React from 'react'
import { SidebarBtnElementDragOverlay } from './SidebarBtnElement'
import { ElementsType, FormElements } from '@/types/form-elements'

const DragOverlayWrapper = () => {
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

  return <DragOverlay>{node}</DragOverlay>
}

export default DragOverlayWrapper
