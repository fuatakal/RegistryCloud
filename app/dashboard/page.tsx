'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { AttendedForm, Project } from '@/types'
import { useGetAttendedForms } from '@/hooks/form'
import DashboardFormItem from '@/components/DashboardFormItem'
import { useAtom } from 'jotai'
import tokenAtom from '@/atoms/tokenAtom'
import userAtom from '@/atoms/userInfoAtom'
import { useGetProjects } from '@/hooks/project'
import ProjectItem from '@/components/ProjectItem'
import CreateProjectBtn from '@/components/CreateProjectBtn'

export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [projects, setProjects] = useState<Project[]>([])
  const [attendedforms, setAttendedForms] = useState<AttendedForm[]>([])
  const [token] = useAtom(tokenAtom)
  const [user] = useAtom(userAtom)

  const handleClickOnForm = (id: number) => {
    router.push(`/form-details/${id}`)
  }

  const handleClickOnProject = (id: number) => {
    router.push(`/project-details/${id}`)
  }

  useEffect(() => {
    const checkToken = async () => {
      if (!token) {
        setLoading(true)
        return
      }
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
        const data = await useGetProjects()
        setProjects(data)
      } else {
        const data = await useGetAttendedForms()
        setAttendedForms(data)
      }
    }

    checkToken()
    setLoading(false)
  }, [])

  return (
    <main>
      {loading ? (
        // Loading screen while checking token
        <div className="min-h-screen flex justify-center items-center">
          <p>Loading...</p>
        </div>
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
                      name={project.atributes.name || ''}
                      description={project.atributes.desc || ''}
                      onClick={() => {
                        handleClickOnProject(project.id || 0)
                      }}
                    />
                  ))
                : attendedforms.map((form) => (
                    <DashboardFormItem
                      key={form.form}
                      name={form.formName || ''}
                      description={form.formDescription || ''}
                      isSubmitted={form.isSubmitted}
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
