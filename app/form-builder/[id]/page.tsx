'use client'

import FormBuilder from '@/components/FormBuilder'
import React from 'react'

interface BuilderProps {
  params: { id: string }
}

async function BuilderPage({ params }: BuilderProps) {
  const { id } = params

  return (
    <>
      <FormBuilder id={id} />
    </>
  )
}

export default BuilderPage
