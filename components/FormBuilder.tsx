'use client'

import React from 'react'
import Navbar from './Navbar'
import { staffLinks } from '@/constants'
import { useAtom } from 'jotai'
import userAtom from '@/atoms/userInfoAtom'
import { FaSave, FaShare, FaTrash } from 'react-icons/fa'
import Designer from './Designer'
import { DndContext, MouseSensor, useSensor, useSensors } from '@dnd-kit/core'
import DragOverlayWrapper from './DragOverlayWrapper'

const FormBuilder = () => {
  const [user] = useAtom(userAtom)

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 20,
    },
  })
  const sensors = useSensors(mouseSensor)

  return (
    <DndContext sensors={sensors}>
      <main className="flex flex-col w-full">
        <Navbar links={staffLinks} username={user?.email || ''} />
        <div className="flex justify-between border-b-2 p-4 items-center gap-3">
          <h2>
            Form:<span className=" font-bold"> Form 1</span>
          </h2>
          <div className="flex gap-2">
            <button className="btn btn-outline btn-success">
              Save <FaSave />
            </button>
            <button className="btn btn-outline btn-primary">
              Publish <FaShare />
            </button>
            <button className="btn btn-outline btn-error">
              Delete <FaTrash />
            </button>
          </div>
        </div>
        <div className="flex w-full items-center justify-center relative h-[600px] bg-neutral-content">
          <Designer />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  )
}

export default FormBuilder
