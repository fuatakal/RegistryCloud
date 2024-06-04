'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { BiArrowBack } from 'react-icons/bi'

const GoBackButton: React.FC = () => {
  const router = useRouter()

  const handleGoBack = () => {
    router.back()
  }

  return (
    <button className="btn btn-outline btn-ghost" onClick={handleGoBack}>
      Go Back <BiArrowBack />
    </button>
  )
}

export default GoBackButton
