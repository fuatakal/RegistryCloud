'use client'

import { User } from '@/types'
import React, { useEffect, useState } from 'react'

interface ProfilePageProps {
  params: { id: string }
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const { id } = params
  const [user, setUser] = useState<User>()
  useEffect(() => {
    const userFromStorage = JSON.parse(
      localStorage.getItem('user') || 'null'
    ) as User
    setUser(userFromStorage)
  }, [])

  return (
    <div className="flex flex-col items-center ">
      <div className="my-8 space-y-6 min-w-[50rem]">
        <div className="flex space-x-4">
          <div className="border rounded-lg shadow-lg p-6 w-[25rem]">
            <p className="font-bold text-black mb-2">First Name:</p>
            <div className="text-blue-400 text-2xl font-bold mb-4">
              {user?.first_name}
            </div>
          </div>
          <div className="border rounded-lg shadow-lg p-6 w-[25rem]">
            <p className="font-bold text-black mb-2">Last Name:</p>
            <div className="text-blue-400 text-2xl font-bold mb-4">
              {user?.last_name}
            </div>
          </div>
        </div>
        <div className="border rounded-lg shadow-lg p-6">
          <p className="font-bold text-black mb-2">Email:</p>
          <div className="text-blue-400 text-2xl font-bold mb-4">
            {user?.email}
          </div>
        </div>
        <div className="border rounded-lg shadow-lg p-6 ">
          <p className="font-bold text-black mb-2">Created Forms:</p>
          <p className="text-blue-400 text-2xl font-bold mb-4">something</p>
        </div>
        <div className="border rounded-lg shadow-lg p-6">
          <p className="font-bold text-black mb-2">Attended Forms:</p>
          <p className="text-blue-400 text-2xl font-bold mb-4">something</p>
        </div>
      </div>
    </div>
  )
}
