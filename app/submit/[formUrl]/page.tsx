'use client'

import { useGetFormbyId } from '@/hooks/form'

import React, { useEffect, useState } from 'react'
import { Form } from '@/types/index'
import FormSubmitComponent from '@/components/FormSubmitComponent'

interface SubmitPageProps {
  params: {
    formUrl: string
  }
}

const SubmitPage = ({ params }: SubmitPageProps) => {
  const { formUrl } = params

  const [form, setForm] = useState<Form>()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const getForm = async () => {
      const response = await useGetFormbyId(Number(formUrl))
      setForm(response)
      setLoading(false)
    }
    getForm()
  }, [])

  if (loading) return

  return (
    <>
      <h1 className=" font-bold text-3xl self-center mt-72">{form?.name}</h1>
      <FormSubmitComponent formId={formUrl} content={form?.questions || []} />
    </>
  )
}

export default SubmitPage
