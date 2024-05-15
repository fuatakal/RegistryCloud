'use client'

import React, { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { FaSave, FaTrash } from 'react-icons/fa'
import Designer from './Designer'
import { DndContext, MouseSensor, useSensor, useSensors } from '@dnd-kit/core'
import DragOverlayWrapper from './DragOverlayWrapper'
import formElementsAtom from '@/atoms/formElementsAtom'
import { Form } from '@/types'
import { useEditForm, useGetFormbyId } from '@/hooks/form'
import PublishBtn from './PublishBtn'
import currentFormAtom from '@/atoms/currentFormAtom'

interface FormBuilderProps {
  id: string
}

const FormBuilder = ({ id }: FormBuilderProps) => {
  const [formElements, setFormElements] = useAtom(formElementsAtom)

  const [form, setForm] = useAtom(currentFormAtom)
  const [loading, setLoading] = useState<boolean>(true)

  const handleSaveForm = async () => {
    try {
      await useEditForm(id, { ...form, questions: formElements } as Form)
    } catch (error) {
      console.log('Save form error: ' + error)
    }
  }

  useEffect(() => {
    const getForm = async () => {
      const response = await useGetFormbyId(Number(id))
      console.log(response)
      setForm(response.data)
      setFormElements(response.questions || [])
      setLoading(false)
    }
    getForm()
  }, [])

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 20,
    },
  })
  const sensors = useSensors(mouseSensor)

  if (loading) return

  return (
    <DndContext sensors={sensors}>
      <main className="flex flex-col w-full">
        <div className="flex justify-between border-b-2 p-4 items-center gap-3">
          <h2>
            Form:<span className=" font-bold"> Form 1</span>
          </h2>
          <div className="flex gap-2">
            <button
              className="btn btn-outline btn-success"
              onClick={() => {
                handleSaveForm()
              }}
            >
              Save <FaSave />
            </button>
            <PublishBtn formId={Number(id)} />
            <button className="btn btn-outline btn-error">
              Delete <FaTrash />
              {/*TO-DO(ali): Buraya delete hook çağrılcak onClick kullan */}
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
