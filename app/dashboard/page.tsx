'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useAtom } from 'jotai'
import Navbar from '../../components/Navbar'
import userAtom from '../../atoms/userInfoAtom'
import navLinksAtom from '@/atoms/navLinksAtom'
import { Form, User } from '@/types'
import CreateFormBtn from '@/components/CreateFormBtn'
import { useFormApi } from '@/hooks/form'
import DashboardFormItem from '@/components/DashboardFormItem'

export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [forms, setForms] = useState<Form[]>([])

  const [user, setUser] = useAtom(userAtom)
  const [navbarLinks, setNavbarLinks] = useAtom(navLinksAtom)

  const { getForms } = useFormApi()

  const handleClickOnForm = (id: number) => {
    console.log(id)
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

          // If token is valid, proceed to the homepage
          const links = JSON.parse(localStorage.getItem('navBarLinks') || '[]')
          const userFromStorage = JSON.parse(
            localStorage.getItem('user') || 'null'
          ) as User

          const forms = await getForms()
          setForms(forms)

          setNavbarLinks(links)
          setUser(userFromStorage)
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
      <Navbar links={navbarLinks} username={user?.email || ''} />
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
                  name={form.name}
                  description={form.description}
                  onClick={() => {
                    handleClickOnForm(form.id)
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
