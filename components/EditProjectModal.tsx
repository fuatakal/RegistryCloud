import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useProjectHooks } from '@/hooks/project'
import { Project } from '@/types'
import { FaEdit } from 'react-icons/fa'

interface EditProjectBtnProps {
  defaultName: string
  defaultDesc: string
  projectId: number
}

const EditProjectBtn = ({
  defaultName,
  defaultDesc,
  projectId,
}: EditProjectBtnProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const handleToggle = () => setIsOpen((prev) => !prev)

  const { editProject } = useProjectHooks()

  const ProjectEditSchema = yup.object().shape({
    name: yup.string().min(2).max(50),
    description: yup.string().min(2),
  })

  type ProjectEditSchemaProps = yup.InferType<typeof ProjectEditSchema>

  const Project = useForm<ProjectEditSchemaProps>({
    resolver: yupResolver(ProjectEditSchema),
    mode: 'onSubmit',
    defaultValues: {
      name: defaultName,
      description: defaultDesc,
    },
  })

  useEffect(() => {
    Project.reset({ name: defaultName, description: defaultDesc })
  }, [Project, isOpen])

  const handleSubmit = async (values: ProjectEditSchemaProps) => {
    await editProject({
      id: projectId,
      attributes: {
        name: values.name as string,
        desc: values.description as string,
      },
    } as Project)
    handleToggle()
    window.location.reload()
  }

  return (
    <div className="">
      <button className="btn btn-accent" onClick={() => setIsOpen(true)}>
        Edit Project <FaEdit />
      </button>
      <Modal isOpen={isOpen}>
        <div className="flex flex-col justify-center">
          <div className="flex justify-between ">
            <h3 className="font-bold text-lg">Edit Project</h3>
            <button
              className="btn btn-circle btn-xs btn-outline"
              onClick={handleToggle}
            >
              X
            </button>
          </div>
          <div className=" divider divider-neutral mb-6" />

          <form
            onSubmit={Project.handleSubmit(handleSubmit)}
            className="flex flex-col gap-4"
          >
            <Controller
              control={Project.control}
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
              control={Project.control}
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
              Edit Project
            </button>
          </form>
        </div>
      </Modal>
    </div>
  )
}

export default EditProjectBtn
