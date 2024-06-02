'use client'

import React, { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { FaFileExport, FaFileImport, FaSave } from 'react-icons/fa'
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
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Modal from './Modal'
import { Controller, useForm } from 'react-hook-form'
import Loading from './Loading'
interface FormBuilderProps {
  id: string
}

const FormBuilder = ({ id }: FormBuilderProps) => {
  const router = useRouter()
  const [formElements, setFormElements] = useAtom(formElementsAtom)
  const [, setAlert] = useAtom(alertStateAtom)

  const [currentForm, setForm] = useAtom(currentFormAtom)
  const [loading, setLoading] = useState<boolean>(true)
  const { editForm, getFormById, deleteForm } = useFormHooks()

  const [exportModalIsOpen, setExportModalIsOpen] = useState<boolean>(false)
  const [importModalIsOpen, setImportModalIsOpen] = useState<boolean>(false)

  const handleToggleExport = () => setExportModalIsOpen((prev) => !prev)
  const handleToggleImport = () => setImportModalIsOpen((prev) => !prev)

  const ImportSchema = yup.object().shape({
    design: yup.string(),
  })

  type ImportSchemaProps = yup.InferType<typeof ImportSchema>

  const form = useForm<ImportSchemaProps>({
    resolver: yupResolver(ImportSchema),
    mode: 'onSubmit',
    defaultValues: {
      design: JSON.stringify(formElements, null, 2),
    },
  })

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

  const handleImport = async (values: ImportSchemaProps) => {
    const newForm = {
      ...form,
      questions: JSON.parse(values.design as string),
    } as Form
    await editForm(id, newForm)
    window.location.reload()
  }

  const handleSaveForm = async () => {
    try {
      await editForm(id, { ...form, questions: formElements } as Form)
      setAlert({
        isVisible: true,
        message: `Your form is saved.`,
        variant: 'success',
      })
      setForm({ ...form, questions: formElements } as Form)
    } catch (error) {
      console.log('Save form error: ' + error)
    }
  }

  useEffect(() => {
    const getForm = async () => {
      console.log(id)
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

  if (loading) return <Loading />

  return (
    <DndContext sensors={sensors}>
      <Modal isOpen={exportModalIsOpen}>
        <div className="flex flex-col justify-center">
          <div className="flex justify-between ">
            <h3 className="font-bold text-lg">Export Form Design</h3>
            <button
              className="btn btn-circle btn-xs btn-outline"
              onClick={handleToggleExport}
            >
              X
            </button>
          </div>
          <div className=" divider divider-neutral mb-6" />

          <form className="flex flex-col gap-4">
            <textarea
              className="textarea textarea-bordered textarea-lg w-full font-light text-sm h-44"
              value={JSON.stringify(formElements)}
            />
          </form>
        </div>
      </Modal>
      <Modal isOpen={importModalIsOpen}>
        <div className="flex flex-col justify-center">
          <div className="flex justify-between ">
            <h3 className="font-bold text-lg">Import Form Design</h3>
            <button
              className="btn btn-circle btn-xs btn-outline"
              onClick={handleToggleImport}
            >
              X
            </button>
          </div>
          <div className=" divider divider-neutral mb-6" />

          <form
            onSubmit={form.handleSubmit(handleImport)}
            className="flex flex-col gap-4"
          >
            <Controller
              control={form.control}
              name="design"
              render={({ field }) => (
                <textarea
                  {...field}
                  className="textarea textarea-bordered textarea-lg w-full font-light text-sm h-44"
                />
              )}
            />

            <button
              className="btn btn-primary btn-outline w-[10rem] place-self-end mt-4"
              type="submit"
            >
              Import Form
            </button>
          </form>
        </div>
      </Modal>
      <main className="flex flex-col w-full">
        <div className="flex justify-between border-b-2 p-4 items-center gap-3">
          <h2>
            Form:<span className=" font-bold"> {currentForm?.name}</span>
          </h2>
          <div className="flex gap-1">
            <button
              className="btn btn-info btn-outline"
              onClick={handleToggleImport}
            >
              Import <FaFileImport />
            </button>
            <button
              className="btn btn-info btn-outline"
              onClick={handleToggleExport}
            >
              Export <FaFileExport />
            </button>
          </div>

          <div className="flex gap-2">
            <button
              className="btn btn-outline btn-success"
              onClick={handleSaveForm}
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
