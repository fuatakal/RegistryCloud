'use client'

import userAtom from '@/atoms/userInfoAtom'
import StatsCard from '@/components/StatsCard'
import { useFormHooks } from '@/hooks/form'
import { Form, FormSubmit } from '@/types'
import { useAtom } from 'jotai'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaArrowAltCircleRight, FaEdit } from 'react-icons/fa'
import { LuView } from 'react-icons/lu'

interface DetailsProps {
  params: { id: string }
}

function DetailsPage({ params }: DetailsProps) {
  const { id } = params
  const router = useRouter()

  const [form, setForm] = useState<Form>()
  const [submits, setSubmits] = useState<FormSubmit[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [user] = useAtom(userAtom)

  const { getFormById, getFormAnswers } = useFormHooks()

  const visit = (id: number) => {
    router.push(`/submit/${id.toString()}`)
  }

  useEffect(() => {
    const getForm = async () => {
      const response = await getFormById(Number(id))
      setForm(response)
      setLoading(false)
    }

    const getAnswers = async () => {
      const response = await getFormAnswers(id)
      setSubmits(response)
    }
    getForm()
    getAnswers()
  }, [])

  if (loading) return

  if (form) {
    return (
      <>
        <div className="py-10 px-5 border-b border-muted">
          <div className="flex justify-between container">
            <div className="flex gap-6 items-center">
              <h1 className="text-4xl font-bold truncate">{form.name}</h1>
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
        {user?.is_staff && (
          <div className="overflow-x-auto px-8">
            <h1 className=" text-xl font-bold ml-8">Attenders and answers</h1>
            <div className=" divider" />
            <table className="table">
              <thead>
                <tr>
                  <th>User</th>
                  {form.questions?.map((item) => (
                    <th key={item.id}>
                      {item.extraAttributes.label as string}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {submits.map((item, index) => (
                  <tr key={index} className="hover">
                    <th>{item.deliveryman_email}</th>
                    {item.answers.map((field) => (
                      <td key={`${item.deliveryman}`}>{field.answer}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </>
    )
  }
}

export default DetailsPage
