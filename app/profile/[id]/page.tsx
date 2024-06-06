'use client'

import userAtom from '@/atoms/userInfoAtom'
import DashboardAttendedFormItem from '@/components/DashboardAttendedFormItem'
import ProjectItem from '@/components/ProjectItem'
import { useFormHooks } from '@/hooks/form'
import { useProjectHooks } from '@/hooks/project'
import { AttendedForm, Project } from '@/types'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'

import React, { useEffect, useState } from 'react'

export default function ProfilePage() {
  const router = useRouter()
  const [user] = useAtom(userAtom)

  const [projects, setProjects] = useState<Project[]>([])
  const { getProjects } = useProjectHooks()

  const [attendedforms, setAttendedForms] = useState<AttendedForm[]>([])
  const { getAttendedForms } = useFormHooks()

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await getProjects()
      setProjects(response)

      const data = await getAttendedForms()
      setAttendedForms(data)
    }
    fetchProjects()
  }, [])

  const handleClickOnForm = (id: number) => {
    router.push(`/form-details/${id}`)
  }

  return (
    <div className="flex flex-col items-center ">
      <div className="my-8 space-y-6 min-w-[40rem]">
        <div className="avatar w-full flex justify-center">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="border rounded-lg shadow-lg p-4 w-[20rem]">
            <p className="font-bold text-black mb-2">First Name:</p>
            <div className="text-blue-400 text-xl font-bold">
              {user?.first_name}
            </div>
          </div>
          <div className="border rounded-lg shadow-lg p-4 w-[20rem]">
            <p className="font-bold text-black mb-2">Last Name:</p>
            <div className="text-blue-400 text-xl font-bold">
              {user?.last_name}
            </div>
          </div>
        </div>
        <div className="border rounded-lg shadow-lg p-4 w-[41rem]">
          <p className="font-bold text-black mb-2">Email:</p>
          <div className="text-blue-400 text-xl font-bold">{user?.email}</div>
        </div>
        {user?.is_staff ? (
          <div className="border rounded-lg shadow-lg p-4 w-[41rem]">
            <p className="font-bold text-black mb-2">Projects:</p>
            <ul className=" pr-8">
              {projects.map((project) => (
                <ProjectItem
                  key={project.id}
                  name={project.attributes?.name as string}
                  description={project.attributes?.desc as string}
                />
              ))}
            </ul>
          </div>
        ) : (
          <div className="border rounded-lg shadow-lg p-4 w-[41rem]">
            <p className="font-bold text-black mb-2">Attended Forms:</p>
            <ul className=" pr-8">
              {attendedforms.map((form) => (
                <DashboardAttendedFormItem
                  key={form.form}
                  form={form}
                  onClick={() => {
                    handleClickOnForm(form.form || 0)
                  }}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
