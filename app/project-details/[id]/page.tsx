'use client'

import projectAtom from '@/atoms/selectedProject'
import CreateFormBtn from '@/components/CreateFormBtn'
import DashboardFormItem from '@/components/DashboardFormItem'
import Loading from '@/components/Loading'
import StatsCard from '@/components/StatsCard'
import { useProjectHooks } from '@/hooks/project'
import { Form, Project } from '@/types'
import { useAtom } from 'jotai'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { LuView } from 'react-icons/lu'

interface DetailsProps {
  params: { id: string }
}

interface FormWithChildren extends Form {
  children: FormWithChildren[]
}

const buildTree = (forms: Form[]): FormWithChildren[] => {
  const map = new Map<number, FormWithChildren>()
  const roots: FormWithChildren[] = []

  console.log(forms)

  forms.forEach((form) => {
    map.set(form.id as number, { ...form, children: [] })
  })

  forms.forEach((form) => {
    if (form.master_form_id !== null) {
      const parent = map.get(form.master_form_id as number)
      parent?.children.push(map.get(form.id as number)!)
    } else {
      roots.push(map.get(form.id as number)!)
    }
  })

  return roots
}

function ProjectDetailsPage({ params }: DetailsProps) {
  const { id } = params
  const router = useRouter()

  const [, setForms] = useState<Form[]>([])
  const [tree, setTree] = useState<FormWithChildren[]>([])
  const [project, setProject] = useState<Project>()
  const [loading, setLoading] = useState<boolean>(true)

  const [, setProjectId] = useAtom(projectAtom)

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
      const data = buildTree(formsResponse)
      setTree(data)
      setProjectId(projectResponse.id)
      setLoading(false)
    }

    fetchProject()
  }, [])

  if (loading) return <Loading />

  if (tree) {
    return (
      <>
        <div className="py-10 px-5 border-b border-muted">
          <div className="flex justify-between container">
            <div className="flex gap-6 items-center">
              <h1 className="text-4xl font-bold truncate">
                {project?.attributes?.name}
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
        <div className="py-5 px-10">
          <div className="container flex gap-2 items-center justify-between">
            <p>{project?.attributes?.name}</p>
          </div>
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
            <CreateFormBtn projectId={project?.id as number} />
          </div>
          <div className=" divider divider-neutral my-6" />

          <ul className=" w-full">
            <ul className="w-full">
              {tree.map((form) => (
                <DashboardFormItem
                  key={form.id}
                  form={form}
                  projectId={project?.id as number}
                  onClick={handleClickOnForm}
                />
              ))}
            </ul>
          </ul>
        </div>
      </>
    )
  }
}

export default ProjectDetailsPage
