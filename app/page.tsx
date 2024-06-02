'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Loading from '@/components/Loading'

const Home = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/login')
  }, [router])

  return <Loading />
}

export default Home
