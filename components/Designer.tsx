import React, { useState } from 'react'
import DesignerSideBar from './DesignerSideBar'
import { useDndMonitor, useDraggable, useDroppable } from '@dnd-kit/core'
import { useAtom } from 'jotai'
import formElementsAtom from '@/atoms/formElementsAtom'
import {
  ElementsType,
  FormElementInstance,
  FormElements,
} from '@/types/form-elements'
import { idGenerator } from '@/utils/idGenerator'
import { FaTrash } from 'react-icons/fa6'
import cn from 'classnames'
import selectedElementAtom from '@/atoms/selectedElementAtom'
import { useFormActions } from '@/hooks/formActions'

const Designer = () => {
  const [elements, setElements] = useAtom(formElementsAtom)
  const [selectedElement, setSelectedElement] = useAtom(selectedElementAtom)

  const { addElement } = useFormActions()

  const removeElement = (id: string) => {
    setElements((prev) => prev.filter((val) => val.id !== id))
  }

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
      const isDroppingOverDesignerDropZone =
        over?.data?.current?.isDesignerDropZone

      const isDroppingOverDesignerElementTopHalf =
        over?.data?.current?.isTopHalfDesignerElement

      const isDroppingOverDesignerElementBottomHalf =
        over?.data?.current?.isBottomHalfDesignerElement

      if (isDesignerBtnElement && isDroppingOverDesignerDropZone) {
        const type = active?.data?.current?.type
        const newElement =
          FormElements[type as ElementsType].construct(idGenerator())

        addElement(elements.length, newElement)
      }

      if (
        isDesignerBtnElement &&
        (isDroppingOverDesignerElementTopHalf ||
          isDroppingOverDesignerElementBottomHalf)
      ) {
        const type = active?.data?.current?.type
        const newElement =
          FormElements[type as ElementsType].construct(idGenerator())

        const overId = over?.data?.current?.elementId

        const overElementIndex = elements.findIndex((el) => el.id === overId)

        let indexOfNewElement = overElementIndex

        if (isDroppingOverDesignerElementBottomHalf) {
          indexOfNewElement = overElementIndex + 1
        }

        addElement(indexOfNewElement, newElement)
        return
      }

      const isDraggingDesignerElement = active.data?.current?.isDesignerElement

      const draggingDesignerElementOverAnotherDesignerElement =
        (isDroppingOverDesignerElementTopHalf ||
          isDroppingOverDesignerElementBottomHalf) &&
        isDraggingDesignerElement

      if (draggingDesignerElementOverAnotherDesignerElement) {
        const activeId = active.data?.current?.elementId
        const overId = over.data?.current?.elementId

        const activeElementIndex = elements.findIndex(
          (el) => el.id === activeId
        )

        const overElementIndex = elements.findIndex((el) => el.id === overId)

        console.log('over index')

        if (activeElementIndex === -1 || overElementIndex === -1) {
          throw new Error('element not found')
        }

        const activeElement = { ...elements[activeElementIndex] }
        removeElement(activeId)

        let indexForNewElement = overElementIndex
        if (isDroppingOverDesignerElementBottomHalf) {
          indexForNewElement = overElementIndex + 1
        }

        addElement(indexForNewElement, activeElement)
      }
    },
  })

  return (
    <div className="flex w-full h-full">
      <div
        className="p-4 w-full"
        onClick={() => {
          if (selectedElement) setSelectedElement(null)
        }}
      >
        <div
          ref={droppable.setNodeRef}
          className={`drop-zone ${droppable.isOver && 'ring-2 ring-primary/30'} max-h-[800px]`}
        >
          {droppable.isOver && elements.length === 0 && (
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
            <div className="flex flex-col w-full p-4 gap-4">
              {elements.map((element) => (
                <DesignerElementWrapper
                  key={element.id}
                  element={element}
                  removeElement={removeElement}
                  setSelectedElement={setSelectedElement}
                />
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
  removeElement: (id: string) => void
  setSelectedElement: (element: FormElementInstance) => void
}

const DesignerElementWrapper = ({
  element,
  removeElement,
  setSelectedElement,
}: DesignerElementWrapperProps) => {
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

  const draggable = useDraggable({
    id: element.id + '-drag-handler',
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  })

  const DesignerElement = FormElements[element.type].designerComponent
  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className="relative h-[120px] flex flex-col hover:cursor-pointer rounded-lg ring-1 ring-accent ring-inset"
      onMouseEnter={() => {
        setMouseIsOver(true)
      }}
      onMouseLeave={() => {
        setMouseIsOver(false)
      }}
      onClick={(e) => {
        e.stopPropagation()
        setSelectedElement(element)
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
            <button
              className="btn btn-error fles justify-center h-full border rounded-lg rounded-l-none"
              onClick={(e) => {
                e.stopPropagation(), removeElement(element.id)
              }}
            >
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
      <div
        className={cn(
          'flex w-full h-[120px] items-center rounded-lg pointer-events-none bg-base-200 p-4',
          mouseIsOver && 'opacity-30',
          topHalf.isOver && 'border-t-4 border-t-accent',
          bottomHalf.isOver && 'border-b-4 border-b-accent'
        )}
      >
        <DesignerElement elementInstance={element} />
      </div>
    </div>
  )
}

export default Designer
