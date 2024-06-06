'use client'

import { useFormHooks } from '@/hooks/form'

import React, { useEffect, useState } from 'react'
import { Form } from '@/types/index'
import Loading from '@/components/Loading'
import FormPreviewComponent from '@/components/FormPreviewComponent'
import GoBackButton from '@/components/GoBackButton'

interface PreviewPageProps {
  params: {
    formUrl: string
  }
}

const PreviewPage = ({ params }: PreviewPageProps) => {
  const { formUrl } = params

  const [form, setForm] = useState<Form>()
  const [loading, setLoading] = useState<boolean>(true)

  const { getFormById } = useFormHooks()

  useEffect(() => {
    console.log('aaaaa')
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
      <div className=" self-start mt-2 ml-2">
        <GoBackButton />
      </div>

      <h1 className=" font-bold text-3xl self-center my-16">{form?.name}</h1>
      <FormPreviewComponent content={form?.questions || []} />
    </main>
  )
}

export default PreviewPage
