import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useCreateForm } from '@/hooks/form'
import { useRouter } from 'next/navigation'

const CreateFormBtn = () => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const handleToggle = () => setIsOpen((prev) => !prev)

  const formCreateSchema = yup.object().shape({
    name: yup.string().min(2).max(50),
    description: yup.string().min(2),
  })

  type formCreateSchemaProps = yup.InferType<typeof formCreateSchema>

  const form = useForm<formCreateSchemaProps>({
    resolver: yupResolver(formCreateSchema),
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      description: '',
    },
  })

  useEffect(() => {
    form.reset({ name: '', description: '' })
  }, [form, isOpen])

  const handleSubmit = async (values: formCreateSchemaProps) => {
    const responseData = await useCreateForm(
      values.name as string,
      values.description as string
    )
    router.push(`/form-builder/${responseData?.id}`)
    handleToggle()
  }

  return (
    <div className=" w-[30rem] self-start">
      <button className="btn btn-accent" onClick={() => setIsOpen(true)}>
        Create Form +
      </button>
      <Modal isOpen={isOpen}>
        <div className="flex flex-col justify-center">
          <div className="flex justify-between ">
            <h3 className="font-bold text-lg">Create Form</h3>
            <button
              className="btn btn-circle btn-xs btn-outline"
              onClick={handleToggle}
            >
              X
            </button>
          </div>
          <div className=" divider divider-neutral mb-6" />

          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-4"
          >
            <Controller
              control={form.control}
              name="name"
              render={({ field }) => (
                <div className="flex flex-col gap-1 my-2 w-full px-2">
                  <label>Name:</label>
                  <input
                    type="text"
                    className="input input-bordered w-full "
                    required
                    {...field}
                  />
                </div>
              )}
            />
            <Controller
              control={form.control}
              name="description"
              render={({ field }) => (
                <div className="flex flex-col gap-1 my-2 w-full px-2">
                  <label>Description:</label>
                  <textarea
                    className="textarea textarea-bordered textarea-lg w-full "
                    {...field}
                  />
                </div>
              )}
            />
            <button
              className="btn btn-primary btn-outline w-[10rem] place-self-end mt-4"
              type="submit"
            >
              Create Form
            </button>
          </form>
        </div>
      </Modal>
    </div>
  )
}

export default CreateFormBtn
