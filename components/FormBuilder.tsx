'use client'

import React, { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { FaSave } from 'react-icons/fa'
import Designer from './Designer'
import { DndContext, MouseSensor, useSensor, useSensors } from '@dnd-kit/core'
import DragOverlayWrapper from './DragOverlayWrapper'
import formElementsAtom from '@/atoms/formElementsAtom'
import { Form } from '@/types'
import { useFormHooks } from '@/hooks/form'
import PublishBtn from './PublishBtn'
import currentFormAtom from '@/atoms/currentFormAtom'
import { useRouter } from 'next/navigation'
import DeleteBtn from './DeleteFormButton'
import { alertStateAtom } from '@/atoms/alertAtom'

interface FormBuilderProps {
  id: string
}

const FormBuilder = ({ id }: FormBuilderProps) => {
  const router = useRouter()
  const [formElements, setFormElements] = useAtom(formElementsAtom)

  const [, setAlert] = useAtom(alertStateAtom)

  const [form, setForm] = useAtom(currentFormAtom)
  const [loading, setLoading] = useState<boolean>(true)

  const { editForm, getFormById, deleteForm } = useFormHooks()

  const handleDeleteForm = async (formId: number) => {
    try {
      await deleteForm(formId)
      router.push('/dashboard')
      setAlert({
        isVisible: true,
        message: `Your form is deleted.`,
        variant: 'info',
      })
    } catch (error) {
      console.log('Delete form error: ' + error)
    }
  }

  const handleSaveForm = async () => {
    try {
      await editForm(id, { ...form, questions: formElements } as Form)
      setAlert({
        isVisible: true,
        message: `Your form is saved.`,
        variant: 'success',
      })
    } catch (error) {
      console.log('Save form error: ' + error)
    }
  }

  useEffect(() => {
    const getForm = async () => {
      const response = await getFormById(Number(id))
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

            <DeleteBtn formId={Number(id)} handleDelete={handleDeleteForm} />
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
