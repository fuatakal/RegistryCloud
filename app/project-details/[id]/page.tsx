'use client'

import CreateFormBtn from '@/components/CreateFormBtn'
import DashboardFormItem from '@/components/DashboardFormItem'
import StatsCard from '@/components/StatsCard'
import { useProjectHooks } from '@/hooks/project'
import { Form, Project } from '@/types'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { LuView } from 'react-icons/lu'

interface DetailsProps {
  params: { id: string }
}

function ProjectDetailsPage({ params }: DetailsProps) {
  const { id } = params
  const router = useRouter()

  const [forms, setForms] = useState<Form[]>([])
  const [project, setProject] = useState<Project>()
  const [loading, setLoading] = useState<boolean>(true)

  const { getProjectForms, getProject, deleteProject } = useProjectHooks()

  const handleClickOnForm = (id: number) => {
    router.push(`/form-details/${id}`)
  }

  const handleDeleteProject = () => {
    deleteProject(id)
    router.push('/dashboard')
  }

  useEffect(() => {
    const fetchProject = async () => {
      const formsResponse = await getProjectForms(id)
      setForms(formsResponse)
      const projectResponse = await getProject(id)
      setProject(projectResponse)
      setLoading(false)
    }

    fetchProject()
  }, [])

  if (loading) return

  if (forms) {
    return (
      <>
        <div className="py-10 px-5 border-b border-muted">
          <div className="flex justify-between container">
            <div className="flex gap-6 items-center">
              <h1 className="text-4xl font-bold truncate">
                {project?.attributes.name}
              </h1>
            </div>

            <div className="flex gap-6 justify-center items-center">
              <button
                className="btn btn-accent"
                onClick={() => {
                  router.push(`/form-builder/${id}`)
                }}
              >
                Edit <FaEdit size={16} />
              </button>

              <button className="btn btn-error" onClick={handleDeleteProject}>
                Delete <FaTrash size={16} />
              </button>
            </div>
          </div>
        </div>
        <div className="py-5 px-10 border-b border-muted">
          <div className="container flex gap-2 items-center justify-between"></div>
        </div>
        <div className="w-[400px] pt-8 gap-4 stats self-center mt-2  shadow">
          <StatsCard
            title="Total Submits"
            icon={<LuView size={48} />}
            helperText="All time form submits"
            value="0"
            loading={false}
            className="shadow-md shadow-blue-600"
            type={''}
          />
        </div>
        <div className=" divider divider-neutral my-6" />
        <div className="flex flex-col justify-center items-start w-[80%] mx-auto">
          <div className="flex w-full">
            <h1 className=" font-bold text-2xl mr-auto">Forms</h1>
            <CreateFormBtn />
          </div>

          <ul>
            {forms?.map((form) => (
              <DashboardFormItem
                key={form.id}
                name={form.name || ''}
                description={form.description || ''}
                isCreator
                onClick={() => {
                  handleClickOnForm(form.id || 0)
                }}
              />
            ))}
          </ul>
        </div>
      </>
    )
  }
}

export default ProjectDetailsPage
