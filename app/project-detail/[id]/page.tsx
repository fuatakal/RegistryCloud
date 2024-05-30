'use client'

import userAtom from '@/atoms/userInfoAtom'
import DashboardFormItem from '@/components/DashboardFormItem'
import StatsCard from '@/components/StatsCard'
import { useGetFormAnswers, useGetForms } from '@/hooks/form'
import { Form, FormSubmit } from '@/types'
import { useAtom } from 'jotai'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaArrowAltCircleRight, FaEdit } from 'react-icons/fa'
import { LuView } from 'react-icons/lu'

interface DetailsProps {
  params: { id: string }
}

function ProjectDetailsPage({ params }: DetailsProps) {
  const { id } = params
  const router = useRouter()

  const [forms, setForms] = useState<Form[]>([])
  const [submits, setSubmits] = useState<FormSubmit[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [user] = useAtom(userAtom)

  const visit = (id: number) => {
    router.push(`/submit/${id.toString()}`)
  }

  useEffect(() => {
    const getForm = async () => {
      const response = await useGetForms()
      setForms(response)
      setLoading(false)
    }

    const getAnswers = async () => {
      const response = await useGetFormAnswers(id)
      setSubmits(response)
    }
    getForm()
    getAnswers()
  }, [])

  if (loading) return

  if (forms) {
    return (
      <>
        <div className="py-10 px-5 border-b border-muted">
          <div className="flex justify-between container">
            <div className="flex gap-6 items-center">
              <h1 className="text-4xl font-bold truncate">{}</h1>
              <button
                className="btn btn-primary btn-outline"
                onClick={() => visit(form.id as number)}
              >
                Visit <FaArrowAltCircleRight size={16} />
              </button>
            </div>

            <div className="flex gap-6 justify-center items-center">
              {user?.is_staff ? (
                <button
                  className="btn btn-accent"
                  onClick={() => {
                    router.push(`/form-builder/${id}`)
                  }}
                >
                  Edit <FaEdit size={16} />
                </button>
              ) : null}
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
            value={submits.length.toString()}
            loading={false}
            className="shadow-md shadow-blue-600"
            type={''}
          />
        </div>
        <div className=" divider divider-neutral my-4" />
        {forms.map((form) => (
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
      </>
    )
  }
}

export default ProjectDetailsPage
