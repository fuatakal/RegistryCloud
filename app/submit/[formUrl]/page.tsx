'use client'

import { useFormHooks } from '@/hooks/form'

import React, { useEffect, useState } from 'react'
import { Form } from '@/types/index'
import FormSubmitComponent from '@/components/FormSubmitComponent'
import Loading from '@/components/Loading'

interface SubmitPageProps {
  params: {
    formUrl: string
  }
}

const SubmitPage = ({ params }: SubmitPageProps) => {
  const { formUrl } = params

  const [form, setForm] = useState<Form>()
  const [loading, setLoading] = useState<boolean>(true)

  const { getFormById } = useFormHooks()

  useEffect(() => {
    const getForm = async () => {
      const response = await getFormById(Number(formUrl))
      setForm(response)
      setLoading(false)
    }
    getForm()
  }, [])

  if (loading) return <Loading />

  return (
    <main className="flex justify-center items-center flex-col">
      <h1 className=" font-bold text-3xl self-center my-16">{form?.name}</h1>
      <FormSubmitComponent formId={formUrl} content={form?.questions || []} />
    </main>
  )
}

export default SubmitPage
