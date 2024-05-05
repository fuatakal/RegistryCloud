import React, { useState } from 'react'
import DesignerSideBar from './DesignerSideBar'
import { useDndMonitor, useDroppable } from '@dnd-kit/core'
import { useAtom } from 'jotai'
import formElementsAtom from '@/atoms/formElementsAtom'
import {
  ElementsType,
  FormElementInstance,
  FormElements,
} from '@/types/form-elements'
import { idGenerator } from '@/utils/idGenerator'
import { FaTrash } from 'react-icons/fa6'

const Designer = () => {
  const [elements, setElements] = useAtom(formElementsAtom)

  const droppable = useDroppable({
    id: 'designer-drop-zone',
    data: {
      isDesignerDropZone: true,
    },
  })

  useDndMonitor({
    onDragEnd(event) {
      const { active, over } = event
      if (!active || !over) return

      const isDesignerBtnElement = active?.data?.current?.isDesignerBtnElement
      if (isDesignerBtnElement) {
        const type = active?.data?.current?.type
        const newElement =
          FormElements[type as ElementsType].construct(idGenerator())
        setElements((prevElements) => [...prevElements, newElement])
      }
    },
  })

  return (
    <div className="flex w-full h-full">
      <div className="p-4 w-full">
        <div
          ref={droppable.setNodeRef}
          className={`drop-zone ${droppable.isOver && 'ring-2 ring-primary/30'}`}
        >
          {droppable.isOver && (
            <div className="p-4 w-full">
              <div className="h-[120px] rounded-md bg-base-300"></div>
            </div>
          )}{' '}
          {!droppable.isOver && elements.length === 0 && (
            <p
              className="text-3xl text-muted-foreground 
          flex flex-grow items-center font-bold"
            >
              Drop Here
            </p>
          )}
          {elements.length > 0 && (
            <div className="flex flex-col w-full p-4">
              {elements.map((element) => (
                <DesignerElementWrapper key={element.id} element={element} />
              ))}
            </div>
          )}
        </div>
      </div>
      <DesignerSideBar />
    </div>
  )
}

interface DesignerElementWrapperProps {
  element: FormElementInstance
}

const DesignerElementWrapper = ({ element }: DesignerElementWrapperProps) => {
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false)
  const topHalf = useDroppable({
    id: element.id + '-top',
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  })

  const bottomHalf = useDroppable({
    id: element.id + '-bottom',
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true,
    },
  })

  const DesignerElement = FormElements[element.type].designerComponent
  return (
    <div
      className="relative h-[120px] flex flex-col hover:cursor-pointer rounded-lg ring-1 ring-accent ring-inset"
      onMouseEnter={() => {
        setMouseIsOver(true)
      }}
      onMouseLeave={() => {
        setMouseIsOver(false)
      }}
    >
      <div
        ref={topHalf.setNodeRef}
        className={`absolute w-full h-1/2 rounded-t-lg`}
      />
      <div
        ref={bottomHalf.setNodeRef}
        className={`absolute bottom-0 w-full h-1/2 rounded-b-lg`}
      />
      {mouseIsOver && (
        <>
          <div className="absolute right-0 h-full">
            <button className="btn btn-error fles justify-center h-full border rounded-lg rounded-l-none">
              <FaTrash size={14} />
            </button>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
            <p className="text-muted-foreground text-sm">
              Click for properties or drag to move
            </p>
          </div>
        </>
      )}
      <div className="flex w-full h-[120px] items-center rounded-lg pointer-events-none bg-base-200 p-4">
        <DesignerElement elementInstance={element} />
      </div>
    </div>
  )
}

export default Designer
