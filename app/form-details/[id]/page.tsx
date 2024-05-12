'use client'

import navLinksAtom from '@/atoms/navLinksAtom'
import userAtom from '@/atoms/userInfoAtom'
import Navbar from '@/components/Navbar'
import StatsCard from '@/components/StatsCard'
import { useGetFormbyId } from '@/hooks/form'
import { Form, User } from '@/types'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaArrowAltCircleRight, FaEdit } from 'react-icons/fa'
import { FaShare } from 'react-icons/fa6'
import { LuView } from 'react-icons/lu'

interface DetailsProps {
  params: { id: string }
}

function DetailsPage({ params }: DetailsProps) {
  const { id } = params
  const router = useRouter()

  const [form, setForm] = useState<Form>()
  const [loading, setLoading] = useState<boolean>(true)

  const [user, setUser] = useAtom(userAtom)
  const [navbarLinks, setNavbarLinks] = useAtom(navLinksAtom)

  const visit = (id: number) => {
    router.push(`/submit/${id.toString()}`)
  }

  useEffect(() => {
    const getForm = async () => {
      const response = await useGetFormbyId(Number(id))
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

  if (loading) return

  if (form) {
    return (
      <>
        <Navbar links={navbarLinks} username={user?.email || ''} />
        <div className="py-10 px-5 border-b border-muted">
          <div className="flex justify-between container">
            <div className="flex gap-6 items-center">
              <h1 className="text-4xl font-bold truncate">{form.name}</h1>
              <button
                className="btn btn-primary btn-outline"
                onClick={() => visit(form.id as number)}
              >
                Visit <FaArrowAltCircleRight size={16} />
              </button>
            </div>

            <div className="flex gap-6 justify-center items-center">
              <input type="checkbox" className="toggle toggle-accent" />
              <button className="btn btn-info">
                Publish <FaShare size={16} />
              </button>
              <button
                className="btn btn-accent"
                onClick={() => {
                  router.push(`/form-builder/${id}`)
                }}
              >
                Edit <FaEdit size={16} />
              </button>
            </div>
          </div>
        </div>
        <div className="py-5 px-10 border-b border-muted">
          <div className="container flex gap-2 items-center justify-between"></div>
        </div>
        <div className="w-[400px] pt-8 gap-4 stats self-center mt-2  shadow">
          <StatsCard
            title="Total visits"
            icon={<LuView size={48} />}
            helperText="All time form visits"
            value={''}
            loading={false}
            className="shadow-md shadow-blue-600"
            type={''}
          />
        </div>
        <div className=" divider divider-neutral my-4" />

        {/*TO-DO(melih): form detailste attenderlar gözükecek ,yukarıdan useGetAllUsers hook unu çağırıp state e kaydet burdan listele */}

        <div className="container pt-10"></div>
      </>
    )
  }
}

export default DetailsPage
