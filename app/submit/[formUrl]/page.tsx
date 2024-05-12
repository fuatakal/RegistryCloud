'use client'

import navLinksAtom from '@/atoms/navLinksAtom'
import userAtom from '@/atoms/userInfoAtom'
import { useGetFormbyId } from '@/hooks/form'
import { User } from '@/types'
import { useAtom } from 'jotai'
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

  const [user, setUser] = useAtom(userAtom)
  const [navbarLinks, setNavbarLinks] = useAtom(navLinksAtom)

  useEffect(() => {
    const getForm = async () => {
      const response = await useGetFormbyId(Number(formUrl))
      const links = JSON.parse(localStorage.getItem('navBarLinks') || '[]')
      const userFromStorage = JSON.parse(
        localStorage.getItem('user') || 'null'
      ) as User

      setNavbarLinks(links)
      setForm(response)
      setUser(userFromStorage)
      setLoading(false)
    }
    getForm()
  }, [])

  return <FormSubmitComponent formUrl={formUrl} content={form?.questions} />
}

export default SubmitPage
