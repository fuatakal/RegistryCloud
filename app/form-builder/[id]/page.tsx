import FormBuilder from '@/components/FormBuilder'
import { getFormbyId } from '@/hooks/form'
import React from 'react'

interface BuilderProps {
  params: { id: string }
}

async function BuilderPage({ params }: BuilderProps) {
  const { id } = params

  //const form = await getFormbyId(id);

  return <FormBuilder />
}

export default BuilderPage
