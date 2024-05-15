'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Form } from '@/types'
import CreateFormBtn from '@/components/CreateFormBtn'
import { useGetForms } from '@/hooks/form'
import DashboardFormItem from '@/components/DashboardFormItem'

export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [forms, setForms] = useState<Form[]>([])

  const handleClickOnForm = (id: number) => {
    router.push(`/form-details/${id}`)
  }

  useEffect(() => {
    const checkToken = async () => {
      try {
        // Simulate checking the JWT token
        // TODO: replace with sessionToken when neccesary
        const token = localStorage.getItem('jwtToken')
        if (token) {
          // If token exists, you can perform a validation request to the server
          await axios.post(
            'http://localhost:8000/auth/jwt/verify/',
            { token },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )
          const forms = await useGetForms()
          setForms(forms)
          setLoading(false)
        }
      } catch (error) {
        // If an error occurs during token validation, redirect to login page
        // console.error('Token validation error:', error)
        setLoading(false)
        router.push('/login')
      }
    }

    checkToken()
  }, [])

  return (
    <main>
      {loading ? (
        // Loading screen while checking token
        <div className="min-h-screen flex justify-center items-center">
          <p>Loading...</p>
        </div>
      ) : (
        // Content after token check
        <div className="min-h-screen flex p-12 justify-center">
          <div className="container flex flex-col gap-4 p-12 rounded-xl bg-base-200 w-[75rem]">
            <CreateFormBtn />
            <div className="divider divider-neutral mb-8" />
            <ul>
              {forms.map((form) => (
                <DashboardFormItem
                  key={form.id}
                  name={form.name || ''}
                  description={form.description || ''}
                  onClick={() => {
                    handleClickOnForm(form.id || 0)
                  }}
                />
              ))}
            </ul>
          </div>
        </div>
      )}
    </main>
  )
}
