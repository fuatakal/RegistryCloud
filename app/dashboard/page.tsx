'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { AttendedForm, Project } from '@/types'
import { useAtom } from 'jotai'
import userAtom from '@/atoms/userInfoAtom'
import ProjectItem from '@/components/ProjectItem'
import CreateProjectBtn from '@/components/CreateProjectBtn'
import tokenAtom from '@/atoms/tokenAtom'
import { useProjectHooks } from '@/hooks/project'
import { useFormHooks } from '@/hooks/form'
import Loading from '@/components/Loading'
import DashboardAttendedFormItem from '@/components/DashboardAttendedFormItem'

export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [projects, setProjects] = useState<Project[]>([])
  const [attendedforms, setAttendedForms] = useState<AttendedForm[]>([])
  const [token] = useAtom(tokenAtom)
  const [user] = useAtom(userAtom)

  const { getProjects } = useProjectHooks()
  const { getAttendedForms } = useFormHooks()

  const handleClickOnForm = (id: number) => {
    router.push(`/form-details/${id}`)
  }

  const handleClickOnProject = (id: number) => {
    router.push(`/project-details/${id}`)
  }

  useEffect(() => {
    const checkToken = async () => {
      try {
        await axios.post(
          'http://localhost:8000/auth/jwt/verify/',
          { token },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
      } catch (error) {
        router.push('/login')
      }

      if (user?.is_staff) {
        const data = await getProjects()
        console.log(data)
        setProjects(data)
      } else {
        const data = await getAttendedForms()
        setAttendedForms(data)
      }
    }

    checkToken()
    setLoading(false)
  }, [])

  return (
    <main>
      {loading ? (
        <Loading />
      ) : (
        // Content after token check
        <div className="min-h-screen flex p-12 justify-center">
          <div className="container flex flex-col gap-4 p-12 rounded-xl bg-base-200 w-[75rem]">
            <div className="flex flex-row items-center w-full">
              <h1 className=" text-xl font-bold my-2 ml-4">
                {user?.is_staff ? 'My Projects' : 'Form invitations'}
              </h1>
              <div className="ml-auto">
                {user?.is_staff && <CreateProjectBtn />}
              </div>
            </div>

            <div className="divider divider-neutral mb-8" />

            <ul>
              {user?.is_staff
                ? projects.map((project) => (
                    <ProjectItem
                      key={project.id}
                      name={project.attributes?.name || ''}
                      description={project.attributes?.desc || ''}
                      onClick={() => {
                        handleClickOnProject(project.id || 0)
                      }}
                    />
                  ))
                : attendedforms.map((form) => (
                    <DashboardAttendedFormItem
                      key={form.form}
                      isSubmitted={form.isSubmitted}
                      form={form}
                      onClick={() => {
                        handleClickOnForm(form.form || 0)
                      }}
                    />
                  ))}
            </ul>
          </div>
        </div>
      )}
    </main>
  )
}
